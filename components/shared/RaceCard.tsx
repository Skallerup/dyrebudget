import Link from "next/link";
import type { Breed } from "@/types";
import { formatCurrency } from "@/lib/calculator";
import { getCostIndexBgColor } from "@/lib/calculator";
import { ArrowRight } from "lucide-react";

interface RaceCardProps {
  breed: Breed;
  showCost?: boolean;
}

export function RaceCard({ breed, showCost = true }: RaceCardProps) {
  const monthlyEstimate = breed.monthlyFoodCost.medium +
    breed.monthlyInsurance.medium +
    breed.monthlyVetAvg +
    breed.monthlyGrooming;

  return (
    <Link
      href={`/hvad-koster/${breed.slug}`}
      className="group block bg-card border border-border rounded-xl p-5 hover:border-navy-300 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-navy-900 transition-colors">
            {breed.name}
          </h3>
          <p className="text-xs text-muted-foreground capitalize mt-0.5">
            {breed.petType === "dog" ? "Hund" : "Kat"} ·{" "}
            {breed.sizeClass === "tiny"
              ? "Mini"
              : breed.sizeClass === "small"
              ? "Lille"
              : breed.sizeClass === "medium"
              ? "Medium"
              : breed.sizeClass === "large"
              ? "Stor"
              : "Meget stor"}
          </p>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${getCostIndexBgColor(
            breed.costIndex
          )}`}
        >
          {breed.costIndex <= 30
            ? "Billig"
            : breed.costIndex <= 55
            ? "Medium"
            : breed.costIndex <= 75
            ? "Dyr"
            : "Meget dyr"}
        </span>
      </div>

      {showCost && (
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-xl font-bold text-navy-900">
            {formatCurrency(monthlyEstimate)}
          </span>
          <span className="text-xs text-muted-foreground">/md. (est.)</span>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 mb-3">
        {breed.traits.slice(0, 3).map((trait) => (
          <span key={trait} className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
            {trait}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{breed.lifespan.min}–{breed.lifespan.max} år levetid</span>
        <span className="flex items-center gap-1 text-navy-600 font-medium group-hover:text-mint-600 transition-colors">
          Se beregning
          <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  );
}
