import { z } from "zod";

export const DIVISIONS = [
  "MATCH CONTROL (Skor & Lapangan)",
  "GATE KEEPER (Keamanan & Tiket)",
  "LOGISTIK & RUNNER",
  "MEDIA & DOKUMENTASI",
  "LIAISON OFFICER (LO)",
  "MEDIS & KEBERSIHAN"
] as const;

export const recruitmentSchema = z.object({
  // BAGIAN 1: DATA PRIBADI
  fullName: z.string().min(2, "Nama lengkap wajib diisi"),
  nickname: z.string().min(2, "Nama panggilan wajib diisi"),
  whatsapp: z.string().min(10, "Nomor WhatsApp tidak valid").regex(/^\d+$/, "Hanya angka"),
  email: z.string().email("Email tidak valid"),
  address: z.string().min(5, "Alamat domisili wajib diisi"),
  instagram: z.string().min(2, "Akun Instagram wajib diisi"),
  education: z.string({ required_error: "Pilih pendidikan terakhir" }),
  status: z.enum(["Mahasiswa", "Karyawan / Profesional", "Wirausaha / Freelancer", "Fresh Graduate / Belum Bekerja"], {
    required_error: "Pilih status saat ini",
  }),
  major: z.string().min(2, "Bidang pekerjaan/jurusan wajib diisi"),

  // BAGIAN 2: DIVISI
  division1: z.string({ required_error: "Pilih prioritas 1" }),
  division2: z.string({ required_error: "Pilih prioritas 2" }),

  // BAGIAN 3: KEAHLIAN
  hasExperience: z.enum(["Ya", "Tidak"], { required_error: "Pilih pengalaman" }),
  experienceDetail: z.string().optional(),
  skills: z.array(z.string()).optional(),
  equipment: z.array(z.string()).optional(),

  // BAGIAN 4: KOMITMEN
  availability: z.array(z.string()).min(1, "Pilih minimal 1 tanggal kehadiran"),
  attendBriefing: z.enum(["Ya", "Tidak"], { required_error: "Wajib hadir briefing" }),
  shirtSize: z.string({ required_error: "Pilih ukuran baju" }),

  // BAGIAN 5: STUDI KASUS
  caseStudy1: z.string().min(10, "Jawaban terlalu pendek (min 10 karakter)"),
  caseStudy2: z.string().min(10, "Jawaban terlalu pendek (min 10 karakter)"),

  // BAGIAN 6: PERNYATAAN
  agreeData: z.literal(true, { errorMap: () => ({ message: "Wajib menyetujui" }) }),
  agreeRules: z.literal(true, { errorMap: () => ({ message: "Wajib menyetujui" }) }),
  agreeCompetitive: z.literal(true, { errorMap: () => ({ message: "Wajib menyetujui" }) }),
}).refine((data) => data.division1 !== data.division2, {
  message: "Pilihan Divisi 2 tidak boleh sama dengan Divisi 1",
  path: ["division2"],
});

export type RecruitmentFormValues = z.infer<typeof recruitmentSchema>;
