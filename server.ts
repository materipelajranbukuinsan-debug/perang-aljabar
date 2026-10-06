import express from 'express';
import http from 'http';
import path from 'path';
import { WebSocketServer, WebSocket } from 'ws';
import {
  ROOM_WIDTH,
  ROOM_HEIGHT,
  MAX_PLAYERS,
  PLAYER_RADIUS,
  PLAYER_SPEED,
  VIRUS_SPEED,
  BULLET_SPEED,
  VIRUS_RADIUS,
  DIAMOND_RADIUS,
  AMMO_RADIUS,
  MAX_VIRUSES,
  INACTIVITY_TIMEOUT_MS,
  Player,
  Bullet,
  Virus,
  Diamond,
  AmmoPickup,
  Wall,
  ChatMessage,
  WinnerRecord
} from './src/types/game.js';
import { SPLSV_QUESTIONS, SPLDV_QUESTIONS } from './src/data/mathQuestions.js';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Predefined balanced walls / obstacles for tactical cover
const WALLS: Wall[] = [
  // Outer boundary walls
  { x: 0, y: 0, width: ROOM_WIDTH, height: 20, color: '#334155' },
  { x: 0, y: ROOM_HEIGHT - 20, width: ROOM_WIDTH, height: 20, color: '#334155' },
  { x: 0, y: 0, width: 20, height: ROOM_HEIGHT, color: '#334155' },
  { x: ROOM_WIDTH - 20, y: 0, width: 20, height: ROOM_HEIGHT, color: '#334155' },

  // Center Fortress / Arena Blocks
  { x: 1150, y: 750, width: 200, height: 40, color: '#475569' },
  { x: 1150, y: 1010, width: 200, height: 40, color: '#475569' },
  { x: 1050, y: 800, width: 40, height: 200, color: '#475569' },
  { x: 1410, y: 800, width: 40, height: 200, color: '#475569' },

  // Quadrant 1 (Top-Left)
  { x: 350, y: 250, width: 250, height: 35, color: '#475569' },
  { x: 350, y: 285, width: 35, height: 180, color: '#475569' },
  { x: 750, y: 400, width: 180, height: 35, color: '#475569' },
  { x: 500, y: 600, width: 35, height: 220, color: '#475569' },

  // Quadrant 2 (Top-Right)
  { x: 1800, y: 250, width: 250, height: 35, color: '#475569' },
  { x: 2015, y: 285, width: 35, height: 180, color: '#475569' },
  { x: 1550, y: 400, width: 180, height: 35, color: '#475569' },
  { x: 1950, y: 600, width: 35, height: 220, color: '#475569' },

  // Quadrant 3 (Bottom-Left)
  { x: 350, y: 1400, width: 250, height: 35, color: '#475569' },
  { x: 350, y: 1220, width: 35, height: 180, color: '#475569' },
  { x: 750, y: 1300, width: 180, height: 35, color: '#475569' },
  { x: 500, y: 980, width: 35, height: 220, color: '#475569' },

  // Quadrant 4 (Bottom-Right)
  { x: 1800, y: 1400, width: 250, height: 35, color: '#475569' },
  { x: 2015, y: 1220, width: 35, height: 180, color: '#475569' },
  { x: 1550, y: 1300, width: 180, height: 35, color: '#475569' },
  { x: 1950, y: 980, width: 35, height: 220, color: '#475569' },

  // Intermediate barriers
  { x: 1200, y: 300, width: 100, height: 160, color: '#334155' },
  { x: 1200, y: 1340, width: 100, height: 160, color: '#334155' },
  { x: 800, y: 850, width: 120, height: 100, color: '#334155' },
  { x: 1580, y: 850, width: 120, height: 100, color: '#334155' }
];

// Room Game State
const players: Record<string, Player> = {};
let bullets: Bullet[] = [];
const viruses: Virus[] = [];
const diamonds: Diamond[] = [];
const ammoPickups: AmmoPickup[] = [];
const recentChat: ChatMessage[] = [];
const winners: WinnerRecord[] = [];

