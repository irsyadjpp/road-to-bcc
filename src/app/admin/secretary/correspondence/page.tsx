'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Send, Inbox, Printer, Download } from "lucide-react";
import { getMailLogs, createLetter, type MailLog } from "./actions";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf"; // Pastikan npm install jspdf

export default function CorrespondencePage() {
  const { toast } = useToast();
  const [mails, setMails] = useState<MailLog[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    getMailLogs().then(setMails);
  }, []);

  // FITUR GENERATE PDF SURAT (Tanpa GDocs)
  const handleGenerateLetter = async (formData: FormData) => {
    setIsGenerating(true);
    
    const doc = new jsPDF();
    const noSurat = formData.get('number') as string;
    const recipient = formData.get('recipient') as string;
    const body = formData.get('body') as string;

    // Kop Surat Simple
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("PANITIA BANDUNG COMMUNITY CHAMPIONSHIP 2026", 105, 20, { align: "center" });
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Sekretariat: GOR KONI Bandung, Jl. Jakarta No. 12", 105, 26, { align: "center" });
    doc.line(20, 30, 190, 30);

    // Isi Surat
    doc.setFontSize(12);
    doc.text(`Nomor   : ${noSurat}`, 20, 40);
    doc.text(`Lampiran: -`, 20, 46);
    doc.text(`Perihal : ${formData.get('subject')}`, 20, 52);

    doc.text(`Kepada Yth.`, 20, 65);
    doc.text(recipient, 20, 71);
    doc.text(`Di Tempat`, 20, 77);

    // Body (Split text agar wrap)
    const splitBody = doc.splitTextToSize(body, 170);
    doc.text(splitBody, 20, 90);

    // Tanda Tangan
    doc.text("Bandung, " + new Date().toLocaleDateString('id-ID'), 140, 180);
    doc.text("Ketua Panitia,", 140, 190);
    doc.text("( Irsyad Jamal )", 140, 215);

    // Simpan PDF
    doc.save(`SURAT-${noSurat.replace(/\//g, '-')}.pdf`);

    // Simpan ke Log
    await createLetter(formData);
    getMailLogs().then(setMails);
    
    setIsGenerating(false);
    toast({ title: "Surat Dibuat", description: "File PDF telah diunduh otomatis." });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-bold font-headline">E-Office Sekretariat</h2>
            <p className="text-muted-foreground">Pusat administrasi dan persuratan digital.</p>
        </div>
        
        {/* MODAL BUAT SURAT */}
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-red-700"><FileText className="mr-2 h-4 w-4"/> Buat Surat Baru</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader><DialogTitle>Generator Surat Otomatis</DialogTitle></DialogHeader>
                <form action={handleGenerateLetter} className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Jenis Surat</label>
                            <Select name="template" defaultValue="TUGAS">
                                <SelectTrigger><SelectValue/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="TUGAS">Surat Tugas</SelectItem>
                                    <SelectItem value="UNDANGAN">Surat Undangan</SelectItem>
                                    <SelectItem value="PERMOHONAN">Permohonan Izin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Nomor Surat</label>
                            <Input name="number" placeholder="001/BCC/VI/2026" required />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Tujuan (Kepada)</label>
                        <Input name="recipient" placeholder="Nama Instansi / Perorangan" required />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Perihal</label>
                        <Input name="subject" placeholder="Inti surat..." required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold">Isi Surat</label>
                        <Textarea name="body" placeholder="Tuliskan isi surat di sini..." rows={8} required />
                    </div>

                    <Button type="submit" className="w-full" disabled={isGenerating}>
                        {isGenerating ? "Generating PDF..." : "Cetak PDF & Simpan Log"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="OUTGOING" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="OUTGOING"><Send className="w-4 h-4 mr-2"/> Surat Keluar</TabsTrigger>
            <TabsTrigger value="INCOMING"><Inbox className="w-4 h-4 mr-2"/> Surat Masuk</TabsTrigger>
        </TabsList>
        
        <TabsContent value="OUTGOING">
            <Card>
                <CardHeader><CardTitle>Arsip Surat Keluar</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>No. Surat</TableHead><TableHead>Tujuan</TableHead><TableHead>Perihal</TableHead><TableHead>Tanggal</TableHead><TableHead>File</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {mails.filter(m => m.type === 'OUTGOING').map(m => (
                                <TableRow key={m.id}>
                                    <TableCell className="font-mono">{m.number}</TableCell>
                                    <TableCell>{m.recipient}</TableCell>
                                    <TableCell>{m.subject}</TableCell>
                                    <TableCell>{m.date}</TableCell>
                                    <TableCell><Button variant="ghost" size="sm"><Download className="w-4 h-4"/></Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
        
        <TabsContent value="INCOMING">
             {/* Tabel serupa untuk surat masuk, dengan tombol Upload Scan */}
             <div className="text-center py-8 text-muted-foreground">Fitur Scan & Upload Surat Masuk ada di sini.</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}