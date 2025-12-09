'use client';

import { useState } from "react";
import { 
  CarFront, Map, Navigation, Clock, 
  Fuel, User, Box, ArrowRight, 
  Plus, Search, Phone, ShieldCheck, 
  MapPin, Gauge, Radio
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const FLEET_ROSTER = [
  { id: "U-01", name: "Alphard VVIP", plate: "D 1 BCC", status: "BUSY", fuel: 85, driver: "Pak Asep", type: "VIP" },
  { id: "U-02", name: "HiAce Commuter", plate: "D 7070 GO", status: "IDLE", fuel: 40, driver: "Kang Ujang", type: "SHUTTLE" },
  { id: "U-03", name: "Innova Zenix", plate: "D 2026 WIN", status: "IDLE", fuel: 95, driver: "Budi", type: "OPS" },
  { id: "U-04", name: "GranMax Box", plate: "D 9988 LOG", status: "MAINTENANCE", fuel: 10, driver: "-", type: "CARGO" },
];

const ACTIVE_MISSIONS = [
  { 
    id: "TRIP-X99", 
    type: "PAX",
    passenger: "Kevin Sanjaya (Atlet)", 
    pickup: "Hotel Aryaduta", 
    dropoff: "Venue Main Hall", 
    driver: "Pak Asep", 
    unit: "Alphard VVIP",
    eta: "12 mins",
    progress: 65,
    status: "EN_ROUTE"
  },
  { 
    id: "TRIP-X98", 
    type: "CARGO",
    passenger: "Restock Shuttlecock (5 Dus)", 
    pickup: "Gudang Logistik", 
    dropoff: "Court 4", 
    driver: "Budi", 
    unit: "Innova Zenix",
    eta: "5 mins",
    progress: 20,
    status: "PICKING_UP"
  },
];

export default function DispatchCommandPage() {
  const [activeTab, setActiveTab] = useState("missions");
  const [isDeployOpen, setIsDeployOpen] = useState(false);

  // Helper Colors
  const getStatusColor = (s: string) => {
    switch(s) {
        case 'BUSY': return "text-orange-500 bg-orange-500/10 border-orange-500/20";
        case 'IDLE': return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
        case 'MAINTENANCE': return "text-red-500 bg-red-500/10 border-red-500/20";
        default: return "text-zinc-500 bg-zinc-500/10";
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-8 font-body pb-24 h-[calc(100vh-64px)] flex flex-col">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-orange-500 text-orange-500 bg-orange-500/10 backdrop-blur-md animate-pulse">
                    <Radio className="w-3 h-3 mr-2" /> DISPATCH CHANNEL 1
                </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-white">
                Mobility <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Command</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Kendali armada transportasi & distribusi logistik taktis.
            </p>
        </div>

        <Button 
            onClick={() => setIsDeployOpen(true)}
            className="h-14 rounded-full px-8 bg-orange-600 hover:bg-orange-700 text-white font-black text-lg shadow-[0_0_25px_rgba(234,88,12,0.4)] transition-all hover:scale-105"
        >
            <Navigation className="mr-2 w-5 h-5"/> DEPLOY UNIT
        </Button>
      </div>

      {/* --- LIVE MAP HUD (Placeholder) --- */}
      <div className="relative w-full h-72 bg-zinc-950 rounded-[32px] border border-zinc-800 overflow-hidden shrink-0 group">
         {/* Map Texture */}
         <div className="absolute inset-0 bg-[url('/images/map-dark.png')] bg-cover opacity-30 grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
         
         {/* HUD Overlay */}
         <div className="absolute top-6 left-6 right-6 flex justify-between pointer-events-none">
            <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-xs font-mono text-zinc-300">
                GPS SIGNAL: <span className="text-green-500 font-bold">STRONG</span>
            </div>
            <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-xs font-mono text-zinc-300">
                TRAFFIC: <span className="text-orange-500 font-bold">MODERATE</span>
            </div>
         </div>

         {/* Floating Stats */}
         <div className="absolute bottom-6 left-6 flex gap-4">
            <div className="bg-zinc-900/80 backdrop-blur-xl p-4 rounded-[24px] border border-zinc-700 flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-xl text-green-500">
                    <CarFront className="w-6 h-6"/>
                </div>
                <div>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Idle Units</p>
                    <p className="text-2xl font-black text-white">2 <span className="text-sm text-zinc-500">/ 4</span></p>
                </div>
            </div>
            <div className="bg-zinc-900/80 backdrop-blur-xl p-4 rounded-[24px] border border-zinc-700 flex items-center gap-4">
                <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500">
                    <Gauge className="w-6 h-6"/>
                </div>
                <div>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">On Mission</p>
                    <p className="text-2xl font-black text-white">2</p>
                </div>
            </div>
         </div>
      </div>

      {/* --- COMMAND CENTER TABS --- */}
      <div className="flex-1 min-h-0 bg-zinc-900/50 border border-zinc-800/50 rounded-[40px] p-2 backdrop-blur-sm flex flex-col">
        <Tabs defaultValue="missions" className="w-full h-full flex flex-col">
            
            <div className="flex items-center justify-between px-4 py-4 shrink-0">
                <TabsList className="bg-zinc-950 p-1 rounded-full h-14 border border-zinc-800">
                    <TabsTrigger value="missions" className="rounded-full h-12 px-8 font-bold text-sm data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                        ACTIVE MISSIONS
                    </TabsTrigger>
                    <TabsTrigger value="fleet" className="rounded-full h-12 px-8 font-bold text-sm data-[state=active]:bg-zinc-800 data-[state=active]:text-white">
                        FLEET ROSTER
                    </TabsTrigger>
                </TabsList>
                
                <div className="relative hidden md:block w-72">
                    <Search className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500" />
                    <Input placeholder="Track Driver / ID..." className="h-12 bg-zinc-950 border-zinc-800 rounded-full pl-10 text-white focus:ring-orange-500" />
                </div>
            </div>

            {/* TAB 1: ACTIVE MISSIONS */}
            <TabsContent value="missions" className="flex-1 overflow-hidden mt-0">
                <ScrollArea className="h-full px-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                        {ACTIVE_MISSIONS.map((trip) => (
                            <div key={trip.id} className="group relative bg-zinc-900 border border-zinc-800 rounded-[32px] p-6 hover:border-orange-500/50 transition-all overflow-hidden">
                                {/* Glowing Side Bar */}
                                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-600"></div>
                                
                                <div className="flex justify-between items-start mb-6 pl-4">
                                    <div className="flex items-center gap-4">
                                        <div className={cn("p-3 rounded-2xl", trip.type === 'PAX' ? "bg-blue-500/10 text-blue-500" : "bg-yellow-500/10 text-yellow-500")}>
                                            {trip.type === 'PAX' ? <User className="w-6 h-6"/> : <Box className="w-6 h-6"/>}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-white text-lg leading-none">{trip.passenger}</h3>
                                            <p className="text-xs text-zinc-500 font-bold mt-1 uppercase tracking-wider">{trip.id}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 text-orange-500 font-black text-sm uppercase mb-1 justify-end">
                                            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div> {trip.status.replace('_', ' ')}
                                        </div>
                                        <p className="text-xs text-zinc-500 font-mono">ETA: <span className="text-white">{trip.eta}</span></p>
                                    </div>
                                </div>

                                <div className="pl-4 space-y-4">
                                    {/* Route Visualizer */}
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 space-y-1">
                                            <p className="text-[10px] text-zinc-500 font-bold uppercase">Pickup</p>
                                            <div className="bg-black px-3 py-2 rounded-xl border border-zinc-800 text-sm font-bold text-white truncate">
                                                {trip.pickup}
                                            </div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-zinc-600 mt-4"/>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-[10px] text-zinc-500 font-bold uppercase">Dropoff</p>
                                            <div className="bg-black px-3 py-2 rounded-xl border border-zinc-800 text-sm font-bold text-white truncate">
                                                {trip.dropoff}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase">
                                            <span>Trip Progress</span>
                                            <span>{trip.progress}%</span>
                                        </div>
                                        <Progress value={trip.progress} className="h-1.5 bg-zinc-800" indicatorClassName="bg-orange-500" />
                                    </div>

                                    {/* Footer Info */}
                                    <div className="flex items-center justify-between pt-2 border-t border-zinc-800/50">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="w-6 h-6 border border-zinc-700">
                                                <AvatarFallback className="text-[8px] bg-zinc-800">{trip.driver.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-xs font-bold text-zinc-400">{trip.driver} • {trip.unit}</span>
                                        </div>
                                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-zinc-500 hover:text-white hover:bg-zinc-800">
                                            <Phone className="w-4 h-4"/>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </TabsContent>

            {/* TAB 2: FLEET ROSTER */}
            <TabsContent value="fleet" className="flex-1 overflow-hidden mt-0">
                <ScrollArea className="h-full px-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                        {FLEET_ROSTER.map((unit) => (
                            <div key={unit.id} className="bg-zinc-900 border border-zinc-800 rounded-[28px] p-5 hover:bg-zinc-900/80 transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400">
                                            <CarFront className="w-6 h-6"/>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg">{unit.name}</h4>
                                            <Badge variant="secondary" className="text-[10px] h-5 px-1.5 bg-zinc-950 border-zinc-700 text-zinc-400">
                                                {unit.plate}
                                            </Badge>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className={cn("text-[9px] font-black uppercase px-2 py-1", getStatusColor(unit.status))}>
                                        {unit.status}
                                    </Badge>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-xs font-medium text-zinc-400 bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                                        <span className="flex items-center gap-2"><User className="w-3 h-3"/> {unit.driver}</span>
                                        <span className="font-bold text-zinc-600">{unit.type}</span>
                                    </div>
                                    
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase">
                                            <span className="flex items-center gap-1"><Fuel className="w-3 h-3"/> Fuel</span>
                                            <span>{unit.fuel}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                            <div className={cn("h-full", unit.fuel > 20 ? "bg-emerald-500" : "bg-red-500")} style={{ width: `${unit.fuel}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </TabsContent>
        </Tabs>
      </div>

      {/* --- DEPLOY MODAL --- */}
      <Dialog open={isDeployOpen} onOpenChange={setIsDeployOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white rounded-[40px] max-w-md p-0 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-zinc-800 bg-orange-950/20">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black font-headline uppercase flex items-center gap-2 text-orange-500">
                        <MapPin className="w-6 h-6"/> Start Mission
                    </DialogTitle>
                    <DialogDescription>Assign kendaraan untuk penjemputan.</DialogDescription>
                </DialogHeader>
            </div>
            
            <div className="p-8 space-y-6">
                
                {/* Type Selection */}
                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-14 rounded-2xl border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-orange-500 hover:bg-orange-500/10 font-bold">
                        <User className="mr-2 w-5 h-5"/> PASSENGER
                    </Button>
                    <Button variant="outline" className="h-14 rounded-2xl border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-orange-500 hover:bg-orange-500/10 font-bold">
                        <Box className="mr-2 w-5 h-5"/> CARGO
                    </Button>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Nama Penumpang / Barang</label>
                    <Input placeholder="Cth: Tim PB Djarum" className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl text-lg font-bold text-white focus:ring-orange-500" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Route (From - To)</label>
                    <div className="flex gap-2 items-center">
                        <Input placeholder="Pickup Point" className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl" />
                        <ArrowRight className="w-6 h-6 text-zinc-600"/>
                        <Input placeholder="Destination" className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Select Unit</label>
                    <Select>
                        <SelectTrigger className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl text-white font-bold"><SelectValue placeholder="Available Cars" /></SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                            <SelectItem value="U2">HiAce Commuter (Idle)</SelectItem>
                            <SelectItem value="U3">Innova Zenix (Idle)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button className="w-full h-16 rounded-full font-black text-lg bg-orange-600 hover:bg-orange-700 text-white mt-2 shadow-[0_0_30px_rgba(234,88,12,0.4)]">
                    DISPATCH NOW
                </Button>
            </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
