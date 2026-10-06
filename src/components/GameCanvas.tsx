import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Player,
  Bullet,
  Virus,
  Diamond,
  AmmoPickup,
  Wall,
  ROOM_WIDTH,
  ROOM_HEIGHT,
  PLAYER_RADIUS,
  VIRUS_RADIUS,
  DIAMOND_RADIUS,
  AMMO_RADIUS
} from '../types/game';
import { sounds } from '../utils/audio';

interface GameCanvasProps {
  myPlayerId: string;
  players: Record<string, Player>;
  bullets: Bullet[];
  viruses: Virus[];
  diamonds: Diamond[];
  ammoPickups: AmmoPickup[];
  walls: Wall[];
  onShoot: () => void;
  onAim: (angle: number) => void;
  onMoveKeys: (dx: number, dy: number) => void;
  onCheckNearDiamond: (diamond: Diamond | null) => void;
  onInteractDiamond: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  life: number;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  myPlayerId,
  players,
  bullets,
  viruses,
  diamonds,
  ammoPickups,
  walls,
  onShoot,
  onAim,
  onMoveKeys,
  onCheckNearDiamond,
  onInteractDiamond
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const prevBulletsCountRef = useRef(bullets.length);
  const prevLivesRef = useRef<number>(10);

  // Active keyboard state for desktop
  const keysDown = useRef<{ [key: string]: boolean }>({});

