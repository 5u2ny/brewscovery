"use client";
import * as React from "react";
import { beers as seed, getBreweryById } from "@/lib/data";
import type { Beer } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { formatCurrency, slugify } from "@/lib/utils";

/**
 * Admin CRUD runs against an in-memory copy of the seeded catalog for this
 * session. State resets on reload — the point is to demonstrate the
 * management surface, not wire a real database.
 */
export default function AdminBeersPage() {
  const [items, setItems] = React.useState<Beer[]>(seed);
  const [editing, setEditing] = React.useState<Beer | null>(null);
  const [open, setOpen] = React.useState(false);

  function save(b: Beer) {
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === b.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = b;
        return next;
      }
      return [b, ...prev];
    });
    setOpen(false);
    setEditing(null);
  }

  function remove(id: string) {
    if (confirm("Remove this beer?")) setItems((prev) => prev.filter((x) => x.id !== id));
  }

  function startCreate() {
    setEditing({
      id: `b-${Date.now()}`,
      slug: "",
      name: "",
      breweryId: seed[0]?.breweryId ?? "",
      style: "IPA",
      abv: 5,
      price: 7,
      image: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=900",
      tastingNotes: "",
      flavors: [],
    });
    setOpen(true);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl">Beers</h2>
        <Button onClick={startCreate}><Plus className="h-4 w-4" /> New beer</Button>
      </div>

      <Card>
        <div className="divide-y divide-border/60">
          {items.map((b) => {
            const br = getBreweryById(b.breweryId);
            return (
              <div key={b.id} className="flex items-center justify-between gap-4 p-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="truncate font-serif text-lg">{b.name}</div>
                    {b.isLocal && <Badge variant="local">Local</Badge>}
                    {b.isNonAlcoholic && <Badge variant="na">NA</Badge>}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {br?.name ?? "—"} · {b.style} · {b.abv}% · {formatCurrency(b.price)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => { setEditing(b); setOpen(true); }}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => remove(b.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setEditing(null); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing?.name ? "Edit beer" : "New beer"}</DialogTitle></DialogHeader>
          {editing && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                save({ ...editing, slug: editing.slug || slugify(editing.name) });
              }}
              className="space-y-4"
            >
              <div><Label>Name</Label><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} required /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Style</Label><Input value={editing.style} onChange={(e) => setEditing({ ...editing, style: e.target.value as any })} /></div>
                <div><Label>ABV %</Label><Input type="number" step="0.1" value={editing.abv} onChange={(e) => setEditing({ ...editing, abv: Number(e.target.value) })} /></div>
                <div><Label>Price</Label><Input type="number" step="0.5" value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} /></div>
                <div><Label>Image URL</Label><Input value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} /></div>
              </div>
              <div><Label>Tasting notes</Label><Input value={editing.tastingNotes} onChange={(e) => setEditing({ ...editing, tastingNotes: e.target.value })} /></div>
              <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
