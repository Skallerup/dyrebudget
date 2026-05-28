"use client";

import type { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  function handleAffiliateClick() {
    trackEvent("affiliate_click", {
      productId: product.id,
      productName: product.name,
      affiliatePartner: product.affiliatePartner,
    });
  }

  return (
    <div className="bg-card border border-border rounded-xl p-5 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 mr-3">
          <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
          <h3 className="font-semibold text-sm leading-snug">{product.name}</h3>
        </div>
        {product.featured && (
          <Badge variant="mint" className="shrink-0">
            Anbefalet
          </Badge>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {product.badges.map((badge) => (
          <span key={badge} className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
            {badge}
          </span>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mb-4 flex-1">{product.description}</p>

      <div className="mt-auto">
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-2xl font-bold text-navy-900">{product.price} kr.</p>
            {product.pricePerKg && (
              <p className="text-xs text-muted-foreground">{product.pricePerKg} kr./kg</p>
            )}
            {product.pricePerDay && (
              <p className="text-xs text-mint-600 font-medium">{product.pricePerDay} kr./dag</p>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div>
        </div>

        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleAffiliateClick}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-navy-900 hover:bg-navy-800 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Se pris hos {product.affiliatePartner}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <p className="text-xs text-muted-foreground text-center mt-2">
          *Affiliatelink — se vores{" "}
          <a href="/affiliate" className="underline hover:text-foreground">
            affiliate-politik
          </a>
        </p>
      </div>
    </div>
  );
}
