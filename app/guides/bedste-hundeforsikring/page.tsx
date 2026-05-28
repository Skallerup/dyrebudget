import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import { AffiliateDisclosure } from "@/components/shared/AffiliateDisclosure";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shared/ProductCard";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bedste hundeforsikring 2026 — Agria vs Tryg og flere",
  description:
    "Vi sammenligner de bedste hundeforsikringer i Danmark 2026. Se dækningsomfang, pris og anmeldelser — og find den forsikring der passer til din hund.",
  alternates: { canonical: "/guides/bedste-hundeforsikring" },
};

const faqs = [
  {
    question: "Hvilken hundeforsikring er bedst i Danmark?",
    answer:
      "Agria er generelt bedst til bred dækning og høje erstatningsbeløb — særlig til racer med høj sundhedsrisiko. Tryg er billigst og godt til racer med lav risiko. Sammenlign altid tilbud baseret på din race og alder.",
  },
  {
    question: "Hvad koster hundeforsikring om måneden?",
    answer:
      "Hundeforsikring koster typisk 200–1.200 kr./md. afhængig af race, alder og dækningsniveau. Brachycefale racer (Mops, Bulldog, Chow-chow) betaler markant mere pga. høj sundhedsrisiko.",
  },
  {
    question: "Hvornår skal jeg tegne hundeforsikring?",
    answer:
      "Tegn forsikring mens hunden er ung og rask. De fleste selskaber har 30–90 dages karenstid, og pre-eksisterende sygdomme dækkes ikke. Jo tidligere du tegner, jo bedre dækning får du.",
  },
  {
    question: "Dækker hundeforsikring arvelige sygdomme?",
    answer:
      "Det afhænger af selskabet og produktet. Agria dækker generelt arvelige sygdomme hvis de ikke er diagnosticeret ved tegning. Læs altid det fine print for din specifikke race.",
  },
  {
    question: "Er det billigere at spare op end at tegne forsikring?",
    answer:
      "Nej for de fleste — én større operation koster 15.000–60.000 kr. En god forsikring dækker dette for 2.500–15.000 kr./år. Opsparingen kræver disciplin og mange år for at nå samme beløb.",
  },
];

const comparisonData = [
  {
    name: "Agria Basis",
    price: "289 kr./md.",
    coverage: "Op til 30.000 kr./år",
    hereditary: true,
    dental: false,
    cancellation: "Ingen binding",
    rating: 4.4,
    verdict: "Bedst til høj-risiko racer",
    href: "https://www.agria.dk/hund/",
    partner: "Agria",
  },
  {
    name: "Tryg Hundeforsikring",
    price: "Fra 249 kr./md.",
    coverage: "Op til 20.000 kr./behandling",
    hereditary: false,
    dental: false,
    cancellation: "1 måneds opsigelse",
    rating: 4.2,
    verdict: "Billigst til sunde racer",
    href: "https://www.tryg.dk/forsikringer/hund",
    partner: "Tryg",
  },
];

export default function BedsteHundeforsikringPage() {
  const insuranceProducts = products.filter((p) => p.category === "hundeforsikring");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guider", href: "/guides" },
          { label: "Bedste hundeforsikring" },
        ]}
      />

      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-mint-600 mb-2 block">
          Guide · Opdateret 2026
        </span>
        <h1 className="text-3xl font-bold mb-3">
          Bedste hundeforsikring 2026
        </h1>
        <p className="text-muted-foreground text-lg">
          Vi har sammenlignet de mest populære hundeforsikringer i Danmark på pris, dækning og
          kundetilfredshed — så du kan vælge rigtigt første gang.
        </p>
      </div>

      <AffiliateDisclosure />

      {/* Hurtig anbefaling */}
      <div className="mt-8 p-5 bg-navy-900 text-white rounded-2xl">
        <p className="text-sm font-semibold text-navy-300 mb-1">Vores anbefaling</p>
        <p className="font-bold text-lg mb-1">Agria til racer med sundhedsrisiko · Tryg til sunde racer</p>
        <p className="text-sm text-navy-300">
          Har din hund høj sundhedsrisiko (Cavalier, Bulldog, Berner Sennenhund) → vælg Agria.
          Har du en sund race med lav risiko → kan Tryg spare dig 40–50% om måneden.
        </p>
      </div>

      {/* Sammenligningstabel */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-5">Sammenligning: Agria vs Tryg</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left px-4 py-3 font-semibold">Forsikring</th>
                <th className="text-left px-4 py-3 font-semibold">Pris</th>
                <th className="text-left px-4 py-3 font-semibold">Maks. dækning</th>
                <th className="text-center px-4 py-3 font-semibold">Arvelige sygdomme</th>
                <th className="text-left px-4 py-3 font-semibold">Karens</th>
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
                  <td className="px-4 py-4 text-muted-foreground">{ins.cancellation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Produktkort */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-5">Se aktuelle priser</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {insuranceProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Hvornår er forsikring nødvendigt */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Hvornår er forsikring afgørende?</h2>
        <div className="space-y-3">
          {[
            {
              icon: AlertTriangle,
              color: "text-red-500",
              bg: "bg-red-50",
              title: "Høj-risiko racer — forsikring er nærmest obligatorisk",
              text: "Cavalier King Charles Spaniel, Berner Sennenhund, Boxere og brachycefale racer (Mops, Bulldog, Chow-chow) har statistisk set langt højere dyrlægeomkostninger. Én operation kan koste 30.000–60.000 kr.",
            },
            {
              icon: CheckCircle,
              color: "text-amber-500",
              bg: "bg-amber-50",
              title: "Medium-risiko — stærkt anbefalet",
              text: "Labrador, Golden Retriever, Schæfer og de fleste store racer har moderat risiko. Forsikring giver ro i maven og gør dig i stand til at vælge den bedste behandling uden at kigge på prisen.",
            },
            {
              icon: CheckCircle,
              color: "text-mint-600",
              bg: "bg-mint-50",
              title: "Lav-risiko racer — overvej en billig løsning",
              text: "Jack Russell, Whippet, Blandingshunde og mange katte har generelt god helbred. Her kan en billigere forsikring (fx Tryg) eller en målrettet opsparing på 500 kr./md. være tilstrækkeligt.",
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
        <p className="font-bold text-lg mb-2">Hvad koster forsikring til præcis din race?</p>
        <p className="text-navy-300 text-sm mb-4">
          Brug vores beregner og se den samlede månedspris inkl. forsikring, foder og dyrlæge.
        </p>
        <Link
          href="/beregner"
          className="inline-flex items-center gap-2 px-6 py-3 bg-mint-600 hover:bg-mint-500 text-white font-semibold rounded-xl transition-colors"
        >
          Beregn din races udgifter →
        </Link>
      </div>

      <div className="mt-10">
        <FAQSection faqs={faqs} title="Spørgsmål om hundeforsikring" />
      </div>

      <div className="mt-8">
        <AffiliateDisclosure />
      </div>
    </div>
  );
}
