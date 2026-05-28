import type { Metadata } from "next";
import { getCheapestBreeds } from "@/data/breeds";
import { calculatePetCost } from "@/lib/calculator";
import { formatCurrency } from "@/lib/calculator";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";

export const metadata: Metadata = {
  title: "De 5 billigste hunderacer i Danmark 2024",
  description:
    "Se hvilke hunderacer der er billigst at eje i Danmark. Rangeret efter månedlig pris, omkostningsindeks og livstidspris.",
};

export default function BilligsteHunderacerPage() {
  const cheapest = getCheapestBreeds("dog", 5);

  const faqs = [
    {
      question: "Hvilken hunderace er billigst?",
      answer: "Chihuahua er den billigste hunderace at eje i Danmark med en månedspris fra ca. 1.200 kr. på budgetniveau. Den er lille, spiser lidt og lever længe.",
    },
    {
      question: "Kan man holde hund for under 2.000 kr. om måneden?",
      answer: "Ja — Chihuahua, Dansk-Svensk Gårdhund og Beagle kan alle holdes for 1.200–1.800 kr./md. på budgetniveau uden forsikring.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guider", href: "/guides" },
          { label: "Billigste hunderacer" },
        ]}
      />
      <h1 className="text-3xl font-bold mb-4">De 5 billigste hunderacer at eje</h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        Rangeret efter vores omkostningsindeks (0–100). Jo lavere indeks, jo lavere livstidsomkostning.
      </p>

      <div className="space-y-6">
        {cheapest.map((breed, i) => {
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
                <div className="w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold text-lg shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                    <h2 className="text-xl font-bold">{breed.name}</h2>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-navy-900">{formatCurrency(result.monthlyCost)}</p>
                      <p className="text-xs text-muted-foreground">/md. (medium niveau)</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{breed.description}</p>
                  <div className="grid grid-cols-3 gap-3 text-center text-sm">
                    <div className="bg-muted/50 rounded-lg p-2">
                      <p className="text-xs text-muted-foreground">Livstidspris</p>
                      <p className="font-bold text-navy-900">{formatCurrency(result.lifetimeCost)}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-2">
                      <p className="text-xs text-muted-foreground">Levetid</p>
                      <p className="font-bold">{breed.lifespan.min}–{breed.lifespan.max} år</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-2">
                      <p className="text-xs text-muted-foreground">Indeks</p>
                      <p className="font-bold text-green-700">{breed.costIndex}/100</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        <FAQSection faqs={faqs} />
      </div>
    </div>
  );
}
