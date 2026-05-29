# DyreBudget.dk — Claude Code Kontekst

## Hvad er dette projekt?

**DyreBudget.dk** er en dansk pet economics platform — et production-ready affiliate SaaS/content site der hjælper brugere med at beregne kæledyrsomkostninger.

**Ikke** en kæledyrsblog. **Er** et dataværktøj og beregningsplatform.

## Tech Stack

- **Next.js 15** (App Router) + TypeScript — strict mode
- **Tailwind CSS** + egne shadcn-inspirerede UI-komponenter i `/components/ui/`
- **Supabase** — PostgreSQL database med RLS
- **Vercel** — hosting
- **PostHog** — analytics via `lib/analytics.ts`
- **React Hook Form + Zod** — forms og validering
- **Recharts** — pie chart i breakdown

## Projektstruktur

```
/app                    → Next.js App Router sider
  /beregner            → Multi-step beregner (5 trin)
  /hvad-koster/[slug]  → Individuelle race-sider (SSG, 19 racer)
  /sammenlign/[comp]   → Sammenligningssider ([a]-vs-[b] format)
  /guides/...          → SEO-guider (6 stk.)
  /produkter           → Affiliate-produktkatalog
  /quiz                → 5-trins kæledyrs-quiz
  /om, /metode, /affiliate, /privatliv, /kontakt → Trust-sider
  sitemap.ts, robots.ts → Auto-genereret SEO

/components
  /calculator          → MultiStepCalculator, HeroCalculator, CostResultCard, BreakdownChart
  /layout             → Header, Footer
  /shared             → RaceCard, ProductCard, FAQSection, ComparisonTable,
                        EmailCapture, Breadcrumbs, AffiliateDisclosure, MethodologyBox
  /ui                 → Badge, Button, Card, Input, Select, Progress

/lib
  calculator.ts        → CENTRAL BEREGNINGSMOTOR — ændringer her påvirker alle priser
  supabase.ts          → Supabase klient (client + admin)
  analytics.ts         → trackEvent() wrapper for PostHog
  seo.ts               → generateMetadata(), JSON-LD helpers
  utils.ts             → cn() (className merger)

/data
  breeds.ts            → 19 racer med alle cost-parametre + helper functions
  products.ts          → Affiliate-produkter

/types/index.ts        → Alle TypeScript types (Breed, Product, PetCostResult, etc.)
/supabase/schema.sql   → Database schema + RLS policies
/supabase/seed.sql     → Startdata til Supabase
```

## Centrale datastrukturer

```typescript
// En race
interface Breed {
  id, slug, name, petType, sizeClass, weightKg, lifespan,
  coatType, activityLevel, healthRisk,
  monthlyFoodCost: { budget, medium, premium },  // månedlig foder
  monthlyInsurance: { budget, medium, premium }, // månedlig forsikring
  monthlyVetAvg,    // gennemsnitlig dyrlæge pr. måned
  monthlyGrooming,  // professionel grooming
  oneTimeCosts,     // anskaffelsespris + grundudstyr
  costIndex,        // 0-100 (lav = billig)
  description, traits, popularIn
}

// Beregningsresultat
interface PetCostResult {
  dailyCost, monthlyCost, yearlyCost, firstYearCost, lifetimeCost,
  breakdown: { food, insurance, vet, grooming, treats, toys, fleaTick, equipment, miscellaneous },
  costIndex, costLabel, savingsTips
}
```

## Beregningslogik (lib/calculator.ts)

`calculatePetCost(breed, inputs)` returnerer `PetCostResult`.

Vigtige inputs:
- `budgetLevel`: "budget" | "medium" | "premium" — skalerer foder + forsikring
- `activityLevel`: ×0.9 / ×1.0 / ×1.15 på foderpris
- `hasInsurance`: false → insurance = 0
- `groomingLevel`: "home" (×0.3) | "mixed" (×0.65) | "professional" (×1.0)
- `firstYearCost` = yearlyCost + breed.oneTimeCosts + budget-afhængig opstartsomkostning

## Database

**Supabase projekt:** `dyrebudget-dk` — Region: Central EU (Frankfurt)
**Project ref:** `rgztxwmqsfximovfrtmz`
**Dashboard:** https://supabase.com/dashboard/project/rgztxwmqsfximovfrtmz

Tabeller (alle oprettet og seedet): `pets`, `cost_profiles`, `products`, `affiliate_partners`, `product_categories`, `articles`, `faqs`, `email_leads`, `calculator_sessions`, `comparisons`.

