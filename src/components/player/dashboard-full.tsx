'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Copy, UserPlus, Users, Zap, Trophy, Settings, Share2, 
  QrCode, ShieldAlert, Swords
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DigitalPlayerCard } from "./digital-player-card"; 
import { CourtLines } from "@/components/ui/court-lines";

export function DashboardClient({ session }: { session: any }) {
  const { toast } = useToast();
  const [partnerCode, setPartnerCode] = useState("");
  const [communityCode, setCommunityCode] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(session.athleteCode);
    toast({ title: "Copied!", description: "Kode atlet berhasil disalin." });
  };

  return (
    <div className="min-h-screen bg-background pb-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none"><CourtLines /></div>
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <header className="pt-8 pb-6 px-6 container mx-auto flex justify-between items-center relative z-10">
         <div>
            <h1 className="text-2xl font-bold font-headline uppercase tracking-tighter">
               Halo, <span className="text-primary">{session.name.split(' ')[0]}</span> 👋
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Ready to smash today?</p>
         </div>
         <Button variant="outline" size="icon" className="rounded-full border-2"><Settings className="w-5 h-5" /></Button>
      </header>

      <main className="container mx-auto px-4 relative z-10">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT: CARD */}
            <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-6">
               <DigitalPlayerCard name={session.name} level={session.level || "Beginner"} code={session.athleteCode} />
            </div>

            {/* MIDDLE: ACTION */}
            <div className="lg:col-span-8 xl:col-span-6 space-y-6">
               <Card className="bg-zinc-900 text-white border-none rounded-[2rem] p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-20"><QrCode className="w-32 h-32 text-white" /></div>
                  <div className="relative z-10">
                     <div className="flex items-center gap-2 mb-4 text-zinc-400">
                        <Zap className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-bold text-sm uppercase tracking-widest">My Identity</span>
                     </div>
                     <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-3 flex items-center gap-4 cursor-pointer hover:bg-white/20 transition-colors" onClick={handleCopy}>
                           <code className="text-3xl md:text-4xl font-black font-mono tracking-wider text-yellow-400">{session.athleteCode}</code>
                           <Copy className="w-6 h-6 text-white/70" />
                        </div>
                        <div className="text-sm text-zinc-400 max-w-xs leading-snug">Bagikan kode ini ke partner atau manajer.</div>
                     </div>
                  </div>
               </Card>

               {!session.teamId ? (
                   <Card className="border-2 border-dashed border-primary/20 bg-secondary/30 rounded-[2rem] overflow-hidden">
                      <Tabs defaultValue="partner" className="w-full">
                         <div className="p-2 m-2 bg-background/50 rounded-[1.5rem] flex gap-2">
                            <TabsTrigger value="partner" className="w-1/2 rounded-3xl font-bold py-3 data-[state=active]:bg-primary data-[state=active]:text-white">Cari Pasangan</TabsTrigger>
                            <TabsTrigger value="community" className="w-1/2 rounded-3xl font-bold py-3 data-[state=active]:bg-zinc-900 data-[state=active]:text-white">Gabung Klub</TabsTrigger>
                         </div>
                         <div className="p-6 pt-2">
                            <TabsContent value="partner" className="space-y-4">
                               <div className="flex items-start gap-4 mb-4">
                                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0"><UserPlus className="w-6 h-6" /></div>
                                  <div><h3 className="font-bold text-lg">Daftar Independen</h3><p className="text-muted-foreground text-sm">Punya partner? Masukkan kode atlet mereka.</p></div>
                               </div>
                               <div className="flex gap-2">
                                  <Input placeholder="ATH-XXXXX" className="h-14 text-lg font-mono uppercase rounded-2xl border-2" value={partnerCode} onChange={(e) => setPartnerCode(e.target.value.toUpperCase())} />
                                  <Button size="lg" className="h-14 px-8 rounded-2xl font-bold bg-primary text-white">Cek</Button>
                               </div>
                            </TabsContent>
                            <TabsContent value="community" className="space-y-4">
                               <div className="flex items-start gap-4 mb-4">
                                  <div className="bg-zinc-900/10 p-3 rounded-full shrink-0"><Users className="w-6 h-6" /></div>
                                  <div><h3 className="font-bold text-lg">Gabung Komunitas</h3><p className="text-muted-foreground text-sm">Masukkan kode unik komunitas.</p></div>
                               </div>
                               <div className="flex gap-2">
                                  <Input placeholder="COM-XXXXX" className="h-14 text-lg font-mono uppercase rounded-2xl border-2" value={communityCode} onChange={(e) => setCommunityCode(e.target.value.toUpperCase())} />
                                  <Button size="lg" className="h-14 px-8 rounded-2xl font-bold bg-zinc-900 text-white">Join</Button>
                               </div>
                            </TabsContent>
                         </div>
                      </Tabs>
                   </Card>
               ) : (
                   <Card className="bg-green-500 text-white border-none rounded-[2rem] p-8">
                       <div className="flex items-center gap-4">
                           <div className="bg-white/20 p-4 rounded-full"><ShieldAlert className="w-8 h-8" /></div>
                           <div><h3 className="font-black font-headline text-2xl">YOU'RE IN!</h3><p className="font-medium opacity-90">Terdaftar di tim: <strong>{session.teamName}</strong></p></div>
                       </div>
                   </Card>
               )}
            </div>

            {/* RIGHT: INFO */}
            <div className="lg:col-span-12 xl:col-span-3 space-y-6">
               <Card className="rounded-[2rem] p-6 bg-secondary/30 border-none">
                  <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-4">Stats</h3>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between p-4 bg-background rounded-2xl shadow-sm">
                        <div className="flex items-center gap-3"><Trophy className="w-5 h-5 text-yellow-500" /><span className="font-bold">Level</span></div>
                        <Badge>{session.level || "TBD"}</Badge>
                     </div>
                  </div>
               </Card>
            </div>
         </div>
      </main>
    </div>
  );
}
