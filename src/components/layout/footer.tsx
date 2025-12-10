import Link from 'next/link';
import { Instagram, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200 pt-20 pb-10 z-10 relative">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">
            <div className="max-w-md">
                 <h2 className="text-4xl font-black font-headline mb-6 tracking-tighter text-black">
                    ROAD TO<br/>BCC 2026.
                 </h2>
                 <p className="text-zinc-700 font-medium text-lg leading-relaxed mb-8">
                    Kompetisi badminton digital pertama dengan integrasi statistik profesional. Dari komunitas, untuk komunitas.
                 </p>
                 <div className="flex gap-4">
                    <Link href="https://instagram.com" className="w-12 h-12 rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors border border-zinc-200">
                        <Instagram className="w-5 h-5" />
                    </Link>
                    <Link href="https://wa.me/6285693738869" className="w-12 h-12 rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors border border-zinc-200">
                        <MessageCircle className="w-5 h-5" />
                    </Link>
                 </div>
            </div>

            <div className="grid grid-cols-2 gap-x-16 gap-y-4 text-right">
                <Link href="/about" className="font-bold text-lg text-zinc-800 hover:text-primary transition-colors">Tentang</Link>
                <Link href="/live-score" className="font-bold text-lg text-zinc-800 hover:text-primary transition-colors">Jadwal</Link>
                <Link href="/leveling-guide" className="font-bold text-lg text-zinc-800 hover:text-primary transition-colors">Panduan Level</Link>
                <Link href="/manager/login" className="font-bold text-lg text-zinc-800 hover:text-primary transition-colors">Daftar Tim</Link>
            </div>
        </div>

        <div className="border-t-2 border-zinc-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex flex-col md:flex-row items-center gap-2 text-zinc-500 text-sm font-bold">
                <span>© 2025 Road to BCC.</span>
                <span className="hidden md:inline text-zinc-300">•</span>
                <span>Supported by Dayminton Community</span>
             </div>
             
             {/* SPONSOR LOGO PLACEHOLDER */}
             <div className="opacity-40 hover:opacity-100 transition-opacity">
                 <span className="font-black font-headline text-2xl tracking-widest text-zinc-900">TIENTO</span>
             </div>
        </div>

      </div>
    </footer>
  );
}
