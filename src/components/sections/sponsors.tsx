import { Card, CardContent } from "@/components/ui/card";

const SponsorLogo = ({ name, description, size = 'md' }: { name: string, description?: string, size?: 'sm' | 'md' | 'lg' }) => {
    const sizeClasses = {
        'lg': 'text-3xl md:text-4xl',
        'md': 'text-xl md:text-2xl',
        'sm': 'text-lg md:text-xl'
    }[size];

    return (
        <div className="flex flex-col items-center justify-center h-28 text-center">
            <span className={`${sizeClasses} font-bold text-muted-foreground/60 hover:text-muted-foreground/90 transition-colors font-headline`}>{name}</span>
            {description && <span className="text-sm text-muted-foreground/80 mt-1">{description}</span>}
        </div>
    );
};

const sponsors = {
    tier1: [
        { name: "Ayo Indonesia", description: "Digital Partner" },
        { name: "Bank BJB", description: "Banking Partner" }
    ],
    tier2: [
        { name: "Flypower", description: "Official Equipment" },
        { name: "Pocari Sweat", description: "Official Hydration" }
    ],
    tier3: [
        { name: "Waroeng Steak & Shake", description: "Food Partner" },
        { name: "Indofood (Pop Mie)", description: "Food Partner" },
        { name: "Kopi Tuku", description: "Beverage Partner" },
        { name: "Bebas Cedera", description: "Physiotherapy Partner" }
    ],
    patronage: [
        { name: "KONI Kota Bandung", size: 'sm' },
        { name: "Pengkot PBSI Kota Bandung", size: 'sm' }
    ],
    media: [
        { name: "PRFM News", size: 'sm' },
        { name: "Info Bandung (@infobdgcom)", size: 'sm' },
        { name: "Sekitar Bandung", size: 'sm' }
    ]
};

export function SponsorsSection() {
    return (
        <section id="mitra" className="py-16 md:py-24 bg-secondary">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline text-foreground">
                    Didukung Oleh
                </h2>

                {/* Tier 1 Sponsors */}
                <div className="mb-16">
                    <h3 className="text-center text-sm uppercase text-muted-foreground font-semibold mb-8 font-headline tracking-widest">Co-Title & Strategic Partners</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-3xl mx-auto">
                        {sponsors.tier1.map(sponsor => (
                            <div key={sponsor.name} className="flex justify-center">
                                 <SponsorLogo name={sponsor.name} description={sponsor.description} size="lg" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tier 2 Sponsors */}
                <div className="mb-16">
                    <h3 className="text-center text-sm uppercase text-muted-foreground font-semibold mb-8 font-headline tracking-widest">Official Partners</h3>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-8 items-center max-w-xl mx-auto">
                         {sponsors.tier2.map(sponsor => (
                            <div key={sponsor.name} className="flex justify-center">
                                 <SponsorLogo name={sponsor.name} description={sponsor.description} size="md" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tier 3 Sponsors */}
                <div className="mb-16">
                    <h3 className="text-center text-sm uppercase text-muted-foreground font-semibold mb-8 font-headline tracking-widest">Activation & Logistics Partners</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center max-w-4xl mx-auto">
                        {sponsors.tier3.map(sponsor => (
                            <div key={sponsor.name} className="flex justify-center">
                                <SponsorLogo name={sponsor.name} size="sm" />
                            </div>
                        ))}
                    </div>
                </div>
                 {/* Patronage */}
                <div className="mb-16">
                    <h3 className="text-center text-sm uppercase text-muted-foreground font-semibold mb-8 font-headline tracking-widest">Patronase & Resmi Diakui</h3>
                     <div className="grid grid-cols-2 md:grid-cols-2 gap-8 items-center max-w-xl mx-auto">
                        {sponsors.patronage.map(sponsor => (
                            <div key={sponsor.name} className="flex justify-center">
                                <SponsorLogo name={sponsor.name} size={sponsor.size} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Media Partners */}
                <div>
                    <h3 className="text-center text-sm uppercase text-muted-foreground font-semibold mb-8 font-headline tracking-widest">Media Partners</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center max-w-2xl mx-auto">
                        {sponsors.media.map(sponsor => (
                            <div key={sponsor.name} className="flex justify-center">
                                <SponsorLogo name={sponsor.name} size={sponsor.size} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
