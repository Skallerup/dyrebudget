import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { GiftGuide } from "@/components/shared/GiftGuide";
import { FAQSection } from "@/components/shared/FAQSection";
import { RelatedLinks } from "@/components/shared/RelatedLinks";
import { products } from "@/data/products";
import type { FAQItem } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dyrebudget.dk";

export const metadata: Metadata = {
  title: "Julegaver til hund 2026 — De bedste gaveidéer til din hund",
  description:
    "Find den perfekte julegave til hunden. Vi guider dig til de bedste gaver i alle prisklasser — fra hyggelige hundekurve til legetøj og godbidder.",
  alternates: { canonical: "/guides/julegaver-til-hund" },
  openGraph: {
    title: "Julegaver til hund 2026 — De bedste gaveidéer",
    description:
      "Gaveguide til hunden i alle prisklasser. Hundekurve, legetøj, godbidder og udstyr.",
    url: `${SITE_URL}/guides/julegaver-til-hund`,
    type: "article",
  },
};

const faqs: FAQItem[] = [
  {
    question: "Hvad er en god julegave til en hund?",
    answer:
      "Det afhænger af hunden. Aktive hunde elsker holdbart aktiveringslegetøj, mens ældre hunde sætter pris på en blød, varm hundekurv. Godbidder af høj kvalitet er en sikker vinder til næsten alle hunde.",
  },
  {
    question: "Hvor meget bør jeg bruge på en gave til hunden?",
    answer:
      "Der er gode gaver i alle prisklasser. En sjov legetøjsgave fås under 100 kr., mens en kvalitetshundekurv eller et aktiveringsprodukt typisk ligger mellem 300 og 800 kr. Det vigtigste er, at gaven passer til hundens størrelse og temperament.",
  },
  {
    question: "Er det sikkert at give hunden legetøj som gave?",
    answer:
      "Vælg altid legetøj der passer til hundens størrelse og tyggestyrke, og hold øje med hunden de første gange. Undgå små dele der kan sluges, og vælg robuste materialer til kraftige tyggere.",
  },
];

export default function JulegaverTilHundPage() {
  const dogProducts = products.filter(
    (p) => p.petType === "dog" || p.petType === "both"
  );
  const topPick =
    dogProducts.find((p) => p.id === "bydoodledog-hundekurv") ?? dogProducts[0];

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
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Julegaver til hund",
        item: `${SITE_URL}/guides/julegaver-til-hund`,
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

      <Breadcrumbs
        items={[
          { label: "Guides", href: "/guides" },
          { label: "Julegaver til hund" },
        ]}
      />
      <h1 className="text-3xl font-bold mb-4">Julegaver til hund</h1>
      <p className="text-lg text-muted-foreground mb-10">
        Skal hunden også forkæles til jul? Her er vores bedste gaveidéer i alle prisklasser
        — fra hyggelige hundekurve og aktiveringslegetøj til lækre godbidder. Vi har samlet
        gaver der både glæder hunden og holder længe.
      </p>

      <GiftGuide
        petType="dog"
        products={products}
        topPick={topPick}
        topPickReasons={[
          "Blød sherpa-fleece der holder hunden varm hele vinteren",
          "Aftageligt og maskinvaskbart betræk",
          "Robust kvalitet der holder år efter år",
          "En gave hunden bruger hver eneste dag",
        ]}
      />

      <FAQSection faqs={faqs} />

      <RelatedLinks
        links={[
          { href: "/guides/julegaver-til-kat", title: "Julegaver til kat", desc: "Gaveidéer til katten i alle prisklasser" },
          { href: "/produkter", title: "Se alle produkter", desc: "Foder, udstyr og tilbehør til hund" },
          { href: "/huskeliste", title: "Huskeliste til ny hund", desc: "Alt du skal købe inden hjemkomst" },
          { href: "/beregner", title: "Beregn din hunds udgifter", desc: "Personligt budget på 1 minut" },
        ]}
      />
    </div>
  );
}
