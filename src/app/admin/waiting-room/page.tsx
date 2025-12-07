'use client';

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WaitingRoomPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="mx-auto bg-yellow-100 text-yellow-600 rounded-full p-3 w-fit mb-4">
                        <Clock className="w-8 h-8" />
                    </div>
                    <CardTitle>Pendaftaran Anda Sedang Direview</CardTitle>
                    <CardDescription>
                        Profil Anda sudah lengkap. Mohon tunggu Project Director untuk memberikan penugasan (assignment).
                    </CardDescription>
                </CardHeader>
                <div className="p-6 pt-0">
                    <Button onClick={() => window.location.reload()}>
                        Cek Status Ulang
                    </Button>
                </div>
            </Card>
        </div>
    );
}
