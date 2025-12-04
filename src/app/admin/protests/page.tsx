
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Gavel, CheckCircle, XCircle, AlertOctagon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function RefereeDecisionPage() {
  const { toast } = useToast();
  const [caseId, setCaseId] = useState<string>("");
  const [verdict, setVerdict] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const handleSubmitDecision = () => {
      if (!verdict) return alert("Pilih keputusan!");
      
      // Logika simpan ke database
      toast({
          title: "Keputusan Final Disimpan",
          description: `Kasus ${caseId} telah diputus: ${verdict}`,
          className: verdict === 'ACCEPTED' ? "bg-green-600 text-white" : "bg-red-600 text-white"
      });
      
      // Reset form
      setCaseId(""); setVerdict(""); setNotes("");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
       <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-black text-white rounded-full mb-4">
              <Gavel className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black font-headline">Ruang Keputusan Referee</h2>
          <p className="text-muted-foreground">Proses sengketa, protes, dan disiplin turnamen.</p>
       </div>

       <Card>
          <CardHeader><CardTitle>Input Keputusan</CardTitle></CardHeader>
          <CardContent className="space-y-6">
              
              {/* Pilih Kasus (Nanti dari DB Protes/TPF) */}
              <div className="space-y-2">
                  <label className="text-sm font-bold">Pilih Kasus / ID Protes</label>
                  <Select onValueChange={setCaseId}>
                      <SelectTrigger><SelectValue placeholder="Pilih Kasus Pending..." /></SelectTrigger>
                      <SelectContent>
                          <SelectItem value="PRT/001">PRT/001 - PB Djarum (Dugaan Joki)</SelectItem>
                          <SelectItem value="PRT/002">PRT/002 - PB Smash (Protes Skor)</SelectItem>
                          <SelectItem value="TPF/005">TPF/005 - Temuan Sandbagging Lap. 3</SelectItem>
                      </SelectContent>
                  </Select>
              </div>

              {/* Detail Kasus (Read Only Preview) */}
              {caseId && (
                  <div className="bg-secondary/20 p-4 rounded-lg text-sm space-y-2 border border-l-4 border-l-primary">
                      <p><strong>Pelapor:</strong> Manajer PB Djarum</p>
                      <p><strong>Terlapor:</strong> Pemain X (PB Jaya)</p>
                      <p><strong>Masalah:</strong> Level permainan tidak sesuai video (Advance main di Beginner).</p>
                      <p><strong>Bukti:</strong> Video TPF & Rekaman Lapangan.</p>
                  </div>
              )}

              {/* Form Keputusan */}
              <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                      <label className="text-sm font-bold">Keputusan Final</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <Button 
                            type="button" 
                            variant={verdict === 'ACCEPTED' ? 'default' : 'outline'}
                            className={verdict === 'ACCEPTED' ? 'bg-green-600 hover:bg-green-700' : 'hover:text-green-700 hover:border-green-600'}
                            onClick={() => setVerdict('ACCEPTED')}
                          >
                              <CheckCircle className="w-4 h-4 mr-2" /> Terima Protes
                          </Button>
                          <Button 
                            type="button" 
                            variant={verdict === 'REJECTED' ? 'default' : 'outline'}
                            className={verdict === 'REJECTED' ? 'bg-red-600 hover:bg-red-700' : 'hover:text-red-700 hover:border-red-600'}
                            onClick={() => setVerdict('REJECTED')}
                          >
                              <XCircle className="w-4 h-4 mr-2" /> Tolak Protes
                          </Button>
                          <Button 
                            type="button" 
                            variant={verdict === 'WARNING' ? 'default' : 'outline'}
                            className={verdict === 'WARNING' ? 'bg-yellow-500 text-black hover:bg-yellow-600' : 'hover:text-yellow-700 hover:border-yellow-600'}
                            onClick={() => setVerdict('WARNING')}
                          >
                              <AlertOctagon className="w-4 h-4 mr-2" /> Peringatan Keras
                          </Button>
                      </div>
                  </div>

                  <div className="space-y-2">
                      <label className="text-sm font-bold">Alasan Keputusan & Sanksi</label>
                      <Textarea 
                        placeholder="Jelaskan dasar keputusan dan sanksi yang diberikan (jika ada)..." 
                        rows={5}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                  </div>

                  {/* Status Uang Jaminan */}
                  {['ACCEPTED', 'REJECTED'].includes(verdict) && (
                      <div className={`p-3 rounded font-bold text-center ${verdict === 'ACCEPTED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          UANG JAMINAN: {verdict === 'ACCEPTED' ? 'DIKEMBALIKAN' : 'HANGUS'}
                      </div>
                  )}
              </div>

              <Button size="lg" className="w-full font-bold" onClick={handleSubmitDecision} disabled={!caseId || !verdict}>
                  KETOK PALU (SIMPAN KEPUTUSAN)
              </Button>
          </CardContent>
       </Card>
    </div>
  );
}

    