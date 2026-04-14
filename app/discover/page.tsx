"use client";
import * as React from "react";
import { Search } from "lucide-react";
import { BeerCard } from "@/components/beer/beer-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { beers } from "@/lib/data";
import type { BeerStyle, FlavorTag } from "@/lib/types";
import { cn } from "@/lib/utils";

const STYLES: ("All" | BeerStyle)[] = ["All", "IPA", "Pilsner", "Lager", "Stout", "Porter", "Sour", "Gose", "Saison", "Brown Ale", "Pale Ale", "Wheat", "NA"];
const FLAVORS: FlavorTag[] = ["citrus", "floral", "tropical", "hoppy", "malty", "roasty", "tart", "salty", "herbal", "chocolate", "coffee", "fruity", "crisp", "smooth"];

export default function DiscoverPage() {
  const [q, setQ] = React.useState("");
  const [style, setStyle] = React.useState<"All" | BeerStyle>("All");
  const [abv, setAbv] = React.useState<[number, number]>([0, 10]);
  const [flavors, setFlavors] = React.useState<FlavorTag[]>([]);
  const [localOnly, setLocalOnly] = React.useState(false);
  const [naOnly, setNaOnly] = React.useState(false);

  const filtered = beers.filter((b) => {
    if (q && !`${b.name} ${b.tastingNotes}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (style !== "All" && b.style !== style) return false;
    if (b.abv < abv[0] || b.abv > abv[1]) return false;
    if (flavors.length && !flavors.some((f) => b.flavors.includes(f))) return false;
    if (localOnly && !b.isLocal) return false;
    if (naOnly && !b.isNonAlcoholic) return false;
    return true;
  });

  return (
    <div className="container py-14">
      <div className="mb-10">
        <Badge variant="gold" className="mb-2">Catalog</Badge>
        <h1 className="font-serif text-4xl md:text-5xl">Discover the lineup</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Every beer is curated. Filter by style, flavor, strength, or origin.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[280px_1fr]">
        <aside className="space-y-6 md:sticky md:top-24 md:self-start">
          <Card className="p-5">
            <Label htmlFor="search" className="mb-2 block">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="search" placeholder="Lavender, hops…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
            </div>
          </Card>
          <Card className="p-5 space-y-4">
            <div>
              <Label className="mb-2 block">Style</Label>
              <Select value={style} onValueChange={(v) => setStyle(v as any)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {STYLES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-3 block">ABV range: {abv[0]}% – {abv[1]}%</Label>
              <Slider min={0} max={10} step={0.5} value={abv as number[]} onValueChange={(v) => setAbv([v[0], v[1]])} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Local only</Label>
              <Switch checked={localOnly} onCheckedChange={setLocalOnly} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Non-alcoholic only</Label>
              <Switch checked={naOnly} onCheckedChange={setNaOnly} />
            </div>
          </Card>
          <Card className="p-5">
            <Label className="mb-3 block">Flavors</Label>
            <div className="flex flex-wrap gap-2">
              {FLAVORS.map((f) => {
                const on = flavors.includes(f);
                return (
                  <button
                    key={f}
                    onClick={() => setFlavors(on ? flavors.filter((x) => x !== f) : [...flavors, f])}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs capitalize transition-colors",
                      on ? "border-gold bg-gold/15 text-gold" : "border-border text-muted-foreground hover:border-gold/40"
                    )}
                  >
                    {f.replace("-", " ")}
                  </button>
                );
              })}
            </div>
          </Card>
        </aside>

        <div>
          <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>{filtered.length} {filtered.length === 1 ? "pour" : "pours"}</span>
          </div>
          {filtered.length === 0 ? (
            <Card className="p-10 text-center">
              <p className="font-serif text-xl">No matches — yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">Try loosening a filter.</p>
            </Card>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((b) => <BeerCard key={b.id} beer={b} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
