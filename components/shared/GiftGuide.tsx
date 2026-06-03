import type { Product, ProductCategory } from "@/types";
import { ProductCard } from "@/components/shared/ProductCard";
import { BestInTestBox } from "@/components/shared/BestInTestBox";

const GIFT_CATEGORIES: ProductCategory[] = [
  "legetoj",
  "godbidder",
  "hundesenge",
  "udstyr",
];

interface PriceTier {
  label: string;
  match: (p: Product) => boolean;
}

const tiers: PriceTier[] = [
  { label: "Gaver under 100 kr.", match: (p) => p.price < 100 },
  { label: "Gaver 100–300 kr.", match: (p) => p.price >= 100 && p.price <= 300 },
  { label: "Gaver over 300 kr.", match: (p) => p.price > 300 },
];

interface GiftGuideProps {
  petType: "dog" | "cat";
  products: Product[];
  topPick: Product;
  topPickReasons: string[];
}

export function GiftGuide({ petType, products, topPick, topPickReasons }: GiftGuideProps) {
  const giftProducts = products.filter(
    (p) =>
      (p.petType === petType || p.petType === "both") &&
      GIFT_CATEGORIES.includes(p.category)
  );

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-bold mb-4">Vores topvalg</h2>
        <BestInTestBox
          product={topPick}
          label="Årets gavetip"
          reasons={topPickReasons}
          campaign={`gaveguide-${petType}`}
        />
      </section>

      {tiers.map((tier) => {
        const items = giftProducts.filter(tier.match);
        if (items.length === 0) return null;
        return (
          <section key={tier.label}>
            <h2 className="text-xl font-bold mb-5">{tier.label}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
