
'use server';

import { revalidatePath } from "next/cache";

export type PettyTransaction = {
  id: string;
  item: string;
  amount: number;
  pic: string;
  date: string;
  category: 'KONSUMSI' | 'TRANSPORT' | 'ATK' | 'LAINNYA';
};

let CASH_BALANCE = 5000000; // Modal Awal 5 Juta
let TRANSACTIONS: PettyTransaction[] = [];

export async function getPettyCashData() {
  return { balance: CASH_BALANCE, transactions: TRANSACTIONS };
}

export async function logExpense(formData: FormData) {
  const amount = Number(formData.get('amount'));
  
  if (amount > CASH_BALANCE) return { success: false, message: "Saldo Kas Kecil Tidak Cukup!" };

  const newTx: PettyTransaction = {
    id: `TX-${Date.now()}`,
    item: formData.get('item') as string,
    amount: amount,
    pic: formData.get('pic') as string, // Ambil dari session idealnya
    category: formData.get('category') as any,
    date: new Date().toLocaleTimeString('id-ID'),
  };

  TRANSACTIONS.unshift(newTx);
  CASH_BALANCE -= amount;
  
  revalidatePath('/admin/finance/petty-cash');
  return { success: true, message: "Pengeluaran tercatat." };
}
