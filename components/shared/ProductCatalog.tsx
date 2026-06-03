"use client";

import { useMemo, useState } from "react";
import type { Product, ProductCategory } from "@/types";
import { productCategories } from "@/lib/productCategories";
import { ProductCard } from "@/components/shared/ProductCard";
import {
  Bone,
  Fish,
  Cookie,
  Shield,
  ShieldCheck,
  Bug,
  BedDouble,
  ToyBrick,
  Box,
  Package,
  PawPrint,
  type LucideIcon,
} from "lucide-react";

const categoryIcons: Record<ProductCategory, LucideIcon> = {
  hundefoder: Bone,
  kattefoder: Fish,
  godbidder: Cookie,
  hundeforsikring: Shield,
  katteforsikring: ShieldCheck,
  "loppe-og-flaat": Bug,
  hundesenge: BedDouble,
  legetoj: ToyBrick,
  kattegrus: Box,
  udstyr: Package,
};

type PetFilter = "all" | "dog" | "cat";

const petFilters: { value: PetFilter; label: string }[] = [
  { value: "all", label: "Alle" },
  { value: "dog", label: "Hund" },
  { value: "cat", label: "Kat" },
];

interface ProductCatalogProps {
  products: Product[];
}

export function ProductCatalog({ products }: ProductCatalogProps) {
  const [petFilter, setPetFilter] = useState<PetFilter>("all");

  const visibleProducts = useMemo(() => {
    if (petFilter === "all") return products;
    return products.filter((p) => p.petType === petFilter || p.petType === "both");
  }, [products, petFilter]);

  const sections = useMemo(() => {
    return productCategories
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((cat) => ({
        meta: cat,
        items: visibleProducts.filter((p) => p.category === cat.slug),
      }))
      .filter((s) => s.items.length > 0);
  }, [visibleProducts]);

  return (
    <div>
      {/* Filtre */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="inline-flex rounded-lg border border-border p-1 bg-card">
          {petFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setPetFilter(f.value)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                petFilter === f.value
                  ? "bg-navy-900 text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          {visibleProducts.length} produkter i {sections.length} kategorier
        </p>
      </div>

      {/* Kategori-navigation (anchor-links) */}
      <nav className="flex flex-wrap gap-2 mb-10">
        {sections.map(({ meta, items }) => {
          const Icon = categoryIcons[meta.slug] ?? PawPrint;
          return (
            <a
              key={meta.slug}
              href={`#${meta.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-muted hover:bg-navy-100 hover:text-navy-800 rounded-full transition-colors"
            >
              <Icon className="w-3.5 h-3.5" />
              {meta.label}
              <span className="text-xs text-muted-foreground">({items.length})</span>
            </a>
          );
        })}
      </nav>

      {/* Sektioner pr. kategori */}
      <div className="space-y-14">
        {sections.map(({ meta, items }) => {
          const Icon = categoryIcons[meta.slug] ?? PawPrint;
          return (
            <section key={meta.slug} id={meta.slug} className="scroll-mt-24">
              <div className="flex items-start gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-navy-100 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-navy-700" />
                </div>
                <div>
                  <h2 className="text-xl font-bold leading-tight">{meta.label}</h2>
                  <p className="text-sm text-muted-foreground">{meta.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {sections.length === 0 && (
        <p className="text-center text-muted-foreground py-16">
          Ingen produkter matcher dit filter.
        </p>
      )}
    </div>
  );
}
