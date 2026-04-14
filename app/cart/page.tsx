"use client";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { getBeerById, getPackById } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const { items, setQuantity, remove, total } = useCart();

  return (
    <div className="container max-w-5xl py-14">
      <h1 className="mb-8 font-serif text-4xl">Your cart</h1>

      {items.length === 0 ? (
        <Card className="p-12 text-center">
          <ShoppingBag className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          <p className="font-serif text-xl">Nothing here yet.</p>
          <p className="mt-2 text-sm text-muted-foreground">Explore the catalog or start with a Discovery Mix.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild><Link href="/discover">Browse catalog</Link></Button>
            <Button asChild variant="outline"><Link href="/discovery-mix">See mixes</Link></Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-8 md:grid-cols-[1fr_340px]">
          <div className="space-y-4">
            {items.map((it) => {
              const data = it.kind === "beer" ? getBeerById(it.id) : getPackById(it.id);
              if (!data) return null;
              const price = (data as any).price as number;
              return (
                <Card key={`${it.kind}-${it.id}`} className="flex gap-4 overflow-hidden p-4">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-secondary">
                    <Image src={(data as any).image} alt={(data as any).name} fill className="object-cover" sizes="96px" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs uppercase tracking-wider text-gold">
                          {it.kind === "pack" ? "Subscription" : "Tasting can"}
                        </div>
                        <Link
                          href={it.kind === "beer" ? `/beer/${(data as any).slug}` : `/discovery-mix#${(data as any).slug}`}
                          className="font-serif text-lg hover:text-gold"
                        >
                          {(data as any).name}
                        </Link>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => remove(it.kind, it.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-end justify-between">
                      <div className="flex items-center gap-2 rounded-lg border border-border p-1">
                        <Button size="icon" variant="ghost" onClick={() => setQuantity(it.kind, it.id, it.quantity - 1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{it.quantity}</span>
                        <Button size="icon" variant="ghost" onClick={() => setQuantity(it.kind, it.id, it.quantity + 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <div className="font-serif text-lg text-gold">{formatCurrency(price * it.quantity)}</div>
                        {it.kind === "pack" && <div className="text-xs text-muted-foreground">/month</div>}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          <Card className="h-fit p-6 md:sticky md:top-24">
            <h2 className="font-serif text-xl">Summary</h2>
            <Separator className="my-4" />
            <div className="space-y-2 text-sm">
              <Row k="Subtotal" v={formatCurrency(total)} />
              <Row k="Shipping" v="Included" />
              <Row k="Tax" v="Calculated at checkout" />
            </div>
            <Separator className="my-4" />
            <Row k="Total" v={formatCurrency(total)} bold />
            <Button asChild size="lg" className="mt-6 w-full">
              <Link href="/checkout">Checkout</Link>
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Test checkout. No real charges.
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}

function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={bold ? "font-serif text-base" : "text-muted-foreground"}>{k}</span>
      <span className={bold ? "font-serif text-lg text-gold" : ""}>{v}</span>
    </div>
  );
}
