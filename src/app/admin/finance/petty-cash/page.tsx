
'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wallet, TrendingDown, Camera } from "lucide-react";
import { logExpense, getPettyCashData } from "./actions";
import { useToast } from "@/hooks/use-toast";

export default function PettyCashPage() {
  const { toast } = useToast();
  const [data, setData] = useState({ balance: 0, transactions: [] as any[] });

  useEffect(() => { load(); }, []);
  const load = () => getPettyCashData().then(setData);

  const handleSubmit = async (formData: FormData) => {
    const res = await logExpense(formData);
    if (res.success) {
        toast({ title: "Saved", description: res.message });
        load();
    } else {
        toast({ title: "Gagal", description: res.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
       {/* SALDO CARD */}
       <Card className="bg-gradient-to-r from-emerald-600 to-green-500 text-white border-none">
          <CardContent className="p-6 flex justify-between items-center">
             <div>
                <p className="text-emerald-100 text-sm font-bold uppercase">Sisa Saldo Kas Kecil</p>
                <h1 className="text-4xl font-black mt-2">Rp {data.balance.toLocaleString('id-ID')}</h1>
             </div>
             <div className="p-4 bg-white/20 rounded-full"><Wallet className="w-8 h-8"/></div>
          </CardContent>
       </Card>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FORM INPUT (KIRI) */}
          <Card className="h-fit">
             <CardHeader><CardTitle>Catat Pengeluaran</CardTitle></CardHeader>
             <CardContent>
                <form action={handleSubmit} className="space-y-4">
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase">Keperluan</label>
                      <Input name="item" placeholder="Beli Es Batu / Fotokopi" required />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase">Nominal (Rp)</label>
                      <Input name="amount" type="number" placeholder="0" required />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase">Kategori</label>
                      <Select name="category" defaultValue="KONSUMSI">
                         <SelectTrigger><SelectValue/></SelectTrigger>
                         <SelectContent>
                            <SelectItem value="KONSUMSI">Konsumsi</SelectItem>
                            <SelectItem value="TRANSPORT">Transport/Bensin</SelectItem>
                            <SelectItem value="ATK">ATK/Print</SelectItem>
                            <SelectItem value="LAINNYA">Lainnya</SelectItem>
                         </SelectContent>
                      </Select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase">Nama PIC</label>
                      <Input name="pic" placeholder="Siapa yang beli?" required />
                   </div>
                   
                   {/* Tombol Kamera (Simulasi) */}
                   <Button variant="outline" type="button" className="w-full text-muted-foreground">
                      <Camera className="mr-2 w-4 h-4"/> Foto Struk / Nota
                   </Button>

                   <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">SIMPAN TRANSAKSI</Button>
                </form>
             </CardContent>
          </Card>

          {/* LIST TRANSAKSI (KANAN) */}
          <Card className="md:col-span-2">
             <CardHeader><CardTitle>Riwayat Pengeluaran Hari Ini</CardTitle></CardHeader>
             <CardContent>
                <Table>
                   <TableHeader>
                      <TableRow><TableHead>Jam</TableHead><TableHead>Item</TableHead><TableHead>PIC</TableHead><TableHead className="text-right">Jumlah</TableHead></TableRow>
                   </TableHeader>
                   <TableBody>
                      {data.transactions.length === 0 && <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground">Belum ada transaksi.</TableCell></TableRow>}
                      {data.transactions.map((tx) => (
                         <TableRow key={tx.id}>
                            <TableCell className="text-xs font-mono">{tx.date}</TableCell>
                            <TableCell>
                               <div className="font-bold">{tx.item}</div>
                               <div className="text-[10px] text-muted-foreground px-2 py-0.5 bg-muted rounded w-fit">{tx.category}</div>
                            </TableCell>
                            <TableCell>{tx.pic}</TableCell>
                            <TableCell className="text-right font-mono text-red-600 font-bold">- Rp {tx.amount.toLocaleString('id-ID')}</TableCell>
                         </TableRow>
                      ))}
                   </TableBody>
                </Table>
             </CardContent>
          </Card>
       </div>
    </div>
  );
}
