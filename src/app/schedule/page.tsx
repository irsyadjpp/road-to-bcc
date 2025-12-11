
'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Search, Trophy, Users, Wind } from 'lucide-react';
import { CourtLines } from '@/components/ui/court-lines';
import { cn } from '@/lib/utils';

// --- MOCK DATA ---
const SCHEDULE_DATA = [
  // Court 1
  { id: 'M101', court: 'Court 1', time: '09:00', category: 'MD OPEN', pA: 'Kevin S / Marcus G', pB: 'Ahsan / Hendra', status: 'FINISHED' },
  { id: 'M102', court: 'Court 1', time: '09:45', category: 'MS PRO', pA: 'Anthony Ginting', pB: 'Jonatan Christie', status: 'LIVE' },
  { id: 'M103', court: 'Court 1', time: '10:30', category: 'WD OPEN', pA: 'Apriyani R / Siti Fadia', pB: 'Nami M / Chiharu S', status: 'UPCOMING' },
  { id: 'M104', court: 'Court 1', time: '11:15', category: 'XD BEGINNER', pA: 'Budi / Ani', pB: 'Joko / Wati', status: 'UPCOMING' },

  // Court 2
  { id: 'M201', court: 'Court 2', time: '09:00', category: 'MD INTERMEDIATE', pA: 'Fajar A / Rian A', pB: 'Leo C / Daniel M', status: 'FINISHED' },
  { id: 'M202', court: 'Court 2', time: '09:45', category: 'WS BEGINNER', pA: 'Susi Susanti KW', pB: 'Mia Audina KW', status: 'FINISHED' },
  { id: 'M203', court: 'Court 2', time: '10:30', category: 'MS ADVANCE', pA: 'Taufik Hidayat', pB: 'Lee Chong Wei', status: 'LIVE' },
  { id: 'M204', court: 'Court 2', time: '11:15', category: 'MD BEGINNER', pA: 'Tim A', pB: 'Tim B', status: 'UPCOMING' },

  // Court 3
  { id: 'M301', court: 'Court 3', time: '09:15', category: 'XD INTERMEDIATE', pA: 'Praveen J / Melati D', pB: 'Rinov R / Pitha H', status: 'FINISHED' },
  { id: 'M302', court: 'Court 3', time: '10:00', category: 'MD BEGINNER', pA: 'Tim C', pB: 'Tim D', status: 'LIVE' },
  { id: 'M303', court: 'Court 3', time: '10:45', category: 'WS ADVANCE', pA: 'Gregoria M', pB: 'Putri KW', status: 'UPCOMING' },

  // Court 4
  { id: 'M401', court: 'Court 4', time: '09:15', category: 'MS BEGINNER', pA: 'Udin', pB: 'Asep', status: 'FINISHED' },
  { id: 'M402', court: 'Court 4', time: '10:00', category: 'WD INTERMEDIATE', pA: 'Pasangan X', pB: 'Pasangan Y', status: 'UPCOMING' },
];

const COURTS = ['Court 1', 'Court 2', 'Court 3', 'Court 4'];

export default function SchedulePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSchedule = useMemo(() => {
    if (!searchTerm) {
      return SCHEDULE_DATA;
    }
    return SCHEDULE_DATA.filter(match =>
      match.pA.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.pB.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);
  
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'LIVE': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'FINISHED': return 'bg-zinc-800 text-zinc-500 border-zinc-700';
      default: return 'bg-background/50 border-border/20';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-24 pb-20 relative">
        <div className="absolute inset-0 pointer-events-none opacity-5">
           <CourtLines />
        </div>
        <div className="absolute -top-1/4 left-0 w-full h-1/2 bg-gradient-to-br from-primary/10 via-transparent to-transparent blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
             <Badge variant="outline" className="mb-4 px-4 py-1.5 border-primary/50 text-primary bg-primary/10 font-bold tracking-widest uppercase">
              Order of Play
             </Badge>
             <h1 className="text-5xl md:text-7xl font-black font-headline uppercase tracking-tighter mb-6">
                Jadwal Hari Ini
             </h1>
          </div>

          <div className="sticky top-20 z-20 mb-8 p-2 bg-background/80 backdrop-blur-md rounded-full border border-border/50 max-w-lg mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Cari nama pemain, klub, atau kategori..."
                className="w-full h-12 pl-12 rounded-full border-none bg-transparent focus-visible:ring-2 focus-visible:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {COURTS.map(courtName => (
              <div key={courtName} className="space-y-4">
                <h3 className="font-bold text-lg text-center font-headline uppercase tracking-wider text-primary border-b-2 border-primary/20 pb-2">
                  {courtName}
                </h3>
                <div className="space-y-4">
                  {filteredSchedule.filter(m => m.court === courtName).length > 0 ? (
                    filteredSchedule.filter(m => m.court === courtName).map(match => (
                      <Card key={match.id} className={cn("p-4 rounded-2xl transition-all hover:shadow-lg hover:-translate-y-1", getStatusStyle(match.status))}>
                        <div className="flex justify-between items-center mb-3 text-xs">
                          <Badge variant="secondary" className="font-mono bg-background text-foreground/70">{match.time}</Badge>
                          <Badge variant="outline" className="border-border/50 text-muted-foreground">{match.category}</Badge>
                        </div>
                        <div className="space-y-1.5 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            <p className="font-bold truncate text-foreground">{match.pA}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                            <p className="font-bold truncate text-foreground">{match.pB}</p>
                          </div>
                        </div>
                         {match.status === 'LIVE' && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse"/>}
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-10 text-muted-foreground text-sm border-2 border-dashed rounded-2xl">
                      Tidak ada jadwal.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
