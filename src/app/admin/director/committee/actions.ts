
'use server';

import { INITIAL_COMMITTEE_STRUCTURE, type CommitteeDivision } from '@/lib/committee-data';

// Mock Database (In-Memory)
let CURRENT_STRUCTURE = [...INITIAL_COMMITTEE_STRUCTURE];

export async function getCommitteeStructure() {
  // Deep copy to prevent mutation issues on the client before saving
  return JSON.parse(JSON.stringify(CURRENT_STRUCTURE));
}

export async function updateCommitteeStructure(newStructure: CommitteeDivision[]) {
  await new Promise(r => setTimeout(r, 800)); // Simulasi loading
  CURRENT_STRUCTURE = newStructure;
  return { success: true, message: "Struktur Panitia berhasil diperbarui." };
}
