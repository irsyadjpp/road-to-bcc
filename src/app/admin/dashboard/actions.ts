'use server';

import { revalidatePath } from "next/cache";

// --- 1. ABSENSI ---
export async function clockIn(location: string) {
  await new Promise(r => setTimeout(r, 1000));
  // Simulasi logic database
  return { 
    success: true, 
    message: "Clock-In Berhasil! Semangat bertugas 🔥",
    timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    streak: 3 // Simulasi streak hari ke-3
  };
}

// --- 2. KONSUMSI ---
export async function redeemMeal() {
  await new Promise(r => setTimeout(r, 1200));
  return {
    success: true,
    code: "MEAL-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
    menu: "Nasi Ayam Bakar + Es Teh"
  };
}

// --- 3. MISI (GAMIFICATION) ---
export async function completeMission(missionId: number) {
  await new Promise(r => setTimeout(r, 800));
  return { success: true, xpGained: 50, newTotalXp: 1250 };
}

// --- 4. PANIC BUTTON ---
export async function triggerSOS(type: string, location: string) {
  // Di real app, ini akan kirim Push Notification ke tim keamanan/medis
  await new Promise(r => setTimeout(r, 500)); 
  console.log(`EMERGENCY [${type}] at [${location}]`);
  return { success: true };
}

// --- DATA INITIAL (Simulasi Load Data) ---
export async function getCommitteeData() {
  return {
    honorarium: {
      total: 450000,
      breakdown: [
        { date: "13 Juni", activity: "Day 1 - Setup", amount: 150000 },
        { date: "14 Juni", activity: "Day 2 - Qualification", amount: 150000 },
        { date: "20 Juni", activity: "Day 3 - Quarter Final", amount: 150000 },
      ]
    },
    missions: [
      { id: 1, title: "Datang sebelum jam 07:00", xp: 50, completed: true },
      { id: 2, title: "Input skor 10 pertandingan", xp: 100, completed: false },
      { id: 3, title: "Bantu bersihkan area VIP", xp: 75, completed: false },
    ]
  };
}
