// src/lib/game-logic.ts

export type PlayerLevel = 'beginner' | 'intermediate' | 'advance';
export type CompetitionCategory = 'beginner' | 'intermediate' | 'advance';

interface ValidationResult {
  isValid: boolean;
  category?: CompetitionCategory;
  pricePerTeam?: number; // Harga total per pasang
  pricePerPerson?: number; // Harga per orang (split bill)
  reason?: string;
}

// Harga berdasarkan KATEGORI AKHIR (bukan level individu)
const PRICE_LIST = {
  beginner: 100000,     // 100k per orang
  intermediate: 150000, // 150k per orang
  advance: 150000       // 150k per orang
};

export function validatePairingAndGetPrice(level1: PlayerLevel, level2: PlayerLevel): ValidationResult {
  // 1. Normalisasi level (sort agar urutan tidak berpengaruh, misal: Int-Beg sama dengan Beg-Int)
  const levels = [level1, level2].sort(); // Alfabetis: advance, beginner, intermediate
  
  // Custom logic sorting manual biar gampang dibaca (Beginner -> Intermediate -> Advance)
  const rank = { beginner: 1, intermediate: 2, advance: 3 };
  const p1 = rank[level1] <= rank[level2] ? level1 : level2; // Level lebih rendah
  const p2 = rank[level1] > rank[level2] ? level1 : level2;  // Level lebih tinggi

  const pairKey = `${p1}-${p2}`;

  let category: CompetitionCategory | null = null;

  // 2. MATRIX LOGIC
  switch (pairKey) {
    case 'beginner-beginner':
      category = 'beginner';
      break;
    case 'beginner-intermediate':
      category = 'intermediate'; // Naik kategori
      break;
    case 'intermediate-intermediate':
      category = 'intermediate';
      break;
    case 'intermediate-advance':
      category = 'advance'; // Naik kategori
      break;
    case 'advance-advance':
      category = 'advance';
      break;
    case 'beginner-advance':
      return { 
        isValid: false, 
        reason: "Pasangan tidak valid: Gap level terlalu jauh (Beginner & Advance)." 
      };
    default:
      return { isValid: false, reason: "Kombinasi level tidak dikenali." };
  }

  // 3. PRICING LOGIC (Based on Category)
  if (category) {
    const basePrice = PRICE_LIST[category];
    return {
      isValid: true,
      category: category,
      pricePerPerson: basePrice,
      pricePerTeam: basePrice * 2
    };
  }

  return { isValid: false, reason: "System Error" };
}

// Helper untuk Generate Code (Bisa ditaruh di utils)
export function generateUniqueCode(prefix: 'ATH' | 'COM' = 'ATH'): string {
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${prefix}-${random}`;
}
