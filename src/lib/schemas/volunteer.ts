import { z } from "zod";

export const VOLUNTEER_DIVISIONS = [
  "MATCH CONTROL TEAM (Skor & Lapangan)",
  "GATE & SECURITY (Keamanan & Tiket)",
  "LOGISTIK & RUNNER (Perlengkapan)",
  "MEDIA & DOKUMENTASI (Foto/Video/Sosmed)",
  "LIAISON OFFICER (LO Sponsor/VIP)",
  "MEDIS & KEBERSIHAN",
  "IT SUPPORT (Jaringan & Digital)"
] as const;

export const volunteerSchema = z.object({
  // BAGIAN 1: DATA PRIBADI
  fullName: z.string().min(2, "Nama lengkap wajib diisi"),
  nickname: z.string().min(2, "Nama panggilan wajib diisi"),
  dob: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', { message: "Tanggal lahir wajib diisi" }),
  gender: z.enum(["Laki-laki", "Perempuan"], { required_error: "Pilih jenis kelamin" }),
  whatsapp: z.string().min(10, "Nomor WhatsApp tidak valid").regex(/^\d+$/, "Hanya angka"),
  email: z.string().email("Email tidak valid"),
  address: z.string().min(10, "Alamat domisili wajib diisi lengkap"),
  instagram: z.string().min(2, "Akun Instagram wajib diisi"),

  // BAGIAN 2: LATAR BELAKANG
  education: z.string({ required_error: "Pilih pendidikan terakhir" }),
  institution: z.string().min(2, "Nama institusi wajib diisi"),
  major: z.string().min(2, "Jurusan wajib diisi"),
  status: z.enum(["Mahasiswa Aktif", "Fresh Graduate (Belum Bekerja)", "Karyawan / Profesional", "Freelancer / Wirausaha"], { required_error: "Pilih status saat ini" }),
  expertise: z.string().min(3, "Bidang keahlian wajib diisi"),

  // BAGIAN 3: DIVISI
  division1: z.string({ required_error: "Pilih prioritas 1" }),
  division2: z.string({ required_error: "Pilih prioritas 2" }),

  // BAGIAN 4: KEAHLIAN & PENGALAMAN
  experience: z.string().min(10, "Ceritakan pengalaman Anda minimal 10 karakter"),
  skills: z.array(z.string()).optional(),
  hasVehicle: z.enum(["Ya", "Tidak"], { required_error: "Pilih info kendaraan" }),
  hasLaptop: z.enum(["Ya", "Tidak"], { required_error: "Pilih info laptop" }),

  // BAGIAN 5: KOMITMEN & STUDI KASUS
  availability: z.array(z.string()).min(1, "Pilih minimal 1 tanggal ketersediaan"),
  caseStudy1: z.string().min(20, "Jawaban terlalu pendek, berikan detail tindakan Anda."),
  caseStudy2: z.string().min(20, "Jawaban terlalu pendek, berikan solusi konkret."),

  // BAGIAN 6: PERNYATAAN
  agreeData: z.literal(true, { errorMap: () => ({ message: "Wajib menyetujui pernyataan data benar" }) }),
  agreeRules: z.literal(true, { errorMap: () => ({ message: "Wajib menyetujui aturan panitia" }) }),
  agreeCompetitive: z.literal(true, { errorMap: () => ({ message: "Wajib memahami sifat seleksi" }) }),

}).refine((data) => data.division1 !== data.division2, {
  message: "Pilihan Divisi 2 tidak boleh sama dengan Divisi 1",
  path: ["division2"],
});

export type VolunteerFormValues = z.infer<typeof volunteerSchema>;