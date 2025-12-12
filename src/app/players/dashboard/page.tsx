
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Users, 
  Calendar, 
  QrCode, 
  ChevronRight, 
  AlertCircle,
  Zap
} from "lucide-react";
import { QRCheckInDialog } from "@/components/player/qr-checkin-dialog";

export default function PlayerDashboard() {
  const [isQRScanOpen, setIsQRScanOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* HEADER SECTION: Gen-Z Greeting with Sporty Gradient Text */}
      <header className="px-6 pt-8 pb-6">
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="text-muted-foreground font-medium">Welcome back,</p>
            <h1 className="text-3xl font-headline tracking-tight">
              IRSYAD <span className="text-primary">JPP</span>
            </h1>
          </div>
          <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>IJ</AvatarFallback>
          </Avatar>
        </div>
        
        {/* NOTIFICATION TICKER (Marquee Animation from Tailwind Config) */}
        <div className="bg-secondary/50 rounded-full px-4 py-2 flex items-center gap-2 overflow-hidden border border-border/50">
          <Zap className="h-4 w-4 text-orange-500 shrink-0" />
          <div className="whitespace-nowrap overflow-hidden w-full">
            <p className="text-xs font-medium animate-marquee inline-block">
              Batasan pembayaran Turnamen Road to BCC berakhir dalam 24 jam! • Penilaian TPF Anda telah selesai.
            </p>
          </div>
        </div>
      </header>

      <main className="px-6 space-y-6">
        
        {/* ATHLETE ID CARD: High Impact, Gradient Background */}
        <div className="relative overflow-hidden rounded-4xl bg-gradient-sport text-white shadow-m3-3 p-6">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-white/80 text-sm font-medium mb-1">Athlete Code</p>
                <p className="font-mono text-2xl font-bold tracking-wider">BCC-8821</p>
              </div>
              <Badge className="bg-white/20 text-white hover:bg-white/30 border-none backdrop-blur-md">
                Verified
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-white/80 text-xs uppercase tracking-widest mb-1">Tier</p>
                <p className="font-headline text-3xl">ADVANCE</p>
              </div>
              <div>
                <p className="text-white/80 text-xs uppercase tracking-widest mb-1">Rank</p>
                <p className="font-headline text-3xl">#42</p>
              </div>
            </div>
          </div>
          
          {/* Decorative Background Pattern */}
          <div className="absolute -right-10 -bottom-20 opacity-20">
             <Trophy size={200} />
          </div>
        </div>

        {/* STATUS TRACKER: Material 3 Card style */}
        <Card className="rounded-3xl border-none shadow-m3-1 bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Action Needed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-secondary/50 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">Lengkapi Profil</p>
                <p className="text-xs text-muted-foreground">80% Selesai</p>
              </div>
              <Button size="sm" variant="default" className="rounded-pill px-6 shadow-lg shadow-primary/20">
                Fix
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span>TPF Assessment</span>
                <span className="text-green-500">Completed</span>
              </div>
              <Progress value={100} className="h-2 rounded-full" />
            </div>
          </CardContent>
        </Card>

        {/* MENU GRID: Bento Box Style */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="rounded-3xl border-none shadow-m3-1 hover:bg-secondary/50 transition-colors cursor-pointer group">
            <CardContent className="p-5 flex flex-col items-center justify-center gap-3 text-center h-full">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <Users size={24} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Cari Partner</h3>
                <p className="text-[10px] text-muted-foreground mt-1">Find your duo</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-none shadow-m3-1 hover:bg-secondary/50 transition-colors cursor-pointer group">
            <CardContent className="p-5 flex flex-col items-center justify-center gap-3 text-center h-full">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Calendar size={24} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Jadwal</h3>
                <p className="text-[10px] text-muted-foreground mt-1">Upcoming matches</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* TOURNAMENT REGISTRATION CTA */}
        <div className="bg-foreground text-background rounded-3xl p-6 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-headline text-2xl mb-2 w-2/3 leading-tight">ROAD TO BCC 2025</h3>
            <p className="text-sm opacity-80 mb-6 w-3/4">Pendaftaran dibuka. Validasi matriks otomatis aktif.</p>
            <Button className="w-full rounded-pill bg-primary hover:bg-primary/90 text-white h-12 text-base font-bold shadow-lg shadow-red-900/20">
              Daftar Sekarang
            </Button>
          </div>
        </div>

      </main>

      {/* FLOATING ACTION BUTTON (QR CODE) - Material Design Signature */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          size="icon" 
          onClick={() => setIsQRScanOpen(true)}
          className="h-16 w-16 rounded-2xl bg-primary text-white shadow-m3-3 hover:scale-105 transition-transform"
        >
          <QrCode size={32} />
        </Button>
      </div>

      <QRCheckInDialog isOpen={isQRScanOpen} onOpenChange={setIsQRScanOpen} />
    </div>
  );
}
