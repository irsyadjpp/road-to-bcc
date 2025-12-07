'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { completeUserProfile } from './actions';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();
  
  async function handleSubmit(formData: FormData) {
    await completeUserProfile(formData);
    router.push('/admin/waiting-room'); // Pindah ke ruang tunggu
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Lengkapi Profil Panitia</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <Input name="phone" placeholder="Nomor WhatsApp" required />
            <Input name="address" placeholder="Alamat Domisili" required />
            <Select name="shirtSize" required>
              <SelectTrigger><SelectValue placeholder="Ukuran Jersey" /></SelectTrigger>
              <SelectContent>
                 {["S", "M", "L", "XL", "XXL"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button type="submit" className="w-full">Simpan & Lanjutkan</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
