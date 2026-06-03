import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { InsuranceComparison } from "@/components/shared/InsuranceComparison";
import { FAQSection } from "@/components/shared/FAQSection";
import { RelatedLinks } from "@/components/shared/RelatedLinks";
import { getProductsByCategory } from "@/data/products";
import type { FAQItem } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dyrebudget.dk";

export const metadata: Metadata = {
  title: "Find billigste hundeforsikring 2026 — Sammenlign priser",
  description:
    "Sammenlign de bedste og billigste hundeforsikringer i Danmark. Se pris pr. måned, dækning og vurdering — og find den forsikring der passer til din race.",
  alternates: { canonical: "/find-billigste-hundeforsikring" },
};

const faqs: FAQItem[] = [
  {
    question: "Hvad koster en hundeforsikring i Danmark?",
    answer:
      "En basal hundeforsikring koster typisk 150–300 kr. om måneden, mens en udvidet forsikring til en race med høj sundhedsrisiko kan koste 600–1.200 kr. Prisen afhænger af race, alder, dækningsgrad og selvrisiko.",
  },
  {
    question: "Hvornår skal jeg tegne hundeforsikring?",
    answer:
      "Tegn forsikringen så tidligt som muligt — gerne mens hvalpen er ung og rask. Medfødte lidelser og sygdomme der opstår inden forsikringen tegnes, bliver typisk undtaget fra dækningen.",
  },
  {
    question: "Hvad dækker en hundeforsikring?",
    answer:
      "En syge- og ulykkesforsikring dækker dyrlægebehandling ved sygdom og skader op til et årligt loft. Mange selskaber tilbyder tilvalg som medicin, tandbehandling, fysioterapi og livsforsikring.",
  },
  {
    question: "Kan det betale sig at have hundeforsikring?",
    answer:
      "For de fleste ja. En enkelt operation kan koste 20.000–40.000 kr., hvilket langt overstiger årets præmie. Især racer med kendte sundhedsproblemer (fx fransk bulldog eller gravhund) bør altid være forsikret.",
  },
];

export default function HundeforsikringPage() {
  const products = getProductsByCategory("hundeforsikring");
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
        name: "Find billigste hundeforsikring",
        item: `${SITE_URL}/find-billigste-hundeforsikring`,
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

      <Breadcrumbs items={[{ label: "Find billigste hundeforsikring" }]} />
      <h1 className="text-3xl font-bold mb-4">Find billigste hundeforsikring</h1>
      <p className="text-lg text-muted-foreground mb-10">
        Hundeforsikring kan spare dig for et økonomisk chok når dyrlægeregningen kommer.
        Vi sammenligner pris, dækning og vurdering, så du finder den rette forsikring til din hund.
      </p>

      <InsuranceComparison
        petType="dog"
        products={products}
        bestPick={bestPick}
        bestReasons={[
          "Bred dækning med op til 30.000 kr. om året",
          "Inkl. livsforsikring i basispakken",
          "Høj kundetilfredshed og hurtig sagsbehandling",
          "Dækker både sygdom og ulykke",
        ]}
      />

      <FAQSection faqs={faqs} />

      <RelatedLinks
        links={[
          { href: "/guides/bedste-hundeforsikring", title: "Bedste hundeforsikring 2026", desc: "Dybdegående test og anbefaling" },
          { href: "/guides/hvad-koster-en-hund", title: "Hvad koster en hund?", desc: "Komplet guide til alle udgifter" },
          { href: "/huskeliste", title: "Huskeliste til ny hund", desc: "Alt du skal købe inden hjemkomst" },
          { href: "/beregner", title: "Beregn din hunds udgifter", desc: "Se forsikring i det samlede budget" },
        ]}
      />
    </div>
  );
}
