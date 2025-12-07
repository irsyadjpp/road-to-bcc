
"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShieldCheck, Trophy, PartyPopper, ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const valueProps = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Sistem Anti-Sandbagging",
    description: "Kompetisi adil dengan verifikasi video untuk setiap pemain, memastikan integritas turnamen.",
    imageId: "value-prop-shield"
  },
  {
    icon: <Trophy className="w-8 h-8 text-primary" />,
    title: "Total Hadiah Rp 42 Juta+",
    description: "Rebut total hadiah lebih dari 42 juta Rupiah dan buktikan supremasi komunitasmu.",
    imageId: "value-prop-trophy"
  },
  {
    icon: <PartyPopper className="w-8 h-8 text-primary" />,
    title: "WBD Celebration",
    description: "Rayakan World Badminton Day pada 5 Juli 2026 dengan acara puncak yang meriah dan tak terlupakan.",
    imageId: "value-prop-celebration"
  },
];

export function ValuePropositionSection() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Carousel Content (Images) */}
            <CarouselContent className="-ml-4">
                {valueProps.map((prop, index) => {
                    const image = PlaceHolderImages.find(img => img.id === prop.imageId);
                    return (
                        <CarouselItem key={index} className="pl-4">
                            <div className="flex justify-center items-center">
                                <div className="relative w-[400px] h-[400px] rounded-2xl overflow-hidden shadow-lg">
                                    {image && (
                                        <Image
                                            src={image.imageUrl}
                                            alt={image.description}
                                            fill
                                            className="object-cover"
                                            data-ai-hint={image.imageHint}
                                        />
                                    )}
                                </div>
                            </div>
                        </CarouselItem>
                    );
                })}
            </CarouselContent>
            
            {/* Text and Controls */}
            <div className="text-left">
              <h3 className="font-headline text-sm font-semibold text-primary uppercase tracking-widest mb-2">Kenapa Harus Ikut?</h3>
              
              <div className="relative h-48 overflow-hidden">
                {valueProps.map((prop, index) => (
                    <div key={index} className={`absolute inset-0 transition-opacity duration-300 ${current - 1 === index ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="flex flex-col justify-center h-full">
                          <h2 className="text-4xl md:text-5xl font-black font-headline text-foreground mb-4">{prop.title}</h2>
                          <p className="text-lg text-muted-foreground font-body">
                            {prop.description}
                          </p>
                        </div>
                    </div>
                ))}
              </div>
              
              <div className="flex items-center gap-4 mt-8">
                  <div className="font-mono text-lg font-medium text-foreground">
                      <span>{String(current).padStart(2, '0')}</span>
                      <span className="text-muted-foreground">/</span>
                      <span>{String(count).padStart(2, '0')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={scrollPrev}>
                          <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={scrollNext}>
                          <ArrowRight className="h-4 w-4" />
                      </Button>
                  </div>
              </div>

            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
