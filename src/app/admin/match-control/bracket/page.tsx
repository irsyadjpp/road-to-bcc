'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dices, Trophy, Calendar, Shield } from "lucide-react";
import { getBracketData, generateDraw } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

export default function BracketGeneratorPage() {
  const { toast } = useToast();
  const [data, setData] = useState<any>({ groups: [], matches: [] });
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getBracketData();
    setData(res);
  };

  const handleDraw = async () => {
    setIsGenerating(true);
    const res = await generateDraw();
    setIsGenerating(false);
    if(res.success) {
        toast({ title: "DRAWING SELESAI", description: res.message, className: "bg-green-600 text-white" });
        load();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-bold font-headline text-primary uppercase">Tournament Bracket</h2>
            <p className="text-muted-foreground">Manager Undian & Bagan Pertandingan (32 Tim).</p>
        </div>
        <Button size="lg" onClick={handleDraw} disabled={isGenerating} className="bg-primary hover:bg-red-700 font-bold shadow-lg">
            {isGenerating ? <Loader2 className="animate-spin mr-2"/> : <Dices className="mr-2 h-5 w-5" />}
            {data.groups.length > 0 ? "ULANG DRAWING" : "LAKUKAN DRAWING (UNDIAN)"}
        </Button>
      </div>

      {data.groups.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 rounded-xl border-2 border-dashed">
              <Shield className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-muted-foreground">Belum ada data undian</h3>
              <p className="text-sm text-muted-foreground">Silakan klik tombol "Lakukan Drawing" untuk membagi 32 tim ke 8 group.</p>
          </div>
      ) : (
          <Tabs defaultValue="groups" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="groups">Babak Penyisihan (Group Stage)</TabsTrigger>
                <TabsTrigger value="knockout">Babak Gugur (Knockout 16 Besar)</TabsTrigger>
            </TabsList>

            {/* TAB 1: GROUP STAGE */}
            <TabsContent value="groups" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {data.groups.map((group: any) => (
                        <Card key={group.name} className="border-t-4 border-t-primary shadow-md">
                            <CardHeader className="pb-2 bg-muted/20">
                                <CardTitle className="text-center text-xl font-black">GROUP {group.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <ul className="divide-y divide-border">
                                    {group.teams.map((team: any, idx: number) => (
                                        <li key={team.id} className="p-3 flex items-center justify-between text-sm hover:bg-muted/50">
                                            <span className="flex items-center gap-2">
                                                <span className="font-mono text-muted-foreground w-4">{idx+1}.</span>
                                                <span className="font-bold">{team.name}</span>
                                            </span>
                                            {/* Seed Indicator */}
                                            {team.rank <= 8 && <Badge variant="outline" className="text-[10px] h-5">Seed {team.rank}</Badge>}
                                        </li>
                                    ))}
                                </ul>
                                <div className="p-3 bg-muted/10 border-t text-center">
                                    <Button variant="link" size="sm" className="text-xs text-primary">Lihat Jadwal Group {group.name}</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </TabsContent>

            {/* TAB 2: KNOCKOUT (Visual Bracket) */}
            <TabsContent value="knockout" className="overflow-x-auto pb-10">
                <div className="min-w-[1000px] flex justify-between items-center relative px-10">
                    
                    {/* BAGAN KIRI (16 Besar -> 8 Besar -> Semi) */}
                    <div className="space-y-8">
                        {/* 16 BESAR */}
                        {['A1 vs B2', 'C1 vs D2', 'E1 vs F2', 'G1 vs H2'].map((match, i) => (
                            <BracketMatch key={i} title={`R16 - Match ${i+1}`} p1={match.split(' vs ')[0]} p2={match.split(' vs ')[1]} />
                        ))}
                    </div>

                    <div className="space-y-24 mt-8">
                        {/* QUARTER FINAL */}
                        {['QF 1', 'QF 2'].map((match, i) => (
                            <BracketMatch key={i} title={match} p1="Winner R16" p2="Winner R16" isConnector />
                        ))}
                    </div>

                    <div className="space-y-48 mt-12">
                        {/* SEMI FINAL */}
                        <BracketMatch title="SEMI FINAL 1" p1="Winner QF1" p2="Winner QF2" isConnector />
                    </div>

                    {/* FINAL (TENGAH) */}
                    <div className="mx-8 transform scale-125">
                        <Card className="border-4 border-yellow-500 bg-gradient-to-b from-yellow-500/10 to-transparent shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                            <CardHeader className="py-2 text-center border-b border-yellow-500/30">
                                <CardTitle className="text-yellow-600 flex items-center justify-center gap-2 text-sm uppercase tracking-widest">
                                    <Trophy className="w-4 h-4" /> GRAND FINAL
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 space-y-2 w-48 text-center">
                                <div className="font-bold text-lg">Winner SF1</div>
                                <div className="text-xs text-muted-foreground">VS</div>
                                <div className="font-bold text-lg">Winner SF2</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* BAGAN KANAN (MIRROR) */}
                    <div className="space-y-48 mt-12">
                        <BracketMatch title="SEMI FINAL 2" p1="Winner QF3" p2="Winner QF4" isConnector reverse />
                    </div>
                    <div className="space-y-24 mt-8">
                        {['QF 3', 'QF 4'].map((match, i) => (
                            <BracketMatch key={i} title={match} p1="Winner R16" p2="Winner R16" isConnector reverse />
                        ))}
                    </div>
                    <div className="space-y-8">
                        {['B1 vs A2', 'D1 vs C2', 'F1 vs E2', 'H1 vs G2'].map((match, i) => (
                            <BracketMatch key={i} title={`R16 - Match ${i+5}`} p1={match.split(' vs ')[0]} p2={match.split(' vs ')[1]} reverse />
                        ))}
                    </div>

                </div>
            </TabsContent>
          </Tabs>
      )}
    </div>
  );
}

// Komponen Kecil Visual Bagan
function BracketMatch({ title, p1, p2, isConnector, reverse }: any) {
    return (
        <div className={`relative flex items-center ${reverse ? 'flex-row-reverse' : ''}`}>
            <Card className="w-48 border shadow-sm relative z-10">
                <div className="bg-muted/30 px-3 py-1 text-[10px] font-bold text-muted-foreground uppercase border-b">{title}</div>
                <div className="p-2 space-y-2">
                    <div className="flex justify-between items-center text-sm font-medium border-b border-dashed pb-1">
                        <span>{p1}</span> <span className="text-muted-foreground">-</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium">
                        <span>{p2}</span> <span className="text-muted-foreground">-</span>
                    </div>
                </div>
            </Card>
            {/* Garis Konektor (Simulasi CSS) */}
            {isConnector && (
                <div className={`absolute ${reverse ? 'right-full' : 'left-full'} top-1/2 w-8 h-[1px] bg-border -z-0`}></div>
            )}
        </div>
    )
}
