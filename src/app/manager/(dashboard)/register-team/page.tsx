'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2, Shield, Users, Shirt, Copy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { registerTeamEntity } from "./actions"; 

export default function RegisterTeamPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    const res = await registerTeamEntity(formData);
    setIsSubmitting(false);

    if (res.success) {
      setGeneratedCode(res.teamCode); // Tampilkan kode sukses
      toast({ title: "Tim Terdaftar!", description: "Bagikan kode ke pemain Anda.", className: "bg-green-600 text-white" });
    } else {
      toast({ title: "Gagal", description: res.message, variant: "destructive" });
    }
  };

  const copyCode = () => {
    if(generatedCode) {
        navigator.clipboard.writeText(generatedCode);
        toast({ title: "Kode Disalin!" });
    }
  };

  // JIKA SUDAH SUKSES DAFTAR, TAMPILKAN KODE
  if (generatedCode) {
    return (
        <div className="max-w-xl mx-auto pt-10">
            <Card className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800 text-center p-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-black text-green-800 dark:text-green-400 mb-2">Tim Berhasil Dibuat!</h2>
                <p className="text-muted-foreground mb-8">
                    Langkah selanjutnya: Bagikan kode ini ke grup WhatsApp atlet Anda agar mereka bisa bergabung (Join) ke dalam tim.
                </p>
                
                <div className="flex items-center gap-2 max-w-sm mx-auto mb-8">
                    <div className="flex-grow bg-white dark:bg-black border-2 border-green-500 rounded-lg h-14 flex items-center justify-center font-mono text-2xl font-black tracking-widest">
                        {generatedCode}
                    </div>
                    <Button size="icon" className="h-14 w-14 bg-green-600 hover:bg-green-700" onClick={copyCode}>
                        <Copy className="w-6 h-6" />
                    </Button>
                </div>

                <Button onClick={() => router.push('/manager/dashboard')} variant="outline" className="w-full">
                    Masuk ke Dashboard Tim
                </Button>
            </Card>
        </div>
    )
  }

  // FORM PENDAFTARAN TIM (METADATA ONLY)
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold font-headline">Registrasi Tim Baru</h2>
        <p className="text-muted-foreground">Isi identitas tim. Data pemain akan diisi oleh atlet masing-masing.</p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Identitas Klub / Komunitas</CardTitle>
        </CardHeader>
        <CardContent>
            <form action={handleSubmit} className="space-y-6">
                
                {/* NAMA & ASAL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Nama Tim Official</Label>
                        <div className="relative">
                            <Shield className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <Input name="name" placeholder="Cth: PB Djarum" className="pl-10" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Asal Kota / Instansi</Label>
                        <Input name="origin" placeholder="Cth: Bandung / PT. Telkom" required />
                    </div>
                </div>

                {/* KONTAK MANAGER */}
                <div className="space-y-2">
                    <Label>Nama Manajer / Official (PIC)</Label>
                    <div className="relative">
                        <Users className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input name="managerName" placeholder="Nama Anda" required />
                    </div>
                </div>

                <Separator />

                {/* JERSEY INFO */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold flex items-center gap-2">
                        <Shirt className="w-4 h-4" /> Warna Jersey Tim
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">Jersey Home (Utama)</Label>
                            <Input name="jerseyHome" placeholder="Cth: Merah - Hitam" required />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">Jersey Away (Cadangan)</Label>
                            <Input name="jerseyAway" placeholder="Cth: Putih - Putih" required />
                        </div>
                    </div>
                </div>

                {/* UPLOAD LOGO (Opsional) */}
                <div className="space-y-2">
                    <Label>Logo Tim (Opsional)</Label>
                    <Input type="file" name="logo" accept="image/*" className="text-sm" />
                    <p className="text-[10px] text-muted-foreground">*Akan ditampilkan di papan skor TV & Website.</p>
                </div>

                <Button type="submit" size="lg" className="w-full font-bold" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="animate-spin mr-2"/> : "DAFTARKAN TIM & DAPATKAN KODE"}
                </Button>

            </form>
        </CardContent>
      </Card>
    </div>
  );
}
