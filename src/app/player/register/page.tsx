'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { updatePlayerProfile, getPlayerSession } from "../actions";
import { Loader2, User, Phone, Hash, Instagram, Zap, ArrowRight, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';
import { CourtLines } from '@/components/ui/court-lines';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full font-bold text-lg h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 text-white" disabled={pending}>
      {pending ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</> : <>Dapatkan Athlete Code <ArrowRight className="ml-2 h-5 w-5" /></>}
    </Button>
  );
}

export default function RegistrationWizardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getPlayerSession();
        if (!session) {
          router.replace('/player/login');
        } else if (session.isProfileComplete) {
          router.replace('/player/dashboard');
        } else {
          setLoadingSession(false);
        }
      } catch (e) {
        router.replace('/player/login');
      }
    };
    checkSession();
  }, [router]);

  if (loadingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  async function clientAction(formData: FormData) {
    const res = await updatePlayerProfile(formData);
    if (!res?.success && res?.message) {
      toast({
        variant: "destructive",
        title: "Gagal Menyimpan",
        description: res.message
      });
    }
  }

  return (
    <div className="min-h-screen bg-background flex overflow-hidden relative">
      <div className="hidden lg:flex flex-1 bg-zinc-900 relative items-center justify-center overflow-hidden">
         <div className="absolute inset-0 opacity-10 pointer-events-none">
             <CourtLines />
         </div>
         <Image 
             src="/images/gor-koni.jpg" 
             alt="Smash" 
             fill
             className="object-cover opacity-50 mix-blend-luminosity"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
         
         <div className="relative z-10 p-12 text-white max-w-lg">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-white font-bold text-sm uppercase tracking-widest mb-6 border border-primary/30 backdrop-blur-md">
                 <Zap className="w-4 h-4 fill-current" /> Player Onboarding
             </div>
             <h1 className="text-6xl font-black font-headline tracking-tighter leading-none mb-6">
                 READY TO<br/><span className="text-primary">DOMINATE?</span>
             </h1>
             <p className="text-zinc-300 text-xl leading-relaxed">
                 Lengkapi profilmu, dapatkan <strong>Athlete Code</strong> eksklusif, dan mulai perjalananmu menuju BCC 2026.
             </p>
         </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <Card className="w-full max-w-xl border-none shadow-2xl bg-secondary/30 backdrop-blur-sm rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden">
          <div className="mb-8">
             <h2 className="text-3xl font-black font-headline uppercase mb-2">Profile Setup</h2>
             <p className="text-muted-foreground font-medium">
               Data ini digunakan untuk verifikasi Tim Pencari Fakta (TPF).
             </p>
          </div>

          <form action={clientAction} className="space-y-8">
            <div className="space-y-3 group">
              <Label htmlFor="nik" className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-muted-foreground group-focus-within:text-primary transition-colors">
                <Hash className="w-4 h-4" /> NIK
              </Label>
              <Input 
                id="nik" name="nik" placeholder="16 digit NIK KTP/KK" maxLength={16} required 
                className="font-mono text-lg h-14 rounded-2xl bg-background border-2 border-transparent focus:border-primary/50 focus:ring-0"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 group">
                  <Label htmlFor="phone" className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Phone className="w-4 h-4" /> WhatsApp
                  </Label>
                  <Input 
                    id="phone" name="phone" type="tel" placeholder="08xxxxxxxxxx" required 
                    className="font-mono text-lg h-14 rounded-2xl bg-background border-2 border-transparent focus:border-primary/50 focus:ring-0"
                  />
                </div>
                <div className="space-y-3 group">
                  <Label htmlFor="communityName" className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Users className="w-4 h-4" /> Komunitas / PB
                  </Label>
                  <Input 
                    id="communityName" name="communityName" placeholder="Nama Klub" required 
                    className="text-lg h-14 rounded-2xl bg-background border-2 border-transparent focus:border-primary/50 focus:ring-0"
                  />
                </div>
            </div>

            <div className="space-y-3 group">
                <Label htmlFor="instagram" className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Instagram className="w-4 h-4" /> Instagram (Wajib)
                </Label>
                <Input 
                    id="instagram" name="instagram" placeholder="@username" required
                    className="text-lg h-14 rounded-2xl bg-background border-2 border-transparent focus:border-primary/50 focus:ring-0"
                />
            </div>

            <div className="space-y-4">
              <Label className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-muted-foreground">
                 <User className="w-4 h-4" /> Jenis Kelamin
              </Label>
              <RadioGroup defaultValue="MALE" name="gender" className="grid grid-cols-2 gap-4">
                <div>
                  <RadioGroupItem value="MALE" id="male" className="peer sr-only" />
                  <Label htmlFor="male" className="flex flex-col items-center justify-center gap-2 h-24 rounded-2xl border-2 border-secondary bg-background p-4 hover:bg-secondary/30 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary cursor-pointer transition-all">
                    <span className="text-2xl">👨</span>
                    <span className="font-bold uppercase tracking-wider">Putra</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="FEMALE" id="female" className="peer sr-only" />
                  <Label htmlFor="female" className="flex flex-col items-center justify-center gap-2 h-24 rounded-2xl border-2 border-secondary bg-background p-4 hover:bg-secondary/30 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary cursor-pointer transition-all">
                    <span className="text-2xl">👩</span>
                    <span className="font-bold uppercase tracking-wider">Putri</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="pt-4">
                <SubmitButton />
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
