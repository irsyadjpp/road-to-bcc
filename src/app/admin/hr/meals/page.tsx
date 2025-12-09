
'use client';

import { useState, useEffect } from "react";
import { 
  Utensils, QrCode, Clock, Users, 
  CheckCircle2, XCircle, Search, Filter, 
  Pizza, Coffee, ScanLine, ArrowRight 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const CREW_LIST = [
  { 
    id: "VOL-001", 
    name: "Jessica Mila", 
    role: "LO", 
    checkIn: "07:45", 
    shift: "Morning", 
    status: "PRESENT", 
    meals: { lunch: "CLAIMED", dinner: "PENDING", snack: "CLAIMED" },
    avatar: "https://github.com/shadcn.png"
  },
  { 
    id: "VOL-002", 
    name: "Dimas Anggara", 
    role: "Ball Crew", 
    checkIn: "08:10", 
    shift: "Morning", 
    status: "LATE", 
    meals: { lunch: "PENDING", dinner: "PENDING", snack: "PENDING" },
    avatar: ""
  },
  { 
    id: "VOL-003", 
    name: "Sarah Sechan", 
    role: "Usher", 
    checkIn: "-", 
    shift: "Evening", 
    status: "ABSENT", 
    meals: { lunch: "LOCKED", dinner: "LOCKED", snack: "LOCKED" },
    avatar: ""
  },
];

const MEAL_STATS = {
  lunch: { total: 100, claimed: 65, type: "Nasi Box Ayam Bakar" },
  dinner: { total: 80, claimed: 10, type: "Nasi Goreng Spesial" },
  snack: { total: 150, claimed: 120, type: "Roti & Kopi" }
};

export default function AttendanceMealsPage() {
  const [activeTab, setActiveTab] = useState("attendance");
  const [isScanOpen, setIsScanOpen] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState("");

  // Realtime Clock
  useEffect(() => {
    const timer = setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock Scan
  const handleScan = () => {
    setTimeout(() => {
        setScanResult({
            name: "Jessica Mila",
            role: "Liaison Officer",
            time: currentTime,
            status: "SUCCESS"
        });
    }, 1500);
  };

  return (
    <div className="space-y-8 p-4 md:p-8 font-body pb-24 h-[calc(100vh-64px)] flex flex-col">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-orange-500 text-orange-500 bg-orange-500/10 backdrop-blur-md">
                    <Utensils className="w-3 h-3 mr-2" /> REFUEL STATION
                </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-white">
                Attendance <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-600">& Meals</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Sistem absensi QR dan klaim konsumsi digital panitia.
            </p>
        </div>

        <Button 
            onClick={() => setIsScanOpen(true)}
            className="h-14 rounded-full px-8 bg-white text-black hover:bg-zinc-200 font-black text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
            <QrCode className="mr-2 w-6 h-6"/> SCAN QR
        </Button>
      </div>

      {/* --- LIVE STATS (BENTO) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
         {/* CLOCK CARD */}
         <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] p-6 flex items-center justify-between">
            <div>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Current Time</p>
                <p className="text-4xl font-black text-white font-mono">{currentTime}</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-400 animate-pulse">
                <Clock className="w-6 h-6"/>
            </div>
         </Card>

         {/* ATTENDANCE CARD */}
         <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-[40px] group-hover:bg-rose-500/20 transition-all"></div>
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Attendance</p>
                    <Users className="w-5 h-5 text-rose-500"/>
                </div>
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-white">85%</span>
                    <span className="text-xs font-bold text-green-500 mb-1">On Time</span>
                </div>
                <Progress value={85} className="h-1.5 mt-3 bg-zinc-800" indicatorClassName="bg-rose-500"/>
            </div>
         </Card>

         {/* MEAL QUOTA CARD */}
         <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-[40px] group-hover:bg-orange-500/20 transition-all"></div>
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Lunch Quota</p>
                    <Pizza className="w-5 h-5 text-orange-500"/>
                </div>
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-white">{MEAL_STATS.lunch.claimed}/{MEAL_STATS.lunch.total}</span>
                    <span className="text-xs font-bold text-zinc-400 mb-1">Box</span>
                </div>
                <Progress value={(MEAL_STATS.lunch.claimed/MEAL_STATS.lunch.total)*100} className="h-1.5 mt-3 bg-zinc-800" indicatorClassName="bg-orange-500"/>
            </div>
         </Card>
      </div>

      {/* --- MAIN TABS --- */}
      <div className="flex-1 bg-zinc-900/50 border border-zinc-800/50 rounded-[40px] p-2 backdrop-blur-sm flex flex-col min-h-0">
        <Tabs defaultValue="attendance" className="w-full h-full flex flex-col" onValueChange={setActiveTab}>
            
            <div className="flex flex-col md:flex-row items-center justify-between px-4 py-4 gap-4 shrink-0">
                <TabsList className="bg-zinc-950 p-1 rounded-full h-14 border border-zinc-800 w-full md:w-auto">
                    <TabsTrigger value="attendance" className="rounded-full h-12 px-8 font-bold text-sm data-[state=active]:bg-rose-600 data-[state=active]:text-white">
                        PRESENCE LOG
                    </TabsTrigger>
                    <TabsTrigger value="meals" className="rounded-full h-12 px-8 font-bold text-sm data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                        MEAL DISTRIBUTION
                    </TabsTrigger>
                </TabsList>

                <div className="relative w-full md:w-72">
                    <Search className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500" />
                    <Input 
                        placeholder="Search Crew ID / Name..." 
                        className="h-12 bg-zinc-950 border-zinc-800 rounded-full pl-10 text-white focus:ring-rose-500"
                    />
                </div>
            </div>

            {/* TAB 1: ATTENDANCE */}
            <TabsContent value="attendance" className="flex-1 overflow-hidden mt-0">
                <ScrollArea className="h-full px-4 pb-4">
                    <div className="space-y-3">
                        {CREW_LIST.map((crew) => (
                            <div key={crew.id} className="group flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-[24px] hover:border-zinc-700 transition-colors">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12 border-2 border-zinc-700">
                                        <AvatarImage src={crew.avatar} />
                                        <AvatarFallback className="bg-zinc-800 font-bold text-zinc-500">{crew.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-white text-base">{crew.name}</h4>
                                            <Badge variant="outline" className="text-[9px] border-zinc-700 text-zinc-400">{crew.role}</Badge>
                                        </div>
                                        <p className="text-xs text-zinc-500 font-medium mt-0.5">
                                            Shift: <span className="text-zinc-300">{crew.shift}</span> • Check-in: <span className="font-mono text-zinc-300">{crew.checkIn}</span>
                                        </p>
                                    </div>
                                </div>
                                <Badge className={cn(
                                    "border-none text-[10px] font-black uppercase px-3 py-1",
                                    crew.status === 'PRESENT' ? "bg-green-500/20 text-green-500" : 
                                    crew.status === 'LATE' ? "bg-yellow-500/20 text-yellow-500" : "bg-red-500/20 text-red-500"
                                )}>
                                    {crew.status}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </TabsContent>

            {/* TAB 2: MEALS */}
            <TabsContent value="meals" className="flex-1 overflow-hidden mt-0">
                <ScrollArea className="h-full px-4 pb-4">
                    <div className="space-y-3">
                        {CREW_LIST.map((crew) => (
                            <div key={crew.id} className="flex flex-col md:flex-row items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-[24px]">
                                <div className="flex items-center gap-4 w-full md:w-1/3">
                                    <Avatar className="h-12 w-12 border-2 border-zinc-700">
                                        <AvatarImage src={crew.avatar} />
                                        <AvatarFallback className="bg-zinc-800 font-bold text-zinc-500">{crew.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="font-bold text-white text-base">{crew.name}</h4>
                                        <p className="text-xs text-zinc-500 font-bold">{crew.role}</p>
                                    </div>
                                </div>
                                
                                <div className="flex-1 grid grid-cols-3 gap-2 w-full">
                                    {/* SNACK */}
                                    <Button 
                                        disabled={crew.meals.snack !== 'PENDING'}
                                        variant="outline" 
                                        className={cn(
                                            "h-12 rounded-xl text-xs font-bold flex flex-col gap-0.5 border-zinc-800",
                                            crew.meals.snack === 'CLAIMED' ? "bg-green-900/20 text-green-500 border-green-900/50" : "bg-zinc-950 text-zinc-400 hover:text-white"
                                        )}
                                    >
                                        <Coffee className="w-4 h-4"/>
                                        {crew.meals.snack}
                                    </Button>

                                    {/* LUNCH */}
                                    <Button 
                                        disabled={crew.meals.lunch !== 'PENDING'}
                                        variant="outline" 
                                        className={cn(
                                            "h-12 rounded-xl text-xs font-bold flex flex-col gap-0.5 border-zinc-800",
                                            crew.meals.lunch === 'CLAIMED' ? "bg-orange-900/20 text-orange-500 border-orange-900/50" : "bg-zinc-950 text-zinc-400 hover:text-white"
                                        )}
                                    >
                                        <Pizza className="w-4 h-4"/>
                                        LUNCH
                                    </Button>

                                    {/* DINNER */}
                                    <Button 
                                        disabled={crew.meals.dinner !== 'PENDING'}
                                        variant="outline" 
                                        className={cn(
                                            "h-12 rounded-xl text-xs font-bold flex flex-col gap-0.5 border-zinc-800",
                                            crew.meals.dinner === 'CLAIMED' ? "bg-orange-900/20 text-orange-500 border-orange-900/50" : "bg-zinc-950 text-zinc-400 hover:text-white"
                                        )}
                                    >
                                        <Utensils className="w-4 h-4"/>
                                        DINNER
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </TabsContent>
        </Tabs>
      </div>

      {/* --- SCANNER MODAL --- */}
      <Dialog open={isScanOpen} onOpenChange={(val) => {setIsScanOpen(val); setScanResult(null);}}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white rounded-[40px] max-w-sm p-0 overflow-hidden shadow-2xl">
            {scanResult ? (
                // SUCCESS STATE
                <div className="flex flex-col items-center justify-center p-8 bg-green-600 text-center animate-in zoom-in-95">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-black uppercase mb-1">Check-In Success</h2>
                    <p className="text-green-100 font-bold mb-6">{scanResult.time}</p>
                    
                    <div className="bg-green-700/50 p-4 rounded-2xl w-full mb-6">
                        <p className="text-xl font-bold">{scanResult.name}</p>
                        <p className="text-sm opacity-80 uppercase tracking-widest">{scanResult.role}</p>
                    </div>

                    <Button className="w-full h-12 rounded-xl bg-white text-green-700 font-black hover:bg-green-50" onClick={() => setScanResult(null)}>
                        SCAN NEXT
                    </Button>
                </div>
            ) : (
                // SCAN STATE
                <div className="flex flex-col items-center p-8 bg-zinc-950" onClick={handleScan}>
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-black uppercase text-white mb-2">Scan QR Crew</h2>
                        <p className="text-zinc-500 text-sm">Arahkan kamera ke ID Card panitia.</p>
                    </div>

                    <div className="w-64 h-64 border-4 border-orange-500 rounded-[32px] flex items-center justify-center relative overflow-hidden bg-black cursor-pointer group">
                        <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] opacity-20"></div>
                        {/* Scanning Line Animation */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-orange-400 shadow-[0_0_20px_#fb923c] animate-scan"></div>
                        
                        <div className="flex flex-col items-center gap-2 text-orange-500 group-hover:scale-110 transition-transform">
                            <ScanLine className="w-12 h-12" />
                            <span className="text-xs font-bold tracking-widest animate-pulse">SCANNING...</span>
                        </div>
                    </div>

                    <div className="w-full mt-8">
                        <Input placeholder="Atau input ID Manual..." className="h-12 bg-zinc-900 border-zinc-800 rounded-xl text-center text-white" />
                    </div>
                </div>
            )}
        </DialogContent>
      </Dialog>

    </div>
  );
}
