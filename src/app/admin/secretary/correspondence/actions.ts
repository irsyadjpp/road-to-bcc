'use server';

import { revalidatePath } from "next/cache";

export type MailLog = {
  id: string;
  type: 'INCOMING' | 'OUTGOING';
  number: string; // No. Surat
  date: string;
  sender: string;
  recipient: string;
  subject: string;
  fileUrl?: string; // Link file jika ada
  status: 'DRAFT' | 'SENT' | 'ARCHIVED';
};

let MAIL_DB: MailLog[] = [
  { id: "M01", type: "INCOMING", number: "001/PBSI/V/2026", date: "2026-05-10", sender: "Pengkot PBSI", recipient: "Ketua Panitia", subject: "Rekomendasi Turnamen", status: "ARCHIVED" }
];

export async function getMailLogs() {
  return MAIL_DB;
}

export async function createLetter(data: FormData) {
  // 1. Simpan Log Surat Keluar
  const newMail: MailLog = {
    id: `OUT-${Date.now()}`,
    type: 'OUTGOING',
    number: data.get('number') as string,
    date: new Date().toISOString().split('T')[0],
    sender: "Sekretariat BCC",
    recipient: data.get('recipient') as string,
    subject: data.get('subject') as string,
    status: 'SENT'
  };
  MAIL_DB.unshift(newMail);
  
  // 2. Di sini nanti logic generate PDF (kita simulasikan di frontend)
  
  revalidatePath('/admin/secretary/correspondence');
  return { success: true, message: "Surat berhasil dibuat & dicatat." };
}