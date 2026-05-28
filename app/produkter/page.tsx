import type { Metadata } from "next";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shared/ProductCard";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { AffiliateDisclosure } from "@/components/shared/AffiliateDisclosure";

export const metadata: Metadata = {
  title: "Produkter — Bedste kæledyrsprodukter til prisen",
  description:
    "Find de bedste hundefoder, kattefoder, forsikringer og tilbehør. Sammenlign priser og klik videre til vores affiliate-partnere.",
};

export default function ProdukterPage() {
  const featured = products.filter((p) => p.featured);
  const rest = products.filter((p) => !p.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: "Produkter" }]} />
      <h1 className="text-3xl font-bold mb-2">Kæledyrsprodukter</h1>
      <p className="text-muted-foreground mb-4">
        Anbefalede produkter baseret på pris, kvalitet og brugeranmeldelser. Alle links er affiliate-links.
      </p>

      <div className="mb-8">
        <AffiliateDisclosure />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-5">Anbefalede produkter</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-5">Alle produkter</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {rest.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
