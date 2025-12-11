
import { redirect } from 'next/navigation';
import { getPlayerSession } from "../actions";
import { DashboardClient } from "@/components/player/dashboard-full"; 
import { ClientOnly } from '@/components/client-only';

export default async function PlayerDashboardPage() {
  const session = await getPlayerSession();

  if (!session) {
    redirect('/player/login');
  }

  // Jika profile belum lengkap, lempar ke register wizard
  if (!session.isProfileComplete) {
    redirect('/player/register');
  }

  return (
    <ClientOnly>
      <DashboardClient session={session} />
    </ClientOnly>
  );
}
