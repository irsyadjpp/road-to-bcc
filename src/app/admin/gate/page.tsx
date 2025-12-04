
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { 
  ScanLine, UserCheck, Ban, ShieldAlert, 
  RefreshCw, History, Siren 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { verifyTicket, getAccessLogs, reportSecurityIncident } from "./actions";

export default function GateDashboard() {
  const { toast } = useToast();
  const [scanInput, setScanInput] = useState("");
  const [scanResult, setScanResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  const [isIncidentOpen, setIsIncidentOpen] = useState(false);

  // Real-time Clock
  const [time, setTime] = useState(new Date());
  useEffect(() => {
      const timer = setInterval(() => setTime(new Date()), 1000);
      getAccessLogs().then(setLogs); // Load logs awal
      return () => clearInterval(timer);
  }, []);

  const handleScan = async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (!scanInput) return;

      setIsScanning(true);
      setScanResult(null); // Reset tampilan

      const res = await verifyTicket(scanInput);
      
      setIsScanning(false);
      setScanResult(res);

      if (res.success) {
          // Play Sound Success (Opsional)
          toast({ title: "Akses Diterima", className: "bg-green-600 text-white" });
          getAccessLogs().then(setLogs); // Refresh logs
      } else {
          // Play Sound Error (Opsional)
          toast({ title: "Akses Ditolak", description: res.message, variant: "destructive" });
      }
      
      setScanInput(""); // Clear input agar siap scan lagi
  };

  const handleIncidentReport = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);
      
      await reportSecurityIncident(data);
      toast({ title: "Laporan Terkirim", description: "Koordinator Operasional telah dinotifikasi." });
      setIsIncidentOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* HEADER & JAM */}
      <div className="flex justify-between items-center bg-black text-white p-4 rounded-xl shadow-lg">
         <div>
            <h2 className="text-2xl font-black font-headline">GATE CONTROL</h2>
            <p className="text-zinc-400 text-sm">Pos Keamanan Utama</p>
         </div>
         <div className="text-right">
             <div className="text-3xl font-mono font-bold">{time.toLocaleTimeString('id-ID', {hour12: false})}</div>
             <div className="text-xs text-zinc-400">{time.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* AREA SCANNER */}
          <div className="space-y-6">
              <Card className="border-2 border-primary/20 shadow-xl">
                  <CardHeader className="pb-2"><CardTitle>Scan Tiket / ID Card</CardTitle></CardHeader>
                  <CardContent>
                      <form onSubmit={handleScan} className="flex gap-3">
                          <Input 
                             autoFocus
                             placeholder="Klik disini & Scan QR..." 
                             value={scanInput}
                             onChange={(e) => setScanInput(e.target.value)}
                             className="h-14 text-lg font-mono"
                          />
                          <Button type="submit" size="icon" className="h-14 w-14 bg-primary hover:bg-primary/90" disabled={isScanning}>
                              {isScanning ? <RefreshCw className="w-6 h-6 animate-spin" /> : <ScanLine className="w-6 h-6" />}
                          </Button>
                      </form>
                      <p className="text-xs text-muted-foreground mt-2">
                          *Pastikan kursor aktif di kolom input saat menggunakan alat scanner.
                      </p>
                  </CardContent>
              </Card>

              {/* HASIL SCAN (RESULT CARD) */}
              {scanResult && (
                  <Card className={`border-l-8 shadow-lg animate-in fade-in zoom-in duration-300 ${scanResult.success ? 'border-l-green-500 bg-green-50' : 'border-l-red-600 bg-red-50'}`}>
                      <CardContent className="p-8 text-center">
                          {scanResult.success ? (
                              <>
                                  <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                                      <UserCheck className="w-12 h-12 text-green-600" />
                                  </div>
                                  <h2 className="text-3xl font-black text-green-800 mb-1">AKSES DITERIMA</h2>
                                  <p className="text-green-700 font-medium text-lg">{scanResult.data.name}</p>
                                  <Badge className="mt-3 text-lg px-4 py-1 bg-green-600">{scanResult.data.role}</Badge>
                                  {scanResult.data.team && <p className="mt-2 text-muted-foreground">{scanResult.data.team}</p>}
                              </>
                          ) : (
                              <>
                                  <div className="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                                      <Ban className="w-12 h-12 text-red-600" />
                                  </div>
                                  <h2 className="text-3xl font-black text-red-800 mb-1">AKSES DITOLAK</h2>
                                  <p className="text-red-700 font-bold text-xl">{scanResult.message}</p>
                                  <p className="text-sm text-red-600 mt-2">Silakan hubungi meja registrasi jika ada masalah.</p>
                              </>
                          )}
                      </CardContent>
                  </Card>
              )}
          </div>

          {/* SIDEBAR INFO */}
          <div className="space-y-6">
              
              {/* TOMBOL DARURAT */}
              <Dialog open={isIncidentOpen} onOpenChange={setIsIncidentOpen}>
                  <DialogTrigger asChild>
                      <Button variant="destructive" className="w-full h-16 text-lg font-bold shadow-red-200 shadow-lg">
                          <Siren className="w-6 h-6 mr-3 animate-pulse" /> LAPOR INSIDEN KEAMANAN
                      </Button>
                  </DialogTrigger>
                  <DialogContent>
                      <DialogHeader>
                          <DialogTitle className="flex items-center gap-2 text-red-600">
                              <ShieldAlert className="w-6 h-6" /> Laporan Insiden
                          </DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleIncidentReport} className="space-y-4">
                          <div className="space-y-2">
                              <label className="text-sm font-bold">Jenis Kejadian</label>
                              <Input name="type" placeholder="Cth: Perkelahian, Pencurian, Tiket Palsu" required />
                          </div>
                          <div className="space-y-2">
                              <label className="text-sm font-bold">Lokasi</label>
                              <Input name="location" placeholder="Cth: Gerbang Utama" required />
                          </div>
                          <div className="space-y-2">
                              <label className="text-sm font-bold">Keterangan</label>
                              <Textarea name="desc" placeholder="Kronologi singkat..." required />
                          </div>
                          <DialogFooter>
                              <Button type="submit" className="bg-red-600 hover:bg-red-700">Kirim Laporan Cepat</Button>
                          </DialogFooter>
                      </form>
                  </DialogContent>
              </Dialog>

              {/* LOG MASUK TERAKHIR */}
              <Card>
                  <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
                          <History className="w-4 h-4" /> Log Masuk Terakhir
                      </CardTitle>
                  </CardHeader>
                  <CardContent>
                      <Table>
                          <TableHeader>
                              <TableRow>
                                  <TableHead className="w-[80px]">Jam</TableHead>
                                  <TableHead>Nama</TableHead>
                                  <TableHead>Role</TableHead>
                              </TableRow>
                          </TableHeader>
                          <TableBody>
                              {logs.slice(0, 5).map((log: any) => (
                                  <TableRow key={log.id}>
                                      <TableCell className="font-mono text-xs">{log.time}</TableCell>
                                      <TableCell className="font-medium text-sm">{log.name}</TableCell>
                                      <TableCell><Badge variant="outline" className="text-[10px]">{log.role}</Badge></TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </CardContent>
              </Card>
          </div>
      </div>
    </div>
  );
}
