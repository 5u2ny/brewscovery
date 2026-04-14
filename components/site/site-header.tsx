"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/store/cart";
import { useAuth } from "@/lib/store/auth";

const NAV = [
  { href: "/discover", label: "Discover" },
  { href: "/discovery-mix", label: "Discovery Mix" },
  { href: "/onboarding", label: "Taste Quiz" },
  { href: "/dashboard", label: "My Cellar" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { count } = useCart();
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 bg-gold/10 font-serif text-gold">
            B
          </span>
          <span className="font-serif text-xl tracking-tight">
            Brew<span className="text-gold">scovery</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "text-sm transition-colors hover:text-gold",
                pathname?.startsWith(n.href) ? "text-gold" : "text-muted-foreground"
              )}
            >
              {n.label}
            </Link>
          ))}
          {user?.isAdmin && (
            <Link
              href="/admin"
              className={cn(
                "text-sm transition-colors hover:text-gold",
                pathname?.startsWith("/admin") ? "text-gold" : "text-muted-foreground"
              )}
            >
              Admin
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" aria-label="Cart">
            <Link href="/cart" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-primary-foreground">
                  {count}
                </span>
              )}
            </Link>
          </Button>
          {user ? (
            <Button asChild variant="ghost" size="icon" aria-label="Account">
              <Link href="/dashboard">
                <User2 className="h-5 w-5" />
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
              <Link href="/auth/sign-in">Sign in</Link>
            </Button>
          )}
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="/onboarding">
              <Sparkles className="h-4 w-4" /> Find my beer
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
