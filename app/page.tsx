import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Leaf, MapPin, Truck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { beers, packs, breweries } from "@/lib/data";
import { BeerCard } from "@/components/beer/beer-card";
import { formatCurrency } from "@/lib/utils";

export default function HomePage() {
  const signature = packs.find((p) => p.featured) ?? packs[0];
  const featuredBeers = beers.slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container grid items-center gap-10 py-20 md:grid-cols-2 md:py-32">
          <div className="space-y-6 animate-fade-in">
            <Badge variant="gold" className="rounded-full px-3 py-1 text-xs uppercase tracking-wider">
              Curated · Personalized · Delivered
            </Badge>
            <h1 className="font-serif text-5xl leading-[1.05] md:text-7xl">
              Discover craft beer <span className="gradient-text-gold">worth savoring</span>.
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Brewscovery curates four 8oz tasting pours each month — matched to your palate,
              shipped from independent brewhouses, designed for unhurried evenings at home.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/onboarding">
                  <Sparkles className="h-4 w-4" /> Start taste quiz
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/discovery-mix">
                  See Discovery Mix <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-gold text-gold" /> 4.8 avg rating
              </div>
              <div className="flex items-center gap-1.5">
                <Leaf className="h-4 w-4 text-emerald-400" /> NA options
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-gold" /> Home delivery
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-gold/20 bg-secondary shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=1400"
              alt="Curated craft beer tasting"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <Card className="absolute bottom-6 left-6 right-6 border-gold/30 bg-background/80 backdrop-blur">
              <div className="flex items-center justify-between p-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-gold">This month's Mix</div>
                  <div className="font-serif text-lg">{signature.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-serif text-gold">{formatCurrency(signature.price)}/mo</div>
                  <div className="text-xs text-muted-foreground">4 tasting cans</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* VALUE ROW */}
      <section className="border-y border-border/60 bg-card/40">
        <div className="container grid gap-8 py-14 md:grid-cols-4">
          <Value icon={<Sparkles />} title="Personalized curation" desc="A transparent taste engine matches every pour to your palate." />
          <Value icon={<Leaf />} title="Thoughtful pours" desc="Smaller 8oz tasting cans let you explore more, waste less." />
          <Value icon={<MapPin />} title="Local brewhouses" desc="We ship from independent regional breweries — not mass producers." />
          <Value icon={<Truck />} title="Home delivery" desc="Monthly box arrives cold, curated, and ready for your evening." />
        </div>
      </section>

      {/* FEATURED PACKS */}
      <section className="container py-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl">Featured Discovery Mixes</h2>
            <p className="mt-2 text-muted-foreground">Hand-curated tasting packs, updated every month.</p>
          </div>
          <Button asChild variant="link">
            <Link href="/discovery-mix">Browse all <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {packs.map((p) => (
            <Link key={p.id} href={`/discovery-mix#${p.slug}`}>
              <Card className="group overflow-hidden transition-all hover:border-gold/40">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 25vw" />
                  {p.featured && (
                    <Badge variant="gold" className="absolute left-3 top-3">Featured</Badge>
                  )}
                </div>
                <div className="space-y-1 p-4">
                  <div className="font-serif text-lg leading-tight group-hover:text-gold">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.tagline}</div>
                  <div className="pt-2 text-sm"><span className="font-semibold text-gold">{formatCurrency(p.price)}</span><span className="text-muted-foreground">/mo</span></div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* TRENDING BEERS */}
      <section className="container py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl">Trending pours</h2>
            <p className="mt-2 text-muted-foreground">Members are falling for these right now.</p>
          </div>
          <Button asChild variant="link">
            <Link href="/discover">Explore catalog <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredBeers.map((b) => <BeerCard key={b.id} beer={b} />)}
        </div>
      </section>

      {/* BREWERY SPOTLIGHT */}
      <section className="container py-20">
        <div className="mb-8">
          <h2 className="font-serif text-3xl md:text-4xl">Independent brewhouses we love</h2>
          <p className="mt-2 text-muted-foreground">Every beer carries a story. Meet a few of the makers.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {breweries.slice(0, 3).map((b) => (
            <Link key={b.id} href={`/brewery/${b.slug}`}>
              <Card className="group h-full overflow-hidden transition-all hover:border-gold/40">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={b.image} alt={b.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="space-y-2 p-5">
                  <div className="text-xs uppercase tracking-wider text-gold">{b.city}, {b.region}</div>
                  <div className="font-serif text-xl group-hover:text-gold">{b.name}</div>
                  <div className="text-sm text-muted-foreground">{b.tagline}</div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20">
        <Card className="overflow-hidden border-gold/30 bg-gradient-to-br from-background via-card to-background p-10 text-center md:p-16">
          <h2 className="font-serif text-3xl md:text-5xl">Find your flavor in under a minute.</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Six questions. One personalized lineup. No gimmicks, no generic lagers.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild size="lg"><Link href="/onboarding"><Sparkles className="h-4 w-4" /> Take the taste quiz</Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/discover">Browse catalog</Link></Button>
          </div>
        </Card>
      </section>
    </>
  );
}

function Value({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold [&_svg]:h-5 [&_svg]:w-5">
        {icon}
      </div>
      <div>
        <div className="font-serif text-lg">{title}</div>
        <div className="text-sm text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}
