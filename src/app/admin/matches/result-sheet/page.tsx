
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
import { Save, Trophy, Users, CheckCircle2, AlertCircle, Loader2, Sword, Shield, Swords } from "lucide-react";
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
          <div className="flex items-center justify-center py-10">
              <Card className="w-full max-w-lg text-center p-8 bg-card border-t-8 border-green-500 shadow-2xl animate-in fade-in zoom-in-95">
                  <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-6" />
                  <h1 className="text-3xl font-black text-foreground mb-2">HASIL TERSIMPAN</h1>
                  <div className="text-5xl font-black font-headline mb-4">
                      <span className="text-blue-500">{formData.teamA}</span> 
                      <span className="text-muted-foreground mx-2">{formData.finalScoreA} - {formData.finalScoreB}</span> 
                      <span className="text-red-500">{formData.teamB}</span>
                  </div>
                  <p className="text-muted-foreground mb-8 text-xl">Pemenang: <strong className="text-yellow-500">{formData.winnerTeam}</strong></p>
                  <Button onClick={() => window.location.reload()} variant="outline" size="lg">Input Pertandingan Baru</Button>
              </Card>
          </div>
      );
  }

  return (
    <div className="space-y-6">
        
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-2xl font-black font-headline text-primary">DIGITAL RESULT SHEET</CardTitle>
                        <CardDescription>Official Tie Result • BCC 2026</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-lg px-4 py-2 bg-card border-border">
                        COURT {formData.court}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-5 gap-4 items-end">
                    <div className="col-span-2 space-y-2">
                        <Label className="flex items-center gap-2"><Shield className="text-blue-500"/> Tim A (Home)</Label>
                        <Input 
                            placeholder="Nama Tim A" 
                            className="text-lg font-bold h-12 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/50 focus:border-blue-700" 
                            value={formData.teamA}
                            onChange={e => setFormData({...formData, teamA: e.target.value})}
                        />
                    </div>
                    <div className="col-span-1 text-center pb-3">
                        <Swords className="w-6 h-6 text-muted-foreground mx-auto"/>
                    </div>
                    <div className="col-span-2 space-y-2">
                        <Label className="text-right block flex items-center gap-2 justify-end"><Shield className="text-red-500"/> Tim B (Away)</Label>
                        <Input 
                            placeholder="Nama Tim B" 
                            className="text-lg font-bold h-12 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/50 focus:border-red-700 text-right"
                            value={formData.teamB}
                            onChange={e => setFormData({...formData, teamB: e.target.value})}
                        />
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div className="space-y-2">
                        <Label>Babak</Label>
                        <Select value={formData.round} onValueChange={val => setFormData({...formData, round: val})}>
                            <SelectTrigger><SelectValue/></SelectTrigger>
                            <SelectContent><SelectItem value="Penyisihan Grup">Penyisihan Grup</SelectItem><SelectItem value="Gugur">Gugur</SelectItem></SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label>Tanggal</Label>
                        <Input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}/>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle className="text-foreground">Input Hasil Pertandingan</CardTitle></CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full space-y-3" defaultValue="item-0">
                    {formData.matches.map((match, idx) => (
                        <AccordionItem key={match.id} value={`item-${idx}`} className="border-border rounded-xl overflow-hidden bg-card/30">
                            <AccordionTrigger className="hover:no-underline px-4 py-3 bg-secondary/50 data-[state=open]:bg-secondary">
                                <div className="flex justify-between w-full items-center">
                                    <span className="font-bold text-sm text-primary">PARTAI {idx + 1}: {match.category}</span>
                                    {match.winner ? (
                                        <Badge className={match.winner === 'A' ? 'bg-blue-600' : 'bg-red-600'}>
                                            WIN: TIM {match.winner}
                                        </Badge>
                                    ) : <Badge variant="outline" className="border-border text-muted-foreground">Pending</Badge>}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="space-y-2 p-3 bg-blue-900/10 dark:bg-blue-900/20 rounded-lg border border-blue-800/20">
                                        <Label className="text-blue-700 dark:text-blue-300 font-semibold">Pemain Tim A</Label>
                                        <Input placeholder="Pemain 1" value={match.playerA1} onChange={e => updateMatch(idx, 'playerA1', e.target.value)} className="bg-background border-border"/>
                                        <Input placeholder="Pemain 2" value={match.playerA2} onChange={e => updateMatch(idx, 'playerA2', e.target.value)} className="bg-background border-border"/>
                                        <Button variant={match.winner === 'A' ? "default" : "outline"} className={`w-full mt-2 ${match.winner === 'A' ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-700/50 text-blue-600 dark:text-blue-300'}`} onClick={() => updateMatch(idx, 'winner', 'A')}>
                                            {match.winner === 'A' && <CheckCircle2 className="w-4 h-4 mr-2"/>}Pemenang: Tim A
                                        </Button>
                                    </div>

                                    <div className="space-y-2 p-3 bg-red-900/10 dark:bg-red-900/20 rounded-lg border border-red-800/20">
                                        <Label className="text-red-700 dark:text-red-300 font-semibold">Pemain Tim B</Label>
                                        <Input placeholder="Pemain 1" value={match.playerB1} onChange={e => updateMatch(idx, 'playerB1', e.target.value)} className="bg-background border-border"/>
                                        <Input placeholder="Pemain 2" value={match.playerB2} onChange={e => updateMatch(idx, 'playerB2', e.target.value)} className="bg-background border-border"/>
                                        <Button variant={match.winner === 'B' ? "destructive" : "outline"} className={`w-full mt-2 ${match.winner === 'B' ? 'bg-red-600 hover:bg-red-700' : 'border-red-700/50 text-red-600 dark:text-red-300'}`} onClick={() => updateMatch(idx, 'winner', 'B')}>
                                             {match.winner === 'B' && <CheckCircle2 className="w-4 h-4 mr-2"/>}Pemenang: Tim B
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-2 pt-4 border-t border-border">
                                    <Label>Skor Detail (Contoh: 21-19, 18-21, 21-15)</Label>
                                    <Input className="font-mono text-center text-lg h-12 bg-background border-border" value={match.score} onChange={e => updateMatch(idx, 'score', e.target.value)} />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-md">
            <CardHeader>
                <CardTitle className="text-yellow-500 flex items-center gap-2"><Trophy className="w-5 h-5"/> Hasil Akhir Pertandingan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-center bg-secondary p-6 rounded-xl border border-border">
                    <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">TIE SCORE</p>
                    <div className="text-7xl font-black font-mono flex justify-center items-center gap-6">
                        <span className="text-blue-500">{formData.finalScoreA}</span>
                        <span className="text-muted-foreground">-</span>
                        <span className="text-red-500">{formData.finalScoreB}</span>
                    </div>
                    <p className="mt-4 text-xl font-bold text-yellow-500">
                        PEMENANG: {formData.winnerTeam || "Belum ditentukan..."}
                    </p>
                </div>

                <div className="space-y-3">
                    <h4 className="font-bold flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
                        <Users className="w-4 h-4" /> VERIFIKASI MANAJER
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.managerA_verified ? 'bg-green-500/10 border-green-500' : 'bg-secondary/50 border-border hover:border-border/50'}`}
                             onClick={() => setFormData({...formData, managerA_verified: !formData.managerA_verified})}
                        >
                            <div className="flex items-center gap-3">
                                <Checkbox checked={formData.managerA_verified} className="border-border data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 size-5" />
                                <div>
                                    <div className="font-bold">Manajer Tim A Setuju</div>
                                    <div className="text-xs text-muted-foreground">Hasil pertandingan valid.</div>
                                </div>
                            </div>
                        </div>

                        <div className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.managerB_verified ? 'bg-green-500/10 border-green-500' : 'bg-secondary/50 border-border hover:border-border/50'}`}
                             onClick={() => setFormData({...formData, managerB_verified: !formData.managerB_verified})}
                        >
                            <div className="flex items-center gap-3">
                                <Checkbox checked={formData.managerB_verified} className="border-border data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 size-5" />
                                <div>
                                    <div className="font-bold">Manajer Tim B Setuju</div>
                                    <div className="text-xs text-muted-foreground">Hasil pertandingan valid.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="bg-secondary/20 p-4 border-t border-border">
                 <Button size="lg" className="font-bold text-lg h-14 bg-green-600 hover:bg-green-700 text-white w-full" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? <><Loader2 className="w-6 h-6 mr-2 animate-spin"/> MENYIMPAN...</> : <><Save className="w-6 h-6 mr-2"/> SAHKAN & KUNCI HASIL</>}
                </Button>
            </CardFooter>
        </Card>
      </div>
  );
}
