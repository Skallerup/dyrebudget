import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shared/ProductCard";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bedste katteforsikring 2026 — Sammenligning og guide",
  description:
    "Find den bedste katteforsikring i Danmark 2026. Vi sammenligner dækning, pris og karens — og forklarer hvornår forsikring kan betale sig.",
  alternates: { canonical: "/guides/bedste-katteforsikring" },
};

const faqs = [
  {
    question: "Er katteforsikring nødvendig?",
    answer:
      "Det afhænger af racen. Racer med høj sundhedsrisiko som Maine Coon, Ragdoll, Sphynx og Scottish Fold har statistisk set langt højere dyrlægeomkostninger. Én operation kan koste 10.000–30.000 kr. For disse racer er forsikring stærkt anbefalet.",
  },
  {
    question: "Hvad koster katteforsikring om måneden?",
    answer:
      "Katteforsikring koster typisk 100–400 kr./md. afhængig af race, alder og dækningsniveau. Indekattte betaler generelt lidt mindre end udekatte pga. lavere risikoprofil.",
  },
  {
    question: "Dækker katteforsikring arvelige sygdomme?",
    answer:
      "Nogle selskaber dækker arvelige sygdomme hvis de ikke er diagnosticeret ved tegning. Agria er generelt mest generøs på dette punkt. Tjek altid det fine print for din specifikke race.",
  },
  {
    question: "Hvornår skal jeg tegne katteforsikring?",
    answer:
      "Tegn forsikring mens katten er ung og rask — helst inden 1 år. De fleste selskaber har karenstid på 30–90 dage, og pre-eksisterende sygdomme dækkes aldrig.",
  },
  {
    question: "Er indekatte billigere at forsikre?",
    answer:
      "Ja, generelt. Indekatte har lavere risiko for trafikskader, katte-slagsmål og smitsomme sygdomme. Mange selskaber tilbyder lavere præmie for katte der udelukkende er indekatte.",
  },
];

const comparisonData = [
  {
    name: "Agria Katteforsikring",
    price: "Fra 169 kr./md.",
    coverage: "Op til 25.000 kr./år",
    hereditary: true,
    indoor: true,
    rating: 4.5,
    verdict: "Bedst til høj-risiko racer",
    href: "https://www.agria.dk/kat/",
  },
];

export default function BedsteKatteforsikringPage() {
  const insuranceProducts = products.filter((p) => p.category === "katteforsikring");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guider", href: "/guides" },
          { label: "Bedste katteforsikring" },
        ]}
      />

      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-mint-600 mb-2 block">
          Guide · Opdateret 2026
        </span>
        <h1 className="text-3xl font-bold mb-3">Bedste katteforsikring 2026</h1>
        <p className="text-muted-foreground text-lg">
          En stor dyrlægeregning kan komme uventet. Vi gennemgår hvornår katteforsikring kan
          betale sig — og hvilken der giver mest dækning for pengene.
        </p>
      </div>

      {/* Hurtig anbefaling */}
      <div className="mt-8 p-5 bg-navy-900 text-white rounded-2xl">
        <p className="text-sm font-semibold text-navy-300 mb-1">Vores anbefaling</p>
        <p className="font-bold text-lg mb-1">Agria anbefales til racer med sundhedsrisiko</p>
        <p className="text-sm text-navy-300">
          Maine Coon, Ragdoll, Sphynx, Scottish Fold og Burmese har højere risiko for arvelige
          sygdomme og dyre behandlinger. For blandingskatte og huskat kan en billigere løsning
          eller månedlig opsparing være tilstrækkeligt.
        </p>
      </div>

      {/* Sammenligningstabel */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-5">Oversigt: Katteforsikring</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left px-4 py-3 font-semibold">Forsikring</th>
                <th className="text-left px-4 py-3 font-semibold">Pris</th>
                <th className="text-left px-4 py-3 font-semibold">Maks. dækning</th>
                <th className="text-center px-4 py-3 font-semibold">Arvelige sygdomme</th>
                <th className="text-center px-4 py-3 font-semibold">Indekat-rabat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {comparisonData.map((ins) => (
                <tr key={ins.name} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-4">
                    <p className="font-semibold">{ins.name}</p>
                    <p className="text-xs text-mint-600 font-medium">{ins.verdict}</p>
                  </td>
                  <td className="px-4 py-4 font-semibold text-navy-900">{ins.price}</td>
                  <td className="px-4 py-4">{ins.coverage}</td>
                  <td className="px-4 py-4 text-center">
                    {ins.hereditary ? (
                      <CheckCircle className="w-5 h-5 text-mint-600 mx-auto" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                    )}
                  </td>
                  <td className="px-4 py-4 text-center">
                    {ins.indoor ? (
                      <CheckCircle className="w-5 h-5 text-mint-600 mx-auto" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Produktkort */}
      {insuranceProducts.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-5">Se aktuelle priser</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {insuranceProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Hvornår er forsikring relevant */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Hvornår er forsikring relevant for din kat?</h2>
        <div className="space-y-3">
          {[
            {
              icon: AlertTriangle,
              color: "text-red-500",
              bg: "bg-red-50",
              title: "Høj-risiko racer — stærkt anbefalet",
              text: "Maine Coon (hjertesygdom HCM), Ragdoll (HCM), Sphynx (hudproblemer, hjerte), Scottish Fold (osteokondrodysplasi) og Burmese har statistisk høje dyrlægeomkostninger. Én hjerteoperation koster 15.000–40.000 kr.",
            },
            {
              icon: CheckCircle,
              color: "text-amber-500",
              bg: "bg-amber-50",
              title: "Udekatte — moderat risiko",
              text: "Katte med adgang til det fri har højere risiko for trafikskader, katteslagsmål og smitte. En forsikring giver ro i maven hvis uheldet er ude.",
            },
            {
              icon: CheckCircle,
              color: "text-mint-600",
              bg: "bg-mint-50",
              title: "Indekatte og blandingskatte — overvej alternativ",
              text: "Europæisk Korthår og blandingskatte der lever indendørs har generelt god helbred. Her kan 300 kr./md. i opsparing over et par år give dig en buffer til de fleste dyrlægeregninger.",
            },
          ].map(({ icon: Icon, color, bg, title, text }) => (
            <div key={title} className={`flex gap-3 p-4 rounded-xl ${bg}`}>
              <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${color}`} />
              <div>
                <p className="font-semibold text-sm mb-1">{title}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Beregner CTA */}
      <div className="mt-10 p-6 bg-navy-900 text-white rounded-2xl text-center">
        <p className="font-bold text-lg mb-2">Hvad koster din katterace om måneden?</p>
        <p className="text-navy-300 text-sm mb-4">
          Brug vores beregner og se den samlede månedspris inkl. forsikring, foder og dyrlæge.
        </p>
        <Link
          href="/beregner"
          className="inline-flex items-center gap-2 px-6 py-3 bg-mint-600 hover:bg-mint-500 text-white font-semibold rounded-xl transition-colors"
        >
          Beregn din kats udgifter →
        </Link>
      </div>

      <div className="mt-10">
        <FAQSection faqs={faqs} title="Spørgsmål om katteforsikring" />
      </div>
    </div>
  );
}
