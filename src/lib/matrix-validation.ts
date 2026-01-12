
// Definisi Tipe untuk Level dan Tier
export type PlayerLevel = 'Beginner' | 'Pro'; // Simplified
export type PlayerTier = 1 | 2 | 3 | 4; // 1 = Tertinggi, 4 = Terendah

interface PlayerProfile {
  id: string;
  name: string;
  level: PlayerLevel;
  tier: PlayerTier;
  communityCode?: string; // Tambahkan communityCode
}

export interface ValidationResult {
  isValid: boolean;
  message: string;
  allowedCategory?: string;
}

/**
 * MATRIKS ATURAN (Contoh Logika Sporty/Kompetitif)
 * - Pro players cannot pair with anyone.
 * - Only Beginners can pair with other Beginners.
 */
export function validatePairing(
  p1: PlayerProfile, 
  p2: PlayerProfile,
  mode: 'independent' | 'community' = 'independent' // Tambahkan parameter mode
): ValidationResult {
  
  // 1. Validasi SOP 4.3: Cek Kelengkapan Data TPF (Asumsi level ada jika profil ada)
  if (!p1.level || !p2.level) {
    return { isValid: false, message: "Salah satu pemain belum dinilai oleh TPF (SOP 4.3)." };
  }

  // 2. Validasi SOP 4.4.B: Cek Kesamaan Komunitas (KHUSUS MODE KOMUNITAS)
  if (mode === 'community') {
    if (p1.communityCode !== p2.communityCode) {
      return { 
        isValid: false, 
        message: "Dalam Mode Komunitas, kedua pemain wajib berasal dari kode komunitas yang sama (SOP 4.4.B)." 
      };
    }
  }

  // 3. Validasi SOP 4.5: Matriks Level-Tier
  const levels = [p1.level, p2.level];
  
  if (levels.includes('Pro')) {
    return {
      isValid: false,
      message: "Pemain 'Pro' tidak dapat berpasangan di kategori Beginner."
    };
  }
  
  if (p1.level === 'Beginner' && p2.level === 'Beginner') {
     return {
        isValid: true,
        message: "Pasangan Valid! Siap mendominasi lapangan.",
        allowedCategory: "Beginner Open"
      };
  }

  return {
      isValid: false,
      message: "Hanya pasangan Beginner dengan Beginner yang diizinkan."
  };
}
