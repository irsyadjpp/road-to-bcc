"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, AlertTriangle, ChevronRight } from "lucide-react";

// Komponen Reusable: Match Card
const MatchCard = ({ match, isPersonal }: { match: any, isPersonal?: boolean }) => (
  <Card className="mb-4 rounded-3xl overflow-hidden border-none shadow-m3-1 hover:shadow-m3-3 transition-all relative">
    {/* Status Bar */}
    <div className={`h-1.5 w-full ${match.status === 'live' ? 'bg-red-500 animate-pulse' : 'bg-secondary'}`} />
    
    <div className="p-5">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
           <Badge variant="secondary" className="font-mono text-[10px] rounded-md">
             {match.category}
           </Badge>
           {match.status === 'live' && (
             <Badge className="bg-red-500 text-white border-none animate-pulse text-[10px]">LIVE</Badge>
           )}
        </div>
        <div className="text-right">
          <p className="font-bold text-sm">{match.time}</p>
          <p className="text-[10px] text-muted-foreground">{match.date}</p>
        </div>
      </div>

      {/* Teams */}
      <div className="flex justify-between items-center gap-4">
        <div className="flex-1">
          <p className={`font-headline text-lg leading-tight ${match.isMe ? 'text-primary' : ''}`}>
            {match.teamA}
          </p>
          <p className="text-xs text-muted-foreground">{match.clubA}</p>
        </div>
        <div className="font-mono font-bold text-muted-foreground/50 text-xl">VS</div>
        <div className="flex-1 text-right">
          <p className="font-headline text-lg leading-tight">{match.teamB}</p>
          <p className="text-xs text-muted-foreground">{match.clubB}</p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-4 border-t border-dashed flex justify-between items-center">
        <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
          <MapPin size={14} /> Court {match.court}
        </div>
        
        {/* Conflict Warning (Fitur Unik) */}
        {match.conflict && isPersonal && (
           <div className="flex items-center gap-1 text-[10px] text-orange-600 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-full font-bold">
             <AlertTriangle size={12} />
             Jadwal Berdekatan!
           </div>
        )}
      </div>
    </div>
  </Card>
);

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-background pb-24 px-4 pt-8">
      <div className="flex justify-between items-center mb-6 px-2">
        <h1 className="font-headline text-3xl">MATCH <span className="text-outline text-foreground">DAY</span></h1>
        <Button variant="ghost" size="icon" className="rounded-full bg-secondary/50">
           <CalendarDays className="h-5 w-5" />
        </Button>
      </div>

      <Tabs defaultValue="mine" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-secondary/50 rounded-full p-1 h-12 mb-6">
          <TabsTrigger value="mine" className="rounded-full font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">My Schedule</TabsTrigger>
          <TabsTrigger value="all" className="rounded-full font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">All Matches</TabsTrigger>
        </TabsList>

        <TabsContent value="mine" className="animate-in slide-in-from-bottom-5 duration-500">
          <div className="mb-4">
             <h3 className="text-sm font-bold text-muted-foreground mb-3 px-2">UPCOMING</h3>
             <MatchCard 
               isPersonal={true}
               match={{
                 category: "MD - Intermediate",
                 time: "10:20", date: "Today",
                 teamA: "Irsyad / Kevin", clubA: "PB Exist", isMe: true,
                 teamB: "Ahsan / Hendra", clubB: "PB Djarum",
                 court: 2,
                 conflict: true // Simulasi konflik jadwal
               }} 
             />
             <MatchCard 
               isPersonal={true}
               match={{
                 category: "MS - Beginner",
                 time: "11:00", date: "Today",
                 teamA: "Irsyad JPP", clubA: "PB Exist", isMe: true,
                 teamB: "Anthony Ginting", clubB: "SGS PLN",
                 court: 4
               }} 
             />
          </div>
        </TabsContent>

        <TabsContent value="all">
          <div className="text-center py-10 text-muted-foreground">
            <p>Load all tournament matches...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}