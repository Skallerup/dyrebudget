import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import { getBreedRecommendedProducts } from "@/data/products";
import { getBreedBySlug } from "@/data/breeds";
import { RecommendedProducts } from "@/components/shared/RecommendedProducts";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Billigste katteracer 2026 — De 5 billigste katte at eje",
  description:
    "Se hvilke katteracer der koster mindst at eje i Danmark. Rangeret efter månedlig pris inkl. foder, forsikring og dyrlæge. Komplet sammenligning 2026.",
  alternates: { canonical: "/guides/billigste-katteracer" },
};

const faqs = [
  {
    question: "Hvilken katterace er billigst at eje?",
    answer:
      "Huskat (blandet race) er den billigste med ca. 470 kr./md. på medium-niveau. Russisk Blå er billigst af racekatterne med ca. 500 kr./md. Begge er robuste racer med lav sundhedsrisiko.",
  },
  {
    question: "Hvad koster en kat om måneden i Danmark?",
    answer:
      "En kat koster typisk 400–900 kr./md. afhænger af race, alder og om du tegner forsikring. Huskat og Russisk Blå ligger i den lave ende. Sphynx og Scottish Fold er de dyreste med 900–940 kr./md.",
  },
  {
    question: "Er det billigere med en hunkat frem for en hankats?",
    answer:
      "Kastration er et engangsbeløb på 1.200–2.500 kr. for hunkatte og 800–1.500 kr. for hankatte. Derefter er løbende udgifter ens. Kastrerede katte lever generelt længere og sundere.",
  },
  {
    question: "Kan man spare penge ved at vælge en huskat?",
    answer:
      "Ja — huskat er markant billigere at anskaffe (gratis til 2.000 kr.) og har lavere forsikringspris og sundhedsrisiko end racekatte. Over 15 år kan besparelsen nå 30.000–80.000 kr. sammenlignet med en høj-risiko racekatte.",
  },
  {
    question: "Er det nødvendigt med forsikring til en billig racekatte?",
    answer:
      "Ikke nødvendigvis. For Huskat og Russisk Blå med lav sundhedsrisiko kan en månedlig opsparing på 200–300 kr. dække de fleste udgifter. For Maine Coon, Ragdoll og Scottish Fold anbefales forsikring.",
  },
];

const breeds = [
  {
    rank: 1,
    name: "Huskat (Blandet race)",
    slug: "huskat",
    monthlyMedium: 470,
    insurance: 170,
    food: 230,
    vet: 70,
    costIndex: 40,
    healthRisk: "Lav",
    desc: "Huskatten er ubestridt billigst. Lav anskaffelsespris (oftest gratis), robust helbred og lave forsikringsudgifter. Perfekt til den budgetbevidste katteejer.",
    tip: "Adoptér fra et internat — gratis og allerede vaccineret",
  },
  {
    rank: 2,
    name: "Russisk Blå",
    slug: "russisk-blaa",
    monthlyMedium: 500,
    insurance: 210,
    food: 210,
    vet: 80,
    costIndex: 20,
    healthRisk: "Meget lav",
    desc: "Russisk Blå er den billigste racekatte med kostindeks kun 20/100. Robust helbred, lav forsikringspris og moderat foderomkostning. Rolig og indekat-venlig.",
    tip: "Laveste kostindeks af alle racer — 20/100",
  },
  {
    rank: 3,
    name: "Birmaner",
    slug: "birmaner",
    monthlyMedium: 530,
    insurance: 225,
    food: 220,
    vet: 85,
    costIndex: 32,
    healthRisk: "Lav",
    desc: "Birmaner er en blid og rolig race med lav sundhedsrisiko. Halvlang pels kræver lidt mere pelspleje end korthårsracer, men ikke professionel grooming.",
    tip: "God familierat med lav sundhedsrisiko",
  },
  {
    rank: 4,
    name: "Burmese",
    slug: "burmese",
    monthlyMedium: 525,
    insurance: 225,
    food: 210,
    vet: 90,
    costIndex: 30,
    healthRisk: "Lav",
    desc: "Burmese er en social og aktiv race med kort pels og lavt grooming-behov. God sundhedsprofil med få arvelige sygdomme.",
    tip: "Meget social — passer ikke til at være alene længe",
  },
  {
    rank: 5,
    name: "Abyssiner",
    slug: "abyssiner",
    monthlyMedium: 560,
    insurance: 240,
    food: 220,
    vet: 100,
    costIndex: 35,
    healthRisk: "Lav",
    desc: "Abyssiner er en aktiv og nysgerrig race med kort pels. Moderat sundhedsrisiko men stadig langt billigere end de dyre high-fashion racer.",
    tip: "Aktiv race — bedst med adgang til udendørs eller stort areal",
  },
];

