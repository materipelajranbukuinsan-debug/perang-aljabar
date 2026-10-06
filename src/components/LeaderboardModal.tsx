import React, { useState } from 'react';
import { Player, WinnerRecord } from '../types/game';
import { Trophy, Medal, Users, X, Award, Crosshair, Sparkles, Heart } from 'lucide-react';

interface LeaderboardModalProps {
  players: Record<string, Player>;
  winners: WinnerRecord[];
  myPlayerId: string;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  players,
  winners,
  myPlayerId,
  onClose
}) => {
  const [tab, setTab] = useState<'live' | 'hallOfFame'>('live');

  const sortedPlayers = Object.values(players).sort((a, b) => b.score - a.score);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="max-w-2xl w-full bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800/90 border-b border-slate-700/80">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Papan Peringkat Arena</h2>
              <p className="text-xs text-slate-400">Skor Real-Time & Papan Juara Misi Survival</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-6 pt-3 gap-4">
          <button
            onClick={() => setTab('live')}
            className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              tab === 'live'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            Skor Live Pertandingan ({sortedPlayers.length})
          </button>
          <button
            onClick={() => setTab('hallOfFame')}
            className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              tab === 'hallOfFame'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            Papan Juara Misi ({winners.length})
          </button>
        </div>

        {/* Content Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2">
          {tab === 'live' ? (
            <div className="divide-y divide-slate-800/80">
              {/* Header row */}
              <div className="grid grid-cols-12 text-[11px] font-semibold uppercase text-slate-400 pb-2 px-3">
                <span className="col-span-1">No</span>
                <span className="col-span-4">Pemain</span>
                <span className="col-span-2 text-center">Nyawa</span>
                <span className="col-span-2 text-center">Berlian</span>
                <span className="col-span-1 text-center">Kill</span>
                <span className="col-span-2 text-right">Skor</span>
              </div>

              {sortedPlayers.map((player, idx) => {
                const isMe = player.id === myPlayerId;
                return (
                  <div
                    key={player.id}
                    className={`grid grid-cols-12 items-center py-2.5 px-3 rounded-xl text-xs transition-colors ${
                      isMe
                        ? 'bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 font-bold'
                        : idx === 0
                        ? 'bg-amber-500/10 text-amber-200'
                        : 'hover:bg-slate-800/50 text-slate-200'
                    }`}
                  >
                    <div className="col-span-1 flex items-center font-bold">
                      {idx === 0 ? (
                        <Medal className="w-4 h-4 text-amber-400" />
                      ) : idx === 1 ? (
                        <Medal className="w-4 h-4 text-slate-300" />
                      ) : idx === 2 ? (
                        <Medal className="w-4 h-4 text-amber-600" />
                      ) : (
                        <span className="text-slate-500">{idx + 1}</span>
                      )}
                    </div>

                    <div className="col-span-4 flex items-center gap-2 truncate">
                      <span className="text-sm">{player.avatar}</span>
                      <span className="truncate">
                        {player.name}
                        {isMe && <span className="ml-1 text-[10px] text-cyan-400">(Kamu)</span>}
                        {player.hasWon && <span className="ml-1 text-[10px] text-amber-400">👑 JUARA</span>}
                      </span>
                    </div>

                    <div className="col-span-2 flex items-center justify-center gap-1 text-rose-400">
                      <Heart className="w-3.5 h-3.5 fill-rose-500" />
                      <span>{player.lives}/10</span>
                    </div>

                    <div className="col-span-2 flex items-center justify-center gap-2">
                      <span className="flex items-center text-cyan-400 text-[11px]" title="Berlian Biru">
                        💎 {player.blueDiamonds}
                      </span>
                      <span className="flex items-center text-rose-400 text-[11px]" title="Berlian Merah">
                        ❤️ {player.redDiamonds}
                      </span>
                    </div>

                    <div className="col-span-1 text-center font-mono text-slate-300">
                      {player.kills}
                    </div>

                    <div className="col-span-2 text-right font-bold text-yellow-400 font-mono">
                      {player.score}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              {winners.length === 0 ? (
                <div className="text-center py-12 text-slate-500 space-y-2">
                  <Trophy className="w-10 h-10 mx-auto opacity-30" />
                  <p className="text-sm font-medium">Belum ada pemain yang menyelesaikan misi di sesi ini.</p>
                  <p className="text-xs text-slate-600">
                    Jadilah yang pertama mengumpulkan 20 Berlian Biru & menyelesaikan eliminasi!
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {winners.map((win, idx) => (
                    <div
                      key={win.id + idx}
                      className="p-3.5 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent border border-amber-500/30 rounded-xl flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-xs">
                          #{idx + 1}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                            {win.name}
                            <span className="text-[10px] px-2 py-0.5 bg-amber-400/20 text-amber-300 rounded-full">
                              Lulus Sertifikasi
                            </span>
                          </div>
                          <div className="text-slate-400 text-[11px] flex items-center gap-2 mt-0.5">
                            <span>💎 {win.blueDiamonds} Berlian Biru</span>
                            <span>•</span>
                            <span>❤️ {win.redDiamonds} Berlian Merah</span>
                            <span>•</span>
                            <span>🎯 {win.kills} Kills</span>
                            <span>•</span>
                            <span>Jam: {win.wonAt}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-extrabold text-yellow-400 font-mono">
                          {win.score} Poin
                        </div>
                        <div className="text-[10px] text-emerald-400 font-semibold">Tuntas 100%</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 text-center text-xs text-slate-400">
          Misi Menang: 20 Berlian Biru + (1 Kill Live Player ATAU 10 Berlian Merah)
        </div>
      </div>
    </div>
  );
};
