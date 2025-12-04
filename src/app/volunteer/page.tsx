"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { volunteerSchema, type VolunteerFormValues, VOLUNTEER_DIVISIONS } from "@/lib/schemas/volunteer";
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
import { Loader2, User, GraduationCap, Briefcase, Wrench, CalendarCheck, FileSignature, HeartHandshake, Megaphone } from "lucide-react";
import { useState, useEffect } from "react";
import confetti from 'canvas-confetti';
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function VolunteerPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      skills: [],
      availability: [],
    },
  });

  // Logic Khusus: "SAYA SIAP SEMUA TANGGAL"
  const handleAvailabilityChange = (checked: boolean, value: string, field: any) => {
    const allDates = ["Week 1 (13-14 Juni)", "Week 2 (20-21 Juni)", "Week 3 (27-28 Juni)", "Grand Final (5 Juli) - WAJIB"];
    let current = field.value || [];

    if (value === "ALL") {
      if (checked) {
        field.onChange([...allDates, "ALL"]);
      } else {
        field.onChange([]);
      }
    } else {
      if (checked) {
        current = [...current, value];
      } else {
        // Jika uncheck satu tanggal, uncheck juga "ALL"
        current = current.filter((v: string) => v !== value && v !== "ALL");
      }
      
      const allOtherDatesSelected = allDates.every(date => current.includes(date));
      if (allOtherDatesSelected && !current.includes("ALL")) {
          current.push("ALL");
      }
      
      field.onChange(current);
    }
  };


  async function onSubmit(data: VolunteerFormValues) {
    setIsSubmitting(true);
    // Simulasi API Call
    console.log("Volunteer Data:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
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
            <HeartHandshake className="w-20 h-20 text-primary mx-auto mb-6" />
            <h1 className="text-3xl font-black font-headline text-primary mb-4">Terima Kasih, Calon Relawan!</h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Formulir pendaftaran Anda telah kami terima. Semangat dan dedikasi Anda adalah energi bagi kami.<br/><br/>
              Panitia seleksi akan menghubungi kandidat terpilih melalui <strong>WhatsApp</strong> untuk tahap wawancara dalam waktu 7-14 hari kerja.
            </p>
            <Button asChild variant="default" size="lg">
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
            <Badge className="bg-primary text-white px-4 py-1 text-sm mb-2">OPEN RECRUITMENT</Badge>
            <h1 className="text-3xl md:text-5xl font-black font-headline text-primary">VOLUNTEER BCC 2026</h1>
            <p className="text-xl font-bold text-foreground">Jadilah Bagian dari Sejarah Baru Badminton Bandung!</p>
            
            <Card className="bg-white border-primary/20 text-left shadow-sm mt-6">
              <CardContent className="p-6 space-y-4 text-sm md:text-base">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <h4 className="font-bold flex items-center gap-2"><Megaphone className="w-4 h-4 text-primary"/> Tema Event</h4>
                        <p className="text-muted-foreground">"Integritas, Solidaritas, & Sportivitas"</p>
                    </div>
                    <div className="space-y-2">
                         <h4 className="font-bold flex items-center gap-2"><CalendarCheck className="w-4 h-4 text-primary"/> Periode</h4>
                         <p className="text-muted-foreground">Setiap Sabtu & Minggu (Juni - Juli 2026)</p>
                    </div>
                </div>
                <div className="bg-secondary/20 p-4 rounded-lg border border-secondary">
                    <span className="font-bold text-primary">Benefit:</span> Honorarium Harian, Uang Makan, Sertifikat Resmi, Jersey Eksklusif, & Pengalaman Manajemen Event.
                </div>
              </CardContent>
            </Card>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* BAGIAN 1: DATA PRIBADI */}
              <Card>
                <CardHeader className="bg-primary/5 border-b"><CardTitle className="flex items-center gap-2"><User className="w-5 h-5"/> 1. Data Pribadi</CardTitle></CardHeader>
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
                        <FormField control={form.control} name="dob" render={({ field }) => (
                            <FormItem><FormLabel>Tanggal Lahir</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="gender" render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Jenis Kelamin</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-row gap-4">
                                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Laki-laki" /></FormControl><FormLabel className="font-normal">Laki-laki</FormLabel></FormItem>
                                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Perempuan" /></FormControl><FormLabel className="font-normal">Perempuan</FormLabel></FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="whatsapp" render={({ field }) => (
                            <FormItem><FormLabel>No. WhatsApp Aktif</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                    <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem><FormLabel>Alamat Domisili di Bandung</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="instagram" render={({ field }) => (
                        <FormItem><FormLabel>Akun Instagram (Jangan Private)</FormLabel><FormControl><Input placeholder="@username" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </CardContent>
              </Card>

              {/* BAGIAN 2: LATAR BELAKANG */}
              <Card>
                <CardHeader className="bg-primary/5 border-b"><CardTitle className="flex items-center gap-2"><GraduationCap className="w-5 h-5"/> 2. Latar Belakang</CardTitle></CardHeader>
                <CardContent className="p-6 space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="education" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pendidikan Terakhir</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Pilih Jenjang" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="SMA/SMK">SMA / SMK / Sederajat</SelectItem>
                                        <SelectItem value="Diploma">Diploma (D3 / D4)</SelectItem>
                                        <SelectItem value="S1">Sarjana (S1)</SelectItem>
                                        <SelectItem value="Pascasarjana">Pascasarjana</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={form.control} name="institution" render={({ field }) => (
                            <FormItem><FormLabel>Nama Institusi / Kampus</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                     </div>
                     <FormField control={form.control} name="major" render={({ field }) => (
                        <FormItem><FormLabel>Jurusan / Program Studi</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    
                    <FormField control={form.control} name="status" render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Status Saat Ini</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {["Mahasiswa Aktif", "Fresh Graduate (Belum Bekerja)", "Karyawan / Profesional", "Freelancer / Wirausaha"].map((item) => (
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
                     <FormField control={form.control} name="expertise" render={({ field }) => (
                        <FormItem><FormLabel>Bidang Keahlian / Pekerjaan</FormLabel><FormControl><Input placeholder="Contoh: Desain Grafis, Medis, IT Support..." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </CardContent>
              </Card>

              {/* BAGIAN 3: DIVISI */}
              <Card>
                <CardHeader className="bg-primary/5 border-b"><CardTitle className="flex items-center gap-2"><Briefcase className="w-5 h-5"/> 3. Pilihan Divisi</CardTitle></CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <FormField control={form.control} name="division1" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pilihan 1 (Prioritas Utama)</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Pilih Divisi Utama" /></SelectTrigger></FormControl>
                                    <SelectContent>{VOLUNTEER_DIVISIONS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="division2" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pilihan 2 (Cadangan)</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Pilih Divisi Cadangan" /></SelectTrigger></FormControl>
                                    <SelectContent>{VOLUNTEER_DIVISIONS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                </CardContent>
              </Card>

              {/* BAGIAN 4: KEAHLIAN & PENGALAMAN */}
              <Card>
                <CardHeader className="bg-primary/5 border-b"><CardTitle className="flex items-center gap-2"><Wrench className="w-5 h-5"/> 4. Keahlian & Pengalaman</CardTitle></CardHeader>
                <CardContent className="p-6 space-y-6">
                    <FormField control={form.control} name="experience" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ceritakan pengalaman organisasi/kepanitiaan (khususnya olahraga)</FormLabel>
                            <FormControl><Textarea {...field} rows={4} placeholder="Sebutkan nama event, tahun, dan posisi Anda..." /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    
                    <FormField control={form.control} name="skills" render={() => (
                        <FormItem>
                            <div className="mb-4"><FormLabel>Keahlian Khusus (Centang yang dikuasai)</FormLabel></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {["Fotografi/Videografi (Punya Kamera)", "Desain Grafis (Canva/Adobe)", "Microsoft Office/Google Sheets", "Public Speaking/MC", "P3K/Fisioterapi Dasar", "Instalasi Jaringan/IT", "Setir Mobil (SIM A)"].map((item) => (
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="hasVehicle" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Punya Kendaraan Pribadi (Motor)?</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger></FormControl>
                                    <SelectContent><SelectItem value="Ya">Ya</SelectItem><SelectItem value="Tidak">Tidak</SelectItem></SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="hasLaptop" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Punya Laptop (Bisa dibawa)?</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger></FormControl>
                                    <SelectContent><SelectItem value="Ya">Ya</SelectItem><SelectItem value="Tidak">Tidak</SelectItem></SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                </CardContent>
              </Card>

               {/* BAGIAN 5: KOMITMEN & STUDI KASUS */}
               <Card>
                <CardHeader className="bg-primary/5 border-b"><CardTitle className="flex items-center gap-2"><CalendarCheck className="w-5 h-5"/> 5. Komitmen & Studi Kasus</CardTitle></CardHeader>
                <CardContent className="p-6 space-y-6">
                     <FormField control={form.control} name="availability" render={({ field }) => (
                        <FormItem>
                            <div className="mb-4"><FormLabel>Ketersediaan Waktu (Wajib Komitmen)</FormLabel></div>
                            <div className="space-y-2 border p-4 rounded bg-secondary/10">
                                {["Week 1 (13-14 Juni)", "Week 2 (20-21 Juni)", "Week 3 (27-28 Juni)", "Grand Final (5 Juli) - WAJIB", "ALL"].map((item) => (
                                    <FormField key={item} control={form.control} name="availability" render={({ field: formField }) => (
                                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox 
                                                    checked={formField.value?.includes(item)} 
                                                    onCheckedChange={(checked) => handleAvailabilityChange(!!checked, item, formField)} 
                                                />
                                            </FormControl>
                                            <FormLabel className={`font-normal cursor-pointer ${item === "ALL" ? "font-bold text-primary" : ""}`}>
                                                {item === "ALL" ? "SAYA SIAP SEMUA TANGGAL (Prioritas)" : item}
                                            </FormLabel>
                                        </FormItem>
                                    )} />
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <div className="space-y-4 pt-4 border-t">
                        <FormField control={form.control} name="caseStudy1" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="leading-relaxed font-bold">Studi Kasus 1: Jika Anda melihat teman sesama panitia duduk santai main HP padahal antrian peserta sedang panjang, apa yang akan Anda lakukan?</FormLabel>
                                <FormControl><Textarea {...field} placeholder="Jawaban Anda..." /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="caseStudy2" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="leading-relaxed font-bold">Studi Kasus 2: Ada peserta yang marah-marah karena dilarang masuk akibat belum install aplikasi wajib. Bagaimana cara Anda menanganinya?</FormLabel>
                                <FormControl><Textarea {...field} placeholder="Jawaban Anda..." /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                </CardContent>
              </Card>

              {/* BAGIAN 6: PERNYATAAN */}
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6 space-y-4">
                     <div className="flex items-center gap-2 text-primary font-bold mb-2">
                        <FileSignature className="w-5 h-5" /> PERNYATAAN RELAWAN
                     </div>
                    {[
                        { id: "agreeData", label: "Saya menyatakan bahwa data yang diisi adalah benar dan dapat dipertanggungjawabkan." },
                        { id: "agreeRules", label: "Saya bersedia mematuhi segala peraturan panitia dan menjaga nama baik BCC 2026." },
                        { id: "agreeCompetitive", label: "Saya memahami bahwa seleksi ini bersifat kompetitif dan keputusan panitia tidak dapat diganggu gugat." }
                    ].map((item) => (
                        <FormField key={item.id} control={form.control} name={item.id as any} render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                <FormLabel className="font-normal cursor-pointer">{item.label}</FormLabel>
                            </FormItem>
                        )} />
                    ))}
                    {/* Global Error */}
                    {Object.keys(form.formState.errors).some(k => k.startsWith('agree')) && (
                         <p className="text-destructive text-sm font-medium pt-2">Anda wajib menyetujui semua pernyataan di atas.</p>
                    )}
                </CardContent>
              </Card>

              <Button type="submit" size="lg" className="w-full text-lg py-6 font-bold shadow-lg" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin"/> Memproses...</> : "KIRIM LAMARAN SAYA"}
              </Button>

            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
