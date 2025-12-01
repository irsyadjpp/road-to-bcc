'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, RefreshCw } from "lucide-react";
import confetti from 'canvas-confetti';

// Simulasi Database Peserta
const participants = [
    "Budi Santoso (BCC-A1B2)", "Siti Aminah (BCC-X9Y1)", "Rizky Febian (BCC-P0L1)",
    "Dewi Persik (BCC-M5N6)", "Agus Kotak (BCC-H1H1)", "Rina Nose (BCC-J2J2)"
];

export default function RafflePage() {
  const [winner, setWinner] = useState<string | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [display, setDisplay] = useState("SIAP MENGUNDI");

  const startRaffle = () => {
    setIsRolling(true);
    setWinner(null);
    
    // Efek Acak Cepat (Rolet)
    const duration = 3000; // 3 detik tegang
    const interval = 50; 
    const endTime = Date.now() + duration;

    const timer = setInterval(() => {
        const randomName = participants[Math.floor(Math.random() * participants.length)];
        setDisplay(randomName);

        if (Date.now() > endTime) {
            clearInterval(timer);
            const finalWinner = participants[Math.floor(Math.random() * participants.length)];
            setDisplay(finalWinner);
            setWinner(finalWinner);
            setIsRolling(false);
            
            // Efek Confetti Besar
            confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
        }
    }, interval);
  };

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8 py-10">
      <h2 className="text-3xl font-bold font-headline">Mesin Pengundian Doorprize</h2>
      
      <Card className="border-4 border-primary/20 bg-secondary/10">
        <CardContent className="p-12">
            <div className="text-sm text-muted-foreground uppercase tracking-widest mb-4">Pemenang Adalah</div>
            <div className={`text-4xl md:text-5xl font-black font-mono transition-all ${isRolling ? 'opacity-50 blur-sm' : 'opacity-100 scale-110 text-primary'}`}>
                {display}
            </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        <Button 
            size="lg" 
            className="h-16 px-10 text-xl font-bold shadow-xl hover:scale-105 transition-transform" 
            onClick={startRaffle}
            disabled={isRolling}
        >
            {isRolling ? "MENGACAK..." : "PUTAR UNDIAN!"}
        </Button>
      </div>

      {winner && (
        <div className="animate-in fade-in slide-in-from-bottom-4 bg-yellow-100 border border-yellow-400 text-yellow-800 p-4 rounded-lg">
            Selamat kepada <strong>{winner}</strong>! Silakan menuju panggung utama.
        </div>
      )}
    </div>
  );
}
