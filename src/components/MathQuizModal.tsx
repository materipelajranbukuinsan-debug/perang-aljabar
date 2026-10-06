import React, { useState } from 'react';
import { MathQuestion } from '../data/mathQuestions';
import { Sparkles, HelpCircle, CheckCircle, XCircle, Shield, Crosshair } from 'lucide-react';
import { sounds } from '../utils/audio';

interface MathQuizModalProps {
  question: MathQuestion;
  diamondId: string;
  diamondType: 'blue' | 'red';
  onAnswer: (diamondId: string, diamondType: 'blue' | 'red', optionIndex: number) => void;
  onClose: () => void;
}

export const MathQuizModal: React.FC<MathQuizModalProps> = ({
  question,
  diamondId,
  diamondType,
  onAnswer,
  onClose
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const isBlue = diamondType === 'blue';

  const handleSelectOption = (idx: number) => {
    if (submitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null || submitted) return;
    const correct = selectedOption === question.correctIndex;
    setIsCorrect(correct);
    setSubmitted(true);

    if (correct) {
      sounds.playCorrectAnswer();
    } else {
      sounds.playWrongAnswer();
    }

    onAnswer(diamondId, diamondType, selectedOption);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
      <div className={`relative max-w-lg w-full bg-slate-900 border-2 ${
        isBlue ? 'border-cyan-500 shadow-cyan-500/20' : 'border-rose-500 shadow-rose-500/20'
      } shadow-2xl rounded-2xl p-6 text-white overflow-hidden`}>
        {/* Glow backdrop */}
        <div className={`absolute -top-16 -right-16 w-32 h-32 ${
          isBlue ? 'bg-cyan-500/20' : 'bg-rose-500/20'
        } rounded-full blur-2xl pointer-events-none`} />

        {/* Header Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className={`p-2 rounded-xl ${
              isBlue ? 'bg-cyan-500/20 text-cyan-400' : 'bg-rose-500/20 text-rose-400'
            }`}>
              <Sparkles className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <h3 className="font-bold text-lg leading-tight">
                {isBlue ? 'Tantangan Berlian Biru (SPLSV)' : 'Tantangan Berlian Merah (SPLDV)'}
              </h3>
              <p className="text-xs text-slate-400">
                {isBlue ? 'Soal Aljabar / SPLSV • Hadiah: +10 Peluru & 100 Poin' : 'Sistem Dua Variabel • Hadiah: +2 Nyawa & 100 Poin'}
              </p>
            </div>
          </div>
          <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
            isBlue ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30' : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
          }`}>
            {isBlue ? 'Target Misi Utama' : 'Bonus Nyawa'}
          </span>
        </div>

        {/* Question Prompt */}
        <div className="bg-slate-800/90 rounded-xl p-4 border border-slate-700 my-3">
          <div className="flex items-start gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm sm:text-base font-semibold text-slate-100 whitespace-pre-line font-mono">
                {question.question}
              </p>
              {question.subtext && (
                <p className="text-xs text-amber-300/90 font-medium italic">
                  {question.subtext}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-2.5 my-4">
          {question.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const letter = String.fromCharCode(65 + idx);

            let btnStyle = 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200';
            if (submitted) {
              if (idx === question.correctIndex) {
                btnStyle = 'bg-emerald-600/30 border-emerald-500 text-emerald-200';
              } else if (isSelected) {
                btnStyle = 'bg-rose-600/30 border-rose-500 text-rose-200';
              }
            } else if (isSelected) {
              btnStyle = isBlue
                ? 'bg-cyan-600/30 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/20'
                : 'bg-rose-600/30 border-rose-400 text-rose-200 shadow-md shadow-rose-500/20';
            }

            return (
              <button
                key={idx}
                disabled={submitted}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${btnStyle} active:scale-98`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                    isSelected ? (isBlue ? 'bg-cyan-500 text-slate-950' : 'bg-rose-500 text-white') : 'bg-slate-700 text-slate-300'
                  }`}>
                    {letter}
                  </span>
                  <span className="font-mono text-sm sm:text-base">{opt}</span>
                </div>
                {submitted && idx === question.correctIndex && (
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {submitted && isSelected && idx !== question.correctIndex && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Result & Explanation */}
        {submitted && (
          <div className={`p-4 rounded-xl border my-4 ${
            isCorrect ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200' : 'bg-rose-950/60 border-rose-500/50 text-rose-200'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm mb-1">
              {isCorrect ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Jawaban Benar! +100 Poin Didapatkan!
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-400" />
                  Jawaban Kurang Tepat
                </>
              )}
            </div>
            <p className="text-xs text-slate-300 font-mono mt-1">
              <span className="font-semibold text-amber-300">Pembahasan: </span>
              {question.explanation}
            </p>
            <div className="mt-2 text-[11px] text-slate-400 italic">
              *Berlian akan lenyap dan muncul kembali di lokasi acak lain dalam arena.
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-3 mt-4">
          {!submitted ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={selectedOption === null}
                onClick={handleSubmit}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                  isBlue
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold'
                    : 'bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white'
                }`}
              >
                Kirim Jawaban
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-600 transition-all active:scale-95 cursor-pointer"
            >
              Lanjutkan Pertempuran
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
