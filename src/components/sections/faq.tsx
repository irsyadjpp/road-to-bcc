"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
    const items = [
        {
            q: "Bolehkah ganti pasangan setelah daftar?",
            a: "Boleh! Maksimal H-7 sebelum hari H. Syaratnya level pengganti tidak mengubah kategori awal (misal: Beginner tidak boleh diganti Advance)."
        },
        {
            q: "Pembayaran per tim atau per orang?",
            a: "Pembayaran dilakukan per orang melalui akun masing-masing (split bill). Namun, manajer tim juga bisa membayarkan sekaligus untuk anggotanya."
        },
        {
            q: "Apakah wanita boleh ikut?",
            a: "Tentu! Kami menggunakan standar Ganda Putra Umum. Wanita diperbolehkan join (bisa main di GD/XD) asalkan siap bersaing dengan standar tenaga pria di level yang dipilih."
        },
    ]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-black font-headline text-center mb-12 uppercase">
            FAQ
        </h2>
        
        <Accordion type="single" collapsible className="space-y-4">
            {items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-secondary rounded-3xl border-none px-6">
                    <AccordionTrigger className="text-lg font-bold py-6 hover:no-underline hover:text-primary text-left">
                        {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-lg pb-6 leading-relaxed">
                        {item.a}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </div>
    </section>
  );
}