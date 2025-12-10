"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const matrix = [
  { p1: "Beginner", p2: "Beginner", res: "Beginner", status: "allowed", color: "bg-green-500" },
  { p1: "Beginner", p2: "Intermediate", res: "Intermediate", status: "allowed", color: "bg-blue-500" },
  { p1: "Intermediate", p2: "Intermediate", res: "Intermediate", status: "allowed", color: "bg-blue-500" },
  { p1: "Intermediate", p2: "Advance", res: "Advance", status: "allowed", color: "bg-purple-500" },
  { p1: "Advance", p2: "Advance", res: "Advance", status: "allowed", color: "bg-purple-500" },
  { p1: "Beginner", p2: "Advance", res: "Banned", status: "banned", color: "bg-red-500" },
];

export function CategoriesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
                <h2 className="text-4xl md:text-5xl font-black font-headline uppercase mb-4">
                    Aturan <span className="text-primary">Kategori</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                    Sistem "Highest Rank" berlaku. Level tertinggi dalam pasangan menentukan kategori akhir tim.
                </p>
            </div>
             <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-6 py-4 rounded-3xl font-bold text-sm max-w-md">
                ⚠️ Standard: Ganda Putra Umum (Wanita boleh join dengan penyesuaian).
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* MATRIX LIST */}
            <div className="space-y-3">
                {matrix.map((item, idx) => (
                    <div key={idx} className={cn(
                        "flex items-center justify-between p-4 rounded-2xl border-2 transition-all hover:scale-[1.02]",
                        item.status === 'banned' ? "border-red-100 bg-red-50/50 dark:bg-red-900/10 dark:border-red-900" : "bg-card border-transparent shadow-sm hover:border-primary/20"
                    )}>
                        <div className="flex items-center gap-3">
                            <Badge variant="outline" className="h-8 px-3 rounded-lg text-sm bg-background">{item.p1}</Badge>
                            <span className="text-muted-foreground font-black">+</span>
                            <Badge variant="outline" className="h-8 px-3 rounded-lg text-sm bg-background">{item.p2}</Badge>
                        </div>
                        
                        <div className="flex items-center gap-3">
                             <div className="h-px w-8 bg-border hidden sm:block" />
                             {item.status === 'allowed' ? (
                                <Badge className={cn("h-8 px-4 rounded-lg text-white border-none", item.color)}>
                                    Kategori {item.res}
                                </Badge>
                             ) : (
                                <Badge variant="destructive" className="h-8 px-4 rounded-lg">
                                    <X className="w-3 h-3 mr-1" /> DILARANG
                                </Badge>
                             )}
                        </div>
                    </div>
                ))}
            </div>

            {/* SIMULATION CARD */}
            <Card className="bg-secondary rounded-[2.5rem] p-8 border-none flex flex-col justify-center">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="bg-primary text-white p-3 rounded-xl">
                        <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold font-headline">Simulasi Kasus</h3>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="bg-background p-6 rounded-3xl shadow-sm">
                        <h4 className="font-bold text-lg mb-2 text-primary">Case A: XD (Int) vs MD (Int+Beg)</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                           "Cewek Intermediate yang biasa main drive cepat & defense kuat akan mengimbangi Cowok Beginner. Pertandingan diprediksi seru & imbang."
                        </p>
                    </div>
                     <div className="bg-background p-6 rounded-3xl shadow-sm">
                        <h4 className="font-bold text-lg mb-2 text-blue-600">Case B: WD (Beg) vs XD (Beg)</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                           "Pasangan WD Beginner murni (jarang main vs cowok) akan kesulitan melawan tenaga (power) cowok beginner. <span className="font-bold text-foreground">Sangat tidak disarankan</span> kecuali WD sudah biasa sparing vs cowok."
                        </p>
                    </div>
                 </div>
            </Card>
        </div>
      </div>
    </section>
  );
}