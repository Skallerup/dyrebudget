import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import { getBreedRecommendedProducts } from "@/data/products";
import { getBreedBySlug } from "@/data/breeds";
import { RecommendedProducts } from "@/components/shared/RecommendedProducts";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hvad koster en Cocker Spaniel? Pris 2026",
  description:
    "Cocker Spaniel koster ca. 1.360 kr./md. på medium-niveau. Se månedspris, forsikring og grooming til denne populære familie-hund. Komplet guide.",
  alternates: { canonical: "/guides/hvad-koster-en-cocker-spaniel" },
};

const faqs = [
  {
    question: "Hvad koster en Cocker Spaniel om måneden?",
    answer:
      "En Cocker Spaniel koster typisk 1.100–1.700 kr. om måneden på medium-niveau. Det inkluderer foder (420 kr.), forsikring (480 kr.), dyrlæge (180 kr.) og grooming (280 kr.).",
  },
  {
    question: "Hvad koster en Cocker Spaniel hvalp?",
    answer:
      "En Cocker Spaniel hvalp fra seriøst opdræt koster typisk 9.000–14.000 kr. i Danmark. Vælg opdræt med øjentestede og FN-scorede forældre.",
  },
  {
    question: "Hvad koster grooming til en Cocker Spaniel?",
    answer:
      "Professionel grooming til Cocker Spaniel koster typisk 500–700 kr. pr. besøg ca. hver 8 uger. Det løber op i ca. 3.500–5.000 kr./år. Daglig børstning hjemme reducerer groomerbehov og udgifter.",
  },
  {
    question: "Hvad er de typiske sygdomme hos Cocker Spaniel?",
    answer:
      "De hyppigste problemer er øreinfektioner (hængeørerne), øjeproblemer (katarakt, PRA), og familiær nefropati (nyresygdom i English Cocker). Regelmæssig ørenrensning er vigtig forebyggelse.",
  },
  {
    question: "Er Cocker Spaniel god med børn?",
    answer:
      "Ja, Cocker Spaniel er gladelig, energisk og tålmodig med børn. Den er en af de bedste familieracer i mellemstørrelse. Den trives godt i aktive familier der kan give motion og opmærksomhed.",
  },
];

export default function CockerSpanielGuidePage() {
  const breed = getBreedBySlug("cocker-spaniel");
  const recommendedProducts = breed ? getBreedRecommendedProducts(breed, false) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guider", href: "/guides" },
          { label: "Hvad koster en Cocker Spaniel" },
        ]}
      />

      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-mint-600 mb-2 block">
          Guide · Opdateret 2026
        </span>
        <h1 className="text-3xl font-bold mb-3">Hvad koster en Cocker Spaniel?</h1>
        <p className="text-muted-foreground text-lg">
          Cocker Spaniel er en glad og energisk familiehund med smukke hængeøren. Grooming er en
          fast udgift, men ellers er racen prisvenlig og sund.
        </p>
      </div>

      <div className="mt-6 flex gap-3 p-5 bg-amber-50 rounded-2xl border border-amber-200">
        <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0 text-amber-500" />
        <div>
          <p className="font-bold text-sm mb-1 text-amber-800">Moderat sundhedsrisiko — kostindeks 60/100</p>
          <p className="text-sm text-amber-700">
            Grooming koster 280 kr./md. og øreinfektioner er hyppige. Med regelmæssig pleje er
            Cocker Spaniel ellers en forholdsvis prisvenlig race.
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-5">Månedlige udgifter — Cocker Spaniel</h2>
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
                { label: "Foder", budget: "280 kr.", medium: "420 kr.", premium: "620 kr." },
                { label: "Forsikring", budget: "320 kr.", medium: "480 kr.", premium: "710 kr." },
                { label: "Dyrlæge (gns.)", budget: "180 kr.", medium: "180 kr.", premium: "180 kr." },
                { label: "Grooming", budget: "280 kr.", medium: "280 kr.", premium: "280 kr." },
                { label: "Godbidder & legetøj", budget: "80 kr.", medium: "130 kr.", premium: "200 kr." },
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
                <td className="px-4 py-3 text-center text-mint-700">ca. 1.140 kr.</td>
                <td className="px-4 py-3 text-center">ca. 1.490 kr.</td>
                <td className="px-4 py-3 text-center text-amber-700">ca. 1.990 kr.</td>
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
              title: "Øreinfektioner",
              cost: "500–2.000 kr./år",
              likelihood: "Høj",
              desc: "Hængeørerne samler fugt og kan give gentagne infektioner. Ugentlig rensning er nærmest obligatorisk. Vær opmærksom på lugt og kløen.",
              bad: false,
            },
            {
              title: "PRA — progressiv retinal atrofi",
              cost: "Kan føre til blindhed",
              likelihood: "Lav (testet opdræt)",
              desc: "Arvelig øjenlidelse. Vælg altid opdræt med PRA-testede forældre. Mild PRA påvirker ikke livskvaliteten væsentligt.",
              bad: false,
            },
            {
              title: "Familiær nefropati (nyresygdom)",
              cost: "5.000–20.000 kr.",
              likelihood: "Lav (English Cocker)",
              desc: "En arvelig nyresygdom der primært rammer English Cocker Spaniel. Ansvarligt opdræt screener for tilstanden.",
              bad: true,
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
        <h2 className="text-xl font-bold mb-4">Er Cocker Spaniel det rigtige valg?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-mint-50 border border-mint-200">
            <p className="font-semibold text-sm text-mint-800 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Passer til dig hvis du...
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Ønsker en glad og familievenlig hund</li>
              <li>Kan budgettere ca. 1.200–1.600 kr./md.</li>
              <li>Er villig til regelmæssig ørenrensning</li>
              <li>Kan give daglig motion (1 time)</li>
              <li>Bor i hus eller lejlighed med have</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="font-semibold text-sm text-red-800 mb-3 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> Overvej en anden race hvis...
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Du ikke vil rense ører ugentligt</li>
              <li>Du ønsker meget lavt plejebehov</li>
              <li>Dit budget er under 1.000 kr./md.</li>
              <li>Du ønsker en korthåret lavpleje-hund</li>
              <li>Du ikke kan give daglig motion</li>
            </ul>
          </div>
        </div>
      </section>

      {recommendedProducts.length > 0 && (
        <div className="mt-10 p-5 bg-card border border-border rounded-2xl">
          <RecommendedProducts
            products={recommendedProducts}
            title="Anbefalede produkter til Cocker Spaniel-ejere"
          />
        </div>
      )}

      <div className="mt-10 p-6 bg-navy-900 text-white rounded-2xl text-center">
        <p className="font-bold text-lg mb-2">Se det fulde budget for din Cocker Spaniel</p>
        <p className="text-navy-300 text-sm mb-4">
          Brug beregneren og se månedspris, første-år-pris og livstidspris — tilpasset dit budget og aktivitetsniveau.
        </p>
        <Link
          href="/hvad-koster/cocker-spaniel"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-mint-600 hover:bg-mint-500 text-white font-semibold rounded-xl transition-colors"
        >
          Se fuld beregning →
        </Link>
      </div>

      <div className="mt-10">
        <FAQSection faqs={faqs} title="Spørgsmål om Cocker Spaniel" />
      </div>
    </div>
  );
}
