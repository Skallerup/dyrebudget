import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { RelatedLinks } from "@/components/shared/RelatedLinks";
import { breeds } from "@/data/breeds";
import { formatCurrency } from "@/lib/calculator";
import { Quote } from "lucide-react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dyrebudget.dk";

export const metadata: Metadata = {
  title: `DyreBudget-indekset ${new Date().getFullYear()} — Kæledyrsøkonomi i tal`,
  description: `Hvad koster kæledyr i Danmark? DyreBudget-indekset samler omkostninger for ${breeds.length} hunde- og katteracer: dyreste og billigste racer, gennemsnitspriser og livstidsomkostninger. Fri brug med kildehenvisning.`,
  alternates: { canonical: "/statistik" },
};

// Repræsentativ månedlig driftsudgift pr. race (medium-niveau, m. forsikring)
function monthlyEstimate(b: (typeof breeds)[number]): number {
  return b.monthlyFoodCost.medium + b.monthlyInsurance.medium + b.monthlyVetAvg + b.monthlyGrooming;
}

const stats = [
  { label: "Danskere med hund", value: "800.000+", note: "ca. 14% af befolkningen" },
  { label: "Danskere med kat", value: "700.000+", note: "ca. 12% af befolkningen" },
  { label: "Registrerede hunde i Danmark", value: "~670.000", note: "Kilde: Dansk Kennel Klub 2024" },
  { label: "Gennemsnitlig månedspris hund", value: "1.200 kr.", note: "Medium-budget inkl. forsikring" },
  { label: "Gennemsnitlig månedspris kat", value: "600 kr.", note: "Medium-budget inkl. forsikring" },
  { label: "Danskere med kæledyrsforsikring", value: "~40%", note: "Andel af kæledyrsejere" },
];

const dogStats = breeds
  .filter((b) => b.petType === "dog")
  .sort((a, b) => a.costIndex - b.costIndex);

const catStats = breeds
  .filter((b) => b.petType === "cat")
  .sort((a, b) => a.costIndex - b.costIndex);

const cheapestDogs = dogStats.slice(0, 5);
const expensiveDogs = dogStats.slice(-5).reverse();
const cheapestCats = catStats.slice(0, 5);

function getCostLabel(index: number): string {
  if (index <= 30) return "Meget lav";
  if (index <= 50) return "Lav";
  if (index <= 65) return "Middel";
  if (index <= 80) return "Høj";
  return "Meget høj";
}

function getCostColor(index: number): string {
  if (index <= 30) return "text-green-700 bg-green-100";
  if (index <= 50) return "text-mint-700 bg-mint-100";
  if (index <= 65) return "text-blue-700 bg-blue-100";
  if (index <= 80) return "text-amber-700 bg-amber-100";
  return "text-red-700 bg-red-100";
}

