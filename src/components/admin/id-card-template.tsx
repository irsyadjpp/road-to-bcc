"use client";

import React, { forwardRef } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";

interface IdCardProps {
  user: {
    name: string;
    role: string;
    division: string;
    id_number: string;
    avatar: string;
    photoUrl?: string; // Foto yang baru diupload (preview)
  };
}

export const IdCardTemplate = forwardRef<HTMLDivElement, IdCardProps>(({ user }, ref) => {
  const photo = user.photoUrl || user.avatar;

  return (
    <div ref={ref} className="w-[600px] flex gap-4 p-4 bg-white text-black font-sans">
      
      {/* --- SISI DEPAN (FRONT) --- */}
      <div className="relative w-[300px] h-[480px] bg-black overflow-hidden flex flex-col rounded-xl shadow-2xl shrink-0">
        
        {/* Background Texture & Accents */}
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-30 mix-blend-overlay z-10" />
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary blur-[80px] opacity-60 z-0" />
        <div className="absolute bottom-0 left-0 w-[150px] h-[150px] bg-blue-600 blur-[60px] opacity-40 z-0" />
        
        {/* Header Logo */}
        <div className="relative z-20 p-4 flex justify-between items-center">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center p-1">
                    <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-white font-bold tracking-widest text-xs">BCC 2026</span>
             </div>
             <img src="/images/logo-pbsi.png" alt="PBSI" className="h-6 w-auto brightness-0 invert opacity-70" />
        </div>

        {/* Photo Area (Cutout Style) */}
        <div className="relative z-20 mt-2 mx-auto w-[200px] h-[200px]">
            <div className="absolute inset-0 border-2 border-primary/50 rounded-full animate-pulse-slow"></div>
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg bg-zinc-800">
                <img 
                    src={photo} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous" // Penting untuk html2canvas
                />
            </div>
            {/* Jabatan Badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md whitespace-nowrap">
                {user.role}
            </div>
        </div>

        {/* Identity Info */}
        <div className="relative z-20 flex-grow flex flex-col items-center justify-center text-center p-4 mt-2">
            <h2 className="text-2xl font-black font-headline text-white uppercase leading-none mb-1">
                {user.name.split(" ")[0]}
            </h2>
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">
                {user.name.split(" ").slice(1).join(" ")}
            </h3>

            <div className="w-full border-t border-white/20 my-2"></div>
            
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">DIVISI</p>
            <p className="text-lg font-black text-primary uppercase">{user.division}</p>
        </div>

        {/* Footer Bar */}
        <div className="relative z-20 bg-white h-12 flex items-center justify-between px-4">
             <span className="text-black font-mono font-bold text-sm">{user.id_number}</span>
             <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
             </div>
        </div>
      </div>

      {/* --- SISI BELAKANG (BACK) --- */}
      <div className="relative w-[300px] h-[480px] bg-zinc-900 overflow-hidden flex flex-col rounded-xl shadow-2xl shrink-0 border border-zinc-800">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay z-10" />
        
        {/* Rules & QR */}
        <div className="relative z-20 p-6 flex flex-col h-full items-center text-center">
            
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-b border-primary pb-2">
                Official Access Pass
            </h4>

            {/* QR Code Area */}
            <div className="bg-white p-3 rounded-xl shadow-lg mb-6">
                <QRCodeSVG value={`https://bcc2026.com/verify/${user.id_number}`} size={120} />
            </div>

            <p className="text-[10px] text-zinc-500 leading-relaxed mb-4">
                Kartu ini adalah tanda pengenal resmi Panitia BCC 2026. 
                Wajib dikenakan selama bertugas di area GOR KONI.
                Kehilangan kartu dikenakan denda Rp 50.000.
            </p>

            <div className="mt-auto w-full">
                <div className="border-t border-dashed border-zinc-700 pt-4">
                    <p className="text-[10px] text-zinc-400 mb-2">Authorized By:</p>
                    {/* Placeholder Tanda Tangan Project Director */}
                    <div className="h-10 w-24 mx-auto bg-contain bg-no-repeat bg-center opacity-70" style={{ backgroundImage: "url('/images/signature-director.png')" }}></div> 
                    <p className="text-xs font-bold text-white mt-1">IRSYAD JAMAL</p>
                    <p className="text-[9px] text-primary uppercase">Project Director</p>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
});

IdCardTemplate.displayName = "IdCardTemplate";
