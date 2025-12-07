import { z } from "zod";

// Mapping Role sesuai SK
export enum SystemRole {
  PROJECT_DIRECTOR = "PROJECT_DIRECTOR", // The Signer 1
  SECRETARY = "SECRETARY",             // The Signer 2 (Cross-Auth)
  TREASURER = "TREASURER",             // The Checker
  LEGAL = "LEGAL",                     // Legal Validator
  ADVISOR = "ADVISOR",                 // Penasihat (Variance Alert)
  DIVISION_COORD = "DIVISION_COORD"    // The Maker
}

// Status Transaksi
export enum TransactionStatus {
  DRAFT = "DRAFT",
  WAITING_LEGAL = "WAITING_LEGAL",     // Jika ada kontrak
  WAITING_CHECKER = "WAITING_CHECKER", // Menunggu Bendahara
  WAITING_SIGNER = "WAITING_SIGNER",   // Menunggu PD/Sekretaris
  APPROVED = "APPROVED",               // Siap Cair
  PAID = "PAID",                       // Sudah Transfer
  REJECTED = "REJECTED"
}

// Skema Pengajuan Dana (Disbursement)
export const disbursementSchema = z.object({
  id: z.string(),
  requesterRole: z.nativeEnum(SystemRole), // Siapa yang minta?
  divisionId: z.string(),                  // Pos Anggaran mana?
  amount: z.number().min(1, "Nominal tidak boleh 0"),
  description: z.string(),
  isContractual: z.boolean(),              // Apakah butuh review Legal?
  status: z.nativeEnum(TransactionStatus),
  
  // Audit Trail (Siapa yang melakukan apa)
  legalApprovedBy: z.string().optional(),
  checkerApprovedBy: z.string().optional(), // Bendahara
  signerApprovedBy: z.string().optional(),  // PD atau Sekretaris
});

export type DisbursementRequest = z.infer<typeof disbursementSchema>;