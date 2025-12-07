
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Megaphone, CheckCircle2, Clock, Users, ClipboardCheck, Send } from "lucide-react";
import { getCallRoomQueue, updateMatchStatus } from "../actions";
import { useToast } from "@/hooks/use-toast";

export default function MloDashboard() {
  const { toast } = useToast();
  const [queue, setQueue] = useState<any[]>([]);

  useEffect(() => {
    getCallRoomQueue().then(setQueue);
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    await updateMatchStatus(id, newStatus);
    setQueue(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
    
    if (newStatus === 'CALLED') {
        toast({ title: "Panggilan Diumumkan", description: `Tim Match #${id} dipanggil ke Call Room.` });
    } else if (newStatus === 'READY') {
        toast({ title: "Siap Masuk Lapangan", description: `Match #${id} siap diterjunkan.`, className: "bg-green-600 text-white" });
    }
  };

  const KanbanColumn = ({ title, icon, items, status, children }: { title: string, icon: React.ReactNode, items: any[], status: string, children: React.ReactNode }) => (
    <div className="flex-1 min-w-[300px] h-full">
        <div className="flex items-center gap-2 mb-4">
            {icon}
            <h3 className="font-bold uppercase tracking-wider text-sm text-muted-foreground">{title} ({items.length})</h3>
        </div>
        <div className="space-y-3 h-full">
            {children}
            {items.length === 0 && (
                <div className="h-48 flex items-center justify-center text-sm text-muted-foreground border-2 border-dashed rounded-xl">
                    Kosong
                </div>
            )}
        </div>
    </div>
  );

  return (
    <div className="space-y-6 flex flex-col h-full">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-bold font-headline text-primary">MLO Command Post</h2>
            <p className="text-muted-foreground">Manajemen Call Room & Kesiapan Atlet.</p>
        </div>
        <Button variant="outline" className="gap-2" onClick={() => window.location.href='/admin/mlo/lineups'}>
            <ClipboardCheck className="w-4 h-4" /> Verifikasi Line-Up
        </Button>
      </div>

      <div className="flex-grow flex flex-col md:flex-row gap-6">
        
        {/* KOLOM 1: MENUNGGU (WAITING) */}
        <KanbanColumn title="Menunggu Panggilan" icon={<Clock className="w-5 h-5 text-stone-500"/>} items={queue.filter(m => m.status === 'WAITING')} status="WAITING">
            {queue.filter(m => m.status === 'WAITING').map(match => (
                <Card key={match.id} className="bg-card shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                            <Badge variant="outline">{match.id}</Badge>
                            <span className="text-xs font-mono text-muted-foreground">{match.time}</span>
                        </div>
                        <p className="font-bold text-sm text-foreground">{match.teamA} vs {match.teamB}</p>
                        <p className="text-xs text-muted-foreground mb-4">{match.category}</p>
                        <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleStatusChange(match.id, 'CALLED')}>
                            <Megaphone className="w-4 h-4 mr-2" /> Panggil Tim
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </KanbanColumn>

        {/* KOLOM 2: DIPANGGIL (CALLED) */}
        <KanbanColumn title="Sedang Dipanggil" icon={<Megaphone className="w-5 h-5 text-amber-500"/>} items={queue.filter(m => m.status === 'CALLED')} status="CALLED">
            {queue.filter(m => m.status === 'CALLED').map(match => (
                <Card key={match.id} className="bg-amber-100/30 dark:bg-amber-900/20 border-amber-500/50 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                            <Badge className="bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-100">{match.id}</Badge>
                            <span className="text-xs font-bold text-red-500 animate-pulse">PANGGILAN KE-1</span>
                        </div>
                        <p className="font-bold text-sm text-foreground">{match.teamA} vs {match.teamB}</p>
                        <p className="text-xs text-muted-foreground mb-4">{match.category}</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1" onClick={() => handleStatusChange(match.id, 'CALLED')}>
                                Panggil Ulang
                            </Button>
                            <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => handleStatusChange(match.id, 'READY')}>
                                <CheckCircle2 className="w-4 h-4 mr-2" /> Tim Hadir
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </KanbanColumn>

        {/* KOLOM 3: SIAP (READY) */}
        <KanbanColumn title="Siap ke Lapangan" icon={<CheckCircle2 className="w-5 h-5 text-green-500"/>} items={queue.filter(m => m.status === 'READY')} status="READY">
            {queue.filter(m => m.status === 'READY').map(match => (
                <Card key={match.id} className="bg-green-100/30 dark:bg-green-900/20 border-green-500/50 shadow-sm">
                    <CardContent className="p-4">
                         <div className="flex justify-between items-center mb-2">
                            <Badge className="bg-green-100 text-green-800 border-green-300 hover:bg-green-100">{match.id}</Badge>
                            <span className="text-xs font-bold text-green-600">VERIFIED</span>
                        </div>
                        <p className="font-bold text-sm text-foreground">{match.teamA} vs {match.teamB}</p>
                        <p className="text-xs text-muted-foreground mb-4">{match.category}</p>
                        <Button size="sm" variant="secondary" className="w-full bg-secondary/80">
                            <Send className="w-4 h-4 mr-2" /> Kirim ke Match Control
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </KanbanColumn>

      </div>
    </div>
  );
}
