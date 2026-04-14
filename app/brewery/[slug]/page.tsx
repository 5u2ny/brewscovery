"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { getBreweryBySlug, getBeersForBrewery } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { BeerCard } from "@/components/beer/beer-card";

export default function BreweryPage() {
  const params = useParams<{ slug: string }>();
  const brewery = getBreweryBySlug(params.slug);
  if (!brewery) return notFound();
  const lineup = getBeersForBrewery(brewery.id);

  return (
    <div>
      <div className="relative h-[40vh] min-h-[320px] w-full overflow-hidden">
        <Image src={brewery.image} alt={brewery.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
        <div className="container relative z-10 flex h-full flex-col justify-end pb-10">
          <Link href="/discover" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <Badge variant="gold" className="mb-2 w-fit">
            <MapPin className="mr-1 h-3 w-3" /> {brewery.city}, {brewery.region}
          </Badge>
          <h1 className="font-serif text-5xl md:text-6xl">{brewery.name}</h1>
          <p className="mt-2 max-w-2xl text-lg text-muted-foreground italic">{brewery.tagline}</p>
        </div>
      </div>

      <div className="container py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-3 font-serif text-2xl">The story</h2>
          <p className="text-cream/90">{brewery.story}</p>
        </div>

        <section className="mt-16">
          <h2 className="mb-6 font-serif text-2xl">The lineup</h2>
          {lineup.length === 0 ? (
            <p className="text-muted-foreground">Nothing pouring right now.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {lineup.map((b) => <BeerCard key={b.id} beer={b} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
