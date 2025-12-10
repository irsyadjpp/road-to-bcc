"use client";

import { CourtLines } from "../ui/court-lines";

export function SponsorsSection() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
             <div className="absolute inset-0 opacity-5 pointer-events-none">
                <CourtLines />
            </div>
            <div className="container mx-auto px-4 text-center relative z-10">
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground mb-12">
                    Official Partners
                </p>
                
                <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholder Text Logos for Style */}
                    <h3 className="text-3xl md:text-4xl font-black font-headline text-zinc-300 hover:text-zinc-800 transition-colors">VICTOR</h3>
                    <h3 className="text-3xl md:text-4xl font-black font-headline text-zinc-300 hover:text-zinc-800 transition-colors">YONEX</h3>
                    <h3 className="text-3xl md:text-4xl font-black font-headline text-zinc-300 hover:text-zinc-800 transition-colors">TIENTO</h3>
                </div>

                <div className="mt-16 bg-secondary/50 rounded-3xl p-8 max-w-2xl mx-auto backdrop-blur-sm">
                    <p className="font-medium text-muted-foreground">
                        Ingin brand Anda tampil di sini? <a href="mailto:partnership@bcc.com" className="text-primary font-bold underline decoration-2 underline-offset-4">Hubungi Kami</a>
                    </p>
                </div>
            </div>
        </section>
    );
}