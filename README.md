# DyreBudget.dk

**Danmarks datadrevne platform for kæledyrsøkonomi**

> "Hvad koster dit kæledyr egentlig?"

DyreBudget.dk er et production-ready Next.js 15 platform der hjælper brugere med at beregne realistiske månedlige og livslange udgifter til hund og kat i Danmark.

## Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui komponenter
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Vercel
- **Analytics:** PostHog
- **Forms:** React Hook Form + Zod

## Hurtig start

```bash
# 1. Klon repo
git clone https://github.com/your-username/dyrebudget.git
cd dyrebudget

# 2. Installer dependencies
npm install

# 3. Sæt env vars
cp .env.example .env.local
# Udfyld dine værdier i .env.local

# 4. Start dev server
npm run dev
```

Åbn [http://localhost:3000](http://localhost:3000)

## Environment Variables

Opret `.env.local` med følgende:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key
NEXT_PUBLIC_POSTHOG_HOST=https://eu.posthog.com
```

## Supabase Setup

1. Opret et nyt Supabase projekt på [supabase.com](https://supabase.com)
2. Gå til SQL Editor i Supabase dashboard
3. Kør `supabase/schema.sql` for at oprette tabeller
4. Kør `supabase/seed.sql` for at indsætte startdata
5. Kopier Project URL og anon key til `.env.local`

## Projekt Struktur

```
/app                    # Next.js App Router sider
  /beregner            # Multi-step beregner
  /hvad-koster/[slug]  # Race-sider (programmatisk SEO)
  /sammenlign/[comp]   # Sammenligningssider
  /guides              # SEO-guider
  /produkter           # Affiliate-produkter
  /quiz                # Kæledyrs-quiz
/components
  /calculator          # Beregner-komponenter
  /layout             # Header, Footer
  /shared             # Delte komponenter
  /ui                 # UI primitives (shadcn-inspireret)
/data                  # Static breed og product data
/lib                   # Utilities, calculator engine, SEO
/types                 # TypeScript types
/supabase             # Database schema og seed
```

## Sider

| Path | Beskrivelse |
|------|-------------|
| `/` | Forside med hero calculator |
| `/beregner` | Multi-step avanceret beregner |
| `/hvad-koster` | Alle racer med priser |
| `/hvad-koster/[slug]` | Individuel race-side |
| `/sammenlign` | Sammenlign to racer |
| `/sammenlign/[a]-vs-[b]` | Side-om-side sammenligning |
| `/produkter` | Affiliate-produkter |
| `/quiz` | Kæledyrs-quiz |
| `/guides` | SEO guider |

## Build & Deploy

```bash
npm run build      # Production build
npm run typecheck  # TypeScript tjek
npm run lint       # ESLint
```

Se [DEPLOYMENT.md](./DEPLOYMENT.md) for Vercel deployment guide.

## Beregningslogik

Calculation engine er i `lib/calculator.ts`. Den beregner:

- Månedlig pris (alle udgifter)
- Pris pr. dag
- Første-år budget (inkl. anskaffelse)
- Livstidspris

Inputs: race, alder, budgetniveau, aktivitetsniveau, forsikring, boligtype, grooming.

## Affiliate-strategi

Platformen er optimeret til:
- Zooplus (foder)
- Agria (forsikring)
- Tryg (forsikring)
- Med24 (medicin)

Alle affiliate-links trackes via `trackEvent("affiliate_click", ...)`.

## SEO

- Next.js Metadata API
- JSON-LD (Article, FAQ, BreadcrumbList)
- Dynamic sitemap (`/sitemap.xml`)
- robots.txt
- Canonical URLs
- OpenGraph + Twitter Cards
- Programmatisk SEO for alle racer

## Scaling

Arkitekturen er klar til:
- AI-anbefalinger
- Real-time prisimport
- Brugerkonti + gemte beregninger
- Email marketing (via email_leads tabel)
- Mobil app (API-first struktur)
