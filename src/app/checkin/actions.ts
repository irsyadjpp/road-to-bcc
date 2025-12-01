'use server';

import { z } from 'zod';

// Skema Validasi
const formSchema = z.object({
  name: z.string().min(2, "Nama wajib diisi"),
  whatsapp: z.string().min(10, "Nomor WA tidak valid"),
});

// Fungsi Helper Acak Kode Voucher
function generateVoucherCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = 'BCC-';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// SIMULASI CHECK-IN
export async function submitCheckin(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const whatsapp = formData.get('whatsapp') as string;

  // 1. Validasi Input
  const validation = formSchema.safeParse({ name, whatsapp });
  
  // Simulasi Delay Jaringan (1 detik)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!validation.success) {
    return { success: false, message: "Data tidak valid. Periksa nama & WA." };
  }

  // 2. Simulasi Logika Database
  // Anggap saja user dengan nomor "08123456789" sudah pernah check-in
  if (whatsapp === "08123456789") {
    return { 
      success: true, 
      voucherCode: "BCC-LAMA", 
      visitorId: "mock-visitor-id-123",
      isExisting: true,
      message: "Selamat datang kembali!" 
    };
  }

  // 3. User Baru (Sukses)
  const newVoucher = generateVoucherCode();
  
  return { 
    success: true, 
    voucherCode: newVoucher,
    visitorId: `visitor-${Date.now()}`, // ID simulasi
    isExisting: false,
    message: "Check-in Berhasil!" 
  };
}

// SIMULASI VOTING
export async function submitVote(visitorId: string, teamName: string) {
  // Simulasi Delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  console.log(`[MOCK DB] Visitor ${visitorId} voted for ${teamName}`);
  
  return { success: true };
}


// --- TAMBAHAN BARU ---

// 1. Simulasi Data Booth Sponsor
const SPONSORS = [
  { id: 'bjb', name: 'Bank BJB', icon: '🏦' },
  { id: 'yonex', name: 'Yonex', icon: '🏸' },
  { id: 'pocari', name: 'Pocari Sweat', icon: '💧' },
  { id: 'kopi', name: 'Kopi Kenangan', icon: '☕' },
];

// 2. Action: Visit Booth (Scan QR Tenant)
export async function visitBooth(visitorId: string, boothId: string) {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulasi delay

  const sponsor = SPONSORS.find(s => s.id === boothId);
  if (!sponsor) return { success: false, message: "Booth tidak valid" };

  // Di real app, simpan ke database: collection('visits').add(...)
  return { 
    success: true, 
    sponsorName: sponsor.name,
    message: `Berhasil check-in di ${sponsor.name}!`,
    totalStamps: Math.floor(Math.random() * 3) + 1 // Simulasi: user punya 1-3 stamp
  };
}

// 3. Action: Get Leaderboard (Klasemen Dukungan)
export async function getLeaderboard() {
  // Di real app, gunakan query aggregation: count()
  return [
    { team: "PB Djarum", votes: 1250, percent: 45 },
    { team: "Jaya Raya", votes: 980, percent: 35 },
    { team: "SGS PLN", votes: 560, percent: 20 },
  ];
}
