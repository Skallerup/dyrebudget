import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import { getBreedRecommendedProducts } from "@/data/products";
import { getBreedBySlug } from "@/data/breeds";
import { RecommendedProducts } from "@/components/shared/RecommendedProducts";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hvad koster en Fransk Bulldog? Pris 2026 — Komplet guide",
  description:
    "Fransk Bulldog er en af Danmarks dyreste racer at eje. Se månedspris, forsikringspris og typiske dyrlægeomkostninger. Er racen det rigtige valg for dig?",
  alternates: { canonical: "/guides/hvad-koster-en-fransk-bulldog" },
};

const faqs = [
  {
    question: "Hvad koster en Fransk Bulldog om måneden?",
    answer:
      "En Fransk Bulldog koster typisk 1.600–2.400 kr. om måneden på medium-niveau. Det inkluderer foder (370 kr.), forsikring (820 kr.), dyrlæge (380 kr.) og grooming (40 kr.). Forsikringen er markant dyrere end for de fleste andre racer.",
  },
  {
    question: "Hvad koster en Fransk Bulldog hvalp?",
    answer:
      "En Fransk Bulldog hvalp fra seriøs opdræt koster typisk 18.000–35.000 kr. i Danmark. Prisen varierer med farve, stamtavle og opdrætter. Vær skeptisk over for priser under 15.000 kr. — det kan indikere useriøst opdræt.",
  },
  {
    question: "Hvorfor er forsikring så dyr til Fransk Bulldog?",
    answer:
      "Fransk Bulldog er brachycefal (flad snude) og har statistisk meget høje sundhedsomkostninger. BOAS (vejrtrækningstilstand), rygsøjleproblemer (IVDD), allergier og øjenproblemer er hyppige. Forsikringsselskaberne prissætter præmien derefter.",
  },
  {
    question: "Er Fransk Bulldog egnet til lejlighed?",
    answer:
      "Ja, racen er faktisk et af de bedste valg til lejlighed. Fransk Bulldog er rolig, har lav aktivitet og kræver korte gåture. Men husk: Racen tåler dårligt varme og bør aldrig løbe lange distancer.",
  },
  {
    question: "Hvad er de typiske sygdomme hos Fransk Bulldog?",
    answer:
      "De hyppigste sygdomme er: BOAS (vejrtrækningstilstand, op til 30.000 kr. at operere), IVDD (diskusprolaps, 15.000–50.000 kr.), hjerteproblemer, hudallergier og øjenproblemer. En god forsikring er nærmest obligatorisk.",
  },
];

