'use server';

import { revalidatePath } from "next/cache";

export type Team = { id: string; name: string; rank: number; logo: string };
export type Group = { name: string; teams: Team[] };
export type MatchFixture = { 
  id: string; 
  group: string; 
  teamA: string; 
  teamB: string; 
  date: string 
};

// MOCK 32 TIM (Diurutkan berdasarkan Rank/Seeding)
const ALL_TEAMS: Team[] = Array.from({ length: 32 }, (_, i) => ({
  id: `T-${i + 1}`,
  name: `Team Seed #${i + 1}`, // Tim 1 = Seed 1, Tim 32 = Seed 32
  rank: i + 1,
  logo: "/images/logo.png"
}));

// State Mock Database
let GENERATED_GROUPS: Group[] = [];
let GROUP_MATCHES: MatchFixture[] = [];

export async function getBracketData() {
  return { groups: GENERATED_GROUPS, matches: GROUP_MATCHES, teams: ALL_TEAMS };
}

// ALGORITMA DRAWING ALA BWF (Modified for 8 Groups)
export async function generateDraw() {
  await new Promise(r => setTimeout(r, 1500)); // Simulasi mikir

  const groups: Record<string, Team[]> = {
    A: [], B: [], C: [], D: [], E: [], F: [], G: [], H: []
  };

  // 1. SEEDING DISTRIBUTION (Pemisahan Unggulan)
  // Seed 1 -> Group A
  groups['A'].push(ALL_TEAMS[0]);
  // Seed 2 -> Group H (Biar ketemu di Final)
  groups['H'].push(ALL_TEAMS[1]);
  
  // Seed 3 & 4 -> Undi ke C atau F (Simulasi BWF: Top Half vs Bottom Half)
  const seeds34 = [ALL_TEAMS[2], ALL_TEAMS[3]].sort(() => Math.random() - 0.5);
  groups['C'].push(seeds34[0]);
  groups['F'].push(seeds34[1]);

  // Seed 5-8 -> Undi ke B, D, E, G
  const seeds58 = ALL_TEAMS.slice(4, 8).sort(() => Math.random() - 0.5);
  ['B', 'D', 'E', 'G'].forEach((g, i) => groups[g].push(seeds58[i]));

  // 2. REST OF TEAMS (Sisa 24 tim diacak total)
  const remainingTeams = ALL_TEAMS.slice(8).sort(() => Math.random() - 0.5);
  
  // Masukkan sisa tim ke grup secara merata (Snake format atau random fill)
  let teamIdx = 0;
  ['A','B','C','D','E','F','G','H'].forEach(g => {
    // Tiap grup butuh 3 tim lagi (Total 4)
    for(let i=0; i<3; i++) {
        groups[g].push(remainingTeams[teamIdx]);
        teamIdx++;
    }
  });

  // 3. GENERATE FIXTURES (Round Robin: A vs B, C vs D, dst)
  const matches: MatchFixture[] = [];
  Object.entries(groups).forEach(([groupName, teams]) => {
     // Logika Round Robin 4 Tim (6 Pertandingan)
     // Matchday 1: 1vs4, 2vs3
     matches.push({ id: `M-${groupName}1`, group: groupName, teamA: teams[0].name, teamB: teams[3].name, date: 'Day 1' });
     matches.push({ id: `M-${groupName}2`, group: groupName, teamA: teams[1].name, teamB: teams[2].name, date: 'Day 1' });
     // Matchday 2: 1vs3, 2vs4
     matches.push({ id: `M-${groupName}3`, group: groupName, teamA: teams[0].name, teamB: teams[2].name, date: 'Day 2' });
     matches.push({ id: `M-${groupName}4`, group: groupName, teamA: teams[1].name, teamB: teams[3].name, date: 'Day 2' });
     // Matchday 3: 1vs2, 3vs4
     matches.push({ id: `M-${groupName}5`, group: groupName, teamA: teams[0].name, teamB: teams[1].name, date: 'Day 3' });
     matches.push({ id: `M-${groupName}6`, group: groupName, teamA: teams[2].name, teamB: teams[3].name, date: 'Day 3' });
  });

  // Simpan ke "DB"
  GENERATED_GROUPS = Object.entries(groups).map(([name, teams]) => ({ name, teams }));
  GROUP_MATCHES = matches;

  revalidatePath('/admin/match-control/bracket');
  return { success: true, message: "Drawing Selesai! Jadwal Group Stage terbentuk." };
}
