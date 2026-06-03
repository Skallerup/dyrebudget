import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { GiftGuide } from "@/components/shared/GiftGuide";
import { FAQSection } from "@/components/shared/FAQSection";
import { RelatedLinks } from "@/components/shared/RelatedLinks";
import { products } from "@/data/products";
import type { FAQItem } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dyrebudget.dk";

export const metadata: Metadata = {
  title: "Julegaver til kat 2026 — De bedste gaveidéer til din kat",
  description:
    "Find den perfekte julegave til katten. Vi guider dig til de bedste gaver i alle prisklasser — fra kradsetræer og kattestiger til legetøj og godbidder.",
  alternates: { canonical: "/guides/julegaver-til-kat" },
  openGraph: {
    title: "Julegaver til kat 2026 — De bedste gaveidéer",
    description:
      "Gaveguide til katten i alle prisklasser. Kradsemøbler, legetøj, godbidder og udstyr.",
    url: `${SITE_URL}/guides/julegaver-til-kat`,
    type: "article",
  },
};

const faqs: FAQItem[] = [
  {
    question: "Hvad er en god julegave til en kat?",
    answer:
      "Katte elsker noget at klatre i og klø på — en kattestige eller et kradsetræ er en gave der bruges hver dag. Jagtlegetøj og fjerpinde stimulerer den naturlige jagtinstinkt, og en pose kvalitetsgodbidder er altid et hit.",
  },
  {
    question: "Hvor meget bør jeg bruge på en gave til katten?",
    answer:
      "Der er gode gaver i alle prisklasser. Sjovt jagtlegetøj fås under 100 kr., mens en designet kattestige eller et kradsemøbel typisk koster 300-600 kr. Vælg ud fra kattens alder og aktivitetsniveau.",
  },
  {
    question: "Hvad med katte der ikke leger så meget?",
    answer:
      "Ældre eller rolige katte sætter ofte pris på en lun hule eller et blødt leje frem for aktivt legetøj. Kattemynte-legetøj kan også vække jagtlysten hos ellers dovne katte.",
  },
];

export default function JulegaverTilKatPage() {
  const catProducts = products.filter(
    (p) => p.petType === "cat" || p.petType === "both"
  );
  const topPick =
    catProducts.find((p) => p.id === "designforpets-kattestige") ?? catProducts[0];

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
        name: "Julegaver til kat",
        item: `${SITE_URL}/guides/julegaver-til-kat`,
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
          { label: "Julegaver til kat" },
        ]}
      />
      <h1 className="text-3xl font-bold mb-4">Julegaver til kat</h1>
      <p className="text-lg text-muted-foreground mb-10">
        Skal katten også forkæles til jul? Her er vores bedste gaveidéer i alle prisklasser
        — fra kradsemøbler og kattestiger til jagtlegetøj og lækre godbidder. Vi har samlet
        gaver der stimulerer kattens naturlige instinkter og holder længe.
      </p>

      <GiftGuide
        petType="cat"
        products={products}
        topPick={topPick}
        topPickReasons={[
          "Skandinavisk design der passer ind i hjemmet",
          "Giver katten klatremuligheder uden at fylde gulvplads",
          "Pladsbesparende vægmontering",
          "Aktiverer katten hver dag — året rundt",
        ]}
      />

      <FAQSection faqs={faqs} />

      <RelatedLinks
        links={[
          { href: "/guides/julegaver-til-hund", title: "Julegaver til hund", desc: "Gaveidéer til hunden i alle prisklasser" },
          { href: "/produkter", title: "Se alle produkter", desc: "Foder, udstyr og tilbehør til kat" },
          { href: "/huskeliste/kat", title: "Huskeliste til ny kat", desc: "Alt du skal købe inden hjemkomst" },
          { href: "/beregner", title: "Beregn din kats udgifter", desc: "Personligt budget på 1 minut" },
        ]}
      />
    </div>
  );
}
