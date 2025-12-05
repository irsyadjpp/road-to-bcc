'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, TrendingUp, AlertTriangle, CheckCircle2, FileText, BarChart2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function DirectorDashboard() {
  // Mock data for Director's view
  const stats = [
    { title: "Total Tim Terdaftar", value: "32 / 64", icon: Users, desc: "50% Kuota Terisi", progress: 50 },
    { title: "Verifikasi Pemain (TPF)", value: "280 / 450", icon: CheckCircle2, desc: "62% Selesai", progress: 62 },
    { title: "Protes Masuk", value: "3", icon: AlertTriangle, desc: "2 Perlu Keputusan", progress: 0 },
  ];

  const recentActivities = [
    { type: "TEAM", desc: "Tim Baru Mendaftar: PB Jaya Raya", time: "2m ago", status: "NEW"},
    { type: "FINANCE", desc: "Pembayaran Lunas: PB Exist", time: "1h ago", status: "PAID"},
    { type: "TPF", desc: "TPF menolak pemain: Andi (PB Smash)", time: "3h ago", status: "REJECTED"},
    { type: "MATCH", desc: "Hasil Pertandingan Disahkan: Lap. 1", time: "5h ago", status: "FINAL"},
  ];

  return (
    <div className="space-y-8">
       <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline tracking-tight">Director's Dashboard</h1>
        <p className="text-muted-foreground">Ringkasan strategis dan progres keseluruhan turnamen.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 text-muted-foreground`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mb-2">
                {stat.desc}
              </p>
              {stat.progress > 0 && <Progress value={stat.progress} className="h-2"/>}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5"/>
                Grafik Pendaftaran
            </CardTitle>
            <CardDescription>Tren pendaftaran tim selama seminggu terakhir.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg bg-card">
            <p className="text-muted-foreground text-sm">Grafik Pendaftaran (Placeholder)</p>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Aktivitas Terbaru</CardTitle>
                <CardDescription>Log kejadian penting dari semua divisi.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody>
                        {recentActivities.map((act, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                <div className="font-medium">{act.desc}</div>
                                <div className="text-xs text-muted-foreground">{act.time}</div>
                            </TableCell>
                            <TableCell className="text-right">
                                {act.status === 'NEW' && <Badge className="bg-blue-500/10 text-blue-400">{act.type}</Badge>}
                                {act.status === 'PAID' && <Badge className="bg-green-500/10 text-green-400">{act.type}</Badge>}
                                {act.status === 'FINAL' && <Badge variant="secondary">{act.type}</Badge>}
                                {act.status === 'REJECTED' && <Badge className="bg-red-500/10 text-red-400">{act.type}</Badge>}
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