export default function FranskBulldogGuidePage() {
  const breed = getBreedBySlug("fransk-bulldog");
  const recommendedProducts = breed ? getBreedRecommendedProducts(breed, false) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guider", href: "/guides" },
          { label: "Hvad koster en Fransk Bulldog" },
        ]}
      />

      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-mint-600 mb-2 block">
          Guide · Opdateret 2026
        </span>
        <h1 className="text-3xl font-bold mb-3">Hvad koster en Fransk Bulldog?</h1>
        <p className="text-muted-foreground text-lg">
          Fransk Bulldog er en af Danmarks mest populære og dyreste racer. Vi gennemgår de reelle
          udgifter — og forklarer hvad du skal vide inden køb.
        </p>
      </div>

      {/* Advarselsboks */}
      <div className="mt-6 flex gap-3 p-5 bg-red-50 rounded-2xl border border-red-200">
        <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0 text-red-500" />
        <div>
          <p className="font-bold text-sm mb-1 text-red-800">Højeste sundhedsrisiko — kostindeks 82/100</p>
          <p className="text-sm text-red-700">
            Fransk Bulldog har en af de højeste sundhedsrisici blandt alle hunderacer. Forsikring
            koster 580–1.200 kr./md. og er nærmest obligatorisk. Budgét realistisk fra start.
          </p>
        </div>
      </div>

      {/* Månedlig pris oversigt */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-5">Månedlige udgifter — Fransk Bulldog</h2>
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
                { label: "Foder", budget: "250 kr.", medium: "370 kr.", premium: "550 kr." },
                { label: "Forsikring", budget: "580 kr.", medium: "820 kr.", premium: "1.200 kr." },
                { label: "Dyrlæge (gns.)", budget: "380 kr.", medium: "380 kr.", premium: "380 kr." },
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
                <td className="px-4 py-3 text-center text-mint-700">ca. 1.330 kr.</td>
                <td className="px-4 py-3 text-center">ca. 1.760 kr.</td>
                <td className="px-4 py-3 text-center text-amber-700">ca. 2.420 kr.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Dyrlæge-gennemsnittet inkluderer forebyggende behandling og estimeret andel af akut behandling.</p>
      </section>

      {/* Sundhedsrisici */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Typiske sundhedsudgifter</h2>
        <div className="space-y-3">
          {[
            {
              title: "BOAS — vejrtrækningstilstand",
              cost: "15.000–30.000 kr.",
              likelihood: "Høj",
              desc: "Op til 50% af alle Franske Bulldogs har vejrtrækningstilstand der kræver operation. Operationen udføres typisk inden 2 år.",
              bad: true,
            },
            {
              title: "IVDD — diskusprolaps",
              cost: "15.000–50.000 kr.",
              likelihood: "Moderat",
              desc: "Franske Bulldogs er prædisponerede for rygsøjleproblemer pga. kort ryg. En operation er dyr, men afgørende for livskvalitet.",
              bad: true,
            },
            {
              title: "Hudallergier",
              cost: "500–2.000 kr./år",
              likelihood: "Høj",
              desc: "Hudfolde og allergier er hyppige. Behandling er typisk løbende og inkluderer medicin og specialfoder.",
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

      {/* Er racen det rigtige valg */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Er Fransk Bulldog det rigtige valg?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-mint-50 border border-mint-200">
            <p className="font-semibold text-sm text-mint-800 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Passer til dig hvis du...
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Bor i lejlighed eller lille hjem</li>
              <li>Ønsker en rolig, lav-energi hund</li>
              <li>Har råd til 1.700–2.500 kr./md.</li>
              <li>Kan tegne forsikring fra dag 1</li>
              <li>Arbejder hjemmefra (racen elsker selskab)</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="font-semibold text-sm text-red-800 mb-3 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> Overvej en anden race hvis...
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Du ønsker en aktiv løbemakker</li>
              <li>Dit budget er under 1.500 kr./md.</li>
              <li>Du bor i meget varmt klima</li>
              <li>Du er skeptisk over for forsikring</li>
              <li>Du ikke vil risikere dyre operationer</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Anbefalede produkter */}
      {recommendedProducts.length > 0 && (
        <div className="mt-10 p-5 bg-card border border-border rounded-2xl">
          <RecommendedProducts
            products={recommendedProducts}
            title="Anbefalede produkter til Fransk Bulldog-ejere"
          />
        </div>
      )}

      {/* CTA */}
      <div className="mt-10 p-6 bg-navy-900 text-white rounded-2xl text-center">
        <p className="font-bold text-lg mb-2">Se det fulde budget for din Franske Bulldog</p>
        <p className="text-navy-300 text-sm mb-4">
          Brug beregnereren og se månedspris, første-år-pris og livstidspris — tilpasset dit budget og aktivitetsniveau.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/hvad-koster/fransk-bulldog"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-mint-600 hover:bg-mint-500 text-white font-semibold rounded-xl transition-colors"
          >
            Se fuld beregning →
          </Link>
          <Link
            href="/sammenlign/fransk-bulldog-vs-mops"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy-700 hover:bg-navy-600 text-white font-semibold rounded-xl transition-colors"
          >
            Sammenlign med Mops
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <FAQSection faqs={faqs} title="Spørgsmål om Fransk Bulldog" />
      </div>
    </div>
  );
}
