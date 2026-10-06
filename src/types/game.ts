export interface Wall {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
}

export interface Player {
  id: string;
  name: string;
  color: string;
  avatar: string;
  x: number;
  y: number;
  angle: number;
  lives: number; // starts at 10
  ammo: number; // starts at 20
  score: number;
  blueDiamonds: number; // target 20
  redDiamonds: number; // secondary target 10
  kills: number; // live player kills
  virusKills: number;
  isBot?: boolean;
  lastActive: number;
  hasWon: boolean;
  winTime?: number;
}

export interface Bullet {
  id: string;
  ownerId: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  createdAt: number;
}

export interface Virus {
  id: string;
  x: number;
  y: number;
  radius: number;
  targetPlayerId?: string;
  pulse: number;
}

export interface AmmoPickup {
  id: string;
  x: number;
  y: number;
}

export interface Diamond {
  id: string;
  type: 'blue' | 'red';
  x: number;
  y: number;
  questionId: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
  isSystem?: boolean;
  type?: 'chat' | 'join' | 'leave' | 'kill' | 'win' | 'mission';
}

export interface GameNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'danger' | 'victory';
  timestamp: number;
}

export interface WinnerRecord {
  id: string;
  name: string;
  score: number;
  blueDiamonds: number;
  redDiamonds: number;
  kills: number;
  wonAt: string;
}

export interface GameState {
  roomWidth: number;
  roomHeight: number;
  players: Record<string, Player>;
  viruses: Virus[];
  bullets: Bullet[];
  ammoPickups: AmmoPickup[];
  diamonds: Diamond[];
  walls: Wall[];
  recentChat: ChatMessage[];
  winners: WinnerRecord[];
}

export interface ClientInput {
  dx: number;
  dy: number;
  angle: number;
  shoot?: boolean;
}

export const ROOM_WIDTH = 2500;
export const ROOM_HEIGHT = 1800;
export const MAX_PLAYERS = 30;
export const PLAYER_RADIUS = 20;
export const PLAYER_SPEED = 4; // 4 bit per user request
export const VIRUS_SPEED = 1; // 1 bit per user request
export const BULLET_SPEED = 12;
export const VIRUS_RADIUS = 22;
export const DIAMOND_RADIUS = 18;
export const AMMO_RADIUS = 12;
export const MAX_VIRUSES = 5; // exactly 5 viruses
export const INACTIVITY_TIMEOUT_MS = 180000; // 3 minutes kick