const clientSockets: Map<string, WebSocket> = new Map();
const playerInputs: Map<string, { dx: number; dy: number; angle: number; shoot?: boolean }> = new Map();

// Helper to check circle-wall collision
function circleHitsWall(cx: number, cy: number, radius: number): boolean {
  for (const w of WALLS) {
    const closestX = Math.max(w.x, Math.min(cx, w.x + w.width));
    const closestY = Math.max(w.y, Math.min(cy, w.y + w.height));
    const distX = cx - closestX;
    const distY = cy - closestY;
    if (distX * distX + distY * distY < radius * radius) {
      return true;
    }
  }
  return false;
}

// Generate random position free of walls
function getRandomFreePosition(radius: number = 25): { x: number; y: number } {
  let attempts = 0;
  while (attempts < 100) {
    attempts++;
    const x = Math.floor(60 + Math.random() * (ROOM_WIDTH - 120));
    const y = Math.floor(60 + Math.random() * (ROOM_HEIGHT - 120));
    if (!circleHitsWall(x, y, radius + 15)) {
      return { x, y };
    }
  }
  return { x: 400 + Math.random() * 400, y: 400 + Math.random() * 400 };
}

// Initialize exactly 5 viruses
function initViruses() {
  viruses.length = 0;
  for (let i = 0; i < MAX_VIRUSES; i++) {
    const pos = getRandomFreePosition(VIRUS_RADIUS);
    viruses.push({
      id: `virus-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
      x: pos.x,
      y: pos.y,
      radius: VIRUS_RADIUS,
      pulse: Math.random() * Math.PI * 2
    });
  }
}

// Respawns one virus at random place (keeping max 5)
function respawnVirus(index: number) {
  const pos = getRandomFreePosition(VIRUS_RADIUS);
  viruses[index] = {
    id: `virus-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    x: pos.x,
    y: pos.y,
    radius: VIRUS_RADIUS,
    pulse: 0
  };
}

// Initialize Diamonds (6 Blue, 4 Red)
function initDiamonds() {
  diamonds.length = 0;
  // 6 Blue Diamonds (SPLSV)
  for (let i = 0; i < 6; i++) {
    const pos = getRandomFreePosition(DIAMOND_RADIUS);
    const q = SPLSV_QUESTIONS[Math.floor(Math.random() * SPLSV_QUESTIONS.length)];
    diamonds.push({
      id: `diamond-blue-${i}-${Date.now()}`,
      type: 'blue',
      x: pos.x,
      y: pos.y,
      questionId: q.id
    });
  }
  // 4 Red Diamonds (SPLDV)
  for (let i = 0; i < 4; i++) {
    const pos = getRandomFreePosition(DIAMOND_RADIUS);
    const q = SPLDV_QUESTIONS[Math.floor(Math.random() * SPLDV_QUESTIONS.length)];
    diamonds.push({
      id: `diamond-red-${i}-${Date.now()}`,
      type: 'red',
      x: pos.x,
      y: pos.y,
      questionId: q.id
    });
  }
}

function respawnDiamond(index: number, type: 'blue' | 'red') {
  const pos = getRandomFreePosition(DIAMOND_RADIUS);
  const qList = type === 'blue' ? SPLSV_QUESTIONS : SPLDV_QUESTIONS;
  const q = qList[Math.floor(Math.random() * qList.length)];
  diamonds[index] = {
    id: `diamond-${type}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    type,
    x: pos.x,
    y: pos.y,
    questionId: q.id
  };
}

// Initialize Ammo Pickups (10 scattered across map)
function initAmmoPickups() {
  ammoPickups.length = 0;
  for (let i = 0; i < 12; i++) {
    const pos = getRandomFreePosition(AMMO_RADIUS);
    ammoPickups.push({
      id: `ammo-${i}-${Date.now()}`,
      x: pos.x,
      y: pos.y
    });
  }
}

function respawnAmmo(index: number) {
  const pos = getRandomFreePosition(AMMO_RADIUS);
  ammoPickups[index] = {
    id: `ammo-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    x: pos.x,
    y: pos.y
  };
}

// Bot management to ensure arena is always lively (up to 12 bots if real players < 12)
const BOT_NAMES = [
  'Vektor_Cyber', 'Delta_X', 'Aljabar_Pro', 'Omega_Strike', 'Titan_Math',
  'Neo_Calculus', 'Viper_SPLSV', 'Matrix_Ghost', 'Shadow_Root', 'Alpha_Numeric',
  'Quantum_Rex', 'Sigma_Warrior', 'Zero_Solver', 'Hyper_Blade', 'Cosmos_Rider'
];
const BOT_COLORS = ['#38bdf8', '#fb923c', '#4ade80', '#c084fc', '#f43f5e', '#facc15', '#a855f7', '#2dd4bf'];

function balanceBots() {
  const realPlayerCount = Object.values(players).filter(p => !p.isBot).length;
  const targetTotal = Math.min(MAX_PLAYERS, Math.max(10, realPlayerCount + 8));
  const currentTotal = Object.keys(players).length;

  if (currentTotal < targetTotal) {
    const botsToAdd = targetTotal - currentTotal;
    for (let i = 0; i < botsToAdd; i++) {
      const botId = `bot-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const pos = getRandomFreePosition(PLAYER_RADIUS);
      const name = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)] + '_' + Math.floor(Math.random() * 90 + 10);
      players[botId] = {
        id: botId,
        name,
        color: BOT_COLORS[Math.floor(Math.random() * BOT_COLORS.length)],
        avatar: '🤖',
        x: pos.x,
        y: pos.y,
        angle: Math.random() * Math.PI * 2,
        lives: 10,
        ammo: 20,
        score: Math.floor(Math.random() * 200),
        blueDiamonds: Math.floor(Math.random() * 5),
        redDiamonds: Math.floor(Math.random() * 2),
        kills: 0,
        virusKills: Math.floor(Math.random() * 3),
        isBot: true,
        lastActive: Date.now(),
        hasWon: false
      };
    }
  } else if (currentTotal > MAX_PLAYERS) {
    // Remove a bot if room exceeds 30
    const botId = Object.keys(players).find(id => players[id].isBot);
    if (botId) {
      delete players[botId];
    }
  }
}

// Bot AI logic tick
let botTickCounter = 0;
function updateBots() {
  botTickCounter++;
  const botIds = Object.keys(players).filter(id => players[id].isBot);

  for (const botId of botIds) {
    const bot = players[botId];
    if (!bot) continue;

    // Periodically change direction or chase closest virus/player/diamond
    if (botTickCounter % 20 === 0 || Math.random() < 0.05) {
      // Find nearest target
      let targetX = bot.x + (Math.random() - 0.5) * 200;
      let targetY = bot.y + (Math.random() - 0.5) * 200;

      // 40% chance seek diamond
      if (diamonds.length > 0 && Math.random() < 0.4) {
        const d = diamonds[Math.floor(Math.random() * diamonds.length)];
        targetX = d.x;
        targetY = d.y;
      }

      const dx = targetX - bot.x;
      const dy = targetY - bot.y;
      const dist = Math.hypot(dx, dy) || 1;
      const angle = Math.atan2(dy, dx);

      // Move bot (speed = 4 bit per user spec)
      const nextX = bot.x + (dx / dist) * PLAYER_SPEED * 0.75;
      const nextY = bot.y + (dy / dist) * PLAYER_SPEED * 0.75;

      if (!circleHitsWall(nextX, bot.y, PLAYER_RADIUS)) bot.x = nextX;
      if (!circleHitsWall(bot.x, nextY, PLAYER_RADIUS)) bot.y = nextY;
      bot.angle = angle;

      // Occasional bot shooting if ammo > 3 and target nearby
      if (bot.ammo > 5 && Math.random() < 0.08) {
        bot.ammo--;
        bullets.push({
          id: `b-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          ownerId: bot.id,
          x: bot.x + Math.cos(angle) * (PLAYER_RADIUS + 5),
          y: bot.y + Math.sin(angle) * (PLAYER_RADIUS + 5),
          vx: Math.cos(angle) * BULLET_SPEED,
          vy: Math.sin(angle) * BULLET_SPEED,
          createdAt: Date.now()
        });
      }
    }
  }
}

