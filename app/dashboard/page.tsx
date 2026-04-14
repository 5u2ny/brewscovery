"use client";
import Link from "next/link";
import { Calendar, LogOut, Pause, Play, Sparkles, Heart } from "lucide-react";
import { useAuth } from "@/lib/store/auth";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BeerCard } from "@/components/beer/beer-card";
import { getBeerById, getPackBySlug } from "@/lib/data";
import { usePreferences } from "@/lib/store/preferences";

export default function DashboardPage() {
  const { user, signOut, setSubscription } = useAuth();
  const { prefs, onboarded } = usePreferences();

  if (!user) {
    return (
      <div className="container max-w-xl py-20">
        <Card className="p-10 text-center">
          <h1 className="font-serif text-2xl">You're not signed in.</h1>
          <p className="mt-2 text-muted-foreground">Sign in to view your cellar.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild><Link href="/auth/sign-in">Sign in</Link></Button>
            <Button asChild variant="outline"><Link href="/auth/sign-up">Create account</Link></Button>
          </div>
        </Card>
      </div>
    );
  }

  const favorites = user.favoriteBeerIds.map(getBeerById).filter(Boolean) as NonNullable<ReturnType<typeof getBeerById>>[];
  const pack = user.subscription ? getPackBySlug(user.subscription.packSlug) : null;

  return (
    <div className="container py-14">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <Badge variant="gold" className="mb-2">My Cellar</Badge>
          <h1 className="font-serif text-4xl">Hello, {user.name}.</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
        <Button variant="ghost" onClick={signOut}><LogOut className="h-4 w-4" /> Sign out</Button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="taste">Taste profile</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-3">
            <Stat label="Favorites" value={favorites.length} />
            <Stat label="Ratings given" value={Object.keys(user.ratings).length} />
            <Stat label="Subscription" value={user.subscription?.status ?? "—"} />
          </div>
          <Card className="mt-6 p-6">
            <h2 className="font-serif text-xl">Quick actions</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild><Link href="/discovery-mix"><Sparkles className="h-4 w-4" /> Today's picks</Link></Button>
              <Button asChild variant="outline"><Link href="/onboarding">Update taste profile</Link></Button>
              <Button asChild variant="outline"><Link href="/discover">Browse catalog</Link></Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="favorites">
          {favorites.length === 0 ? (
            <Card className="p-10 text-center">
              <Heart className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
              <p className="font-serif text-lg">No favorites yet.</p>
              <p className="mt-1 text-sm text-muted-foreground">Tap the heart on any beer to save it.</p>
            </Card>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {favorites.map((b) => <BeerCard key={b.id} beer={b} />)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="subscription">
          {!user.subscription || !pack ? (
            <Card className="p-10 text-center">
              <p className="font-serif text-lg">You don't have an active subscription.</p>
              <Button asChild className="mt-4"><Link href="/discovery-mix">Start one</Link></Button>
            </Card>
          ) : (
            <Card className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge variant="gold">{user.subscription.status}</Badge>
                  <h2 className="mt-2 font-serif text-2xl">{pack.name}</h2>
                  <p className="text-sm italic text-muted-foreground">{pack.tagline}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gold" />
                    Next shipment: {new Date(user.subscription.nextShipment).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {user.subscription.status === "active" ? (
                    <Button variant="outline" onClick={() => setSubscription({ ...user.subscription!, status: "paused" })}>
                      <Pause className="h-4 w-4" /> Pause
                    </Button>
                  ) : (
                    <Button onClick={() => setSubscription({ ...user.subscription!, status: "active" })}>
                      <Play className="h-4 w-4" /> Resume
                    </Button>
                  )}
                  <Button variant="ghost" onClick={() => setSubscription({ ...user.subscription!, status: "cancelled" })}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="taste">
          <Card className="p-6">
            <h2 className="font-serif text-xl">Your palate</h2>
            <p className="mt-1 text-sm text-muted-foreground">{onboarded ? "Profile is active." : "No profile yet — take the quiz."}</p>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <Row k="Adventure level" v={`${prefs.adventureLevel} / 5`} />
              <Row k="ABV range" v={`${prefs.abvRange[0]}% – ${prefs.abvRange[1]}%`} />
              <Row k="Styles" v={prefs.styles.join(", ") || "—"} />
              <Row k="Flavors" v={prefs.flavors.join(", ") || "—"} />
              <Row k="Non-alcoholic" v={prefs.includeNA ? "Yes" : "No"} />
              <Row k="Prefer local" v={prefs.preferLocal ? "Yes" : "No"} />
            </dl>
            <div className="mt-5">
              <Button asChild variant="outline"><Link href="/onboarding">Update profile</Link></Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Card className="p-6">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-serif text-3xl text-gold capitalize">{value}</div>
    </Card>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/40 py-2">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-cream">{v}</dd>
    </div>
  );
}
