
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode, CheckCircle2, Loader2, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

interface QRCheckInProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QRCheckInDialog({ isOpen, onOpenChange }: QRCheckInProps) {
  const [status, setStatus] = useState<'scanning' | 'processing' | 'success'>('scanning');

  // Simulasi scan process
  const handleSimulateScan = () => {
    setStatus('processing');
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  // Reset saat dialog ditutup
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setStatus('scanning'), 300);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-[2rem] border-none bg-background p-0 overflow-hidden shadow-2xl">
        
        {/* Header Visual dengan Gradient Sport */}
        <div className="h-32 bg-gradient-sport flex items-center justify-center relative">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
          <div className="text-center text-white z-10">
            <h2 className="font-headline text-2xl tracking-widest">VENUE CHECK-IN</h2>
            <p className="text-xs opacity-90 font-mono">GOR KONI BANDUNG</p>
          </div>
        </div>

        <div className="p-6">
          {status === 'scanning' && (
            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
              <div className="relative h-64 w-64 bg-black rounded-3xl overflow-hidden mb-6 border-4 border-foreground/10">
                {/* Simulasi Kamera Viewfinder */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50">
                  <span className="text-xs">Camera Feed</span>
                </div>
                
                {/* Scanning Line Animation */}
                <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_20px_rgba(255,0,0,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
                
                {/* Corner Markers */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl" />
              </div>
              
              <p className="text-center text-muted-foreground text-sm mb-6 max-w-[200px]">
                Arahkan kamera ke QR Code yang ada di meja registrasi.
              </p>

              <Button onClick={handleSimulateScan} className="w-full rounded-pill h-12 font-bold" size="lg">
                <QrCode className="mr-2 h-4 w-4" /> Scan QR Manual
              </Button>
            </div>
          )}

          {status === 'processing' && (
            <div className="h-64 flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-300">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <p className="font-headline text-lg animate-pulse">VERIFYING...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center justify-center py-4 animate-in fade-in zoom-in duration-500">
              <div className="h-24 w-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-4 shadow-lg">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <h3 className="font-headline text-2xl text-center mb-1">YOU ARE IN!</h3>
              <p className="text-muted-foreground text-center text-sm mb-6">
                Kehadiran Anda telah dicatat.<br/>Selamat bertanding!
              </p>
              
              <div className="bg-secondary/50 rounded-2xl p-4 w-full mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase text-muted-foreground">Location</p>
                    <p className="text-sm font-semibold">GOR Koni, Court 3</p>
                    <p className="text-xs text-muted-foreground mt-1">Check-in: 08:42 AM</p>
                  </div>
                </div>
              </div>

              <Button onClick={() => onOpenChange(false)} className="w-full rounded-pill" variant="outline">
                Tutup
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Add this to your tailwind.config.ts keyframes if you don't have it
/*
keyframes: {
  ...
  scan: {
    '0%, 100%': { transform: 'translateY(-10%)', opacity: 0 },
    '50%': { transform: 'translateY(100%)', opacity: 1 },
  },
},
animation: {
  ...
  'scan': 'scan 2s ease-in-out infinite',
}
*/
