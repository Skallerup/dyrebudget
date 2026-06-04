import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Stethoscope } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { RelatedLinks } from "@/components/shared/RelatedLinks";
import { treatments, treatmentCategories } from "@/data/treatments";
import { formatCurrency } from "@/lib/calculator";
import { generateBreadcrumbJsonLd } from "@/lib/seo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dyrebudget.dk";

export const metadata: Metadata = {
  title: "Dyrlægepriser 2026 — Hvad koster behandling hos dyrlægen?",
  description:
    "Komplet oversigt over dyrlægepriser i Danmark: kastration, tandrensning, vaccination, røntgen, operationer og mere. Se prisspænd for hund og kat — og hvad forsikringen dækker.",
  alternates: { canonical: "/dyrlaege-priser" },
};

export default function DyrlaegePriserPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Dyrlægepriser", path: "/dyrlaege-priser" },
  ]);

  // ItemList for de mest søgte behandlinger (rich result-potentiale)
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dyrlægepriser i Danmark",
    itemListElement: treatments.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: `${SITE_URL}/dyrlaege-priser/${t.slug}`,
    })),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <Breadcrumbs items={[{ label: "Dyrlægepriser" }]} />

      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center shrink-0">
          <Stethoscope className="w-5 h-5 text-mint-400" />
        </div>
        <h1 className="text-3xl font-bold">Hvad koster dyrlægen i Danmark?</h1>
      </div>
      <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
        Dyrlægeregninger kan svinge voldsomt. Her er en gennemsigtig oversigt over,
        hvad de mest almindelige behandlinger koster — så du kan budgettere og vide,
        hvornår en forsikring betaler sig.
      </p>

      {treatmentCategories.map((category) => {
        const items = treatments.filter((t) => t.category === category);
        if (items.length === 0) return null;
        return (
          <section key={category} className="mb-10">
            <h2 className="text-xl font-bold mb-4">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {items.map((t) => (
                <Link
                  key={t.slug}
                  href={`/dyrlaege-priser/${t.slug}`}
                  className="group flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-navy-300 hover:shadow-sm transition-all"
                >
                  <div>
                    <p className="font-semibold group-hover:text-navy-900 transition-colors">
                      {t.shortName}
                    </p>
                    <p className="text-sm text-mint-700 font-medium">
                      {formatCurrency(t.priceMin)}–{formatCurrency(t.priceMax)}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-navy-900 transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <p className="text-xs text-muted-foreground border-t border-border pt-6 mb-10">
        Priserne er vejledende prisspænd for danske klinikker 2025–2026. Faktiske priser
        varierer efter klinik, geografi, dyrets størrelse og det konkrete forløb. Indhent
        altid et tilbud fra din egen dyrlæge.
      </p>

      <RelatedLinks
        links={[
          { href: "/find-billigste-hundeforsikring", title: "Find billigste hundeforsikring", desc: "Så dækker forsikringen de store regninger" },
          { href: "/find-billigste-katteforsikring", title: "Find billigste katteforsikring", desc: "Sammenlign pris og dækning for katte" },
          { href: "/beregner", title: "Beregn din kæledyrsøkonomi", desc: "Se de samlede udgifter for din race" },
          { href: "/statistik", title: "Kæledyrsstatistik 2026", desc: "Tal og fakta om priser i Danmark" },
        ]}
      />
    </div>
  );
}
