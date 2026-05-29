"use client";

import type { Product } from "@/types";
import { ExternalLink, Star, ShoppingBag } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { affiliateUrl } from "@/lib/affiliate";
import Link from "next/link";

interface RecommendedProductsProps {
  products: Product[];
  title?: string;
  showAllLink?: boolean;
}

export function RecommendedProducts({
  products,
  title = "Anbefalede produkter",
  showAllLink = true,
}: RecommendedProductsProps) {
  if (products.length === 0) return null;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-base flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-mint-600" />
          {title}
        </h3>
        {showAllLink && (
          <Link
            href="/produkter"
            className="text-xs text-mint-600 hover:text-mint-700 font-medium"
          >
            Se alle →
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {products.map((product) => (
          <MiniProductCard key={product.id} product={product} />
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-3">
        * Affiliatelinks —{" "}
        <Link href="/affiliate" className="underline hover:text-foreground">
          se vores affiliate-politik
        </Link>
      </p>
    </div>
  );
}

function MiniProductCard({ product }: { product: Product }) {
  function handleClick() {
    trackEvent("affiliate_click", {
      productId: product.id,
      productName: product.name,
      affiliatePartner: product.affiliatePartner,
      placement: "recommended_products",
    });
  }

  return (
    <a
      href={affiliateUrl(product.affiliateUrl, { campaign: product.id })}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-navy-200 hover:shadow-sm transition-all group"
    >
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground leading-none mb-0.5">{product.brand}</p>
        <p className="text-sm font-semibold leading-snug truncate">{product.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-bold text-navy-900">{product.price} kr.</span>
          <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            {product.rating}
          </span>
        </div>
      </div>
      <div className="shrink-0">
        <div className="flex items-center gap-1 text-xs font-semibold text-mint-600 group-hover:text-mint-700">
          Se pris
          <ExternalLink className="w-3 h-3" />
        </div>
      </div>
    </a>
  );
}
