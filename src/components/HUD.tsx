import React from 'react';
import { Player } from '../types/game';
import {
  Heart,
  Crosshair,
  Sparkles,
  Trophy,
  Volume2,
  VolumeX,
  Maximize2,
  Award,
  Users,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface HUDProps {
  player: Player;
  totalPlayers: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenLeaderboard: () => void;
  onOpenCertificate?: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  nearDiamondType: 'blue' | 'red' | null;
  onInteractDiamond: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  player,
  totalPlayers,
  soundEnabled,
  onToggleSound,
  onOpenLeaderboard,
  onOpenCertificate,
  onToggleFullscreen,
  isFullscreen,
  nearDiamondType,
  onInteractDiamond
}) => {
  // 10 lives representation
  const maxLives = 10;
  const currentLives = Math.max(0, Math.min(maxLives, player.lives));

  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex flex-col justify-between p-2 sm:p-4 select-none">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-start justify-between gap-2 pointer-events-auto">
        {/* Left: Player Profile & Health & Ammo */}
        <div className="flex flex-col gap-1.5 bg-slate-900/85 backdrop-blur-md border border-slate-700/80 rounded-2xl p-2.5 sm:p-3 shadow-xl">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">{player.avatar}</span>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                <span>{player.name}</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-cyan-500/20 text-cyan-300 rounded font-mono border border-cyan-500/30">
                  Speed 4 Bit
                </span>
              </div>
              <div className="text-[11px] text-yellow-400 font-mono font-bold">
                Skor: {player.score} Poin
              </div>
            </div>
          </div>

          {/* 10 Hearts / Health Bar */}
          <div className="flex items-center gap-1 mt-1">
            <div className="flex gap-0.5 sm:gap-1">
              {Array.from({ length: maxLives }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3.5 sm:w-4 h-3.5 sm:h-4 rounded flex items-center justify-center transition-all ${
                    i < currentLives
                      ? 'bg-rose-600 text-white shadow-sm shadow-rose-500/50 scale-100'
                      : 'bg-slate-800 text-slate-600 scale-90 border border-slate-700'
                  }`}
                >
                  <Heart className={`w-2.5 sm:w-3 h-2.5 sm:h-3 ${i < currentLives ? 'fill-current' : ''}`} />
                </div>
              ))}
            </div>
            <span className="text-[11px] font-bold text-rose-400 ml-1 font-mono">
              {player.lives}/10
            </span>
          </div>

          {/* Ammo & Kills row */}
          <div className="flex items-center gap-3 text-xs pt-1 border-t border-slate-800/80 mt-0.5">
            <div className="flex items-center gap-1 font-mono">
              <span className="text-amber-400 font-bold">AK-47:</span>
              <span className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                player.ammo > 5 ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/30 text-rose-300 animate-pulse'
              }`}>
                {player.ammo} Peluru
              </span>
            </div>
            <div className="flex items-center gap-1 text-slate-300 text-[11px]">
              <Crosshair className="w-3 h-3 text-emerald-400" />
              <span>{player.kills} Kills</span>
            </div>
          </div>
        </div>

        {/* Center: Mission Progress Banner */}
        <div className="hidden md:flex flex-col items-center bg-slate-900/85 backdrop-blur-md border border-slate-700/80 rounded-2xl px-4 py-2 shadow-xl text-center">
          <div className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Target Misi Survival Matematika
          </div>
          <div className="flex items-center gap-4 mt-1.5 text-xs font-medium">
            {/* Mission 1: 20 Blue Diamonds */}
            <div className="flex items-center gap-2">
              <span className="text-cyan-400">💎 Berlian Biru (SPLSV):</span>
              <div className="w-24 bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
                <div
                  className="bg-cyan-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (player.blueDiamonds / 20) * 100)}%` }}
                />
              </div>
              <span className="font-mono font-bold text-cyan-300 text-[11px]">
                {player.blueDiamonds}/20
              </span>
            </div>

            {/* Mission 2: 1 Kill OR 10 Red Diamonds */}
            <div className="flex items-center gap-1.5 text-slate-300 text-[11px] border-l border-slate-700 pl-3">
              <span>Misi 2:</span>
              <span className={player.kills >= 1 || player.redDiamonds >= 10 ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                {player.kills >= 1 ? '✓ 1 Kill Tercapai' : player.redDiamonds >= 10 ? '✓ 10 Merah Tercapai' : `1 Kill (${player.kills}/1) atau 10 Merah (${player.redDiamonds}/10)`}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md border border-slate-700/80 rounded-2xl p-1.5 shadow-xl">
          {/* Players in room counter */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800/80 rounded-xl text-xs text-slate-300">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono font-bold text-white">{totalPlayers}</span>
            <span className="text-[10px] text-slate-400">/30</span>
          </div>

          {/* Certificate button if won */}
          {player.hasWon && onOpenCertificate && (
            <button
              onClick={onOpenCertificate}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-transform active:scale-95 cursor-pointer shadow-md shadow-amber-500/30 animate-bounce"
            >
              <Award className="w-3.5 h-3.5" />
              Sertifikat Juara
            </button>
          )}

          {/* Leaderboard Button */}
          <button
            onClick={onOpenLeaderboard}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl transition-transform active:scale-95 cursor-pointer"
            title="Papan Peringkat Real-Time"
          >
            <Trophy className="w-4 h-4" />
          </button>

          {/* Sound Toggle Button */}
          <button
            onClick={onToggleSound}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-transform active:scale-95 cursor-pointer"
            title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={onToggleFullscreen}
            className={`p-2 rounded-xl transition-transform active:scale-95 cursor-pointer ${
              isFullscreen ? 'bg-cyan-600/30 text-cyan-400 border border-cyan-500/50' : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Full Screen (Wajib agar tidak didiskualifikasi)"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Near Diamond Prompt for Laptop/Desktop (Mobile has dedicated button) */}
      {nearDiamondType && (
        <div className="self-center mb-16 sm:mb-20 pointer-events-auto animate-bounce">
          <button
            onClick={onInteractDiamond}
            className={`px-6 py-3 rounded-2xl font-black text-sm sm:text-base shadow-2xl flex items-center gap-2 cursor-pointer border-2 transition-transform active:scale-95 ${
              nearDiamondType === 'blue'
                ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 border-white shadow-cyan-500/50'
                : 'bg-rose-500 hover:bg-rose-400 text-white border-white shadow-rose-500/50'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span>
              Tekan [E] atau Klik untuk Buka Soal {nearDiamondType === 'blue' ? 'SPLSV (+10 Peluru)' : 'SPLDV (+2 Nyawa)'}!
            </span>
          </button>
        </div>
      )}

      {/* Bottom Floating Warning Badge */}
      <div className="self-center hidden sm:flex items-center gap-2 bg-slate-900/90 border border-amber-500/40 px-3 py-1 rounded-full text-[11px] text-amber-300 shadow-lg">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
        <span>Full screen wajib: Jangan ganti tab atau keluar full screen agar tidak didiskualifikasi.</span>
        <span className="text-slate-400">|</span>
        <Clock className="w-3 h-3 text-slate-400" />
        <span className="text-slate-400">Auto-kick jika AFK 3 menit.</span>
      </div>
    </div>
  );
};
