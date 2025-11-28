import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users } from "lucide-react";

const categories = [
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    title: "Beregu Putra",
    description: "Tim yang terdiri dari para pemain putra terbaik yang siap bersaing memperebutkan supremasi.",
  },
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    title: "Beregu Putri",
    description: "Srikandi-srikandi tangguh akan beradu skill untuk menjadi ratu di lapangan.",
  },
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    title: "Beregu Campuran",
    description: "Kombinasi strategi dan kekompakan antara pemain putra dan putri dalam satu tim.",
  },
];

export function CategoriesSection() {
  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
            Kategori Turnamen
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Tiga kategori, tiga kesempatan untuk menjadi juara. Pilih kategori yang paling sesuai dengan tim Anda.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card key={category.title} className="text-center bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                    {category.icon}
                </div>
                <CardTitle className="font-headline text-2xl font-bold text-foreground">{category.title}</CardTitle>
              </CardHeader>
              <CardDescription className="px-6 pb-6 text-base text-muted-foreground">
                {category.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
