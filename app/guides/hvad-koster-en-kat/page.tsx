import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import { RaceCard } from "@/components/shared/RaceCard";
import { MethodologyBox } from "@/components/shared/MethodologyBox";
import { getCheapestBreeds, getMostExpensiveBreeds } from "@/data/breeds";

export const metadata: Metadata = {
  title: "Hvad koster en kat i Danmark? Komplet guide 2024",
  description:
    "Alt om katteudgifter i Danmark. Månedspriser, foder, forsikring og livstidspris for 8 populære katteracer.",
  alternates: { canonical: "/guides/hvad-koster-en-kat" },
};

const faqs = [
  {
    question: "Hvad koster en kat om måneden?",
    answer: "En kat koster typisk 700–2.200 kr./md. afhængig af race og budgetniveau. En huskat på budgetniveau koster under 700 kr./md., mens en Perser med professionel grooming og forsikring kan koste 2.500+ kr./md.",
  },
  {
    question: "Er det billigere med kat end hund?",
    answer: "Ja, markant. En gennemsnitlig kat koster ca. 1.200 kr./md. mod 2.800 kr./md. for en gennemsnitlig hund. Katte kræver ikke gåture, hundetræning eller hundepassere.",
  },
  {
    question: "Hvad er den billigste katterace?",
    answer: "Huskatten (blandet race) er den billigste katterace med et estimeret månedsforbrug fra 600–700 kr. på budgetniveau. Siameseren er en god balance mellem pris og personlighed.",
  },
];

export default function HvadKosterEnKatPage() {
  const cheapest = getCheapestBreeds("cat", 3);
  const expensive = getMostExpensiveBreeds("cat", 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guider", href: "/guides" },
          { label: "Hvad koster en kat?" },
        ]}
      />
      <h1 className="text-3xl font-bold mb-4">Hvad koster en kat i Danmark?</h1>
      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
        En kat koster typisk <strong>700–2.200 kr. om måneden</strong>. Det er markant billigere
        end en hund. Her er de reelle tal baseret på danske priser.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Foder (budget)", value: "150–220 kr./md." },
          { label: "Forsikring", value: "110–200 kr./md." },
          { label: "Dyrlæge", value: "70–180 kr./md." },
          { label: "Kattegrus", value: "60–120 kr./md." },
        ].map((s) => (
          <div key={s.label} className="bg-muted/50 rounded-xl p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
            <p className="font-bold text-navy-900 text-sm">{s.value}</p>
          </div>
        ))}
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Billigste katteracer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {cheapest.map((b) => <RaceCard key={b.id} breed={b} />)}
        </div>
        <h2 className="text-xl font-bold mb-4">Dyreste katteracer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {expensive.map((b) => <RaceCard key={b.id} breed={b} />)}
        </div>
      </section>

      <MethodologyBox />
      <FAQSection faqs={faqs} />
    </div>
  );
}