// Broadcast message helper
function broadcast(data: object) {
  const json = JSON.stringify(data);
  for (const [, ws] of clientSockets) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(json);
    }
  }
}

// Add system chat and broadcast
function addChatMessage(senderName: string, text: string, type: ChatMessage['type'] = 'chat', senderId: string = 'sys') {
  const msg: ChatMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    senderId,
    senderName,
    text,
    timestamp: Date.now(),
    isSystem: senderId === 'sys',
    type
  };
  recentChat.push(msg);
  if (recentChat.length > 50) recentChat.shift();
  broadcast({ type: 'chatMessage', message: msg });
}

// Send private message to specific client
function sendToClient(playerId: string, data: object) {
  const ws = clientSockets.get(playerId);
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(data));
  }
}

// Check player win condition
function checkWinCondition(player: Player): boolean {
  if (player.hasWon) return true;
  // User spec: "tujuan utama game ini adalah mendapatkan 20 berlian biru... misi ada dua saja 20 berlian dan misi minimal bunuh 1 pemain live atau bisa di ganti dengan mendapatkan 10 berlian merah"
  const mission1 = player.blueDiamonds >= 20;
  const mission2 = player.kills >= 1 || player.redDiamonds >= 10;

  if (mission1 && mission2) {
    player.hasWon = true;
    player.winTime = Date.now();

    const record: WinnerRecord = {
      id: player.id,
      name: player.name,
      score: player.score,
      blueDiamonds: player.blueDiamonds,
      redDiamonds: player.redDiamonds,
      kills: player.kills,
      wonAt: new Date().toLocaleTimeString('id-ID')
    };
    winners.unshift(record);
    if (winners.length > 20) winners.pop();

    addChatMessage(
      '🏆 PENGUMUMAN JUARA',
      `Selamat! ${player.name} TELAH MENANG menyelesaikan seluruh misi dengan skor ${player.score} poin!`,
      'win'
    );

    sendToClient(player.id, {
      type: 'victoryCertificate',
      winner: record
    });

    broadcast({
      type: 'winnerDeclared',
      winner: record
    });

    return true;
  }
  return false;
}