export default function StatistikPage() {
  const year = new Date().getFullYear();
  const avgDogIndex = Math.round(dogStats.reduce((s, b) => s + b.costIndex, 0) / dogStats.length);
  const avgCatIndex = Math.round(catStats.reduce((s, b) => s + b.costIndex, 0) / catStats.length);

  // Beregnede, citérbare nøgletal direkte fra databasen
  const dogsByCost = [...dogStats].sort((a, b) => monthlyEstimate(a) - monthlyEstimate(b));
  const catsByCost = [...catStats].sort((a, b) => monthlyEstimate(a) - monthlyEstimate(b));
  const cheapestDog = dogsByCost[0];
  const dearestDog = dogsByCost[dogsByCost.length - 1];
  const dearestCat = catsByCost[catsByCost.length - 1];
  const avgDogMonthly = Math.round(dogStats.reduce((s, b) => s + monthlyEstimate(b), 0) / dogStats.length);
  const avgCatMonthly = Math.round(catStats.reduce((s, b) => s + monthlyEstimate(b), 0) / catStats.length);

  const keyFindings = [
    {
      label: "Danmarks dyreste hunderace at eje",
      value: `${dearestDog.name}`,
      note: `ca. ${formatCurrency(monthlyEstimate(dearestDog))}/md.`,
    },
    {
      label: "Danmarks billigste hunderace at eje",
      value: `${cheapestDog.name}`,
      note: `ca. ${formatCurrency(monthlyEstimate(cheapestDog))}/md.`,
    },
    {
      label: "Gennemsnitlig månedspris — hund",
      value: formatCurrency(avgDogMonthly),
      note: `på tværs af ${dogStats.length} hunderacer`,
    },
    {
      label: "Gennemsnitlig månedspris — kat",
      value: formatCurrency(avgCatMonthly),
      note: `på tværs af ${catStats.length} katteracer`,
    },
    {
      label: "Dyreste katterace",
      value: `${dearestCat.name}`,
      note: `ca. ${formatCurrency(monthlyEstimate(dearestCat))}/md.`,
    },
    {
      label: "Prisforskel dyreste vs. billigste hund",
      value: `${Math.round((monthlyEstimate(dearestDog) / monthlyEstimate(cheapestDog)) * 10) / 10}×`,
      note: `${dearestDog.name} mod ${cheapestDog.name}`,
    },
  ];

  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `DyreBudget-indekset ${year}`,
    description: `Omkostningsdata for ${breeds.length} hunde- og katteracer i Danmark: månedlige driftsudgifter, forsikring, dyrlæge og livstidsomkostninger.`,
    url: `${SITE_URL}/statistik`,
    creator: { "@type": "Organization", name: "DyreBudget.dk", url: SITE_URL },
    license: `${SITE_URL}/statistik`,
    isAccessibleForFree: true,
    keywords: ["kæledyrsøkonomi", "hundeomkostninger", "katteomkostninger", "Danmark"],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }} />
      <Breadcrumbs items={[{ label: "Statistik" }]} />
      <h1 className="text-3xl font-bold mb-2">DyreBudget-indekset {year}</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Hvad koster det at eje kæledyr i Danmark? DyreBudget-indekset samler omkostninger for
        vores database med {breeds.length} racer — så journalister, bloggere og kommende ejere
        kan se de reelle tal. Alle nøgletal må frit citeres med kildehenvisning til DyreBudget.dk.
      </p>

      {/* Beregnede nøgletal — citérbare findings */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-5">Årets nøgletal</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {keyFindings.map((f) => (
            <div key={f.label} className="p-5 bg-navy-50 border border-navy-200 rounded-xl">
              <p className="text-xs text-muted-foreground mb-1">{f.label}</p>
              <p className="text-xl font-bold text-navy-900 leading-tight">{f.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{f.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Citér os — link-magnet */}
      <section className="mb-12">
        <div className="bg-navy-900 text-white rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Quote className="w-5 h-5 text-mint-400" />
            <h2 className="font-semibold">Citér DyreBudget-indekset</h2>
          </div>
          <p className="text-navy-300 text-sm mb-4">
            Skriver du en artikel om kæledyrsøkonomi? Du må frit bruge tallene mod en kildehenvisning
            med et link til DyreBudget.dk. Eksempel:
          </p>
          <blockquote className="bg-navy-800 rounded-xl p-4 text-sm text-navy-100 border-l-2 border-mint-400">
            «Danmarks dyreste hunderace at eje er {dearestDog.name} med ca.{" "}
            {formatCurrency(monthlyEstimate(dearestDog))} om måneden, mens en {cheapestDog.name} kun
            koster ca. {formatCurrency(monthlyEstimate(cheapestDog))}. (Kilde: DyreBudget-indekset {year},
            dyrebudget.dk)»
          </blockquote>
          <p className="text-navy-400 text-xs mt-3">
            Pressehenvendelser og dataudtræk: se <span className="text-mint-400">/kontakt</span>.
          </p>
        </div>
      </section>

      {/* Nøgletal */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-5">Nøgletal</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="p-5 bg-card border border-border rounded-xl">
              <p className="text-2xl font-bold text-navy-900 mb-1">{s.value}</p>
              <p className="text-sm font-medium mb-0.5">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gennemsnit på tværs af racer */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-5">Gennemsnitligt kostindeks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 bg-card border border-border rounded-xl">
            <p className="text-3xl font-bold text-navy-900 mb-1">{avgDogIndex}<span className="text-lg text-muted-foreground">/100</span></p>
            <p className="text-sm font-medium mb-0.5">Gennemsnit — hunderacer</p>
            <p className="text-xs text-muted-foreground">Baseret på {dogStats.length} hunderacer i databasen</p>
          </div>
          <div className="p-5 bg-card border border-border rounded-xl">
            <p className="text-3xl font-bold text-navy-900 mb-1">{avgCatIndex}<span className="text-lg text-muted-foreground">/100</span></p>
            <p className="text-sm font-medium mb-0.5">Gennemsnit — katteracer</p>
            <p className="text-xs text-muted-foreground">Baseret på {catStats.length} katteracer i databasen</p>
          </div>
        </div>
      </section>

      {/* Billigste hunderacer */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-5">De 5 billigste hunderacer</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">#</th>
                <th className="text-left px-4 py-3 font-semibold">Race</th>
                <th className="text-center px-4 py-3 font-semibold">Kostindeks</th>
                <th className="text-center px-4 py-3 font-semibold">Forsikring/md.</th>
                <th className="text-center px-4 py-3 font-semibold">Niveau</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {cheapestDogs.map((breed, i) => (
                <tr key={breed.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                  <td className="px-4 py-3 font-medium">{breed.name}</td>
                  <td className="px-4 py-3 text-center font-bold">{breed.costIndex}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{breed.monthlyInsurance.medium} kr.</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCostColor(breed.costIndex)}`}>
                      {getCostLabel(breed.costIndex)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Dyreste hunderacer */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-5">De 5 dyreste hunderacer</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">#</th>
                <th className="text-left px-4 py-3 font-semibold">Race</th>
                <th className="text-center px-4 py-3 font-semibold">Kostindeks</th>
                <th className="text-center px-4 py-3 font-semibold">Forsikring/md.</th>
                <th className="text-center px-4 py-3 font-semibold">Niveau</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {expensiveDogs.map((breed, i) => (
                <tr key={breed.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                  <td className="px-4 py-3 font-medium">{breed.name}</td>
                  <td className="px-4 py-3 text-center font-bold text-red-700">{breed.costIndex}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{breed.monthlyInsurance.medium} kr.</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCostColor(breed.costIndex)}`}>
                      {getCostLabel(breed.costIndex)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Billigste katteracer */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-5">De 5 billigste katteracer</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">#</th>
                <th className="text-left px-4 py-3 font-semibold">Race</th>
                <th className="text-center px-4 py-3 font-semibold">Kostindeks</th>
                <th className="text-center px-4 py-3 font-semibold">Forsikring/md.</th>
                <th className="text-center px-4 py-3 font-semibold">Niveau</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {cheapestCats.map((breed, i) => (
                <tr key={breed.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                  <td className="px-4 py-3 font-medium">{breed.name}</td>
                  <td className="px-4 py-3 text-center font-bold">{breed.costIndex}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{breed.monthlyInsurance.medium} kr.</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCostColor(breed.costIndex)}`}>
                      {getCostLabel(breed.costIndex)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Fakta-bokse */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-5">Vidste du?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { fact: "En enkelt korsbåndsoperation koster 20.000–30.000 kr.", context: "Svarende til ca. 2–2,5 års forsikring for en Labrador." },
            { fact: "Brachycefale racer betaler op til 4× mere i forsikring", context: "Fransk Bulldog og Mops har markant højere sundhedsrisiko end gennemsnittet." },
            { fact: "Chihuahua lever i gennemsnit 14–18 år", context: "Det er dobbelt så lang levetid som Berner Sennenhund (7–10 år)." },
            { fact: "Grooming kan koste mere end foder", context: "For racer som Puddel og Cavapoo udgør grooming 30–40% af de månedlige udgifter." },
            { fact: "Første år er altid det dyreste", context: "Anskaffelse, grundudstyr og vaccinationer løber typisk op i 15.000–30.000 kr. ekstra." },
            { fact: "40% af kæledyrsejere har forsikring", context: "Men ca. 50% af alle Schæferhunde og 25% af alle Gravhunde oplever dyre sundhedsproblemer." },
          ].map((item) => (
            <div key={item.fact} className="p-4 bg-navy-50 border border-navy-200 rounded-xl">
              <p className="font-semibold text-sm text-navy-900 mb-1">{item.fact}</p>
              <p className="text-xs text-muted-foreground">{item.context}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="text-xs text-muted-foreground border-t border-border pt-6 mb-10">
        Data baseret på DyreBudget.dk&apos;s database med {breeds.length} racer. Markedstal er estimerede
        gennemsnit for Danmark 2025–2026. Individuelle priser varierer efter forsikringsselskab, alder og geografisk placering.
      </p>

      <RelatedLinks
        links={[
          { href: "/dyrlaege-priser", title: "Dyrlægepriser 2026", desc: "Hvad koster behandling hos dyrlægen?" },
          { href: "/lister/familievenlige-hunde", title: "Bedste familiehunde", desc: "De mest børnevenlige racer" },
          { href: "/beregner", title: "Beregn din kæledyrsøkonomi", desc: "Personligt budget på 1 minut" },
          { href: "/sammenlign", title: "Sammenlign racer", desc: "Se omkostninger side om side" },
        ]}
      />
    </div>
  );
}
