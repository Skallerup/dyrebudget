import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { decodeShareConfig } from "@/lib/shareConfig";
import { breeds } from "@/data/breeds";
import { calculatePetCost, formatCurrency } from "@/lib/calculator";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { RelatedLinks } from "@/components/shared/RelatedLinks";

interface Props {
  params: Promise<{ config: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { config } = await params;
  const inputs = decodeShareConfig(config);
  if (!inputs) return { title: "Beregningsresultat" };
  const breed = breeds.find((b) => b.id === inputs.breedId);
  if (!breed) return { title: "Beregningsresultat" };
  const result = calculatePetCost(breed, inputs);
  return {
    title: `${breed.name} koster ${formatCurrency(result.monthlyCost)}/md. — mit budget`,
    description: `Se den fulde beregning: en ${breed.name} koster ca. ${formatCurrency(
      result.monthlyCost
    )} om måneden og ${formatCurrency(result.lifetimeCost)} over et helt liv. Lav din egen beregning på DyreBudget.dk.`,
    alternates: { canonical: `/resultat/${config}` },
    // Lad ikke disse personlige resultat-URL'er fylde i indekset.
    robots: { index: false, follow: true },
  };
}

export default async function ResultPage({ params }: Props) {
  const { config } = await params;
  const inputs = decodeShareConfig(config);
  if (!inputs) notFound();
  const breed = breeds.find((b) => b.id === inputs.breedId);
  if (!breed) notFound();

  const result = calculatePetCost(breed, inputs);
  const budgetLabel =
    inputs.budgetLevel === "budget" ? "budget" : inputs.budgetLevel === "premium" ? "premium" : "medium";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: "Beregner", href: "/beregner" }, { label: `${breed.name}-resultat` }]} />

      <p className="text-sm text-muted-foreground mb-2">Delt beregningsresultat</p>
      <h1 className="text-3xl font-bold mb-2">
        En {breed.name} koster {formatCurrency(result.monthlyCost)}/md.
      </h1>
      <p className="text-muted-foreground mb-8">
        Beregnet på {budgetLabel}-niveau, {inputs.hasInsurance ? "med" : "uden"} forsikring,{" "}
        {inputs.ageYears === 0 ? "som hvalp/killing" : `${inputs.ageYears} år gammel`}.
      </p>

      {/* Nøgletal */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Per dag", value: `${result.dailyCost} kr.`, highlight: true },
          { label: "Per måned", value: formatCurrency(result.monthlyCost) },
          { label: "Første år", value: formatCurrency(result.firstYearCost) },
          { label: "Livstid", value: formatCurrency(result.lifetimeCost) },
        ].map((m) => (
          <div
            key={m.label}
            className={`rounded-xl p-4 text-center ${
              m.highlight ? "bg-navy-900 text-white" : "bg-muted/50 border border-border"
            }`}
          >
            <p className={`text-xs font-medium mb-1 ${m.highlight ? "text-navy-300" : "text-muted-foreground"}`}>
              {m.label}
            </p>
            <p className={`text-2xl font-bold tabular-nums ${m.highlight ? "text-white" : "text-foreground"}`}>
              {m.value}
            </p>
          </div>
        ))}
      </div>

      {/* CTA — lav din egen */}
      <Link
        href={`/beregner?breed=${breed.id}`}
        className="flex items-center justify-between p-5 bg-mint-50 border border-mint-200 rounded-2xl hover:border-mint-400 hover:shadow-sm transition-all group mb-10"
      >
        <div className="flex items-center gap-3">
          <Calculator className="w-5 h-5 text-mint-600 shrink-0" />
          <div>
            <p className="font-semibold text-navy-900">Lav din egen beregning</p>
            <p className="text-sm text-muted-foreground mt-0.5">Tilpas race, alder, budget og forsikring på 1 minut.</p>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-mint-600 group-hover:text-mint-700 shrink-0 transition-colors" />
      </Link>

      <RelatedLinks
        links={[
          { href: `/hvad-koster/${breed.slug}`, title: `Hvad koster en ${breed.name}?`, desc: "Fuld omkostningsoversigt" },
          { href: `/forsikring/${breed.slug}`, title: `Forsikring til ${breed.name}`, desc: "Pris og dækning" },
          { href: "/sammenlign", title: "Sammenlign racer", desc: "Se omkostninger side om side" },
          { href: "/beregner", title: "Beregner", desc: "Start en ny beregning" },
        ]}
      />
    </div>
  );
}