**Setup på ny maskine:**
```bash
# .env.local skal oprettes manuelt (ikke i git)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://rgztxwmqsfximovfrtmz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnenR4d21xc2Z4aW1vdmZydG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NTcxNDQsImV4cCI6MjA5NTUzMzE0NH0.RUu8CHZX1LLKg3h0GHJ1N-p3GMu4C3BoLsw530Sis94
SUPABASE_SERVICE_ROLE_KEY=<hent fra Supabase dashboard>
```

**VIGTIGT:** Data i `/data/breeds.ts` og `/data/products.ts` er statisk og bruges direkte i koden. Supabase `email_leads` og `calculator_sessions` tabeller bruges til live data (email-capture og analytics).

## Miljøvariable

```env
NEXT_PUBLIC_SITE_URL=https://dyrebudget.dk
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_POSTHOG_KEY=...
NEXT_PUBLIC_POSTHOG_HOST=https://eu.posthog.com
```

Lokalt: kopier `.env.example` til `.env.local` og udfyld.

## Kom i gang lokalt

```bash
npm install
cp .env.example .env.local
# Udfyld .env.local med Supabase credentials
npm run dev
```

## Typiske udviklingsopgaver

**Tilføj ny race:**
1. Tilføj til `data/breeds.ts` — følg Breed-interfacet præcist
2. Ingen andre filer skal ændres — siden genereres automatisk via `[slug]`

**Tilføj nyt produkt:**
1. Tilføj til `data/products.ts` — følg Product-interfacet

**Justér beregningslogik:**
1. Kun `lib/calculator.ts` skal ændres

**Ny guide:**
1. Opret `app/guides/[navn]/page.tsx`
2. Tilføj til guides-listen i `app/guides/page.tsx`

## Build & CI

```bash
npm run typecheck  # TypeScript tjek (0 fejl ved MVP)
npm run lint       # ESLint
npm run build      # Production build (52 sider)
```

GitHub Actions CI kører automatisk lint + typecheck + build ved push.

## Deployment

Se `DEPLOYMENT.md` for Vercel + Supabase + domain setup.

## Affiliate-strategi

- Zooplus: hundefoder/kattefoder
- Agria: dyre-/kæledyrsforsikring
- Tryg: hundeforsikring
- Med24: dyrlægemedicin

Track affiliate-klik med: `trackEvent("affiliate_click", { productId, productName, affiliatePartner })`

## Status (maj 2026)

- **LIVE på https://dyrebudget.dk** (Vercel, auto-deploy ved push til `master`)
- Bygger rent: 245 sider · TypeScript 0 fejl · ESLint 0 advarsler
- 53 racer (38 hunde + 15 katte)
- Supabase live på `rgztxwmqsfximovfrtmz` — tabeller inkl. `cost_submissions` (crowdsourcede priser)

### Bygget i denne fase
- **Race-billeder**: lokalt hostet i `/public/breeds/{slug}.jpg` (hentet fra Dog CEO API + TheCatAPI, race-kategoriseret). `BreedImage`-komponent viser emoji-fallback hvis fil mangler. Læg nye billeder direkte i mappen — ingen kodeændring.
- **Favicon**: `app/icon.svg` (pote, navy/mint) + `app/apple-icon.tsx` (PNG via next/og)
- **Race-søgning**: `BreedCombobox` på forside + sammenligning; søgefelt i beregner-grid
- **Datavold (#4)**: `RealCostWidget` på race-sider ("Hvad betaler rigtige ejere?") → `/api/cost-submissions` (service-role, zod-valideret, rå data privat). `MethodologyBox` med klikbare kilder + "sidst opdateret"-dato.
- **Resend** tilkoblet (transaktionsmail via `/api/send-calculation`)

### Næste skridt (prioriteret "owner roadmap")
1. **SEO/indeksering** — siden er live men IKKE indekseret i Google endnu. Opsæt Google Search Console (verifikation via env `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`), indsend sitemap, anmod om indeksering. Derefter programmatisk long-tail SEO. **Højeste prioritet — hele forretningen afhænger af organisk trafik.**
2. **Forsikrings-monetisering** — byg rigtig "find billigste hundeforsikring"-sammenligning (Agria/Tryg/If/Dyrekassen); funnel beregnerens "første år"-chok herind. Højeste CPL.
3. **Email-gated budgetrapport** — gate fuld livstidsberegning bag email (Resend-drip allerede klar)
4. ✅ Datavold (crowdsourcede priser) — DONE

### Vercel env-variable der SKAL være sat (produktion)
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (kræves af cost-submissions + email-leads), `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, evt. `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_POSTHOG_KEY`

### Fortsæt på en anden computer
`.env.local` er IKKE i git. Genskab den (se template ovenfor) — service-role-nøgle hentes fra Supabase dashboard, Resend-nøgle fra Resend dashboard. Kør `npm install && npm run dev`.
