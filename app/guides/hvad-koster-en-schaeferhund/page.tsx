import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import { getBreedRecommendedProducts } from "@/data/products";
import { getBreedBySlug } from "@/data/breeds";
import { RecommendedProducts } from "@/components/shared/RecommendedProducts";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hvad koster en Schæferhund? Pris 2026",
  description:
    "Schæferhund koster ca. 1.480 kr./md. på medium-niveau. Se månedspris, forsikringsomkostninger og typiske sundhedsudgifter. Fuld guide til Schæferhund-ejere.",
  alternates: { canonical: "/guides/hvad-koster-en-schaeferhund" },
};

const faqs = [
  {
    question: "Hvad koster en Schæferhund om måneden?",
    answer:
      "En Schæferhund koster typisk 1.300–1.700 kr. om måneden på medium-niveau. Det inkluderer foder (700 kr.), forsikring (480 kr.), dyrlæge (200 kr.) og grooming (100 kr.).",
  },
  {
    question: "Hvad koster en Schæferhund hvalp?",
    answer:
      "En Schæferhund hvalp fra seriøst opdræt koster typisk 8.000–15.000 kr. i Danmark. IP-testet opdræt med røntgen-godkendte hofter koster mere, men anbefales stærkt for at undgå hofteproblemer.",
  },
  {
    question: "Hvad er de typiske sygdomme hos Schæferhund?",
    answer:
      "De hyppigste sygdomme er: hofted ysplasi (HD) og albueledsdysplasi (ED) — begge kan kræve behandling for 20.000–50.000 kr. Degu­ne­rativ myelopati (DM) er en alvorlig neurologisk sygdom som er hyppig i racen. Forsikring anbefales.",
  },
  {
    question: "Har Schæferhund brug for meget motion?",
    answer:
      "Ja, Schæferhunden er en arbejdshund og kræver minimum 1-2 timers motion dagligt samt mental stimulation. Kedelighed fører til destruktiv adfærd. Agility, nosework og lydighedstræning er ideelle aktiviteter.",
  },
  {
    question: "Er Schæferhund en god familiehund?",
    answer:
      "Ja, med korrekt socialisering fra hvalp er Schæferhunden fremragende med børn og familie. Den kræver dog en erfaren ejer der kan sætte klare rammer og give tilstrækkelig aktivitet.",
  },
];

export default function SchaeferhundGuidePage() {
  const breed = getBreedBySlug("schaeferhund");
  const recommendedProducts = breed ? getBreedRecommendedProducts(breed, false) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guider", href: "/guides" },
          { label: "Hvad koster en Schæferhund" },
        ]}
      />

      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-mint-600 mb-2 block">
          Guide · Opdateret 2026
        </span>
        <h1 className="text-3xl font-bold mb-3">Hvad koster en Schæferhund?</h1>
        <p className="text-muted-foreground text-lg">
          Schæferhunden er intelligent, loyal og alsidig — men kræver erfaren ejer, masser af motion
          og opmærksomhed på hofteproblemer. Vi gennemgår de reelle udgifter.
        </p>
      </div>

      <div className="mt-6 flex gap-3 p-5 bg-amber-50 rounded-2xl border border-amber-200">
        <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0 text-amber-500" />
        <div>
          <p className="font-bold text-sm mb-1 text-amber-800">Medium sundhedsrisiko — kostindeks 60/100</p>
          <p className="text-sm text-amber-700">
            Hofteproblemer er hyppige i racen. Vælg opdræt med røntgen-godkendte forældre og tegn forsikring fra dag 1.
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-5">Månedlige udgifter — Schæferhund</h2>
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
                { label: "Foder", budget: "480 kr.", medium: "700 kr.", premium: "1.000 kr." },
                { label: "Forsikring", budget: "320 kr.", medium: "480 kr.", premium: "700 kr." },
                { label: "Dyrlæge (gns.)", budget: "200 kr.", medium: "200 kr.", premium: "200 kr." },
                { label: "Grooming", budget: "100 kr.", medium: "100 kr.", premium: "100 kr." },
                { label: "Godbidder & legetøj", budget: "80 kr.", medium: "150 kr.", premium: "250 kr." },
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
                <td className="px-4 py-3 text-center text-mint-700">ca. 1.180 kr.</td>
                <td className="px-4 py-3 text-center">ca. 1.630 kr.</td>
                <td className="px-4 py-3 text-center text-amber-700">ca. 2.250 kr.</td>
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
              desc: "HD er udbredt i racen. Operation er dyr men nødvendig ved svære tilfælde. Vælg altid opdræt med røntgengodkendte forældre (A- eller B-hofter).",
              bad: true,
            },
            {
              title: "Degenerativ myelopati (DM)",
              cost: "Løbende behandling",
              likelihood: "Moderat",
              desc: "DM er en progressiv neurologisk sygdom som rammer mange Schæferhunde i ældre alder. Der er ingen kur, men fysioterapi og støttebehandling kan hjælpe.",
              bad: true,
            },
            {
              title: "Øre- og hudproblemer",
              cost: "500–2.000 kr./år",
              likelihood: "Lav-moderat",
              desc: "Schæferhunde kan have tendens til allergier og hudproblemer. Regelmæssig pelspleje reducerer risikoen markant.",
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
        <h2 className="text-xl font-bold mb-4">Er Schæferhund det rigtige valg?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-mint-50 border border-mint-200">
            <p className="font-semibold text-sm text-mint-800 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Passer til dig hvis du...
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Er erfaren hundeejer</li>
              <li>Har tid til 1–2 timers aktivitet dagligt</li>
              <li>Ønsker en loyal og beskyttende hund</li>
              <li>Har have eller adgang til natur</li>
              <li>Har råd til 1.200–1.700 kr./md.</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="font-semibold text-sm text-red-800 mb-3 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> Overvej en anden race hvis...
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Du er førstegangsejer</li>
              <li>Du bor i lejlighed uden have</li>
              <li>Du ikke kan give daglig motion</li>
              <li>Dit budget er under 1.000 kr./md.</li>
              <li>Du arbejder fuld tid uden hunde-pasning</li>
            </ul>
          </div>
        </div>
      </section>

      {recommendedProducts.length > 0 && (
        <div className="mt-10 p-5 bg-card border border-border rounded-2xl">
          <RecommendedProducts
            products={recommendedProducts}
            title="Anbefalede produkter til Schæferhund-ejere"
          />
        </div>
      )}

      <div className="mt-10 p-6 bg-navy-900 text-white rounded-2xl text-center">
        <p className="font-bold text-lg mb-2">Se det fulde budget for din Schæferhund</p>
        <p className="text-navy-300 text-sm mb-4">
          Brug beregneren og se månedspris, første-år-pris og livstidspris — tilpasset dit budget og aktivitetsniveau.
        </p>
        <Link
          href="/hvad-koster/schaeferhund"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-mint-600 hover:bg-mint-500 text-white font-semibold rounded-xl transition-colors"
        >
          Se fuld beregning →
        </Link>
      </div>

      <div className="mt-10">
        <FAQSection faqs={faqs} title="Spørgsmål om Schæferhund" />
      </div>
    </div>
  );
}
