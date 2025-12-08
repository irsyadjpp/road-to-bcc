'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";

// Mock Tickets
const TICKETS = [
  { id: "T-101", team: "PB Djarum", issue: "Salah input nama pemain di sistem", target: "MATCH_CONTROL", status: "OPEN", answer: "" },
  { id: "T-102", team: "PB Jaya", issue: "Konfirmasi jadwal tanding hari Jumat", target: "MATCH_CONTROL", status: "RESOLVED", answer: "Main sesi 2 jam 14.00" },
];

export default function MLOHelpdeskPage() {
  const [tickets, setTickets] = useState(TICKETS);
  const [newTicket, setNewTicket] = useState({ team: "", issue: "", target: "MATCH_CONTROL" });

  const handleSubmit = () => {
    const ticket = {
        id: `T-${Date.now()}`,
        ...newTicket,
        status: "OPEN",
        answer: ""
    };
    setTickets([ticket, ...tickets]);
    setNewTicket({ team: "", issue: "", target: "MATCH_CONTROL" });
  };

  return (
    <div className="p-6 space-y-6">
       <div className="flex justify-between items-center">
          <div>
             <h2 className="text-3xl font-bold font-headline">MLO Communication Hub</h2>
             <p className="text-muted-foreground">Pusat pertanyaan peserta. Jangan biarkan pertanyaan menggantung di WA.</p>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* FORM INPUT PERTANYAAN (KIRI) */}
          <Card className="border-t-4 border-t-blue-500 shadow-md h-fit">
             <CardHeader><CardTitle>Catat Pertanyaan Baru</CardTitle></CardHeader>
             <CardContent className="space-y-4">
                <div className="space-y-2">
                   <label className="text-sm font-bold">Nama Tim / Manager</label>
                   <Input placeholder="Cth: PB Djarum (Pak Budi)" value={newTicket.team} onChange={e => setNewTicket({...newTicket, team: e.target.value})} />
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-bold">Divisi Tujuan</label>
                   <Select value={newTicket.target} onValueChange={v => setNewTicket({...newTicket, target: v})}>
                      <SelectTrigger><SelectValue/></SelectTrigger>
                      <SelectContent>
                         <SelectItem value="MATCH_CONTROL">Pertandingan (Jadwal/Skor)</SelectItem>
                         <SelectItem value="FINANCE">Keuangan (Bayaran)</SelectItem>
                         <SelectItem value="LOGISTIK">Logistik (Jersey/ID)</SelectItem>
                      </SelectContent>
                   </Select>
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-bold">Isi Pertanyaan</label>
                   <Textarea placeholder="Detail pertanyaan..." value={newTicket.issue} onChange={e => setNewTicket({...newTicket, issue: e.target.value})} />
                </div>
                <Button className="w-full" onClick={handleSubmit}>KIRIM KE DIVISI TERKAIT</Button>
             </CardContent>
          </Card>

          {/* LIST TIKET (KANAN) */}
          <div className="lg:col-span-2 space-y-4">
             {tickets.map((ticket) => (
                <Card key={ticket.id} className="hover:bg-muted/20 transition-colors">
                   <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                         <div className="flex items-center gap-2">
                            <Badge variant="outline">{ticket.id}</Badge>
                            <span className="font-bold">{ticket.team}</span>
                            <ArrowRight className="w-4 h-4 text-muted-foreground"/>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{ticket.target}</Badge>
                         </div>
                         <Badge className={ticket.status === 'OPEN' ? 'bg-red-500' : 'bg-green-600'}>{ticket.status}</Badge>
                      </div>
                      
                      <p className="text-sm mb-3">Q: "{ticket.issue}"</p>
                      
                      {ticket.status === 'RESOLVED' ? (
                         <div className="bg-green-50 p-3 rounded text-sm text-green-800 border border-green-200">
                            <strong>A:</strong> {ticket.answer}
                         </div>
                      ) : (
                         <div className="text-xs text-muted-foreground italic flex items-center gap-2">
                            <MessageSquare className="w-3 h-3"/> Menunggu jawaban dari divisi terkait...
                         </div>
                      )}
                   </CardContent>
                </Card>
             ))}
          </div>
       </div>
    </div>
  );
}