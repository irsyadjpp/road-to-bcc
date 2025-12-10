import Link from 'next/link';
import { Instagram, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-100 pt-20 pb-10">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">
            <div className="max-w-md">
                 <h2 className="text-3xl font-black font-headline mb-6 tracking-tighter">
                    ROAD TO<br/>BCC 2026.
                 </h2>
                 <p className="text-zinc-500 font-medium text-lg leading-relaxed mb-8">
                    Kompetisi badminton digital pertama dengan integrasi statistik profesional. Dari komunitas, untuk komunitas.
                 </p>
                 <div className="flex gap-4">
                    <Link href="https://instagram.com" className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                        <Instagram className="w-5 h-5" />
                    </Link>
                    <Link href="https://wa.me/6285693738869" className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors">
                        <MessageCircle className="w-5 h-5" />
                    </Link>
                 </div>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-right">
                <Link href="/about" className="font-bold text-lg hover:text-primary">Tentang</Link>
                <Link href="/live-score" className="font-bold text-lg hover:text-primary">Jadwal</Link>
                <Link href="/#levels" className="font-bold text-lg hover:text-primary">Panduan Level</Link>
                <Link href="/manager/login" className="font-bold text-lg hover:text-primary">Daftar</Link>
            </div>
        </div>

        <div className="border-t border-zinc-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex flex-col md:flex-row items-center gap-2 text-zinc-400 text-sm font-medium">
                <span>© 2025 Road to BCC.</span>
                <span className="hidden md:inline">•</span>
                <span>Supported by Dayminton Community</span>
             </div>
             
             {/* SPONSOR LOGO PLACEHOLDER - GRAYSCALE */}
             <div className="opacity-30 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                 <span className="font-black font-headline text-xl tracking-widest">TIENTO</span>
             </div>
        </div>

      </div>
    </footer>
  );
}