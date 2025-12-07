'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// SIMULASI DATABASE USER
// Di production, ini diganti database query (Prisma/Supabase)
let MOCK_USERS_DB = [
  { 
    email: process.env.DIRECTOR_EMAIL || "director@bcc.com", 
    name: "Project Director", 
    role: "DIRECTOR", 
    isProfileCompleted: true 
  }
];

export async function loginAdminGoogle() {
  // 1. Simulasi data dari Google Auth
  const googleUser = {
    email: "new.staff@gmail.com", // Ceritanya user baru login
    name: "Budi Calon Panitia",
    avatar: "https://github.com/shadcn.png"
  };

  // 2. Cek apakah user ada di DB
  let user = MOCK_USERS_DB.find(u => u.email === googleUser.email);

  // 3. Jika TIDAK ADA, buat user baru dengan status UNASSIGNED
  if (!user) {
    const newUser = {
      ...googleUser,
      role: "UNASSIGNED",
      isProfileCompleted: false, // Belum isi biodata
    };
    // MOCK: Simpan ke DB
    // MOCK_USERS_DB.push(newUser); 
    user = newUser;
  }

  // 4. Buat Session
  const sessionData = JSON.stringify({
    ...user,
    isLoggedIn: true,
  });

  cookies().set('bcc_admin_session', sessionData, { httpOnly: true, path: '/' });

  // 5. Redirect Logic
  // Jika profil belum lengkap -> Halaman Onboarding
  if (!user.isProfileCompleted) {
    // Return flag khusus supaya UI client melakukan redirect
    return { success: true, redirectUrl: '/admin/onboarding' };
  }
  
  // Jika sudah lengkap tapi belum di-assign Director -> Halaman Waiting
  if (user.role === 'UNASSIGNED') {
    return { success: true, redirectUrl: '/admin/waiting-room' };
  }

  return { success: true, redirectUrl: '/admin/dashboard' };
}

// 2. Logic Login PIN (Alternatif untuk di Lapangan)
export async function loginAdminByCode(prevState: any, formData: FormData) {
  const code = formData.get('code') as string;

  // Cari user di DB yang punya PIN ini
  const dbUser = MOCK_DB_USERS.find(u => (u as any).pin === code);

  if (!dbUser) {
    return { success: false, message: "Kode PIN tidak valid atau belum di-assign." };
  }

  const sessionData = JSON.stringify({
    name: dbUser.name,
    email: dbUser.email,
    role: dbUser.role,
    isLoggedIn: true,
    method: 'PIN',
    isOnboarded: false, // NEW: Force onboarding check
  });

  cookies().set('bcc_admin_session', sessionData, { httpOnly: true, path: '/' });
  return { success: true, message: "Login berhasil!" };
}


export async function logoutAdmin() {
  cookies().delete('bcc_admin_session');
  redirect('/');
}

export async function getAdminSession() {
  const session = cookies().get('bcc_admin_session');
  if (!session) return null;
  try {
    return JSON.parse(session.value);
  } catch (e) {
    return null;
  }
}

export async function signIntegrityPact() {
  const session = await getAdminSession();
  if (!session) return { success: false };

  const updatedSession = { ...session, isOnboarded: true };

  cookies().set('bcc_admin_session', JSON.stringify(updatedSession), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return { success: true };
}
