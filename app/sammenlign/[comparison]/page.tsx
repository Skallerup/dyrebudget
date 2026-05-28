import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBreedBySlug } from "@/data/breeds";
import { ComparisonTable } from "@/components/shared/ComparisonTable";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { AffiliateDisclosure } from "@/components/shared/AffiliateDisclosure";
import { formatCurrency } from "@/lib/calculator";
import { calculatePetCost } from "@/lib/calculator";

interface Props {
  params: Promise<{ comparison: string }>;
}

export async function generateStaticParams() {
  const params: { comparison: string }[] = [];

  const popularPairs = [
    ["labrador", "golden-retriever"],
    ["labrador", "beagle"],
    ["golden-retriever", "labrador"],
    ["fransk-bulldog", "mops"],
    ["huskat", "maine-coon"],
    ["huskat", "ragdoll"],
    ["border-collie", "beagle"],
    ["chihuahua", "gravhund"],
    ["puddel", "beagle"],
  ];

  for (const [a, b] of popularPairs) {
    params.push({ comparison: `${a}-vs-${b}` });
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { comparison } = await params;
  const [slugA, slugB] = comparison.split("-vs-");
  const breedA = getBreedBySlug(slugA);
  const breedB = getBreedBySlug(slugB);
  if (!breedA || !breedB) return {};
  return {
    title: `${breedA.name} vs. ${breedB.name} — Sammenligning af omkostninger`,
    description: `Sammenlign alle omkostninger for ${breedA.name} og ${breedB.name}. Se månedspris, livstidspris, forsikring og sundhedsrisiko side om side.`,
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { comparison } = await params;
  const parts = comparison.split("-vs-");
  if (parts.length !== 2) notFound();

  const [slugA, slugB] = parts;
  const breedA = getBreedBySlug(slugA);
  const breedB = getBreedBySlug(slugB);
  if (!breedA || !breedB) notFound();

  const defaultInputs = {
    petType: breedA.petType,
    breedId: breedA.id,
    ageYears: 2,
    budgetLevel: "medium" as const,
    activityLevel: "medium" as const,
    hasInsurance: true,
    housingType: "house" as const,
    groomingLevel: "mixed" as const,
  };

  const costsA = calculatePetCost(breedA, defaultInputs);
  const costsB = calculatePetCost(breedB, { ...defaultInputs, breedId: breedB.id });

  const cheaper = costsA.monthlyCost <= costsB.monthlyCost ? breedA : breedB;
  const cheaperCost = Math.min(costsA.monthlyCost, costsB.monthlyCost);
  const diff = Math.abs(costsA.monthlyCost - costsB.monthlyCost);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Sammenlign", href: "/sammenlign" },
          { label: `${breedA.name} vs. ${breedB.name}` },
        ]}
      />

      <h1 className="text-3xl font-bold mb-2">
        {breedA.name} vs. {breedB.name}
      </h1>
      <p className="text-muted-foreground mb-8">
        Detaljeret sammenligning af alle økonomiparametre. Baseret på medium-budget med forsikring.
      </p>

      {/* Summary verdict */}
      <div className="bg-navy-900 text-white rounded-2xl p-6 mb-8">
        <p className="text-navy-300 text-sm mb-2">Vores konklusion</p>
        <p className="text-xl font-bold mb-2">
          {cheaper.name} er billigst med {formatCurrency(cheaperCost)}/md.
        </p>
        <p className="text-navy-300">
          Det er {formatCurrency(diff)} billigere om måneden end {cheaper.id === breedA.id ? breedB.name : breedA.name}
          {" "}— svarende til {formatCurrency(diff * 12)} om året og{" "}
          {formatCurrency(diff * 12 * 12)} over 12 år.
        </p>
      </div>

      {/* Comparison table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden mb-8">
        <ComparisonTable breedA={breedA} breedB={breedB} />
      </div>

      {/* Monthly breakdown side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[
          { breed: breedA, costs: costsA },
          { breed: breedB, costs: costsB },
        ].map(({ breed, costs }) => (
          <div key={breed.id} className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold mb-4">{breed.name}</h3>
            <div className="space-y-2">
              {[
                { label: "Foder", value: costs.breakdown.food },
                { label: "Forsikring", value: costs.breakdown.insurance },
                { label: "Dyrlæge", value: costs.breakdown.vet },
                { label: "Grooming", value: costs.breakdown.grooming },
              ].map((row) => (
                <div key={row.label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-medium">{formatCurrency(row.value)}/md.</span>
                </div>
              ))}
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-border">
                <span>Total</span>
                <span>{formatCurrency(costs.monthlyCost)}/md.</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AffiliateDisclosure />
    </div>
  );
}
