
'use client';

import { useEffect, useState, useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { updatePlayerProfile, getPlayerSession } from "../actions";
import { Loader2, User, Phone, Hash, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full font-bold text-lg h-12" disabled={pending}>
      {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...</> : "Simpan & Dapatkan Athlete Code"}
    </Button>
  );
}

export default function RegistrationWizardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loadingSession, setLoadingSession] = useState(true);

  // Cek Sesi Client-Side (Optional, bisa juga Server Component)
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

  const [state, formAction] = useActionState(updatePlayerProfile, { success: false, message: "" });
  
  useEffect(() => {
    if (state && !state.success && state.message) {
      toast({
        variant: "destructive",
        title: "Gagal Menyimpan",
        description: state.message
      });
    }
  }, [state, toast]);

  if (loadingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container max-w-lg mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black font-headline uppercase">Lengkapi Profil</h1>
        <p className="text-muted-foreground mt-2">
          Satu langkah lagi untuk mendapatkan <strong>Athlete Code</strong> dan mulai bertanding.
        </p>
      </div>

      <Card className="border-2 border-primary/10 shadow-xl">
        <CardHeader className="bg-secondary/20 border-b border-border/50">
          <CardTitle className="text-xl">Biodata Atlet</CardTitle>
          <CardDescription>Data ini digunakan untuk verifikasi TPF (Tim Pencari Fakta).</CardDescription>
        </CardHeader>
        
        <form action={formAction}>
          <CardContent className="space-y-6 pt-6">
            
            {/* NIK */}
            <div className="space-y-2">
              <Label htmlFor="nik" className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-primary" /> NIK (KTP/KK)
              </Label>
              <Input 
                id="nik" name="nik" 
                placeholder="16 digit angka" 
                maxLength={16} 
                required 
                className="font-mono"
              />
              <p className="text-[10px] text-muted-foreground">*Wajib unik. Digunakan untuk validasi level.</p>
            </div>

            {/* No HP / WA */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" /> WhatsApp Aktif
              </Label>
              <Input 
                id="phone" name="phone" 
                type="tel" 
                placeholder="08xxxxxxxxxx" 
                required 
              />
            </div>

            {/* Instagram */}
            <div className="space-y-2">
              <Label htmlFor="instagram" className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-primary" /> Instagram (Opsional)
              </Label>
              <Input 
                id="instagram" name="instagram" 
                placeholder="@username" 
              />
               <p className="text-[10px] text-muted-foreground">*Untuk tagging di konten sosial media BCC.</p>
            </div>

            {/* Gender */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                 <User className="w-4 h-4 text-primary" /> Jenis Kelamin
              </Label>
              <RadioGroup defaultValue="MALE" name="gender" className="grid grid-cols-2 gap-4">
                <div>
                  <RadioGroupItem value="MALE" id="male" className="peer sr-only" />
                  <Label
                    htmlFor="male"
                    className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer"
                  >
                    <span className="text-xl mb-1">👨</span>
                    <span className="font-bold">Putra</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="FEMALE" id="female" className="peer sr-only" />
                  <Label
                    htmlFor="female"
                    className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer"
                  >
                    <span className="text-xl mb-1">👩</span>
                    <span className="font-bold">Putri</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

          </CardContent>
          <CardFooter className="bg-secondary/20 border-t border-border/50 p-6">
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
