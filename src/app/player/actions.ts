'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from 'zod';
import { athleteProfileSchema } from "@/lib/schemas/player-profile";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

// Helper simple untuk generate code
function generateAthleteCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = 'ATH-';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function loginPlayerGoogle() {
  await new Promise(r => setTimeout(r, 800)); // Simulasi network

  // Sesi default tanpa athleteCode (karena belum register profile)
  const devSession = {
    id: `P-DEV-${Date.now()}`,
    email: "atlet.dev@gmail.com",
    name: "Atlet Development",
    role: "PLAYER",
    teamId: null,
    isLoggedIn: true,
    provider: "GOOGLE_DEV",
    isProfileComplete: false // Default false
  };

  cookies().set('bcc_player_session', JSON.stringify(devSession), {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return { success: true };
}

export async function getPlayerSession() {
  const session = cookies().get('bcc_player_session');
  if (!session) return null;
  try {
      return JSON.parse(session.value);
  } catch (e) {
      return null;
  }
}

export async function updatePlayerProfile(formData: FormData) {
  const cookieStore = cookies();
  const sessionStr = cookieStore.get('bcc_player_session')?.value;
  if (!sessionStr) return { success: false, message: "Sesi habis." };
  
  const session = JSON.parse(sessionStr);

  const rawData = {
    nik: formData.get('nik'),
    phone: formData.get('phone'),
    gender: formData.get('gender'),
    communityName: formData.get('communityName'),
    instagram: formData.get('instagram'),
  };

  const validated = athleteProfileSchema.safeParse(rawData);
  
  if (!validated.success) {
    const errorMsg = Object.values(validated.error.flatten().fieldErrors)[0]?.[0];
    return { success: false, message: errorMsg || "Data tidak valid." };
  }

  // LOGIC PENTING: Generate Code jika belum ada
  const athleteCode = session.athleteCode || generateAthleteCode();

  const updatedSession = { 
    ...session, 
    ...validated.data, 
    athleteCode, 
    isProfileComplete: true, 
    tpfStatus: 'PENDING' 
  };
  
  cookieStore.set('bcc_player_session', JSON.stringify(updatedSession), {
    httpOnly: true, path: '/' 
  });

  // Redirect wajib di server action Next.js jika ingin pindah page
  redirect('/player/dashboard');
}

export async function loginPlayerManual(prevState: any, formData: FormData) {
  await new Promise(r => setTimeout(r, 1000));
  const email = formData.get('email');
  if (email === 'test@example.com') {
    return { success: true };
  }
  return { success: false, message: 'Invalid credentials' };
}
