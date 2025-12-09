'use client';

import { useState } from "react";
import { 
  Car, Truck, MapPin, Navigation, 
  Clock, CheckCircle2, User, Fuel, 
  MoreHorizontal, Plus, Search, BatteryCharging,
  ArrowRight, ShieldCheck, Box
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const FLEET = [
  { id: "UNIT-01", name: "Alphard VVIP", type: "VIP", plate: "D 1234 BCC", status: "ON_TRIP", driver: "Pak Asep", fuel: 80, location: "Jl. Asia Afrika" },
  { id: "UNIT-02", name: "HiAce Shuttle A", type: "SHUTTLE", plate: "D 7777 GO", status: "IDLE", driver: "Kang Ujang", fuel: 45, location: "GOR KONI (Base)" },
  { id: "UNIT-03", name: "Box Logistik", type: "CARGO", plate: "D 9988 LOG", status: "LOADING", driver: "Budi", fuel: 90, location: "Gudang Utama" },
  { id: "UNIT-04", name: "Innova Zenix", type: "OPS", plate: "D 2026 WIN", status: "IDLE", driver: "Sandi", fuel: 100, location: "Hotel Atlet" },
];

const ACTIVE_TRIPS = [
  { 
    id: "TRIP-882", 
    unit: "UNIT-01", 
    passenger: "Kevin Sanjaya (Atlet)", 
    from: "Hotel Aryaduta", 
    to: "GOR KONI", 
    eta: "15 mins", 
    status: "EN_ROUTE",
    type: "PAX"
  },
  { 
    id: "TRIP-883", 
    unit: "UNIT-03", 
    passenger: "Shuttlecock Restock", 
    from: "Gudang", 
    to: "Venue Hall B", 
    eta: "Loading...", 
    status: "PREPARING",
    type: "CARGO"
  },
];

export default function DispatchPage() {
  const [activeTab, setActiveTab] = useState("live");
  const [isDispatchOpen, setIsDispatchOpen] = useState(false);

  const getStatusColor = (s: string) => {
    switch(s) {
        case 'ON_TRIP': return "bg-blue-500 text-white animate-pulse";
        case 'IDLE': return "bg-green-500 text-black";
        case 'LOADING': return "bg-yellow-500 text-black";
        case 'MAINTENANCE': return "bg-red-500 text-white";
        default: return "bg-zinc-800 text-zinc-400";
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-8 font-body pb-24 h-[calc(100vh-64px)] flex flex-col">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-orange-500 text-orange-500 bg-orange-500/10 backdrop-blur-md">
                    <Navigation className="w-3 h-3 mr-2" /> FLEET COMMAND
                </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-white">
                Logistics <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">Dispatch</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Manajemen armada, penjemputan atlet, dan distribusi logistik.
            </p>
        </div>

        <Button 
            onClick={() => setIsDispatchOpen(true)}
            className="h-14 rounded-full px-8 bg-white text-black hover:bg-zinc-200 font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
            <Plus className="mr-2 w-5 h-5"/> DISPATCH UNIT
        </Button>
      </div>

      {/* --- LIVE MAP VISUALIZATION (Placeholder) --- */}
      <div className="relative w-full h-64 bg-zinc-900 rounded-[32px] border border-zinc-800 overflow-hidden shrink-0 group">
         {/* Map Image Placeholder */}
         <div className="absolute inset-0 bg-[url('/images/map-dark.png')] bg-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
         
         {/* Floating Stats on Map */}
         <div className="absolute bottom-6 left-6 flex gap-4">
            <div className="bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-zinc-700 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <div>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase">Available Units</p>
                    <p className="text-xl font-black text-white">8/12</p>
                </div>
            </div>
            <div className="bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-zinc-700 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <div>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase">Active Trips</p>
                    <p className="text-xl font-black text-white">4</p>
                </div>
            </div>
         </div>
      </div>

      {/* --- CONTENT TABS --- */}
      <div className="flex-1 min-h-0 bg-zinc-900/50 border border-zinc-800/50 rounded-[40px] p-2 backdrop-blur-sm flex flex-col">
        <Tabs defaultValue="live" className="w-full h-full flex flex-col">
            
            <div className="flex items-center justify-between px-4 py-4 shrink-0">
                <TabsList className="bg-zinc-950 p-1 rounded-full h-14 border border-zinc-800">
                    <TabsTrigger value="live" className="rounded-full h-12 px-8 font-bold text-sm data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                        LIVE TRIPS
                    </TabsTrigger>
                    <TabsTrigger value="fleet" className="rounded-full h-12 px-8 font-bold text-sm data-[state=active]:bg-zinc-800 data-[state=active]:text-white">
                        FLEET STATUS
                    </TabsTrigger>
                </TabsList>
                
                <div className="relative hidden md:block w-64">
                    <Search className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500" />
                    <Input placeholder="Search Driver / Plate..." className="h-12 bg-zinc-950 border-zinc-800 rounded-full pl-10 text-white focus:ring-orange-500" />
                </div>
            </div>

            {/* TAB 1: LIVE TRIPS */}
            <TabsContent value="live" className="flex-1 overflow-hidden mt-0">
                <ScrollArea className="h-full px-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                        {ACTIVE_TRIPS.map((trip) => (
                            <div key={trip.id} className="group bg-zinc-900 border border-zinc-800 rounded-[32px] p-6 hover:border-orange-500/50 transition-all relative overflow-hidden">
                                {/* Visual Progress Bar */}
                                <div className="absolute top-0 left-0 h-1 bg-orange-600 w-1/3 group-hover:w-2/3 transition-all duration-1000"></div>
                                
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("p-3 rounded-2xl", trip.type === 'PAX' ? "bg-blue-500/20 text-blue-500" : "bg-orange-500/20 text-orange-500")}>
                                            {trip.type === 'PAX' ? <User className="w-6 h-6"/> : <Box className="w-6 h-6"/>}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-white text-lg">{trip.passenger}</h3>
                                            <p className="text-xs text-zinc-500 font-bold">{trip.id} • {trip.unit}</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-zinc-950 text-orange-500 border border-orange-500/30 animate-pulse">
                                        {trip.status.replace('_', ' ')}
                                    </Badge>
                                </div>

                                {/* Route Visualization */}
                                <div className="flex items-center gap-4 relative mb-6">
                                    <div className="flex-1 bg-black p-3 rounded-xl border border-zinc-800 text-center">
                                        <p className="text-[10px] text-zinc-500 font-bold uppercase">Pickup</p>
                                        <p className="text-sm font-bold text-white truncate">{trip.from}</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-zinc-600"/>
                                    <div className="flex-1 bg-black p-3 rounded-xl border border-zinc-800 text-center">
                                        <p className="text-[10px] text-zinc-500 font-bold uppercase">Dropoff</p>
                                        <p className="text-sm font-bold text-white truncate">{trip.to}</p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center text-xs font-bold text-zinc-500">
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> ETA: <span className="text-white">{trip.eta}</span></span>
                                    <Button size="sm" variant="ghost" className="h-8 rounded-full hover:text-white">Details <ArrowRight className="w-3 h-3 ml-1"/></Button>
                                </div>
                            </div>
                        ))}
                        
                        {/* Add Trip Shortcut */}
                        <button 
                            onClick={() => setIsDispatchOpen(true)}
                            className="border-2 border-dashed border-zinc-800 rounded-[32px] flex flex-col items-center justify-center gap-3 text-zinc-600 hover:text-orange-500 hover:border-orange-500/50 hover:bg-orange-500/5 transition-all min-h-[200px]"
                        >
                            <Plus className="w-10 h-10"/>
                            <span className="font-black uppercase tracking-widest text-sm">Create New Trip</span>
                        </button>
                    </div>
                </ScrollArea>
            </TabsContent>

            {/* TAB 2: FLEET STATUS */}
            <TabsContent value="fleet" className="flex-1 overflow-hidden mt-0">
                <ScrollArea className="h-full px-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                        {FLEET.map((unit) => (
                            <div key={unit.id} className="bg-zinc-900 border border-zinc-800 rounded-[28px] p-5 hover:bg-zinc-800/80 transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-12 w-12 border-2 border-zinc-700 bg-zinc-800">
                                            <AvatarFallback><Car className="w-6 h-6 text-zinc-400"/></AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="font-bold text-white">{unit.name}</h4>
                                            <p className="text-xs font-mono text-zinc-500 bg-black px-1.5 py-0.5 rounded w-fit">{unit.plate}</p>
                                        </div>
                                    </div>
                                    <Badge className={cn("border-none font-bold text-[10px]", getStatusColor(unit.status))}>
                                        {unit.status}
                                    </Badge>
                                </div>

                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    <div className="bg-zinc-950 p-2 rounded-xl border border-zinc-800">
                                        <p className="text-[10px] text-zinc-500 uppercase">Driver</p>
                                        <p className="text-xs font-bold text-white truncate">{unit.driver}</p>
                                    </div>
                                    <div className="bg-zinc-950 p-2 rounded-xl border border-zinc-800">
                                        <p className="text-[10px] text-zinc-500 uppercase">Location</p>
                                        <p className="text-xs font-bold text-white truncate">{unit.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Fuel className="w-4 h-4 text-zinc-600"/>
                                    <div className="h-2 flex-1 bg-zinc-800 rounded-full overflow-hidden">
                                        <div className={cn("h-full", unit.fuel > 20 ? "bg-green-500" : "bg-red-500")} style={{ width: `${unit.fuel}%` }}></div>
                                    </div>
                                    <span className="text-xs font-bold text-zinc-400">{unit.fuel}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </TabsContent>
        </Tabs>
      </div>

      {/* --- DISPATCH MODAL --- */}
      <Dialog open={isDispatchOpen} onOpenChange={setIsDispatchOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white rounded-[40px] max-w-md p-0 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-zinc-800 bg-orange-950/20">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black font-headline uppercase flex items-center gap-2">
                        <Navigation className="w-6 h-6 text-orange-500"/> Dispatch Unit
                    </DialogTitle>
                    <DialogDescription>Tugaskan armada untuk penjemputan atau logistik.</DialogDescription>
                </DialogHeader>
            </div>
            
            <div className="p-8 space-y-6">
                
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Tipe Penugasan</label>
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-12 border-zinc-800 bg-zinc-900 hover:bg-orange-500 hover:text-black hover:border-orange-500 font-bold">
                            <User className="mr-2 w-4 h-4"/> PENUMPANG
                        </Button>
                        <Button variant="outline" className="h-12 border-zinc-800 bg-zinc-900 hover:bg-orange-500 hover:text-black hover:border-orange-500 font-bold">
                            <Box className="mr-2 w-4 h-4"/> KARGO / ALAT
                        </Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Detail Penumpang / Barang</label>
                    <Input placeholder="Nama Atlet / Jenis Barang" className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Lokasi Jemput</label>
                        <Input placeholder="Dari..." className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Tujuan</label>
                        <Input placeholder="Ke..." className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Pilih Armada (Available)</label>
                    <Select>
                        <SelectTrigger className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl"><SelectValue placeholder="Pilih Unit..." /></SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                            <SelectItem value="U2">HiAce Shuttle A (Idle)</SelectItem>
                            <SelectItem value="U4">Innova Zenix (Idle)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button className="w-full h-16 rounded-full font-black text-lg bg-orange-600 hover:bg-orange-700 text-white mt-4 shadow-xl shadow-orange-900/20">
                    START TRIP NOW
                </Button>
            </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
