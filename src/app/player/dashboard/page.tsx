
import { redirect } from 'next/navigation';
import { getPlayerSession } from "../actions";
import { DashboardClient } from "@/components/player/dashboard-full"; // Kita pindahkan logic client ke komponen terpisah agar rapi

export default async function PlayerDashboardPage() {
  // 1. Fetch Session Server-Side
  const session = await getPlayerSession();

  // 2. Security Check
  if (!session) {
    redirect('/player/login');
  }

  // 3. Profile Check (Jika belum lengkap, lempar ke Wizard)
  if (!session.isProfileComplete) {
    redirect('/player/register');
  }

  // 4. Render Client Component
  // Kita pass data session ke client component untuk interaktivitas
  return (
    <DashboardClient session={session} />
  );
}
