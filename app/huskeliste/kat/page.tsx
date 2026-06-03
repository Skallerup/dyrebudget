import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ChecklistTool } from "@/components/shared/ChecklistTool";
import { FAQSection } from "@/components/shared/FAQSection";
import { RelatedLinks } from "@/components/shared/RelatedLinks";
import { catChecklist } from "@/data/checklist";
import type { FAQItem } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dyrebudget.dk";

export const metadata: Metadata = {
  title: "Huskeliste til ny kat — Hvad skal du købe? (2026)",
  description:
    "Komplet, interaktiv huskeliste til dig der skal have kat eller killing. Kryds af mens du handler, se prisestimat for hver ting og det samlede startbudget.",
  alternates: { canonical: "/huskeliste/kat" },
  openGraph: {
    title: "Huskeliste til ny kat — Hvad skal du købe?",
    description:
      "Interaktiv tjekliste med prisestimater. Kryds af mens du handler og hold styr på startbudgettet.",
    url: `${SITE_URL}/huskeliste/kat`,
    type: "article",
  },
};

const faqs: FAQItem[] = [
  {
    question: "Hvad koster det at komme i gang med en ny kat?",
    answer:
      "Selve udstyret koster typisk 1.500–5.000 kr. afhængigt af kvalitetsniveau. Oveni kommer anskaffelsesprisen for katten, første dyrlægebesøg, chip og eventuel neutralisation. Brug huskelisten herover til at se et samlet prisestimat.",
  },
  {
    question: "Hvad er vigtigst at have klar inden katten kommer hjem?",
    answer:
      "Kattebakke, grus, foder, skåle, et kradsetræ og et transportbur bør være på plads. Et kradsetræ er afgørende — uden det går katten ofte i gang med møblerne.",
  },
  {
    question: "Skal en indekat også forsikres og chippes?",
    answer:
      "Ja. Sygdom kan ramme uanset om katten er inde eller ude, og chip-registrering er den bedste sikring hvis katten alligevel slipper ud. Forsikring er billigst at tegne mens katten er ung.",
  },
  {
    question: "Gemmes mine afkrydsninger?",
    answer:
      "Ja, dine afkrydsninger gemmes lokalt i din browser, så listen ser ens ud næste gang du åbner siden på samme enhed. Vi sender ingen data nogen steder.",
  },
];

export default function HuskelisteKatPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Huskeliste til ny kat",
    description: "Komplet liste over udstyr og forberedelse til en ny kat i Danmark.",
    itemListElement: catChecklist
      .flatMap((c) => c.items)
      .map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
      })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forside", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Huskeliste", item: `${SITE_URL}/huskeliste` },
      { "@type": "ListItem", position: 3, name: "Ny kat", item: `${SITE_URL}/huskeliste/kat` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Huskeliste", href: "/huskeliste" },
          { label: "Ny kat" },
        ]}
      />
      <h1 className="text-3xl font-bold mb-4">Huskeliste til ny kat</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Skal du have kat eller killing? Her er den komplette tjekliste over alt du skal have klar
        — fra kattebakke og kradsetræ til forsikring og forebyggelse. Kryds af mens du handler,
        og se løbende hvad der mangler, og hvad det koster.
      </p>

      <div className="inline-flex p-1 mb-8 bg-muted rounded-xl">
        <a
          href="/huskeliste"
          className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-navy-900 rounded-lg transition-colors"
        >
          Hund
        </a>
        <span className="px-4 py-2 text-sm font-semibold bg-white text-navy-900 rounded-lg shadow-sm">
          Kat
        </span>
      </div>

      <ChecklistTool
        categories={catChecklist}
        storageKey="dyrebudget-huskeliste-kat"
        animal="kat"
      />

      <div className="mt-10 flex items-center justify-between gap-4 p-5 bg-muted/50 rounded-xl flex-wrap">
        <p className="text-sm font-medium">Skal du have hund i stedet?</p>
        <a
          href="/huskeliste"
          className="text-sm font-semibold text-navy-900 hover:text-navy-700 underline"
        >
          Se huskelisten til ny hund →
        </a>
      </div>

      <FAQSection faqs={faqs} />

      <RelatedLinks
        links={[
          { href: "/find-billigste-katteforsikring", title: "Find billigste katteforsikring", desc: "Sammenlign pris og dækning" },
          { href: "/guides/billigste-katteracer", title: "Billigste katteracer", desc: "De 5 billigste katte at eje" },
          { href: "/beregner", title: "Beregn din kats udgifter", desc: "Personligt budget på 1 minut" },
          { href: "/produkter", title: "Se anbefalede produkter", desc: "Foder, udstyr og tilbehør" },
        ]}
      />
    </div>
  );
}
