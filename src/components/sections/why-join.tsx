
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Trophy, ShieldCheck } from "lucide-react";

const sellingPoints = [
  {
    icon: TrendingUp,
    title: "Experience The Future",
    description: "Jadilah yang pertama mencoba sistem Live Score & Player Statistik berbasis Web App. Hasil pertandinganmu tercatat selamanya.",
    color: "text-blue-500",
  },
  {
    icon: Trophy,
    title: "The Golden Ticket",
    description: "Juara mendapatkan Slot Prioritas & Diskon Khusus untuk Turnamen Utama BCC 2026 (Beregu).",
    color: "text-yellow-500",
  },
  {
    icon: ShieldCheck,
    title: "Fair Play System",
    description: "Aturan Anti-Sandbagging dengan validasi level & matriks pasangan. Kompetitif & Seru.",
    color: "text-green-500",
  },
];

export function WhyJoinSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
            Why Join The Prologue?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Lebih dari sekadar mabar. Ini adalah pemanasan strategis Anda sebelum pertempuran utama.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {sellingPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <Card key={index} className="text-center border-l-4 border-l-primary/50 bg-card">
                <CardContent className="pt-8">
                  <div className={`mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold font-headline mb-3">{point.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