// Main Game Physics Loop (runs at 30 ticks per second)
const TICK_RATE = 30;
const TICK_INTERVAL = 1000 / TICK_RATE;

setInterval(() => {
  const now = Date.now();

  // 1. Process player inputs & inactivity check
  for (const [playerId, player] of Object.entries(players)) {
    if (player.isBot) continue;

    // Auto-kick if inactive for 3 minutes (180s)
    if (now - player.lastActive > INACTIVITY_TIMEOUT_MS) {
      sendToClient(playerId, {
        type: 'kicked',
        reason: 'AFK / Tidak dimainkan lebih dari 3 menit agar room tidak penuh.'
      });
      addChatMessage('SISTEM', `${player.name} dikeluarkan otomatis karena tidak aktif selama 3 menit.`, 'leave');
      delete players[playerId];
      const ws = clientSockets.get(playerId);
      if (ws) ws.close();
      clientSockets.delete(playerId);
      playerInputs.delete(playerId);
      continue;
    }

    const input = playerInputs.get(playerId);
    if (input) {
      // Player speed: 4 units per tick per user request ("kecepatan 4 bit")
      const moveX = input.dx * PLAYER_SPEED;
      const moveY = input.dy * PLAYER_SPEED;

      if (moveX !== 0 || moveY !== 0) {
        player.lastActive = now;
        const newX = player.x + moveX;
        const newY = player.y + moveY;

        // Wall collisions
        if (!circleHitsWall(newX, player.y, PLAYER_RADIUS)) {
          player.x = Math.max(PLAYER_RADIUS, Math.min(ROOM_WIDTH - PLAYER_RADIUS, newX));
        }
        if (!circleHitsWall(player.x, newY, PLAYER_RADIUS)) {
          player.y = Math.max(PLAYER_RADIUS, Math.min(ROOM_HEIGHT - PLAYER_RADIUS, newY));
        }
      }

      player.angle = input.angle;

      // Handle shooting
      if (input.shoot && player.ammo > 0) {
        player.ammo--;
        player.lastActive = now;
        input.shoot = false; // consume trigger

        const angle = player.angle;
        bullets.push({
          id: `bullet-${playerId}-${now}-${Math.random().toString(36).substring(2, 5)}`,
          ownerId: playerId,
          x: player.x + Math.cos(angle) * (PLAYER_RADIUS + 6),
          y: player.y + Math.sin(angle) * (PLAYER_RADIUS + 6),
          vx: Math.cos(angle) * BULLET_SPEED,
          vy: Math.sin(angle) * BULLET_SPEED,
          createdAt: now
        });
      }
    }
  }

  // 2. Update Bots
  updateBots();
  if (Math.random() < 0.02) balanceBots();

  // 3. Update 5 Virus enemies (speed = 1 per user request: "kecepatan 1 bit mengejar dan membunuh setiap pemain")
  for (let i = 0; i < viruses.length; i++) {
    const virus = viruses[i];
    virus.pulse = (virus.pulse + 0.1) % (Math.PI * 2);

    // Find closest player to chase
    let closestPlayer: Player | null = null;
    let minDist = Infinity;
    for (const p of Object.values(players)) {
      const d = Math.hypot(p.x - virus.x, p.y - virus.y);
      if (d < minDist) {
        minDist = d;
        closestPlayer = p;
      }
    }

    if (closestPlayer) {
      const angle = Math.atan2(closestPlayer.y - virus.y, closestPlayer.x - virus.x);
      // Speed 1 bit per spec
      const vx = Math.cos(angle) * VIRUS_SPEED;
      const vy = Math.sin(angle) * VIRUS_SPEED;

      const nextX = virus.x + vx;
      const nextY = virus.y + vy;

      if (!circleHitsWall(nextX, virus.y, VIRUS_RADIUS)) virus.x = nextX;
      if (!circleHitsWall(virus.x, nextY, VIRUS_RADIUS)) virus.y = nextY;

      // Collision with player: -1 life per user request ("apabila tersentuh kurang 1 nyawa")
      const distToPlayer = Math.hypot(closestPlayer.x - virus.x, closestPlayer.y - virus.y);
      if (distToPlayer < VIRUS_RADIUS + PLAYER_RADIUS) {
        closestPlayer.lives--;
        sendToClient(closestPlayer.id, { type: 'playerHit', damageSource: 'virus', livesLeft: closestPlayer.lives });

        // Knockback virus so it doesn't instantly multihit in a single frame
        virus.x -= vx * 35;
        virus.y -= vy * 35;

        if (closestPlayer.lives <= 0) {
          // Player eliminated
          addChatMessage('SISTEM', `☠️ ${closestPlayer.name} dieliminasi oleh Virus!`, 'kill');
          sendToClient(closestPlayer.id, {
            type: 'gameOver',
            reason: 'Kamu kehabisan nyawa karena disentuh Virus! Silakan masuk kembali dari lobi.'
          });
          delete players[closestPlayer.id];
          const ws = clientSockets.get(closestPlayer.id);
          if (ws) ws.close();
          clientSockets.delete(closestPlayer.id);
        }
      }
    }
  }

  // 4. Update Bullets
  const survivingBullets: Bullet[] = [];
  for (const b of bullets) {
    // Bullet lifespan 1.8 seconds
    if (now - b.createdAt > 1800) continue;

    b.x += b.vx;
    b.y += b.vy;

    // Check boundary or wall hit
    if (b.x < 0 || b.x > ROOM_WIDTH || b.y < 0 || b.y > ROOM_HEIGHT || circleHitsWall(b.x, b.y, 4)) {
      continue;
    }

    let bulletHit = false;

    // Check hit virus (Score: +10 per user request "membunuh musuh virus 10 point")
    for (let vi = 0; vi < viruses.length; vi++) {
      const v = viruses[vi];
      const dist = Math.hypot(v.x - b.x, v.y - b.y);
      if (dist < VIRUS_RADIUS + 6) {
        bulletHit = true;
        const shooter = players[b.ownerId];
        if (shooter) {
          shooter.score += 10;
          shooter.virusKills++;
          sendToClient(shooter.id, { type: 'awardScore', points: 10, reason: 'Membunuh Virus (+10 poin)' });
        }
        // Virus killed: immediately respawns in a random empty location keeping max 5
        respawnVirus(vi);
        break;
      }
    }
    if (bulletHit) continue;

    // Check hit other players (Score: +100 per user request "Skor membunuh pemain lain 100 poin", -1 nyawa)
    for (const [targetId, target] of Object.entries(players)) {
      if (targetId === b.ownerId) continue; // no self-damage
      const dist = Math.hypot(target.x - b.x, target.y - b.y);
      if (dist < PLAYER_RADIUS + 4) {
        bulletHit = true;
        target.lives--;
        sendToClient(target.id, { type: 'playerHit', damageSource: 'bullet', livesLeft: target.lives });

        if (target.lives <= 0) {
          const killer = players[b.ownerId];
          if (killer) {
            killer.score += 100;
            killer.kills++;
            sendToClient(killer.id, { type: 'awardScore', points: 100, reason: 'Membunuh Pemain (+100 poin)' });
            addChatMessage('COMBAT', `🎯 ${killer.name} mengeliminasi ${target.name}! (+100 poin)`, 'kill');

            // Check if killer unlocked mission target
            if (killer.kills === 1) {
              addChatMessage('MISI', `⚡ ${killer.name} berhasil menyelesaikan target Misi 2 (Minimal 1 kill)!`, 'mission');
            }
            checkWinCondition(killer);
          } else {
            addChatMessage('COMBAT', `☠️ ${target.name} tereliminasi dalam pertempuran!`, 'kill');
          }

          // Eliminated player kicked out to lobby per request: "pemain yang kalah atau mati keluar ruangan dan dilobi bisa main lagi"
          sendToClient(target.id, {
            type: 'gameOver',
            reason: 'Nyawamu habis! Kamu tereliminasi dan kembali ke lobi untuk bermain lagi.'
          });
          delete players[target.id];
          const ws = clientSockets.get(target.id);
          if (ws) ws.close();
          clientSockets.delete(target.id);
        }
        break;
      }
    }

    if (!bulletHit) {
      survivingBullets.push(b);
    }
  }
  bullets = survivingBullets;

  // 5. Check Ammo Pickups (+1 bullet per user request "ada peluru random 1 butir acak di room yang muncul terus")
  for (let i = 0; i < ammoPickups.length; i++) {
    const ammo = ammoPickups[i];
    for (const player of Object.values(players)) {
      const dist = Math.hypot(player.x - ammo.x, player.y - ammo.y);
      if (dist < PLAYER_RADIUS + AMMO_RADIUS) {
        player.ammo++;
        sendToClient(player.id, { type: 'ammoCollected', ammo: player.ammo });
        respawnAmmo(i);
        break;
      }
    }
  }

  // 6. Broadcast game state snapshot to clients
  broadcast({
    type: 'gameState',
    state: {
      players,
      viruses,
      bullets,
      ammoPickups,
      diamonds,
      winners
    }
  });
}, TICK_INTERVAL);

