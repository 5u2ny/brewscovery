export type BeerStyle =
  | "IPA"
  | "Pilsner"
  | "Lager"
  | "Stout"
  | "Porter"
  | "Sour"
  | "Gose"
  | "Saison"
  | "Brown Ale"
  | "Pale Ale"
  | "Wheat"
  | "NA";

export type FlavorTag =
  | "citrus"
  | "floral"
  | "tropical"
  | "stone-fruit"
  | "malty"
  | "roasty"
  | "hoppy"
  | "bitter"
  | "tart"
  | "salty"
  | "herbal"
  | "spice"
  | "chocolate"
  | "coffee"
  | "fruity"
  | "crisp"
  | "smooth";

export interface Brewery {
  id: string;
  slug: string;
  name: string;
  city: string;
  region: string;
  tagline: string;
  story: string;
  image: string;
  local?: boolean;
}

export interface Beer {
  id: string;
  slug: string;
  name: string;
  breweryId: string;
  style: BeerStyle;
  abv: number;
  ibu?: number;
  price: number;           // per 8oz tasting can
  image: string;
  tastingNotes: string;
  flavors: FlavorTag[];
  isNonAlcoholic?: boolean;
  isLocal?: boolean;
  isSeasonal?: boolean;
  season?: "spring" | "summer" | "fall" | "winter";
  rating?: number;         // 1-5
  popularity?: number;     // 0-100
}

export interface DiscoveryPack {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  beerIds: string[];
  price: number;           // per month
  image: string;
  featured?: boolean;
  theme?: "adventurous" | "classic" | "non-alcoholic" | "local" | "seasonal";
}

export interface TastePreferences {
  adventureLevel: number;      // 1-5
  abvRange: [number, number];  // min,max
  styles: BeerStyle[];
  flavors: FlavorTag[];
  includeNA: boolean;
  preferLocal: boolean;
}

export interface CartItem {
  kind: "beer" | "pack";
  id: string;
  quantity: number;
}
