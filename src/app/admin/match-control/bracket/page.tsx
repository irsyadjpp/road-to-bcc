
'use client';

import { useState } from "react";
import { 
  Trophy, Search, ZoomIn, ZoomOut, 
  Download, Share2, Crown, Users, 
  Maximize, MoreHorizontal, ChevronRight 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const CATEGORIES = ["MD OPEN", "MS PRO", "WD OPEN", "XD OPEN"];

const BRACKET_DATA = {
  quarterFinals: [
    { id: "Q1", pA: "Kevin / Marcus", pB: "Chia / Soh", sA: 2, sB: 0, status: "DONE", winner: "A" },
    { id: "Q2", pA: "Fajar / Rian", pB: "Rankireddy / Shetty", sA: 1, sB: 2, status: "DONE", winner: "B" },
    { id: "Q3", pA: "Ahsan / Hendra", pB: "Liu / Ou", sA: 2, sB: 1, status: "DONE", winner: "A" },
    { id: "Q4", pA: "Leo / Daniel", pB: "Alfian / Ardianto", sA: 0, sB: 0, status: "LIVE", winner: null },
  ],
  semiFinals: [
    { id: "S1", pA: "Kevin / Marcus", pB: "Rankireddy / Shetty", sA: 0, sB: 0, status: "SCHEDULED", winner: null },
    { id: "S2", pA: "Ahsan / Hendra", pB: "TBD", sA: 0, sB: 0, status: "SCHEDULED", winner: null },
  ],
  final: [
    { id: "F1", pA: "TBD", pB: "TBD", sA: 0, sB: 0, status: "SCHEDULED", winner: null },
  ],
  champion: null
};

export default function BracketPage() {
  const [activeTab, setActiveTab] = useState("MD OPEN");
  const [zoom, setZoom] = useState(100);

  return (
    <div className="space-y-6 p-4 md:p-8 font-body pb-24 h-[calc(100vh-64px)] flex flex-col">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-yellow-500 text-yellow-500 bg-yellow-500/10 backdrop-blur-md">
                    <Crown className="w-3 h-3 mr-2 fill-yellow-500" /> CHAMPIONSHIP ROAD
                </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-white">
                Tournament <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">Bracket</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Visualisasi bagan pertandingan menuju juara.
            </p>
        </div>

        <div className="flex gap-3">
            <Button variant="outline" className="h-12 rounded-full border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800">
                <Share2 className="mr-2 w-4 h-4"/> Share Link
            </Button>
            <Button className="h-12 rounded-full px-6 bg-yellow-500 hover:bg-yellow-600 text-black font-bold shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                <Download className="mr-2 w-4 h-4"/> EXPORT PDF
            </Button>
        </div>
      </div>

      {/* --- CONTROLS BAR --- */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-zinc-900/50 p-2 rounded-[24px] border border-zinc-800/50 backdrop-blur-sm shrink-0">
         
         {/* Category Tabs */}
         <ScrollArea className="w-full md:w-auto max-w-full">
             <div className="flex gap-2 p-1">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveTab(cat)}
                        className={cn(
                            "px-6 h-10 rounded-full text-sm font-bold transition-all whitespace-nowrap border border-transparent",
                            activeTab === cat 
                                ? "bg-zinc-800 text-white border-zinc-700 shadow-md" 
                                : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
                        )}
                    >
                        {cat}
                    </button>
                ))}
             </div>
             <ScrollBar orientation="horizontal" className="invisible"/>
         </ScrollArea>

         {/* Zoom Controls */}
         <div className="flex items-center gap-2 bg-zinc-950 p-1.5 rounded-full border border-zinc-800">
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-zinc-800" onClick={() => setZoom(Math.max(50, zoom - 10))}>
                <ZoomOut className="w-4 h-4"/>
            </Button>
            <span className="text-xs font-mono font-bold w-12 text-center text-zinc-400">{zoom}%</span>
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-zinc-800" onClick={() => setZoom(Math.min(150, zoom + 10))}>
                <ZoomIn className="w-4 h-4"/>
            </Button>
            <div className="w-[1px] h-4 bg-zinc-800 mx-1"></div>
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-zinc-800">
                <Maximize className="w-4 h-4"/>
            </Button>
         </div>
      </div>

      {/* --- BRACKET CANVAS --- */}
      <div className="flex-1 bg-zinc-950 rounded-[32px] border border-zinc-800 relative overflow-hidden shadow-inner">
         
         {/* Background Grid Texture */}
         <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] opacity-5 pointer-events-none" style={{ backgroundSize: '40px 40px' }}></div>
         
         <ScrollArea className="w-full h-full">
            <div 
                className="min-w-max min-h-full flex items-center justify-center p-20 transition-transform duration-300 ease-out origin-top-left"
                style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center top' }}
            >
                
                <div className="flex gap-16 items-center">
                    
                    {/* COLUMN 1: QUARTER FINALS */}
                    <div className="flex flex-col gap-12 justify-center">
                        <BracketHeader title="Quarter Final" />
                        <div className="flex flex-col gap-16"> {/* Gap antar grup match */}
                            {/* Group 1 */}
                            <div className="flex flex-col gap-6">
                                <BracketMatch data={BRACKET_DATA.quarterFinals[0]} />
                                <BracketMatch data={BRACKET_DATA.quarterFinals[1]} />
                            </div>
                            {/* Group 2 */}
                            <div className="flex flex-col gap-6">
                                <BracketMatch data={BRACKET_DATA.quarterFinals[2]} />
                                <BracketMatch data={BRACKET_DATA.quarterFinals[3]} />
                            </div>
                        </div>
                    </div>

                    {/* CONNECTORS 1 */}
                    <BracketConnector type="quarter" />

                    {/* COLUMN 2: SEMI FINALS */}
                    <div className="flex flex-col gap-12 justify-center mt-8"> {/* mt untuk align center */}
                        <BracketHeader title="Semi Final" />
                        <div className="flex flex-col gap-[280px]"> {/* Gap besar antar match semi */}
                            <BracketMatch data={BRACKET_DATA.semiFinals[0]} isSemi />
                            <BracketMatch data={BRACKET_DATA.semiFinals[1]} isSemi />
                        </div>
                    </div>

                    {/* CONNECTORS 2 */}
                    <BracketConnector type="semi" />

                    {/* COLUMN 3: FINAL */}
                    <div className="flex flex-col gap-12 justify-center mt-8">
                        <div className="flex flex-col items-center gap-6">
                            <Trophy className="w-16 h-16 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)] animate-pulse-slow" />
                            <BracketHeader title="Grand Final" isFinal />
                            <BracketMatch data={BRACKET_DATA.final[0]} isFinal />
                        </div>
                    </div>

                </div>

            </div>
            <ScrollBar orientation="horizontal" />
            <ScrollBar orientation="vertical" />
         </ScrollArea>
      </div>

    </div>
  );
}

