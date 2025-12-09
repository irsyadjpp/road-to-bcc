'use client';

import { useState } from "react";
import { 
  Package, ArrowUpRight, ArrowDownLeft, 
  Wind, Activity, AlertTriangle, History, 
  Plus, Search, Box, CheckCircle2, RotateCcw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const INVENTORY = {
  total: 500, // Slop
  used: 124,
  remaining: 376,
  brand: "Yonex AS-50",
  batch: "BATCH-2026-A"
};

const REQUESTS = [
  { id: "REQ-01", court: "Court 1 (TV)", amount: 2, status: "PENDING", time: "2 min ago", requester: "MLO Kevin" },
  { id: "REQ-02", court: "Court 4", amount: 1, status: "DELIVERED", time: "15 min ago", requester: "MLO Rian" },
  { id: "REQ-03", court: "Court 2", amount: 2, status: "DELIVERED", time: "30 min ago", requester: "MLO Siti" },
];

const LOGS = [
  { id: "L-101", type: "OUT", amount: 2, dest: "Court 4", time: "14:30", pic: "Staff Logistik A" },
  { id: "L-102", type: "OUT", amount: 3, dest: "Court 1", time: "13:15", pic: "Staff Logistik B" },
  { id: "L-103", type: "IN", amount: 50, dest: "Restock Gudang", time: "09:00", pic: "Vendor" },
];

export default function ShuttlecockControlPage() {
  const [isDispenseOpen, setIsDispenseOpen] = useState(false);
  const [isRestockOpen, setIsRestockOpen] = useState(false);

  // Calculate percentage for visual bar
  const stockLevel = Math.round((INVENTORY.remaining / INVENTORY.total) * 100);

  return (
    <div className="space-y-6 p-4 md:p-8 font-body pb-24 h-[calc(100vh-64px)] flex flex-col">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-yellow-500 text-yellow-500 bg-yellow-500/10 backdrop-blur-md">
                    <Wind className="w-3 h-3 mr-2" /> GAME EQUIPMENT
                </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-white">
                Shuttlecock <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Control</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Monitoring stok, distribusi ke lapangan, dan restock logistik pertandingan.
            </p>
        </div>

        <div className="flex gap-3">
            <Button 
                variant="outline"
                onClick={() => setIsRestockOpen(true)}
                className="h-14 rounded-full px-6 border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 font-bold"
            >
                <RotateCcw className="mr-2 w-5 h-5"/> RESTOCK
            </Button>
            <Button 
                onClick={() => setIsDispenseOpen(true)}
                className="h-14 rounded-full px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg shadow-[0_0_20px_rgba(234,179,8,0.3)]"
            >
                <Package className="mr-2 w-5 h-5"/> DISPENSE
            </Button>
        </div>
      </div>

      {/* --- MAIN DASHBOARD --- */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
         
         {/* LEFT: INVENTORY STATUS (1/3) */}
         <div className="lg:col-span-1 space-y-6">
            
            {/* BIG STOCK CARD */}
            <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] overflow-hidden relative group">
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-[80px]"></div>
                
                <CardContent className="p-8 relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <div className="p-3 bg-yellow-500/10 rounded-2xl text-yellow-500 border border-yellow-500/20">
                            <Box className="w-8 h-8"/>
                        </div>
                        <Badge variant="outline" className="border-zinc-700 text-zinc-400">{INVENTORY.brand}</Badge>
                    </div>

                    <div className="space-y-2 mb-8">
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Current Stock</p>
                        <h2 className="text-6xl font-black text-white tracking-tight">{INVENTORY.remaining}</h2>
                        <p className="text-sm font-bold text-zinc-400">/ {INVENTORY.total} Slops</p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase">
                            <span>Level</span>
                            <span>{stockLevel}%</span>
                        </div>
                        <Progress value={stockLevel} className="h-3 bg-zinc-800" indicatorClassName="bg-yellow-500"/>
                    </div>
                </CardContent>
            </Card>

            {/* CONSUMPTION RATE */}
            <Card className="bg-zinc-900 border-zinc-800 rounded-[32px]">
                <CardContent className="p-6 flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                        <Activity className="w-8 h-8"/>
                    </div>
                    <div>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Consumption Rate</p>
                        <p className="text-xl font-black text-white">4.2 <span className="text-sm text-zinc-600 font-bold">Slops / Hour</span></p>
                    </div>
                </CardContent>
            </Card>

         </div>

         {/* CENTER: ACTIVE REQUESTS (1/3) */}
         <Card className="lg:col-span-1 bg-zinc-900 border-zinc-800 rounded-[32px] flex flex-col overflow-hidden h-full">
            <div className="p-6 border-b border-zinc-800 bg-zinc-950/50 flex justify-between items-center">
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500"/> Court Requests
                </h3>
                <Badge className="bg-red-600 text-white border-none">{REQUESTS.filter(r => r.status === 'PENDING').length}</Badge>
            </div>
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                    {REQUESTS.map((req) => (
                        <div 
                            key={req.id} 
                            className={cn(
                                "p-5 rounded-[24px] border-2 transition-all",
                                req.status === 'PENDING' 
                                    ? "bg-black border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.1)]" 
                                    : "bg-zinc-950 border-zinc-800 opacity-60"
                            )}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-lg font-black text-white">{req.court}</span>
                                <span className="text-xs font-mono text-zinc-500">{req.time}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 mb-4">
                                <Badge variant="secondary" className="bg-zinc-900 text-zinc-300 border border-zinc-700">
                                    Needs: {req.amount} Slops
                                </Badge>
                                <span className="text-xs text-zinc-500 font-bold">by {req.requester}</span>
                            </div>

                            {req.status === 'PENDING' ? (
                                <Button className="w-full h-10 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs">
                                    SEND DELIVERY
                                </Button>
                            ) : (
                                <div className="flex items-center gap-2 text-green-500 text-xs font-black uppercase justify-center bg-zinc-900 py-2 rounded-xl">
                                    <CheckCircle2 className="w-3 h-3"/> Delivered
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </ScrollArea>
         </Card>

         {/* RIGHT: HISTORY LOG (1/3) */}
         <Card className="lg:col-span-1 bg-zinc-900 border-zinc-800 rounded-[32px] flex flex-col overflow-hidden h-full">
            <div className="p-6 border-b border-zinc-800 bg-zinc-950/50">
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <History className="w-4 h-4 text-zinc-400"/> Transaction Log
                </h3>
            </div>
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                    {LOGS.map((log) => (
                        <div key={log.id} className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-[24px]">
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center",
                                    log.type === 'IN' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                                )}>
                                    {log.type === 'IN' ? <ArrowDownLeft className="w-5 h-5"/> : <ArrowUpRight className="w-5 h-5"/>}
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-white">{log.dest}</p>
                                    <p className="text-[10px] text-zinc-500">{log.pic} • {log.time}</p>
                                </div>
                            </div>
                            <span className={cn(
                                "text-lg font-black font-mono",
                                log.type === 'IN' ? "text-green-500" : "text-white"
                            )}>
                                {log.type === 'IN' ? '+' : '-'}{log.amount}
                            </span>
                        </div>
                    ))}
                </div>
            </ScrollArea>
         </Card>

      </div>

      {/* --- DISPENSE MODAL --- */}
      <Dialog open={isDispenseOpen} onOpenChange={setIsDispenseOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white rounded-[40px] max-w-md p-0 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-zinc-800 bg-yellow-950/20">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black font-headline uppercase flex items-center gap-2 text-yellow-500">
                        <Package className="w-6 h-6"/> Dispense Ammo
                    </DialogTitle>
                    <DialogDescription>Keluarkan stok kok ke lapangan.</DialogDescription>
                </DialogHeader>
            </div>
            
            <div className="p-8 space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Tujuan Distribusi</label>
                    <Select>
                        <SelectTrigger className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl"><SelectValue placeholder="Pilih Court..." /></SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                            <SelectItem value="C1">Court 1 (TV)</SelectItem>
                            <SelectItem value="C2">Court 2</SelectItem>
                            <SelectItem value="C3">Court 3</SelectItem>
                            <SelectItem value="C4">Court 4</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Jumlah (Slop)</label>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="h-14 w-14 rounded-2xl border-zinc-800 text-2xl font-black">-</Button>
                        <Input className="h-14 bg-black border-zinc-800 rounded-2xl text-center text-2xl font-black text-yellow-500" defaultValue="1" />
                        <Button variant="outline" className="h-14 w-14 rounded-2xl border-zinc-800 text-2xl font-black">+</Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Diserahkan Kepada</label>
                    <Input placeholder="Nama MLO / Umpire" className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl" />
                </div>

                <Button className="w-full h-16 rounded-full font-black text-lg bg-yellow-500 hover:bg-yellow-400 text-black mt-2 shadow-xl shadow-yellow-900/20">
                    CONFIRM DISPENSE
                </Button>
            </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}