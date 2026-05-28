import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import { getBreedRecommendedProducts } from "@/data/products";
import { getBreedBySlug } from "@/data/breeds";
import { RecommendedProducts } from "@/components/shared/RecommendedProducts";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hvad koster en Beagle? Pris 2026",
  description:
    "Beagle koster ca. 910 kr./md. på medium-niveau — en af de billigste mellemstore hunderacer. Se månedspris, forsikring og sundhedsudgifter. Komplet guide.",
  alternates: { canonical: "/guides/hvad-koster-en-beagle" },
};

const faqs = [
  {
    question: "Hvad koster en Beagle om måneden?",
    answer:
      "En Beagle koster typisk 800–1.100 kr. om måneden på medium-niveau. Det inkluderer foder (400 kr.), forsikring (340 kr.), dyrlæge (130 kr.) og grooming (40 kr.).",
  },
  {
    question: "Hvad koster en Beagle hvalp?",
    answer:
      "En Beagle hvalp fra seriøst opdræt koster typisk 6.000–10.000 kr. i Danmark. Det er en af de mere overkommelige racer at anskaffe.",
  },
  {
    question: "Er Beagle en nem race at holde?",
    answer:
      "Beaglen er sund og robust, men kan være udfordrende at træne da den er styret af sin næse. Den kan have tendens til at løbe sin vej hvis den finder et interessant spor. Sikret have eller snor er vigtigt.",
  },
  {
    question: "Hvad er de typiske sygdomme hos Beagle?",
    answer:
      "Beaglen er generelt en sund race. De hyppigste problemer er øreinfektioner (hængeørerne samler fugt), overvægt og af og til epilepsi. Forsikring er anbefalet men dækkende på et lavt prisniveau.",
  },
  {
    question: "Hvorfor er Beagle billig at eje?",
    answer:
      "Beaglen er middelstor og spiser ikke overdrevet meget. Forsikringspræmien er lav pga. lav sundhedsrisiko, og pelsplejen er minimal. Kombineret med en lang levetid (12–15 år) er den meget prisvenlig over tid.",
  },
];

export default function BeagleGuidePage() {
  const breed = getBreedBySlug("beagle");
  const recommendedProducts = breed ? getBreedRecommendedProducts(breed, false) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guider", href: "/guides" },
          { label: "Hvad koster en Beagle" },
        ]}
      />

      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-mint-600 mb-2 block">
          Guide · Opdateret 2026
        </span>
        <h1 className="text-3xl font-bold mb-3">Hvad koster en Beagle?</h1>
        <p className="text-muted-foreground text-lg">
          Beaglen er en af Danmarks mest prisvenlige hunderacer. Sund, robust og med lav forsikringspræmie
          — ideel til budgetbevidste familier der vil have en aktiv hund.
        </p>
      </div>

      <div className="mt-6 flex gap-3 p-5 bg-green-50 rounded-2xl border border-green-200">
        <CheckCircle className="w-5 h-5 mt-0.5 shrink-0 text-green-500" />
        <div>
          <p className="font-bold text-sm mb-1 text-green-800">Lav sundhedsrisiko — kostindeks 38/100</p>
          <p className="text-sm text-green-700">
            Beagle er en af de sundeste og billigste hunderacer. Forsikring koster 220–500 kr./md. — markant under gennemsnittet.
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-5">Månedlige udgifter — Beagle</h2>
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
                { label: "Foder", budget: "280 kr.", medium: "400 kr.", premium: "600 kr." },
                { label: "Forsikring", budget: "220 kr.", medium: "340 kr.", premium: "500 kr." },
                { label: "Dyrlæge (gns.)", budget: "130 kr.", medium: "130 kr.", premium: "130 kr." },
                { label: "Grooming", budget: "40 kr.", medium: "40 kr.", premium: "40 kr." },
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
                <td className="px-4 py-3 text-center text-mint-700">ca. 750 kr.</td>
                <td className="px-4 py-3 text-center">ca. 1.060 kr.</td>
                <td className="px-4 py-3 text-center text-amber-700">ca. 1.520 kr.</td>
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
              cost: "500–1.500 kr./år",
              likelihood: "Moderat",
              desc: "Hængeørerne giver risiko for ophobning af fugt og infektioner. Regelmæssig ørenrensning forebygger de fleste problemer.",
              bad: false,
            },
            {
              title: "Overvægt",
              cost: "Gratis forebyggelse",
              likelihood: "Høj",
              desc: "Beaglen er madglad og kan hurtigt blive overvægtig. Portionskontrol og regelmæssig motion er nøglen — og kan spare dyrlægeudgifter.",
              bad: false,
            },
            {
              title: "Epilepsi",
              cost: "3.000–8.000 kr./år",
              likelihood: "Lav",
              desc: "Epilepsi forekommer i racen men er ikke udbredt. Løbende medicinering kan være nødvendig hvis diagnosen stilles.",
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
        <h2 className="text-xl font-bold mb-4">Er Beagle det rigtige valg?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-mint-50 border border-mint-200">
            <p className="font-semibold text-sm text-mint-800 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Passer til dig hvis du...
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Vil have en sund og robust hund</li>
              <li>Har et stramt budget (under 1.100 kr./md.)</li>
              <li>Har børn (Beagle er familievenlig)</li>
              <li>Kan give daglig motion og gåture</li>
              <li>Har have med sikret hegn</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="font-semibold text-sm text-red-800 mb-3 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> Overvej en anden race hvis...
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Du ønsker en lydig lydende hund</li>
              <li>Du ikke kan give daglig motion</li>
              <li>Du ikke har have eller sikret område</li>
              <li>Du bor tæt på naboer (Beagle gø)</li>
              <li>Du er meget perfektionistisk m. lydighed</li>
            </ul>
          </div>
        </div>
      </section>

      {recommendedProducts.length > 0 && (
        <div className="mt-10 p-5 bg-card border border-border rounded-2xl">
          <RecommendedProducts
            products={recommendedProducts}
            title="Anbefalede produkter til Beagle-ejere"
          />
        </div>
      )}

      <div className="mt-10 p-6 bg-navy-900 text-white rounded-2xl text-center">
        <p className="font-bold text-lg mb-2">Se det fulde budget for din Beagle</p>
        <p className="text-navy-300 text-sm mb-4">
          Brug beregneren og se månedspris, første-år-pris og livstidspris — tilpasset dit budget og aktivitetsniveau.
        </p>
        <Link
          href="/hvad-koster/beagle"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-mint-600 hover:bg-mint-500 text-white font-semibold rounded-xl transition-colors"
        >
          Se fuld beregning →
        </Link>
      </div>

      <div className="mt-10">
        <FAQSection faqs={faqs} title="Spørgsmål om Beagle" />
      </div>
    </div>
  );
}
