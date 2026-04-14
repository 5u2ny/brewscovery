import type { Beer, TastePreferences } from "@/lib/types";
import { beers as allBeers } from "@/lib/data";

/**
 * Rules-based Brewscovery recommender.
 *
 * Each beer gets a 0-100 match score built from transparent, explainable signals:
 *   - flavor overlap               (up to 30)
 *   - style preference             (up to 20)
 *   - ABV fit                      (up to 15)
 *   - local preference             (up to 10)
 *   - non-alcoholic interest       (up to 10)
 *   - adventure fit                (up to 10)
 *   - popularity / rating prior    (up to 5)
 *
 * The goal is explainability, not black-box AI. Every bump is a rule the
 * customer could read back to you.
 */
export interface ScoredBeer {
  beer: Beer;
  score: number;
  reasons: string[];
}

const adventurousStyles = new Set(["Sour", "Gose", "Saison"]);
const classicStyles = new Set(["Pilsner", "Lager", "Pale Ale", "Wheat"]);

export function scoreBeer(beer: Beer, prefs: TastePreferences): ScoredBeer {
  let score = 0;
  const reasons: string[] = [];

  // 1) Flavor overlap
  const flavorOverlap = beer.flavors.filter((f) => prefs.flavors.includes(f)).length;
  if (flavorOverlap > 0) {
    const pts = Math.min(30, flavorOverlap * 10);
    score += pts;
    reasons.push(`Matches ${flavorOverlap} flavor${flavorOverlap > 1 ? "s" : ""} you love`);
  }

  // 2) Style match
  if (prefs.styles.includes(beer.style)) {
    score += 20;
    reasons.push(`${beer.style} is a preferred style`);
  }

  // 3) ABV fit
  const [minAbv, maxAbv] = prefs.abvRange;
  if (beer.abv >= minAbv && beer.abv <= maxAbv) {
    score += 15;
    reasons.push(`ABV (${beer.abv}%) fits your range`);
  } else {
    const dist = beer.abv < minAbv ? minAbv - beer.abv : beer.abv - maxAbv;
    score -= Math.min(10, dist * 3);
  }

  // 4) Local preference
  if (prefs.preferLocal && beer.isLocal) {
    score += 10;
    reasons.push("Local brewery");
  }

  // 5) NA interest
  if (prefs.includeNA && beer.isNonAlcoholic) {
    score += 10;
    reasons.push("Non-alcoholic match");
  } else if (!prefs.includeNA && beer.isNonAlcoholic) {
    score -= 20; // actively demote NA if user said no
  }

  // 6) Adventure fit
  if (prefs.adventureLevel >= 4 && adventurousStyles.has(beer.style)) {
    score += 10;
    reasons.push("Adventurous pick for your palate");
  }
  if (prefs.adventureLevel <= 2 && classicStyles.has(beer.style)) {
    score += 8;
    reasons.push("Classic, approachable choice");
  }

  // 7) Popularity + rating priors
  score += Math.round(((beer.rating ?? 4) - 4) * 5);
  score += Math.round((beer.popularity ?? 50) / 20); // up to ~5

  return { beer, score: Math.max(0, Math.min(100, score)), reasons };
}

export function recommendBeers(prefs: TastePreferences, limit = 8): ScoredBeer[] {
  return allBeers
    .map((b) => scoreBeer(b, prefs))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export const defaultPreferences: TastePreferences = {
  adventureLevel: 3,
  abvRange: [4, 7],
  styles: ["IPA", "Pilsner"],
  flavors: ["citrus", "hoppy", "crisp"],
  includeNA: true,
  preferLocal: true,
};
