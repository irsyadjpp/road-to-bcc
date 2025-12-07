'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QrCode, Utensils, Wallet, CheckCircle2, MapPin, ScanLine, Trophy, AlertCircle, Camera, Upload } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";
import { clockIn, redeemMeal, completeMission, getCommitteeData } from "./actions";
import { EmergencyButton } from "@/components/admin/emergency-button";
import { Loader2 } from "lucide-react";

export default function CommitteeDashboard() {
  const { toast } = useToast();
  
  // State Data
  const [data, setData] = useState<any>(null);

  // State Fitur
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState("-");
  const [mealCode, setMealCode] = useState<string | null>(null);
  const [loadingMeal, setLoadingMeal] = useState(false);

  // Load Data Awal
  useEffect(() => {
    getCommitteeData().then(setData);
  }, []);

  // 1. HANDLER ABSENSI
  const handleScanAttendance = async () => {
    // Simulasi membuka kamera & scan
    toast({ title: "Membuka Kamera...", description: "Arahkan ke QR Code Pos Jaga." });
    
    setTimeout(async () => {
      const res = await clockIn("Main Gate");
      if (res.success) {
        setIsClockedIn(true);
        setCheckInTime(res.timestamp);
        toast({ 
          title: `Streak Hari ke-${res.streak}! 🔥`, 
          description: "Absensi berhasil dicatat.", 
          className: "bg-green-600 text-white" 
        });
      }
    }, 1500);
  };

  // 2. HANDLER KUPON MAKAN
  const handleRedeemMeal = async () => {
    setLoadingMeal(true);
    const res = await redeemMeal();
    if (res.success) {
      setMealCode(res.code);
    }
    setLoadingMeal(false);
  };

  // 3. HANDLER MISI
  const handleMission = async (id: number) => {
    const res = await completeMission(id);
    if (res.success) {
      // Update local state (optimistic update)
      const newMissions = data.missions.map((m: any) => 
        m.id === id ? { ...m, completed: true } : m
      );
      setData({ ...data, missions: newMissions });
      toast({ title: `+${res.xpGained} XP`, className: "bg-primary text-white font-bold" });
    }
  };

  if (!data) return <div className="p-8 text-white flex items-center justify-center h-full"><Loader2 className="w-8 h-8 animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-black text-white font-body pb-20">
      {/* Background Sporty */}
      <div className="fixed inset-0 bg-grid-sporty opacity-20 pointer-events-none" />
      
      {/* HEADER */}
      <div className="relative z-10 p-6 bg-zinc-900 border-b border-zinc-800">
        <h1 className="text-2xl font-black font-headline text-white uppercase tracking-tighter">
          Committee <span className="text-primary">Hub</span>
        </h1>
        <p className="text-zinc-400 text-sm">Welcome back, Agent Kevin.</p>
        
        {/* GAMIFICATION HEADER */}
        <div className="mt-4 flex items-center justify-between bg-black p-3 rounded-lg border border-zinc-800">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                    <Trophy className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-xs text-zinc-500 uppercase font-bold">Level 5</div>
                    <div className="text-sm font-bold text-white">Elite Officer</div>
                </div>
            </div>
            <div className="text-right">
                <div className="text-xs text-zinc-500 mb-1">1250 XP</div>
                <Progress value={75} className="w-24 h-2 bg-zinc-800" />
            </div>
        </div>
      </div>

      <div className="relative z-10 p-6 space-y-6">
        
        {/* --- FITUR 1: ABSENSI SCANNER --- */}
        <Card className="bg-zinc-900 border-zinc-800 shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><QrCode className="w-24 h-24 text-white" /></div>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                    <ScanLine className="text-primary" /> Absensi Harian
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isClockedIn ? (
                    <div className="bg-green-900/20 border border-green-900 p-4 rounded-xl text-center">
                        <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-2" />
                        <h3 className="text-xl font-bold text-green-500">CLOCKED IN</h3>
                        <p className="text-zinc-400 font-mono text-sm">{checkInTime} WIB @ Main Gate</p>
                    </div>
                ) : (
                    <Button onClick={handleScanAttendance} size="lg" className="w-full h-16 text-lg font-bold uppercase tracking-widest bg-white text-black hover:bg-zinc-200">
                        <Camera className="mr-2 w-6 h-6" /> Scan QR Pos
                    </Button>
                )}
            </CardContent>
        </Card>

        {/* --- TABS NAVIGASI FITUR LAIN --- */}
        <Tabs defaultValue="missions" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-zinc-800 h-12">
                <TabsTrigger value="missions">Misi</TabsTrigger>
                <TabsTrigger value="meals">Makan</TabsTrigger>
                <TabsTrigger value="wallet">Dompet</TabsTrigger>
            </TabsList>

            {/* --- FITUR 4: GAMIFIED TASKS --- */}
            <TabsContent value="missions" className="space-y-4 mt-4">
                {data.missions.map((mission: any) => (
                    <div key={mission.id} className={`p-4 rounded-xl border flex items-center justify-between transition-all ${mission.completed ? "bg-zinc-900/50 border-zinc-800 opacity-60" : "bg-zinc-900 border-zinc-700"}`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${mission.completed ? "bg-primary border-primary" : "border-zinc-500"}`}>
                                {mission.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                            </div>
                            <span className={mission.completed ? "line-through text-zinc-500" : "text-white font-medium"}>
                                {mission.title}
                            </span>
                        </div>
                        {mission.completed ? (
                            <Badge variant="outline" className="text-zinc-500 border-zinc-500">Done</Badge>
                        ) : (
                            <Button size="sm" variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10" onClick={() => handleMission(mission.id)}>
                                +{mission.xp} XP
                            </Button>
                        )}
                    </div>
                ))}
            </TabsContent>

            {/* --- FITUR 2: E-KUPON MAKAN --- */}
            <TabsContent value="meals" className="mt-4">
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2"><Utensils className="w-5 h-5"/> Digital Meal Ticket</CardTitle>
                        <CardDescription>Tunjukkan QR ini ke tim konsumsi.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-6">
                        {mealCode ? (
                            <div className="text-center animate-in zoom-in duration-300">
                                <div className="bg-white p-4 rounded-xl mb-4">
                                    <QRCodeSVG value={mealCode} size={180} />
                                </div>
                                <div className="font-mono text-xl font-bold text-primary tracking-widest">{mealCode}</div>
                                <p className="text-sm text-zinc-400 mt-2">Nasi Ayam Bakar + Es Teh</p>
                            </div>
                        ) : (
                            <div className="text-center space-y-4">
                                <div className="w-32 h-32 bg-zinc-800 rounded-full flex items-center justify-center mx-auto">
                                    <Utensils className="w-12 h-12 text-zinc-600" />
                                </div>
                                <p className="text-zinc-400 text-sm">Jatah makan siang tersedia pukul 12:00 - 14:00</p>
                                <Button onClick={handleRedeemMeal} disabled={loadingMeal} className="w-full">
                                    {loadingMeal ? "Generating..." : "Klaim Tiket Makan"}
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>

            {/* --- FITUR 3: MY WALLET --- */}
            <TabsContent value="wallet" className="mt-4">
                <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800">
                    <CardHeader>
                         <CardTitle className="text-zinc-400 text-sm uppercase tracking-widest">Estimasi Honorarium</CardTitle>
                         <div className="text-4xl font-black text-white font-mono mt-2">
                            Rp {data.honorarium.total.toLocaleString('id-ID')}
                         </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-white border-b border-zinc-800 pb-2">History Kehadiran</h4>
                            {data.honorarium.breakdown.map((item: any, idx: number) => (
                                <div key={idx} className="flex justify-between items-center text-sm">
                                    <div className="text-zinc-400">{item.activity} <span className="text-xs text-zinc-600">({item.date})</span></div>
                                    <div className="font-mono text-green-500">+Rp {item.amount.toLocaleString('id-ID')}</div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-8 pt-4 border-t border-zinc-800">
                            <Button variant="outline" className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                                <Upload className="mr-2 w-4 h-4" /> Upload Struk Reimbursement
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}
