import { Card, CardContent } from "@/components/ui/card";

const SponsorLogo = ({ name, size = 'md' }: { name: string, size?: 'md' | 'lg' }) => {
    const sizeClasses = size === 'lg' ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl';
    return (
        <div className="flex items-center justify-center h-24">
            <span className={`${sizeClasses} font-bold text-muted-foreground/50 hover:text-muted-foreground/80 transition-colors font-headline`}>{name}</span>
        </div>
    );
};

export function SponsorsSection() {
    return (
        <section className="py-16 md:py-24 bg-secondary">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline text-foreground">
                    Didukung Oleh
                </h2>

                <div className="mb-12">
                    <h3 className="text-center text-sm uppercase text-muted-foreground font-semibold mb-6 font-headline tracking-widest">Sponsor Utama</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-2xl mx-auto">
                        <div className="flex justify-center">
                             <SponsorLogo name="Ayo Indonesia" size="lg" />
                        </div>
                        <div className="flex justify-center">
                            <SponsorLogo name="Bank BJB" size="lg" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
