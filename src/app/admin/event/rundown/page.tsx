
'use client';

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { getRundown, updateAgendaStatus, type Agenda } from "./actions";

export default function LiveRundownPage() {
  const [items, setItems] = useState<Agenda[]>([]);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    load();
    // Jam Digital Realtime
    const interval = setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString('id-ID'));
        load(); // Auto refresh status
    }, 10000); // Poll tiap 10 detik
    return () => clearInterval(interval);
  }, []);

  const load = () => getRundown().then(setItems);

  const handleAction = async (id: string, action: 'START' | 'FINISH') => {
    await updateAgendaStatus(id, action === 'START' ? 'LIVE' : 'DONE');
    load();
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
       <div className="flex justify-between items-center bg-black text-white p-6 rounded-xl shadow-2xl">
          <div>
             <h1 className="text-2xl font-black font-headline uppercase text-yellow-500">Master Control Room</h1>
             <p className="text-zinc-400">Timekeeper Dashboard</p>
          </div>
          <div className="text-right">
             <div className="text-4xl font-mono font-bold">{currentTime}</div>
             <Badge variant="outline" className="text-green-500 border-green-500 animate-pulse">ON AIR</Badge>
          </div>
       </div>

       <div className="space-y-4">
          {items.map((item, index) => {
             // Hitung Delay (Simulasi sederhana)
             const isLate = item.status === 'LIVE' && item.actualStartTime && item.actualStartTime > item.time;

             return (
                <div key={item.id} className={`flex items-center gap-4 p-4 rounded-xl border-l-4 shadow-sm transition-all 
                    ${item.status === 'LIVE' ? 'bg-white border-l-green-600 ring-2 ring-green-500 scale-105 z-10' : 
                      item.status === 'DONE' ? 'bg-muted opacity-60 border-l-gray-400' : 'bg-white border-l-blue-500'}`}>
                   
                   {/* JAM */}
                   <div className="text-center min-w-[80px]">
                      <div className="font-bold text-lg">{item.time}</div>
                      <div className="text-xs text-muted-foreground">{item.duration} min</div>
                   </div>

                   {/* KONTEN */}
                   <div className="flex-grow">
                      <h3 className="font-bold text-lg">{item.activity}</h3>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                         <span className="font-bold bg-muted px-2 py-0.5 rounded text-xs">PIC: {item.pic}</span>
                         {isLate && <span className="text-red-500 font-bold text-xs flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> DELAYED</span>}
                      </div>
                   </div>

                   {/* ACTION BUTTON */}
                   <div className="min-w-[120px] text-right">
                      {item.status === 'DONE' && <Badge className="bg-gray-500">COMPLETED</Badge>}
                      
                      {item.status === 'LIVE' && (
                         <Button onClick={() => handleAction(item.id, 'FINISH')} className="bg-red-600 hover:bg-red-700 w-full animate-pulse">
                            STOP / NEXT
                         </Button>
                      )}
                      
                      {item.status === 'UPCOMING' && (
                         <Button onClick={() => handleAction(item.id, 'START')} variant="outline" className="border-blue-500 text-blue-600 w-full hover:bg-blue-50">
                            <Play className="w-4 h-4 mr-2"/> START
                         </Button>
                      )}
                   </div>
                </div>
             );
          })}
       </div>
    </div>
  );
}
