
import { z } from "zod";

// Enum untuk kategori
export const CATEGORIES = ["MD", "WD", "XD"] as const;

// Base schema untuk informasi umum
const baseRegistrationSchema = z.object({
  entityName: z.string().min(3, { message: "Nama Tim/Komunitas minimal 3 karakter" }),
  officialLocation: z.string().min(3, { message: "Lokasi asal wajib diisi" }),
  contactPerson: z.string().min(3, { message: "Nama kontak wajib diisi" }),
  phoneNumber: z.string().regex(/^(\+62|62|0)8[1-9][0-9]{6,9}$/, {
    message: "Nomor WhatsApp tidak valid",
  }),
});

// Schema untuk item pendaftaran
const registrationItemSchema = z.object({
  category: z.enum(CATEGORIES),
  quantity: z.number().min(1, "Jumlah tim minimal 1"),
});

// Schema Utama dengan Validasi Kondisional
export const teamRegistrationSchema = z.object({
  ...baseRegistrationSchema.shape,
  type: z.enum(["SINGLE_TEAM", "COMMUNITY"]), // Penentu Tipe
  registrations: z.array(registrationItemSchema),
}).superRefine((data, ctx) => {
  // ATURAN 1: Validasi untuk TIM TUNGGAL
  if (data.type === "SINGLE_TEAM") {
    // Harus memilih tepat 1 kategori
    if (data.registrations.length !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Pendaftaran Tim Tunggal hanya boleh memilih 1 Kategori.",
        path: ["registrations"],
      });
    }
    // Jumlah tim per kategori harus 1
    if (data.registrations.length === 1 && data.registrations[0].quantity !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tim Tunggal hanya boleh mendaftarkan 1 slot tim.",
        path: ["registrations", 0, "quantity"],
      });
    }
  }

  // ATURAN 2: Validasi untuk KOMUNITAS
  if (data.type === "COMMUNITY") {
    // Harus memilih minimal 1 kategori
    if (data.registrations.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Komunitas wajib mendaftarkan minimal 1 tim.",
        path: ["registrations"],
      });
    }
  }
});

export type TeamRegistrationFormValues = z.infer<typeof teamRegistrationSchema>;
