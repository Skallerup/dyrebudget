"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/types";
import { Star, ExternalLink, ArrowUpDown } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { affiliateUrl } from "@/lib/affiliate";

type SortKey = "price-asc" | "price-desc" | "rating";

interface ProductComparisonTableProps {
  products: Product[];
  /** Label for the price column, e.g. "Pris/md." for insurance */
  priceLabel?: string;
  /** UTM campaign tag for outgoing links */
  campaign?: string;
  placement?: string;
}

export function ProductComparisonTable({
  products,
  priceLabel = "Pris",
  campaign = "comparison-table",
  placement = "comparison_table",
}: ProductComparisonTableProps) {
  const [sort, setSort] = useState<SortKey>("price-asc");

  const sorted = useMemo(() => {
    const copy = products.slice();
    switch (sort) {
      case "price-asc":
        return copy.sort((a, b) => a.price - b.price);
      case "price-desc":
        return copy.sort((a, b) => b.price - a.price);
      case "rating":
        return copy.sort((a, b) => b.rating - a.rating);
    }
  }, [products, sort]);

  const cheapest = useMemo(
    () => products.reduce((min, p) => (p.price < min.price ? p : min), products[0]),
    [products]
  );

  function handleClick(product: Product) {
    trackEvent("affiliate_click", {
      productId: product.id,
      productName: product.name,
      affiliatePartner: product.affiliatePartner,
      placement,
    });
  }

  if (products.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Sortér:</span>
        {(
          [
            { key: "price-asc" as SortKey, label: "Billigst" },
            { key: "price-desc" as SortKey, label: "Dyrest" },
            { key: "rating" as SortKey, label: "Højest vurdering" },
          ]
        ).map((opt) => (
          <button
            key={opt.key}
            onClick={() => setSort(opt.key)}
            className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
              sort === opt.key
                ? "bg-navy-900 text-white"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left py-3 px-4 font-medium">Produkt</th>
              <th className="py-3 px-4 text-center font-medium whitespace-nowrap">{priceLabel}</th>
              <th className="py-3 px-4 text-center font-medium">Vurdering</th>
              <th className="py-3 px-4 text-left font-medium hidden md:table-cell">Fordele</th>
              <th className="py-3 px-4 text-center font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sorted.map((p) => {
              const isCheapest = p.id === cheapest.id;
              return (
                <tr key={p.id} className={isCheapest ? "bg-mint-50/50" : "hover:bg-muted/20"}>
                  <td className="py-3 px-4">
                    <div className="font-semibold leading-tight">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.brand}</div>
                    {isCheapest && (
                      <span className="inline-block mt-1 text-xs font-semibold text-mint-700 bg-mint-100 px-2 py-0.5 rounded-full">
                        Billigst
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-navy-900 whitespace-nowrap">
                    {p.price} kr.
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      {p.rating}
                    </span>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {p.badges.slice(0, 3).map((b) => (
                        <span key={b} className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                          {b}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <a
                      href={affiliateUrl(p.affiliateUrl, { campaign })}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      onClick={() => handleClick(p)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                    >
                      Se pris
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mt-2">*Affiliatelinks — priser er vejledende og kan variere.</p>
    </div>
  );
}
