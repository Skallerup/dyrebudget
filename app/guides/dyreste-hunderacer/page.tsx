import type { Metadata } from "next";
import { getMostExpensiveBreeds } from "@/data/breeds";
import { calculatePetCost } from "@/lib/calculator";
import { formatCurrency } from "@/lib/calculator";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { getCostIndexBgColor } from "@/lib/calculator";

export const metadata: Metadata = {
  title: "De 5 dyreste hunderacer at eje i Danmark 2024",
  description:
    "Disse hunderacer koster flest penge at eje i Danmark. Se hvad forsikring, dyrlæge og grooming koster for de dyreste racer.",
  alternates: { canonical: "/guides/dyreste-hunderacer" },
};

export default function DyresteHunderacerPage() {
  const expensive = getMostExpensiveBreeds("dog", 5);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guider", href: "/guides" },
          { label: "Dyreste hunderacer" },
        ]}
      />
      <h1 className="text-3xl font-bold mb-4">De 5 dyreste hunderacer at eje</h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        Disse racer topper vores omkostningsindeks. Mange er dyre pga. høj sundhedsrisiko og
        dermed høje forsikringspræmier.
      </p>
      <div className="space-y-6">
        {expensive.map((breed, i) => {
          const result = calculatePetCost(breed, {
            petType: breed.petType,
            breedId: breed.id,
            ageYears: 2,
            budgetLevel: "medium",
            activityLevel: "medium",
            hasInsurance: true,
            housingType: "house",
            groomingLevel: "mixed",
          });
          return (
            <div key={breed.id} className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-lg shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between flex-wrap gap-3 mb-2">
                    <h2 className="text-xl font-bold">{breed.name}</h2>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-700">{formatCurrency(result.monthlyCost)}</p>
                      <p className="text-xs text-muted-foreground">/md.</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{breed.description}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getCostIndexBgColor(breed.costIndex)}`}>
                      Indeks {breed.costIndex}/100
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Sundhedsrisiko: {breed.healthRisk === "high" ? "Høj" : breed.healthRisk === "medium" ? "Middel" : "Lav"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
