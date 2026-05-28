import type { Metadata } from "next";
import Link from "next/link";
import { HeroCalculator } from "@/components/calculator/HeroCalculator";
import { RaceCard } from "@/components/shared/RaceCard";
import { FAQSection } from "@/components/shared/FAQSection";
import { getCheapestBreeds, getMostExpensiveBreeds } from "@/data/breeds";
import {
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Calculator,
  GitCompare,
  BookOpen,
  Shield,
  Database,
  ChevronRight,
  Heart,
  Stethoscope,
  Scissors,
  Package,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "DyreBudget.dk — Hvad koster dit kæledyr egentlig?",
  description:
    "Beregn de reelle månedlige og livslange omkostninger ved hund og kat i Danmark. Sammenlign 51 racer, se pris pr. dag og find de billigste muligheder.",
};

const homeFaqs = [
  {
    question: "Hvad koster en hund månedligt i Danmark?",
    answer:
      "En hund koster typisk 700–2.400 kr. månedligt afhængigt af race, størrelse og dit budgetniveau. En Chihuahua på budgetniveau koster ca. 490 kr./md., mens en Berner Sennenhund med premium forsikring kan koste over 3.000 kr./md.",
  },
  {
    question: "Er det dyrere med hund eller kat?",
    answer:
      "Hunde er generelt 2–3× dyrere end katte at eje. En kat koster typisk 400–900 kr./md., mens hunde starter ved ca. 490 kr. En Huskat på budgetniveau er det billigste kæledyr med under 500 kr./md.",
  },
  {
    question: "Hvad koster det at anskaffe en hund?",
    answer:
      "Første år er altid dyrest: anskaffelsespris (4.000–20.000 kr. for racehund), grundudstyr (2.500–6.000 kr.) plus løbende udgifter. Samlet regn med 15.000–45.000 kr. det første år afhængig af race og budgetniveau.",
  },
  {
    question: "Er hundeforsikring nødvendig?",
    answer:
      "Vi anbefaler forsikring stærkt. En enkelt ortopædisk operation kan koste 20.000–50.000 kr. En hundeforsikring koster 220–860 kr./md. — én operation kan betale 5–10 års præmier. Brachycefale racer (Fransk Bulldog, Mops) har nærmest obligatorisk forsikringsbehov.",
  },
  {
    question: "Hvilken hunderace er billigst at eje?",
    answer:
      "Chihuahua, Dansk-Svensk Gårdhund og Beagle er de billigste hunderacer at eje. En Chihuahua koster ca. 490 kr./md. på budgetniveau og lever 14–18 år — en af de bedste langsigtede investeringer.",
  },
];

const costCategories = [
  { icon: Package, label: "Foder", pct: 34, color: "bg-navy-600", desc: "Tørfoder, vådfoder, godbidder" },
  { icon: Shield, label: "Forsikring", pct: 24, color: "bg-mint-600", desc: "Sundhed, ansvar, liv" },
  { icon: Stethoscope, label: "Dyrlæge", pct: 17, color: "bg-blue-500", desc: "Forebyggelse + akut behandling" },
  { icon: Scissors, label: "Grooming", pct: 12, color: "bg-purple-500", desc: "Pelspleje, bade, klipning" },
  { icon: Heart, label: "Legetøj & godbidder", pct: 8, color: "bg-amber-500", desc: "Mentalt stimuli og belønning" },
  { icon: Zap, label: "Uforudsete udgifter", pct: 5, color: "bg-red-400", desc: "Akutbehandling, ekstraudgifter" },
];

