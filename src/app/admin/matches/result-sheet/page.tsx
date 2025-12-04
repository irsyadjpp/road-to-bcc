
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Save, Trophy, Users, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { submitTieResult, type TieResult, type MatchParty } from "../actions";

// Struktur Partai Default
const DEFAULT_MATCHES: MatchParty[] = [
  { id: 1, category: "MD BEGINNER 1", playerA1: "", playerA2: "", playerB1: "", playerB2: "", score: "", winner: null },
  { id: 2, category: "MD INTERMEDIATE 1", playerA1: "", playerA2: "", playerB1: "", playerB2: "", score: "", winner: null },
  { id: 3, category: "MD ADVANCE / 3-ON-3", playerA1: "", playerA2: "", playerB1: "", playerB2: "", score: "", winner: null },
  { id: 4, category: "MD INTERMEDIATE 2", playerA1: "", playerA2: "", playerB1: "", playerB2: "", score: "", winner: null },
  { id: 5, category: "MD BEGINNER 2", playerA1: "", playerA2: "", playerB1: "", playerB2: "", score: "", winner: null },
];

export default function DigitalResultSheetPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // State Data Utama
  const [formData, setFormData] = useState<TieResult>({
      id: `TIE-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      court: "1",
      round: "Penyisihan Grup",
      teamA: "",
      teamB: "",
      matches: DEFAULT_MATCHES,
      finalScoreA: 0,
      finalScoreB: 0,
      winnerTeam: "",
      managerA_verified: false,
      managerB_verified: false,
      referee_verified: false,
      status: 'DRAFT'
  });

  // --- LOGIC UPDATE SCORE ---
  const updateMatch = (index: number, field: keyof MatchParty, value: any) => {
      const updatedMatches = [...formData.matches];
      updatedMatches[index] = { ...updatedMatches[index], [field]: value };
      
      // Hitung Ulang Skor Akhir Otomatis
      let scoreA = 0;
      let scoreB = 0;
      updatedMatches.forEach(m => {
          if (m.winner === 'A') scoreA++;
          if (m.winner === 'B') scoreB++;
      });

      setFormData({
          ...formData,
          matches: updatedMatches,
          finalScoreA: scoreA,
          finalScoreB: scoreB,
          winnerTeam: scoreA > scoreB ? formData.teamA : (scoreB > scoreA ? formData.teamB : "SERI")
      });
  };

  const handleSubmit = async () => {
      // Validasi
      if (!formData.teamA || !formData.teamB) return toast({title: "Error", description: "Nama Tim wajib diisi", variant: "destructive"});
      if (!formData.managerA_verified || !formData.managerB_verified) return toast({title: "Validasi Kurang", description: "Kedua Manajer Wajib Menyetujui Hasil (Centang Verifikasi)", variant: "destructive"});

      setIsSubmitting(true);
      const res = await submitTieResult(formData);
      setIsSubmitting(false);

      if (res.success) {
          setIsCompleted(true);
          toast({ title: "Berhasil", description: res.message, className: "bg-green-600 text-white" });
      }
  };

  if (isCompleted) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
              <Card className="w-full max-w-md text-center p-8 border-t-8 border-t-green-600 shadow-2xl">
                  <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-4" />
                  <h1 className="text-2xl font-black text-primary mb-2">HASIL TERCATAT</h1>
                  <div className="text-4xl font-mono font-bold mb-4">
                      {formData.teamA} <span className="text-muted-foreground mx-2">{formData.finalScoreA} - {formData.finalScoreB}</span> {formData.teamB}
                  </div>
                  <p className="text-muted-foreground mb-8">Pemenang: <strong>{formData.winnerTeam}</strong></p>
                  <Button onClick={() => window.location.reload()} variant="outline">Input Pertandingan Baru</Button>
              </Card>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* HEADER IDENTITAS */}
        <Card className="border-t-4 border-t-primary">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl font-black font-headline text-primary">BERITA ACARA DIGITAL</CardTitle>
                        <CardDescription>Official Tie Result Sheet • BCC 2026</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-lg px-3 py-1 bg-white">
                        COURT {formData.court}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Tim A (Kiri)</Label>
                    <Input 
                        placeholder="Nama Tim A" 
                        className="text-lg font-bold border-primary/20 bg-blue-50/50" 
                        value={formData.teamA}
                        onChange={e => setFormData({...formData, teamA: e.target.value})}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Tim B (Kanan)</Label>
                    <Input 
                        placeholder="Nama Tim B" 
                        className="text-lg font-bold border-primary/20 bg-red-50/50"
                        value={formData.teamB}
                        onChange={e => setFormData({...formData, teamB: e.target.value})}
                    />
                </div>
                
                <div className="grid grid-cols-2 gap-4 md:col-span-2">
                    <div><Label>Babak</Label><Input value={formData.round} onChange={e => setFormData({...formData, round: e.target.value})} /></div>
                    <div><Label>Tanggal</Label><Input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} /></div>
                </div>
            </CardContent>
        </Card>

        {/* DAFTAR PARTAI (ACCORDION) */}
        <Card>
            <CardHeader className="pb-2"><CardTitle>Input Hasil Partai</CardTitle></CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                    {formData.matches.map((match, idx) => (
                        <AccordionItem key={match.id} value={`item-${idx}`}>
                            <AccordionTrigger className="hover:no-underline bg-secondary/20 px-4 rounded-lg mb-2">
                                <div className="flex justify-between w-full items-center pr-4">
                                    <span className="font-bold text-sm text-primary">PARTAI {idx + 1}: {match.category}</span>
                                    {match.winner ? (
                                        <Badge className={match.winner === 'A' ? 'bg-blue-600' : 'bg-red-600'}>
                                            WIN: {match.winner === 'A' ? 'TIM A' : 'TIM B'}
                                        </Badge>
                                    ) : <Badge variant="outline">Belum Input</Badge>}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 py-4 border rounded-lg mt-[-8px]">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                    {/* TIM A PLAYER */}
                                    <div className="space-y-2 p-3 bg-blue-50 rounded border border-blue-100">
                                        <Label className="text-blue-800">Pemain Tim A</Label>
                                        <Input placeholder="Pemain 1" value={match.playerA1} onChange={e => updateMatch(idx, 'playerA1', e.target.value)} className="bg-white"/>
                                        <Input placeholder="Pemain 2" value={match.playerA2} onChange={e => updateMatch(idx, 'playerA2', e.target.value)} className="bg-white"/>
                                        <Button 
                                            variant={match.winner === 'A' ? "default" : "outline"} 
                                            className={`w-full mt-2 ${match.winner === 'A' ? 'bg-blue-600 hover:bg-blue-700' : 'text-blue-600 border-blue-200'}`}
                                            onClick={() => updateMatch(idx, 'winner', 'A')}
                                        >
                                            {match.winner === 'A' ? <CheckCircle2 className="w-4 h-4 mr-2"/> : null}
                                            Set Pemenang: TIM A
                                        </Button>
                                    </div>

                                    {/* TIM B PLAYER */}
                                    <div className="space-y-2 p-3 bg-red-50 rounded border border-red-100">
                                        <Label className="text-red-800">Pemain Tim B</Label>
                                        <Input placeholder="Pemain 1" value={match.playerB1} onChange={e => updateMatch(idx, 'playerB1', e.target.value)} className="bg-white"/>
                                        <Input placeholder="Pemain 2" value={match.playerB2} onChange={e => updateMatch(idx, 'playerB2', e.target.value)} className="bg-white"/>
                                        <Button 
                                            variant={match.winner === 'B' ? "default" : "outline"} 
                                            className={`w-full mt-2 ${match.winner === 'B' ? 'bg-red-600 hover:bg-red-700' : 'text-red-600 border-red-200'}`}
                                            onClick={() => updateMatch(idx, 'winner', 'B')}
                                        >
                                            {match.winner === 'B' ? <CheckCircle2 className="w-4 h-4 mr-2"/> : null}
                                            Set Pemenang: TIM B
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Skor Detail (Game 1, 2, 3)</Label>
                                    <Input 
                                        placeholder="Contoh: 21-19, 18-21, 21-15" 
                                        className="font-mono text-center text-lg" 
                                        value={match.score}
                                        onChange={e => updateMatch(idx, 'score', e.target.value)}
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>

        {/* SKOR AKHIR & VALIDASI DIGITAL */}
        <Card className="bg-zinc-900 text-white border-none shadow-xl">
            <CardContent className="p-8">
                <div className="text-center mb-8">
                    <p className="text-sm text-zinc-400 uppercase tracking-widest mb-2">HASIL AKHIR (TIE SCORE)</p>
                    <div className="text-6xl font-black font-mono flex justify-center items-center gap-4">
                        <span className="text-blue-400">{formData.finalScoreA}</span>
                        <span className="text-zinc-600">-</span>
                        <span className="text-red-400">{formData.finalScoreB}</span>
                    </div>
                    <p className="mt-4 text-xl font-bold text-yellow-500">
                        PEMENANG: {formData.winnerTeam || "..."}
                    </p>
                </div>

                <div className="bg-white/5 p-4 rounded-lg border border-white/10 space-y-4">
                    <h4 className="font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
                        <Users className="w-4 h-4" /> Digital Signature (Verifikasi Manajer)
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={`p-3 rounded border cursor-pointer transition-all ${formData.managerA_verified ? 'bg-green-900/30 border-green-500 text-green-400' : 'bg-black/20 border-white/10 text-zinc-400 hover:bg-white/5'}`}
                             onClick={() => setFormData({...formData, managerA_verified: !formData.managerA_verified})}
                        >
                            <div className="flex items-center gap-3">
                                <Checkbox checked={formData.managerA_verified} className="border-zinc-500 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500" />
                                <div>
                                    <div className="text-sm font-bold">Manajer Tim A</div>
                                    <div className="text-[10px]">Saya menyetujui hasil ini.</div>
                                </div>
                            </div>
                        </div>

                        <div className={`p-3 rounded border cursor-pointer transition-all ${formData.managerB_verified ? 'bg-green-900/30 border-green-500 text-green-400' : 'bg-black/20 border-white/10 text-zinc-400 hover:bg-white/5'}`}
                             onClick={() => setFormData({...formData, managerB_verified: !formData.managerB_verified})}
                        >
                            <div className="flex items-center gap-3">
                                <Checkbox checked={formData.managerB_verified} className="border-zinc-500 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500" />
                                <div>
                                    <div className="text-sm font-bold">Manajer Tim B</div>
                                    <div className="text-[10px]">Saya menyetujui hasil ini.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="bg-zinc-950 p-4 flex justify-end border-t border-white/10">
                 <Button 
                    size="lg" 
                    className="font-bold text-lg px-8 bg-green-600 hover:bg-green-700 text-white w-full md:w-auto"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin"/> MENYIMPAN...</> : <><Save className="w-5 h-5 mr-2"/> SAHKAN HASIL</>}
                </Button>
            </CardFooter>
        </Card>

      </div>
    </div>
  );
}
