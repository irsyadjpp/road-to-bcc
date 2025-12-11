
'use server'

import { validatePairingAndGetPrice } from "@/lib/game-logic";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import { athleteProfileSchema } from "@/lib/schemas/player-profile";


// Helper simple untuk generate code
function generateAthleteCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Tanpa I, O, 1, 0 biar ga bingung
  let result = 'ATH-';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function updatePlayerProfile(formData: FormData) {
  const cookieStore = cookies();
  const sessionStr = cookieStore.get('bcc_player_session')?.value;
  if (!sessionStr) return { success: false, message: "Sesi habis, silakan login ulang." };
  
  const session = JSON.parse(sessionStr);

  const rawData = {
    nik: formData.get('nik'),
    phone: formData.get('phone'),
    gender: formData.get('gender'),
    communityName: formData.get('communityName'), // Opsional
    instagram: formData.get('instagram'),
  };

  const validated = athleteProfileSchema.safeParse(rawData);
  
  if (!validated.success) {
    const errorMsg = Object.values(validated.error.flatten().fieldErrors)[0]?.[0];
    return { success: false, message: errorMsg || "Data tidak valid." };
  }

  // GENERATE ATHLETE CODE JIKA BELUM ADA
  const athleteCode = session.athleteCode || generateAthleteCode();

  // SIMULASI UPDATE DB DAN SESI
  const updates = validated.data;
  const updatedSession = { 
    ...session, 
    ...updates, 
    athleteCode, // Simpan code ke sesi
    isProfileComplete: true, 
    tpfStatus: 'PENDING' 
  };
  
  cookieStore.set('bcc_player_session', JSON.stringify(updatedSession), {
    httpOnly: true, path: '/' 
  });

  // Redirect ke dashboard setelah sukses agar user melihat kodenya
  redirect('/player/dashboard'); 
}


export async function getPlayerSession() {
  const cookieStore = cookies();
  const session = cookieStore.get('bcc_player_session');
  if (!session) return null;
  try {
    return JSON.parse(session.value);
  } catch (e) {
    return null;
  }
}


export async function pairAthleteAction(currentUserCode: string, partnerCode: string) {
    // 1. Fetch User & Partner dari DB
    // const user = await db.user.find({ code: currentUserCode });
    // const partner = await db.user.find({ code: partnerCode });

    // MOCK DATA
    const user = { id: 1, name: "Irsyad", level: "beginner" };
    const partner = { id: 2, name: "Partner", level: "intermediate" }; // Contoh level beda

    if (!partner) {
        return { success: false, message: "Kode partner tidak ditemukan." };
    }

    if (user.id === partner.id) {
         return { success: false, message: "Tidak bisa pairing dengan diri sendiri." };
    }

    // 2. VALIDASI MATRIKS & HARGA
    const validation = validatePairingAndGetPrice(user.level as any, partner.level as any);

    if (!validation.isValid) {
        return { 
            success: false, 
            message: validation.reason || "Kombinasi level tidak diizinkan." 
        };
    }

    // 3. CREATE REGISTRATION / INVOICE
    // Logika: 
    // - Buat entri 'Team' baru (Temporary)
    // - Masukkan kedua user ke tim tersebut
    // - Set kategori tim = validation.category
    // - Generate Invoice sebesar validation.pricePerTeam (atau split bill)

    // await db.registration.create({
    //    category: validation.category,
    //    amount: validation.pricePerTeam,
    //    players: [user.id, partner.id]
    // })

    return {
        success: true,
        data: {
            category: validation.category,
            price: validation.pricePerPerson, // Tampilkan harga per orang
            partnerName: partner.name
        }
    };
}

export async function loginPlayerGoogle() {
  await new Promise(r => setTimeout(r, 1000));
  return { success: true };
}

export async function loginPlayerManual(prevState: any, formData: FormData) {
  await new Promise(r => setTimeout(r, 1000));
  const email = formData.get('email');
  if (email === 'test@example.com') {
    return { success: true };
  }
  return { success: false, message: 'Invalid credentials' };
}
