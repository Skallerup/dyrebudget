import type { Metadata } from "next";
import { products } from "@/data/products";
import { ProductCatalog } from "@/components/shared/ProductCatalog";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = {
  title: "Produkter — Bedste kæledyrsprodukter til prisen",
  description:
    "Find de bedste hundefoder, kattefoder, forsikringer, loppemidler og tilbehør. Sorteret efter kategori — sammenlign priser og klik videre til vores partnere.",
  alternates: { canonical: "/produkter" },
};

export default function ProdukterPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: "Produkter" }]} />
      <h1 className="text-3xl font-bold mb-2">Kæledyrsprodukter</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Anbefalede produkter baseret på pris, kvalitet og brugeranmeldelser —
        sorteret efter kategori, så du hurtigt finder det rette. Alle links er affiliate-links.
      </p>

      <ProductCatalog products={products} />
    </div>
  );
}