export default function HomePage() {
  const cheapestDogs = getCheapestBreeds("dog", 4);
  const cheapestCats = getCheapestBreeds("cat", 4);
  const mostExpensiveDogs = getMostExpensiveBreeds("dog", 4);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DyreBudget.dk",
    url: "https://dyrebudget.dk",
    description: "Danmarks mest datadrevne platform for kæledyrsøkonomi — beregn og sammenlign omkostninger for 51 racer.",
    inLanguage: "da",
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DyreBudget.dk",
    url: "https://dyrebudget.dk",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: "https://dyrebudget.dk/hvad-koster/{search_term_string}" },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />

      {/* ── HERO ── */}
      <section className="relative bg-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-700 via-navy-900 to-navy-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-22 md:pb-28">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint-900/30 border border-mint-700/40 text-mint-400 text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-mint-400 animate-pulse" />
                51 racer · Danske priser · Gratis
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.15] mb-5 text-balance">
                Hvad koster et
                <br />
                <span className="text-mint-400">kæledyr egentlig?</span>
              </h1>
              <p className="text-navy-300 text-lg leading-relaxed mb-8 max-w-lg text-pretty">
                Beregn realistiske månedlige og livslange udgifter til hund og kat i Danmark.
                Sammenlign racer. Tag en informeret beslutning.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  href="/beregner"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-mint-600 hover:bg-mint-500 text-white font-semibold rounded-xl transition-colors text-sm shadow-lg shadow-mint-900/30"
                >
                  <Calculator className="w-4 h-4" />
                  Start beregning
                </Link>
                <Link
                  href="/sammenlign"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl transition-colors text-sm border border-white/20"
                >
                  <GitCompare className="w-4 h-4" />
                  Sammenlign racer
                </Link>
              </div>

              <div className="flex flex-wrap gap-8 text-sm">
                {[
                  { value: "51", label: "racer i databasen" },
                  { value: "0 kr.", label: "— helt gratis" },
                  { value: "2026", label: "prisdata" },
                ].map((s) => (
                  <div key={s.label}>
                    <span className="text-2xl font-bold text-white block">{s.value}</span>
                    <span className="text-navy-400 text-xs">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <HeroCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-muted/40 border-b border-border py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-mint-600 mb-2">Sådan fungerer det</p>
            <h2 className="text-2xl font-bold text-navy-900">Fuld budgetoversigt på under 2 minutter</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Vælg race",
                desc: "Vælg den race du overvejer fra vores database med 51 hunde- og katteracer.",
                icon: "🐾",
              },
              {
                step: "2",
                title: "Tilpas dit behov",
                desc: "Justér budget-niveau, aktivitetsniveau og forsikringspræferencer.",
                icon: "⚙️",
              },
              {
                step: "3",
                title: "Få realistisk budget",
                desc: "Se månedspris, første-år-pris og livstidspris med fuld udgiftsfordeling.",
                icon: "📊",
              },
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-navy-900 flex items-center justify-center text-2xl mb-4 shadow-md">
                  {item.icon}
                </div>
                <div className="absolute top-6 -right-4 hidden md:block text-muted-foreground/30 last:hidden">
                  <ChevronRight className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-mint-600 uppercase tracking-wider mb-1">Trin {item.step}</span>
                <h3 className="font-semibold text-navy-900 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/beregner"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              <Calculator className="w-4 h-4" />
              Åbn beregneren
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── BILLIGSTE HUNDERACER ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-end justify-between mb-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-mint-600 mb-1">Økonomivenlige valg</p>
            <h2 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-mint-600" />
              Billigste hunderacer
            </h2>
          </div>
          <Link
            href="/guides/billigste-hunderacer"
            className="text-sm text-navy-600 hover:text-navy-900 flex items-center gap-1 font-medium shrink-0"
          >
            Se alle <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cheapestDogs.map((breed) => (
            <RaceCard key={breed.id} breed={breed} />
          ))}
        </div>
      </section>

      {/* ── PRISANATOMI ── */}
      <section className="bg-navy-900 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-mint-400 mb-2">Vidste du?</p>
            <h2 className="text-2xl font-bold">Sådan fordeler kæledyrsudgifterne sig</h2>
            <p className="text-navy-300 text-sm mt-2 max-w-xl mx-auto">
              Baseret på en gennemsnitlig hund på medium-budget. Tallene varierer markant efter race.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {costCategories.map((cat) => (
              <div key={cat.label} className="bg-navy-800/60 rounded-xl p-5 border border-navy-700/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-lg ${cat.color} flex items-center justify-center`}>
                    <cat.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{cat.label}</p>
                    <p className="text-navy-400 text-xs">{cat.desc}</p>
                  </div>
                  <span className="ml-auto text-lg font-bold text-white">{cat.pct}%</span>
                </div>
                <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-navy-400 text-xs mt-6">
            Procenter er gennemsnit på tværs af alle racer og budget-niveauer. Se den fulde beregning for din race.
          </p>
        </div>
      </section>

      {/* ── SAMMENLIGN CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-gradient-to-br from-navy-50 to-mint-50/30 border border-navy-200/50 rounded-2xl p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-mint-600 mb-2">Sammenligningsværktøj</p>
              <h2 className="text-2xl font-bold text-navy-900 mb-3">
                Sammenlign to racer side om side
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                Se forskellen på månedspris, livstidspris, sundhedsrisiko og forsikringsomkostninger
                for 115+ racekombinationer.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/sammenlign/labrador-vs-golden-retriever"
                  className="text-xs px-3 py-1.5 bg-white border border-border rounded-full hover:border-navy-300 transition-colors font-medium"
                >
                  Labrador vs. Golden Retriever
                </Link>
                <Link
                  href="/sammenlign/fransk-bulldog-vs-mops"
                  className="text-xs px-3 py-1.5 bg-white border border-border rounded-full hover:border-navy-300 transition-colors font-medium"
                >
                  Fransk Bulldog vs. Mops
                </Link>
                <Link
                  href="/sammenlign/beagle-vs-chihuahua"
                  className="text-xs px-3 py-1.5 bg-white border border-border rounded-full hover:border-navy-300 transition-colors font-medium"
                >
                  Beagle vs. Chihuahua
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end">
              <Link
                href="/sammenlign"
                className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-xl transition-colors text-sm"
              >
                <GitCompare className="w-4 h-4" />
                Åbn sammenligningsværktøj
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-muted-foreground mt-3">115+ racekombinationer</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DYRESTE HUNDERACER ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="flex items-end justify-between mb-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-1">Vær forberedt</p>
            <h2 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-500" />
              Dyreste hunderacer
            </h2>
          </div>
          <Link
            href="/guides/dyreste-hunderacer"
            className="text-sm text-navy-600 hover:text-navy-900 flex items-center gap-1 font-medium shrink-0"
          >
            Se alle <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mostExpensiveDogs.map((breed) => (
            <RaceCard key={breed.id} breed={breed} />
          ))}
        </div>
      </section>

      {/* ── BILLIGSTE KATTERACER ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="flex items-end justify-between mb-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-mint-600 mb-1">Billigste valg</p>
            <h2 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-mint-600" />
              Billigste katteracer
            </h2>
          </div>
          <Link
            href="/guides/billigste-katteracer"
            className="text-sm text-navy-600 hover:text-navy-900 flex items-center gap-1 font-medium shrink-0"
          >
            Se alle <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cheapestCats.map((breed) => (
            <RaceCard key={breed.id} breed={breed} />
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-border bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "1.200 kr.", label: "gennemsnitlig månedspris", sub: "Chihuahua — billigste race" },
              { value: "2.360 kr.", label: "gennemsnitlig månedspris", sub: "Berner Sennenhund — dyrest" },
              { value: "51", label: "racer i databasen", sub: "hunde og katte" },
              { value: "115+", label: "sammenligningspar", sub: "alle kombinationer" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <p className="text-3xl font-bold text-navy-900 mb-0.5">{stat.value}</p>
                <p className="text-xs font-medium text-foreground">{stat.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED GUIDES ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-end justify-between mb-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-navy-500 mb-1">Datadrevne guides</p>
            <h2 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-navy-600" />
              Populære guides
            </h2>
          </div>
          <Link
            href="/guides"
            className="text-sm text-navy-600 hover:text-navy-900 flex items-center gap-1 font-medium shrink-0"
          >
            Alle guider <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              href: "/guides/hvad-koster-en-hund",
              category: "Hund",
              title: "Hvad koster en hund i Danmark?",
              desc: "Den komplette guide: foder, forsikring, dyrlæge, udstyr og skjulte udgifter.",
              readTime: "8 min",
              highlight: "Mest læste guide",
            },
            {
              href: "/guides/bedste-hundeforsikring",
              category: "Forsikring",
              title: "Bedste hundeforsikring 2026",
              desc: "Vi sammenligner Agria og Tryg — og forklarer hvornår forsikring egentlig kan betale sig.",
              readTime: "6 min",
              highlight: null,
            },
            {
              href: "/guides/hvalpe-budget",
              category: "Budget",
              title: "Budget til din første hvalp",
              desc: "Alt hvad du skal budgettere det første år — anskaffelse, udstyr, dyrlæge og foder.",
              readTime: "6 min",
              highlight: "Ny guide",
            },
          ].map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group flex flex-col p-5 bg-card border border-border rounded-xl hover:border-navy-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium px-2 py-0.5 bg-navy-100 text-navy-700 rounded-full">
                  {guide.category}
                </span>
                {guide.highlight && (
                  <span className="text-xs font-medium px-2 py-0.5 bg-mint-100 text-mint-700 rounded-full">
                    {guide.highlight}
                  </span>
                )}
                <span className="ml-auto text-xs text-muted-foreground">{guide.readTime}</span>
              </div>
              <h3 className="font-semibold text-navy-900 mb-2 group-hover:text-navy-700 transition-colors leading-snug">
                {guide.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{guide.desc}</p>
              <div className="flex items-center gap-1 mt-4 text-sm font-medium text-navy-600 group-hover:text-mint-600 transition-colors">
                Læs guide <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── TRUST / E-E-A-T ── */}
      <section className="bg-muted/40 border-y border-border py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-navy-500 mb-2">Metode & data</p>
            <h2 className="text-xl font-bold text-navy-900">Troværdige tal — ikke gæt</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Database,
                title: "Danske prisdata",
                desc: "Forsikringspræmier fra Agria og Tryg. Foderpriser fra danske forhandlere. Dyrlægedata fra Dansk Dyrlægeforening.",
              },
              {
                icon: Shield,
                title: "Gennemsigtig beregning",
                desc: "Alle parametre er dokumenterede. Ingen skjulte antagelser. Vores model er fuldt forklaret på metode-siden.",
              },
              {
                icon: BookOpen,
                title: "Opdateret 2026",
                desc: "Prisdata og forsikringspræmier verificeres løbende. Beregningerne afspejler aktuelle markedspriser.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-9 h-9 rounded-xl bg-navy-900 flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-mint-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-7">
            <Link
              href="/metode"
              className="text-sm text-navy-600 hover:text-navy-900 inline-flex items-center gap-1 font-medium"
            >
              Læs vores fulde metodebeskrivelse <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-navy-500 mb-2 text-center">Hyppige spørgsmål</p>
        <FAQSection faqs={homeFaqs} title="Alt du vil vide om kæledyrsøkonomi" />
      </div>

      {/* ── FINAL CTA ── */}
      <section className="bg-navy-900 text-white py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-navy-400 text-xs font-semibold uppercase tracking-widest mb-3">Klar til at komme i gang?</p>
          <h2 className="text-3xl font-bold mb-4">
            Beregn dit kæledyrsbudget nu
          </h2>
          <p className="text-navy-300 text-sm mb-8 max-w-md mx-auto">
            Vores gratis beregner giver dig et komplet overblik på under 2 minutter — månedspris, livstidspris og sparetips.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/beregner"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-mint-600 hover:bg-mint-500 text-white font-semibold rounded-xl text-sm transition-colors shadow-lg shadow-mint-900/30"
            >
              <Calculator className="w-4 h-4" />
              Start gratis beregning
            </Link>
            <Link
              href="/hvad-koster"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl text-sm transition-colors border border-white/20"
            >
              Udforsk alle racer
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
