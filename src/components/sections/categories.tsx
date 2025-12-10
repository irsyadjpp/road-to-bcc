
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Swords, UserPlus, Trophy, Plus, ArrowRight, XCircle } from "lucide-react";

// Update matriks dengan data baru
const pairings = [
  { level1: "Beginner", level2: "Beginner", result: "Beginner", color: "text-green-500", valid: true },
  { level1: "Beginner", level2: "Intermediate", result: "Intermediate", color: "text-blue-500", valid: true },
  { level1: "Intermediate", level2: "Intermediate", result: "Intermediate", color: "text-blue-500", valid: true },
  { level1: "Intermediate", level2: "Advance", result: "Advance", color: "text-purple-500", valid: true },
  { level1: "Advance", level2: "Advance", result: "Advance", color: "text-purple-500", valid: true },
  { level1: "Beginner", level2: "Advance", result: "DILARANG", color: "text-destructive", valid: false },
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
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Level pasangan ditentukan dari kombinasi level individu untuk memastikan pertandingan yang seimbang. Kombinasi yang terlalu timpang seperti <strong className="text-destructive">Beginner + Advance</strong> dilarang untuk menjaga asas Fair Play.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pairings.map((pair, index) => (
            <Card key={index} className={`bg-card border shadow-sm hover:shadow-lg transition-shadow hover:-translate-y-1 ${!pair.valid ? 'border-destructive/30 bg-destructive/5' : ''}`}>
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
                   {pair.valid ? (
                       <div className={`px-4 py-2 rounded-full text-base font-bold border-2 ${pair.color.replace('text-', 'border-')} ${pair.color.replace('text-', 'bg-')}/10`}>{pair.result}</div>
                   ) : (
                       <div className={`px-4 py-2 rounded-full text-base font-bold border-2 flex items-center gap-2 ${pair.color.replace('text-', 'border-')} ${pair.color.replace('text-', 'bg-')}/10`}>
                           <XCircle className="w-4 h-4"/>
                           {pair.result}
                        </div>
                   )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-card p-6 rounded-lg border max-w-3xl mx-auto">
            <h4 className="font-bold text-center text-foreground mb-3">Catatan Tambahan untuk Ganda Campuran / Putri</h4>
            <p className="text-sm text-muted-foreground text-center">
                BCC 2026 tidak menerapkan sistem voor. Manajer tim disarankan untuk sangat strategis saat mendaftarkan Ganda Putri (WD) atau Ganda Campuran (XD), terutama jika akan melawan Ganda Putra (MD) di kategori level yang sama. Kekuatan fisik pemain pria menjadi faktor signifikan.
            </p>
        </div>
      </div>
    </section>
  );
}
