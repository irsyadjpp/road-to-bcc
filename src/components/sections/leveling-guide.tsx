
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, Gauge, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

export function LevelingGuideSection() {
  const levels = [
    {
      title: "Beginner",
      subtitle: "Pemula",
      price: "Rp 100.000",
      skills: ["Grip 'Panci' (Panhandle)", "Ayunan lengan besar (bahu)"],
      bans: ["DILARANG bisa Backhand Overhead Clear", "Tidak ada rotasi lengan bawah"],
      color: "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400",
      borderColor: "border-green-500",
      priceColor: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
    },
    {
      title: "Intermediate",
      subtitle: "Menengah",
      price: "Rp 150.000",
      skills: ["Power Smash baik", "Langkah Chassé & Lob baseline-to-baseline"],
      bans: ["Backhand Overhead masih tanggung/datar", "Transisi menyerang ke bertahan lambat"],
      color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400",
      borderColor: "border-blue-500",
      priceColor: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
    },
    {
      title: "Advance",
      subtitle: "Mahir",
      price: "Rp 150.000",
      skills: ["Finger Power & Wrist Snap (Bunyi Nyaring)", "Split Step konsisten", "Backhand Clear silang/lurus"],
      bans: ["Hanya untuk pemain non-profesional (Komunitas)"],
      color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400",
      borderColor: "border-purple-500",
      priceColor: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
    }
  ];

  return (
    <section id="levels" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black font-headline text-foreground mb-6">
            Klasifikasi Level & Biaya
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            BCC 2026 menggunakan parameter Biomekanik untuk memastikan kompetisi yang adil.
            <span className="block mt-2 font-bold text-destructive">Salah kategori = Diskualifikasi tanpa refund.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {levels.map((level, idx) => (
            <Card key={idx} className={cn("border-t-8 shadow-xl hover:-translate-y-2 transition-transform duration-300 rounded-[2rem] overflow-hidden", level.borderColor)}>
              <CardHeader className={cn("text-center pb-8 pt-8", level.color)}>
                <CardTitle className="flex flex-col gap-1">
                    <span className="text-3xl font-black font-headline uppercase tracking-tight">{level.title}</span>
                    <span className="text-sm font-bold opacity-70 uppercase tracking-widest">{level.subtitle}</span>
                </CardTitle>
                
                <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full font-black text-lg mt-4 shadow-sm", level.priceColor)}>
                    <Tag className="w-4 h-4" />
                    {level.price}
                    <span className="text-xs font-medium opacity-70">/org</span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-8 px-6 pb-8 bg-card">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold mb-3 flex items-center gap-2 text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-green-500" /> Ciri Khas:
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-3 pl-2">
                      {level.skills.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                            {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="h-px bg-border/50" />
                  
                  <div>
                    <h4 className="font-bold mb-3 flex items-center gap-2 text-destructive">
                      <XCircle className="w-5 h-5" /> Pantangan:
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-3 pl-2">
                      {level.bans.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                            {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
