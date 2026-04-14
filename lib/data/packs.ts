import type { DiscoveryPack } from "@/lib/types";

export const packs: DiscoveryPack[] = [
  {
    id: "p-signature",
    slug: "signature-discovery-mix",
    name: "Signature Discovery Mix",
    tagline: "Our flagship monthly tasting.",
    description:
      "Four 8oz tasting cans, curated around a seasonal theme. The definitive Brewscovery experience.",
    beerIds: [
      "b-sakura-session",
      "b-plum-apricot-brown",
      "b-cucumber-lime-gose",
      "b-lavender-yuzu",
    ],
    price: 40,
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1200",
    featured: true,
    theme: "classic",
  },
  {
    id: "p-na",
    slug: "bright-mind-na-mix",
    name: "Bright Mind NA Mix",
    tagline: "All the craft, none of the alcohol.",
    description:
      "A thoughtful exploration of non-alcoholic craft — hop-forward, floral, and genuinely exciting.",
    beerIds: ["b-lavender-yuzu", "b-clear-day-na", "b-citrus-wheat", "b-harbor-pilsner"],
    price: 36,
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=1200",
    theme: "non-alcoholic",
  },
  {
    id: "p-adventure",
    slug: "wild-path-adventure-mix",
    name: "Wild Path Adventure Mix",
    tagline: "For the palate that wants to be challenged.",
    description:
      "Funky, sour, wild-fermented. This pack is for drinkers who already know they love the strange stuff.",
    beerIds: ["b-wild-hibiscus-sour", "b-orchard-saison", "b-cucumber-lime-gose", "b-midnight-porter"],
    price: 44,
    image: "https://images.unsplash.com/photo-1600271886742-f049b9deb53e?w=1200",
    theme: "adventurous",
  },
  {
    id: "p-local",
    slug: "local-roots-mix",
    name: "Local Roots Mix",
    tagline: "Support the brewhouse down the road.",
    description:
      "Four beers, four regional brewhouses. A different corner of craft in every sip.",
    beerIds: ["b-sakura-session", "b-harbor-pilsner", "b-orchard-saison", "b-cucumber-lime-gose"],
    price: 40,
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200",
    theme: "local",
  },
];
