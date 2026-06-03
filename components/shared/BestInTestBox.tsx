"use client";

import type { Product } from "@/types";
import { Award, Star, ExternalLink, Check } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { affiliateUrl } from "@/lib/affiliate";

interface BestInTestBoxProps {
  product: Product;
  /** Editorial label, e.g. "Bedst i test" or "Bedst til prisen" */
  label?: string;
  /** Short reasons this product is the pick */
  reasons: string[];
  campaign?: string;
}

export function BestInTestBox({
  product,
  label = "Bedst i test",
  reasons,
  campaign = "best-in-test",
}: BestInTestBoxProps) {
  function handleClick() {
    trackEvent("affiliate_click", {
      productId: product.id,
      productName: product.name,
      affiliatePartner: product.affiliatePartner,
      placement: "best_in_test",
    });
  }

  return (
    <div className="relative rounded-2xl border-2 border-amber-300 bg-amber-50/60 p-6 overflow-hidden">
      <div className="absolute top-0 right-0">
        <div className="flex items-center gap-1.5 bg-amber-400 text-amber-950 text-xs font-bold px-3 py-1.5 rounded-bl-xl">
          <Award className="w-3.5 h-3.5" />
          {label}
        </div>
      </div>

      <div className="flex items-start gap-2 mb-1 pr-24">
        <p className="text-xs font-medium text-amber-700">{product.brand}</p>
      </div>
      <h3 className="text-lg font-bold mb-2">{product.name}</h3>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl font-bold text-navy-900">{product.price} kr.</span>
        {product.pricePerKg && (
          <span className="text-sm text-muted-foreground">{product.pricePerKg} kr./kg</span>
        )}
        <span className="flex items-center gap-1 text-sm font-medium">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          {product.rating}
        </span>
      </div>

      <ul className="space-y-2 mb-5">
        {reasons.map((reason) => (
          <li key={reason} className="flex items-start gap-2 text-sm">
            <Check className="w-4 h-4 text-mint-600 shrink-0 mt-0.5" strokeWidth={3} />
            <span>{reason}</span>
          </li>
        ))}
      </ul>

      <a
        href={affiliateUrl(product.affiliateUrl, { campaign })}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handleClick}
        className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-lg transition-colors"
      >
        Se pris hos {product.affiliatePartner}
        <ExternalLink className="w-4 h-4" />
      </a>
      <p className="text-xs text-muted-foreground text-center mt-2">*Affiliatelink</p>
    </div>
  );
}
