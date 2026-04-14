"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import type { Beer } from "@/lib/types";
import { getBreweryById } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/store/auth";
import { useCart } from "@/lib/store/cart";
import { formatCurrency, cn } from "@/lib/utils";

export function BeerCard({ beer, matchScore }: { beer: Beer; matchScore?: number }) {
  const brewery = getBreweryById(beer.breweryId);
  const { user, toggleFavorite } = useAuth();
  const { add } = useCart();
  const favorited = !!user?.favoriteBeerIds.includes(beer.id);

  return (
    <Card className="group overflow-hidden transition-all hover:border-gold/40 hover:shadow-2xl hover:shadow-amber-950/40">
      <Link href={`/beer/${beer.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
          <Image
            src={beer.image}
            alt={beer.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {beer.isLocal && <Badge variant="local">Local</Badge>}
            {beer.isNonAlcoholic && <Badge variant="na">NA</Badge>}
            {beer.isSeasonal && <Badge variant="gold">{beer.season}</Badge>}
          </div>
          {typeof matchScore === "number" && (
            <div className="absolute right-3 top-3 rounded-full border border-gold/40 bg-background/70 px-2.5 py-1 text-xs font-semibold text-gold backdrop-blur">
              {matchScore}% match
            </div>
          )}
        </div>
      </Link>
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link href={`/beer/${beer.slug}`} className="block">
              <h3 className="truncate font-serif text-lg leading-tight group-hover:text-gold">
                {beer.name}
              </h3>
            </Link>
            {brewery && (
              <Link
                href={`/brewery/${brewery.slug}`}
                className="text-xs text-muted-foreground hover:text-gold"
              >
                {brewery.name} · {brewery.city}, {brewery.region}
              </Link>
            )}
          </div>
          <button
            aria-label="Favorite"
            onClick={() => user && toggleFavorite(beer.id)}
            disabled={!user}
            className={cn(
              "shrink-0 rounded-full p-1.5 transition-colors",
              favorited ? "text-gold" : "text-muted-foreground hover:text-gold"
            )}
          >
            <Heart className={cn("h-4 w-4", favorited && "fill-gold")} />
          </button>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {beer.style} · {beer.abv}% ABV
          </span>
          {beer.rating && (
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-gold text-gold" /> {beer.rating}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="font-semibold text-cream">{formatCurrency(beer.price)}</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => add({ kind: "beer", id: beer.id, quantity: 1 })}
          >
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
}
