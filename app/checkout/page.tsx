"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/store/cart";
import { useAuth } from "@/lib/store/auth";
import { getBeerById, getPackById } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const { user, setSubscription } = useAuth();
  const router = useRouter();
  const [done, setDone] = React.useState(false);

  const subPack = items.find((i) => i.kind === "pack");

  function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    if (subPack && user) {
      const pack = getPackById(subPack.id);
      if (pack) {
        const next = new Date();
        next.setDate(next.getDate() + 30);
        setSubscription({ packSlug: pack.slug, status: "active", nextShipment: next.toISOString() });
      }
    }
    clear();
    setDone(true);
  }

  if (done) {
    return (
      <div className="container max-w-xl py-20">
        <Card className="p-10 text-center">
          <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-gold" />
          <h1 className="font-serif text-3xl">Order placed.</h1>
          <p className="mt-2 text-muted-foreground">
            This is a test checkout — no card was charged. Your mock order is on the way.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild><Link href="/dashboard">Go to my cellar</Link></Button>
            <Button asChild variant="outline"><Link href="/discover">Keep exploring</Link></Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl py-14">
      <h1 className="mb-8 font-serif text-4xl">Checkout</h1>
      <form onSubmit={placeOrder} className="grid gap-8 md:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-serif text-xl">Shipping address</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2"><Label>Name</Label><Input required defaultValue={user?.name} /></div>
              <div className="sm:col-span-2"><Label>Street</Label><Input required placeholder="123 Malt St" /></div>
              <div><Label>City</Label><Input required /></div>
              <div><Label>Zip</Label><Input required /></div>
            </div>
          </Card>
          <Card className="p-6">
            <h2 className="font-serif text-xl">Payment (test)</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2"><Label>Card number</Label><Input required placeholder="4242 4242 4242 4242" /></div>
              <div><Label>Expiry</Label><Input required placeholder="12/28" /></div>
              <div><Label>CVC</Label><Input required placeholder="123" /></div>
            </div>
            <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" /> Test mode — no real charges.
            </p>
          </Card>
        </div>
        <Card className="h-fit p-6 md:sticky md:top-24">
          <h2 className="font-serif text-xl">Your order</h2>
          <Separator className="my-4" />
          <ul className="space-y-2 text-sm">
            {items.map((it) => {
              const d = it.kind === "beer" ? getBeerById(it.id) : getPackById(it.id);
              if (!d) return null;
              return (
                <li key={`${it.kind}-${it.id}`} className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {(d as any).name} × {it.quantity}
                  </span>
                  <span>{formatCurrency((d as any).price * it.quantity)}</span>
                </li>
              );
            })}
          </ul>
          <Separator className="my-4" />
          <div className="flex items-center justify-between font-serif">
            <span>Total</span>
            <span className="text-xl text-gold">{formatCurrency(total)}</span>
          </div>
          <Button type="submit" size="lg" className="mt-6 w-full" disabled={items.length === 0}>
            Place test order
          </Button>
        </Card>
      </form>
    </div>
  );
}
