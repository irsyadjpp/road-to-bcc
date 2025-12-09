'use client';

import { useState } from "react";
import { 
  Box, Package, Truck, Wrench, 
  Search, Plus, Filter, MapPin, 
  AlertTriangle, CheckCircle2, RotateCw, 
  Barcode, Monitor, Armchair, Megaphone
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const INVENTORY_ITEMS = [
  { 
    id: "INV-001", 
    name: "Walkie Talkie (HT)", 
    category: "TECH", 
    total: 20, 
    available: 5, 
    deployed: 15, 
    status: "LOW_STOCK", 
    location: "Deployed (Security/Ops)",
    icon: Monitor
  },
  { 
    id: "INV-002", 
    name: "Kursi Plastik (Tribun)", 
    category: "FURNITURE", 
    total: 200, 
    available: 180, 
    deployed: 20, 
    status: "GOOD", 
    location: "Gudang Utama",
    icon: Armchair
  },
  { 
    id: "INV-003", 
    name: "Meja Wasit (High Chair)", 
    category: "FURNITURE", 
    total: 8, 
    available: 0, 
    deployed: 8, 
    status: "ALL_OUT", 
    location: "Court 1-8",
    icon: Armchair
  },
  { 
    id: "INV-004", 
    name: "A-Board Banner Sponsor", 
    category: "BRANDING", 
    total: 30, 
    available: 5, 
    deployed: 25, 
    status: "GOOD", 
    location: "Field of Play",
    icon: Megaphone
  },
  { 
    id: "INV-005", 
    name: "Kabel Roll 50m", 
    category: "TECH", 
    total: 10, 
    available: 8, 
    deployed: 2, 
    status: "GOOD", 
    location: "Gudang",
    icon: Monitor
  },
];

const CATEGORIES = [
  { id: "ALL", label: "All Assets" },
  { id: "FURNITURE", label: "Furniture" },
  { id: "TECH", label: "Electronics" },
  { id: "BRANDING", label: "Branding" },
];

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = INVENTORY_ITEMS.filter(item => 
    (activeTab === 'ALL' || item.category === activeTab) &&
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (s: string) => {
    switch(s) {
        case 'LOW_STOCK': return "text-yellow-500 border-yellow-500/50 bg-yellow-500/10";
        case 'ALL_OUT': return "text-red-500 border-red-500/50 bg-red-500/10";
        default: return "text-emerald-500 border-emerald-500/50 bg-emerald-500/10";
    }
  };

  return (
    <div className="space-y-8 p-4 md:p-8 font-body pb-24">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-amber-500 text-amber-500 bg-amber-500/10 backdrop-blur-md">
                    <Box className="w-3 h-3 mr-2" /> ASSET MANAGEMENT
                </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-headline uppercase tracking-tighter text-white">
                Logistics <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Inventory</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Pelacakan aset, peminjaman alat, dan manajemen gudang.
            </p>
        </div>

        <Button 
            onClick={() => setIsRegisterOpen(true)}
            className="h-14 rounded-full px-8 bg-amber-500 hover:bg-amber-400 text-black font-bold text-lg shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-transform active:scale-95"
        >
            <Plus className="mr-2 w-6 h-6"/> REGISTER ASSET
        </Button>
      </div>

      {/* --- STATS OVERVIEW --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[40px] group-hover:bg-amber-500/20 transition-all"></div>
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-zinc-800 rounded-2xl text-zinc-400"><Package className="w-6 h-6"/></div>
                    <Badge variant="outline" className="border-zinc-700 text-zinc-500">Total Items</Badge>
                </div>
                <h3 className="text-4xl font-black text-white">268</h3>
                <p className="text-xs text-zinc-500 font-bold uppercase mt-1">Registered Assets</p>
            </div>
         </Card>
         
         <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] group-hover:bg-blue-500/20 transition-all"></div>
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500"><Truck className="w-6 h-6"/></div>
                    <Badge variant="outline" className="border-blue-900 text-blue-500">Deployed</Badge>
                </div>
                <h3 className="text-4xl font-black text-white">70</h3>
                <p className="text-xs text-zinc-500 font-bold uppercase mt-1">Currently In Use</p>
            </div>
         </Card>

         <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[40px] group-hover:bg-red-500/20 transition-all"></div>
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-red-500/10 rounded-2xl text-red-500"><Wrench className="w-6 h-6"/></div>
                    <Badge variant="outline" className="border-red-900 text-red-500">Maintenance</Badge>
                </div>
                <h3 className="text-4xl font-black text-white">5</h3>
                <p className="text-xs text-zinc-500 font-bold uppercase mt-1">Damaged / Repair</p>
            </div>
         </Card>
      </div>

      {/* --- INVENTORY LIST --- */}
      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-[40px] p-2 backdrop-blur-sm min-h-[500px] flex flex-col">
        <Tabs defaultValue="ALL" className="w-full flex-1 flex flex-col" onValueChange={setActiveTab}>
            
            <div className="flex flex-col md:flex-row items-center justify-between px-4 py-4 gap-4">
                <TabsList className="bg-zinc-950 p-1 rounded-full h-14 border border-zinc-800 w-full md:w-auto overflow-x-auto">
                    {CATEGORIES.map(cat => (
                        <TabsTrigger key={cat.id} value={cat.id} className="rounded-full h-12 px-6 font-bold text-sm data-[state=active]:bg-zinc-800 data-[state=active]:text-white whitespace-nowrap">
                            {cat.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <div className="relative w-full md:w-72">
                    <Search className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500" />
                    <Input 
                        placeholder="Search assets..." 
                        className="h-12 bg-zinc-950 border-zinc-800 rounded-full pl-10 text-white focus:ring-amber-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <ScrollArea className="flex-1 px-4 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredItems.map((item) => {
                        const Icon = item.icon;
                        const usagePercent = Math.round((item.deployed / item.total) * 100);
                        
                        return (
                            <div key={item.id} className="group bg-zinc-900 border border-zinc-800 rounded-[28px] p-5 hover:border-amber-500/50 transition-all cursor-pointer hover:-translate-y-1">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-amber-500 transition-colors">
                                            <Icon className="w-6 h-6"/>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg leading-tight">{item.name}</h4>
                                            <p className="text-xs text-zinc-500 font-mono mt-0.5">{item.id}</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className={cn("text-[9px] font-black uppercase px-2 py-1", getStatusColor(item.status))}>
                                        {item.status.replace('_', ' ')}
                                    </Badge>
                                </div>

                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between text-xs font-medium text-zinc-400">
                                        <span>Usage</span>
                                        <span className="text-white font-bold">{item.deployed} / {item.total} Units</span>
                                    </div>
                                    <Progress value={usagePercent} className="h-2 bg-zinc-800" indicatorClassName={cn(usagePercent > 80 ? "bg-red-500" : "bg-amber-500")} />
                                </div>

                                <div className="flex justify-between items-center pt-3 border-t border-zinc-800">
                                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-bold">
                                        <MapPin className="w-3 h-3 text-zinc-600"/> {item.location}
                                    </div>
                                    <Button size="sm" variant="ghost" className="h-8 rounded-full text-xs hover:bg-zinc-800 hover:text-white">
                                        Manage <RotateCw className="ml-1 w-3 h-3"/>
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </ScrollArea>
        </Tabs>
      </div>

      {/* --- ADD ASSET MODAL --- */}
      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white rounded-[40px] max-w-lg p-0 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-zinc-800 bg-amber-950/20">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black font-headline uppercase flex items-center gap-2 text-amber-500">
                        <Barcode className="w-6 h-6"/> New Asset
                    </DialogTitle>
                    <DialogDescription>Daftarkan barang inventaris baru ke sistem.</DialogDescription>
                </DialogHeader>
            </div>
            
            <div className="p-8 space-y-6">
                
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Nama Barang</label>
                    <Input placeholder="Cth: Meja Lipat Krisbow" className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Kategori</label>
                        <Select>
                            <SelectTrigger className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl"><SelectValue placeholder="Pilih..." /></SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                {CATEGORIES.filter(c => c.id !== 'ALL').map(c => (
                                    <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Jumlah Total</label>
                        <Input type="number" className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Lokasi Penyimpanan Awal</label>
                    <Input placeholder="Cth: Gudang Belakang" className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl" />
                </div>

                <Button className="w-full h-16 rounded-full font-black text-lg bg-amber-500 hover:bg-amber-600 text-black mt-2 shadow-xl shadow-amber-900/20">
                    SAVE TO INVENTORY
                </Button>
            </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
