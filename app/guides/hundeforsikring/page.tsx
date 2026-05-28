import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import { AffiliateDisclosure } from "@/components/shared/AffiliateDisclosure";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shared/ProductCard";

export const metadata: Metadata = {
  title: "Hundeforsikring guide 2024 — Er det nødvendigt?",
  description:
    "Er hundeforsikring nødvendigt? Hvad dækker den? Og hvad koster det? Komplet guide til hundeforsikring i Danmark.",
};

const faqs = [
  {
    question: "Er hundeforsikring obligatorisk i Danmark?",
    answer: "Nej, ansvarsforsikring er obligatorisk per loven men sundhedsforsikring er frivillig. Dog anbefales sundhedsforsikring stærkt da veterinære behandlinger kan være meget kostbare.",
  },
  {
    question: "Hvad dækker en hundeforsikring typisk?",
    answer: "En standard hundeforsikring dækker typisk: sygdomsbehandling, ulykker, operationer, kroniske sygdomme, diagnostik og medicin. Premium-forsikringer dækker også tandbehandling og adfærdsbehandling.",
  },
  {
    question: "Hvornår er det for sent at tegne hundeforsikring?",
    answer: "De fleste forsikringsselskaber har karenstid på 30-90 dage. Derudover dækkes sjældent pre-eksisterende sygdomme. Tegn forsikring mens hunden er ung og rask.",
  },
  {
    question: "Hvad koster en hundeforsikring?",
    answer: "Hundeforsikring koster typisk 200–1.200 kr./md. afhængig af race, alder og dækningsniveau. Brachycefale racer (Bulldog, Mops) betaler markant mere pga. høj sundhedsrisiko.",
  },
];

export default function HundeforsikringPage() {
  const insuranceProducts = products.filter((p) => p.category === "hundeforsikring");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guider", href: "/guides" },
          { label: "Hundeforsikring" },
        ]}
      />
      <h1 className="text-3xl font-bold mb-4">Hundeforsikring guide 2024</h1>
      <p className="text-lg text-muted-foreground mb-8">
        En enkelt hundeoperasion kan koste <strong>20.000–50.000 kr.</strong> Et år med
        forsikring koster 2.400–9.600 kr. Regnestykket er simpelt.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Hvornår betaler forsikringen sig?</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-3 px-4 font-medium">Behandling</th>
                <th className="py-3 px-4 text-right font-medium">Gennemsnitspris</th>
                <th className="py-3 px-4 text-right font-medium">Svarende til X mdr. forsikring</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { treatment: "Hofteudskiftning", price: "35.000 kr.", months: "97 mdr." },
                { treatment: "Korsbåndsoperation", price: "22.000 kr.", months: "61 mdr." },
                { treatment: "Maveoperation", price: "15.000 kr.", months: "42 mdr." },
                { treatment: "Allergibehandling (1 år)", price: "8.000 kr.", months: "22 mdr." },
                { treatment: "Tandudtrækning", price: "4.000 kr.", months: "11 mdr." },
              ].map((row) => (
                <tr key={row.treatment}>
                  <td className="py-3 px-4">{row.treatment}</td>
                  <td className="py-3 px-4 text-right font-semibold text-red-700">{row.price}</td>
                  <td className="py-3 px-4 text-right text-muted-foreground">{row.months}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Baseret på gennemsnitspris for forsikring på 360 kr./md.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-5">Sammenlign forsikringsselskaber</h2>
        <AffiliateDisclosure />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          {insuranceProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <FAQSection faqs={faqs} title="FAQ om hundeforsikring" />
    </div>
  );
}