export default function BilligsteKatteracerPage() {
  const huskat = getBreedBySlug("huskat");
  const recommendedProducts = huskat ? getBreedRecommendedProducts(huskat) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guider", href: "/guides" },
          { label: "Billigste katteracer" },
        ]}
      />

      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-mint-600 mb-2 block">
          Guide · Opdateret 2026
        </span>
        <h1 className="text-3xl font-bold mb-3">Billigste katteracer 2026</h1>
        <p className="text-muted-foreground text-lg">
          Vi har beregnet månedsprisen for alle 10 katteracer på platformen. Her er de 5 billigste —
          rangeret efter reelle månedlige udgifter inkl. foder, forsikring og dyrlæge.
        </p>
      </div>

      {/* Top 5 liste */}
      <section className="mt-8 space-y-4">
        {breeds.map((breed) => (
          <Link
            key={breed.slug}
            href={`/hvad-koster/${breed.slug}`}
            className="group block p-5 bg-card border border-border rounded-2xl hover:border-navy-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                {breed.rank}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                  <h2 className="font-bold text-base group-hover:text-navy-900 transition-colors">
                    {breed.name}
                  </h2>
                  <span className="text-lg font-bold text-mint-600">
                    ca. {breed.monthlyMedium} kr./md.
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{breed.desc}</p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="px-2 py-0.5 bg-muted rounded-full">Foder: {breed.food} kr.</span>
                  <span className="px-2 py-0.5 bg-muted rounded-full">Forsikring: {breed.insurance} kr.</span>
                  <span className="px-2 py-0.5 bg-muted rounded-full">Dyrlæge: {breed.vet} kr.</span>
                  <span className="px-2 py-0.5 bg-mint-100 text-mint-700 rounded-full font-medium">
                    Indeks {breed.costIndex}/100
                  </span>
                </div>
                {breed.tip && (
                  <p className="text-xs text-navy-600 font-medium mt-2">💡 {breed.tip}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Sammenligningstabel */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-5">Alle katteracer — månedspris oversigt</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left px-4 py-3 font-semibold">Race</th>
                <th className="text-center px-4 py-3 font-semibold">Md. pris (middel)</th>
                <th className="text-center px-4 py-3 font-semibold">Sundhedsrisiko</th>
                <th className="text-center px-4 py-3 font-semibold">Indeks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { name: "Huskat", slug: "huskat", monthly: "ca. 470 kr.", risk: "Lav", index: 40 },
                { name: "Russisk Blå", slug: "russisk-blaa", monthly: "ca. 500 kr.", risk: "Meget lav", index: 20 },
                { name: "Burmese", slug: "burmese", monthly: "ca. 525 kr.", risk: "Lav", index: 30 },
                { name: "Birmaner", slug: "birmaner", monthly: "ca. 530 kr.", risk: "Lav", index: 32 },
                { name: "Siameser", slug: "siameser", monthly: "ca. 525 kr.", risk: "Middel", index: 58 },
                { name: "Abyssiner", slug: "abyssiner", monthly: "ca. 560 kr.", risk: "Lav", index: 35 },
                { name: "Ragdoll", slug: "ragdoll", monthly: "ca. 640 kr.", risk: "Middel", index: 40 },
                { name: "Maine Coon", slug: "maine-coon", monthly: "ca. 680 kr.", risk: "Middel", index: 56 },
                { name: "Sphynx", slug: "sphynx", monthly: "ca. 900 kr.", risk: "Høj", index: 62 },
                { name: "Scottish Fold", slug: "scottish-fold", monthly: "ca. 940 kr.", risk: "Høj", index: 62 },
              ].map((row) => (
                <tr key={row.slug} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/hvad-koster/${row.slug}`} className="font-medium hover:text-navy-600 transition-colors">
                      {row.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-center font-semibold">{row.monthly}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{row.risk}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${row.index <= 35 ? "bg-mint-100 text-mint-700" : row.index <= 55 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                      {row.index}/100
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Månedspris er estimat på medium-niveau inkl. foder, forsikring og dyrlæge-gennemsnit.</p>
      </section>

      {/* Advarsel om Scottish Fold */}
      <div className="mt-8 flex gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
        <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0 text-red-500" />
        <div>
          <p className="font-semibold text-sm mb-1 text-red-800">Scottish Fold — etisk kontrovers og høje sundhedsudgifter</p>
          <p className="text-sm text-red-700">
            Scottish Fold er forbudt at avle i Danmark og mange EU-lande. Racen lider af osteokondrodysplasi — en arvelig skeletlidelse. Forsikring koster 520–780 kr./md. og livslange dyrlægeudgifter er høje.
          </p>
        </div>
      </div>

      {/* Anbefalede produkter */}
      {recommendedProducts.length > 0 && (
        <div className="mt-10 p-5 bg-card border border-border rounded-2xl">
          <RecommendedProducts
            products={recommendedProducts}
            title="Anbefalede produkter til kattejere"
          />
        </div>
      )}

      {/* CTA */}
      <div className="mt-10 p-6 bg-navy-900 text-white rounded-2xl text-center">
        <p className="font-bold text-lg mb-2">Beregn præcis pris for din race</p>
        <p className="text-navy-300 text-sm mb-4">
          Tilpas alderniveau og budget — og se livstidspris for din katte.
        </p>
        <Link
          href="/beregner"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-mint-600 hover:bg-mint-500 text-white font-semibold rounded-xl transition-colors"
        >
          Start beregning →
        </Link>
      </div>

      <div className="mt-10">
        <FAQSection faqs={faqs} title="Spørgsmål om katterace-udgifter" />
      </div>
    </div>
  );
}
