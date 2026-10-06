import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { WinnerRecord } from '../types/game';
import { Trophy, Award, CheckCircle2, Download, Printer, ArrowLeft, Star, ShieldCheck } from 'lucide-react';
import { sounds } from '../utils/audio';

interface VictoryCertificateProps {
  winner: WinnerRecord;
  onClose: () => void;
  onReturnToLobby: () => void;
}

export const VictoryCertificate: React.FC<VictoryCertificateProps> = ({
  winner,
  onClose,
  onReturnToLobby
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sounds.playVictory();
    // Launch celebratory confetti bursts
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#38bdf8', '#fbbf24', '#f43f5e', '#a855f7', '#22c55e'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto animate-fade-in">
      <div className="max-w-3xl w-full my-auto">
        {/* Certificate Container with Royal Sci-Fi Math Theme */}
        <div
          ref={certificateRef}
          className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl border-4 border-amber-400/80 shadow-2xl p-8 sm:p-12 overflow-hidden print:m-0 print:border-2"
        >
          {/* Subtle Decorative Golden Border Pattern */}
          <div className="absolute inset-2 border-2 border-dashed border-amber-400/30 rounded-xl pointer-events-none" />
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center relative z-10 space-y-2">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-amber-500 to-yellow-300 rounded-full shadow-lg shadow-amber-500/30 text-slate-950 mb-2">
              <Trophy className="w-10 h-10" />
            </div>
            <div className="flex items-center justify-center gap-2 text-amber-400 font-semibold tracking-widest text-xs sm:text-sm uppercase">
              <Star className="w-4 h-4 fill-amber-400" />
              Sertifikat Keberhasilan Misi Survival Aljabar
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 font-serif">
              MATH SURVIVOR 2D CHAMPION
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
              Diberikan sebagai penghargaan tertinggi atas ketangguhan bertahan hidup, kecerdasan menyelesaikan sistem persamaan aljabar (SPLSV & SPLDV), serta ketangkasan mengalahkan ancaman di arena pertempuran multiplayer.
            </p>
          </div>

          {/* Recipient Details */}
          <div className="my-8 text-center relative z-10">
            <p className="text-xs uppercase tracking-wider text-slate-400">Dianugerahkan kepada Juara:</p>
            <div className="text-3xl sm:text-5xl font-black text-amber-300 tracking-tight my-2 drop-shadow-md">
              {winner.name}
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-medium border border-amber-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              Misi Selesai: 20 Berlian Biru & Eliminasi Arena
            </div>
          </div>

          {/* Achievement Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 relative z-10">
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-center">
              <div className="text-xs text-slate-400">Total Skor</div>
              <div className="text-xl sm:text-2xl font-bold text-yellow-400">{winner.score} Poin</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-center">
              <div className="text-xs text-cyan-300">Berlian Biru (SPLSV)</div>
              <div className="text-xl sm:text-2xl font-bold text-cyan-400">{winner.blueDiamonds} / 20</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-center">
              <div className="text-xs text-rose-300">Berlian Merah (SPLDV)</div>
              <div className="text-xl sm:text-2xl font-bold text-rose-400">{winner.redDiamonds}</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-center">
              <div className="text-xs text-emerald-300">Pemain Dieliminasi</div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-400">{winner.kills} Kills</div>
            </div>
          </div>

          {/* Verification Footer & Seals */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-700/80 pt-6 mt-6 gap-4 text-xs text-slate-400 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-amber-400/50 flex items-center justify-center bg-amber-500/10 text-amber-300">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-slate-200">Verifikasi Resmi Sistem</div>
                <div>ID Juara: {winner.id.slice(0, 14)}</div>
                <div>Waktu Kemenangan: {winner.wonAt}</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Status: Dinyatakan Menang Sah di Room
            </div>
          </div>
        </div>

        {/* Action Buttons (Excluded from print) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Cetak / Simpan PDF
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl border border-slate-600 transition-all active:scale-95 cursor-pointer"
          >
            Lanjut Nonton / Main
          </button>
          <button
            onClick={onReturnToLobby}
            className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-medium rounded-xl transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Lobi
          </button>
        </div>
      </div>
    </div>
  );
};
