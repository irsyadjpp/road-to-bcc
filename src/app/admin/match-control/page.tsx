
'use client';

import { useState } from "react";
import { 
  Trophy, Users, Timer, Mic2, 
  Play, Pause, Flag, ArrowRight, 
  MoreVertical, CheckCircle2, AlertCircle, 
  RefreshCw, Sword, MonitorPlay
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const QUEUE = [
  { id: "M-101", category: "MD OPEN", round: "R16", pA: "Fajar / Rian", pB: "Leo / Daniel", status: "READY" },
  { id: "M-102", category: "MS PRO", round: "QF", pA: "Jojo", pB: "Chico", status: "READY" },
  { id: "M-103", category: "WD OPEN", round: "SF", pA: "Apri / Fadia", pB: "Ribka / Lanny", status: "WARMING_UP" },
  { id: "M-104", category: "XD OPEN", round: "R32", pA: "Rehan / Lisa", pB: "Rinov / Pitha", status: "WAITING" },
  { id: "M-105", category: "MD U-19", round: "Final", pA: "Ansel / Zidan", pB: "Rayhan / Alwi", status: "WAITING" },
];

const COURTS = [
  { id: 1, name: "Court 1 (TV)", status: "LIVE", match: { pA: "Kevin / Marcus", pB: "Ahsan / Hendra", sA: 18, sB: 19, set: 3 } },
  { id: 2, name: "Court 2", status: "IDLE", match: null },
  { id: 3, name: "Court 3", status: "WARMUP", match: { pA: "Ginting", pB: "Antonsen", sA: 0, sB: 0, set: 1 } },
  { id: 4, name: "Court 4", status: "LIVE", match: { pA: "Axelsen", pB: "Momota", sA: 21, sB: 7, set: 1 } },
  { id: 5, name: "Court 5", status: "CLEANING", match: null },
  { id: 6, name: "Court 6", status: "IDLE", match: null },
];

export default function MatchControlPage() {
  const [selectedCourt, setSelectedCourt] = useState<any>(null);
  const [selectedMatch, setSelectedMatch] = useState<string>("");

  // Helper Colors
  const getStatusColor = (s: string) => {
    switch(s) {
        case 'LIVE': return 'border-green-500/50 bg-green-950/10';
        case 'WARMUP': return 'border-yellow-500/50 bg-yellow-950/10';
        case 'CLEANING': return 'border-blue-500/50 bg-blue-950/10';
        default: return 'border-zinc-800 bg-zinc-900 border-dashed';
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6 font-body pb-24 h-[calc(100vh-64px)] flex flex-col">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center shrink-0 gap-4">
        <div>
            <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-orange-500 text-orange-500 bg-orange-500/10 backdrop-blur-md">
                    <Sword className="w-3 h-3 mr-2" /> MATCH CONTROL
                </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-white">
                Arena <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Manager</span>
            </h1>
        </div>

        <div className="flex gap-4">
            <div className="bg-zinc-900 px-6 py-3 rounded-[24px] border border-zinc-800 flex flex-col items-center min-w-[100px]">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Pending</span>
                <span className="text-2xl font-black text-white">42</span>
            </div>
            <div className="bg-zinc-900 px-6 py-3 rounded-[24px] border border-zinc-800 flex flex-col items-center min-w-[100px]">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Played</span>
                <span className="text-2xl font-black text-green-500">156</span>
            </div>
        </div>
      </div>

      {/* --- MAIN WORKSPACE (Split View) --- */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
         
         {/* LEFT: MATCH QUEUE (1/4) */}
         <Card className="lg:col-span-1 bg-zinc-900 border-zinc-800 rounded-[32px] flex flex-col overflow-hidden h-full">
            <CardHeader className="p-6 pb-2 bg-zinc-950/30">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" /> Waiting List
                    </CardTitle>
                    <Badge className="bg-zinc-800 text-white">{QUEUE.length}</Badge>
                </div>
            </CardHeader>
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                    {QUEUE.map((match) => (
                        <div key={match.id} className="group p-4 bg-black border border-zinc-800 hover:border-zinc-600 rounded-[20px] transition-all cursor-grab active:cursor-grabbing hover:shadow-lg">
                            <div className="flex justify-between items-start mb-3">
                                <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px] h-5 px-1.5">{match.id}</Badge>
                                <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 px-2 py-0.5 rounded">{match.category}</span>
                            </div>
                            
                            <div className="space-y-1 mb-3">
                                <div className="font-bold text-white text-sm truncate">{match.pA}</div>
                                <div className="text-[10px] text-zinc-600 font-black uppercase">VS</div>
                                <div className="font-bold text-white text-sm truncate">{match.pB}</div>
                            </div>

                            <div className="flex justify-between items-center pt-2 border-t border-zinc-800">
                                <span className="text-[10px] text-zinc-500 font-bold uppercase">{match.round}</span>
                                <Button size="sm" className="h-7 rounded-full text-[10px] font-bold bg-white text-black hover:bg-zinc-200">
                                    ASSIGN <ArrowRight className="w-3 h-3 ml-1"/>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
         </Card>

         {/* RIGHT: COURTS GRID (3/4) */}
         <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto pr-2 scrollbar-none pb-20">
            {COURTS.map((court) => (
                <div 
                    key={court.id}
                    onClick={() => setSelectedCourt(court)}
                    className={cn(
                        "relative group flex flex-col justify-between p-6 rounded-[32px] border-2 transition-all cursor-pointer hover:-translate-y-1 hover:shadow-2xl min-h-[220px]",
                        getStatusColor(court.status)
                    )}
                >
                    {/* Status Label */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-zinc-950/50 px-3 py-1 rounded-lg border border-white/5 backdrop-blur-md">
                                <span className="font-black text-white uppercase text-sm tracking-wide">{court.name}</span>
                            </div>
                        </div>
                        {court.status === 'LIVE' && <span className="flex h-3 w-3 rounded-full bg-red-600 animate-ping"></span>}
                        {court.status === 'IDLE' && <span className="text-[10px] font-bold text-zinc-500 bg-zinc-900 px-2 py-1 rounded">AVAILABLE</span>}
                    </div>

                    {/* Content */}
                    {court.status === 'IDLE' ? (
                        <div className="flex flex-col items-center justify-center flex-1 text-zinc-600 group-hover:text-zinc-400 transition-colors">
                            <PlusCircleIcon className="w-10 h-10 mb-2 opacity-50" />
                            <span className="text-sm font-bold uppercase tracking-widest">Tap to Assign</span>
                        </div>
                    ) : court.status === 'CLEANING' ? (
                        <div className="flex flex-col items-center justify-center flex-1 text-blue-500">
                            <RefreshCw className="w-10 h-10 mb-2 animate-spin-slow" />
                            <span className="text-sm font-bold uppercase tracking-widest">Cleaning Court</span>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col justify-center space-y-4">
                            {/* Score Board Look */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center bg-black/40 p-2 rounded-xl">
                                    <span className="font-bold text-white text-sm truncate max-w-[100px]">{court.match?.pA}</span>
                                    <span className="text-2xl font-black text-white font-mono">{court.match?.sA}</span>
                                </div>
                                <div className="flex justify-between items-center bg-black/40 p-2 rounded-xl">
                                    <span className="font-bold text-white text-sm truncate max-w-[100px]">{court.match?.pB}</span>
                                    <span className="text-2xl font-black text-zinc-400 font-mono">{court.match?.sB}</span>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center px-1">
                                <Badge variant="outline" className="border-zinc-600 text-zinc-400 text-[10px]">SET {court.match?.set}</Badge>
                                {court.status === 'WARMUP' ? (
                                    <Badge className="bg-yellow-500 text-black hover:bg-yellow-600 animate-pulse border-none">WARMING UP</Badge>
                                ) : (
                                    <div className="flex items-center gap-1 text-red-500 text-xs font-black uppercase">
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div> LIVE
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Hover Action Overlay */}
                    {court.status !== 'IDLE' && (
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-[30px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <Button size="icon" className="rounded-full bg-zinc-800 hover:bg-white hover:text-black h-12 w-12"><Mic2 className="w-5 h-5"/></Button>
                            <Button size="icon" className="rounded-full bg-zinc-800 hover:bg-primary hover:text-white h-12 w-12"><MonitorPlay className="w-5 h-5"/></Button>
                            <Button size="icon" className="rounded-full bg-zinc-800 hover:bg-red-600 hover:text-white h-12 w-12"><Flag className="w-5 h-5"/></Button>
                        </div>
                    )}
                </div>
            ))}
         </div>

      </div>

      {/* --- ASSIGNMENT MODAL --- */}
      <Dialog open={!!selectedCourt} onOpenChange={() => setSelectedCourt(null)}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white rounded-[40px] max-w-md p-0 overflow-hidden shadow-2xl">
            {selectedCourt && (
                <>
                    <div className="p-8 border-b border-zinc-800 bg-zinc-900/50">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black font-headline uppercase flex items-center gap-2">
                                <Trophy className="w-6 h-6 text-orange-500"/> {selectedCourt.name}
                            </DialogTitle>
                            <DialogDescription>
                                {selectedCourt.status === 'IDLE' 
                                    ? "Lapangan kosong. Pilih pertandingan untuk dimulai." 
                                    : "Kontrol pertandingan yang sedang berlangsung."}
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                    
                    <div className="p-8 space-y-6">
                        {selectedCourt.status === 'IDLE' ? (
                            // MODE ASSIGN
                            <>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Pilih Match dari Antrian</label>
                                    <Select onValueChange={setSelectedMatch}>
                                        <SelectTrigger className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl"><SelectValue placeholder="Pilih..." /></SelectTrigger>
                                        <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                            {QUEUE.map(m => (
                                                <SelectItem key={m.id} value={m.id}>
                                                    <span className="font-bold mr-2">{m.id}</span> {m.pA} vs {m.pB}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Umpire</label>
                                        <Select>
                                            <SelectTrigger className="bg-zinc-900 border-zinc-800 h-12 rounded-xl"><SelectValue placeholder="Auto" /></SelectTrigger>
                                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white"><SelectItem value="U1">Budi (INA)</SelectItem></SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Service Judge</label>
                                        <Select>
                                            <SelectTrigger className="bg-zinc-900 border-zinc-800 h-12 rounded-xl"><SelectValue placeholder="Auto" /></SelectTrigger>
                                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white"><SelectItem value="SJ1">Siti (INA)</SelectItem></SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <Button className="w-full h-16 rounded-full font-black text-lg bg-white text-black hover:bg-zinc-200 mt-4 shadow-xl" disabled={!selectedMatch}>
                                    START MATCH <Play className="ml-2 w-5 h-5 fill-current"/>
                                </Button>
                            </>
                        ) : (
                            // MODE CONTROL (Live)
                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" className="h-24 rounded-[24px] border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:text-white flex flex-col gap-2">
                                    <Mic2 className="w-6 h-6 text-blue-500"/>
                                    <span className="text-xs font-bold uppercase">Call Players</span>
                                </Button>
                                <Button variant="outline" className="h-24 rounded-[24px] border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:text-white flex flex-col gap-2">
                                    <AlertCircle className="w-6 h-6 text-yellow-500"/>
                                    <span className="text-xs font-bold uppercase">Fault / Issue</span>
                                </Button>
                                <Button className="col-span-2 h-16 rounded-[24px] bg-red-600 hover:bg-red-700 text-white font-black text-lg">
                                    FINISH MATCH <Flag className="ml-2 w-5 h-5 fill-current"/>
                                </Button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </DialogContent>
      </Dialog>

    </div>
  );
}

// Icon Helper
function PlusCircleIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
    )
}
