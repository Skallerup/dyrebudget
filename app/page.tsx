import type { Metadata } from "next";
import Link from "next/link";
import { HeroCalculator } from "@/components/calculator/HeroCalculator";
import { RaceCard } from "@/components/shared/RaceCard";
import { FAQSection } from "@/components/shared/FAQSection";
import { AffiliateDisclosure } from "@/components/shared/AffiliateDisclosure";
import { MethodologyBox } from "@/components/shared/MethodologyBox";
import { getCheapestBreeds, getMostExpensiveBreeds } from "@/data/breeds";
import { breeds } from "@/data/breeds";
import { formatCurrency } from "@/lib/calculator";
import { ArrowRight, TrendingDown, TrendingUp, Calculator, GitCompare, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "DyreBudget.dk — Hvad koster dit kæledyr egentlig?",
  description:
    "Beregn de reelle månedlige og livslange omkostninger ved hund og kat i Danmark. Sammenlign 19 racer, se pris pr. dag og find de billigste muligheder.",
};

const homeFaqs = [
  {
    question: "Hvad koster en hund månedligt i Danmark?",
    answer:
      "En hund koster typisk mellem 1.800 og 5.500 kr. månedligt afhængigt af race, størrelse og dit budgetniveau. En Chihuahua på budgetniveau koster ca. 1.200 kr./md., mens en Fransk Bulldog med premium forsikring kan koste 5.000+ kr./md.",
  },
  {
    question: "Er det dyrere med hund eller kat?",
    answer:
      "Hunde er generelt 2-3x dyrere end katte at eje. En kat koster typisk 800–2.200 kr./md., mens hunde starter ved ca. 1.200 kr. En Huskat på budgetniveau er det billigste kæledyr med under 700 kr./md.",
  },
  {
    question: "Hvad koster det at anskaffe en hund?",
    answer:
      "Første år er altid dyrest: anskaffelsespris (4.000–35.000 kr. for racehund), grundudstyr (2.500–8.000 kr.) plus løbende udgifter. Samlet regn med 15.000–50.000 kr. det første år afhængig af race og budgetniveau.",
  },
  {
    question: "Er hundeforsikring nødvendig?",
    answer:
      "Vi anbefaler forsikring stærkt. En enkelt ortopædisk operation kan koste 25.000–50.000 kr. En hundeforsikring koster 200–800 kr./md. — én operation kan betale 5-10 års præmier.",
  },
  {
    question: "Hvilken hunderace er billigst?",
    answer:
      "Chihuahua, Dansk-Svensk Gårdhund og Beagle er de billigste hunderacer at eje. En Chihuahua koster under 1.500 kr./md. på budgetniveau og har en lang levetid på 14-18 år.",
  },
];

export default function HomePage() {
  const cheapestDogs = getCheapestBreeds("dog", 4);
  const cheapestCats = getCheapestBreeds("cat", 4);
  const mostExpensiveDogs = getMostExpensiveBreeds("dog", 4);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-700 via-navy-900 to-navy-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint-900/30 border border-mint-700/50 text-mint-400 text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-mint-400 animate-pulse" />
                Datadrevet kæledyrsøkonomi
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5 text-balance">
                Hvad koster dit
                <br />
                <span className="text-mint-400">kæledyr egentlig?</span>
              </h1>
              <p className="text-navy-300 text-lg leading-relaxed mb-8 text-pretty">
                Beregn realistiske månedlige og livslange udgifter til hund og kat i Danmark.
                Sammenlign racer. Find de bedste produkter. Tag en informeret beslutning.
              </p>
              <div className="flex flex-wrap gap-6 text-sm text-navy-300">
                <div>
                  <span className="text-2xl font-bold text-white block">19</span>
                  racer
                </div>
                <div>
                  <span className="text-2xl font-bold text-white block">100%</span>
                  gratis
                </div>
                <div>
                  <span className="text-2xl font-bold text-white block">DK</span>
                  prisdata
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <HeroCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Calculator,
              title: "Avanceret beregner",
              desc: "Multi-step beregner med fuld breakdown: foder, forsikring, dyrlæge og meget mere.",
              href: "/beregner",
              color: "text-navy-600 bg-navy-100",
            },
            {
              icon: GitCompare,
              title: "Sammenlign racer",
              desc: "Side-om-side sammenligning af to racer med alle økonomiparametre.",
              href: "/sammenlign",
              color: "text-mint-700 bg-mint-100",
            },
            {
              icon: BookOpen,
              title: "Kæledyrs-quiz",
              desc: "Find den race der passer til dit budget og livsstil på 2 minutter.",
              href: "/quiz",
              color: "text-amber-700 bg-amber-100",
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col gap-4 p-6 bg-card border border-border rounded-xl hover:border-navy-300 hover:shadow-md transition-all"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold mb-1 group-hover:text-navy-900 transition-colors">
                  {card.title}
                </h2>
                <p className="text-sm text-muted-foreground">{card.desc}</p>
              </div>
              <span className="text-sm font-medium text-navy-600 flex items-center gap-1 mt-auto group-hover:gap-2 transition-all">
                Åbn <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Cheapest dogs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-mint-600" />
            <h2 className="text-xl font-bold">Billigste hunderacer</h2>
          </div>
          <Link
            href="/guides/billigste-hunderacer"
            className="text-sm text-navy-600 hover:text-navy-900 flex items-center gap-1 font-medium"
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

      {/* Most expensive dogs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-bold">Dyreste hunderacer</h2>
          </div>
          <Link
            href="/guides/dyreste-hunderacer"
            className="text-sm text-navy-600 hover:text-navy-900 flex items-center gap-1 font-medium"
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

      {/* Cheapest cats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-mint-600" />
            <h2 className="text-xl font-bold">Billigste katteracer</h2>
          </div>
          <Link
            href="/guides/hvad-koster-en-kat"
            className="text-sm text-navy-600 hover:text-navy-900 flex items-center gap-1 font-medium"
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

      {/* Stats bar */}
      <section className="bg-muted/50 border-y border-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Gennemsnitlig hundeejer betaler", value: "2.800 kr.", sub: "om måneden" },
              { label: "Første år som hundeejer koster", value: "45.000 kr.", sub: "i gennemsnit" },
              { label: "Livslang pris for en hund", value: "350.000 kr.", sub: "gennemsnit alle racer" },
              { label: "Forsikring sparer i snit", value: "18.000 kr.", sub: "ved én operation" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-navy-900 mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.sub}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All breeds grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-bold mb-8">Alle racer med beregning</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {breeds.map((breed) => (
            <RaceCard key={breed.id} breed={breed} />
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <MethodologyBox />
      </section>

      {/* FAQ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FAQSection faqs={homeFaqs} />
      </div>

      {/* CTA */}
      <section className="bg-navy-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Klar til at beregne dit kæledyrsbudget?
          </h2>
          <p className="text-navy-300 mb-8">
            Vores gratis beregner giver dig et komplet overblik på under 2 minutter.
          </p>
          <Link
            href="/beregner"
            className="inline-flex items-center gap-2 px-8 py-4 bg-mint-600 hover:bg-mint-500 text-white font-semibold rounded-xl text-lg transition-colors"
          >
            <Calculator className="w-5 h-5" />
            Start gratis beregning
          </Link>
        </div>
      </section>

      {/* Affiliate disclosure */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AffiliateDisclosure />
      </div>
    </>
  );
}
