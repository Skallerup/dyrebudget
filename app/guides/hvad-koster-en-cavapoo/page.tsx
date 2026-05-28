import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import { getBreedRecommendedProducts } from "@/data/products";
import { getBreedBySlug } from "@/data/breeds";
import { RecommendedProducts } from "@/components/shared/RecommendedProducts";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hvad koster en Cavapoo? Pris 2026",
  description:
    "Cavapoo koster ca. 1.360 kr./md. — men hvalpen alene koster 14.000–20.000 kr. Se månedspris, grooming og sundhedsudgifter. Komplet guide til Cavapoo-ejere.",
  alternates: { canonical: "/guides/hvad-koster-en-cavapoo" },
};

const faqs = [
  {
    question: "Hvad koster en Cavapoo om måneden?",
    answer:
      "En Cavapoo koster typisk 1.100–1.700 kr. om måneden på medium-niveau. Det inkluderer foder (320 kr.), forsikring (480 kr.), dyrlæge (160 kr.) og grooming (400 kr.). Grooming er en stor post.",
  },
  {
    question: "Hvad koster en Cavapoo hvalp?",
    answer:
      "En Cavapoo hvalp fra seriøst opdræt koster typisk 14.000–20.000 kr. i Danmark. Det er markant dyrere end renpulsede racer. Vær skeptisk over for hvalpe under 10.000 kr.",
  },
  {
    question: "Er Cavapoo hypoallergen?",
    answer:
      "Cavapoo er generelt allergivenlig pga. puddel-arven, men det varierer fra hvalp til hvalp afhængig af hvilken forælders genes er dominante. Test reaktion inden anskaffelse.",
  },
  {
    question: "Hvad er de typiske sygdomme hos Cavapoo?",
    answer:
      "Cavapoo arver risici fra begge forældre: MVD (mitral valve disease) fra Cavalier King Charles og øje- og hofteproblemer fra Puddel-siden. Vælg opdræt med hjerte- og øjentestede forældre.",
  },
  {
    question: "Hvad koster grooming til en Cavapoo?",
    answer:
      "Professionel grooming koster typisk 500–800 kr. pr. besøg ca. hver 6–8 uge. Det løber op i 3.500–6.000 kr./år. Alternativt kan hjemmeklipning spare op til 70% af udgiften.",
  },
];

export default function CavapooGuidePage() {
  const breed = getBreedBySlug("cavapoo");
  const recommendedProducts = breed ? getBreedRecommendedProducts(breed, false) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guider", href: "/guides" },
          { label: "Hvad koster en Cavapoo" },
        ]}
      />

      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-mint-600 mb-2 block">
          Guide · Opdateret 2026
        </span>
        <h1 className="text-3xl font-bold mb-3">Hvad koster en Cavapoo?</h1>
        <p className="text-muted-foreground text-lg">
          Cavapoo er én af Danmarks mest eftertragtede designerhunde — hypoallergen, kærlig og
          familievenlig. Men anskaffelsespris og grooming er markant over gennemsnittet.
        </p>
      </div>

      <div className="mt-6 flex gap-3 p-5 bg-amber-50 rounded-2xl border border-amber-200">
        <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0 text-amber-500" />
        <div>
          <p className="font-bold text-sm mb-1 text-amber-800">Høj anskaffelsespris — kostindeks 58/100</p>
          <p className="text-sm text-amber-700">
            Hvalp koster 14.000–20.000 kr. + grooming 400 kr./md. De løbende udgifter er moderate,
            men start-investeringen er høj. Forsikring anbefales pga. arvede hjerteproblemer.
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-5">Månedlige udgifter — Cavapoo</h2>
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
                { label: "Foder", budget: "220 kr.", medium: "320 kr.", premium: "480 kr." },
                { label: "Forsikring", budget: "320 kr.", medium: "480 kr.", premium: "720 kr." },
                { label: "Dyrlæge (gns.)", budget: "160 kr.", medium: "160 kr.", premium: "160 kr." },
                { label: "Grooming", budget: "400 kr.", medium: "400 kr.", premium: "400 kr." },
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
                <td className="px-4 py-3 text-center text-mint-700">ca. 1.180 kr.</td>
                <td className="px-4 py-3 text-center">ca. 1.490 kr.</td>
                <td className="px-4 py-3 text-center text-amber-700">ca. 1.960 kr.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Grooming er beregnet til professionel klipning ca. hver 7 uge. Anskaffelsesomkostning (14.000–20.000 kr.) er ikke inkluderet.</p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Typiske sundhedsudgifter</h2>
        <div className="space-y-3">
          {[
            {
              title: "MVD — mitral valve disease (hjerte)",
              cost: "3.000–15.000 kr./år",
              likelihood: "Moderat (arvet fra Cavalier)",
              desc: "Arvelig hjertelidelse fra Cavalier-siden. Medicinsk behandling er mulig men kræver løbende udgifter. Hjertetestede forældre reducerer risikoen.",
              bad: true,
            },
            {
              title: "Øreinfektioner",
              cost: "500–1.500 kr./år",
              likelihood: "Moderat",
              desc: "Puddel-pels og hængeøren kan give øreproblemer. Regelmæssig rensning forebygger.",
              bad: false,
            },
            {
              title: "Separation anxiety",
              cost: "Adfærdstræning: 2.000–5.000 kr.",
              likelihood: "Moderat",
              desc: "Cavapoo er meget menneskeorienteret og kan udvikle separationsangst. Tidlig træning er afgørende.",
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
        <h2 className="text-xl font-bold mb-4">Er Cavapoo det rigtige valg?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-mint-50 border border-mint-200">
            <p className="font-semibold text-sm text-mint-800 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Passer til dig hvis du...
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Er allergiker der ønsker hund</li>
              <li>Vil have en familievenlig og kærlig hund</li>
              <li>Kan budgettere 1.200–1.700 kr./md.</li>
              <li>Er villig til regelmæssig grooming</li>
              <li>Arbejder hjemmefra eller deltid</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="font-semibold text-sm text-red-800 mb-3 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> Overvej en anden race hvis...
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Dit budget er under 1.000 kr./md.</li>
              <li>Du ønsker en renpulsed race</li>
              <li>Du ikke vil bruge penge på grooming</li>
              <li>Du arbejder fuld tid uden hundepasning</li>
              <li>Du ønsker en stor aktiv hund</li>
            </ul>
          </div>
        </div>
      </section>

      {recommendedProducts.length > 0 && (
        <div className="mt-10 p-5 bg-card border border-border rounded-2xl">
          <RecommendedProducts
            products={recommendedProducts}
            title="Anbefalede produkter til Cavapoo-ejere"
          />
        </div>
      )}

      <div className="mt-10 p-6 bg-navy-900 text-white rounded-2xl text-center">
        <p className="font-bold text-lg mb-2">Se det fulde budget for din Cavapoo</p>
        <p className="text-navy-300 text-sm mb-4">
          Brug beregneren og se månedspris, første-år-pris og livstidspris — tilpasset dit budget og aktivitetsniveau.
        </p>
        <Link
          href="/hvad-koster/cavapoo"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-mint-600 hover:bg-mint-500 text-white font-semibold rounded-xl transition-colors"
        >
          Se fuld beregning →
        </Link>
      </div>

      <div className="mt-10">
        <FAQSection faqs={faqs} title="Spørgsmål om Cavapoo" />
      </div>
    </div>
  );
}
