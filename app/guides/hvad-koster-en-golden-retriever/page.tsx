import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import { getBreedRecommendedProducts } from "@/data/products";
import { getBreedBySlug } from "@/data/breeds";
import { RecommendedProducts } from "@/components/shared/RecommendedProducts";
import { CheckCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hvad koster en Golden Retriever? Pris 2026 — Komplet guide",
  description:
    "Golden Retriever koster ca. 1.540 kr./md. Se fuld oversigt over foder, forsikring, grooming og dyrlæge — plus hvad du skal vide inden du køber.",
  alternates: { canonical: "/guides/hvad-koster-en-golden-retriever" },
};

const faqs = [
  {
    question: "Hvad koster en Golden Retriever om måneden?",
    answer:
      "En Golden Retriever koster typisk 1.300–1.800 kr. om måneden på medium-niveau. Det inkluderer foder (640 kr.), forsikring (460 kr.), dyrlæge (190 kr.) og grooming (250 kr.). Grooming er en større post end for kortpelsede racer.",
  },
  {
    question: "Hvad koster en Golden Retriever hvalp?",
    answer:
      "En Golden Retriever hvalp fra seriøs opdræt koster typisk 12.000–22.000 kr. i Danmark. Stamtavle, sundhedstests (hofter, øjne, hjerte) og forældrenes titel påvirker prisen markant.",
  },
  {
    question: "Har Golden Retriever høje dyrlægeomkostninger?",
    answer:
      "Medium risiko. Golden Retriever er statistisk en af de racer med højest kræftforekomst (op til 65% dør af kræft). Hofteproblemer er også hyppige. En god forsikring anbefales stærkt.",
  },
  {
    question: "Skal man klippe en Golden Retriever?",
    answer:
      "Golden Retriever behøver ikke klipning men kræver regelmæssig børstning (2–3 gange om ugen) og professionel trimning 4–6 gange om året. Grooming koster typisk 400–600 kr. pr. besøg — regn med 2.000–3.000 kr./år.",
  },
  {
    question: "Er Golden Retriever egnet til børnefamilier?",
    answer:
      "Ja — Golden Retriever er en af de bedste racer til familier med børn. Den er tålmodig, blid og elsker leg. Hunden er stor og aktiv, så den har brug for plads og minimum 1–2 timers motion dagligt.",
  },
];

export default function GoldenRetrieverGuidePage() {
  const breed = getBreedBySlug("golden-retriever");
  const recommendedProducts = breed ? getBreedRecommendedProducts(breed) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guider", href: "/guides" },
          { label: "Hvad koster en Golden Retriever" },
        ]}
      />

      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-mint-600 mb-2 block">
          Guide · Opdateret 2026
        </span>
        <h1 className="text-3xl font-bold mb-3">Hvad koster en Golden Retriever?</h1>
        <p className="text-muted-foreground text-lg">
          Golden Retriever er en af Danmarks mest populære hunderacer. Vi har samlet alle udgifter —
          foder, forsikring, grooming og dyrlæge — i én komplet guide.
        </p>
      </div>

      {/* Hurtig anbefaling */}
      <div className="mt-8 p-5 bg-navy-900 text-white rounded-2xl">
        <p className="text-sm font-semibold text-navy-300 mb-1">Kort svar</p>
        <p className="font-bold text-lg mb-1">Ca. 1.540 kr./md. på medium-niveau</p>
        <p className="text-sm text-navy-300">
          Golden Retriever er en mellemdyr race — kostindeks 62/100. Forsikring og grooming er de
          største poster udover foder. Første år inkl. hvalp og udstyr: ca. 35.000–45.000 kr.
        </p>
      </div>

      {/* Månedlig pris tabel */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-5">Månedlige udgifter — Golden Retriever</h2>
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
                { label: "Foder", budget: "440 kr.", medium: "640 kr.", premium: "920 kr." },
                { label: "Forsikring", budget: "300 kr.", medium: "460 kr.", premium: "680 kr." },
                { label: "Dyrlæge (gns.)", budget: "190 kr.", medium: "190 kr.", premium: "190 kr." },
                { label: "Grooming", budget: "75 kr.", medium: "163 kr.", premium: "250 kr." },
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
                <td className="px-4 py-3 text-center text-mint-700">ca. 1.105 kr.</td>
                <td className="px-4 py-3 text-center">ca. 1.633 kr.</td>
                <td className="px-4 py-3 text-center text-amber-700">ca. 2.340 kr.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Sundhedsrisici */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Sundhed og typiske udgifter</h2>
        <div className="space-y-3">
          {[
            {
              icon: AlertTriangle,
              color: "text-red-500",
              bg: "bg-red-50",
              title: "Kræft — op til 65% af Golden Retrievers dør af kræft",
              text: "Golden Retriever har den højeste kræftforekomst af alle hunderacer. Kræftbehandling koster typisk 20.000–80.000 kr. En forsikring med høj dækningssum er afgørende.",
            },
            {
              icon: AlertTriangle,
              color: "text-amber-500",
              bg: "bg-amber-50",
              title: "Hofteproblemer (HD) — hyppig for store racer",
              text: "Hofterøntgen og eventuel operation koster 8.000–25.000 kr. Vælg hvalp fra opdrætter der sundhedstester forældrene med HD-fri status.",
            },
            {
              icon: CheckCircle,
              color: "text-mint-600",
              bg: "bg-mint-50",
              title: "Vejrtrækning og allergier — sjælden bekymring",
              text: "I modsætning til brachycefale racer har Golden Retriever normal vejrtrækning. Allergier kan forekomme men er behandlbare.",
            },
          ].map(({ icon: Icon, color, bg, title, text }) => (
            <div key={title} className={`flex gap-3 p-4 rounded-xl ${bg}`}>
              <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${color}`} />
              <div>
                <p className="font-semibold text-sm mb-1">{title}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Anbefalede produkter */}
      {recommendedProducts.length > 0 && (
        <div className="mt-10 p-5 bg-card border border-border rounded-2xl">
          <RecommendedProducts
            products={recommendedProducts}
            title="Anbefalede produkter til Golden Retriever-ejere"
          />
        </div>
      )}

      {/* CTA */}
      <div className="mt-10 p-6 bg-navy-900 text-white rounded-2xl text-center">
        <p className="font-bold text-lg mb-2">Se det præcise budget for din Golden Retriever</p>
        <p className="text-navy-300 text-sm mb-4">
          Tilpas aktivitetsniveau, forsikring og budget-niveau i beregnereren.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/hvad-koster/golden-retriever"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-mint-600 hover:bg-mint-500 text-white font-semibold rounded-xl transition-colors"
          >
            Se fuld beregning →
          </Link>
          <Link
            href="/sammenlign/golden-retriever-vs-labrador"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy-700 hover:bg-navy-600 text-white font-semibold rounded-xl transition-colors"
          >
            Sammenlign med Labrador
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <FAQSection faqs={faqs} title="Spørgsmål om Golden Retriever" />
      </div>
    </div>
  );
}
