"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recruitmentSchema, type RecruitmentFormValues, DIVISIONS } from "@/lib/schemas/recruitment";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, Briefcase, Calendar, Shirt, BrainCircuit, User } from "lucide-react";
import { useState, useEffect } from "react";
import confetti from 'canvas-confetti';
import Link from "next/link";

export default function RecruitmentPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<RecruitmentFormValues>({
    resolver: zodResolver(recruitmentSchema),
    defaultValues: {
      skills: [],
      equipment: [],
      availability: [],
    },
  });

  // Logic untuk "SAYA SIAP SEMUA TANGGAL"
  const handleAvailabilityChange = (checked: boolean, value: string, field: any) => {
    const allDates = ["Week 1 (13-14 Juni)", "Week 2 (20-21 Juni)", "Week 3 (27-28 Juni)", "Grand Final (5 Juli)"];
    if (value === "ALL") {
      if (checked) {
        field.onChange([...allDates, "ALL"]);
      } else {
        field.onChange([]);
      }
    } else {
      let newValues = field.value || [];
      if (checked) {
        newValues = [...newValues, value];
      } else {
        newValues = newValues.filter((v: string) => v !== value);
      }
      
      // Uncheck "ALL" if any date is unchecked
      if (newValues.includes("ALL") && newValues.length <= allDates.length) {
         newValues = newValues.filter((v:string) => v !== "ALL");
      }

      // Check "ALL" if all dates are checked
      if (allDates.every(date => newValues.includes(date))) {
          if(!newValues.includes("ALL")) newValues.push("ALL");
      }
      
      field.onChange(newValues);
    }
  };

  async function onSubmit(data: RecruitmentFormValues) {
    setIsSubmitting(true);
    console.log("Recruitment Data:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulasi
    setIsSubmitting(false);
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    if (isSuccess) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  }, [isSuccess]);

  if (isSuccess) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow flex items-center justify-center py-16 px-4 bg-secondary/10">
          <Card className="max-w-2xl w-full shadow-2xl border-t-8 border-t-primary text-center p-8">
            <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-6" />
            <h1 className="text-3xl font-black font-headline text-primary mb-4">Lamaran Terkirim!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Terima kasih atas antusiasme Anda untuk bergabung dengan BCC 2026. 
              Tim HRD kami akan mereview data Anda. Kandidat terpilih akan dihubungi via WhatsApp untuk tahap wawancara.
            </p>
            <Button asChild variant="outline">
              <Link href="/">Kembali ke Beranda</Link>
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-12 px-4 md:px-8 bg-secondary/10">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* HEADER */}
          <div className="text-center space-y-4 mb-10">
            <h1 className="text-3xl md:text-5xl font-black font-headline text-primary">OPEN RECRUITMENT PANITIA</h1>
            <p className="text-xl font-bold text-foreground">Bergabunglah dengan Tim Pemenang BCC 2026!</p>
            <Card className="bg-white border-primary/20 text-left shadow-sm">
              <CardContent className="p-6 space-y-4 text-sm md:text-base">
                <p>Kami mencari individu yang berdedikasi, jujur, dan siap bekerja keras untuk menyukseskan turnamen komunitas terbesar di Bandung.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex gap-2 items-start">
                        <Calendar className="w-5 h-5 text-primary shrink-0" />
                        <span><strong>Periode:</strong> Juni - Juli 2026 (Sabtu & Minggu)</span>
                    </div>
                    <div className="flex gap-2 items-start">
                        <Briefcase className="w-5 h-5 text-primary shrink-0" />
                        <span><strong>Benefit:</strong> Honorarium, Uang Makan, Sertifikat, Jersey Eksklusif.</span>
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* BAGIAN 1: DATA PRIBADI */}
              <Card>
                <CardHeader className="bg-primary/5 border-b"><CardTitle className="flex items-center gap-2"><User className="w-5 h-5"/> 1. Data Pribadi & Latar Belakang</CardTitle></CardHeader>
                <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="fullName" render={({ field }) => (
                            <FormItem><FormLabel>Nama Lengkap (KTP)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="nickname" render={({ field }) => (
                            <FormItem><FormLabel>Nama Panggilan</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="whatsapp" render={({ field }) => (
                            <FormItem><FormLabel>WhatsApp Aktif</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                    <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem><FormLabel>Alamat Domisili</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="instagram" render={({ field }) => (
                        <FormItem><FormLabel>Instagram (Jangan Private)</FormLabel><FormControl><Input placeholder="@username" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="education" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pendidikan Terakhir</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Pilih Jenjang" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="SMA/SMK">SMA / SMK / Sederajat</SelectItem>
                                        <SelectItem value="D3/D4">Diploma (D3 / D4)</SelectItem>
                                        <SelectItem value="S1">Sarjana (S1)</SelectItem>
                                        <SelectItem value="S2/S3">Pascasarjana (S2 / S3)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="major" render={({ field }) => (
                            <FormItem><FormLabel>Bidang Keahlian / Jurusan</FormLabel><FormControl><Input placeholder="Contoh: Manajemen Event, IT, Hukum..." {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>

                    <FormField control={form.control} name="status" render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Status Saat Ini</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {["Mahasiswa", "Karyawan / Profesional", "Wirausaha / Freelancer", "Fresh Graduate / Belum Bekerja"].map((item) => (
                                        <FormItem key={item} className="flex items-center space-x-3 space-y-0 border p-3 rounded hover:bg-secondary">
                                            <FormControl><RadioGroupItem value={item} /></FormControl>
                                            <FormLabel className="font-normal cursor-pointer w-full">{item}</FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </CardContent>
              </Card>

              {/* BAGIAN 2: DIVISI */}
              <Card>
                <CardHeader className="bg-primary/5 border-b"><CardTitle className="flex items-center gap-2"><Briefcase className="w-5 h-5"/> 2. Pilihan Divisi</CardTitle></CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="bg-blue-50 p-4 rounded text-sm text-blue-800 mb-4">
                        <strong>Deskripsi Singkat:</strong><br/>
                        • Match Control: Input skor, dampingi wasit (Teliti).<br/>
                        • Gate Keeper: Tiket & keamanan (Tegas).<br/>
                        • Logistik: Perlengkapan (Fisik kuat).<br/>
                        • Media: Foto/Video/Sosmed (Kreatif).<br/>
                        • LO: Dampingi VIP (Komunikatif).<br/>
                        • Medis: P3K (Cekatan).
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <FormField control={form.control} name="division1" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pilihan 1 (Prioritas)</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Pilih Divisi Utama" /></SelectTrigger></FormControl>
                                    <SelectContent>{DIVISIONS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="division2" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pilihan 2 (Cadangan)</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Pilih Divisi Cadangan" /></SelectTrigger></FormControl>
                                    <SelectContent>{DIVISIONS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                </CardContent>
              </Card>

              {/* BAGIAN 3: KEAHLIAN */}
              <Card>
                <CardHeader className="bg-primary/5 border-b"><CardTitle className="flex items-center gap-2"><BrainCircuit className="w-5 h-5"/> 3. Keahlian & Pengalaman</CardTitle></CardHeader>
                <CardContent className="p-6 space-y-6">
                    <FormField control={form.control} name="hasExperience" render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Pengalaman Panitia Event Olahraga?</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-row gap-4">
                                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Ya" /></FormControl><FormLabel>Ya</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Tidak" /></FormControl><FormLabel>Tidak / Pemula</FormLabel></FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    
                    {form.watch("hasExperience") === "Ya" && (
                        <FormField control={form.control} name="experienceDetail" render={({ field }) => (
                            <FormItem><FormLabel>Sebutkan Event & Posisinya</FormLabel><FormControl><Input {...field} placeholder="Cth: Panitia PON 2024 bagian Logistik" /></FormControl><FormMessage /></FormItem>
                        )} />
                    )}

                    <FormField control={form.control} name="skills" render={() => (
                        <FormItem>
                            <div className="mb-4"><FormLabel>Keahlian Khusus (Centang yang sesuai)</FormLabel></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {["Fotografi/Videografi", "Desain Grafis", "Administrasi/Excel", "Public Speaking/MC", "P3K/Medis Dasar", "Scoring Badminton"].map((item) => (
                                    <FormField key={item} control={form.control} name="skills" render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox checked={field.value?.includes(item)} onCheckedChange={(checked) => checked ? field.onChange([...field.value || [], item]) : field.onChange(field.value?.filter((v) => v !== item))} />
                                            </FormControl>
                                            <FormLabel className="font-normal cursor-pointer">{item}</FormLabel>
                                        </FormItem>
                                    )} />
                                ))}
                            </div>
                        </FormItem>
                    )} />
                    
                    <FormField control={form.control} name="equipment" render={() => (
                        <FormItem>
                            <div className="mb-4"><FormLabel>Perangkat Pribadi yang Dimiliki</FormLabel></div>
                            <div className="flex flex-wrap gap-4">
                                {["Laptop", "Motor", "Kamera", "Powerbank"].map((item) => (
                                    <FormField key={item} control={form.control} name="equipment" render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox checked={field.value?.includes(item)} onCheckedChange={(checked) => checked ? field.onChange([...field.value || [], item]) : field.onChange(field.value?.filter((v) => v !== item))} />
                                            </FormControl>
                                            <FormLabel className="font-normal cursor-pointer">{item}</FormLabel>
                                        </FormItem>
                                    )} />
                                ))}
                            </div>
                        </FormItem>
                    )} />
                </CardContent>
              </Card>

              {/* BAGIAN 4: KOMITMEN */}
              <Card>
                <CardHeader className="bg-primary/5 border-b"><CardTitle className="flex items-center gap-2"><Calendar className="w-5 h-5"/> 4. Komitmen Waktu</CardTitle></CardHeader>
                <CardContent className="p-6 space-y-6">
                     <FormField control={form.control} name="availability" render={() => (
                        <FormItem>
                            <div className="mb-4"><FormLabel>Kesediaan Hadir (Wajib Komitmen)</FormLabel></div>
                            <div className="space-y-2 border p-4 rounded bg-secondary/10">
                                {["Week 1 (13-14 Juni)", "Week 2 (20-21 Juni)", "Week 3 (27-28 Juni)", "Grand Final (5 Juli)", "ALL"].map((item) => (
                                    <FormField key={item} control={form.control} name="availability" render={({ field }) => (
                                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox 
                                                    checked={field.value?.includes(item)} 
                                                    onCheckedChange={(checked) => handleAvailabilityChange(!!checked, item, field)} 
                                                />
                                            </FormControl>
                                            <FormLabel className={`font-normal cursor-pointer ${item === "ALL" ? "font-bold text-primary" : ""}`}>
                                                {item === "ALL" ? "SAYA SIAP SEMUA TANGGAL" : item}
                                            </FormLabel>
                                        </FormItem>
                                    )} />
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <FormField control={form.control} name="attendBriefing" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bersedia ikut Briefing/TM (Mei)?</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="Ya">Ya, Saya Bersedia</SelectItem>
                                        <SelectItem value="Tidak">Tidak Bisa</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={form.control} name="shirtSize" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2"><Shirt className="w-4 h-4"/> Ukuran Baju (Jersey)</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Pilih Ukuran" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        {["S", "M", "L", "XL", "XXL", "3XL"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                </CardContent>
              </Card>

               {/* BAGIAN 5: STUDI KASUS */}
               <Card>
                <CardHeader className="bg-primary/5 border-b"><CardTitle className="flex items-center gap-2"><BrainCircuit className="w-5 h-5"/> 5. Studi Kasus (Tes Mental)</CardTitle></CardHeader>
                <CardContent className="p-6 space-y-6">
                    <FormField control={form.control} name="caseStudy1" render={({ field }) => (
                        <FormItem>
                            <FormLabel className="leading-relaxed">Jika Anda melihat teman sesama panitia duduk santai main HP padahal antrian peserta sedang panjang, apa yang akan Anda lakukan?</FormLabel>
                            <FormControl><Textarea {...field} placeholder="Jawaban Anda..." /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                     <FormField control={form.control} name="caseStudy2" render={({ field }) => (
                        <FormItem>
                            <FormLabel className="leading-relaxed">Jika ada peserta yang marah-marah karena tidak boleh masuk (belum install aplikasi), bagaimana cara Anda menolaknya dengan sopan?</FormLabel>
                            <FormControl><Textarea {...field} placeholder="Jawaban Anda..." /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </CardContent>
              </Card>

              {/* BAGIAN 6: PERNYATAAN */}
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6 space-y-4">
                    {[
                        { id: "agreeData", label: "Saya menyatakan data di atas benar." },
                        { id: "agreeRules", label: "Saya bersedia mematuhi aturan panitia dan bekerja dalam tim." },
                        { id: "agreeCompetitive", label: "Saya memahami bahwa seleksi ini bersifat kompetitif." }
                    ].map((item) => (
                        <FormField key={item.id} control={form.control} name={item.id as any} render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                <FormLabel className="font-normal cursor-pointer">{item.label}</FormLabel>
                            </FormItem>
                        )} />
                    ))}
                    {/* Global Error for Agreements */}
                    {Object.keys(form.formState.errors).some(k => k.startsWith('agree')) && (
                         <p className="text-destructive text-sm font-medium pt-2">Anda wajib menyetujui semua pernyataan.</p>
                    )}
                </CardContent>
              </Card>

              <Button type="submit" size="lg" className="w-full text-lg py-6" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin"/> Mengirim...</> : "KIRIM LAMARAN"}
              </Button>

            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
