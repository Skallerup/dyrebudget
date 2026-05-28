import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import { getBreedRecommendedProducts } from "@/data/products";
import { getBreedBySlug } from "@/data/breeds";
import { RecommendedProducts } from "@/components/shared/RecommendedProducts";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hvad koster en Puddel? Pris 2026",
  description:
    "Puddel (Miniature) koster ca. 1.140 kr./md. — men grooming udgør 380 kr. alene. Se månedspris, forsikring og alt om puddlens plejebehov. Komplet guide.",
  alternates: { canonical: "/guides/hvad-koster-en-puddel" },
};

const faqs = [
  {
    question: "Hvad koster en Puddel om måneden?",
    answer:
      "En Miniature Puddel koster typisk 900–1.400 kr. om måneden på medium-niveau. Det inkluderer foder (320 kr.), forsikring (320 kr.), dyrlæge (120 kr.) og grooming (380 kr.). Grooming er den største enkeltpost.",
  },
  {
    question: "Hvad koster en Puddel hvalp?",
    answer:
      "En Miniature Puddel hvalp fra seriøst opdræt koster typisk 6.000–12.000 kr. i Danmark. Standard Puddel kan koste mere. Vælg opdræt med øjentestede og progressiv retinal atrofi-testede forældre.",
  },
  {
    question: "Hvad koster grooming til en Puddel?",
    answer:
      "Professionel grooming til Puddel koster typisk 500–800 kr. pr. besøg, og de fleste behøver klipning hver 6–8 uge. Det løber op i 3.500–6.000 kr./år. Alternativt kan man lære at klippe selv og spare op til 70%.",
  },
  {
    question: "Er Puddel allergivenlig?",
    answer:
      "Puddel er én af de bedste racer for allergikere da den næsten ikke fælder hår. Bemærk dog: det er hundens spyt og hudceller (ikke hår) der typisk udløser allergi. Kontakt hunden inden anskaffelse for at teste reaktion.",
  },
  {
    question: "Lever Puddel længe?",
    answer:
      "Ja, Miniature Puddel lever typisk 12–15 år og er en af de sundeste hunderacer. Den er intelligent, nem at træne og har lav sundhedsrisiko — en rigtig god langtidsinvestering.",
  },
];

export default function PuddelGuidePage() {
  const breed = getBreedBySlug("puddel");
  const recommendedProducts = breed ? getBreedRecommendedProducts(breed, false) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guider", href: "/guides" },
          { label: "Hvad koster en Puddel" },
        ]}
      />

      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-mint-600 mb-2 block">
          Guide · Opdateret 2026
        </span>
        <h1 className="text-3xl font-bold mb-3">Hvad koster en Puddel?</h1>
        <p className="text-muted-foreground text-lg">
          Puddelen er intelligent, hypoallergen og sund — men groomingomkostningerne er høje.
          Den største udgift er ikke forsikring men regelmæssig pelsklipning.
        </p>
      </div>

      <div className="mt-6 flex gap-3 p-5 bg-amber-50 rounded-2xl border border-amber-200">
        <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0 text-amber-500" />
        <div>
          <p className="font-bold text-sm mb-1 text-amber-800">Grooming er den store udgift — kostindeks 52/100</p>
          <p className="text-sm text-amber-700">
            Puddelpels kræver klipning ca. hver 6–8 uge (500–800 kr. pr. gang). Lær at klippe selv
            og spar 50–70% på denne post. Ellers 3.500–6.000 kr./år til groomer.
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-5">Månedlige udgifter — Puddel (Miniature)</h2>
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
                { label: "Forsikring", budget: "210 kr.", medium: "320 kr.", premium: "480 kr." },
                { label: "Dyrlæge (gns.)", budget: "120 kr.", medium: "120 kr.", premium: "120 kr." },
                { label: "Grooming", budget: "380 kr.", medium: "380 kr.", premium: "380 kr." },
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
                <td className="px-4 py-3 text-center text-mint-700">ca. 1.010 kr.</td>
                <td className="px-4 py-3 text-center">ca. 1.250 kr.</td>
                <td className="px-4 py-3 text-center text-amber-700">ca. 1.660 kr.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Grooming er beregnet til professionel klipning ca. hver 7 uge. Groom-selv reduktion: ca. 200 kr./md.</p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Typiske sundhedsudgifter</h2>
        <div className="space-y-3">
          {[
            {
              title: "Progressiv retinal atrofi (PRA)",
              cost: "Blindhed — behandling begrænset",
              likelihood: "Lav (testet opdræt)",
              desc: "PRA er en arvelig øjenlidelse der kan føre til blindhed. Vælg altid PRA-testet opdræt for at minimere risikoen.",
              bad: false,
            },
            {
              title: "Addisons sygdom",
              cost: "2.000–5.000 kr./år",
              likelihood: "Lav",
              desc: "Puddel er én af de racer med øget risiko for Addisons sygdom (binyrebarksvigt). Sygdommen kan behandles medicinsk og kræver livslangt tilskud.",
              bad: false,
            },
            {
              title: "Epilepsi",
              cost: "2.000–6.000 kr./år",
              likelihood: "Lav",
              desc: "Epilepsi forekommer i racen men er ikke udbredt. Medicinsk behandling er typisk effektiv.",
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
        <h2 className="text-xl font-bold mb-4">Er Puddel det rigtige valg?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-mint-50 border border-mint-200">
            <p className="font-semibold text-sm text-mint-800 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Passer til dig hvis du...
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Er allergiker der ønsker hund</li>
              <li>Ønsker en intelligent og nem-at-træne hund</li>
              <li>Er villig til at gå til groomer regelmæssigt</li>
              <li>Vil have en sund race med lang levetid</li>
              <li>Bor i lejlighed eller hus</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="font-semibold text-sm text-red-800 mb-3 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> Overvej en anden race hvis...
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Du ikke vil bruge penge på grooming</li>
              <li>Du ønsker en simpel lavpleje-hund</li>
              <li>Dit budget er under 900 kr./md.</li>
              <li>Du ønsker en stor aktiv hund</li>
              <li>Du ikke kan lide regelmæssig pelspleje</li>
            </ul>
          </div>
        </div>
      </section>

      {recommendedProducts.length > 0 && (
        <div className="mt-10 p-5 bg-card border border-border rounded-2xl">
          <RecommendedProducts
            products={recommendedProducts}
            title="Anbefalede produkter til Puddel-ejere"
          />
        </div>
      )}

      <div className="mt-10 p-6 bg-navy-900 text-white rounded-2xl text-center">
        <p className="font-bold text-lg mb-2">Se det fulde budget for din Puddel</p>
        <p className="text-navy-300 text-sm mb-4">
          Brug beregneren og se månedspris, første-år-pris og livstidspris — tilpasset dit budget og aktivitetsniveau.
        </p>
        <Link
          href="/hvad-koster/puddel"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-mint-600 hover:bg-mint-500 text-white font-semibold rounded-xl transition-colors"
        >
          Se fuld beregning →
        </Link>
      </div>

      <div className="mt-10">
        <FAQSection faqs={faqs} title="Spørgsmål om Puddel" />
      </div>
    </div>
  );
}
