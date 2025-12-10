"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Swords, UserPlus, Trophy, Plus, ArrowRight } from "lucide-react";

const pairings = [
  { level1: "Beginner", level2: "Beginner", result: "Beginner", color: "text-green-500" },
  { level1: "Beginner", level2: "Intermediate", result: "Intermediate", color: "text-blue-500" },
  { level1: "Intermediate", level2: "Intermediate", result: "Intermediate", color: "text-blue-500" },
  { level1: "Intermediate", level2: "Advance", result: "Advance", color: "text-purple-500" },
  { level1: "Advance", level2: "Advance", result: "Advance", color: "text-purple-500" },
];

export function CategoriesSection() {
  return (
    <section className="bg-secondary py-16 md:py-24 relative overflow-hidden">
       {/* Elemen Dekoratif Background */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
       </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground mb-4">
            Kategori Pertandingan Ganda
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Level pasangan ditentukan dari kombinasi level individu untuk memastikan pertandingan yang seimbang.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pairings.map((pair, index) => (
            <Card key={index} className="bg-card border shadow-sm hover:shadow-lg transition-shadow hover:-translate-y-1">
              <CardContent className="pt-6 flex items-center justify-around text-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="px-3 py-1 bg-secondary rounded-full text-sm font-semibold">{pair.level1}</div>
                </div>
                <Plus className="w-5 h-5 text-muted-foreground mx-2"/>
                <div className="flex flex-col items-center gap-1">
                   <div className="px-3 py-1 bg-secondary rounded-full text-sm font-semibold">{pair.level2}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground mx-2"/>
                 <div className="flex flex-col items-center gap-1">
                   <div className={`px-4 py-2 rounded-full text-base font-bold border-2 ${pair.color.replace('text-', 'border-')} ${pair.color.replace('text-', 'bg-')}/10`}>{pair.result}</div>
                </div>
              </CardContent>
            </Card>
          ))}
           <Card className="md:col-span-2 lg:col-span-1 bg-primary/10 border-primary/20 flex flex-col items-center justify-center text-center p-6">
                <h3 className="font-bold text-lg mb-2">Beregu & 3-on-3</h3>
                <p className="text-sm text-muted-foreground">
                    Format tim beregu (putra, putri, campuran) dan partai unik 3-on-3 juga akan dipertandingkan. Informasi detail ada di buku panduan.
                </p>
           </Card>
        </div>
      </div>
    </section>
  );
}
