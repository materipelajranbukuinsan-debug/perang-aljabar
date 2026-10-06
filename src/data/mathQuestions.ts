export interface MathQuestion {
  id: number;
  type: 'splsv' | 'spldv';
  question: string;
  subtext?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// 100 Bank Soal SPLSV (Sistem Persamaan Linear Satu Variabel) & Aljabar
export const SPLSV_QUESTIONS: MathQuestion[] = [
  {
    id: 1,
    type: 'splsv',
    question: 'Tentukan nilai x dari persamaan: 2x + 10 = 20',
    options: ['x = 3', 'x = 5', 'x = 7', 'x = 10'],
    correctIndex: 1,
    explanation: '2x = 20 - 10 => 2x = 10 => x = 5'
  },
  {
    id: 2,
    type: 'splsv',
    question: 'Hasil dari perkalian aljabar: (2x + 2)(3x - 4)',
    options: ['6x² - 2x - 8', '6x² + 2x - 8', '6x² - 8x - 8', '5x² - 2x - 8'],
    correctIndex: 0,
    explanation: '2x(3x - 4) + 2(3x - 4) = 6x² - 8x + 6x - 8 = 6x² - 2x - 8'
  },
  {
    id: 3,
    type: 'splsv',
    question: 'Selesaikan persamaan: 3x - 5 = 16',
    options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
    correctIndex: 2,
    explanation: '3x = 16 + 5 => 3x = 21 => x = 7'
  },
  {
    id: 4,
    type: 'splsv',
    question: 'Nilai x yang memenuhi: 5x + 15 = 40',
    options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
    correctIndex: 1,
    explanation: '5x = 40 - 15 => 5x = 25 => x = 5'
  },
  {
    id: 5,
    type: 'splsv',
    question: 'Sederhanakan bentuk aljabar: 4a + 7b - 2a + 3b',
    options: ['2a + 10b', '6a + 10b', '2a + 4b', '4a + 10b'],
    correctIndex: 0,
    explanation: '(4a - 2a) + (7b + 3b) = 2a + 10b'
  },
  {
    id: 6,
    type: 'splsv',
    question: 'Tentukan penyelesaian dari: 4x - 8 = 12',
    options: ['x = 3', 'x = 5', 'x = 7', 'x = 4'],
    correctIndex: 1,
    explanation: '4x = 12 + 8 => 4x = 20 => x = 5'
  },
  {
    id: 7,
    type: 'splsv',
    question: 'Jika 7x - 14 = 21, maka nilai x + 3 adalah...',
    options: ['5', '8', '7', '10'],
    correctIndex: 1,
    explanation: '7x = 35 => x = 5. Nilai x + 3 = 5 + 3 = 8'
  },
  {
    id: 8,
    type: 'splsv',
    question: 'Berapakah nilai x pada persamaan: x / 2 + 4 = 9 ?',
    options: ['x = 8', 'x = 10', 'x = 12', 'x = 14'],
    correctIndex: 1,
    explanation: 'x / 2 = 9 - 4 => x / 2 = 5 => x = 10'
  },
  {
    id: 9,
    type: 'splsv',
    question: 'Selesaikan persamaan: 2(x - 3) = 14',
    options: ['x = 8', 'x = 10', 'x = 12', 'x = 16'],
    correctIndex: 1,
    explanation: '2x - 6 = 14 => 2x = 20 => x = 10'
  },
  {
    id: 10,
    type: 'splsv',
    question: 'Nilai x dari: 5(x + 2) = 3x + 18',
    options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
    correctIndex: 2,
    explanation: '5x + 10 = 3x + 18 => 2x = 8 => x = 4'
  },
  {
    id: 11,
    type: 'splsv',
    question: 'Faktorkan bentuk aljabar: x² - 16',
    options: ['(x - 4)(x - 4)', '(x + 4)(x - 4)', '(x + 8)(x - 2)', '(x + 16)(x - 1)'],
    correctIndex: 1,
    explanation: 'Selisih dua kuadrat: a² - b² = (a - b)(a + b) => x² - 16 = (x + 4)(x - 4)'
  },
  {
    id: 12,
    type: 'splsv',
    question: 'Jika 3(2x - 1) = 27, nilai x adalah...',
    options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
    correctIndex: 1,
    explanation: '6x - 3 = 27 => 6x = 30 => x = 5'
  },
  {
    id: 13,
    type: 'splsv',
    question: 'Koefisien dari x pada bentuk aljabar: 3x² - 7x + 12 adalah...',
    options: ['3', '-7', '7', '12'],
    correctIndex: 1,
    explanation: 'Koefisien dari variabel x adalah -7'
  },
  {
    id: 14,
    type: 'splsv',
    question: 'Tentukan nilai p jika: 4p + 6 = 2p + 16',
    options: ['p = 3', 'p = 4', 'p = 5', 'p = 6'],
    correctIndex: 2,
    explanation: '4p - 2p = 16 - 6 => 2p = 10 => p = 5'
  },
  {
    id: 15,
    type: 'splsv',
    question: 'Hasil dari (x + 3)(x + 5) adalah...',
    options: ['x² + 8x + 15', 'x² + 15x + 8', 'x² + 2x + 15', 'x² + 8x - 15'],
    correctIndex: 0,
    explanation: 'x² + 5x + 3x + 15 = x² + 8x + 15'
  },
  {
    id: 16,
    type: 'splsv',
    question: 'Penyelesaian dari persamaan: 6x - 12 = 0 adalah...',
    options: ['x = 1', 'x = 2', 'x = 3', 'x = 4'],
    correctIndex: 1,
    explanation: '6x = 12 => x = 2'
  },
  {
    id: 17,
    type: 'splsv',
    question: 'Jika 8x - 5 = 3x + 20, maka nilai x adalah...',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctIndex: 2,
    explanation: '8x - 3x = 20 + 5 => 5x = 25 => x = 5'
  },
  {
    id: 18,
    type: 'splsv',
    question: 'Sederhanakan: 3(2x + 4) - 2(x - 1)',
    options: ['4x + 14', '4x + 10', '4x + 12', '5x + 14'],
    correctIndex: 0,
    explanation: '6x + 12 - 2x + 2 = 4x + 14'
  },
  {
    id: 19,
    type: 'splsv',
    question: 'Nilai x dari persamaan: (x - 2) / 3 = 4 adalah...',
    options: ['10', '12', '14', '16'],
    correctIndex: 2,
    explanation: 'x - 2 = 12 => x = 14'
  },
  {
    id: 20,
    type: 'splsv',
    question: 'Tentukan x jika: 9x - 18 = 45',
    options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
    correctIndex: 2,
    explanation: '9x = 63 => x = 7'
  },
  {
    id: 21,
    type: 'splsv',
    question: 'Berapakah konstanta dari bentuk aljabar: 5x² - 3x + 19 ?',
    options: ['5', '-3', '19', '2'],
    correctIndex: 2,
    explanation: 'Konstanta adalah suku yang tidak memuat variabel, yaitu 19'
  },
  {
    id: 22,
    type: 'splsv',
    question: 'Jika 2(3x + 1) = 32, maka nilai x adalah...',
    options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
    correctIndex: 1,
    explanation: '6x + 2 = 32 => 6x = 30 => x = 5'
  },
  {
    id: 23,
    type: 'splsv',
    question: 'Hasil penjabaran dari (2a - 3)² adalah...',
    options: ['4a² - 12a + 9', '4a² - 6a + 9', '4a² + 9', '4a² - 12a - 9'],
    correctIndex: 0,
    explanation: '(2a - 3)(2a - 3) = 4a² - 6a - 6a + 9 = 4a² - 12a + 9'
  },
  {
    id: 24,
    type: 'splsv',
    question: 'Selesaikan persamaan: 10x + 25 = 5x + 60',
    options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
    correctIndex: 2,
    explanation: '5x = 35 => x = 7'
  },
  {
    id: 25,
    type: 'splsv',
    question: 'Berapa suku sejenis dari pasangan berikut?',
    options: ['3x dan 3y', '5ab dan 7ba', '2x² dan 2x', '4p dan 4q'],
    correctIndex: 1,
    explanation: '5ab dan 7ba memiliki variabel yang sama persis (ab = ba)'
  },
  {
    id: 26,
    type: 'splsv',
    question: 'Penyelesaian dari: 3x / 4 = 9 adalah...',
    options: ['x = 9', 'x = 12', 'x = 15', 'x = 16'],
    correctIndex: 1,
    explanation: '3x = 36 => x = 12'
  },
  {
    id: 27,
    type: 'splsv',
    question: 'Jika 4x + 10 = 2(x + 11), berapakah x?',
    options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
    correctIndex: 2,
    explanation: '4x + 10 = 2x + 22 => 2x = 12 => x = 6'
  },
  {
    id: 28,
    type: 'splsv',
    question: 'Bentuk paling sederhana dari (8x + 12) / 4 adalah...',
    options: ['2x + 3', '4x + 6', '2x + 12', '8x + 3'],
    correctIndex: 0,
    explanation: '8x/4 + 12/4 = 2x + 3'
  },
  {
    id: 29,
    type: 'splsv',
    question: 'Tentukan x jika: 7(x - 1) = 28',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctIndex: 2,
    explanation: 'x - 1 = 4 => x = 5'
  },
  {
    id: 30,
    type: 'splsv',
    question: 'Hasil pengurangan 3x + 5 dari 7x + 12 adalah...',
    options: ['4x + 7', '4x - 7', '10x + 17', '-4x - 7'],
    correctIndex: 0,
    explanation: '(7x + 12) - (3x + 5) = 4x + 7'
  },
  {
    id: 31,
    type: 'splsv',
    question: 'Nilai x dari: 12x - 15 = 9x + 6 adalah...',
    options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
    correctIndex: 2,
    explanation: '3x = 21 => x = 7'
  },
  {
    id: 32,
    type: 'splsv',
    question: 'Selesaikan persamaan: 5(2x - 4) = 30',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctIndex: 2,
    explanation: '10x - 20 = 30 => 10x = 50 => x = 5'
  },
  {
    id: 33,
    type: 'splsv',
    question: 'Berapakah nilai 2x jika 4x - 10 = 30 ?',
    options: ['10', '20', '30', '40'],
    correctIndex: 1,
    explanation: '4x = 40 => x = 10. Maka 2x = 2(10) = 20'
  },
  {
    id: 34,
    type: 'splsv',
    question: 'Faktorkan persamaan: x² + 5x + 6',
    options: ['(x + 2)(x + 3)', '(x + 1)(x + 6)', '(x - 2)(x - 3)', '(x - 1)(x - 6)'],
    correctIndex: 0,
    explanation: 'Dua bilangan berkalikan 6 dan jumlahnya 5 adalah 2 dan 3'
  },
  {
    id: 35,
    type: 'splsv',
    question: 'Penyelesaian dari: 2(4x - 3) = 6x + 8',
    options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
    correctIndex: 2,
    explanation: '8x - 6 = 6x + 8 => 2x = 14 => x = 7'
  },
  {
    id: 36,
    type: 'splsv',
    question: 'Sederhanakan: (15a²b) / (3ab)',
    options: ['5a', '5b', '5ab', '5'],
    correctIndex: 0,
    explanation: '15/3 = 5, a²/a = a, b/b = 1 => 5a'
  },
  {
    id: 37,
    type: 'splsv',
    question: 'Jika 3x + 8 = 35, berapa nilai x - 4 ?',
    options: ['3', '5', '7', '9'],
    correctIndex: 1,
    explanation: '3x = 27 => x = 9. Maka x - 4 = 9 - 4 = 5'
  },
  {
    id: 38,
    type: 'splsv',
    question: 'Hasil dari perkalian aljabar: (x - 4)(x + 4)',
    options: ['x² - 16', 'x² + 16', 'x² - 8x - 16', 'x² - 8'],
    correctIndex: 0,
    explanation: 'x² - 4² = x² - 16'
  },
  {
    id: 39,
    type: 'splsv',
    question: 'Nilai x dari: 8x / 3 = 16',
    options: ['x = 4', 'x = 6', 'x = 8', 'x = 10'],
    correctIndex: 1,
    explanation: '8x = 48 => x = 6'
  },
  {
    id: 40,
    type: 'splsv',
    question: 'Tentukan x jika: 4(3x - 2) = 40',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctIndex: 1,
    explanation: '12x - 8 = 40 => 12x = 48 => x = 4'
  },
  {
    id: 41,
    type: 'splsv',
    question: 'Jika x = 3, nilai dari 4x² - 2x + 5 adalah...',
    options: ['32', '35', '38', '41'],
    correctIndex: 1,
    explanation: '4(3)² - 2(3) + 5 = 4(9) - 6 + 5 = 36 - 6 + 5 = 35'
  },
  {
    id: 42,
    type: 'splsv',
    question: 'Selesaikan persamaan: 7x + 3 = 5x + 19',
    options: ['x = 6', 'x = 7', 'x = 8', 'x = 9'],
    correctIndex: 2,
    explanation: '2x = 16 => x = 8'
  },
  {
    id: 43,
    type: 'splsv',
    question: 'Berapakah x dari: (2x + 6) / 2 = 11 ?',
    options: ['x = 6', 'x = 7', 'x = 8', 'x = 9'],
    correctIndex: 2,
    explanation: 'x + 3 = 11 => x = 8'
  },
  {
    id: 44,
    type: 'splsv',
    question: 'Penyelesaian dari: 9x - 21 = 3x + 15',
    options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
    correctIndex: 2,
    explanation: '6x = 36 => x = 6'
  },
  {
    id: 45,
    type: 'splsv',
    question: 'Hasil dari 5(2x - 1) + 3(x + 4) adalah...',
    options: ['13x + 7', '13x - 7', '10x + 12', '13x + 17'],
    correctIndex: 0,
    explanation: '10x - 5 + 3x + 12 = 13x + 7'
  },
  {
    id: 46,
    type: 'splsv',
    question: 'Tentukan x pada persamaan: 3(x + 4) = 2(x + 7)',
    options: ['x = 1', 'x = 2', 'x = 3', 'x = 4'],
    correctIndex: 1,
    explanation: '3x + 12 = 2x + 14 => x = 2'
  },
  {
    id: 47,
    type: 'splsv',
    question: 'Jika 6x - 7 = 29, maka nilai dari 3x adalah...',
    options: ['15', '18', '21', '24'],
    correctIndex: 1,
    explanation: '6x = 36 => x = 6 => 3x = 18'
  },
  {
    id: 48,
    type: 'splsv',
    question: 'Faktor dari x² - 7x + 10 adalah...',
    options: ['(x - 2)(x - 5)', '(x + 2)(x + 5)', '(x - 1)(x - 10)', '(x + 1)(x - 10)'],
    correctIndex: 0,
    explanation: '(-2) x (-5) = 10 dan (-2) + (-5) = -7'
  },
  {
    id: 49,
    type: 'splsv',
    question: 'Penyelesaian dari: 4(x - 2) + 5 = 25',
    options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
    correctIndex: 2,
    explanation: '4(x - 2) = 20 => x - 2 = 5 => x = 7'
  },
  {
    id: 50,
    type: 'splsv',
    question: 'Nilai x dari persamaan: 5x / 2 - 3 = 12',
    options: ['x = 4', 'x = 5', 'x = 6', 'x = 8'],
    correctIndex: 2,
    explanation: '5x / 2 = 15 => 5x = 30 => x = 6'
  },
  {
    id: 51,
    type: 'splsv',
    question: 'Tentukan x dari: 2(5x + 3) = 46',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctIndex: 1,
    explanation: '10x + 6 = 46 => 10x = 40 => x = 4'
  },
  {
    id: 52,
    type: 'splsv',
    question: 'Sederhanakan: (3x²y³) / (xy²)',
    options: ['3xy', '3x²y', '3y', '3x'],
    correctIndex: 0,
    explanation: '3 * x^(2-1) * y^(3-2) = 3xy'
  },
  {
    id: 53,
    type: 'splsv',
    question: 'Jika 8(x - 2) = 40, berapakah nilai x?',
    options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
    correctIndex: 2,
    explanation: 'x - 2 = 5 => x = 7'
  },
  {
    id: 54,
    type: 'splsv',
    question: 'Hasil dari: (2x + 1)(x - 3)',
    options: ['2x² - 5x - 3', '2x² + 5x - 3', '2x² - 6x - 3', '2x² - 5x + 3'],
    correctIndex: 0,
    explanation: '2x² - 6x + x - 3 = 2x² - 5x - 3'
  },
  {
    id: 55,
    type: 'splsv',
    question: 'Tentukan x jika: 11x - 9 = 4x + 26',
    options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
    correctIndex: 1,
    explanation: '7x = 35 => x = 5'
  },
  {
    id: 56,
    type: 'splsv',
    question: 'Berapakah x dari: (3x + 9) / 3 = 14 ?',
    options: ['x = 9', 'x = 10', 'x = 11', 'x = 12'],
    correctIndex: 2,
    explanation: 'x + 3 = 14 => x = 11'
  },
  {
    id: 57,
    type: 'splsv',
    question: 'Nilai x dari: 6(x + 1) = 4(x + 4)',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctIndex: 2,
    explanation: '6x + 6 = 4x + 16 => 2x = 10 => x = 5'
  },
  {
    id: 58,
    type: 'splsv',
    question: 'Hasil pemfaktoran dari: 2x² + 6x',
    options: ['2x(x + 3)', '2(x² + 3)', 'x(2x + 6)', '2x(x + 6)'],
    correctIndex: 0,
    explanation: 'FPB adalah 2x => 2x(x + 3)'
  },
  {
    id: 59,
    type: 'splsv',
    question: 'Jika 3(4x - 5) = 45, berapakah x?',
    options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
    correctIndex: 1,
    explanation: '4x - 5 = 15 => 4x = 20 => x = 5'
  },
  {
    id: 60,
    type: 'splsv',
    question: 'Tentukan x jika: x / 5 + 7 = 11',
    options: ['x = 15', 'x = 20', 'x = 25', 'x = 30'],
    correctIndex: 1,
    explanation: 'x / 5 = 4 => x = 20'
  },
  {
    id: 61,
    type: 'splsv',
    question: 'Sederhanakan: 7x - 4(x - 2) + 3',
    options: ['3x + 11', '3x - 5', '3x + 5', '11x + 11'],
    correctIndex: 0,
    explanation: '7x - 4x + 8 + 3 = 3x + 11'
  },
  {
    id: 62,
    type: 'splsv',
    question: 'Jika 5x - 12 = 18, maka nilai 2x + 1 adalah...',
    options: ['11', '13', '15', '17'],
    correctIndex: 1,
    explanation: '5x = 30 => x = 6 => 2(6) + 1 = 13'
  },
  {
    id: 63,
    type: 'splsv',
    question: 'Penyelesaian dari: 4x + 7 = 31',
    options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
    correctIndex: 1,
    explanation: '4x = 24 => x = 6'
  },
  {
    id: 64,
    type: 'splsv',
    question: 'Berapakah x jika: 2(x + 5) - 3(x - 1) = 7 ?',
    options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
    correctIndex: 1,
    explanation: '2x + 10 - 3x + 3 = 7 => -x + 13 = 7 => x = 6'
  },
  {
    id: 65,
    type: 'splsv',
    question: 'Faktor dari x² + 8x + 12 adalah...',
    options: ['(x + 2)(x + 6)', '(x + 3)(x + 4)', '(x + 1)(x + 12)', '(x - 2)(x - 6)'],
    correctIndex: 0,
    explanation: '2 * 6 = 12 dan 2 + 6 = 8'
  },
  {
    id: 66,
    type: 'splsv',
    question: 'Tentukan x dari: 9x - 15 = 6x + 9',
    options: ['x = 6', 'x = 7', 'x = 8', 'x = 9'],
    correctIndex: 2,
    explanation: '3x = 24 => x = 8'
  },
  {
    id: 67,
    type: 'splsv',
    question: 'Jika 3(2x + 4) = 48, maka x = ...',
    options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
    correctIndex: 2,
    explanation: '2x + 4 = 16 => 2x = 12 => x = 6'
  },
  {
    id: 68,
    type: 'splsv',
    question: 'Hasil dari (3x - 2)² adalah...',
    options: ['9x² - 12x + 4', '9x² - 6x + 4', '9x² + 4', '9x² - 12x - 4'],
    correctIndex: 0,
    explanation: '(3x - 2)(3x - 2) = 9x² - 12x + 4'
  },
  {
    id: 69,
    type: 'splsv',
    question: 'Nilai x dari: 4x / 5 = 12',
    options: ['x = 12', 'x = 15', 'x = 16', 'x = 20'],
    correctIndex: 1,
    explanation: '4x = 60 => x = 15'
  },
  {
    id: 70,
    type: 'splsv',
    question: 'Selesaikan persamaan: 8x + 4 = 3x + 29',
    options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
    correctIndex: 1,
    explanation: '5x = 25 => x = 5'
  },
  {
    id: 71,
    type: 'splsv',
    question: 'Jika x = -2, maka nilai dari 3x² - 5x + 4 adalah...',
    options: ['22', '24', '26', '28'],
    correctIndex: 2,
    explanation: '3(-2)² - 5(-2) + 4 = 3(4) + 10 + 4 = 12 + 10 + 4 = 26'
  },
  {
    id: 72,
    type: 'splsv',
    question: 'Tentukan x dari: 2(3x - 5) = 4(x + 1)',
    options: ['x = 6', 'x = 7', 'x = 8', 'x = 9'],
    correctIndex: 1,
    explanation: '6x - 10 = 4x + 4 => 2x = 14 => x = 7'
  },
  {
    id: 73,
    type: 'splsv',
    question: 'Berapakah nilai x dari: (x + 8) / 4 = 5 ?',
    options: ['x = 10', 'x = 12', 'x = 14', 'x = 16'],
    correctIndex: 1,
    explanation: 'x + 8 = 20 => x = 12'
  },
  {
    id: 74,
    type: 'splsv',
    question: 'Sederhanakan: 5a - 2b + 3a - 4b',
    options: ['8a - 6b', '8a + 2b', '2a - 6b', '8a + 6b'],
    correctIndex: 0,
    explanation: '(5a + 3a) + (-2b - 4b) = 8a - 6b'
  },
  {
    id: 75,
    type: 'splsv',
    question: 'Jika 7x - 5 = 2x + 20, berapa nilai x?',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctIndex: 2,
    explanation: '5x = 25 => x = 5'
  },
  {
    id: 76,
    type: 'splsv',
    question: 'Faktorkan: x² - 25',
    options: ['(x - 5)(x + 5)', '(x - 5)(x - 5)', '(x + 5)(x + 5)', '(x - 25)(x + 1)'],
    correctIndex: 0,
    explanation: 'Bentuk selisih kuadrat: (x - 5)(x + 5)'
  },
  {
    id: 77,
    type: 'splsv',
    question: 'Tentukan x dari: 6(2x - 3) = 42',
    options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
    correctIndex: 1,
    explanation: '2x - 3 = 7 => 2x = 10 => x = 5'
  },
  {
    id: 78,
    type: 'splsv',
    question: 'Penyelesaian dari: 3(x + 2) + 2(x - 1) = 24',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctIndex: 1,
    explanation: '3x + 6 + 2x - 2 = 24 => 5x + 4 = 24 => 5x = 20 => x = 4'
  },
  {
    id: 79,
    type: 'splsv',
    question: 'Jika 10x - 14 = 36, maka nilai x + 5 adalah...',
    options: ['8', '10', '12', '14'],
    correctIndex: 1,
    explanation: '10x = 50 => x = 5 => x + 5 = 10'
  },
  {
    id: 80,
    type: 'splsv',
    question: 'Hasil dari (2x + 3)(2x - 3) adalah...',
    options: ['4x² - 9', '4x² + 9', '4x² - 6x - 9', '4x² - 12x - 9'],
    correctIndex: 0,
    explanation: '(a+b)(a-b) = a² - b² => 4x² - 9'
  },
  {
    id: 81,
    type: 'splsv',
    question: 'Nilai x dari persamaan: 2x / 3 + 5 = 11 adalah...',
    options: ['x = 7', 'x = 8', 'x = 9', 'x = 10'],
    correctIndex: 2,
    explanation: '2x / 3 = 6 => 2x = 18 => x = 9'
  },
  {
    id: 82,
    type: 'splsv',
    question: 'Tentukan x jika: 5(x - 4) = 2(x + 5)',
    options: ['x = 8', 'x = 9', 'x = 10', 'x = 11'],
    correctIndex: 2,
    explanation: '5x - 20 = 2x + 10 => 3x = 30 => x = 10'
  },
  {
    id: 83,
    type: 'splsv',
    question: 'Sederhanakan pecahan aljabar: (6x² + 9x) / 3x',
    options: ['2x + 3', '2x + 9', '3x + 3', '2x² + 3'],
    correctIndex: 0,
    explanation: '6x²/3x + 9x/3x = 2x + 3'
  },
  {
    id: 84,
    type: 'splsv',
    question: 'Jika 4x + 15 = 39, berapakah nilai dari 3x?',
    options: ['15', '18', '21', '24'],
    correctIndex: 1,
    explanation: '4x = 24 => x = 6 => 3x = 18'
  },
  {
    id: 85,
    type: 'splsv',
    question: 'Penyelesaian dari: 7x - 9 = 4x + 12',
    options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
    correctIndex: 2,
    explanation: '3x = 21 => x = 7'
  },
  {
    id: 86,
    type: 'splsv',
    question: 'Faktor dari persamaan: x² - 9x + 20',
    options: ['(x - 4)(x - 5)', '(x + 4)(x + 5)', '(x - 2)(x - 10)', '(x + 2)(x + 10)'],
    correctIndex: 0,
    explanation: '(-4) * (-5) = 20 dan (-4) + (-5) = -9'
  },
  {
    id: 87,
    type: 'splsv',
    question: 'Tentukan x jika: 3(4x - 1) = 33',
    options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
    correctIndex: 1,
    explanation: '4x - 1 = 11 => 4x = 12 => x = 3'
  },
  {
    id: 88,
    type: 'splsv',
    question: 'Hasil pengurangan: (9x - 4) - (5x + 6)',
    options: ['4x - 10', '4x + 2', '4x - 2', '14x - 10'],
    correctIndex: 0,
    explanation: '9x - 4 - 5x - 6 = 4x - 10'
  },
  {
    id: 89,
    type: 'splsv',
    question: 'Berapakah nilai x dari: (5x - 5) / 2 = 15 ?',
    options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
    correctIndex: 2,
    explanation: '5x - 5 = 30 => 5x = 35 => x = 7'
  },
  {
    id: 90,
    type: 'splsv',
    question: 'Jika 8x + 7 = 3x + 37, nilai x adalah...',
    options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
    correctIndex: 1,
    explanation: '5x = 30 => x = 6'
  },
  {
    id: 91,
    type: 'splsv',
    question: 'Hasil perkalian: 3x(2x² - 4x + 5)',
    options: ['6x³ - 12x² + 15x', '6x³ - 12x + 15', '5x³ - 12x² + 15x', '6x² - 12x + 15'],
    correctIndex: 0,
    explanation: '3x * 2x² - 3x * 4x + 3x * 5 = 6x³ - 12x² + 15x'
  },
  {
    id: 92,
    type: 'splsv',
    question: 'Tentukan x dari: 2(x + 7) = 3(x + 2)',
    options: ['x = 6', 'x = 7', 'x = 8', 'x = 9'],
    correctIndex: 2,
    explanation: '2x + 14 = 3x + 6 => x = 8'
  },
  {
    id: 93,
    type: 'splsv',
    question: 'Jika 6x - 18 = 0, berapakah nilai 4x + 2 ?',
    options: ['12', '14', '16', '18'],
    correctIndex: 1,
    explanation: '6x = 18 => x = 3 => 4(3) + 2 = 14'
  },
  {
    id: 94,
    type: 'splsv',
    question: 'Selesaikan persamaan: 4(2x - 3) = 28',
    options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
    correctIndex: 1,
    explanation: '2x - 3 = 7 => 2x = 10 => x = 5'
  },
  {
    id: 95,
    type: 'splsv',
    question: 'Faktor dari: x² - 36',
    options: ['(x - 6)(x + 6)', '(x - 6)(x - 6)', '(x + 6)(x + 6)', '(x - 18)(x + 2)'],
    correctIndex: 0,
    explanation: '(x - 6)(x + 6)'
  },
  {
    id: 96,
    type: 'splsv',
    question: 'Tentukan x dari: x / 3 - 2 = 6',
    options: ['x = 18', 'x = 21', 'x = 24', 'x = 27'],
    correctIndex: 2,
    explanation: 'x / 3 = 8 => x = 24'
  },
  {
    id: 97,
    type: 'splsv',
    question: 'Jika 5(3x - 2) = 50, maka x = ...',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctIndex: 1,
    explanation: '3x - 2 = 10 => 3x = 12 => x = 4'
  },
  {
    id: 98,
    type: 'splsv',
    question: 'Sederhanakan: 4(x + 3) - 2(2x - 1)',
    options: ['14', '8x + 14', '10', '12'],
    correctIndex: 0,
    explanation: '4x + 12 - 4x + 2 = 14'
  },
  {
    id: 99,
    type: 'splsv',
    question: 'Nilai x dari persamaan: 7x - 2(x + 3) = 14',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctIndex: 1,
    explanation: '7x - 2x - 6 = 14 => 5x = 20 => x = 4'
  },
  {
    id: 100,
    type: 'splsv',
    question: 'Tentukan x jika: 10x - 25 = 5(x + 4)',
    options: ['x = 7', 'x = 8', 'x = 9', 'x = 10'],
    correctIndex: 2,
    explanation: '10x - 25 = 5x + 20 => 5x = 45 => x = 9'
  }
];

// 50 Bank Soal SPLDV (Sistem Persamaan Linear Dua Variabel)
export const SPLDV_QUESTIONS: MathQuestion[] = [
  {
    id: 201,
    type: 'spldv',
    question: 'Tentukan himpunan penyelesaian dari:\nx + y = 10\nx - y = 2',
    subtext: 'Berapakah nilai x dan y?',
    options: ['x = 6, y = 4', 'x = 7, y = 3', 'x = 5, y = 5', 'x = 8, y = 2'],
    correctIndex: 0,
    explanation: 'Jumlahkan kedua persamaan: 2x = 12 => x = 6. Maka y = 10 - 6 = 4'
  },
  {
    id: 202,
    type: 'spldv',
    question: 'Diberikan sistem persamaan:\n2x + y = 11\nx - y = 1',
    subtext: 'Berapakah nilai x?',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctIndex: 1,
    explanation: 'Jumlahkan: 3x = 12 => x = 4 (dan y = 3)'
  },
  {
    id: 203,
    type: 'spldv',
    question: 'Diberikan SPLDV:\n3x + 2y = 16\n2x - y = 6',
    subtext: 'Tentukan nilai x dan y berturut-turut:',
    options: ['x = 4, y = 2', 'x = 3, y = 3', 'x = 2, y = 5', 'x = 5, y = 1'],
    correctIndex: 0,
    explanation: 'Dari pers 2: y = 2x - 6. Substitusi ke 1: 3x + 2(2x - 6) = 16 => 7x - 12 = 16 => 7x = 28 => x = 4, y = 2'
  },
  {
    id: 204,
    type: 'spldv',
    question: 'Jika:\nx + 2y = 8\n2x + y = 7',
    subtext: 'Berapakah nilai x + y?',
    options: ['4', '5', '6', '7'],
    correctIndex: 1,
    explanation: 'Jumlahkan kedua persamaan: 3x + 3y = 15 => 3(x + y) = 15 => x + y = 5'
  },
  {
    id: 205,
    type: 'spldv',
    question: 'Penyelesaian dari SPLDV:\n2x + 3y = 13\nx + 2y = 8',
    subtext: 'Berapakah nilai x?',
    options: ['x = 1', 'x = 2', 'x = 3', 'x = 4'],
    correctIndex: 1,
    explanation: 'Dari pers 2: x = 8 - 2y. Masukkan ke pers 1: 2(8 - 2y) + 3y = 13 => 16 - y = 13 => y = 3. Maka x = 8 - 6 = 2'
  },
  {
    id: 206,
    type: 'spldv',
    question: 'Diberikan:\n4x + y = 18\nx + y = 6',
    subtext: 'Tentukan nilai x dan y:',
    options: ['x = 4, y = 2', 'x = 3, y = 3', 'x = 5, y = 1', 'x = 2, y = 4'],
    correctIndex: 0,
    explanation: 'Kurangkan: 3x = 12 => x = 4. Maka y = 6 - 4 = 2'
  },
  {
    id: 207,
    type: 'spldv',
    question: 'Tentukan nilai y dari SPLDV:\n3x - y = 5\n2x + y = 10',
    subtext: 'Berapa nilai y?',
    options: ['y = 2', 'y = 3', 'y = 4', 'y = 5'],
    correctIndex: 2,
    explanation: 'Jumlahkan: 5x = 15 => x = 3. Maka y = 10 - 2(3) = 4'
  },
  {
    id: 208,
    type: 'spldv',
    question: 'Selesaikan SPLDV:\nx - 2y = 3\n2x + 3y = 20',
    subtext: 'Berapakah nilai x?',
    options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
    correctIndex: 2,
    explanation: 'x = 3 + 2y => 2(3 + 2y) + 3y = 20 => 6 + 7y = 20 => 7y = 14 => y = 2 => x = 3 + 4 = 7'
  },
  {
    id: 209,
    type: 'spldv',
    question: 'Jika 3x + y = 15 dan x - y = 1, berapakah nilai dari 2x + y?',
    subtext: 'Pilih jawaban yang tepat:',
    options: ['9', '10', '11', '12'],
    correctIndex: 2,
    explanation: 'Jumlahkan: 4x = 16 => x = 4, y = 3. Maka 2(4) + 3 = 11'
  },
  {
    id: 210,
    type: 'spldv',
    question: 'Diketahui:\n5x + 2y = 19\n2x + 2y = 10',
    subtext: 'Berapakah nilai x?',
    options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
    correctIndex: 1,
    explanation: 'Kurangkan kedua persamaan: 3x = 9 => x = 3'
  },
  {
    id: 211,
    type: 'spldv',
    question: 'Tentukan nilai x dan y dari:\nx + 3y = 11\n2x - y = 1',
    subtext: 'Pasangan (x, y) adalah:',
    options: ['(2, 3)', '(3, 2)', '(1, 4)', '(4, 1)'],
    correctIndex: 0,
    explanation: 'x = 11 - 3y => 2(11 - 3y) - y = 1 => 22 - 7y = 1 => 7y = 21 => y = 3, x = 2'
  },
  {
    id: 212,
    type: 'spldv',
    question: 'Harga 2 buku dan 1 pensil Rp10.000. Harga 1 buku dan 1 pensil Rp7.000.\nBerapakah harga 1 buku?',
    subtext: 'Modelkan dengan SPLDV:',
    options: ['Rp2.000', 'Rp3.000', 'Rp4.000', 'Rp5.000'],
    correctIndex: 1,
    explanation: '2b + p = 10.000 dan b + p = 7.000 => kurangkan: b = 3.000'
  },
  {
    id: 213,
    type: 'spldv',
    question: 'Diberikan:\n2x + 4y = 20\n2x + y = 11',
    subtext: 'Berapakah nilai y?',
    options: ['y = 2', 'y = 3', 'y = 4', 'y = 5'],
    correctIndex: 1,
    explanation: 'Kurangkan: 3y = 9 => y = 3'
  },
  {
    id: 214,
    type: 'spldv',
    question: 'Tentukan nilai x dari SPLDV:\n3x + 5y = 21\n3x + y = 9',
    subtext: 'Nilai x adalah:',
    options: ['x = 1', 'x = 2', 'x = 3', 'x = 4'],
    correctIndex: 1,
    explanation: 'Kurangkan: 4y = 12 => y = 3. Maka 3x + 3 = 9 => 3x = 6 => x = 2'
  },
  {
    id: 215,
    type: 'spldv',
    question: 'Selesaikan sistem persamaan:\nx + y = 12\nx - 2y = 0',
    subtext: 'Nilai x dan y berturut-turut:',
    options: ['x = 8, y = 4', 'x = 9, y = 3', 'x = 6, y = 6', 'x = 10, y = 2'],
    correctIndex: 0,
    explanation: 'x = 2y => 2y + y = 12 => 3y = 12 => y = 4, x = 8'
  },
  {
    id: 216,
    type: 'spldv',
    question: 'Jika 4x + 3y = 25 dan 2x + 3y = 17, berapakah nilai x?',
    subtext: 'Pilih nilai x:',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctIndex: 1,
    explanation: 'Kurangkan: 2x = 8 => x = 4'
  },
  {
    id: 217,
    type: 'spldv',
    question: 'Diberikan SPLDV:\n2x - 3y = 7\nx + 3y = 8',
    subtext: 'Berapakah nilai x?',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctIndex: 2,
    explanation: 'Jumlahkan: 3x = 15 => x = 5'
  },
  {
    id: 218,
    type: 'spldv',
    question: 'Dari SPLDV pada soal sebelumnya (x = 5), berapakah nilai y?',
    subtext: 'x + 3y = 8',
    options: ['y = 1', 'y = 2', 'y = 3', 'y = 4'],
    correctIndex: 0,
    explanation: '5 + 3y = 8 => 3y = 3 => y = 1'
  },
  {
    id: 219,
    type: 'spldv',
    question: 'Tentukan nilai x - y jika:\n2x + y = 13\nx + 2y = 11',
    subtext: 'Kurangkan kedua persamaan:',
    options: ['1', '2', '3', '4'],
    correctIndex: 1,
    explanation: '(2x + y) - (x + 2y) = 13 - 11 => x - y = 2'
  },
  {
    id: 220,
    type: 'spldv',
    question: 'Penyelesaian dari:\n3x + 4y = 18\nx + 4y = 10',
    subtext: 'Nilai x dan y berturut-turut:',
    options: ['x = 4, y = 1.5', 'x = 4, y = 2', 'x = 3, y = 2', 'x = 2, y = 3'],
    correctIndex: 0,
    explanation: 'Kurangkan: 2x = 8 => x = 4 => 4 + 4y = 10 => 4y = 6 => y = 1.5'
  },
  {
    id: 221,
    type: 'spldv',
    question: 'Diberikan:\n5x + 3y = 29\n2x + 3y = 14',
    subtext: 'Berapakah nilai x?',
    options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
    correctIndex: 1,
    explanation: 'Kurangkan: 3x = 15 => x = 5'
  },
  {
    id: 222,
    type: 'spldv',
    question: 'Jika x + y = 15 dan x - y = 5, berapakah nilai xy (perkalian x dan y)?',
    subtext: 'Hitung x kali y:',
    options: ['40', '50', '60', '75'],
    correctIndex: 1,
    explanation: '2x = 20 => x = 10, y = 5. Nilai xy = 10 * 5 = 50'
  },
  {
    id: 223,
    type: 'spldv',
    question: 'Tentukan nilai y dari SPLDV:\n4x + 2y = 20\n3x + 2y = 17',
    subtext: 'Berapakah nilai y?',
    options: ['y = 2', 'y = 3', 'y = 4', 'y = 5'],
    correctIndex: 2,
    explanation: 'Kurangkan: x = 3 => 4(3) + 2y = 20 => 12 + 2y = 20 => 2y = 8 => y = 4'
  },
  {
    id: 224,
    type: 'spldv',
    question: 'Jumlah dua bilangan adalah 24 dan selisihnya 6. Bilangan yang terbesar adalah...',
    subtext: 'x + y = 24 dan x - y = 6',
    options: ['12', '15', '18', '20'],
    correctIndex: 1,
    explanation: '2x = 30 => x = 15 (bilangan terbesar)'
  },
  {
    id: 225,
    type: 'spldv',
    question: 'Selesaikan:\n2x - y = 5\n3x + y = 15',
    subtext: 'Nilai x adalah:',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctIndex: 1,
    explanation: 'Jumlahkan: 5x = 20 => x = 4'
  },
  {
    id: 226,
    type: 'spldv',
    question: 'Dari sistem 2x - y = 5 dan 3x + y = 15 (x = 4), nilai y adalah...',
    subtext: 'Hitung nilai y:',
    options: ['y = 2', 'y = 3', 'y = 4', 'y = 5'],
    correctIndex: 1,
    explanation: '2(4) - y = 5 => 8 - y = 5 => y = 3'
  },
  {
    id: 227,
    type: 'spldv',
    question: 'Diberikan:\n3x + 2y = 19\n3x - 2y = 7',
    subtext: 'Berapakah nilai x?',
    options: ['x = 4', 'x = 4.33', 'x = 5', 'x = 6'],
    correctIndex: 1,
    explanation: 'Kurang atau tambah: 6x = 26 => x = 26/6 = 13/3 = 4.33'
  },
  {
    id: 228,
    type: 'spldv',
    question: 'Selesaikan SPLDV:\nx + 4y = 18\nx + y = 6',
    subtext: 'Berapa nilai y?',
    options: ['y = 2', 'y = 3', 'y = 4', 'y = 5'],
    correctIndex: 2,
    explanation: 'Kurangkan: 3y = 12 => y = 4'
  },
  {
    id: 229,
    type: 'spldv',
    question: 'Jika 2x + 3y = 21 dan x + 3y = 15, maka nilai x + y adalah...',
    subtext: 'Cari x dan y:',
    options: ['8', '9', '10', '11'],
    correctIndex: 1,
    explanation: 'Kurangkan: x = 6 => 6 + 3y = 15 => 3y = 9 => y = 3. Nilai x + y = 6 + 3 = 9'
  },
  {
    id: 230,
    type: 'spldv',
    question: 'Nilai x dari SPLDV:\n4x - y = 11\n2x + y = 7',
    subtext: 'Jumlahkan kedua persamaan:',
    options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
    correctIndex: 1,
    explanation: '6x = 18 => x = 3'
  },
  {
    id: 231,
    type: 'spldv',
    question: 'Diberikan:\n6x + y = 26\n2x + y = 10',
    subtext: 'Berapakah nilai x?',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctIndex: 1,
    explanation: 'Kurangkan: 4x = 16 => x = 4'
  },
  {
    id: 232,
    type: 'spldv',
    question: 'Dari persamaan 2x + y = 10 dengan x = 4, nilai y adalah...',
    subtext: 'Substitusikan x:',
    options: ['y = 1', 'y = 2', 'y = 3', 'y = 4'],
    correctIndex: 1,
    explanation: '2(4) + y = 10 => 8 + y = 10 => y = 2'
  },
  {
    id: 233,
    type: 'spldv',
    question: 'Selesaikan:\n3x + 2y = 12\nx - y = 1',
    subtext: 'Pasangan (x, y) adalah:',
    options: ['(2.8, 1.8)', '(2, 1)', '(3, 2)', '(4, 3)'],
    correctIndex: 0,
    explanation: 'x = y + 1 => 3(y + 1) + 2y = 12 => 5y = 9 => y = 1.8, x = 2.8'
  },
  {
    id: 234,
    type: 'spldv',
    question: 'Jika x = 2y dan x + y = 9, maka nilai x adalah...',
    subtext: 'Substitusi x = 2y:',
    options: ['3', '4', '6', '8'],
    correctIndex: 2,
    explanation: '2y + y = 9 => 3y = 9 => y = 3 => x = 2(3) = 6'
  },
  {
    id: 235,
    type: 'spldv',
    question: 'Tentukan nilai x dari:\n5x - 2y = 16\nx + 2y = 8',
    subtext: 'Jumlahkan kedua persamaan:',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctIndex: 1,
    explanation: '6x = 24 => x = 4'
  },
  {
    id: 236,
    type: 'spldv',
    question: 'Berapakah nilai y dari sistem soal sebelumnya (x = 4)?\nx + 2y = 8',
    subtext: 'Cari y:',
    options: ['y = 1', 'y = 2', 'y = 3', 'y = 4'],
    correctIndex: 1,
    explanation: '4 + 2y = 8 => 2y = 4 => y = 2'
  },
  {
    id: 237,
    type: 'spldv',
    question: 'Keliling persegi panjang adalah 28 cm. Panjangnya 4 cm lebih dari lebarnya.\nBerapakah panjang persegi panjang tersebut?',
    subtext: '2(p + l) = 28 dan p - l = 4',
    options: ['8 cm', '9 cm', '10 cm', '11 cm'],
    correctIndex: 1,
    explanation: 'p + l = 14 dan p - l = 4 => 2p = 18 => p = 9 cm'
  },
  {
    id: 238,
    type: 'spldv',
    question: 'Berapakah lebar persegi panjang pada soal sebelumnya (p = 9)?',
    subtext: 'p + l = 14',
    options: ['4 cm', '5 cm', '6 cm', '7 cm'],
    correctIndex: 1,
    explanation: '9 + l = 14 => l = 5 cm'
  },
  {
    id: 239,
    type: 'spldv',
    question: 'Diberikan:\n2x + 5y = 29\n2x + y = 9',
    subtext: 'Berapakah nilai y?',
    options: ['y = 4', 'y = 5', 'y = 6', 'y = 7'],
    correctIndex: 1,
    explanation: 'Kurangkan: 4y = 20 => y = 5'
  },
  {
    id: 240,
    type: 'spldv',
    question: 'Dari 2x + y = 9 dengan y = 5, nilai x adalah...',
    subtext: 'Substitusi y = 5:',
    options: ['x = 1', 'x = 2', 'x = 3', 'x = 4'],
    correctIndex: 1,
    explanation: '2x + 5 = 9 => 2x = 4 => x = 2'
  },
  {
    id: 241,
    type: 'spldv',
    question: 'Tentukan x dari SPLDV:\n7x + 2y = 25\n3x + 2y = 13',
    subtext: 'Kurangkan kedua persamaan:',
    options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
    correctIndex: 1,
    explanation: '4x = 12 => x = 3'
  },
  {
    id: 242,
    type: 'spldv',
    question: 'Jika 3x + y = 13 dengan x = 3, berapa nilai y?',
    subtext: 'Cari y:',
    options: ['y = 2', 'y = 3', 'y = 4', 'y = 5'],
    correctIndex: 2,
    explanation: '3(3) + y = 13 => 9 + y = 13 => y = 4'
  },
  {
    id: 243,
    type: 'spldv',
    question: 'Penyelesaian dari:\nx + y = 20\nx - y = 8',
    subtext: 'Nilai x dan y:',
    options: ['x = 14, y = 6', 'x = 15, y = 5', 'x = 16, y = 4', 'x = 12, y = 8'],
    correctIndex: 0,
    explanation: '2x = 28 => x = 14, y = 6'
  },
  {
    id: 244,
    type: 'spldv',
    question: 'Tentukan nilai dari 2x - y jika x = 14 dan y = 6:',
    subtext: 'Hitung hasil operasi:',
    options: ['20', '22', '24', '26'],
    correctIndex: 1,
    explanation: '2(14) - 6 = 28 - 6 = 22'
  },
  {
    id: 245,
    type: 'spldv',
    question: 'Diberikan:\n4x + 3y = 31\nx + 3y = 19',
    subtext: 'Berapakah nilai x?',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctIndex: 1,
    explanation: 'Kurangkan: 3x = 12 => x = 4'
  },
  {
    id: 246,
    type: 'spldv',
    question: 'Dari x + 3y = 19 dengan x = 4, nilai y adalah...',
    subtext: 'Hitung nilai y:',
    options: ['y = 4', 'y = 5', 'y = 6', 'y = 7'],
    correctIndex: 1,
    explanation: '4 + 3y = 19 => 3y = 15 => y = 5'
  },
  {
    id: 247,
    type: 'spldv',
    question: 'Selesaikan sistem:\n3x - 4y = 1\nx + 4y = 15',
    subtext: 'Berapakah nilai x?',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctIndex: 1,
    explanation: 'Jumlahkan: 4x = 16 => x = 4'
  },
  {
    id: 248,
    type: 'spldv',
    question: 'Jika 2x + 2y = 16, berapakah nilai dari 5x + 5y?',
    subtext: 'Sifat kelipatan aljabar:',
    options: ['32', '40', '48', '50'],
    correctIndex: 1,
    explanation: 'x + y = 8 => 5(x + y) = 5(8) = 40'
  },
  {
    id: 249,
    type: 'spldv',
    question: 'Tentukan himpunan penyelesaian:\n2x + y = 9\nx - 2y = -8',
    subtext: 'Pasangan (x, y):',
    options: ['(2, 5)', '(3, 3)', '(1, 7)', '(4, 1)'],
    correctIndex: 0,
    explanation: 'Kalikan pers 1 dengan 2: 4x + 2y = 18. Jumlahkan dengan pers 2: 5x = 10 => x = 2, y = 5'
  },
  {
    id: 250,
    type: 'spldv',
    question: 'Diberikan:\n3x + 4y = 25\n3x - 4y = -7',
    subtext: 'Berapakah nilai y?',
    options: ['y = 3', 'y = 4', 'y = 5', 'y = 6'],
    correctIndex: 1,
    explanation: 'Kurangkan: 8y = 32 => y = 4'
  }
];
