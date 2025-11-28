import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SponsorsSection } from '@/components/sections/sponsors';

export default function PartnersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center mb-16">
            <h1 className="text-5xl font-black font-headline text-foreground">Mitra & Sponsor</h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                Kesuksesan BCC 2026 adalah hasil kolaborasi dengan para mitra visioner yang memiliki semangat sama untuk memajukan komunitas.
            </p>
        </div>
        <SponsorsSection />
      </main>
      <Footer />
    </div>
  );
}
