import { z } from "zod";

// Skema data untuk satu anggota panitia
export const committeeMemberSchema = z.object({
  id: z.string().optional(), // ID akan digenerate
  name: z.string().min(2, "Nama wajib diisi."),
  phone: z.string().min(10, "Nomor telepon tidak valid.").optional().or(z.literal('')),
  email: z.string().email("Email tidak valid.").optional().or(z.literal('')),
  expertise: z.string().optional(), // Keahlian utama
  photoUrl: z.string().url().optional().or(z.literal('')), // URL foto profil
});

export type CommitteeMember = z.infer<typeof committeeMemberSchema>;
