import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import { getBreedRecommendedProducts } from "@/data/products";
import { getBreedBySlug } from "@/data/breeds";
import { RecommendedProducts } from "@/components/shared/RecommendedProducts";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hvad koster en Rottweiler? Pris 2026",
  description:
    "Rottweiler koster ca. 1.940 kr./md. på medium-niveau. Stor hund = stor mad + dyr forsikring. Se månedspris og sundhedsudgifter. Komplet guide til Rottweiler-ejere.",
  alternates: { canonical: "/guides/hvad-koster-en-rottweiler" },
};

const faqs = [
  {
    question: "Hvad koster en Rottweiler om måneden?",
    answer:
      "En Rottweiler koster typisk 1.600–2.300 kr. om måneden på medium-niveau. Det inkluderer foder (840 kr.), forsikring (860 kr.), dyrlæge (200 kr.) og grooming (40 kr.). Foder og forsikring er de to største poster.",
  },
  {
    question: "Hvad koster en Rottweiler hvalp?",
    answer:
      "En Rottweiler hvalp fra seriøst opdræt koster typisk 9.000–15.000 kr. i Danmark. Vælg opdræt med hoftegodkendte og adfærdstestede forældre.",
  },
  {
    question: "Hvorfor er forsikringen så dyr til Rottweiler?",
    answer:
      "Rottweiler er en stor race med øget risiko for hofteproblemer, osteosarkom (knoglekræft) og hjerteproblemer. Kombineret med størrelsen — dyrere operationer — prissætter forsikringsselskaberne præmien højt.",
  },
  {
    question: "Er Rottweiler en god familiehund?",
    answer:
      "Med korrekt socialisering og konsekvent opdragelse er Rottweiler en fremragende familiehund — loyal, beskyttende og god med egne børn. Den kræver dog en erfaren ejer der kan sætte klare rammer.",
  },
  {
    question: "Hvad spiser en Rottweiler?",
    answer:
      "En voksen Rottweiler (40–60 kg) spiser typisk 400–600 gram tørfoder dagligt, svarende til 12.000–18.000 kr./år for premium foder. Det er markant mere end for mellemstore racer.",
  },
];

