"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { BeerCard } from "@/components/beer/beer-card";
import { packs, getBeerById } from "@/lib/data";
import { usePreferences } from "@/lib/store/preferences";
import { useCart } from "@/lib/store/cart";
import { recommendBeers } from "@/lib/recommendations";
import { formatCurrency } from "@/lib/utils";

export default function DiscoveryMixPage() {
  const { prefs, onboarded } = usePreferences();
  const { add } = useCart();
  const scored = React.useMemo(() => recommendBeers(prefs, 8), [prefs]);

  return (
    <div className="container py-14">
      <section className="mb-16 text-center">
        <Badge variant="gold" className="mb-3">Discovery Mix</Badge>
        <h1 className="font-serif text-4xl md:text-6xl">Curated monthly. Made for you.</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Four 8oz tasting cans every month. Always a new seasonal theme, always personalized.
        </p>
      </section>

      {/* Signature packs */}
      <section className="mb-20">
        <h2 className="mb-6 font-serif text-3xl">Choose your pack</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {packs.map((p) => (
            <Card key={p.id} id={p.slug} className="overflow-hidden transition-all hover:border-gold/40">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={p.image} alt={p.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                {p.featured && <Badge variant="gold" className="absolute left-4 top-4">Featured</Badge>}
              </div>
              <div className="space-y-4 p-6">
                <div>
                  <h3 className="font-serif text-2xl">{p.name}</h3>
                  <p className="mt-1 text-sm italic text-muted-foreground">{p.tagline}</p>
                </div>
                <p className="text-sm text-cream/80">{p.description}</p>
                <div className="space-y-2 rounded-lg border border-border/60 bg-background/40 p-3">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">This month's selection</div>
                  <ul className="space-y-1 text-sm">
                    {p.beerIds.map((id) => {
                      const b = getBeerById(id);
                      if (!b) return null;
                      return (
                        <li key={id} className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-gold" />
                          <Link href={`/beer/${b.slug}`} className="hover:text-gold">{b.name}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="font-serif text-2xl text-gold">{formatCurrency(p.price)}</span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                  <Button onClick={() => add({ kind: "pack", id: p.id, quantity: 1 })}>
                    Subscribe
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Personalized recommendations */}
      <section>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wider text-gold">
              <Sparkles className="h-3.5 w-3.5" /> Picked for you
            </div>
            <h2 className="font-serif text-3xl">Your personalized lineup</h2>
            <p className="mt-1 text-muted-foreground">
              {onboarded ? "Based on your taste profile." : "Take the taste quiz for sharper matches."}
            </p>
          </div>
          {!onboarded && (
            <Button asChild><Link href="/onboarding"><Sparkles className="h-4 w-4" /> Take quiz</Link></Button>
          )}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {scored.map(({ beer, score, reasons }) => (
            <div key={beer.id} className="space-y-2">
              <BeerCard beer={beer} matchScore={score} />
              {reasons.length > 0 && (
                <div className="px-1 text-xs text-muted-foreground">
                  {reasons.slice(0, 2).join(" · ")}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
