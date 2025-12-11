
'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Clock, Users, ArrowDown, ShieldAlert, Target } from 'lucide-react';

export default function SchedulingPage() {

  const CaseExample = ({ title, desc, children }: { title: string, desc: string, children: React.ReactNode }) => (
    <div className="bg-background/50 p-6 rounded-2xl border">
      <h4 className="font-bold text-foreground mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground mb-4">{desc}</p>
      <div className="bg-secondary/30 p-4 rounded-xl">
        {children}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-24">
        
        <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 border-primary text-primary font-bold tracking-widest uppercase">
                Official Rulebook
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black font-headline uppercase tracking-tighter mb-6">
                Prinsip <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-500">Penjadwalan</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                Aturan main untuk memastikan semua peserta, terutama yang multi-kategori, mendapat waktu istirahat yang adil.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* KOLOM KIRI */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="bg-primary/10 text-primary p-3 rounded-xl"><ArrowDown className="w-5 h-5"/></div>
                    <span>Aturan Prioritas Utama: Level Terendah Main Duluan</span>
                </CardTitle>
                <CardDescription className="pt-2">
                    Jika seorang pemain atau pasangan bermain di lebih dari satu kategori, pertandingan di level yang lebih rendah akan selalu dijadwalkan terlebih dahulu untuk memberikan waktu istirahat yang cukup.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <CaseExample title="Kasus 1: Beginner + Intermediate" desc="Peserta A ikut kategori Beginner dan Intermediate.">
                      <p className="text-sm">Jadwal Pertandingan Peserta A:</p>
                      <ul className="list-decimal pl-5 text-muted-foreground text-sm space-y-1">
                          <li>Mainkan semua match <strong>Beginner</strong> hingga selesai.</li>
                          <li>Baru mainkan match <strong>Intermediate</strong> setelahnya.</li>
                      </ul>
                  </CaseExample>
                   <CaseExample title="Kasus 2: 3 Kategori Sekaligus" desc="Peserta B yang luar biasa ikut 3 kategori.">
                      <p className="font-bold text-sm text-foreground">Urutan Wajib:</p>
                      <p className="text-sm">1. Beginner ➡️ 2. Intermediate ➡️ 3. Advance</p>
                  </CaseExample>
              </CardContent>
            </Card>

             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="bg-primary/10 text-primary p-3 rounded-xl"><Clock className="w-5 h-5"/></div>
                    <span>Aturan Praktis & Jeda Pertandingan</span>
                </CardTitle>
                <CardDescription className="pt-2">
                    Untuk menghindari kelelahan dan menjaga kualitas permainan.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                   <CaseExample title="Saat Babak Grup (Group Stage)" desc="Jadwal antar pertandingan dibuat lebih renggang.">
                      <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-2">
                          <li><strong>Minimal jeda 1 match</strong> jika kategori berbeda dimainkan di lapangan yang berbeda.</li>
                          <li><strong>Minimal jeda 2 match</strong> jika semua kategori dimainkan di lapangan yang sama.</li>
                      </ul>
                  </CaseExample>
                  <CaseExample title="Saat Babak Gugur (Knockout)" desc="Jeda menjadi lebih krusial karena intensitas meningkat.">
                      <p className="text-sm text-muted-foreground">Jika Peserta A lolos ke 16 Besar Beginner dan 8 Besar Intermediate di hari yang sama:</p>
                      <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-1 mt-2">
                          <li>Pertandingan 16 Besar Beginner <strong>wajib</strong> dimainkan lebih dulu.</li>
                          <li>Pertandingan 8 Besar Intermediate baru boleh dimainkan minimal setelah ada jeda <strong>2 slot pertandingan</strong>.</li>
                      </ul>
                  </CaseExample>
              </CardContent>
            </Card>
          </div>

          {/* KOLOM KANAN */}
          <div className="space-y-8">
             <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-blue-700 dark:text-blue-300">
                    <Target className="w-5 h-5"/> Target & Tujuan Aturan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-blue-800 dark:text-blue-200">
                  <ul className="list-disc pl-5 text-sm space-y-2 opacity-90">
                      <li>Memberikan waktu recovery fisik yang cukup bagi pemain multi-kategori.</li>
                      <li>Mencegah jadwal bentrok (clash) di lapangan.</li>
                      <li>Menjaga kualitas dan intensitas pertandingan di level yang lebih tinggi.</li>
                      <li>Memastikan fairness bagi semua peserta.</li>
                  </ul>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
