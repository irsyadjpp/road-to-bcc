import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Pin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const mobilityPartners = [
  {
    name: "Gojek",
    promoCode: "BCCGOJEK",
    dropOff: "Gerbang Utama GOR KONI",
    link: "https://gojek.link/app"
  },
  {
    name: "Grab",
    promoCode: "BCCGRAB",
    dropOff: "Lobi Selatan GOR KONI",
    link: "https://grab.link/app"
  }
];

export function MobilitySection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
            Akses Mudah ke Lokasi
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Gunakan kode promo dari mitra mobilitas kami untuk perjalanan yang lebih hemat dan nyaman ke GOR KONI Bandung.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {mobilityPartners.map((partner) => (
            <Card key={partner.name} className="flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline text-3xl font-bold text-foreground">{partner.name}</CardTitle>
                <CardDescription>Mitra Mobilitas Resmi</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div className="flex items-center gap-3">
                    <Ticket className="w-6 h-6 text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">Kode Promo</p>
                        <p className="font-mono font-bold text-lg text-primary">{partner.promoCode}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                    <Pin className="w-6 h-6 text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">Titik Antar/Jemput</p>
                        <p className="font-semibold text-foreground">{partner.dropOff}</p>
                    </div>
                </div>
              </CardContent>
              <CardFooter>
                 <Button asChild className="w-full" size="lg">
                    <Link href={partner.link} target="_blank" rel="noopener noreferrer">
                      Pesan Sekarang
                    </Link>
                  </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
