import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import { getBreedRecommendedProducts } from "@/data/products";
import { getBreedBySlug } from "@/data/breeds";
import { RecommendedProducts } from "@/components/shared/RecommendedProducts";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hvad koster en Chihuahua? Pris 2026",
  description:
    "Chihuahua koster ca. 600 kr./md. — Danmarks billigste hund at eje. Se månedspris, forsikring og sundhedsudgifter. Komplet guide til Chihuahua-ejere.",
  alternates: { canonical: "/guides/hvad-koster-en-chihuahua" },
};

const faqs = [
  {
    question: "Hvad koster en Chihuahua om måneden?",
    answer:
      "En Chihuahua koster typisk 500–750 kr. om måneden på medium-niveau. Det inkluderer foder (180 kr.), forsikring (280 kr.), dyrlæge (110 kr.) og grooming (30 kr.). Den lille størrelse holder udgifterne markant nede.",
  },
  {
    question: "Hvad koster en Chihuahua hvalp?",
    answer:
      "En Chihuahua hvalp fra seriøst opdræt koster typisk 5.000–10.000 kr. i Danmark. Vær forsigtig med meget billige hvalpe — useriøst opdræt kan betyde skjulte sundhedsproblemer.",
  },
  {
    question: "Lever Chihuahua længe?",
    answer:
      "Ja, Chihuahuaen er en af de længstlevende hunderacer med en gennemsnitlig levetid på 14–18 år. Det gør den ekstremt prisvenlig beregnet over hele livet.",
  },
  {
    question: "Er Chihuahua god i lejlighed?",
    answer:
      "Ja, Chihuahuaen er perfekt til lejlighed. Den kræver minimal plads og motion sammenlignet med større racer. Korte gåture og leg indendørs er typisk nok.",
  },
  {
    question: "Hvad er de typiske sygdomme hos Chihuahua?",
    answer:
      "De hyppigste problemer er tandsygdomme (lille mund = tætte tænder), hypoglykæmi (lavt blodsukker) hos hvalpe, og hjerteklap-problemer i ældre alder. Regelmæssig tandpleje er vigtig.",
  },
];

export default function ChihuahuaGuidePage() {
  const breed = getBreedBySlug("chihuahua");
  const recommendedProducts = breed ? getBreedRecommendedProducts(breed, false) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guider", href: "/guides" },
          { label: "Hvad koster en Chihuahua" },
        ]}
      />

      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-mint-600 mb-2 block">
          Guide · Opdateret 2026
        </span>
        <h1 className="text-3xl font-bold mb-3">Hvad koster en Chihuahua?</h1>
        <p className="text-muted-foreground text-lg">
          Chihuahuaen er Danmarks billigste hund at eje. Lille appetit, lang levetid og lav forsikringspræmie
          gør den ideel til budgetbevidste hundejere.
        </p>
      </div>

      <div className="mt-6 flex gap-3 p-5 bg-green-50 rounded-2xl border border-green-200">
        <CheckCircle className="w-5 h-5 mt-0.5 shrink-0 text-green-500" />
        <div>
          <p className="font-bold text-sm mb-1 text-green-800">Laveste kostindeks — 22/100</p>
          <p className="text-sm text-green-700">
            Chihuahua er Danmarks billigste hund at eje. Forsikring koster 180–420 kr./md. og levetiden er 14–18 år.
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-5">Månedlige udgifter — Chihuahua</h2>
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
                { label: "Foder", budget: "120 kr.", medium: "180 kr.", premium: "270 kr." },
                { label: "Forsikring", budget: "180 kr.", medium: "280 kr.", premium: "420 kr." },
                { label: "Dyrlæge (gns.)", budget: "110 kr.", medium: "110 kr.", premium: "110 kr." },
                { label: "Grooming", budget: "30 kr.", medium: "30 kr.", premium: "30 kr." },
                { label: "Godbidder & legetøj", budget: "50 kr.", medium: "80 kr.", premium: "150 kr." },
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
                <td className="px-4 py-3 text-center text-mint-700">ca. 490 kr.</td>
                <td className="px-4 py-3 text-center">ca. 680 kr.</td>
                <td className="px-4 py-3 text-center text-amber-700">ca. 980 kr.</td>
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
              title: "Tandsygdomme",
              cost: "1.000–4.000 kr./år",
              likelihood: "Høj",
              desc: "Lille kæbe = tætsiddende tænder = plak og tandsten. Regelmæssig tandbørstning og professionel rensning forebygger dyre indgreb.",
            },
            {
              title: "Hypoglykæmi (hvalpe)",
              cost: "500–2.000 kr.",
              likelihood: "Moderat (hvalpe)",
              desc: "Chihuahua-hvalpe kan få lavt blodsukker. Hyppige små måltider de første måneder forebygger problemet.",
            },
            {
              title: "Hjerteklap-problemer (ældre)",
              cost: "2.000–8.000 kr./år",
              likelihood: "Moderat (ældre hunde)",
              desc: "Som mange små racer kan Chihuahua udvikle hjerteklap-problemer med alderen. Regelmæssige dyrlægetjek efter 7 år anbefales.",
            },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl border bg-amber-50 border-amber-200">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
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
        <h2 className="text-xl font-bold mb-4">Er Chihuahua det rigtige valg?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-mint-50 border border-mint-200">
            <p className="font-semibold text-sm text-mint-800 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Passer til dig hvis du...
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Har stramt budget (under 700 kr./md.)</li>
              <li>Bor i lejlighed</li>
              <li>Ønsker en loyal og kærlig hund</li>
              <li>Er senior eller har begrænset mobilitet</li>
              <li>Vil have hund der lever længe</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="font-semibold text-sm text-red-800 mb-3 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> Overvej en anden race hvis...
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Du har små børn (Chihuahua er skrøbelig)</li>
              <li>Du ønsker en aktiv sportshund</li>
              <li>Du rejser meget (racen er ikke robust)</li>
              <li>Du ikke vil børste tænder regelmæssigt</li>
              <li>Du ønsker en hund der kan løbe frit</li>
            </ul>
          </div>
        </div>
      </section>

      {recommendedProducts.length > 0 && (
        <div className="mt-10 p-5 bg-card border border-border rounded-2xl">
          <RecommendedProducts
            products={recommendedProducts}
            title="Anbefalede produkter til Chihuahua-ejere"
          />
        </div>
      )}

      <div className="mt-10 p-6 bg-navy-900 text-white rounded-2xl text-center">
        <p className="font-bold text-lg mb-2">Se det fulde budget for din Chihuahua</p>
        <p className="text-navy-300 text-sm mb-4">
          Brug beregneren og se månedspris, første-år-pris og livstidspris — tilpasset dit budget og aktivitetsniveau.
        </p>
        <Link
          href="/hvad-koster/chihuahua"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-mint-600 hover:bg-mint-500 text-white font-semibold rounded-xl transition-colors"
        >
          Se fuld beregning →
        </Link>
      </div>

      <div className="mt-10">
        <FAQSection faqs={faqs} title="Spørgsmål om Chihuahua" />
      </div>
    </div>
  );
}
