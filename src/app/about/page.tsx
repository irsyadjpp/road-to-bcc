
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, XCircle, Smartphone, Trophy, Database } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero About */}
        <section className="py-20 bg-primary text-primary-foreground text-center px-4">
            <h1 className="text-4xl md:text-5xl font-black font-headline mb-4">The Digital Prologue: Revolusi Turnamen Komunitas.</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
                Bukan sekadar ajang mabar, ini adalah pionir kompetisi bulutangkis di Bandung yang terintegrasi penuh dengan Sistem Digital. Dari pendaftaran via Join Code, Live Score real-time, hingga statistik pertandingan, kami menghadirkan standar profesional ke level komunitas.
            </p>
        </section>

        {/* 3 Pillars */}
        <section className="py-16 container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-headline text-foreground">3 Pilar Utama</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Digital Integrity", icon: Database, desc: "Kami menolak subjektivitas. Verifikasi level dilakukan secara ketat menggunakan matriks data dan rekam jejak. Kejujuran adalah mata uang utama di sini." },
                    { title: "Zero Tolerance Sandbagging", icon: XCircle, desc: "Sistem kami dirancang untuk mendeteksi ketimpangan. Dengan aturan \"Highest Rank Determines Category\" dan validasi sistem, tidak ada celah bagi pemain Advance untuk turun ke level pemula." },
                    { title: "Modern Community Experience", icon: Smartphone, desc: "Pantau jadwal, hasil, dan bagan pertandingan langsung dari genggaman tangan Anda, tanpa perlu berkerumun di meja panitia." }
                ].map((item, i) => (
                    <Card key={i} className="shadow-lg border-t-4 border-t-primary">
                        <CardContent className="pt-8 text-center">
                            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-muted-foreground">{item.desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold font-headline mb-6 text-primary">Visi Kami</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                        <strong>Road to BCC 2026</strong> hadir untuk menetapkan standar baru: Turnamen yang <strong>Adil Berbasis Data</strong>. Kami menjawab keresahan komunitas akan maraknya praktik "Sandbagging" yang mencederai sportivitas.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <Trophy className="w-6 h-6 text-primary shrink-0 mt-1" />
                            <span>Menciptakan iklim kompetisi yang <strong>objektif dan terukur</strong>.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Trophy className="w-6 h-6 text-primary shrink-0 mt-1" />
                            <span>Menjadi <strong>barometer</strong> penyelenggaraan turnamen modern di Jawa Barat.</span>
                        </li>
                         <li className="flex items-start gap-3">
                            <Trophy className="w-6 h-6 text-primary shrink-0 mt-1" />
                            <span>Memberikan panggung yang layak bagi <strong>juara sejati</strong>, bukan juara karena "salah kamar".</span>
                        </li>
                    </ul>
                </div>
                <div className="relative h-[400px] rounded-2xl overflow-hidden bg-secondary flex items-center justify-center">
                   <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent"></div>
                   <div className="text-center p-8">
                     <div className="mx-auto bg-card p-4 rounded-full w-fit mb-4 border shadow-inner">
                        <Database className="w-12 h-12 text-primary" />
                     </div>
                     <p className="font-bold text-foreground">Fair Play Powered by Data</p>
                     <p className="text-sm text-muted-foreground">Integritas adalah inti dari kompetisi sejati.</p>
                   </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
