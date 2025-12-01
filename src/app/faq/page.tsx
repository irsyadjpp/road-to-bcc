import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Sparkles } from "lucide-react";
import { CourtLines } from '@/components/ui/court-lines';

export default function FAQPage() {
  const faqs = [
    {
      category: "Pendaftaran & Verifikasi",
      items: [
        {
          q: "Apa syarat utama pendaftaran tim?",
          a: "Setiap tim wajib mendaftarkan pemain sesuai slot kategori. Seluruh pemain WAJIB memiliki akun Ayo Indonesia dan melampirkan link video pertandingan (YouTube) untuk verifikasi level."
        },
        {
          q: "Bagaimana kriteria video verifikasi yang benar?",
          a: "Video harus menampilkan 1 game penuh (skor 30 atau 21), tanpa potongan (uncut), dan diambil dari sudut pandang belakang lapangan (wide) agar terlihat jelas rotasi dan teknik pemain."
        },
        {
          q: "Apa itu kebijakan Anti-Sandbagging?",
          a: "Ini adalah aturan tegas BCC 2026. Jika saat bertanding ditemukan pemain yang level aslinya jauh diatas level yang didaftarkan (manipulasi), wasit berhak mendiskualifikasi tim tersebut tanpa pengembalian uang."
        }
      ]
    },
    {
      category: "Sistem Pertandingan",
      items: [
        {
          q: "Bagaimana format skor yang digunakan?",
          a: "Fase Grup menggunakan sistem 'One Game Final' 1x30 poin (pindah tempat di 15). Fase Gugur menggunakan sistem 'Best of Three' 3x15 poin."
        },
        {
          q: "Apakah pemain boleh bermain rangkap?",
          a: "Secara umum TIDAK BOLEH. Setiap pemain hanya boleh bermain 1x dalam satu pertemuan antar tim (Tie). Pengecualian KHUSUS Beregu Putri, diperbolehkan 1 pemain merangkap di partai ke-5 (3-on-3)."
        },
        {
          q: "Apa aturan khusus untuk kategori Beginner?",
          a: "Pemain Beginner dilarang keras melakukan teknik Backhand Overhead Clear (pukulan lambung jauh dari posisi backhand). Jika bisa melakukan ini, otomatis dianggap level Intermediate/Advance."
        }
      ]
    },
    {
      category: "Lain-lain",
      items: [
        {
          q: "Kapan hadiah uang tunai diberikan?",
          a: "Hadiah akan ditransfer melalui rekening Bank BJB. Pemenang diharapkan menyiapkan rekening Bank BJB (bisa buka rekening di lokasi saat event)."
        },
        {
          q: "Bagaimana jika ingin mengajukan protes?",
          a: "Protes hanya boleh diajukan oleh Manajer Tim dengan menyertakan uang jaminan Rp 500.000 (Tunai). Jika protes diterima, uang kembali. Jika ditolak, uang hangus."
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="flex-grow py-16 md:py-24 relative">
        <CourtLines />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4 ring-4 ring-primary/5">
                <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-headline text-foreground mb-4">
              KEPOIN BCC 2026
            </h1>
            <p className="text-lg text-muted-foreground">
              Semua yang perlu kamu tahu biar gak salah langkah. Baca baik-baik ya!
            </p>
          </div>

          <div className="space-y-12">
            {faqs.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-2xl font-bold font-headline mb-6 text-primary border-l-4 border-primary pl-4">
                  {section.category}
                </h3>
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {section.items.map((item, itemIdx) => (
                    <AccordionItem 
                      key={itemIdx} 
                      value={`item-${idx}-${itemIdx}`}
                      className="bg-card border-l-4 border-transparent rounded-lg shadow-sm hover:border-primary/50 transition-colors duration-300 data-[state=open]:border-primary/80 data-[state=open]:shadow-md"
                    >
                      <AccordionTrigger className="text-left font-bold text-lg text-foreground p-6 hover:no-underline data-[state=open]:text-primary">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
