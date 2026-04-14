"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { usePreferences } from "@/lib/store/preferences";
import type { BeerStyle, FlavorTag, TastePreferences } from "@/lib/types";
import { cn } from "@/lib/utils";

const STYLES: BeerStyle[] = ["IPA", "Pilsner", "Lager", "Stout", "Porter", "Sour", "Gose", "Saison", "Brown Ale", "Pale Ale", "Wheat", "NA"];
const FLAVORS: FlavorTag[] = ["citrus", "floral", "tropical", "stone-fruit", "malty", "roasty", "hoppy", "bitter", "tart", "salty", "herbal", "spice", "chocolate", "coffee", "fruity", "crisp", "smooth"];

const STEPS = ["Adventure", "Styles", "Flavors", "ABV", "Preferences", "Review"] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const { prefs, setPrefs } = usePreferences();
  const [draft, setDraft] = React.useState<TastePreferences>(prefs);
  const [step, setStep] = React.useState(0);

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));
  const finish = () => {
    setPrefs(draft);
    router.push("/discovery-mix");
  };

  return (
    <div className="container max-w-3xl py-16">
      <div className="mb-8 text-center">
        <Badge variant="gold" className="mb-3">Taste Quiz</Badge>
        <h1 className="font-serif text-4xl md:text-5xl">Let's find your flavor.</h1>
        <p className="mt-3 text-muted-foreground">Six quick questions. We'll build you a tasting lineup.</p>
      </div>

      {/* stepper */}
      <div className="mb-8 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i <= step ? "bg-gold" : "bg-secondary"
            )}
          />
        ))}
      </div>

      <Card className="p-8">
        {step === 0 && (
          <Step title="How adventurous is your palate?" desc="From crowd-pleasers to wild, funky, experimental pours.">
            <div className="px-2">
              <Slider min={1} max={5} step={1} value={[draft.adventureLevel]} onValueChange={(v) => setDraft({ ...draft, adventureLevel: v[0] })} />
              <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                <span>Classic</span><span>Curious</span><span>Balanced</span><span>Adventurous</span><span>Wild</span>
              </div>
              <div className="mt-6 text-center text-2xl font-serif text-gold">Level {draft.adventureLevel}</div>
            </div>
          </Step>
        )}

        {step === 1 && (
          <Step title="Which styles intrigue you?" desc="Pick any that call to you. You can always edit this later.">
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s) => {
                const on = draft.styles.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() =>
                      setDraft({
                        ...draft,
                        styles: on ? draft.styles.filter((x) => x !== s) : [...draft.styles, s],
                      })
                    }
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm transition-colors",
                      on ? "border-gold bg-gold/15 text-gold" : "border-border text-muted-foreground hover:border-gold/40"
                    )}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </Step>
        )}

        {step === 2 && (
          <Step title="Which flavors excite you?" desc="Tap anything that makes your mouth water.">
            <div className="flex flex-wrap gap-2">
              {FLAVORS.map((f) => {
                const on = draft.flavors.includes(f);
                return (
                  <button
                    key={f}
                    onClick={() =>
                      setDraft({
                        ...draft,
                        flavors: on ? draft.flavors.filter((x) => x !== f) : [...draft.flavors, f],
                      })
                    }
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm capitalize transition-colors",
                      on ? "border-gold bg-gold/15 text-gold" : "border-border text-muted-foreground hover:border-gold/40"
                    )}
                  >
                    {f.replace("-", " ")}
                  </button>
                );
              })}
            </div>
          </Step>
        )}

        {step === 3 && (
          <Step title="What ABV range feels right?" desc="You can mix sessionable and bigger pours — your call.">
            <div className="px-2">
              <Slider min={0} max={10} step={0.5} value={draft.abvRange as number[]} onValueChange={(v) => setDraft({ ...draft, abvRange: [v[0], v[1]] as [number, number] })} />
              <div className="mt-6 flex items-center justify-between text-sm">
                <div className="text-muted-foreground">Min: <span className="font-serif text-lg text-gold">{draft.abvRange[0]}%</span></div>
                <div className="text-muted-foreground">Max: <span className="font-serif text-lg text-gold">{draft.abvRange[1]}%</span></div>
              </div>
            </div>
          </Step>
        )}

        {step === 4 && (
          <Step title="A few final preferences">
            <div className="space-y-5">
              <PrefRow
                label="Include non-alcoholic options"
                desc="Low-ABV and NA beers can still bring serious flavor."
                checked={draft.includeNA}
                onChange={(v) => setDraft({ ...draft, includeNA: v })}
              />
              <PrefRow
                label="Prefer local breweries"
                desc="We'll prioritize independent brewhouses near you."
                checked={draft.preferLocal}
                onChange={(v) => setDraft({ ...draft, preferLocal: v })}
              />
            </div>
          </Step>
        )}

        {step === 5 && (
          <Step title="You're all set." desc="Here's the shape of your palate:">
            <div className="grid gap-3 text-sm">
              <Row k="Adventure level" v={`${draft.adventureLevel} / 5`} />
              <Row k="Styles" v={draft.styles.join(", ") || "—"} />
              <Row k="Flavors" v={draft.flavors.join(", ") || "—"} />
              <Row k="ABV range" v={`${draft.abvRange[0]}% – ${draft.abvRange[1]}%`} />
              <Row k="Non-alcoholic" v={draft.includeNA ? "Yes" : "No"} />
              <Row k="Prefer local" v={draft.preferLocal ? "Yes" : "No"} />
            </div>
          </Step>
        )}

        <div className="mt-10 flex items-center justify-between">
          <Button variant="ghost" onClick={back} disabled={step === 0}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={next}>Continue <ArrowRight className="h-4 w-4" /></Button>
          ) : (
            <Button onClick={finish}><Sparkles className="h-4 w-4" /> See my matches</Button>
          )}
        </div>
      </Card>
    </div>
  );
}

function Step({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl">{title}</h2>
        {desc && <p className="mt-1 text-sm text-muted-foreground">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

function PrefRow({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-border/60 p-4">
      <div>
        <Label className="text-base">{label}</Label>
        <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/40 pb-2">
      <span className="text-muted-foreground">{k}</span>
      <span className="text-cream">{v}</span>
    </div>
  );
}
