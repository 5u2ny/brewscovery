"use client";
import { breweries } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminBreweriesPage() {
  return (
    <div>
      <h2 className="mb-6 font-serif text-2xl">Breweries</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {breweries.map((b) => (
          <Card key={b.id} className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-serif text-lg">{b.name}</div>
                <div className="text-xs text-muted-foreground">{b.city}, {b.region}</div>
              </div>
              {b.local && <Badge variant="local">Local</Badge>}
            </div>
            <p className="mt-3 text-sm italic text-muted-foreground">{b.tagline}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
