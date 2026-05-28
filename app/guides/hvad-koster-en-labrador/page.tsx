import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import { getBreedRecommendedProducts } from "@/data/products";
import { getBreedBySlug } from "@/data/breeds";
import { RecommendedProducts } from "@/components/shared/RecommendedProducts";
import { CheckCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hvad koster en Labrador? Pris 2026 — Komplet guide",
  description:
    "Labrador Retriever koster ca. 1.300 kr./md. Se fuld oversigt over foder, forsikring og dyrlæge — plus hvad du skal vide inden du køber en Labrador.",
  alternates: { canonical: "/guides/hvad-koster-en-labrador" },
};

const faqs = [
  {
    question: "Hvad koster en Labrador om måneden?",
    answer:
      "En Labrador koster typisk 1.100–1.600 kr. om måneden på medium-niveau. Det inkluderer foder (650 kr.), forsikring (420 kr.), dyrlæge (180 kr.) og grooming (50 kr.). Labradors er billigere på grooming end langpelsede racer.",
  },
  {
    question: "Hvad koster en Labrador hvalp?",
    answer:
      "En Labrador hvalp fra seriøst opdræt koster typisk 10.000–18.000 kr. i Danmark. Prisen afhænger af farve, stamtavle og om forældrene er sundhedstestede (hofte, albue, øjne).",
  },
  {
    question: "Er Labradors tilbøjelige til fedme?",
    answer:
      "Ja — Labradors er en af de racer der lettest bliver overvægtige. En mutation i POMC-genet gør at mange Labradors aldrig føler sig mætte. Kontrolleret foder og daglig motion er afgørende for et langt liv.",
  },
  {
    question: "Hvad er typiske sygdomme hos Labrador?",
    answer:
      "Hyppigste problemer: hofteledsdysplasi (HD), albuedysplasi, øjenlidelser og fedme-relaterede sygdomme. En god forsikring der dækker ortopædi anbefales.",
  },
  {
    question: "Er Labrador den billigste store hunderace?",
    answer:
      "Næsten. Labrador har kostindeks 55/100 og er billigere end Golden Retriever (62) og meget billigere end Berner Sennenhund (72). Lave grooming-udgifter gør Labradors særlig overkommelige til den størrelse.",
  },
];

export default function LabradorGuidePage() {
  const breed = getBreedBySlug("labrador");
  const recommendedProducts = breed ? getBreedRecommendedProducts(breed) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guider", href: "/guides" },
          { label: "Hvad koster en Labrador" },
        ]}
      />

      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-mint-600 mb-2 block">
          Guide · Opdateret 2026
        </span>
        <h1 className="text-3xl font-bold mb-3">Hvad koster en Labrador Retriever?</h1>
        <p className="text-muted-foreground text-lg">
          Labrador er Danmarks mest elskede familiehund og en af de billigste store racer at eje.
          Her er det komplette billede af hvad det reelt koster.
        </p>
      </div>

      {/* Hurtig oversigt */}
      <div className="mt-8 p-5 bg-navy-900 text-white rounded-2xl">
        <p className="text-sm font-semibold text-navy-300 mb-1">Kort svar</p>
        <p className="font-bold text-lg mb-1">Ca. 1.300 kr./md. på medium-niveau</p>
        <p className="text-sm text-navy-300">
          Labrador har kostindeks 55/100 — under middel for en stor race. Lave groomingudgifter og
          moderate forsikringspriser gør racen overkommelig. Første år inkl. hvalp: ca. 30.000–40.000 kr.
        </p>
      </div>

      {/* Månedlig pris tabel */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-5">Månedlige udgifter — Labrador Retriever</h2>
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
                { label: "Foder", budget: "450 kr.", medium: "650 kr.", premium: "950 kr." },
                { label: "Forsikring", budget: "280 kr.", medium: "420 kr.", premium: "620 kr." },
                { label: "Dyrlæge (gns.)", budget: "180 kr.", medium: "180 kr.", premium: "180 kr." },
                { label: "Grooming", budget: "15 kr.", medium: "33 kr.", premium: "50 kr." },
                { label: "Godbidder & legetøj", budget: "100 kr.", medium: "170 kr.", premium: "290 kr." },
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
                <td className="px-4 py-3 text-center text-mint-700">ca. 1.025 kr.</td>
                <td className="px-4 py-3 text-center">ca. 1.453 kr.</td>
                <td className="px-4 py-3 text-center text-amber-700">ca. 2.090 kr.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Hvad du skal vide */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Hvad du skal vide inden køb</h2>
        <div className="space-y-3">
          {[
            {
              icon: AlertTriangle,
              color: "text-amber-500",
              bg: "bg-amber-50",
              title: "Fedme er racespecifik risiko — hold vægten nede",
              text: "Ca. 25% af alle Labradors bærer en POMC-mutation der hæmmer mæthedsfornemmelsen. Undgå fri adgang til mad og sørg for daglig motion. Overvægt forkorter livet markant og øger ledproblemer.",
            },
            {
              icon: AlertTriangle,
              color: "text-amber-500",
              bg: "bg-amber-50",
              title: "Hofteproblemer — vælg sundhedstestet opdræt",
              text: "Hofteledsdysplasi (HD) og albuedysplasi er hyppige. Vær sikker på at opdrætteren røntgenfotograferer forældrene og har HD-fri resultater. En operation koster 10.000–25.000 kr.",
            },
            {
              icon: CheckCircle,
              color: "text-mint-600",
              bg: "bg-mint-50",
              title: "Nem at passe og træne — god begynderhund",
              text: "Labrador er en af de nemmeste store racer at træne. Den er højtmotiveret af ros og godbidder. God til familier med børn, aktive par og begyndere.",
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
            title="Anbefalede produkter til Labrador-ejere"
          />
        </div>
      )}

      {/* CTA */}
      <div className="mt-10 p-6 bg-navy-900 text-white rounded-2xl text-center">
        <p className="font-bold text-lg mb-2">Se det præcise budget for din Labrador</p>
        <p className="text-navy-300 text-sm mb-4">
          Justér aktivitetsniveau og budget-niveau i beregnereren og se livstidspris.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/hvad-koster/labrador"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-mint-600 hover:bg-mint-500 text-white font-semibold rounded-xl transition-colors"
          >
            Se fuld beregning →
          </Link>
          <Link
            href="/sammenlign/labrador-vs-golden-retriever"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy-700 hover:bg-navy-600 text-white font-semibold rounded-xl transition-colors"
          >
            Sammenlign med Golden Retriever
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <FAQSection faqs={faqs} title="Spørgsmål om Labrador Retriever" />
      </div>
    </div>
  );
}
