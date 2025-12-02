'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Loader2, CheckCircle, XCircle, DollarSign, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { getProtestList, processRefereeDecision, confirmDeposit } from '@/app/manager/(dashboard)/protest/actions';
import { useToast } from '@/hooks/use-toast';

export default function AdminProtestsPage() {
  const [protests, setProtests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProtest, setSelectedProtest] = useState<any>(null);
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
  const [decisionReason, setDecisionReason] = useState('');
  const [decisionType, setDecisionType] = useState<'ACCEPTED' | 'REJECTED' | null>(null);
  const { toast } = useToast();
  
  const fetchProtests = async () => {
    setLoading(true);
    const data = await getProtestList();
    setProtests(data.sort((a,b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()));
    setLoading(false);
  };

  useEffect(() => {
    fetchProtests();
  }, []);

  const handleOpenDecision = (protest: any) => {
    setSelectedProtest(protest);
    setDecisionType(null);
    setDecisionReason('');
    setIsDecisionModalOpen(true);
  };
  
  const handleConfirmDeposit = async (protestId: string) => {
    const result = await confirmDeposit(protestId);
    if(result.success) {
      toast({title: "Berhasil", description: result.message});
      fetchProtests();
    } else {
      toast({title: "Gagal", description: result.message, variant: "destructive"});
    }
  }

  const handleDecisionSubmit = async () => {
    if (!decisionType) {
        toast({ title: "Validasi Gagal", description: "Wajib pilih keputusan (Diterima/Ditolak)", variant: "destructive"});
        return;
    }
    if (decisionType === 'REJECTED' && !decisionReason.trim()) {
        toast({ title: "Validasi Gagal", description: "Alasan penolakan wajib diisi jika protes ditolak.", variant: "destructive"});
        return;
    }
    
    const result = await processRefereeDecision(selectedProtest.id, decisionType, decisionReason);
    
    if (result.success) {
        toast({title: "Sukses!", description: result.message, className: "bg-green-600 text-white"});
        setIsDecisionModalOpen(false);
        fetchProtests();
    } else {
        toast({title: "Error", description: result.message, variant: "destructive"});
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-bold font-headline">Manajemen Protes</h2>
            <p className="text-muted-foreground">
                Tinjau, terima deposit, dan putuskan protes yang diajukan oleh manajer tim.
            </p>
        </div>
        <Button onClick={fetchProtests} variant="outline" size="sm" disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Daftar Pengajuan Protes</CardTitle>
            <CardDescription>Urut berdasarkan waktu pengajuan terbaru.</CardDescription>
        </CardHeader>
        <CardContent>
            {loading ? (
                <div className="text-center py-10"><Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" /></div>
            ) : (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>No. Protes</TableHead>
                        <TableHead>Tim Pelapor</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {protests.length === 0 ? (
                        <TableRow><TableCell colSpan={5} className="text-center h-24">Belum ada protes yang masuk.</TableCell></TableRow>
                    ) : (
                    protests.map((protest) => (
                        <TableRow key={protest.id}>
                        <TableCell className="font-mono text-xs">{protest.id}</TableCell>
                        <TableCell className='font-medium'>{protest.teamName}</TableCell>
                        <TableCell>{protest.category || '-'}</TableCell>
                        <TableCell>
                            {protest.status === 'PENDING_DEPOSIT' && <Badge variant="destructive" className="bg-red-700 text-white">Menunggu Deposit</Badge>}
                            {protest.status === 'PENDING_REVIEW' && <Badge className="bg-yellow-500 text-black">Deposit Diterima</Badge>}
                            {protest.status.includes('ACCEPTED') && <Badge className="bg-green-600 text-white">Diterima</Badge>}
                            {protest.status.includes('REJECTED') && <Badge variant="destructive">Ditolak</Badge>}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                            {protest.status === 'PENDING_DEPOSIT' && (
                                <Button size="sm" variant="secondary" onClick={() => handleConfirmDeposit(protest.id)}>
                                    <DollarSign className="w-4 h-4 mr-2" /> Konfirmasi Deposit
                                </Button>
                            )}
                            <Button size="sm" variant="outline" onClick={() => handleOpenDecision(protest)} disabled={protest.status === 'PENDING_DEPOSIT'}>
                                <Eye className="w-4 h-4 mr-2" /> Putuskan
                            </Button>
                        </TableCell>
                        </TableRow>
                    )))}
                </TableBody>
            </Table>
            )}
        </CardContent>
      </Card>
      
      {/* Modal Keputusan Referee */}
      <Dialog open={isDecisionModalOpen} onOpenChange={setIsDecisionModalOpen}>
        <DialogContent className="max-w-xl">
            <DialogHeader>
                <DialogTitle>Keputusan Referee ({selectedProtest?.id})</DialogTitle>
                <DialogDescription>Tim: {selectedProtest?.teamName} vs {selectedProtest?.opponentTeam}. Pelanggaran: {selectedProtest?.violationType?.join(', ')}</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
                <Label className="font-bold text-sm">Hasil Investigasi:</Label>
                <RadioGroup onValueChange={(val: 'ACCEPTED' | 'REJECTED') => setDecisionType(val)}>
                    <Label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-background has-[[data-state=checked]]:border-green-500 has-[[data-state=checked]]:bg-green-500/10">
                        <RadioGroupItem value="ACCEPTED" id="decision-accept" />
                        <CheckCircle className="w-5 h-5 text-green-600"/>
                        <div className="leading-tight">
                            <p className="font-semibold text-green-700">PROTES DITERIMA</p>
                            <p className="text-xs text-muted-foreground">Uang jaminan dikembalikan.</p>
                        </div>
                    </Label>
                    <Label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-background has-[[data-state=checked]]:border-red-500 has-[[data-state=checked]]:bg-red-500/10">
                        <RadioGroupItem value="REJECTED" id="decision-reject" />
                        <XCircle className="w-5 h-5 text-red-600"/>
                        <div className="leading-tight">
                             <p className="font-semibold text-red-700">PROTES DITOLAK</p>
                             <p className="text-xs text-muted-foreground">Uang jaminan hangus.</p>
                        </div>
                    </Label>
                </RadioGroup>
                
                {decisionType === 'REJECTED' && (
                    <div className='pt-2 animate-in fade-in'>
                        <Label htmlFor="reason-textarea">Alasan Penolakan (Wajib Diisi)</Label>
                        <Textarea id="reason-textarea" placeholder="Contoh: Setelah meninjau video, TPF memutuskan skill pemain sesuai dengan level Intermediate. Protes ditolak..." value={decisionReason} onChange={(e) => setDecisionReason(e.target.value)} />
                    </div>
                )}
            </div>

            <DialogFooter>
                <Button variant="outline" onClick={() => setIsDecisionModalOpen(false)}>Batal</Button>
                <Button 
                    className={decisionType === 'ACCEPTED' ? 'bg-green-600 hover:bg-green-700' : 'bg-destructive hover:bg-destructive/90'} 
                    onClick={handleDecisionSubmit}
                    disabled={!decisionType || (decisionType === 'REJECTED' && !decisionReason)}
                >
                    <CheckCircle className="w-4 h-4 mr-2" /> Simpan Keputusan Final
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
