
'use server';

// Tipe Data Hasil Tie
export type MatchParty = {
  id: number;
  category: string;
  playerA1: string;
  playerA2: string;
  playerB1: string;
  playerB2: string;
  score: string; // "21-19, 18-21, 21-15"
  winner: 'A' | 'B' | null;
};

export type TieResult = {
  id: string;
  date: string;
  court: string;
  round: string;
  teamA: string;
  teamB: string;
  matches: MatchParty[];
  finalScoreA: number;
  finalScoreB: number;
  winnerTeam: string;
  managerA_verified: boolean;
  managerB_verified: boolean;
  referee_verified: boolean;
  status: 'DRAFT' | 'FINAL';
};

// Mock Database
let TIE_RESULTS: TieResult[] = [];

export async function submitTieResult(data: TieResult) {
  // Simulasi delay database
  await new Promise(r => setTimeout(r, 1000));
  
  // Simpan ke "Database"
  TIE_RESULTS.push({ ...data, status: 'FINAL' });
  
  return { 
    success: true, 
    message: `Hasil Pertandingan ${data.teamA} vs ${data.teamB} Berhasil Disimpan.` 
  };
}
