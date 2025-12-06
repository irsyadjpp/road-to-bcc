'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, Users, Activity, AlertTriangle, 
  Wallet, Trophy, Timer, ArrowUpRight 
} from "lucide-react";

export default function DirectorDashboard() {
  // Mock Data (Nanti diganti data real dari API)
  const stats = {
    budgetUsed: 65, // %
    totalIncome: 125000000,
    totalExpense: 82000000,
    visitorsNow: 412,
    matchDelay: 0, // menit
    medicalIncidents: 1, // kasus
    tpfPending: 12,
    sponsorshipGoal: 80, // %
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black font-headline text-foreground tracking-tight">
            COMMAND CENTER
          </h1>
          <p className="text-muted-foreground font-medium">
            Live Monitoring • GOR KONI Bandung
          </p>
        </div>
        <div className="flex gap-2">
           <Badge variant="outline" className="px-3 py-1 border-green-500 text-green-600 bg-green-500/10 animate-pulse">
              ● SYSTEM OPERATIONAL
           </Badge>
           <span className="text-sm font-mono text-muted-foreground">
              Update: {new Date().toLocaleTimeString('id-ID')}
           </span>
        </div>
      </div>

      {/* BENTO GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. FINANCIAL HEALTH (DOUBLE WIDTH) */}
        <Card className="col-span-1 md:col-span-2 bg-gradient-to-br from-zinc-900 to-black text-white border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-zinc-400 text-xs uppercase tracking-widest font-bold flex items-center gap-2">
              <Wallet className="w-4 h-4 text-green-400" /> Financial Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-4xl font-black text-green-400">Rp {(stats.totalIncome - stats.totalExpense).toLocaleString('id-ID')}</p>
                <p className="text-sm text-zinc-400">Current Cash Balance</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">Rp {stats.totalIncome.toLocaleString('id-ID')}</p>
                <p className="text-xs text-zinc-500">Total Revenue</p>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-zinc-400">
                <span>Budget Usage</span>
                <span>{stats.budgetUsed}%</span>
              </div>
              <Progress value={stats.budgetUsed} className="h-2 bg-zinc-800" indicatorClassName="bg-green-500" />
            </div>
          </CardContent>
        </Card>

        {/* 2. LIVE CROWD */}
        <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-xs uppercase tracking-widest font-bold flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" /> Live Crowd
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black text-foreground">{stats.visitorsNow}</span>
              <span className="text-sm font-bold text-muted-foreground">pax</span>
            </div>
            <p className="text-xs text-green-600 font-bold mt-2 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" /> +12% dari kemarin
            </p>
          </CardContent>
        </Card>

        {/* 3. MATCH STATUS (KPI: ZERO DELAY) */}
        <Card className={`${stats.matchDelay > 0 ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20' : 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20'}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs uppercase tracking-widest font-bold flex items-center gap-2 text-muted-foreground">
              <Timer className="w-4 h-4" /> Schedule Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.matchDelay === 0 ? (
               <>
                 <div className="text-3xl font-black text-green-700 dark:text-green-400">ON TIME</div>
                 <p className="text-xs text-green-800 dark:text-green-500 mt-1">Zero Delay Achieved</p>
               </>
            ) : (
               <>
                 <div className="text-3xl font-black text-red-600 dark:text-red-400">+{stats.matchDelay} MNT</div>
                 <p className="text-xs text-red-800 dark:text-red-500 mt-1">Keterlambatan Akumulatif</p>
               </>
            )}
          </CardContent>
        </Card>

        {/* 4. INTEGRITY ALERT (TPF) */}
        <Card className="bg-card border-border">
           <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-xs uppercase tracking-widest font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" /> Integrity (TPF)
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="flex justify-between items-center">
                <div>
                   <div className="text-3xl font-black text-foreground">{stats.tpfPending}</div>
                   <p className="text-xs text-muted-foreground">Pending Review</p>
                </div>
                <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => window.location.href='/admin/tpf'}>
                   Audit <ArrowUpRight className="w-3 h-3 ml-1" />
                </Button>
             </div>
          </CardContent>
        </Card>

        {/* 5. MEDICAL / SAFETY */}
        <Card className="bg-card border-border">
           <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-xs uppercase tracking-widest font-bold flex items-center gap-2">
              <Activity className="w-4 h-4 text-red-500" /> Safety Log
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="text-3xl font-black text-foreground">{stats.medicalIncidents}</div>
             <p className="text-xs text-muted-foreground">Insiden Medis Hari Ini</p>
          </CardContent>
        </Card>

        {/* 6. SPONSORSHIP TARGET */}
        <Card className="col-span-1 md:col-span-2 bg-blue-600 text-white border-none">
           <CardContent className="p-6 flex items-center justify-between">
              <div>
                 <p className="text-blue-200 text-xs uppercase font-bold mb-1">Sponsorship Target</p>
                 <div className="text-4xl font-black">{stats.sponsorshipGoal}%</div>
                 <p className="text-sm text-blue-100">Menuju target Rp 200 Juta</p>
              </div>
              <div className="h-16 w-16 rounded-full border-4 border-white/30 flex items-center justify-center">
                 <Trophy className="w-8 h-8" />
              </div>
           </CardContent>
        </Card>

      </div>
    </div>
  );
}
