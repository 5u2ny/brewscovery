"use client";
import { beers, breweries, packs } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Package, Star } from "lucide-react";

export default function AdminOverview() {
  // Demo metrics
  const metrics = [
    { label: "Active subscribers", value: 1248, icon: Users, delta: "+8.4%" },
    { label: "Monthly revenue", value: "$49,840", icon: TrendingUp, delta: "+12%" },
    { label: "Packs shipped", value: 4129, icon: Package, delta: "+5.2%" },
    { label: "Avg rating", value: "4.6", icon: Star, delta: "+0.1" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.label} className="p-5">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{m.label}</div>
                <Icon className="h-4 w-4 text-gold" />
              </div>
              <div className="mt-2 font-serif text-3xl text-cream">{m.value}</div>
              <div className="mt-1 text-xs text-emerald-400">{m.delta} vs last month</div>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <h3 className="font-serif text-lg">Catalog</h3>
          <p className="mt-1 text-sm text-muted-foreground">Current inventory.</p>
          <div className="mt-4 grid grid-cols-3 text-center">
            <Stat v={beers.length} k="Beers" />
            <Stat v={breweries.length} k="Breweries" />
            <Stat v={packs.length} k="Packs" />
          </div>
        </Card>
        <Card className="p-6 md:col-span-2">
          <h3 className="font-serif text-lg">Top pours this month</h3>
          <ul className="mt-4 divide-y divide-border/60">
            {[...beers].sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0)).slice(0, 5).map((b) => (
              <li key={b.id} className="flex items-center justify-between py-3 text-sm">
                <span>{b.name}</span>
                <span className="text-gold">{b.popularity}% popularity</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function Stat({ v, k }: { v: React.ReactNode; k: string }) {
  return (
    <div>
      <div className="font-serif text-2xl text-gold">{v}</div>
      <div className="text-xs text-muted-foreground">{k}</div>
    </div>
  );
}
