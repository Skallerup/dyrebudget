import type { Breed } from "@/types";
import { formatCurrency, getCostIndexBgColor } from "@/lib/calculator";
import { calculatePetCost } from "@/lib/calculator";
import { Check, X } from "lucide-react";

interface ComparisonTableProps {
  breedA: Breed;
  breedB: Breed;
}

export function ComparisonTable({ breedA, breedB }: ComparisonTableProps) {
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

  const costsA = calculatePetCost(breedA, { ...defaultInputs, breedId: breedA.id });
  const costsB = calculatePetCost(breedB, { ...defaultInputs, breedId: breedB.id });

  const rows: Array<{
    label: string;
    a: string | React.ReactNode;
    b: string | React.ReactNode;
    winner?: "a" | "b" | "tie";
  }> = [
    {
      label: "Månedlig pris (medium)",
      a: formatCurrency(costsA.monthlyCost),
      b: formatCurrency(costsB.monthlyCost),
      winner: costsA.monthlyCost < costsB.monthlyCost ? "a" : costsA.monthlyCost > costsB.monthlyCost ? "b" : "tie",
    },
    {
      label: "Pris pr. dag",
      a: `${costsA.dailyCost} kr.`,
      b: `${costsB.dailyCost} kr.`,
      winner: costsA.dailyCost < costsB.dailyCost ? "a" : costsA.dailyCost > costsB.dailyCost ? "b" : "tie",
    },
    {
      label: "Livstidspris",
      a: formatCurrency(costsA.lifetimeCost),
      b: formatCurrency(costsB.lifetimeCost),
      winner: costsA.lifetimeCost < costsB.lifetimeCost ? "a" : costsA.lifetimeCost > costsB.lifetimeCost ? "b" : "tie",
    },
    {
      label: "Omkostningsindeks",
      a: (
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getCostIndexBgColor(breedA.costIndex)}`}>
          {breedA.costIndex}/100
        </span>
      ),
      b: (
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getCostIndexBgColor(breedB.costIndex)}`}>
          {breedB.costIndex}/100
        </span>
      ),
      winner: breedA.costIndex < breedB.costIndex ? "a" : breedA.costIndex > breedB.costIndex ? "b" : "tie",
    },
    {
      label: "Levetid",
      a: `${breedA.lifespan.min}–${breedA.lifespan.max} år`,
      b: `${breedB.lifespan.min}–${breedB.lifespan.max} år`,
      winner: (breedA.lifespan.min + breedA.lifespan.max) > (breedB.lifespan.min + breedB.lifespan.max) ? "a" : "b",
    },
    {
      label: "Sundhedsrisiko",
      a: breedA.healthRisk === "low" ? "Lav" : breedA.healthRisk === "medium" ? "Middel" : "Høj",
      b: breedB.healthRisk === "low" ? "Lav" : breedB.healthRisk === "medium" ? "Middel" : "Høj",
      winner: breedA.healthRisk === "low" ? "a" : breedB.healthRisk === "low" ? "b" : "tie",
    },
    {
      label: "Størrelse",
      a: breedA.sizeClass,
      b: breedB.sizeClass,
    },
    {
      label: "Aktivitetsniveau",
      a: breedA.activityLevel === "low" ? "Rolig" : breedA.activityLevel === "medium" ? "Moderat" : "Aktiv",
      b: breedB.activityLevel === "low" ? "Rolig" : breedB.activityLevel === "medium" ? "Moderat" : "Aktiv",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-muted-foreground font-medium w-1/3">
              Kategori
            </th>
            <th className="py-3 px-4 text-center font-semibold text-navy-900">
              {breedA.name}
            </th>
            <th className="py-3 px-4 text-center font-semibold text-navy-900">
              {breedB.name}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr key={row.label} className="hover:bg-muted/30 transition-colors">
              <td className="py-3 px-4 text-muted-foreground">{row.label}</td>
              <td
                className={`py-3 px-4 text-center font-medium ${
                  row.winner === "a" ? "text-mint-700 font-semibold" : ""
                }`}
              >
                <span className="flex items-center justify-center gap-1">
                  {row.winner === "a" && <Check className="w-3.5 h-3.5 text-mint-600" />}
                  {row.a}
                </span>
              </td>
              <td
                className={`py-3 px-4 text-center font-medium ${
                  row.winner === "b" ? "text-mint-700 font-semibold" : ""
                }`}
              >
                <span className="flex items-center justify-center gap-1">
                  {row.winner === "b" && <Check className="w-3.5 h-3.5 text-mint-600" />}
                  {row.b}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
