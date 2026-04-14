# Brewscovery 🍺

**Premium craft beer discovery & subscription — curated tasting packs, personalized recommendations, and independent brewhouses, delivered.**

A portfolio-grade full-stack product demo built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui. Brewscovery centers on **Discovery Mix**, a monthly curated tasting pack of four 8oz pours matched to your palate.

---

## ✨ Key Features

### Customer
- Premium dark craft-beverage brand system (black / gold / warm cream)
- Age gate on first visit
- Mock auth (sign-in / sign-up / sign-out)
- 6-step taste onboarding quiz — adventure level, styles, flavors, ABV, NA, local
- Discover catalog with style / flavor / ABV / local / NA filters and search
- Beer detail pages with tasting notes, favorites, 5-star rating
- Brewery profile pages with origin story + full lineup
- Discovery Mix page with curated packs + personalized lineup
- Transparent, explainable **rules-based recommendation engine**
- Cart + test checkout (no real charges)
- Subscription management (active / pause / resume / cancel)
- Customer dashboard (favorites, subscription, taste profile)

### Admin
- Gated by email (`admin@brewscovery.com` → admin role)
- Overview with KPI cards, top pours, catalog counts
- Beers CRUD (in-memory — demonstrates the surface)
- Breweries & Packs management
- Analytics: retention and conversion funnel visualizations

---

## 🧱 Architecture

```
app/
  (routes)/           → Next.js App Router pages
  layout.tsx          → Root shell + Providers + Age gate
components/
  ui/                 → shadcn/ui primitives (button, card, dialog, …)
  site/               → Header, footer, age gate, providers
  beer/               → Domain components (BeerCard)
lib/
  data/               → Seeded breweries, beers, packs
  store/              → Client state (auth, cart, preferences)
  recommendations.ts  → Rules-based taste-match scoring
  types.ts            → Domain model
  utils.ts            → cn / formatCurrency / slugify
```

### Recommendation engine
Transparent scoring: flavor overlap (≤30) + style match (≤20) + ABV fit (≤15) + local (≤10) + NA (≤10) + adventure fit (≤10) + popularity/rating prior (≤5). Every match shows its top reasons to the user — explainability over black-box.

### State
All client state is persisted via `localStorage`:
- `brewscovery:user` — mock auth + favorites + ratings + subscription
- `brewscovery:prefs` — taste profile
- `brewscovery:cart` — cart items
- `brewscovery:age-confirmed` — age-gate confirmation

The admin CRUD runs against an in-session in-memory copy of the seeded catalog.

---

## 🚀 Getting Started

```bash
npm install
npm run dev
# open http://localhost:3000
```

### Try the full flow
1. Confirm age gate
2. `Start taste quiz` → complete the 6 steps
3. See your personalized lineup on `/discovery-mix`
4. Add a **Signature Discovery Mix** to cart
5. `/auth/sign-up` → create an account
6. `/checkout` → place a test order → subscription is activated
7. Visit `/dashboard` — pause or cancel your subscription
8. Sign in with `admin@brewscovery.com` (any password) → access `/admin`

---

## 🎨 Design System

- **Foundation:** shadcn/ui only (no other UI kits)
- **Palette:** deep charcoal backgrounds, amber-gold accents, warm cream text
- **Typography:** serif display (`Cormorant Garamond`) + clean sans body
- **Motion:** subtle — no gradient overload, no glass-UI clichés
- **Components:** all composed from shadcn primitives in `components/ui/`

---

## 📸 Screenshots

Run the app and capture screenshots of:
- `/` — hero + featured mixes + trending + brewery spotlight
- `/onboarding` — the 6-step taste quiz
- `/discovery-mix` — personalized lineup with match scores & reasons
- `/discover` — filterable catalog
- `/beer/sakura-session-ipa` — beer detail page
- `/dashboard` — customer cellar
- `/admin` — admin overview + analytics

Drop them in `/public/screenshots/` and link from this section.

---

## 📦 Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **UI:** shadcn/ui primitives + Tailwind CSS + Radix UI + lucide-react
- **State:** React Context + `localStorage`
- **Images:** Unsplash (remote)

---

## 🗺️ Roadmap (next slices)

- [ ] Real database (Prisma + Postgres) behind `lib/data`
- [ ] Real auth (NextAuth)
- [ ] Stripe subscriptions (test mode)
- [ ] Supabase storage for brewery imagery
- [ ] Unit + e2e tests (Vitest + Playwright)
- [ ] Real order history

---

## ⚠️ Responsibility

Brewscovery is built on a responsible-consumption ethos. The product concept centers **smaller 8oz tasting pours** and **thoughtful curation over volume**, and the UI includes an age gate and responsibility messaging.

---

## License

MIT © Brewscovery demo
