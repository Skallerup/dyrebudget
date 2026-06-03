import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { InsuranceComparison } from "@/components/shared/InsuranceComparison";
import { FAQSection } from "@/components/shared/FAQSection";
import { RelatedLinks } from "@/components/shared/RelatedLinks";
import { getProductsByCategory } from "@/data/products";
import type { FAQItem } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dyrebudget.dk";

export const metadata: Metadata = {
  title: "Find billigste katteforsikring 2026 — Sammenlign priser",
  description:
    "Sammenlign de bedste og billigste katteforsikringer i Danmark. Se pris pr. måned, dækning og vurdering — og find den forsikring der passer til din kat.",
  alternates: { canonical: "/find-billigste-katteforsikring" },
};

const faqs: FAQItem[] = [
  {
    question: "Hvad koster en katteforsikring i Danmark?",
    answer:
      "En katteforsikring koster typisk 100–250 kr. om måneden afhængigt af race, alder og dækningsgrad. Racekatte med kendte sundhedsproblemer ligger i den høje ende.",
  },
  {
    question: "Er katteforsikring nødvendig?",
    answer:
      "Det afhænger af kattens race og om den er inde- eller udekat. Udekatte og racekatte med arvelige lidelser har størst gavn af en forsikring, da dyrlægebehandling hurtigt kan løbe op i tusindvis af kroner.",
  },
  {
    question: "Hvad dækker en katteforsikring?",
    answer:
      "Typisk dækkes dyrlægebehandling ved sygdom og ulykke op til et årligt loft. Tilvalg kan omfatte medicin, tandbehandling og livsforsikring.",
  },
  {
    question: "Hvornår bør jeg tegne katteforsikring?",
    answer:
      "Så tidligt som muligt — helst som killing. Sygdomme der allerede er konstateret, eller medfødte lidelser, bliver typisk undtaget fra dækningen.",
  },
];

export default function KatteforsikringPage() {
  const products = getProductsByCategory("katteforsikring");
  const bestPick = products.find((p) => p.featured) ?? products[0];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forside", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Find billigste katteforsikring",
        item: `${SITE_URL}/find-billigste-katteforsikring`,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Breadcrumbs items={[{ label: "Find billigste katteforsikring" }]} />
      <h1 className="text-3xl font-bold mb-4">Find billigste katteforsikring</h1>
      <p className="text-lg text-muted-foreground mb-10">
        Katteforsikring giver tryghed når uheldet er ude. Vi sammenligner pris, dækning og vurdering,
        så du finder den rette forsikring til din kat.
      </p>

      <InsuranceComparison
        petType="cat"
        products={products}
        bestPick={bestPick}
        bestReasons={[
          "Komplet dækning med op til 25.000 kr. om året",
          "Dækker både sygdom og ulykke",
          "Høj kundetilfredshed",
          "Mulighed for tilvalg af udvidet dækning",
        ]}
      />

      <FAQSection faqs={faqs} />

      <RelatedLinks
        links={[
          { href: "/guides/bedste-katteforsikring", title: "Bedste katteforsikring 2026", desc: "Hvornår kan det betale sig?" },
          { href: "/guides/hvad-koster-en-kat", title: "Hvad koster en kat?", desc: "Komplet guide til alle udgifter" },
          { href: "/huskeliste/kat", title: "Huskeliste til ny kat", desc: "Alt du skal købe inden hjemkomst" },
          { href: "/beregner", title: "Beregn din kats udgifter", desc: "Se forsikring i det samlede budget" },
        ]}
      />
    </div>
  );
}
