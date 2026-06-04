import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Info } from "lucide-react";
import { treatments, getTreatmentBySlug } from "@/data/treatments";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import { RelatedLinks } from "@/components/shared/RelatedLinks";
import { formatCurrency } from "@/lib/calculator";
import { generateFAQJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dyrebudget.dk";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = getTreatmentBySlug(slug);
  if (!t) return {};
  return {
    title: `Hvad koster ${t.name.toLowerCase()}? Pris ${new Date().getFullYear()}`,
    description: `${t.name} koster typisk ${formatCurrency(t.priceMin)}–${formatCurrency(
      t.priceMax
    )} hos dyrlægen. Se hvad der påvirker prisen, og om forsikringen dækker.`,
    alternates: { canonical: `/dyrlaege-priser/${slug}` },
  };
}

export default async function TreatmentPage({ params }: Props) {
  const { slug } = await params;
  const t = getTreatmentBySlug(slug);
  if (!t) notFound();

  const animal = t.petType === "dog" ? "hund" : t.petType === "cat" ? "kat" : "hund og kat";
  const insuranceHref =
    t.petType === "cat" ? "/find-billigste-katteforsikring" : "/find-billigste-hundeforsikring";

  const related = treatments
    .filter((o) => o.slug !== t.slug && (o.category === t.category || o.petType === t.petType))
    .slice(0, 4);

  const faqJsonLd = generateFAQJsonLd(t.faqs);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Dyrlægepriser", path: "/dyrlaege-priser" },
    { name: t.shortName, path: `/dyrlaege-priser/${t.slug}` },
  ]);
  // Service/Offer-schema med prisspænd
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t.name,
    serviceType: t.category,
    description: t.description,
    provider: { "@type": "Organization", name: "Dyrlæger i Danmark" },
    areaServed: "DK",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "DKK",
      lowPrice: t.priceMin,
      highPrice: t.priceMax,
      url: `${SITE_URL}/dyrlaege-priser/${t.slug}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs
          items={[{ label: "Dyrlægepriser", href: "/dyrlaege-priser" }, { label: t.shortName }]}
        />

        <span className="inline-block text-xs font-medium px-2.5 py-1 bg-navy-100 text-navy-700 rounded-full mb-3">
          {t.category} · {animal}
        </span>
        <h1 className="text-3xl font-bold mb-4">Hvad koster {t.name.toLowerCase()}?</h1>
        <p className="text-lg text-muted-foreground mb-8">{t.description}</p>

        {/* Pris-hero */}
        <div className="bg-navy-900 text-white rounded-2xl p-6 mb-8">
          <p className="text-navy-300 text-sm mb-1">Typisk pris i Danmark</p>
          <p className="text-3xl font-bold">
            {formatCurrency(t.priceMin)} – {formatCurrency(t.priceMax)}
          </p>
          <p className="text-navy-300 text-sm mt-2">
            Prisspænd hos danske dyrlæger 2025–2026. Indhent altid et konkret tilbud.
          </p>
        </div>

        {/* Hvad er det */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Hvad indebærer det?</h2>
          <p className="text-muted-foreground leading-relaxed">{t.whatIsIt}</p>
        </section>

        {/* Hvad påvirker prisen */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Hvad påvirker prisen?</h2>
          <ul className="space-y-2">
            {t.priceFactors.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Info className="w-4 h-4 text-navy-500 shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Forsikrings-funnel */}
        <div className="bg-mint-50 border border-mint-200 rounded-2xl p-5 mb-10">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-mint-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-navy-900 mb-1">Dækker forsikringen?</p>
              <p className="text-sm text-muted-foreground mb-3">{t.insuranceNote}</p>
              <Link
                href={insuranceHref}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-mint-700 hover:text-mint-800"
              >
                Find billigste {t.petType === "cat" ? "katte" : "hunde"}forsikring
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <FAQSection faqs={t.faqs} title={`Spørgsmål om ${t.shortName.toLowerCase()}`} />

        {related.length > 0 && (
          <RelatedLinks
            links={related.map((o) => ({
              href: `/dyrlaege-priser/${o.slug}`,
              title: `Hvad koster ${o.name.toLowerCase()}?`,
              desc: `${formatCurrency(o.priceMin)}–${formatCurrency(o.priceMax)}`,
            }))}
          />
        )}

        <p className="text-xs text-muted-foreground border-t border-border pt-6 mt-10">
          Priserne er vejledende. Faktiske dyrlægepriser varierer efter klinik, geografi og
          dyrets individuelle behov.{" "}
          <Link href="/dyrlaege-priser" className="text-navy-600 hover:underline font-medium">
            Se alle dyrlægepriser →
          </Link>
        </p>
      </div>
    </>
  );
}
