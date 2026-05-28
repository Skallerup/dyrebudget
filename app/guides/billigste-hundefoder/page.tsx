import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shared/ProductCard";
import { AffiliateDisclosure } from "@/components/shared/AffiliateDisclosure";

export const metadata: Metadata = {
  title: "Bedste hundefoder til prisen 2024 — Sammenligning",
  description:
    "Sammenligning af hundefoder ud fra pris pr. kg, næringsindhold og kvalitet. Find det bedste hundefoder til dit budget.",
};

const foderTabel = [
  { category: "Budget tørfoder", priceKg: "15–25 kr.", priceDay: "7–12 kr.", quality: "Basis" },
  { category: "Medium tørfoder", priceKg: "25–45 kr.", priceDay: "12–22 kr.", quality: "God" },
  { category: "Premium tørfoder", priceKg: "45–80 kr.", priceDay: "22–40 kr.", quality: "Udmærket" },
  { category: "Grain-free premium", priceKg: "60–100 kr.", priceDay: "30–50 kr.", quality: "Excellent" },
  { category: "Råkost (BARF)", priceKg: "40–80 kr.", priceDay: "35–70 kr.", quality: "Variabel" },
];

export default function BilligsteHundefodePage() {
  const dogFood = products.filter((p) => p.category === "hundefoder");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guider", href: "/guides" },
          { label: "Bedste hundefoder til prisen" },
        ]}
      />
      <h1 className="text-3xl font-bold mb-4">Bedste hundefoder til prisen</h1>
      <p className="text-muted-foreground mb-8">
        Foder er den største løbende udgift for de fleste hundejere. Her er en ærlig sammenligning.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Prisoversigt pr. kategori</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-3 px-4 font-medium">Kategori</th>
                <th className="py-3 px-4 text-center font-medium">Pris pr. kg</th>
                <th className="py-3 px-4 text-center font-medium">Pris pr. dag*</th>
                <th className="py-3 px-4 text-center font-medium">Kvalitet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {foderTabel.map((row) => (
                <tr key={row.category}>
                  <td className="py-3 px-4 font-medium">{row.category}</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">{row.priceKg}</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">{row.priceDay}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      row.quality === "Excellent" ? "bg-green-100 text-green-800" :
                      row.quality === "Udmærket" ? "bg-mint-100 text-mint-800" :
                      row.quality === "God" ? "bg-blue-100 text-blue-800" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {row.quality}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">* Baseret på 25 kg hund</p>
      </section>

      <AffiliateDisclosure />
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-5">Anbefalede produkter</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dogFood.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
