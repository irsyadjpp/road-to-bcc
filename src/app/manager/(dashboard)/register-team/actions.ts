'use server';

import { revalidatePath } from "next/cache";

export async function registerTeamEntity(formData: FormData) {
  // Simulasi Delay Database
  await new Promise(r => setTimeout(r, 1000));

  const teamName = formData.get('name') as string;
  const origin = formData.get('origin');
  
  // GENERATE KODE UNIK (Contoh: BCC-8821)
  // Logic: BCC + 4 digit random angka
  const randomCode = Math.floor(1000 + Math.random() * 9000);
  const teamCode = `BCC-${randomCode}`;

  // Simpan ke Database Tim
  const newTeam = {
    id: `TEAM-${Date.now()}`,
    name: teamName,
    origin: origin,
    code: teamCode,
    manager: formData.get('managerName'),
    jersey: {
        home: formData.get('jerseyHome'),
        away: formData.get('jerseyAway')
    },
    members: [] // Masih kosong, nanti pemain join sendiri
  };

  // TODO: Insert 'newTeam' to Database
  console.log("Team Registered:", newTeam);

  return { success: true, teamCode: teamCode };
}
