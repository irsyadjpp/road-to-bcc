
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, ArrowUpRight, Zap, Users, CalendarDays, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function PlayerWebDashboard() {
  return (
    <div className="space-y-6">
      
      {/* SECTION 1: WELCOME & HERO STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         
         {/* KARTU PROFIL UTAMA (Mengambil 1 Kolom) */}
         <Card className="col-span-1 rounded-[2rem] bg-gradient-sport text-white border-none shadow-m3-3 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-10 opacity-10">
               <Trophy size={180} />
            </div>
            <CardContent className="p-8 flex flex-col h-full justify-between relative z-10">
               <div>
                  <Badge className="bg-white/20 hover:bg-white/30 text-white border-none mb-4 backdrop-blur-md">
                     VERIFIED ATHLETE
                  </Badge>
                  <h1 className="font-headline text-3xl md:text-4xl leading-tight mb-1">IRSYAD JPP</h1>
                  <p className="opacity-90 font-mono text-sm tracking-widest">BCC-8821-X</p>
               </div>
               
               <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/20">
                  <div>
                     <p className="text-xs uppercase tracking-widest opacity-70">Level</p>
                     <p className="font-headline text-2xl">ADVANCE</p>
                  </div>
                  <div>
                     <p className="text-xs uppercase tracking-widest opacity-70">Rank</p>
                     <p className="font-headline text-2xl">#42</p>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* STATUS & ACTION CENTER (Mengambil 2 Kolom) */}
         <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Action Card: Lengkapi Profil */}
            <Card className="rounded-[2rem] border-l-8 border-l-yellow-500 shadow-sm hover:shadow-md transition-shadow">
               <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                     <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600">
                        <ShieldAlert size={20} />
                     </div>
                     <span className="text-xs font-bold text-muted-foreground">Action Needed</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1">Profil Belum Lengkap</h3>
                  <p className="text-xs text-muted-foreground mb-4">Lengkapi data diri dan upload video permainan untuk penilaian TPF.</p>
                  <Button size="sm" variant="outline" className="w-full rounded-pill font-bold">Lengkapi Sekarang</Button>
               </CardContent>
            </Card>

             {/* Stat Card: Tournament Status */}
             <Card className="rounded-[2rem] border-l-8 border-l-primary shadow-sm hover:shadow-md transition-shadow">
               <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                     <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Trophy size={20} />
                     </div>
                     <Badge variant="secondary">Active</Badge>
                  </div>
                  <h3 className="font-bold text-lg mb-1">Road to BCC 2025</h3>
                  <div className="space-y-2 mb-4">
                     <div className="flex justify-between text-xs">
                        <span>Status</span>
                        <span className="font-bold text-primary">Menunggu Jadwal</span>
                     </div>
                     <Progress value={80} className="h-2" />
                  </div>
                  <Button size="sm" className="w-full rounded-pill font-bold bg-primary text-white">Lihat Detail</Button>
               </CardContent>
            </Card>
            
            {/* Quick Menu Grid (Horizontal) */}
            <div className="col-span-1 sm:col-span-2 grid grid-cols-3 gap-4 mt-2">
               {[
                  { icon: Users, label: "Cari Partner", href: "/players/find-partner", color: "text-blue-600 bg-blue-50" },
                  { icon: CalendarDays, label: "Jadwal Saya", href: "/players/schedule", color: "text-purple-600 bg-purple-50" },
                  { icon: Zap, label: "Live Score", href: "/players/live-score", color: "text-orange-600 bg-orange-50" },
               ].map((menu, i) => (
                  <Link key={i} href={menu.href}>
                     <Card className="h-full hover:bg-secondary/50 transition-colors border-none shadow-sm cursor-pointer rounded-3xl">
                        <CardContent className="p-4 flex flex-col items-center justify-center gap-2 text-center">
                           <div className={`h-10 w-10 rounded-full flex items-center justify-center ${menu.color}`}>
                              <menu.icon size={20} />
                           </div>
                           <span className="text-xs font-bold">{menu.label}</span>
                        </CardContent>
                     </Card>
                  </Link>
               ))}
            </div>

         </div>
      </div>

      {/* SECTION 2: CONTENT ROW (Table vs Feed) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         
         {/* LEFT CONTENT: MATCH SCHEDULE (Table Style) - 3 Kolom */}
         <Card className="col-span-1 lg:col-span-3 rounded-[2rem] shadow-m3-1 border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
               <CardTitle className="text-lg font-bold">Jadwal Pertandingan Terdekat</CardTitle>
               <Button variant="link" className="text-primary text-xs font-bold">Lihat Semua</Button>
            </CardHeader>
            <CardContent>
               <div className="border rounded-2xl overflow-hidden">
                  <table className="w-full text-sm text-left">
                     <thead className="bg-secondary/50 text-muted-foreground font-bold text-xs uppercase">
                        <tr>
                           <th className="px-6 py-4">Waktu</th>
                           <th className="px-6 py-4">Kategori</th>
                           <th className="px-6 py-4">Lawan</th>
                           <th className="px-6 py-4">Court</th>
                           <th className="px-6 py-4 text-right">Status</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-border">
                        {[1, 2].map((item) => (
                           <tr key={item} className="hover:bg-secondary/20 transition-colors">
                              <td className="px-6 py-4 font-bold">10:00 WIB<br/><span className="text-xs text-muted-foreground font-normal">24 Des</span></td>
                              <td className="px-6 py-4"><Badge variant="outline">MD - Inter</Badge></td>
                              <td className="px-6 py-4 font-medium">Kevin / Marcus</td>
                              <td className="px-6 py-4">Lapangan 1</td>
                              <td className="px-6 py-4 text-right">
                                 <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">Upcoming</Badge>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </CardContent>
         </Card>

         {/* RIGHT CONTENT: NOTIFICATIONS (List Style) - 1 Kolom */}
         <Card className="col-span-1 rounded-[2rem] shadow-m3-1 border-none bg-secondary/10">
            <CardHeader>
               <CardTitle className="text-lg font-bold">Pengumuman</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-background p-4 rounded-2xl shadow-sm border border-border/50 flex gap-3 items-start">
                     <div className="h-2 w-2 bg-primary rounded-full mt-2 shrink-0" />
                     <div>
                        <p className="text-xs font-bold mb-1">Perubahan Jadwal Grup A</p>
                        <p className="text-[10px] text-muted-foreground line-clamp-2">
                           Dikarenakan alasan teknis, jadwal grup A dimundurkan 30 menit.
                        </p>
                        <span className="text-[9px] text-muted-foreground mt-2 block">2 jam yang lalu</span>
                     </div>
                  </div>
               ))}
               <Button variant="outline" className="w-full rounded-pill text-xs font-bold">Lihat Inbox</Button>
            </CardContent>
         </Card>

      </div>
    </div>
  );
}
