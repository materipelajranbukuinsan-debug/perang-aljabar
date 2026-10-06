import React, { useState } from 'react';
import {
  Trophy,
  Shield,
  Crosshair,
  Sparkles,
  Users,
  Play,
  Maximize2,
  Clock,
  Heart,
  Award,
  AlertTriangle,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { WinnerRecord } from '../types/game';

interface LobbyProps {
  onJoin: (name: string, avatar: string, color: string) => void;
  winners: WinnerRecord[];
  isConnecting: boolean;
  errorNotice?: string | null;
}

const AVATARS = ['🎯', '🤖', '⚡', '🚀', '🔥', '🛡️', '🦊', '🐉', '👾', '💎'];
const COLORS = [
  { name: 'Cyan Neon', hex: '#38bdf8' },
  { name: 'Emerald', hex: '#34d399' },
  { name: 'Amber Gold', hex: '#fbbf24' },
  { name: 'Rose Red', hex: '#fb7185' },
  { name: 'Violet', hex: '#a78bfa' },
  { name: 'Electric Blue', hex: '#60a5fa' }
];

export const Lobby: React.FC<LobbyProps> = ({
  onJoin,
  winners,
  isConnecting,
  errorNotice
}) => {
  const [name, setName] = useState(() => {
    return 'Warrior_' + Math.floor(Math.random() * 900 + 100);
  });
  const [selectedAvatar, setSelectedAvatar] = useState('🎯');
  const [selectedColor, setSelectedColor] = useState('#38bdf8');
  const [activeTab, setActiveTab] = useState<'play' | 'rules' | 'hall'>('play');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isConnecting) return;
    onJoin(name.trim(), selectedAvatar, selectedColor);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background Gradients & Sci-Fi Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full my-auto z-10 space-y-6">
        {/* Title & Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            2D Multiplayer Survival & Algebra Arena
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-200 to-indigo-400">
            MATH SURVIVOR 2D
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Masuki arena 30 pemain, taklukkan 5 virus pemburu berkecepatan 1-bit, selesaikan 100 soal SPLSV & 50 soal SPLDV, dan menangkan sertifikat juara!
          </p>
        </div>

        {/* Error notification banner if kicked / disqualified */}
        {errorNotice && (
          <div className="p-4 bg-rose-950/80 border-2 border-rose-500/80 rounded-2xl flex items-center gap-3 text-rose-200 text-sm shadow-xl animate-shake">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            <div>
              <span className="font-bold">Pemberitahuan Sistem: </span>
              {errorNotice}
            </div>
          </div>
        )}

        {/* Tab navigation */}
        <div className="flex justify-center border-b border-slate-800 gap-2 sm:gap-6">
          <button
            onClick={() => setActiveTab('play')}
            className={`pb-3 px-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'play'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Play className="w-4 h-4" />
            Masuk Room Arena
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`pb-3 px-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'rules'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Aturan & Target Misi
          </button>
          <button
            onClick={() => setActiveTab('hall')}
            className={`pb-3 px-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'hall'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            Papan Juara ({winners.length})
          </button>
        </div>

        {/* TAB 1: PLAY FORM */}
        {activeTab === 'play' && (
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Player Name */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-slate-300 tracking-wider">
                  Nama Karakter Petarung
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    maxLength={16}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Delta_X atau AljabarMaster"
                    className="flex-1 bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setName('MathHero_' + Math.floor(Math.random() * 900 + 100))}
                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Acak
                  </button>
                </div>
              </div>

              {/* Avatar Picker */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-slate-300 tracking-wider">
                  Pilih Avatar
                </label>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                  {AVATARS.map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setSelectedAvatar(av)}
                      className={`h-12 rounded-2xl flex items-center justify-center text-xl transition-all cursor-pointer ${
                        selectedAvatar === av
                          ? 'bg-cyan-500/20 border-2 border-cyan-400 scale-105 shadow-md shadow-cyan-500/30'
                          : 'bg-slate-800/80 border border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Color Picker */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-slate-300 tracking-wider">
                  Warna Indikator Radar
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {COLORS.map((col) => (
                    <button
                      key={col.hex}
                      type="button"
                      onClick={() => setSelectedColor(col.hex)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                        selectedColor === col.hex
                          ? 'border-white bg-slate-800 shadow-md'
                          : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span>{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Crucial Game Highlights & Anti-Cheat Notice */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 text-xs text-amber-200">
                <div className="flex items-center gap-2 font-bold text-amber-300">
                  <Maximize2 className="w-4 h-4 shrink-0" />
                  <span>Sistem Otomatis Full Screen & Anti-Kecurangan:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px] leading-relaxed">
                  <li>
                    Permainan akan otomatis masuk mode <strong>Full Screen</strong> saat tombol Mulai ditekan.
                  </li>
                  <li>
                    Jika keluar dari full screen atau berpindah ke tab lain, sistem akan{' '}
                    <strong className="text-rose-400">otomatis mendiskualifikasi</strong> dan Anda harus mengulang dari awal.
                  </li>
                  <li>
                    Pemain yang tidak bergerak / tidak menembak selama{' '}
                    <strong>3 menit (AFK)</strong> akan di-kick otomatis agar room tidak penuh.
                  </li>
                </ul>
              </div>

              {/* Join Button */}
              <button
                type="submit"
                disabled={isConnecting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-slate-950 font-black text-base sm:text-lg shadow-xl shadow-cyan-500/25 transition-all transform active:scale-98 cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isConnecting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Menghubungkan ke Server Room...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current" />
                    <span>MULAI MAIN (OTOMATIS FULL SCREEN)</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: RULES BREAKDOWN */}
        {activeTab === 'rules' && (
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              Petunjuk Lengkap & Spesifikasi Pertandingan
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-300 text-sm flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Kapasitas & Gerakan (Speed)
                </div>
                <p className="text-slate-300">
                  • Room menampung hingga <strong>30 pemain</strong> dalam arena luas dengan rintangan tembok acak.
                </p>
                <p className="text-slate-300">
                  • Kecepatan pemain: <strong>4 bit</strong> (lincah menghindar dan membidik).
                </p>
                <p className="text-slate-300">
                  • Tersedia kontrol cross-platform untuk laptop (WASD + Mouse) dan HP (Virtual Analog Joystick).
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-rose-300 text-sm flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Nyawa & Senjata AK-47
                </div>
                <p className="text-slate-300">
                  • Setiap pemain memiliki <strong>10 Nyawa</strong>.
                </p>
                <p className="text-slate-300">
                  • Bekal senjata: <strong>20 Peluru bawaan AK-47</strong>.
                </p>
                <p className="text-slate-300">
                  • Peluru 1 butir random muncul terus-menerus di seluruh arena.
                </p>
                <p className="text-slate-300">
                  • Tertembak pemain lain: mengurangi <strong>1 nyawa</strong>.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-300 text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  5 Musuh Virus Pemburu (1-Bit)
                </div>
                <p className="text-slate-300">
                  • Ada persis <strong>5 musuh virus</strong> yang terus mengejar pemain terdekat dengan kecepatan 1 bit.
                </p>
                <p className="text-slate-300">
                  • Disentuh virus: berkurang <strong>1 nyawa</strong>.
                </p>
                <p className="text-slate-300">
                  • Jika virus ditembak mati: musuh tidak pernah hilang, langsung respawn acak di tempat lain (tetap maksimal 5). Skor bunuh virus: <strong>+10 poin</strong>.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-yellow-300 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Berlian & Bank Soal Aljabar
                </div>
                <p className="text-slate-300">
                  • <strong>Berlian Biru (SPLSV):</strong> Bank 100 soal aljabar linear 1 variabel. Tiap jawaban benar memberi <strong>+10 Peluru AK-47</strong>, +1 Berlian Biru, dan <strong>+100 poin</strong>.
                </p>
                <p className="text-slate-300">
                  • <strong>Berlian Merah (SPLDV):</strong> Bank 50 soal sistem 2 variabel. Tiap jawaban benar memberi <strong>+2 Nyawa</strong> dan <strong>+100 poin</strong>.
                </p>
                <p className="text-slate-300">
                  • Benar atau salah, berlian akan lenyap dan respawn di lokasi acak lain.
                </p>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border border-amber-400/40 rounded-2xl space-y-1.5 text-xs text-amber-200">
              <div className="font-bold text-amber-300 text-sm flex items-center gap-2">
                <Award className="w-4 h-4" />
                Dua Misi Kemenangan & Sertifikat:
              </div>
              <p>
                <strong>Misi 1:</strong> Mengumpulkan <strong>20 Berlian Biru</strong>.
              </p>
              <p>
                <strong>Misi 2:</strong> Membunuh minimal <strong>1 Pemain Live</strong> ATAU mendapatkan <strong>10 Berlian Merah</strong>.
              </p>
              <p>
                Ketika kedua misi terpenuhi, Anda resmi menang, diberitahukan ke seluruh room, dan mendapatkan Sertifikat Keberhasilan yang dapat dicetak/disimpan!
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: HALL OF FAME */}
        {activeTab === 'hall' && (
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              Papan Juara yang Sudah Menyelesaikan Misi
            </h3>
            {winners.length === 0 ? (
              <div className="text-center py-12 text-slate-500 space-y-2">
                <Award className="w-12 h-12 mx-auto opacity-30 text-amber-400" />
                <p className="text-sm font-medium">Belum ada pemenang tercatat pada sesi ini.</p>
                <p className="text-xs text-slate-600">
                  Kumpulkan 20 Berlian Biru dan selesaikan eliminasi untuk menjadi juara pertama!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {winners.map((win, idx) => (
                  <div
                    key={win.id + idx}
                    className="p-4 bg-slate-950 border border-amber-500/30 rounded-2xl flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm">
                        #{idx + 1}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-amber-300">{win.name}</div>
                        <div className="text-slate-400 text-[11px] flex gap-2">
                          <span>💎 {win.blueDiamonds}/20</span>
                          <span>•</span>
                          <span>❤️ {win.redDiamonds}</span>
                          <span>•</span>
                          <span>🎯 {win.kills} Kills</span>
                          <span>•</span>
                          <span>{win.wonAt}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-extrabold text-yellow-400 font-mono">
                        {win.score} Pts
                      </div>
                      <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 justify-end">
                        <CheckCircle2 className="w-3 h-3" />
                        Sertifikat Terbit
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
