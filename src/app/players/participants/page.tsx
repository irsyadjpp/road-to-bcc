"use client";

import { useState } from "react";
import { 
  Search, Filter, Trophy, Zap, 
  MapPin, User, Users, ChevronRight, Swords 
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// --- MOCK DATA ---
const PLAYERS = [
  {
    id: 1,
    name: "Kevin Sanjaya",
    code: "BCC-25-001",
    club: "PB. Djarum",
    level: "Pro",
    tier: 1,
    winRate: 88,
    matches: 42,
    avatar: "KS",
    rank: 1,
  },
  {
    id: 2,
    name: "Irsyad JPP",
    code: "BCC-25-882",
    club: "PB. Exist",
    level: "Intermediate",
    tier: 2,
    winRate: 65,
    matches: 12,
    avatar: "IJ",
    rank: 42,
  },
  {
    id: 3,
    name: "Rian Ardianto",
    code: "BCC-25-005",
    club: "Jaya Raya",
    level: "Advance",
    tier: 1,
    winRate: 72,
    matches: 35,
    avatar: "RA",
    rank: 8,
  },
  {
    id: 4,
    name: "Beginner Player",
    code: "BCC-25-100",
    club: "Independen",
    level: "Beginner",
    tier: 3,
    winRate: 40,
    matches: 5,
    avatar: "BP",
    rank: 150,
  },
];

export default function ParticipantListPage() {
  const [activeTab, setActiveTab] = useState("players");

  return (
    <div className="min-h-screen bg-background pb-24 space-y-8 px-4 md:px-8 pt-6">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="font-headline text-3xl md:text-5xl tracking-tighter uppercase">
            Tournament <span className="text-primary text-outline">Roster</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium mt-2">
            Scouting lawan potensial dan cari partner idealmu di sini.
          </p>
        </div>
        
        {/* Total Stats Pill */}
        <div className="bg-card border border-border rounded-full px-6 py-2 flex items-center gap-6 shadow-sm">
          <div className="text-center">
             <p className="text-[10px] uppercase font-bold text-muted-foreground">Total Players</p>
             <p className="font-headline text-xl leading-none">248</p>
          </div>
          <div className="w-px h-8 bg-border"></div>
          <div className="text-center">
             <p className="text-[10px] uppercase font-bold text-muted-foreground">Teams Ready</p>
             <p className="font-headline text-xl leading-none text-primary">64</p>
          </div>
        </div>
      </div>

      {/* 2. SEARCH & FILTER BAR (Sticky / Floating) */}
      <div className="sticky top-20 z-30 bg-background/80 backdrop-blur-xl p-2 rounded-[2rem] border border-white/10 shadow-m3-3 flex flex-col md:flex-row gap-2">
         {/* Search Input */}
         <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input 
               placeholder="Cari nama, klub, atau kode atlet..." 
               className="pl-12 h-12 rounded-[1.5rem] bg-secondary/50 border-transparent focus:border-primary text-base"
            />
         </div>

         {/* Filter Toggles */}
         <Tabs defaultValue="players" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="grid w-full grid-cols-2 h-12 rounded-[1.5rem] bg-secondary/50 p-1">
               <TabsTrigger value="players" className="rounded-[1.2rem] font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <User size={16} className="mr-2" /> Players
               </TabsTrigger>
               <TabsTrigger value="teams" className="rounded-[1.2rem] font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Users size={16} className="mr-2" /> Teams
               </TabsTrigger>
            </TabsList>
         </Tabs>

         <Button size="icon" variant="outline" className="h-12 w-12 rounded-full border-2 hover:bg-secondary shrink-0">
            <Filter size={20} />
         </Button>
      </div>

      {/* 3. GRID CONTENT (Player Cards) */}
      <TabsContent value="players" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
           {PLAYERS.map((player) => (
              <PlayerCard key={player.id} player={player} />
           ))}
        </div>
      </TabsContent>

      <TabsContent value="teams" className="mt-0">
         <div className="h-64 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-muted-foreground/20 rounded-[2rem]">
            <Users size={48} className="text-muted-foreground mb-4 opacity-50" />
            <h3 className="font-headline text-xl">Team Roster</h3>
            <p className="text-muted-foreground text-sm">Fitur daftar tim akan muncul setelah fase pendaftaran ditutup.</p>
         </div>
      </TabsContent>

    </div>
  );
}

// --- SUB-COMPONENT: PLAYER TRADING CARD ---
function PlayerCard({ player }: { player: any }) {
   // Logic warna berdasarkan Level
   const getLevelColor = (level: string) => {
      switch(level) {
         case 'Pro': return 'from-purple-500/20 to-blue-500/5 border-purple-500/30';
         case 'Advance': return 'from-red-500/20 to-orange-500/5 border-red-500/30';
         default: return 'from-green-500/20 to-emerald-500/5 border-green-500/30';
      }
   };

   return (
      <Card className={`group relative overflow-hidden rounded-[2rem] border-2 transition-all duration-300 hover:shadow-m3-3 hover:scale-[1.02] bg-gradient-to-br ${getLevelColor(player.level)} bg-card`}>
         
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Trophy size={120} />
         </div>

         <CardContent className="p-0">
            {/* Top Section: Avatar & Rank */}
            <div className="p-6 pb-0 flex justify-between items-start relative z-10">
               <Avatar className="h-20 w-20 border-4 border-background shadow-xl">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${player.avatar}`} />
                  <AvatarFallback>{player.avatar}</AvatarFallback>
               </Avatar>
               
               <div className="text-right">
                  <Badge variant="outline" className="mb-1 backdrop-blur-md bg-background/50">
                     RANK #{player.rank}
                  </Badge>
                  <p className="font-mono text-xs opacity-60 tracking-wider">{player.code}</p>
               </div>
            </div>

            {/* Middle Section: Info */}
            <div className="p-6 pt-4 relative z-10">
               <h3 className="font-headline text-2xl leading-none mb-1 group-hover:text-primary transition-colors">
                  {player.name}
               </h3>
               <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium mb-4">
                  <MapPin size={14} className="text-primary" />
                  {player.club}
               </div>

               {/* Stats Grid */}
               <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-3 border border-border/50">
                     <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Win Rate</p>
                     <div className="flex items-end gap-1">
                        <span className={`font-headline text-xl ${player.winRate >= 70 ? 'text-green-500' : 'text-foreground'}`}>
                           {player.winRate}%
                        </span>
                        <Zap size={14} className="mb-1 text-yellow-500 fill-yellow-500" />
                     </div>
                     <Progress value={player.winRate} className="h-1 mt-2" />
                  </div>

                  <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-3 border border-border/50">
                     <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Level</p>
                     <p className="font-headline text-lg truncate">{player.level}</p>
                     <p className="text-[10px] text-muted-foreground">Tier {player.tier}</p>
                  </div>
               </div>

               {/* Action Button (Hidden by default, shown on group hover/focus or keep visible but subtle) */}
               <Button className="w-full rounded-pill font-bold shadow-lg shadow-primary/10 group-hover:bg-primary group-hover:text-white transition-colors bg-secondary text-foreground">
                  View Profile <ChevronRight size={16} className="ml-1" />
               </Button>
            </div>
         </CardContent>
      </Card>
   );
}