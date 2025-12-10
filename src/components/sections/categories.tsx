
"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Users, AlertTriangle, Info } from "lucide-react";
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
             <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-6 py-4 rounded-3xl font-bold text-sm max-w-md flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>Standard Turnamen: Ganda Putra Umum (Wanita boleh join dengan penyesuaian kemampuan).</span>
            </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* LEFT COLUMN: MATRIX LIST */}
            <div className="space-y-3">
                <h3 className="text-xl font-bold font-headline mb-6 uppercase tracking-wider text-muted-foreground">Matriks Pasangan</h3>
                {matrix.map((item, idx) => (
                    <div key={idx} className={cn(
                        "flex items-center justify-between p-4 rounded-2xl border-2 transition-all hover:scale-[1.02]",
                        item.status === 'banned' ? "border-red-100 bg-red-50/50 dark:bg-red-900/10 dark:border-red-900" : "bg-card border-transparent shadow-sm hover:border-primary/20"
                    )}>
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Badge variant="outline" className="h-8 px-2 sm:px-3 rounded-lg text-xs sm:text-sm bg-background truncate">{item.p1}</Badge>
                            <span className="text-muted-foreground font-black text-xs">+</span>
                            <Badge variant="outline" className="h-8 px-2 sm:px-3 rounded-lg text-xs sm:text-sm bg-background truncate">{item.p2}</Badge>
                        </div>
                        
                        <div className="flex items-center gap-3">
                             <div className="h-px w-4 sm:w-8 bg-border hidden sm:block" />
                             {item.status === 'allowed' ? (
                                <Badge className={cn("h-8 px-3 sm:px-4 rounded-lg text-white border-none text-xs sm:text-sm", item.color)}>
                                    Kategori {item.res}
                                </Badge>
                             ) : (
                                <Badge variant="destructive" className="h-8 px-3 sm:px-4 rounded-lg text-xs sm:text-sm">
                                    <X className="w-3 h-3 mr-1" /> DILARANG
                                </Badge>
                             )}
                        </div>
                    </div>
                ))}

                {/* SARAN WD */}
                <div className="mt-8 bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-6 rounded-r-2xl">
                    <div className="flex items-start gap-4">
                        <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Saran Untuk Peserta Ganda Putri (WD)</h4>
                            <p className="text-sm text-blue-700 dark:text-blue-200/80 leading-relaxed">
                                Sangat disarankan bagi Ganda Putri (WD) untuk tidak mendaftar di kategori open gender, kecuali mereka sangat percaya diri dan biasa bermain melawan pria.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: SIMULATION CARDS */}
            <div className="bg-secondary/50 rounded-[2.5rem] p-6 sm:p-8">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="bg-primary text-white p-3 rounded-xl shadow-lg shadow-primary/20">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black font-headline uppercase">Simulasi Pertandingan</h3>
                        <p className="text-sm text-muted-foreground font-medium">Gambaran peta kekuatan di lapangan</p>
                    </div>
                 </div>
                 
                 <div className="space-y-6">
                    {/* KASUS A */}
                    <div className="bg-background p-6 rounded-3xl shadow-sm border border-transparent hover:border-primary/10 transition-colors">
                        <div className="mb-4 pb-4 border-b border-dashed">
                            <h4 className="font-black text-lg text-primary uppercase tracking-tight">Kasus A: XD vs MD (Intermediate)</h4>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Ganda Campuran vs Ganda Putra</p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
                            <div>
                                <p className="font-bold text-sm mb-1">Tim 1</p>
                                <p className="text-sm text-muted-foreground">Cowok (Int) + Cewek (Int)</p>
                                <p className="text-xs text-orange-500 mt-1 font-medium italic">"Cewek Int berani diadu drive/smash."</p>
                            </div>
                            <div>
                                <p className="font-bold text-sm mb-1">Tim 2</p>
                                <p className="text-sm text-muted-foreground">Cowok (Int) + Cowok (Beg)</p>
                            </div>
                        </div>

                        <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl">
                           <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Analisa:</p>
                           <p className="text-sm font-medium leading-relaxed">
                             Pertandingan imbang. Cewek (Int) memiliki penempatan bola lebih baik daripada Cowok (Beg).
                           </p>
                        </div>
                    </div>

                    {/* KASUS B */}
                    <div className="bg-background p-6 rounded-3xl shadow-sm border border-transparent hover:border-blue-500/10 transition-colors">
                        <div className="mb-4 pb-4 border-b border-dashed">
                            <h4 className="font-black text-lg text-blue-600 uppercase tracking-tight">Kasus B: WD vs XD (Beginner)</h4>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Ganda Putri vs Ganda Campuran</p>
                        </div>

                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
                            <div>
                                <p className="font-bold text-sm mb-1">Tim 1</p>
                                <p className="text-sm text-muted-foreground">Cewek (Beg) + Cewek (Beg)</p>
                                <p className="text-xs text-red-500 mt-1 font-medium italic">"Beresiko jadi bulan-bulanan jika Beginner murni."</p>
                            </div>
                            <div>
                                <p className="font-bold text-sm mb-1">Tim 2</p>
                                <p className="text-sm text-muted-foreground">Cowok (Beg) + Cewek (Beg)</p>
                            </div>
                        </div>

                         <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl">
                           <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Analisa:</p>
                           <p className="text-sm font-medium leading-relaxed">
                             Tim 2 kemungkinan besar menang karena faktor tenaga pria (power).
                           </p>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </section>
  );
}
