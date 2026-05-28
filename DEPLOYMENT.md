# DEPLOYMENT GUIDE — DyreBudget.dk

## 1. GitHub Setup

```bash
# Initialiser git
git init
git add .
git commit -m "Initial commit: DyreBudget.dk MVP"

# Opret GitHub repo (via GitHub.com eller gh CLI)
gh repo create dyrebudget --public
git remote add origin https://github.com/your-username/dyrebudget.git
git push -u origin main
```

## 2. Supabase Setup

1. Gå til [supabase.com](https://supabase.com) og opret et projekt
2. Vælg region: **eu-central-1 (Frankfurt)** — tæt på Danmark
3. Under **SQL Editor**, kør:
   ```sql
   -- Indsæt indhold fra supabase/schema.sql
   ```
4. Derefter kør:
   ```sql
   -- Indsæt indhold fra supabase/seed.sql
   ```
5. Gå til **Project Settings → API** og noter:
   - Project URL
   - Anon/public key
   - Service role key (gem sikkert!)

## 3. Vercel Setup

1. Gå til [vercel.com](https://vercel.com) og login
2. Klik **"Add New Project"**
3. Import dit GitHub repo
4. Sæt environment variables:

| Variable | Værdi |
|----------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://dyrebudget.dk` |
| `NEXT_PUBLIC_SUPABASE_URL` | Fra Supabase Project Settings |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Fra Supabase Project Settings |
| `SUPABASE_SERVICE_ROLE_KEY` | Fra Supabase Project Settings |
| `NEXT_PUBLIC_POSTHOG_KEY` | Fra PostHog projekt |
| `NEXT_PUBLIC_POSTHOG_HOST` | `https://eu.posthog.com` |

5. Klik **Deploy**

## 4. Domain Setup (Vercel)

1. Gå til Project → **Domains**
2. Tilføj `dyrebudget.dk` og `www.dyrebudget.dk`
3. Opdater DNS hos din domæne-udbyder:
   - A record: `76.76.21.21` (Vercel IP)
   - CNAME record: `www` → `cname.vercel-dns.com`

## 5. PostHog Setup (valgfrit)

1. Opret konto på [posthog.com](https://posthog.com)
2. Vælg EU region
3. Kopiér API key til Vercel env vars
4. Analytics vil automatisk tracke events defineret i `lib/analytics.ts`

## 6. GitHub Actions

CI køres automatisk ved push til main og pull requests.
Workflows er i `.github/workflows/ci.yml`.

For at sætte Supabase credentials i GitHub:
```
GitHub Repo → Settings → Secrets and variables → Actions
Add: NEXT_PUBLIC_SUPABASE_URL
Add: NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## 7. Preview Deployments

Vercel opretter automatisk preview deployments for alle pull requests.
Preview URL format: `https://dyrebudget-git-branch-name.vercel.app`

## 8. Continuous Deployment

Alle pushes til `main` deployes automatisk til produktion.

## Tjekliste før launch

- [ ] Supabase schema kørt
- [ ] Seed data indsat
- [ ] Alle env vars sat i Vercel
- [ ] Domain DNS konfigureret
- [ ] sitemap.xml tilgængeligt på `/sitemap.xml`
- [ ] robots.txt tilgængeligt på `/robots.txt`
- [ ] Google Search Console verificeret
- [ ] PostHog tracking verificeret
- [ ] Affiliate-links testet
- [ ] Mobile test gennemført
