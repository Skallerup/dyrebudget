import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import { getBreedRecommendedProducts } from "@/data/products";
import { getBreedBySlug } from "@/data/breeds";
import { RecommendedProducts } from "@/components/shared/RecommendedProducts";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hvad koster en Border Collie? Pris 2026",
  description:
    "Border Collie koster ca. 1.190 kr./md. på medium-niveau. Se månedspris, forsikring og hvad den verdens klogeste hund kræver af dig. Komplet guide.",
  alternates: { canonical: "/guides/hvad-koster-en-border-collie" },
};

const faqs = [
  {
    question: "Hvad koster en Border Collie om måneden?",
    answer:
      "En Border Collie koster typisk 1.000–1.400 kr. om måneden på medium-niveau. Det inkluderer foder (520 kr.), forsikring (380 kr.), dyrlæge (140 kr.) og grooming (150 kr.).",
  },
  {
    question: "Hvad koster en Border Collie hvalp?",
    answer:
      "En Border Collie hvalp fra seriøst opdræt koster typisk 7.500–12.000 kr. i Danmark. Vælg opdræt med øjentestede forældre for at minimere risiko for genetiske øjenlidelser.",
  },
  {
    question: "Er Border Collie svær at eje?",
    answer:
      "Border Collien kræver enorm mængde mental og fysisk stimulation — minimum 2 timer motion dagligt plus træning. Den er ikke for begyndere eller folk der arbejder fuld tid uden mulighed for hundepasning.",
  },
  {
    question: "Hvad er de typiske sygdomme hos Border Collie?",
    answer:
      "Border Collie er generelt sund. De hyppigste problemer er Collie Eye Anomaly (CEA) — en arvelig øjenlidelse, hofteproblemer og epilepsi. Vælg altid CEA-testet opdræt.",
  },
  {
    question: "Kan Border Collie bo i lejlighed?",
    answer:
      "Det frarådes kraftigt. Border Collien kræver plads, stimulation og motion som er meget svær at give i en lejlighed. En frustreret Border Collie kan være destruktiv og udvikle stressadfærd.",
  },
];

export default function BorderCollieGuidePage() {
  const breed = getBreedBySlug("border-collie");
  const recommendedProducts = breed ? getBreedRecommendedProducts(breed, false) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guider", href: "/guides" },
          { label: "Hvad koster en Border Collie" },
        ]}
      />

      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-mint-600 mb-2 block">
          Guide · Opdateret 2026
        </span>
        <h1 className="text-3xl font-bold mb-3">Hvad koster en Border Collie?</h1>
        <p className="text-muted-foreground text-lg">
          Border Collien er verdens mest intelligente hund — men kræver mere tid og engagement end
          de fleste andre racer. Prisvenlig sundhedsmæssigt, men krævende i praksis.
        </p>
      </div>

      <div className="mt-6 flex gap-3 p-5 bg-amber-50 rounded-2xl border border-amber-200">
        <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0 text-amber-500" />
        <div>
          <p className="font-bold text-sm mb-1 text-amber-800">Høj aktivitet krævet — kostindeks 48/100</p>
          <p className="text-sm text-amber-700">
            Border Collie er sund og relativt billig at eje, men kræver minimum 2 timers daglig aktivitet og konstant mental stimulation.
            Ikke for begyndere.
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-5">Månedlige udgifter — Border Collie</h2>
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
                { label: "Foder", budget: "350 kr.", medium: "520 kr.", premium: "780 kr." },
                { label: "Forsikring", budget: "250 kr.", medium: "380 kr.", premium: "560 kr." },
                { label: "Dyrlæge (gns.)", budget: "140 kr.", medium: "140 kr.", premium: "140 kr." },
                { label: "Grooming", budget: "150 kr.", medium: "150 kr.", premium: "150 kr." },
                { label: "Godbidder & legetøj", budget: "100 kr.", medium: "180 kr.", premium: "280 kr." },
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
                <td className="px-4 py-3 text-center text-mint-700">ca. 990 kr.</td>
                <td className="px-4 py-3 text-center">ca. 1.370 kr.</td>
                <td className="px-4 py-3 text-center text-amber-700">ca. 1.910 kr.</td>
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
              title: "Collie Eye Anomaly (CEA)",
              cost: "Variabel — test: 1.000 kr.",
              likelihood: "Lav (testet opdræt)",
              desc: "CEA er en arvelig øjenlidelse. Køb altid fra CEA-testet opdræt. Milde tilfælde kræver sjældent behandling.",
              bad: false,
            },
            {
              title: "Hofteproblemer",
              cost: "10.000–40.000 kr.",
              likelihood: "Lav-moderat",
              desc: "Border Collie kan udvikle hofteproblemer, men er langt mindre udsat end racer som Labrador og Golden Retriever.",
              bad: false,
            },
            {
              title: "Stressadfærd (ikke medicinsk)",
              cost: "Adfærdstrænning: 2.000–5.000 kr.",
              likelihood: "Høj ved utilstrækkelig stimulation",
              desc: "Understimuleret Border Collie udvikler often OCD-lignende adfærd, destruktivitet og angst. Den største risiko er ikke medicinsk men adfærdsmæssig.",
              bad: false,
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
        <h2 className="text-xl font-bold mb-4">Er Border Collie det rigtige valg?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-mint-50 border border-mint-200">
            <p className="font-semibold text-sm text-mint-800 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Passer til dig hvis du...
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Er aktiv og motionerer dagligt (løb, cykling)</li>
              <li>Har erfaring med hunde</li>
              <li>Vil drive hundesporten (agility, frisbee)</li>
              <li>Har have og gerne natur i nærheden</li>
              <li>Arbejder hjemmefra eller har fleksibel hverdag</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="font-semibold text-sm text-red-800 mb-3 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> Overvej en anden race hvis...
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Du er førstegangsejer</li>
              <li>Du har et roligt, ikke-aktivt liv</li>
              <li>Du bor i lejlighed</li>
              <li>Du arbejder fuld tid uden pasning</li>
              <li>Du ønsker en rolig sofatøjse</li>
            </ul>
          </div>
        </div>
      </section>

      {recommendedProducts.length > 0 && (
        <div className="mt-10 p-5 bg-card border border-border rounded-2xl">
          <RecommendedProducts
            products={recommendedProducts}
            title="Anbefalede produkter til Border Collie-ejere"
          />
        </div>
      )}

      <div className="mt-10 p-6 bg-navy-900 text-white rounded-2xl text-center">
        <p className="font-bold text-lg mb-2">Se det fulde budget for din Border Collie</p>
        <p className="text-navy-300 text-sm mb-4">
          Brug beregneren og se månedspris, første-år-pris og livstidspris — tilpasset dit budget og aktivitetsniveau.
        </p>
        <Link
          href="/hvad-koster/border-collie"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-mint-600 hover:bg-mint-500 text-white font-semibold rounded-xl transition-colors"
        >
          Se fuld beregning →
        </Link>
      </div>

      <div className="mt-10">
        <FAQSection faqs={faqs} title="Spørgsmål om Border Collie" />
      </div>
    </div>
  );
}
