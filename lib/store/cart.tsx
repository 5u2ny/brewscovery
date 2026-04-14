"use client";
import * as React from "react";
import type { CartItem } from "@/lib/types";
import { getBeerById, getPackById } from "@/lib/data";

const KEY = "brewscovery:cart";

interface Ctx {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (kind: "beer" | "pack", id: string) => void;
  setQuantity: (kind: "beer" | "pack", id: string, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
}

const CartContext = React.createContext<Ctx | null>(null);

function priceOf(item: CartItem) {
  if (item.kind === "beer") return getBeerById(item.id)?.price ?? 0;
  return getPackById(item.id)?.price ?? 0;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add = (item: CartItem) =>
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.kind === item.kind && p.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity };
        return next;
      }
      return [...prev, item];
    });

  const remove = (kind: "beer" | "pack", id: string) =>
    setItems((prev) => prev.filter((p) => !(p.kind === kind && p.id === id)));

  const setQuantity = (kind: "beer" | "pack", id: string, qty: number) =>
    setItems((prev) =>
      prev
        .map((p) => (p.kind === kind && p.id === id ? { ...p, quantity: qty } : p))
        .filter((p) => p.quantity > 0)
    );

  const clear = () => setItems([]);

  const total = items.reduce((s, i) => s + priceOf(i) * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, setQuantity, clear, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