  // Mouse aim position in world coordinates
  const mousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Camera viewport
  const cameraRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Spawn visual particles
  const spawnExplosion = useCallback((x: number, y: number, color: string, count: number = 10) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: Math.random() * 3 + 2,
        alpha: 1,
        life: 1
      });
    }
  }, []);

  // Keyboard navigation listener (WASD, Arrows, E, Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger game hotkeys if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      keysDown.current[e.key.toLowerCase()] = true;

      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        onShoot();
      }

      if (e.key.toLowerCase() === 'e') {
        onInteractDiamond();
      }

      updateMoveFromKeys();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysDown.current[e.key.toLowerCase()] = false;
      updateMoveFromKeys();
    };

    const updateMoveFromKeys = () => {
      let dx = 0;
      let dy = 0;

      if (keysDown.current['w'] || keysDown.current['arrowup']) dy -= 1;
      if (keysDown.current['s'] || keysDown.current['arrowdown']) dy += 1;
      if (keysDown.current['a'] || keysDown.current['arrowleft']) dx -= 1;
      if (keysDown.current['d'] || keysDown.current['arrowright']) dx += 1;

      // Normalize diagonal movement
      if (dx !== 0 && dy !== 0) {
        const factor = 1 / Math.SQRT2;
        dx *= factor;
        dy *= factor;
      }

      onMoveKeys(dx, dy);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onShoot, onMoveKeys, onInteractDiamond]);

  // Mouse aim and click-to-shoot listener
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;

    const myPlayer = players[myPlayerId];
    if (!myPlayer) return;

    // Convert screen coordinates to world coordinates
    const worldX = screenX + cameraRef.current.x;
    const worldY = screenY + cameraRef.current.y;
    mousePos.current = { x: worldX, y: worldY };

    const angle = Math.atan2(worldY - myPlayer.y, worldX - myPlayer.x);
    onAim(angle);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.button === 0) {
      // Left click shoots
      onShoot();
    }
  };

  // Detect sound and proximity to diamonds
  useEffect(() => {
    const myPlayer = players[myPlayerId];
    if (!myPlayer) return;

    // Check hit sound
    if (myPlayer.lives < prevLivesRef.current) {
      sounds.playHit();
      spawnExplosion(myPlayer.x, myPlayer.y, '#ef4444', 16);
    }
    prevLivesRef.current = myPlayer.lives;

    // Check near diamond
    let nearestDiamond: Diamond | null = null;
    let minDist = 75; // proximity trigger

    for (const d of diamonds) {
      const dist = Math.hypot(myPlayer.x - d.x, myPlayer.y - d.y);
      if (dist < minDist) {
        minDist = dist;
        nearestDiamond = d;
      }
    }
    onCheckNearDiamond(nearestDiamond);
  }, [players, diamonds, myPlayerId, onCheckNearDiamond, spawnExplosion]);

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      // Auto-resize canvas to match container window
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      const screenWidth = canvas.width;
      const screenHeight = canvas.height;

      const myPlayer = players[myPlayerId];

      // Update camera position to follow player smoothly
      if (myPlayer) {
        const targetCamX = myPlayer.x - screenWidth / 2;
        const targetCamY = myPlayer.y - screenHeight / 2;

        cameraRef.current.x += (targetCamX - cameraRef.current.x) * 0.15;
        cameraRef.current.y += (targetCamY - cameraRef.current.y) * 0.15;
      }

      // Clamp camera within room bounds (with small margin)
      cameraRef.current.x = Math.max(0, Math.min(ROOM_WIDTH - screenWidth, cameraRef.current.x));
      cameraRef.current.y = Math.max(0, Math.min(ROOM_HEIGHT - screenHeight, cameraRef.current.y));

      const camX = cameraRef.current.x;
      const camY = cameraRef.current.y;

      // 1. Clear background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, screenWidth, screenHeight);

      // Save context for camera translation
      ctx.save();
      ctx.translate(-camX, -camY);

      // 2. Draw Floor Grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      const gridSize = 60;
      const startX = Math.floor(camX / gridSize) * gridSize;
      const endX = camX + screenWidth;
      const startY = Math.floor(camY / gridSize) * gridSize;
      const endY = camY + screenHeight;

      ctx.beginPath();
      for (let x = startX; x <= endX; x += gridSize) {
        ctx.moveTo(x, Math.max(0, camY));
        ctx.lineTo(x, Math.min(ROOM_HEIGHT, camY + screenHeight));
      }
      for (let y = startY; y <= endY; y += gridSize) {
        ctx.moveTo(Math.max(0, camX), y);
        ctx.lineTo(Math.min(ROOM_WIDTH, camX + screenWidth), y);
      }
      ctx.stroke();

      // Draw Room Outer Border Glow
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.strokeRect(20, 20, ROOM_WIDTH - 40, ROOM_HEIGHT - 40);

      // 3. Draw Walls
      for (const w of walls) {
        // Wall shadow/base
        ctx.fillStyle = w.color || '#334155';
        ctx.fillRect(w.x, w.y, w.width, w.height);

        // Wall neon bevel border
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.strokeRect(w.x, w.y, w.width, w.height);

        // Subtle internal highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.fillRect(w.x + 3, w.y + 3, w.width - 6, w.height - 6);
      }

      // 4. Draw Ammo Pickups (+1 bullet)
      const now = Date.now();
      for (const ammo of ammoPickups) {
        const floatOffset = Math.sin(now * 0.005 + ammo.x) * 3;

        ctx.save();
        ctx.translate(ammo.x, ammo.y + floatOffset);

        // Golden Ammo Glow
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(0, 0, AMMO_RADIUS, 0, Math.PI * 2);
        ctx.fill();

        // Bullet icon
        ctx.fillStyle = '#78350f';
        ctx.beginPath();
        ctx.rect(-3, -6, 6, 12);
        ctx.fill();
        ctx.restore();
      }

      // 5. Draw Diamonds (Blue = SPLSV, Red = SPLDV)
      for (const diamond of diamonds) {
        const isBlue = diamond.type === 'blue';
        const floatOffset = Math.sin(now * 0.004 + diamond.x) * 4;
        const pulse = (Math.sin(now * 0.008) + 1) * 0.5;

        ctx.save();
        ctx.translate(diamond.x, diamond.y + floatOffset);

        // Glow ring
        ctx.shadowColor = isBlue ? '#38bdf8' : '#f43f5e';
        ctx.shadowBlur = 15 + pulse * 10;

        // Diamond polygon shape
        ctx.fillStyle = isBlue ? '#06b6d4' : '#e11d48';
        ctx.beginPath();
        ctx.moveTo(0, -DIAMOND_RADIUS - 2);
        ctx.lineTo(DIAMOND_RADIUS + 2, 0);
        ctx.moveTo(0, -DIAMOND_RADIUS - 2);
        ctx.lineTo(DIAMOND_RADIUS + 2, 0);
        ctx.lineTo(0, DIAMOND_RADIUS + 2);
        ctx.lineTo(-DIAMOND_RADIUS - 2, 0);
        ctx.closePath();
        ctx.fill();

        // Inner jewel facets
        ctx.fillStyle = isBlue ? '#a5f3fc' : '#fecdd3';
        ctx.beginPath();
        ctx.moveTo(0, -DIAMOND_RADIUS / 2);
        ctx.lineTo(DIAMOND_RADIUS / 2, 0);
        ctx.lineTo(0, DIAMOND_RADIUS / 2);
        ctx.lineTo(-DIAMOND_RADIUS / 2, 0);
        ctx.closePath();
        ctx.fill();

        // Floating label
        ctx.shadowBlur = 0;
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = isBlue ? '#38bdf8' : '#fb7185';
        ctx.fillText(isBlue ? 'SPLSV (+10)' : 'SPLDV (+2❤️)', 0, -DIAMOND_RADIUS - 8);

        ctx.restore();
      }

      // 6. Draw Exactly 5 Virus Enemies (Speed 1, persistent hunter)
      for (const virus of viruses) {
        ctx.save();
        ctx.translate(virus.x, virus.y);

        // Toxic biohazard glow
        ctx.shadowColor = '#22c55e';
        ctx.shadowBlur = 18;

        // Spiky virus tentacles
        const spikes = 10;
        const outerRad = VIRUS_RADIUS + Math.sin(now * 0.008) * 3;
        const innerRad = VIRUS_RADIUS - 5;

        ctx.fillStyle = '#15803d';
        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
          const r = i % 2 === 0 ? outerRad : innerRad;
          const a = (i * Math.PI) / spikes + virus.pulse;
          const px = Math.cos(a) * r;
          const py = Math.sin(a) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();

        // Central core
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.arc(0, 0, innerRad * 0.6, 0, Math.PI * 2);
        ctx.fill();

        // Virus Glowing Eyes
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(-4, -2, 2.5, 0, Math.PI * 2);
        ctx.arc(4, -2, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Title
        ctx.shadowBlur = 0;
        ctx.font = 'bold 9px sans-serif';
        ctx.fillStyle = '#4ade80';
        ctx.textAlign = 'center';
        ctx.fillText('VIRUS 1-BIT', 0, -VIRUS_RADIUS - 6);

        ctx.restore();
      }

      // 7. Draw Bullets (AK-47 Tracers)
      for (const b of bullets) {
        ctx.save();
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(b.x - b.vx * 1.5, b.y - b.vy * 1.5);
        ctx.stroke();
        ctx.restore();
      }

      // 8. Draw Players (up to 30)
      for (const player of Object.values(players)) {
        const isMe = player.id === myPlayerId;

        ctx.save();
        ctx.translate(player.x, player.y);

        // Highlighting circle for current player
        if (isMe) {
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.arc(0, 0, PLAYER_RADIUS + 8, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Gun Barrel aiming towards player.angle
        ctx.save();
        ctx.rotate(player.angle);
        ctx.fillStyle = '#475569';
        ctx.fillRect(10, -3.5, 18, 7);
        // AK-47 muzzle tip
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(24, -4.5, 5, 9);
        ctx.restore();

        // Player Body Circle
        ctx.shadowColor = player.color;
        ctx.shadowBlur = isMe ? 12 : 5;
        ctx.fillStyle = player.color;
        ctx.beginPath();
        ctx.arc(0, 0, PLAYER_RADIUS, 0, Math.PI * 2);
        ctx.fill();

        // Inner Border
        ctx.strokeStyle = isMe ? '#ffffff' : '#0f172a';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Player Avatar Icon in center
        ctx.shadowBlur = 0;
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(player.avatar, 0, 0);

        // Player Name & Badges Tag above head
        ctx.font = 'bold 11px sans-serif';
        ctx.fillStyle = isMe ? '#38bdf8' : '#f1f5f9';
        ctx.textAlign = 'center';
        ctx.fillText(player.name, 0, -PLAYER_RADIUS - 16);

        // 10-Segment Health Mini Bar
        const barWidth = 36;
        const barHeight = 4.5;
        const barX = -barWidth / 2;
        const barY = -PLAYER_RADIUS - 8;

        ctx.fillStyle = '#1e293b';
        ctx.fillRect(barX, barY, barWidth, barHeight);

        const healthRatio = Math.max(0, Math.min(1, player.lives / 10));
        ctx.fillStyle = healthRatio > 0.4 ? '#22c55e' : '#ef4444';
        ctx.fillRect(barX, barY, barWidth * healthRatio, barHeight);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, barY, barWidth, barHeight);

        // Diamond badges below feet
        ctx.font = '9px monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(`💎${player.blueDiamonds} ❤️${player.redDiamonds}`, 0, PLAYER_RADIUS + 12);

        ctx.restore();
      }

      // 9. Draw Particle Explosions
      const aliveParticles: Particle[] = [];
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.03;
        if (p.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          aliveParticles.push(p);
        }
      }
      particlesRef.current = aliveParticles;

      // Restore camera
      ctx.restore();

      // 10. Minimap in Top-Right
      const mapWidth = 140;
      const mapHeight = (mapWidth / ROOM_WIDTH) * ROOM_HEIGHT;
      const mapX = screenWidth - mapWidth - 16;
      const mapY = 16;

      ctx.save();
      // Minimap background
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.fillRect(mapX, mapY, mapWidth, mapHeight);
      ctx.strokeRect(mapX, mapY, mapWidth, mapHeight);

      const scaleX = mapWidth / ROOM_WIDTH;
      const scaleY = mapHeight / ROOM_HEIGHT;

      // Draw Walls on minimap
      ctx.fillStyle = '#475569';
      for (const w of walls) {
        ctx.fillRect(mapX + w.x * scaleX, mapY + w.y * scaleY, w.width * scaleX, w.height * scaleY);
      }

      // Draw Diamonds on minimap
      for (const d of diamonds) {
        ctx.fillStyle = d.type === 'blue' ? '#38bdf8' : '#f43f5e';
        ctx.beginPath();
        ctx.arc(mapX + d.x * scaleX, mapY + d.y * scaleY, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Viruses on minimap
      ctx.fillStyle = '#22c55e';
      for (const v of viruses) {
        ctx.beginPath();
        ctx.arc(mapX + v.x * scaleX, mapY + v.y * scaleY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Players on minimap
      for (const p of Object.values(players)) {
        const isMe = p.id === myPlayerId;
        ctx.fillStyle = isMe ? '#facc15' : p.color;
        ctx.beginPath();
        ctx.arc(mapX + p.x * scaleX, mapY + p.y * scaleY, isMe ? 3.5 : 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Viewport rectangle on minimap
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1;
      ctx.strokeRect(
        mapX + camX * scaleX,
        mapY + camY * scaleY,
        screenWidth * scaleX,
        screenHeight * scaleY
      );

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [myPlayerId, players, bullets, viruses, diamonds, ammoPickups, walls]);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      className="absolute inset-0 w-full h-full block cursor-crosshair touch-none select-none"
    />
  );
};
