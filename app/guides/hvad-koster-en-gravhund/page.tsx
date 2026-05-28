import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import { getBreedRecommendedProducts } from "@/data/products";
import { getBreedBySlug } from "@/data/breeds";
import { RecommendedProducts } from "@/components/shared/RecommendedProducts";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hvad koster en Gravhund? Pris 2026",
  description:
    "Gravhund koster ca. 880 kr./md. på medium-niveau. Se månedspris, forsikring og risiko for IVDD (diskusprolaps). Komplet guide til Gravhund-ejere.",
  alternates: { canonical: "/guides/hvad-koster-en-gravhund" },
};

const faqs = [
  {
    question: "Hvad koster en Gravhund om måneden?",
    answer:
      "En Gravhund koster typisk 750–1.100 kr. om måneden på medium-niveau. Det inkluderer foder (290 kr.), forsikring (390 kr.), dyrlæge (160 kr.) og grooming (40 kr.).",
  },
  {
    question: "Hvad koster en Gravhund hvalp?",
    answer:
      "En Gravhund hvalp fra seriøst opdræt koster typisk 5.500–9.000 kr. i Danmark. Prisen varierer efter type (langhåret, korthåret, strihåret) og stamtavle.",
  },
  {
    question: "Hvad er IVDD, og er det et problem for Gravhund?",
    answer:
      "IVDD (Intervertebral Disc Disease) er diskusprolaps i rygsøjlen. Gravhunden er prædisponeret pga. den lange ryg og korte ben. En operation kan koste 15.000–40.000 kr. Forsikring er stærkt anbefalet.",
  },
  {
    question: "Kan man forebygge IVDD hos Gravhund?",
    answer:
      "Delvist. Undgå at hunden hopper fra sofaer og stiger (brug trapper). Hold hunden slank. Stærk rygmuskulatur via jævn motion hjælper. Men genetik spiller også en stor rolle.",
  },
  {
    question: "Lever Gravhund længe?",
    answer:
      "Ja, Gravhunden lever typisk 12–16 år — en af de længstlevende hunderacer. Det gør den meget prisvenlig beregnet over hele livet trods lidt højere forsikringspris.",
  },
];

export default function GravhundGuidePage() {
  const breed = getBreedBySlug("gravhund");
  const recommendedProducts = breed ? getBreedRecommendedProducts(breed, false) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guider", href: "/guides" },
          { label: "Hvad koster en Gravhund" },
        ]}
      />

      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-mint-600 mb-2 block">
          Guide · Opdateret 2026
        </span>
        <h1 className="text-3xl font-bold mb-3">Hvad koster en Gravhund?</h1>
        <p className="text-muted-foreground text-lg">
          Gravhunden er en dansk favorit — modig, sjov og relativt billig at eje. Men den lange ryg
          giver øget risiko for IVDD (diskusprolaps), og forsikring er nærmest obligatorisk.
        </p>
      </div>

      <div className="mt-6 flex gap-3 p-5 bg-amber-50 rounded-2xl border border-amber-200">
        <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0 text-amber-500" />
        <div>
          <p className="font-bold text-sm mb-1 text-amber-800">Vigtig advarsel: IVDD-risiko — kostindeks 42/100</p>
          <p className="text-sm text-amber-700">
            Op til 25% af alle Gravhunde rammes af diskusprolaps (IVDD). En operation koster 15.000–40.000 kr.
            Tegn forsikring fra dag 1 og undgå unødige belastninger af ryggen.
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-5">Månedlige udgifter — Gravhund</h2>
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
                { label: "Foder", budget: "200 kr.", medium: "290 kr.", premium: "430 kr." },
                { label: "Forsikring", budget: "260 kr.", medium: "390 kr.", premium: "580 kr." },
                { label: "Dyrlæge (gns.)", budget: "160 kr.", medium: "160 kr.", premium: "160 kr." },
                { label: "Grooming", budget: "40 kr.", medium: "40 kr.", premium: "40 kr." },
                { label: "Godbidder & legetøj", budget: "60 kr.", medium: "100 kr.", premium: "180 kr." },
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
                <td className="px-4 py-3 text-center text-mint-700">ca. 720 kr.</td>
                <td className="px-4 py-3 text-center">ca. 980 kr.</td>
                <td className="px-4 py-3 text-center text-amber-700">ca. 1.390 kr.</td>
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
              title: "IVDD — diskusprolaps",
              cost: "15.000–40.000 kr.",
              likelihood: "Høj (25%)",
              desc: "Den lange ryg og korte ben gør Gravhunden særlig udsat. Operation er nødvendig ved lammelse. Forsikring er afgørende — uden den kan udgiften være uoverkommelig.",
              bad: true,
            },
            {
              title: "Overvægt",
              cost: "Gratis forebyggelse",
              likelihood: "Moderat",
              desc: "Overvægt forværrer risikoen for IVDD dramatisk. Hold altid Gravhunden i idealvægt — det er en af de vigtigste forebyggende handlinger.",
              bad: false,
            },
            {
              title: "Øjeproblemer",
              cost: "500–3.000 kr.",
              likelihood: "Lav-moderat",
              desc: "Nogle Gravhunde kan udvikle grå stær eller andre øjenproblemer med alderen. Regelmæssige tjek anbefales.",
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
        <h2 className="text-xl font-bold mb-4">Er Gravhund det rigtige valg?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-mint-50 border border-mint-200">
            <p className="font-semibold text-sm text-mint-800 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Passer til dig hvis du...
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Kan tegne god forsikring fra dag 1</li>
              <li>Har moderat budget (ca. 900–1.000 kr./md.)</li>
              <li>Ønsker en sjov og personlighedsrig hund</li>
              <li>Bor i lejlighed eller hus</li>
              <li>Kan undgå trapper og høje spring</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="font-semibold text-sm text-red-800 mb-3 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> Overvej en anden race hvis...
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Du ikke vil tegne forsikring</li>
              <li>Du bor med mange trapper</li>
              <li>Du ønsker en atletisk løbemakker</li>
              <li>Dit budget er under 700 kr./md.</li>
              <li>Du ikke kan håndtere IVDD-risikoen psykisk</li>
            </ul>
          </div>
        </div>
      </section>

      {recommendedProducts.length > 0 && (
        <div className="mt-10 p-5 bg-card border border-border rounded-2xl">
          <RecommendedProducts
            products={recommendedProducts}
            title="Anbefalede produkter til Gravhund-ejere"
          />
        </div>
      )}

      <div className="mt-10 p-6 bg-navy-900 text-white rounded-2xl text-center">
        <p className="font-bold text-lg mb-2">Se det fulde budget for din Gravhund</p>
        <p className="text-navy-300 text-sm mb-4">
          Brug beregneren og se månedspris, første-år-pris og livstidspris — tilpasset dit budget og aktivitetsniveau.
        </p>
        <Link
          href="/hvad-koster/gravhund"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-mint-600 hover:bg-mint-500 text-white font-semibold rounded-xl transition-colors"
        >
          Se fuld beregning →
        </Link>
      </div>

      <div className="mt-10">
        <FAQSection faqs={faqs} title="Spørgsmål om Gravhund" />
      </div>
    </div>
  );
}
