
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Save, Users, RefreshCw, UserPlus, Trash2 } from "lucide-react";
import { getCommitteeStructure, updateCommitteeStructure } from "./actions";
import { type CommitteeDivision } from '@/lib/committee-data';
import { useToast } from "@/hooks/use-toast";
import { INITIAL_COMMITTEE_STRUCTURE } from '@/lib/committee-data';


export default function CommitteeManagementPage() {
  const { toast } = useToast();
  const [divisions, setDivisions] = useState<CommitteeDivision[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const data = await getCommitteeStructure();
    setDivisions(data);
    setIsLoading(false);
  };
  
  const resetData = () => {
      // Deep copy from initial constant
      setDivisions(JSON.parse(JSON.stringify(INITIAL_COMMITTEE_STRUCTURE)));
      toast({
          title: "Struktur Direset",
          description: "Data kembali ke susunan awal.",
      })
  }

  // Update nama personil
  const handleMemberChange = (divIndex: number, memberIndex: number, field: 'name' | 'position', value: string) => {
    const newDivisions = [...divisions];
    newDivisions[divIndex].members[memberIndex] = {
      ...newDivisions[divIndex].members[memberIndex],
      [field]: value
    };
    setDivisions(newDivisions);
  };

  // Tambah posisi baru dalam divisi
  const addMember = (divIndex: number) => {
    const newDivisions = [...divisions];
    newDivisions[divIndex].members.push({ position: "Posisi Baru", name: "" });
    setDivisions(newDivisions);
  };

  // Hapus posisi
  const removeMember = (divIndex: number, memberIndex: number) => {
    if (confirm("Yakin ingin menghapus posisi ini?")) {
        const newDivisions = [...divisions];
        newDivisions[divIndex].members.splice(memberIndex, 1);
        setDivisions(newDivisions);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const res = await updateCommitteeStructure(divisions);
    setIsSaving(false);
    toast({ 
        title: "Struktur Disimpan", 
        description: res.message,
        className: "bg-green-600 text-white"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-bold font-headline text-primary">Manajemen Struktur Panitia</h2>
            <p className="text-muted-foreground">Bentuk tim dan tetapkan personil untuk BCC 2026.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={resetData}>
                <RefreshCw className="w-4 h-4 mr-2" /> Reset
            </Button>
            <Button onClick={handleSave} disabled={isSaving || isLoading} className="bg-primary">
                <Save className="w-4 h-4 mr-2" /> {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
            Array.from({length: 5}).map((_, i) => (
                <Card key={i}><CardContent className="p-4 space-y-2"><div className="h-8 w-1/2 bg-secondary/50 rounded animate-pulse"/><div className="h-10 w-full bg-secondary/50 rounded animate-pulse"/><div className="h-10 w-full bg-secondary/50 rounded animate-pulse"/></CardContent></Card>
            ))
        ) : (
            divisions.map((div, divIdx) => (
              <Card key={div.id} className="border-t-4 border-t-secondary">
                <CardHeader className="bg-secondary/5 pb-3">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        {div.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                    {div.members.map((member, memIdx) => (
                        <div key={memIdx} className="flex gap-3 items-end">
                            <div className="flex-1 space-y-1">
                                <Label className="text-xs text-muted-foreground">Jabatan</Label>
                                <Input 
                                    value={member.position} 
                                    onChange={(e) => handleMemberChange(divIdx, memIdx, 'position', e.target.value)}
                                    className="h-8 font-semibold bg-secondary/10"
                                />
                            </div>
                            <div className="flex-[2] space-y-1">
                                <Label className="text-xs text-muted-foreground">Nama Personil</Label>
                                <Input 
                                    value={member.name} 
                                    onChange={(e) => handleMemberChange(divIdx, memIdx, 'name', e.target.value)}
                                    className="h-8"
                                    placeholder="Belum diisi..."
                                />
                            </div>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                onClick={() => removeMember(divIdx, memIdx)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-dashed text-muted-foreground"
                        onClick={() => addMember(divIdx)}
                    >
                        <UserPlus className="w-4 h-4 mr-2" /> Tambah Posisi
                    </Button>
                </CardContent>
              </Card>
            ))
        )}
      </div>
    </div>
  );
}