// WebSocket connection handling
wss.on('connection', (ws) => {
  let boundPlayerId: string | null = null;

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data.toString());

      // 1. Join Room
      if (msg.type === 'join') {
        const currentCount = Object.keys(players).length;
        if (currentCount >= MAX_PLAYERS) {
          // If there's a bot, kick a bot to free up a slot for the human
          const botId = Object.keys(players).find(id => players[id].isBot);
          if (botId) {
            delete players[botId];
          } else {
            ws.send(JSON.stringify({ type: 'roomFull', message: 'Room penuh! Maksimal 30 pemain.' }));
            return;
          }
        }

        const id = `player-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        boundPlayerId = id;
        clientSockets.set(id, ws);

        const pos = getRandomFreePosition(PLAYER_RADIUS);
        const newPlayer: Player = {
          id,
          name: msg.name?.trim().slice(0, 18) || `Player_${Math.floor(Math.random() * 1000)}`,
          color: msg.color || '#38bdf8',
          avatar: msg.avatar || '🎯',
          x: pos.x,
          y: pos.y,
          angle: 0,
          lives: 10, // 10 nyawa bawaan
          ammo: 20, // 20 peluru bawaan AK-47
          score: 0,
          blueDiamonds: 0,
          redDiamonds: 0,
          kills: 0,
          virusKills: 0,
          isBot: false,
          lastActive: Date.now(),
          hasWon: false
        };

        players[id] = newPlayer;

        // Send welcome payload with full initial map configuration
        ws.send(JSON.stringify({
          type: 'joined',
          playerId: id,
          player: newPlayer,
          roomWidth: ROOM_WIDTH,
          roomHeight: ROOM_HEIGHT,
          walls: WALLS,
          winners
        }));

        // Broadcast notification to room: "sistem notifikasi saat ada pemain baru yang masuk ke dalam ruang"
        addChatMessage('SISTEM', `👋 ${newPlayer.name} telah bergabung ke dalam arena! (Pemain: ${Object.keys(players).length}/30)`, 'join');
        broadcast({
          type: 'playerJoinedNotification',
          playerName: newPlayer.name,
          playerCount: Object.keys(players).length
        });
      }

      // 2. Client Input
      else if (msg.type === 'input' && boundPlayerId && players[boundPlayerId]) {
        playerInputs.set(boundPlayerId, {
          dx: Math.max(-1, Math.min(1, Number(msg.dx) || 0)),
          dy: Math.max(-1, Math.min(1, Number(msg.dy) || 0)),
          angle: Number(msg.angle) || 0,
          shoot: Boolean(msg.shoot)
        });
      }

      // 3. Answer Math Question from Diamond
      else if (msg.type === 'answerQuestion' && boundPlayerId && players[boundPlayerId]) {
        const player = players[boundPlayerId];
        const diamondIndex = diamonds.findIndex(d => d.id === msg.diamondId);

        if (diamondIndex !== -1) {
          const diamond = diamonds[diamondIndex];
          const isBlue = diamond.type === 'blue';
          const qList = isBlue ? SPLSV_QUESTIONS : SPLDV_QUESTIONS;
          const question = qList.find(q => q.id === diamond.questionId);

          if (question) {
            const isCorrect = msg.selectedOptionIndex === question.correctIndex;

            if (isCorrect) {
              if (isBlue) {
                // User spec: 1 berlian berisi 10 peluru, +100 point, +1 blue diamond
                player.ammo += 10;
                player.blueDiamonds += 1;
                player.score += 100;
                sendToClient(boundPlayerId, {
                  type: 'quizResult',
                  correct: true,
                  message: 'Benar! Kamu mendapatkan 1 Berlian Biru, +10 Peluru AK-47, dan +100 Poin!',
                  explanation: question.explanation
                });
                addChatMessage('KUIS', `💎 ${player.name} berhasil menjawab soal SPLSV! (+100 poin & +10 peluru)`, 'mission');
              } else {
                // User spec: berlian merah SPLDV jika dapat mendapat 2 nyawa, +100 point
                player.lives = Math.min(15, player.lives + 2);
                player.redDiamonds += 1;
                player.score += 100;
                sendToClient(boundPlayerId, {
                  type: 'quizResult',
                  correct: true,
                  message: 'Benar! Kamu mendapatkan 1 Berlian Merah, +2 Nyawa, dan +100 Poin!',
                  explanation: question.explanation
                });
                addChatMessage('KUIS', `❤️ ${player.name} berhasil menjawab soal SPLDV! (+2 Nyawa & +100 poin)`, 'mission');
              }

              // Check if player reached mission targets notification: "tambahkan notifikasi saat pemain mencapai target misi"
              if (player.blueDiamonds === 20) {
                addChatMessage('MISI', `🌟 LUAR BIASA! ${player.name} mencapai target 20 Berlian Biru!`, 'mission');
              }
              if (player.redDiamonds === 10) {
                addChatMessage('MISI', `🌟 LUAR BIASA! ${player.name} mencapai alternatif target 10 Berlian Merah!`, 'mission');
              }

              checkWinCondition(player);
            } else {
              sendToClient(boundPlayerId, {
                type: 'quizResult',
                correct: false,
                message: 'Jawaban kurang tepat. Pelajari pembahasannya dan coba lagi!',
                explanation: question.explanation
              });
            }

            // User spec: "jika jawab benar atau salah berlian hilang dan akan muncul ditempat lain"
            respawnDiamond(diamondIndex, diamond.type);
          }
        }
      }

      // 4. Global Chat Message
      else if (msg.type === 'chat' && boundPlayerId && players[boundPlayerId]) {
        const text = String(msg.text || '').trim();
        if (text.length > 0 && text.length <= 150) {
          const player = players[boundPlayerId];
          player.lastActive = Date.now();
          addChatMessage(player.name, text, 'chat', player.id);
        }
      }

      // 5. Disqualification event (Tab switched or Fullscreen exited)
      else if (msg.type === 'disqualify' && boundPlayerId && players[boundPlayerId]) {
        const player = players[boundPlayerId];
        addChatMessage('SISTEM', `⚠️ ${player.name} didiskualifikasi karena keluar dari mode Full Screen atau membuka tab lain!`, 'leave');
        sendToClient(boundPlayerId, {
          type: 'disqualified',
          reason: 'Kamu didiskualifikasi karena keluar dari mode Full Screen atau berpindah tab saat bermain!'
        });
        delete players[boundPlayerId];
        clientSockets.delete(boundPlayerId);
        playerInputs.delete(boundPlayerId);
        ws.close();
      }
    } catch {
      // ignore parse errors
    }
  });

  ws.on('close', () => {
    if (boundPlayerId) {
      const p = players[boundPlayerId];
      if (p) {
        addChatMessage('SISTEM', `${p.name} telah meninggalkan arena.`, 'leave');
        delete players[boundPlayerId];
      }
      clientSockets.delete(boundPlayerId);
      playerInputs.delete(boundPlayerId);
    }
  });
});

// Initialize game items and bots
initViruses();
initDiamonds();
initAmmoPickups();
balanceBots();

// Express API endpoints & Vite dev server
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    playersCount: Object.keys(players).length,
    virusesCount: viruses.length,
    diamondsCount: diamonds.length
  });
});

// Question lookup endpoint for diamond interaction
app.get('/api/question/:id', (req, res) => {
  const qId = parseInt(req.params.id, 10);
  const q = SPLSV_QUESTIONS.find(x => x.id === qId) || SPLDV_QUESTIONS.find(x => x.id === qId);
  if (!q) {
    return res.status(404).json({ error: 'Question not found' });
  }
  // Return question without revealing correctIndex to prevent inspect element cheating
  res.json({
    id: q.id,
    type: q.type,
    question: q.question,
    subtext: q.subtext,
    options: q.options
  });
});

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  }

  server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer();
