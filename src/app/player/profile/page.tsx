
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Camera, Save, ArrowLeft, Shield, User, Phone, MapPin, AtSign, CreditCard } from "lucide-react";
import { updatePlayerProfile } from "../actions";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock Data (Nanti dari DB)
const INITIAL_DATA = {
  fullName: "Kevin Sanjaya Sukamuljo",
  nik: "3273000000000001",
  email: "kevin@djarum.com",
  nickname: "Kevin",
  phone: "081234567890",
  address: "Jl. Dago Asri No. 1, Bandung",
  photoUrl: "https://github.com/shadcn.png"
};

export default function EditProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(INITIAL_DATA.photoUrl);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    // Hapus field jerseySize dari pengiriman data
    const res = await updatePlayerProfile(formData); 
    setIsSubmitting(false);

    if (res.success) {
      toast({ title: "Profil Diupdate!", description: "Perubahan berhasil disimpan.", className: "bg-green-600 text-white border-none" });
      router.refresh();
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-body relative pb-24 md:pb-10">
      
      {/* BACKGROUND ACCENTS */}
      <div className="fixed inset-0 bg-[url('/images/noise.png')] opacity-20 pointer-events-none z-0"></div>
      <div className="fixed top-0 right-0 w-[300px] h-[300px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[200px] h-[200px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl mx-auto p-4 md:p-8">
        
        {/* HEADER NAVIGATION */}
        <div className="flex items-center gap-4 mb-8">
            <Link href="/player/dashboard">
                <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-zinc-800 bg-zinc-900/50 hover:bg-primary hover:border-primary hover:text-white transition-all">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
            </Link>
            <div>
                <h1 className="text-2xl font-black font-headline uppercase tracking-tighter">Edit Profil</h1>
                <p className="text-xs text-zinc-400">Perbarui data diri & kontak.</p>
            </div>
        </div>

        <form action={handleSubmit} className="space-y-8">
            
            {/* --- SECTION 1: HERO AVATAR (CENTERED) --- */}
            <div className="flex flex-col items-center justify-center">
                <div className="relative group">
                    {/* Glowing Ring */}
                    <div className="absolute -inset-1 bg-gradient-to-tr from-primary via-orange-500 to-blue-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
                    
                    <Avatar className="w-40 h-40 border-4 border-black relative z-10">
                        <AvatarImage src={photoPreview} className="object-cover" />
                        <AvatarFallback className="bg-zinc-800 text-2xl font-bold">KS</AvatarFallback>
                    </Avatar>

                    {/* Edit Button */}
                    <label className="absolute bottom-1 right-1 z-20 bg-white text-black p-3 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg">
                        <Camera className="w-5 h-5" />
                        <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} name="photo" />
                    </label>
                </div>
                <p className="mt-4 text-zinc-500 text-xs font-bold uppercase tracking-widest">Tap to Change Photo</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* --- SECTION 2: EDITABLE FIELDS (Sporty Inputs) --- */}
                <div className="space-y-6">
                    <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm overflow-hidden">
                        <CardHeader className="bg-zinc-900/80 border-b border-zinc-800 py-3">
                            <CardTitle className="text-sm font-bold text-zinc-400 uppercase flex items-center gap-2">
                                <User className="w-4 h-4 text-primary"/> Identitas Publik
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-5 space-y-5">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase text-white ml-1">Nama Panggilan / Punggung</Label>
                                <Input 
                                    name="nickname" 
                                    defaultValue={INITIAL_DATA.nickname} 
                                    className="bg-black border-zinc-700 h-12 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-bold font-headline tracking-wide" 
                                    placeholder="Cth: KEVIN"
                                />
                                <p className="text-[10px] text-zinc-500">*Nama ini akan dicetak di ID Card.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm overflow-hidden">
                        <CardHeader className="bg-zinc-900/80 border-b border-zinc-800 py-3">
                            <CardTitle className="text-sm font-bold text-zinc-400 uppercase flex items-center gap-2">
                                <Phone className="w-4 h-4 text-blue-500"/> Kontak Darurat
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-5 space-y-5">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase text-white ml-1">WhatsApp Aktif</Label>
                                <Input 
                                    name="phone" 
                                    defaultValue={INITIAL_DATA.phone} 
                                    className="bg-black border-zinc-700 h-12 rounded-xl font-mono" 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase text-white ml-1">Alamat Domisili</Label>
                                <Textarea 
                                    name="address" 
                                    defaultValue={INITIAL_DATA.address} 
                                    className="bg-black border-zinc-700 rounded-xl resize-none min-h-[80px]" 
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* --- SECTION 3: READ ONLY DATA (ID CARD LOOK) --- */}
                <div>
                    <div className="sticky top-6">
                        <div className="bg-gradient-to-br from-zinc-800 to-black p-1 rounded-2xl shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
                            <div className="bg-black rounded-xl p-6 border border-zinc-700/50 relative overflow-hidden">
                                {/* Watermark */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                                
                                <div className="flex items-center gap-2 mb-6 opacity-80">
                                    <Shield className="w-5 h-5 text-zinc-500" />
                                    <span className="text-xs font-black uppercase text-zinc-500 tracking-[0.2em]">VERIFIED DATA</span>
                                </div>

                                <div className="space-y-5">
                                    <div className="group">
                                        <label className="text-[10px] uppercase font-bold text-zinc-600 block mb-1">Nama Lengkap (KTP)</label>
                                        <div className="text-lg font-bold text-zinc-300 border-b border-zinc-800 pb-1 group-hover:text-white transition-colors">
                                            {INITIAL_DATA.fullName}
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label className="text-[10px] uppercase font-bold text-zinc-600 block mb-1 flex items-center gap-1">
                                            <CreditCard className="w-3 h-3"/> NIK (Terdaftar)
                                        </label>
                                        <div className="text-lg font-mono text-zinc-300 border-b border-zinc-800 pb-1 tracking-widest group-hover:text-primary transition-colors">
                                            {INITIAL_DATA.nik.replace(/(\d{6})\d{6}(\d{4})/, "$1******$2")}
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label className="text-[10px] uppercase font-bold text-zinc-600 block mb-1 flex items-center gap-1">
                                            <AtSign className="w-3 h-3"/> Akun Login
                                        </label>
                                        <div className="text-sm font-medium text-zinc-400">
                                            {INITIAL_DATA.email}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-zinc-900 text-[10px] text-zinc-600 italic">
                                    *Data di atas dikunci untuk keamanan. Hubungi admin jika ada kesalahan input NIK.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* --- FLOATING SAVE BAR (MOBILE FRIENDLY) --- */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black to-transparent z-50 md:static md:bg-none md:p-0 md:mt-8">
                <div className="max-w-3xl mx-auto">
                    <Button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="w-full h-14 rounded-full bg-primary hover:bg-red-700 text-white font-black text-lg uppercase tracking-widest shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all active:scale-95"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin w-6 h-6"/> : <><Save className="mr-2 w-5 h-5"/> SIMPAN PROFIL</>}
                    </Button>
                </div>
            </div>

        </form>
      </div>
    </div>
  );
}
