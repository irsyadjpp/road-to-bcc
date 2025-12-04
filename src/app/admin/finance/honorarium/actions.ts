'use server';

// Tipe Data Skor Panitia (P1-P16)
export type PanitiaScores = {
  p1: number; p2: number; p3: number; p4: number;
  p5: number; p6: number; p7: number; p8: number; p9: number;
  p10: number; p11: number; p12: number;
  p13: number; p14: number; p15: number; p16: number;
};

// Tipe Data Skor Non-Panitia (NP1-NP4)
export type NonPanitiaScores = {
  np1: number; np2: number; np3: number; np4: number;
};

export type StaffEvaluation = {
  id: string;
  name: string;
  jabatan: string;
  type: 'PANITIA' | 'NON_PANITIA';
  scores: PanitiaScores | NonPanitiaScores;
  rawScore: number; // Total Poin (Sum of scores)
};

// Helper: Create Zero Scores
function createZeroPanitiaScores(): PanitiaScores {
  return { p1:0, p2:0, p3:0, p4:0, p5:0, p6:0, p7:0, p8:0, p9:0, p10:0, p11:0, p12:0, p13:0, p14:0, p15:0, p16:0 };
}

function createZeroNPScores(): NonPanitiaScores {
  return { np1:0, np2:0, np3:0, np4:0 };
}

// MOCK DATA INITIALIZATION
let STAFF_LIST: StaffEvaluation[] = [
  // Panitia
  { id: "1", name: "Irsyad Jamal", jabatan: "Project Director", type: 'PANITIA', scores: { ...createZeroPanitiaScores(), p1:5, p2:5, p3:5, p4:4, p5:4, p6:4, p7:4, p8:3, p9:5, p10:5, p11:4, p12:4, p13:5, p14:4, p15:4, p16:5 }, rawScore: 69 },
  { id: "2", name: "Selvi Yulia", jabatan: "Bendahara", type: 'PANITIA', scores: { ...createZeroPanitiaScores(), p1:5, p2:4, p3:5, p4:4, p5:4, p6:4, p7:4, p8:3, p9:4, p10:4, p11:4, p12:5, p13:5, p14:3, p15:4, p16:5 }, rawScore: 66 },
  { id: "3", name: "Agung", jabatan: "Koord. Pertandingan", type: 'PANITIA', scores: createZeroPanitiaScores(), rawScore: 0 },
  
  // Non-Panitia (Kontributor)
  { id: "NP1", name: "Indro", jabatan: "Advisor / Kontributor", type: 'NON_PANITIA', scores: { np1:5, np2:5, np3:5, np4:5 }, rawScore: 20 },
];

// Helper: Hitung Raw Score
function calculateRawScore(scores: any): number {
  return Object.values(scores).reduce((a: any, b: any) => a + b, 0) as number;
}

export async function getStaffEvaluations() {
  return STAFF_LIST;
}

export async function saveEvaluation(staffId: string, newScores: any) {
  await new Promise(r => setTimeout(r, 500)); // Simulasi delay
  
  const index = STAFF_LIST.findIndex(s => s.id === staffId);
  if (index !== -1) {
    STAFF_LIST[index] = { 
        ...STAFF_LIST[index], 
        scores: newScores, 
        rawScore: calculateRawScore(newScores)
    };
  }
  return { success: true };
}
