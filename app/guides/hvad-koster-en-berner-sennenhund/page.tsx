import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import { getBreedRecommendedProducts } from "@/data/products";
import { getBreedBySlug } from "@/data/breeds";
import { RecommendedProducts } from "@/components/shared/RecommendedProducts";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hvad koster en Berner Sennenhund? Pris 2026",
  description:
    "Berner Sennenhund koster ca. 2.160 kr./md. og lever kun 7–10 år. Høj kræftrisiko og dyre operationer. Se månedspris og livstidspris. Komplet guide.",
  alternates: { canonical: "/guides/hvad-koster-en-berner-sennenhund" },
};

const faqs = [
  {
    question: "Hvad koster en Berner Sennenhund om måneden?",
    answer:
      "En Berner Sennenhund koster typisk 1.800–2.600 kr. om måneden på medium-niveau. Det inkluderer foder (900 kr.), forsikring (780 kr.), dyrlæge (280 kr.) og grooming (200 kr.).",
  },
  {
    question: "Hvad koster en Berner Sennenhund hvalp?",
    answer:
      "En Berner Sennenhund hvalp fra seriøst opdræt koster typisk 12.000–20.000 kr. i Danmark. Vælg opdræt med kræft- og hoftescreening i avlslinjen.",
  },
  {
    question: "Hvorfor lever Berner Sennenhund så kort?",
    answer:
      "Berner Sennenhund lever typisk kun 7–10 år og har ekstremt høj kræftforekomst. Statistisk dør ca. 50% af kræft. Det er den primære årsag til den korte levetid og høje forsikringspræmie.",
  },
  {
    question: "Er Berner Sennenhund god med børn?",
    answer:
      "Ja, racen er berømt for sin tålmodighed og kærlighed til børn. Den er blid, loyal og stolelsom. Men husk: den lever kortere end de fleste racer, og børn kan opleve tab tidligt.",
  },
  {
    question: "Hvad er den samlede livstidspris for en Berner Sennenhund?",
    answer:
      "Beregnet over 8 år (gennemsnit) med medium-niveau udgifter: ca. 207.000 kr. i løbende udgifter plus 12.000 kr. i anskaffelsesomkostninger = ca. 219.000 kr. totalt. En af de dyreste racer beregnet over livet.",
  },
];

export default function BernerSennenhundGuidePage() {
  const breed = getBreedBySlug("berner-sennenhund");
  const recommendedProducts = breed ? getBreedRecommendedProducts(breed, false) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guider", href: "/guides" },
          { label: "Hvad koster en Berner Sennenhund" },
        ]}
      />

      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-mint-600 mb-2 block">
          Guide · Opdateret 2026
        </span>
        <h1 className="text-3xl font-bold mb-3">Hvad koster en Berner Sennenhund?</h1>
        <p className="text-muted-foreground text-lg">
          Berner Sennenhund er en storslået og kærlig bjergrace — men en af Danmarks dyreste hunde
          at eje. Kort levetid, høj kræftrisiko og store løbende udgifter kræver grundig overvejelse.
        </p>
      </div>

      <div className="mt-6 flex gap-3 p-5 bg-red-50 rounded-2xl border border-red-200">
        <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0 text-red-500" />
        <div>
          <p className="font-bold text-sm mb-1 text-red-800">Høj sundhedsrisiko — kostindeks 82/100</p>
          <p className="text-sm text-red-700">
            Ca. 50% af Berner Sennenhunde dør af kræft. Levetiden er kun 7–10 år. Forsikring koster
            520–1.140 kr./md. og er nærmest obligatorisk. Budgetlæg realistisk fra start.
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-5">Månedlige udgifter — Berner Sennenhund</h2>
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
                { label: "Foder", budget: "620 kr.", medium: "900 kr.", premium: "1.300 kr." },
                { label: "Forsikring", budget: "520 kr.", medium: "780 kr.", premium: "1.140 kr." },
                { label: "Dyrlæge (gns.)", budget: "280 kr.", medium: "280 kr.", premium: "280 kr." },
                { label: "Grooming", budget: "200 kr.", medium: "200 kr.", premium: "200 kr." },
                { label: "Godbidder & legetøj", budget: "120 kr.", medium: "200 kr.", premium: "350 kr." },
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
                <td className="px-4 py-3 text-center text-mint-700">ca. 1.740 kr.</td>
                <td className="px-4 py-3 text-center">ca. 2.360 kr.</td>
                <td className="px-4 py-3 text-center text-amber-700">ca. 3.270 kr.</td>
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
              title: "Kræft (50% af alle Bernere)",
              cost: "20.000–80.000 kr.",
              likelihood: "Meget høj",
              desc: "Ca. 50% af Berner Sennenhunde dør af kræft. Histiocytisk sarkom og lymfom er de hyppigste. Kræftbehandling er ekstremt dyr og ofte begrænset effektiv.",
              bad: true,
            },
            {
              title: "Hoftedysplasi (HD)",
              cost: "20.000–50.000 kr.",
              likelihood: "Moderat",
              desc: "Store racer er prædisponerede for HD. Vælg altid HD-godkendt opdræt (A- eller B-hofter).",
              bad: true,
            },
            {
              title: "Pelspleje og øreinfektioner",
              cost: "1.000–3.000 kr./år",
              likelihood: "Moderat",
              desc: "Den tykke og lange pels kræver regelmæssig børstning og grooming. Øreinfektioner kan forekomme.",
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
        <h2 className="text-xl font-bold mb-4">Er Berner Sennenhund det rigtige valg?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-mint-50 border border-mint-200">
            <p className="font-semibold text-sm text-mint-800 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Passer til dig hvis du...
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Har råd til 1.800–2.600 kr./md.</li>
              <li>Har stor have og aktiv hverdag</li>
              <li>Er klar til den korte levetid (7–10 år)</li>
              <li>Tegner fuld forsikring fra dag 1</li>
              <li>Ønsker en blid familiehund med karakter</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="font-semibold text-sm text-red-800 mb-3 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> Overvej en anden race hvis...
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Du ikke kan håndtere tidlig hundedød</li>
              <li>Dit budget er under 1.700 kr./md.</li>
              <li>Du bor i lejlighed</li>
              <li>Du ønsker en race med lang levetid</li>
              <li>Du er bekymret for kræft-risikoen</li>
            </ul>
          </div>
        </div>
      </section>

      {recommendedProducts.length > 0 && (
        <div className="mt-10 p-5 bg-card border border-border rounded-2xl">
          <RecommendedProducts
            products={recommendedProducts}
            title="Anbefalede produkter til Berner Sennenhund-ejere"
          />
        </div>
      )}

      <div className="mt-10 p-6 bg-navy-900 text-white rounded-2xl text-center">
        <p className="font-bold text-lg mb-2">Se det fulde budget for din Berner Sennenhund</p>
        <p className="text-navy-300 text-sm mb-4">
          Brug beregneren og se månedspris, første-år-pris og livstidspris — tilpasset dit budget og aktivitetsniveau.
        </p>
        <Link
          href="/hvad-koster/berner-sennenhund"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-mint-600 hover:bg-mint-500 text-white font-semibold rounded-xl transition-colors"
        >
          Se fuld beregning →
        </Link>
      </div>

      <div className="mt-10">
        <FAQSection faqs={faqs} title="Spørgsmål om Berner Sennenhund" />
      </div>
    </div>
  );
}