// --- SUB COMPONENTS ---

function BracketHeader({ title, isFinal }: { title: string, isFinal?: boolean }) {
    return (
        <div className={cn(
            "text-center mb-4 uppercase tracking-widest font-black text-sm",
            isFinal ? "text-yellow-500" : "text-zinc-500"
        )}>
            {title}
        </div>
    )
}

function BracketMatch({ data, isSemi, isFinal }: { data: any, isSemi?: boolean, isFinal?: boolean }) {
    return (
        <div className={cn(
            "relative w-[280px] bg-zinc-900 rounded-[20px] border transition-all duration-300 group cursor-pointer hover:scale-105 hover:z-10",
            data.status === 'LIVE' ? "border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.2)]" : 
            isFinal ? "border-yellow-500/50 bg-gradient-to-b from-zinc-900 to-black" :
            "border-zinc-800 hover:border-zinc-600"
        )}>
            {/* Match Info Header */}
            <div className="flex justify-between items-center px-4 py-2 border-b border-zinc-800/50 bg-black/20 rounded-t-[20px]">
                <span className="text-[10px] font-bold text-zinc-500">{data.id}</span>
                {data.status === 'LIVE' ? (
                    <span className="text-[9px] font-black text-green-500 uppercase tracking-wider animate-pulse">● LIVE</span>
                ) : (
                    <span className="text-[9px] font-bold text-zinc-600 uppercase">{data.status}</span>
                )}
            </div>

            <div className="p-4 space-y-3">
                {/* Player A */}
                <div className={cn("flex justify-between items-center p-2 rounded-lg transition-colors", data.winner === 'A' ? "bg-green-500/10" : "")}>
                    <div className="flex items-center gap-3 overflow-hidden">
                        {data.winner === 'A' && <Crown className="w-3 h-3 text-yellow-500 shrink-0" />}
                        <span className={cn("text-sm font-bold truncate", data.winner === 'A' ? "text-white" : "text-zinc-400")}>
                            {data.pA}
                        </span>
                    </div>
                    <span className={cn("font-mono font-black text-lg", data.winner === 'A' ? "text-green-400" : "text-zinc-600")}>
                        {data.sA}
                    </span>
                </div>

                {/* VS Divider */}
                {/* <div className="h-[1px] w-full bg-zinc-800/50"></div> */}

                {/* Player B */}
                <div className={cn("flex justify-between items-center p-2 rounded-lg transition-colors", data.winner === 'B' ? "bg-green-500/10" : "")}>
                    <div className="flex items-center gap-3 overflow-hidden">
                        {data.winner === 'B' && <Crown className="w-3 h-3 text-yellow-500 shrink-0" />}
                        <span className={cn("text-sm font-bold truncate", data.winner === 'B' ? "text-white" : "text-zinc-400")}>
                            {data.pB}
                        </span>
                    </div>
                    <span className="font-mono font-black text-lg text-zinc-600">
                        {data.sB}
                    </span>
                </div>
            </div>

            {/* Final Glow */}
            {isFinal && <div className="absolute inset-0 border-2 border-yellow-500/20 rounded-[20px] pointer-events-none"></div>}
        </div>
    )
}

function BracketConnector({ type }: { type: 'quarter' | 'semi' }) {
    if (type === 'quarter') {
        return (
            <div className="flex flex-col gap-16 py-12"> {/* Adjust height to match cards */}
               <div className="flex flex-col justify-center h-[280px]"> {/* Height of 2 matches + gap */}
                   <div className="w-8 border-y-2 border-r-2 border-zinc-700 h-[50%] rounded-r-2xl translate-y-[25%] opacity-30"></div>
                   <div className="w-8 h-[2px] bg-zinc-700 self-end opacity-30"></div>
               </div>
               <div className="flex flex-col justify-center h-[280px]">
                   <div className="w-8 border-y-2 border-r-2 border-zinc-700 h-[50%] rounded-r-2xl translate-y-[25%] opacity-30"></div>
                   <div className="w-8 h-[2px] bg-zinc-700 self-end opacity-30"></div>
               </div>
            </div>
        )
    }
    
    // Semi Final Connector
    return (
        <div className="flex flex-col justify-center h-[500px]">
             <div className="w-8 border-y-2 border-r-2 border-zinc-700 h-[50%] rounded-r-2xl translate-y-[25%] opacity-30"></div>
             <div className="w-8 h-[2px] bg-zinc-700 self-end opacity-30"></div>
        </div>
    )
}

    