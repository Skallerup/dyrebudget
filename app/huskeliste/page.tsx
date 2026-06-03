import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ChecklistTool } from "@/components/shared/ChecklistTool";
import { FAQSection } from "@/components/shared/FAQSection";
import { RelatedLinks } from "@/components/shared/RelatedLinks";
import { dogChecklist } from "@/data/checklist";
import type { FAQItem } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dyrebudget.dk";

export const metadata: Metadata = {
  title: "Huskeliste til ny hund — Hvad skal du købe? (2026)",
  description:
    "Komplet, interaktiv huskeliste til dig der skal købe hund. Kryds af mens du handler, se prisestimat for hver ting og det samlede startbudget. Hund, hvalp og udstyr.",
  alternates: { canonical: "/huskeliste" },
  openGraph: {
    title: "Huskeliste til ny hund — Hvad skal du købe?",
    description:
      "Interaktiv tjekliste med prisestimater. Kryds af mens du handler og hold styr på startbudgettet.",
    url: `${SITE_URL}/huskeliste`,
    type: "article",
  },
};

const faqs: FAQItem[] = [
  {
    question: "Hvad koster det at komme i gang med en ny hund?",
    answer:
      "Selve udstyret koster typisk 2.000–8.000 kr. afhængigt af kvalitetsniveau. Oveni kommer anskaffelsesprisen for hunden (8.000–20.000 kr. for en racehund), første dyrlægebesøg og foder. Brug huskelisten herover til at se et samlet prisestimat for netop dine valg.",
  },
  {
    question: "Hvad er det vigtigste at købe først?",
    answer:
      "De ting der er markeret 'Vigtigst' bør være på plads inden hunden kommer hjem: seng, transportbur, foder, skåle, sele, snor, ID-tegn, loppe-/flåtbeskyttelse og en hundeforsikring. Resten kan købes løbende.",
  },
  {
    question: "Skal jeg tegne forsikring med det samme?",
    answer:
      "Ja — det anbefales at tegne hundeforsikring fra dag ét. En enkelt operation kan koste 20.000 kr. eller mere, og medfødte/tidlige lidelser kan blive undtaget hvis du venter med at forsikre.",
  },
  {
    question: "Gemmes mine afkrydsninger?",
    answer:
      "Ja, dine afkrydsninger gemmes lokalt i din browser, så listen ser ens ud næste gang du åbner siden på samme enhed. Vi sender ingen data nogen steder.",
  },
];

export default function HuskelistePage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Huskeliste til ny hund",
    description: "Komplet liste over udstyr og forberedelse til en ny hund i Danmark.",
    itemListElement: dogChecklist
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
      { "@type": "ListItem", position: 2, name: "Huskeliste til ny hund", item: `${SITE_URL}/huskeliste` },
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

      <Breadcrumbs items={[{ label: "Huskeliste til ny hund" }]} />
      <h1 className="text-3xl font-bold mb-4">Huskeliste til ny hund</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Skal du købe hund? Her er den komplette tjekliste over alt du skal have klar
        — fra seng og foder til forsikring og forebyggelse. Kryds af mens du handler,
        og se løbende hvad der mangler, og hvad det koster.
      </p>

      <div className="inline-flex p-1 mb-8 bg-muted rounded-xl">
        <span className="px-4 py-2 text-sm font-semibold bg-white text-navy-900 rounded-lg shadow-sm">
          Hund
        </span>
        <a
          href="/huskeliste/kat"
          className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-navy-900 rounded-lg transition-colors"
        >
          Kat
        </a>
      </div>

      <ChecklistTool
        categories={dogChecklist}
        storageKey="dyrebudget-huskeliste-hund"
        animal="hund"
      />

      <div className="mt-10 flex items-center justify-between gap-4 p-5 bg-muted/50 rounded-xl flex-wrap">
        <p className="text-sm font-medium">Skal du have kat i stedet?</p>
        <a
          href="/huskeliste/kat"
          className="text-sm font-semibold text-navy-900 hover:text-navy-700 underline"
        >
          Se huskelisten til ny kat →
        </a>
      </div>

      <FAQSection faqs={faqs} />

      <RelatedLinks
        links={[
          { href: "/find-billigste-hundeforsikring", title: "Find billigste hundeforsikring", desc: "Sammenlign pris og dækning" },
          { href: "/guides/hvalpe-budget", title: "Budget til din første hvalp", desc: "Alle udgifter det første år" },
          { href: "/beregner", title: "Beregn din hunds udgifter", desc: "Personligt budget på 1 minut" },
          { href: "/produkter", title: "Se anbefalede produkter", desc: "Foder, udstyr og tilbehør" },
        ]}
      />
    </div>
  );
}
