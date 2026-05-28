import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import { RaceCard } from "@/components/shared/RaceCard";
import { MethodologyBox } from "@/components/shared/MethodologyBox";
import { getCheapestBreeds, getMostExpensiveBreeds } from "@/data/breeds";

export const metadata: Metadata = {
  title: "Hvad koster en hund i Danmark? Komplet guide 2024",
  description:
    "Alt du skal vide om hundeudgifter i Danmark. Gennemsnitlige månedspriser, foder, forsikring, dyrlæge og livstidspris for alle populære racer.",
};

const costTable = [
  { category: "Foder", budget: "250–450 kr.", medium: "450–700 kr.", premium: "700–1.000 kr." },
  { category: "Forsikring", budget: "180–350 kr.", medium: "350–550 kr.", premium: "550–1.200 kr." },
  { category: "Dyrlæge", budget: "100–150 kr.", medium: "100–250 kr.", premium: "150–350 kr." },
  { category: "Grooming", budget: "40–100 kr.", medium: "100–300 kr.", premium: "200–500 kr." },
  { category: "Godbidder + legetøj", budget: "100 kr.", medium: "150 kr.", premium: "250 kr." },
  { category: "Loppe/flåt", budget: "20 kr.", medium: "22 kr.", premium: "25 kr." },
  { category: "Diverse", budget: "80 kr.", medium: "140 kr.", premium: "220 kr." },
];

const faqs = [
  {
    question: "Hvad er den gennemsnitlige månedspris for en hund?",
    answer: "En gennemsnitlig hund i Danmark koster 2.400–3.200 kr./md. på medium-niveau. Store hunde med høj sundhedsrisiko kan koste 4.000–5.500 kr./md., mens små sunde racer kan holdes for 1.200–1.800 kr./md.",
  },
  {
    question: "Hvad koster en hund det første år?",
    answer: "Første år er altid dyrest. Regn med 30.000–55.000 kr. samlet inkl. anskaffelsespris (7.000–20.000 kr. for racehund), grundudstyr (3.000–8.000 kr.) og 12 måneder med løbende udgifter.",
  },
  {
    question: "Hvad er den billigste hunderace at eje?",
    answer: "Chihuahua, Dansk-Svensk Gårdhund og Beagle er de billigste at eje. En Chihuahua koster kun 1.200–1.500 kr./md. på budgetniveau og lever op til 18 år.",
  },
  {
    question: "Skal jeg have hundeforsikring?",
    answer: "Ja, vi anbefaler det stærkt. En enkelt operation (fx hofteudskiftning) koster 20.000–50.000 kr. Et år med forsikring koster 2.400–9.600 kr. Forsikringen er særligt vigtig for racer med høj sundhedsrisiko.",
  },
];

export default function HvadKosterEnHundPage() {
  const cheapestDogs = getCheapestBreeds("dog", 3);
  const mostExpensive = getMostExpensiveBreeds("dog", 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guider", href: "/guides" },
          { label: "Hvad koster en hund?" },
        ]}
      />

      <h1 className="text-3xl font-bold mb-4">Hvad koster en hund i Danmark?</h1>
      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
        En hund koster typisk <strong>1.800–5.500 kr. om måneden</strong> afhængigt af race,
        størrelse og dit budgetniveau. Vi gennemgår alle poster med realistiske tal fra det danske marked.
      </p>

      {/* Overview table */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Månedlige udgifter til hund — overblik</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-3 px-4 font-medium">Udgiftspost</th>
                <th className="py-3 px-4 text-center font-medium">Budget</th>
                <th className="py-3 px-4 text-center font-medium">Medium</th>
                <th className="py-3 px-4 text-center font-medium">Premium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {costTable.map((row) => (
                <tr key={row.category} className="hover:bg-muted/20">
                  <td className="py-3 px-4 font-medium">{row.category}</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">{row.budget}</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">{row.medium}</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">{row.premium}</td>
                </tr>
              ))}
              <tr className="bg-navy-50 font-bold">
                <td className="py-3 px-4">Total pr. måned</td>
                <td className="py-3 px-4 text-center text-navy-900">~1.500 kr.</td>
                <td className="py-3 px-4 text-center text-navy-900">~2.500 kr.</td>
                <td className="py-3 px-4 text-center text-navy-900">~4.000 kr.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Estimater baseret på mellemstor hund (10–25 kg). Store hunde koster 20–40% mere i foder.
        </p>
      </section>

      {/* First year */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Første år — det store overblik</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Anskaffelsespris (racehund)", range: "7.000–35.000 kr.", note: "Opdrætter med papirer" },
            { label: "Grundudstyr", range: "3.000–8.000 kr.", note: "Seng, mad, snor, legetøj mv." },
            { label: "1. års løbende udgifter", range: "18.000–45.000 kr.", note: "12 md. × månedspris" },
          ].map((item) => (
            <div key={item.label} className="bg-muted/50 rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
              <p className="text-lg font-bold text-navy-900">{item.range}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cheapest / most expensive */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Billigste hunderacer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {cheapestDogs.map((b) => <RaceCard key={b.id} breed={b} />)}
        </div>
        <h2 className="text-xl font-bold mb-4">Dyreste hunderacer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {mostExpensive.map((b) => <RaceCard key={b.id} breed={b} />)}
        </div>
      </section>

      <MethodologyBox />
      <FAQSection faqs={faqs} title="Spørgsmål om hundeudgifter" />
    </div>
  );
}
