'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, Users, UserPlus, ShieldAlert } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { validatePairingAndGetPrice } from "@/lib/game-logic";

// Mock Data (Nantinya dari Database/Session)
const userData = {
  name: "Irsyad",
  level: "beginner",
  athleteCode: "ATH-X9J2K", // Code unik user ini
  status: "unpaired", // unpaired, paired, community_member
  partner: null,
};

export default function PlayerDashboard() {
  const { toast } = useToast();
  const [partnerCode, setPartnerCode] = useState("");
  const [communityCode, setCommunityCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(userData.athleteCode);
    toast({ title: "Copied!", description: "Kode atlet berhasil disalin." });
  };

  const handleJoinPartner = async () => {
    setLoading(true);
    // Simulasi Server Action
    // 1. Fetch data partner by code
    // 2. Cek validasi matrix
    
    // Contoh Skenario: Partner ternyata Intermediate
    const mockPartnerLevel = 'intermediate'; 
    const validation = validatePairingAndGetPrice(userData.level as any, mockPartnerLevel as any);

    if (!validation.isValid) {
      toast({ 
        variant: "destructive", 
        title: "Gagal Pairing", 
        description: validation.reason 
      });
      setLoading(false);
      return;
    }

    toast({
      title: "Pairing Berhasil!",
      description: `Anda masuk kategori ${validation.category?.toUpperCase()}. Tagihan: Rp ${validation.pricePerPerson?.toLocaleString()}/orang.`,
    });
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      
      {/* HEADER DASHBOARD */}
      <div className="mb-8">
        <h1 className="text-3xl font-black font-headline uppercase mb-2">
          Halo, {userData.name} 👋
        </h1>
        <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-sm px-3 py-1 uppercase bg-background">
                Level: {userData.level}
            </Badge>
            {userData.status === 'unpaired' && (
                <Badge variant="secondary" className="text-sm px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                    Belum Ada Pasangan
                </Badge>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CARD 1: MY ATHLETE CODE */}
        <Card className="border-2 border-primary/20 bg-secondary/10">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    My Athlete Code
                </CardTitle>
                <CardDescription>
                    Bagikan kode ini ke calon pasangan atau manajer Anda.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 bg-background p-4 rounded-xl border-2 border-dashed">
                    <code className="text-3xl font-black font-mono tracking-wider flex-grow text-center text-primary">
                        {userData.athleteCode}
                    </code>
                    <Button size="icon" variant="ghost" onClick={handleCopyCode}>
                        <Copy className="w-5 h-5" />
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                    *Kode ini digunakan untuk mengidentifikasi Anda dalam sistem pairing.
                </p>
            </CardContent>
        </Card>

        {/* CARD 2: ACTIONS (INDEPENDENT / COMMUNITY) */}
        <div className="space-y-6">
            
            {/* OPSI A: DAFTAR INDEPENDEN (Cari Pasangan) */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Daftar Independen</CardTitle>
                    <CardDescription>Punya partner? Masukkan kode atlet mereka di sini.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <Input 
                            placeholder="Masukkan Kode Partner (contoh: ATH-.....)" 
                            className="font-mono uppercase placeholder:normal-case"
                            value={partnerCode}
                            onChange={(e) => setPartnerCode(e.target.value.toUpperCase())}
                        />
                        <Button onClick={handleJoinPartner} disabled={!partnerCode || loading}>
                            {loading ? "Cek..." : "Pairing"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                <span className="relative bg-background px-2 text-xs text-muted-foreground uppercase">ATAU GABUNG KOMUNITAS</span>
            </div>

            {/* OPSI B: GABUNG KOMUNITAS */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Gabung Tim / Komunitas</CardTitle>
                    <CardDescription>Masukkan kode komunitas yang diberikan Manajer.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <Input 
                            placeholder="Masukkan Kode Komunitas (contoh: COM-.....)" 
                            className="font-mono uppercase placeholder:normal-case"
                            value={communityCode}
                            onChange={(e) => setCommunityCode(e.target.value.toUpperCase())}
                        />
                        <Button variant="secondary" disabled={!communityCode}>
                            <UserPlus className="w-4 h-4 mr-2" /> Join
                        </Button>
                    </div>
                </CardContent>
            </Card>

        </div>
      </div>
    </div>
  );
}
