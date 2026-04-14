import type { Brewery } from "@/lib/types";

export const breweries: Brewery[] = [
  {
    id: "br-koji",
    slug: "koji-wave",
    name: "Koji Wave Brewing",
    city: "Portland",
    region: "OR",
    tagline: "Fermentation as philosophy.",
    story:
      "Koji Wave began in a converted boathouse on the Willamette, where founder Mina Sato applied her sake-brewing lineage to the world of craft beer. Every beer leads with restraint, clarity, and a deep respect for ingredients.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200",
    local: true,
  },
  {
    id: "br-ember",
    slug: "ember-oak",
    name: "Ember Oak Cellars",
    city: "Asheville",
    region: "NC",
    tagline: "Woodfire, patience, and slow malt.",
    story:
      "A Blue Ridge micro-cellar obsessed with barrel aging and mountain water. Ember Oak's porters and browns have quietly earned a cult following among depth-seekers.",
    image: "https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=1200",
  },
  {
    id: "br-saltline",
    slug: "saltline",
    name: "Saltline Coastal Brewhouse",
    city: "Santa Cruz",
    region: "CA",
    tagline: "Ocean air in every pour.",
    story:
      "A beach-town brewery whose gose and kettle sours lean into briny minerality, cucumber, and coastal herbs. Built by two surfers with chemistry degrees.",
    image: "https://images.unsplash.com/photo-1518176258769-f227c798150e?w=1200",
    local: true,
  },
  {
    id: "br-lumen",
    slug: "lumen-craft",
    name: "Lumen Craft Co.",
    city: "Brooklyn",
    region: "NY",
    tagline: "Clean lines. Loud flavors.",
    story:
      "An all-female brewhouse redefining non-alcoholic and low-ABV categories with hop-forward, botanical, precision-brewed lagers.",
    image: "https://images.unsplash.com/photo-1600788907416-456578634209?w=1200",
  },
  {
    id: "br-hinterland",
    slug: "hinterland",
    name: "Hinterland Fermentation",
    city: "Burlington",
    region: "VT",
    tagline: "Farmhouse roots. Modern edge.",
    story:
      "Hinterland draws on Vermont farmhouse traditions, fermenting with wild yeast harvested from the orchards ringing their brewhouse.",
    image: "https://images.unsplash.com/photo-1586993451228-09816f8c0f88?w=1200",
    local: true,
  },
  {
    id: "br-northbloom",
    slug: "northbloom",
    name: "Northbloom Cooperage",
    city: "Seattle",
    region: "WA",
    tagline: "A kindly obsession with hops.",
    story:
      "A cooperative brewhouse where every member contributes a single ingredient. Known for West Coast IPAs with startling clarity.",
    image: "https://images.unsplash.com/photo-1571613914063-48e2e7abbc0c?w=1200",
  },
];