export default function RottweilerGuidePage() {
  const breed = getBreedBySlug("rottweiler");
  const recommendedProducts = breed ? getBreedRecommendedProducts(breed, false) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guider", href: "/guides" },
          { label: "Hvad koster en Rottweiler" },
        ]}
      />

      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-mint-600 mb-2 block">
          Guide · Opdateret 2026
        </span>
        <h1 className="text-3xl font-bold mb-3">Hvad koster en Rottweiler?</h1>
        <p className="text-muted-foreground text-lg">
          Rottweileren er loyal og beskyttende — men stor hund betyder store udgifter. Foder og
          forsikring er begge markant dyrere end for de fleste andre racer.
        </p>
      </div>

      <div className="mt-6 flex gap-3 p-5 bg-red-50 rounded-2xl border border-red-200">
        <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0 text-red-500" />
        <div>
          <p className="font-bold text-sm mb-1 text-red-800">Høje løbende udgifter — kostindeks 75/100</p>
          <p className="text-sm text-red-700">
            Foder koster 840 kr./md. og forsikring 860 kr./md. på medium-niveau. Budgetlæg realistisk
            fra start — Rottweiler er ikke en billig race at eje.
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-5">Månedlige udgifter — Rottweiler</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left px-4 py-3 font-semibold">Post</th>
                <th className="text-center px-4 py-3 font-semibold text-mint-600">Budget</th>
                <th className="text-center px-4 py-3 font-semibold">Middel</th>
                <th className="text-center px-4 py-3 font-semibold text-amber-600">Premium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { label: "Foder", budget: "580 kr.", medium: "840 kr.", premium: "1.200 kr." },
                { label: "Forsikring", budget: "580 kr.", medium: "860 kr.", premium: "1.260 kr." },
                { label: "Dyrlæge (gns.)", budget: "200 kr.", medium: "200 kr.", premium: "200 kr." },
                { label: "Grooming", budget: "40 kr.", medium: "40 kr.", premium: "40 kr." },
                { label: "Godbidder & legetøj", budget: "100 kr.", medium: "180 kr.", premium: "300 kr." },
              ].map((row) => (
                <tr key={row.label} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{row.label}</td>
                  <td className="px-4 py-3 text-center text-mint-700 font-semibold">{row.budget}</td>
                  <td className="px-4 py-3 text-center font-semibold">{row.medium}</td>
                  <td className="px-4 py-3 text-center text-amber-700 font-semibold">{row.premium}</td>
                </tr>
              ))}
              <tr className="bg-muted/50 font-bold border-t-2 border-border">
                <td className="px-4 py-3">Total pr. måned</td>
                <td className="px-4 py-3 text-center text-mint-700">ca. 1.500 kr.</td>
                <td className="px-4 py-3 text-center">ca. 2.120 kr.</td>
                <td className="px-4 py-3 text-center text-amber-700">ca. 3.000 kr.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Dyrlæge-gennemsnittet inkluderer forebyggende behandling og estimeret andel af akut behandling.</p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Typiske sundhedsudgifter</h2>
        <div className="space-y-3">
          {[
            {
              title: "Hoftedysplasi (HD)",
              cost: "20.000–50.000 kr.",
              likelihood: "Moderat",
              desc: "Hofteproblemer er hyppige i store racer. Vælg HD-godkendt opdræt. Operation er dyr men afgørende for livskvalitet.",
              bad: true,
            },
            {
              title: "Osteosarkom (knoglekræft)",
              cost: "30.000–80.000 kr.",
              likelihood: "Lav-moderat",
              desc: "Store racer som Rottweiler har øget risiko for osteosarkom. Det er en alvorlig diagnose med dyre behandlingsmuligheder.",
              bad: true,
            },
            {
              title: "Hjerteproblemer",
              cost: "5.000–20.000 kr.",
              likelihood: "Lav",
              desc: "Aortastenose (hjertelidelse) forekommer i racen. Regelmæssige hjertetjek fra 4–5 år anbefales.",
              bad: false,
            },
          ].map((item) => (
            <div key={item.title} className={`p-4 rounded-xl border ${item.bad ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"}`}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  {item.bad ? (
                    <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  )}
                  <p className="font-semibold text-sm">{item.title}</p>
                </div>
                <div className="flex gap-3 text-xs">
                  <span className="px-2 py-0.5 bg-white rounded-full border font-medium">{item.cost}</span>
                  <span className="px-2 py-0.5 bg-white rounded-full border">Sandsynlighed: {item.likelihood}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2 ml-6">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Er Rottweiler det rigtige valg?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-mint-50 border border-mint-200">
            <p className="font-semibold text-sm text-mint-800 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Passer til dig hvis du...
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Er erfaren hundeejer</li>
              <li>Har have og har råd til 1.500–2.500 kr./md.</li>
              <li>Ønsker en loyal og beskyttende familiehund</li>
              <li>Kan give konsekvent opdragelse og grænser</li>
              <li>Tegner forsikring fra dag 1</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="font-semibold text-sm text-red-800 mb-3 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> Overvej en anden race hvis...
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Du er førstegangsejer</li>
              <li>Dit budget er under 1.500 kr./md.</li>
              <li>Du bor i lejlighed</li>
              <li>Du har meget lille børn (kræver erfaring)</li>
              <li>Du ønsker en lille eller mellemstor hund</li>
            </ul>
          </div>
        </div>
      </section>

      {recommendedProducts.length > 0 && (
        <div className="mt-10 p-5 bg-card border border-border rounded-2xl">
          <RecommendedProducts
            products={recommendedProducts}
            title="Anbefalede produkter til Rottweiler-ejere"
          />
        </div>
      )}

      <div className="mt-10 p-6 bg-navy-900 text-white rounded-2xl text-center">
        <p className="font-bold text-lg mb-2">Se det fulde budget for din Rottweiler</p>
        <p className="text-navy-300 text-sm mb-4">
          Brug beregneren og se månedspris, første-år-pris og livstidspris — tilpasset dit budget og aktivitetsniveau.
        </p>
        <Link
          href="/hvad-koster/rottweiler"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-mint-600 hover:bg-mint-500 text-white font-semibold rounded-xl transition-colors"
        >
          Se fuld beregning →
        </Link>
      </div>

      <div className="mt-10">
        <FAQSection faqs={faqs} title="Spørgsmål om Rottweiler" />
      </div>
    </div>
  );
}
