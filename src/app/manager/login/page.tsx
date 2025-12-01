'use client';

import { useActionState, useFormStatus } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loginManager, registerManager } from "../actions";
import { Loader2, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sedang Memproses...</> : text}
    </Button>
  );
}

export default function ManagerLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [loginState, loginAction] = useActionState(loginManager, { success: false, message: '' });
  const [regState, regAction] = useActionState(registerManager, { success: false, message: '' });

  useEffect(() => {
    if (loginState.success) {
      toast({ title: "Login Berhasil", description: "Mengalihkan ke dashboard..." });
      router.push('/manager/dashboard');
    }
    if(loginState.message && !loginState.success){
        toast({ title: "Login Gagal", description: loginState.message, variant: "destructive" });
    }
  }, [loginState, router, toast]);

  useEffect(() => {
    if (regState.success) {
      toast({ title: "Registrasi Berhasil", description: "Mengalihkan ke dashboard..." });
      router.push('/manager/dashboard');
    }
     if(regState.message && !regState.success){
        toast({ title: "Registrasi Gagal", description: regState.message, variant: "destructive" });
    }
  }, [regState, router, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/20 p-4">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Manager Area</CardTitle>
          <CardDescription>Masuk untuk mendaftarkan dan mengelola tim.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Masuk</TabsTrigger>
              <TabsTrigger value="register">Daftar Baru</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form action={loginAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login">Email Manajer</Label>
                  <Input id="email-login" name="email" type="email" placeholder="manajer@club.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-login">Password</Label>
                  <Input id="password-login" name="password" type="password" required />
                </div>
                <SubmitButton text="Masuk Dashboard" />
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form action={regAction} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name-reg">Nama Lengkap</Label>
                    <Input id="name-reg" name="name" placeholder="Budi Santoso" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone-reg">No. WhatsApp</Label>
                    <Input id="phone-reg" name="phone" type="tel" placeholder="0812..." required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-reg">Email</Label>
                  <Input id="email-reg" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-reg">Password</Label>
                  <Input id="password-reg" name="password" type="password" required />
                </div>
                <SubmitButton text="Buat Akun Manajer" />
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
