import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products } from "@/data/products";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Star, ExternalLink, Tag, Shield } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Anmeldelse og pris 2026`,
    description: `${product.description} Pris: ${product.price} kr. Se vores vurdering og klik videre til ${product.affiliatePartner}.`,
    alternates: { canonical: `/produkter/${slug}` },
  };
}

function categoryLabel(category: string): string {
  const map: Record<string, string> = {
    hundefoder: "Hundefoder",
    kattefoder: "Kattefoder",
    hundeforsikring: "Hundeforsikring",
    katteforsikring: "Katteforsikring",
    udstyr: "Udstyr",
    sundhed: "Sundhed & medicin",
    godbidder: "Godbidder",
    tilbehoer: "Tilbehør",
  };
  return map[category] ?? category;
}

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
    />
  ));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "DKK",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      bestRating: 5,
      ratingCount: 47,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs
          items={[
            { label: "Produkter", href: "/produkter" },
            { label: product.name },
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Main info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium px-2 py-0.5 bg-navy-100 text-navy-700 rounded-full">
                {categoryLabel(product.category)}
              </span>
              {product.badges.map((badge) => (
                <span key={badge} className="text-xs font-medium px-2 py-0.5 bg-mint-100 text-mint-700 rounded-full">
                  {badge}
                </span>
              ))}
            </div>

            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-sm text-muted-foreground mb-4">af {product.brand}</p>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">/ 5</span>
            </div>

            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              {product.description}
            </p>

            {(product.pricePerKg ?? product.pricePerDay) && (
              <div className="flex gap-4 mb-6">
                {product.pricePerKg && (
                  <div className="flex items-center gap-1.5 text-sm">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Pris/kg:</span>
                    <span className="font-semibold">{product.pricePerKg} kr.</span>
                  </div>
                )}
                {product.pricePerDay && (
                  <div className="flex items-center gap-1.5 text-sm">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Pris/dag:</span>
                    <span className="font-semibold">{product.pricePerDay} kr.</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5" />
              <span>
                Affiliate-link til {product.affiliatePartner}. Vi modtager provision ved køb — det påvirker ikke vores vurdering.
              </span>
            </div>
          </div>

          {/* Price box */}
          <div className="md:col-span-1">
            <div className="sticky top-6 p-6 bg-card border border-border rounded-2xl shadow-sm">
              <p className="text-3xl font-bold text-navy-900 mb-1">{product.price} kr.</p>
              <p className="text-xs text-muted-foreground mb-5">Vejledende pris</p>

              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-mint-600 hover:bg-mint-500 text-white font-semibold rounded-xl transition-colors text-sm"
              >
                Gå til {product.affiliatePartner}
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="mt-4 space-y-2">
                {product.badges.map((badge) => (
                  <div key={badge} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-mint-500 shrink-0" />
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold mb-5">Lignende produkter</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/produkter/${p.slug}`}
                  className="p-4 bg-card border border-border rounded-xl hover:border-navy-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(p.rating)}
                    <span className="text-xs text-muted-foreground ml-1">{p.rating.toFixed(1)}</span>
                  </div>
                  <p className="font-medium text-sm mb-1 line-clamp-2">{p.name}</p>
                  <p className="text-sm font-bold text-navy-900">{p.price} kr.</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
