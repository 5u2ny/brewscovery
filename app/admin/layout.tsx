"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Beer, Building2, Package, BarChart3, ShieldAlert } from "lucide-react";
import { useAuth } from "@/lib/store/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Overview", icon: BarChart3 },
  { href: "/admin/beers", label: "Beers", icon: Beer },
  { href: "/admin/breweries", label: "Breweries", icon: Building2 },
  { href: "/admin/packs", label: "Packs", icon: Package },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user?.isAdmin) {
    return (
      <div className="container max-w-xl py-20">
        <Card className="p-10 text-center">
          <ShieldAlert className="mx-auto mb-3 h-10 w-10 text-gold" />
          <h1 className="font-serif text-2xl">Admin access required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in with <span className="text-gold">admin@brewscovery.com</span> to access this area.
          </p>
          <Button asChild className="mt-6"><Link href="/auth/sign-in">Sign in</Link></Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="font-serif text-4xl">Admin</h1>
        <p className="text-sm text-muted-foreground">Manage the Brewscovery catalog, packs, and content.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-[220px_1fr]">
        <aside className="space-y-1">
          {NAV.map((n) => {
            const Icon = n.icon;
            const active = pathname === n.href || (n.href !== "/admin" && pathname?.startsWith(n.href));
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  active ? "bg-gold/10 text-gold" : "text-muted-foreground hover:bg-secondary/60"
                )}
              >
                <Icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}
