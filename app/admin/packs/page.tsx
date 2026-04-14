"use client";
import { packs, getBeerById } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export default function AdminPacksPage() {
  return (
    <div>
      <h2 className="mb-6 font-serif text-2xl">Discovery Mix packs</h2>
      <div className="space-y-4">
        {packs.map((p) => (
          <Card key={p.id} className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="font-serif text-lg">{p.name}</div>
                  {p.featured && <Badge variant="gold">Featured</Badge>}
                </div>
                <div className="text-xs text-muted-foreground">{p.tagline}</div>
              </div>
              <div className="font-serif text-xl text-gold">{formatCurrency(p.price)}/mo</div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.beerIds.map((id) => {
                const b = getBeerById(id);
                return b && <Badge key={id} variant="outline">{b.name}</Badge>;
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
