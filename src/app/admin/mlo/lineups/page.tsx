'use client';

import { useState } from "react";
import { 
  ClipboardList, Users, Clock, AlertTriangle, 
  CheckCircle2, Lock, Unlock, ChevronRight, 
  Save, AlertCircle, User
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const TEAM_MATCHES = [
  { 
    id: "TM-01", 
    category: "BEREGU PUTRA", 
    round: "Quarter Final",
    teamA: "PB Djarum", 
    teamB: "PB Jaya Raya", 
    time: "14:00", 
    status: "OPEN", // OPEN, SUBMITTED, LOCKED
    deadline: "10:00 AM (4h before)"
  },
  { 
    id: "TM-02", 
    category: "BEREGU CAMPURAN", 
    round: "Semi Final",
    teamA: "SGS PLN", 
    teamB: "Exist Jakarta", 
    time: "16:00", 
    status: "LOCKED", 
    deadline: "12:00 PM"
  },
];

const ROSTER_A = [
  { id: "P1", name: "Kevin Sanjaya", rank: 1 },
  { id: "P2", name: "Marcus Gideon", rank: 2 },
  { id: "P3", name: "Praveen Jordan", rank: 3 },
  { id: "P4", name: "Melati Daeva", rank: 4 },
  { id: "P5", name: "Moh. Ahsan", rank: 5 },
  { id: "P6", name: "Hendra Setiawan", rank: 6 },
];

const MATCH_SLOTS = [
  { id: 1, label: "1st Singles (MS1)", type: "S" },
  { id: 2, label: "1st Doubles (MD1)", type: "D" },
  { id: 3, label: "2nd Singles (MS2)", type: "S" },
];

export default function LineupVerificationPage() {
  const [selectedMatch, setSelectedMatch] = useState<typeof TEAM_MATCHES[0] | null>(null);
  const [lineup, setLineup] = useState<{ [key: number]: string[] }>({});

  const handleSelectPlayer = (slotId: number, playerIndex: number, playerId: string) => {
    setLineup(prev => {
      const currentSlot = prev[slotId] || [];
      const newSlot = [...currentSlot];
      newSlot[playerIndex] = playerId;
      return { ...prev, [slotId]: newSlot };
    });
  };

  return (
    <div className="space-y-6 p-4 md:p-6 font-body pb-24 h-[calc(100vh-64px)] flex flex-col">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-indigo-500 text-indigo-500 bg-indigo-500/10 backdrop-blur-md">
                    <ClipboardList className="w-3 h-3 mr-2" /> ORDER OF PLAY
                </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-white">
                Line-Up <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600">Tactics</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Verifikasi susunan pemain beregu sebelum batas waktu pengumpulan.
            </p>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
         
         {/* LEFT: MATCH LIST (1/3) */}
         <Card className="lg:col-span-1 bg-zinc-900 border-zinc-800 rounded-[32px] flex flex-col overflow-hidden h-full shadow-2xl">
            <div className="p-6 pb-2 border-b border-zinc-800 bg-zinc-950/50">
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <Users className="w-4 h-4 text-indigo-500"/> Team Matches
                </h3>
            </div>
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                    {TEAM_MATCHES.map((match) => (
                        <div 
                            key={match.id} 
                            onClick={() => setSelectedMatch(match)}
                            className={cn(
                                "group relative p-5 rounded-[24px] border-2 transition-all cursor-pointer hover:bg-zinc-800",
                                selectedMatch?.id === match.id ? "bg-zinc-800 border-indigo-500/50 shadow-lg" : "bg-zinc-950 border-zinc-800 hover:border-zinc-700"
                            )}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <Badge variant="secondary" className="bg-zinc-900 text-zinc-400 border border-zinc-700 text-[10px]">
                                    {match.category}
                                </Badge>
                                <div className={cn("flex items-center gap-1 text-[10px] font-black uppercase", 
                                    match.status === 'LOCKED' ? "text-red-500" : "text-green-500"
                                )}>
                                    {match.status === 'LOCKED' ? <Lock className="w-3 h-3"/> : <Unlock className="w-3 h-3"/>}
                                    {match.status}
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between gap-2 mb-3">
                                <div className="text-sm font-bold text-white truncate max-w-[40%]">{match.teamA}</div>
                                <div className="text-[10px] font-black text-zinc-600">VS</div>
                                <div className="text-sm font-bold text-white truncate max-w-[40%] text-right">{match.teamB}</div>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono bg-black/20 p-2 rounded-lg border border-zinc-800/50">
                                <Clock className="w-3 h-3 text-indigo-500" /> 
                                <span>Deadline: <strong className="text-zinc-300">{match.deadline}</strong></span>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
         </Card>

         {/* RIGHT: TACTICAL BOARD (2/3) */}
         <div className="lg:col-span-2 h-full">
            {selectedMatch ? (
                <Card className="bg-zinc-950 border-zinc-800 rounded-[32px] h-full flex flex-col overflow-hidden shadow-2xl relative">
                    
                    {/* Header Detail */}
                    <div className="p-8 border-b border-zinc-800 bg-zinc-900/30 flex justify-between items-center">
                        <div>
                            <Badge variant="outline" className="mb-2 border-zinc-700 text-zinc-400 font-mono">
                                MATCH {selectedMatch.id}
                            </Badge>
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                                {selectedMatch.teamA} <span className="text-zinc-600">vs</span> {selectedMatch.teamB}
                            </h2>
                        </div>
                        <div className="text-right hidden md:block">
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Selected Team</p>
                            <Tabs defaultValue="teamA" className="mt-1">
                                <TabsList className="bg-zinc-900 border border-zinc-800 h-10 rounded-full p-1">
                                    <TabsTrigger value="teamA" className="rounded-full text-xs h-8 px-4 font-bold data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                                        {selectedMatch.teamA}
                                    </TabsTrigger>
                                    <TabsTrigger value="teamB" className="rounded-full text-xs h-8 px-4 font-bold data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                                        {selectedMatch.teamB}
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </div>

                    <ScrollArea className="flex-1 bg-zinc-950/50 p-8">
                        <div className="space-y-6">
                            
                            {/* Slots Builder */}
                            {MATCH_SLOTS.map((slot) => (
                                <div key={slot.id} className="bg-zinc-900 border border-zinc-800 rounded-[24px] p-6 relative overflow-hidden group">
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500"></div>
                                    
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pl-4">
                                        <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                                            <span className="text-indigo-500 text-2xl opacity-50">0{slot.id}</span> {slot.label}
                                        </h3>
                                        <Badge className="bg-zinc-950 border-zinc-800 text-zinc-500 w-fit">
                                            {slot.type === 'S' ? "1 Player Required" : "2 Players Required"}
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4">
                                        {/* Player 1 Slot */}
                                        <Select onValueChange={(val) => handleSelectPlayer(slot.id, 0, val)}>
                                            <SelectTrigger className="h-14 bg-black border-zinc-800 rounded-2xl text-white font-bold hover:border-indigo-500/50 transition-colors">
                                                <SelectValue placeholder="Select Player 1" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                                {ROSTER_A.map((p) => (
                                                    <SelectItem key={p.id} value={p.id} disabled={Object.values(lineup).flat().includes(p.id)}>
                                                        <span className="font-bold">{p.name}</span> <span className="text-zinc-500 text-xs ml-2">(Rank {p.rank})</span>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        {/* Player 2 Slot (Only for Doubles) */}
                                        {slot.type === 'D' && (
                                            <Select onValueChange={(val) => handleSelectPlayer(slot.id, 1, val)}>
                                                <SelectTrigger className="h-14 bg-black border-zinc-800 rounded-2xl text-white font-bold hover:border-indigo-500/50 transition-colors">
                                                    <SelectValue placeholder="Select Player 2" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                                    {ROSTER_A.map((p) => (
                                                        <SelectItem key={p.id} value={p.id} disabled={Object.values(lineup).flat().includes(p.id)}>
                                                            <span className="font-bold">{p.name}</span> <span className="text-zinc-500 text-xs ml-2">(Rank {p.rank})</span>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Validation Info */}
                            <div className="bg-indigo-900/10 border border-indigo-500/20 p-4 rounded-2xl flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0"/>
                                <div>
                                    <h4 className="text-indigo-400 text-xs font-bold uppercase mb-1">Strength Order Check</h4>
                                    <p className="text-indigo-200/70 text-xs leading-relaxed">
                                        Sistem otomatis memvalidasi urutan kekuatan (Strength Order) berdasarkan ranking poin pemain. Line-up tidak dapat disubmit jika melanggar aturan PBSI.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </ScrollArea>

                    {/* Action Bar (Sticky) */}
                    <div className="p-6 border-t border-zinc-800 bg-zinc-900/80 backdrop-blur-md flex justify-between items-center">
                        <div className="text-xs text-zinc-500 font-medium">
                            Status: <span className="text-white font-bold uppercase">{selectedMatch.status}</span>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="ghost" className="h-12 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 font-bold">
                                Save Draft
                            </Button>
                            <Button disabled={selectedMatch.status === 'LOCKED'} className="h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-900/20 px-8">
                                {selectedMatch.status === 'LOCKED' ? <Lock className="w-4 h-4 mr-2"/> : <CheckCircle2 className="w-4 h-4 mr-2"/>}
                                SUBMIT LINE-UP
                            </Button>
                        </div>
                    </div>

                </Card>
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-zinc-600 bg-zinc-900/50 rounded-[32px] border border-zinc-800 border-dashed">
                    <ClipboardList className="w-20 h-20 mb-4 opacity-20 animate-pulse"/>
                    <p className="font-bold uppercase tracking-widest text-lg">Select Match to Configure</p>
                </div>
            )}
         </div>

      </div>
    </div>
  );
}
