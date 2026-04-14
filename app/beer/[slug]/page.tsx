"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, Heart, Plus, Minus, Star } from "lucide-react";
import { getBeerBySlug, getBreweryById, beers } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BeerCard } from "@/components/beer/beer-card";
import { useCart } from "@/lib/store/cart";
import { useAuth } from "@/lib/store/auth";
import { formatCurrency, cn } from "@/lib/utils";

export default function BeerDetailPage() {
  const params = useParams<{ slug: string }>();
  const beer = getBeerBySlug(params.slug);
  const { add } = useCart();
  const { user, toggleFavorite, rateBeer } = useAuth();
  const [qty, setQty] = React.useState(1);

  if (!beer) return notFound();
  const brewery = getBreweryById(beer.breweryId);
  const favorited = !!user?.favoriteBeerIds.includes(beer.id);
  const myRating = user?.ratings[beer.id];

  const related = beers
    .filter((b) => b.id !== beer.id && b.flavors.some((f) => beer.flavors.includes(f)))
    .slice(0, 4);

  return (
    <div className="container py-10">
      <Link href="/discover" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold">
        <ArrowLeft className="h-4 w-4" /> Back to catalog
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/60 bg-secondary">
          <Image src={beer.image} alt={beer.name} fill priority className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {beer.isLocal && <Badge variant="local">Local</Badge>}
            {beer.isNonAlcoholic && <Badge variant="na">Non-Alcoholic</Badge>}
            {beer.isSeasonal && <Badge variant="gold">{beer.season}</Badge>}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            {brewery && (
              <Link href={`/brewery/${brewery.slug}`} className="text-sm text-gold hover:underline">
                {brewery.name} · {brewery.city}, {brewery.region}
              </Link>
            )}
            <h1 className="mt-1 font-serif text-4xl md:text-5xl">{beer.name}</h1>
            <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{beer.style}</span>
              <span>·</span>
              <span>{beer.abv}% ABV</span>
              {beer.ibu !== undefined && <><span>·</span><span>{beer.ibu} IBU</span></>}
              {beer.rating && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-gold text-gold" />{beer.rating}</span>
                </>
              )}
            </div>
          </div>

          <p className="text-lg leading-relaxed text-cream/90">{beer.tastingNotes}</p>

          <div className="flex flex-wrap gap-2">
            {beer.flavors.map((f) => (
              <Badge key={f} variant="outline" className="capitalize">{f.replace("-", " ")}</Badge>
            ))}
          </div>

          <Separator />

          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Price · 8oz tasting can</div>
              <div className="font-serif text-3xl text-gold">{formatCurrency(beer.price)}</div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border p-1">
              <Button size="icon" variant="ghost" onClick={() => setQty(Math.max(1, qty - 1))}><Minus className="h-4 w-4" /></Button>
              <span className="w-8 text-center font-semibold">{qty}</span>
              <Button size="icon" variant="ghost" onClick={() => setQty(qty + 1)}><Plus className="h-4 w-4" /></Button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button size="lg" className="flex-1" onClick={() => add({ kind: "beer", id: beer.id, quantity: qty })}>
              Add to cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              disabled={!user}
              onClick={() => user && toggleFavorite(beer.id)}
              className={cn(favorited && "border-gold text-gold")}
            >
              <Heart className={cn("h-4 w-4", favorited && "fill-gold")} />
              {favorited ? "Saved" : "Save"}
            </Button>
          </div>

          {user && (
            <Card className="p-5">
              <div className="text-sm font-medium">Rate this beer</div>
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => rateBeer(beer.id, n)} aria-label={`Rate ${n}`}>
                    <Star className={cn("h-6 w-6", (myRating ?? 0) >= n ? "fill-gold text-gold" : "text-muted-foreground")} />
                  </button>
                ))}
              </div>
              {myRating && <div className="mt-2 text-xs text-muted-foreground">You rated this {myRating}/5</div>}
            </Card>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 font-serif text-2xl">You might also enjoy</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((b) => <BeerCard key={b.id} beer={b} />)}
          </div>
        </section>
      )}
    </div>
  );
}
