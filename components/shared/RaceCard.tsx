import Link from "next/link";
import Image from "next/image";
import type { Breed } from "@/types";
import { formatCurrency } from "@/lib/calculator";
import { ArrowRight } from "lucide-react";
import { getBreedImage } from "@/data/breedImages";

interface RaceCardProps {
  breed: Breed;
  showCost?: boolean;
}

function healthRiskLabel(risk: string): string {
  if (risk === "low") return "Lav sundhedsrisiko";
  if (risk === "medium") return "Middel sundhedsrisiko";
  return "Høj sundhedsrisiko";
}

function healthRiskColors(risk: string): string {
  if (risk === "low") return "text-green-700 bg-green-50 border-green-200";
  if (risk === "medium") return "text-amber-700 bg-amber-50 border-amber-200";
  return "text-red-700 bg-red-50 border-red-200";
}

function costLabel(index: number): string {
  if (index <= 30) return "Billigst";
  if (index <= 50) return "Prisvenlig";
  if (index <= 65) return "Middel";
  if (index <= 80) return "Dyr";
  return "Meget dyr";
}

function costLabelColors(index: number): string {
  if (index <= 30) return "text-green-800 bg-green-100";
  if (index <= 50) return "text-mint-800 bg-mint-100";
  if (index <= 65) return "text-navy-700 bg-navy-100";
  if (index <= 80) return "text-amber-800 bg-amber-100";
  return "text-red-800 bg-red-100";
}

function sizeLabel(size: string): string {
  const map: Record<string, string> = { tiny: "Mini", small: "Lille", medium: "Medium", large: "Stor", xlarge: "Meget stor" };
  return map[size] ?? size;
}

export function RaceCard({ breed, showCost = true }: RaceCardProps) {
  const monthlyEstimate =
    breed.monthlyFoodCost.medium +
    breed.monthlyInsurance.medium +
    breed.monthlyVetAvg +
    breed.monthlyGrooming;

  const imageUrl = getBreedImage(breed.slug);

  return (
    <Link
      href={`/hvad-koster/${breed.slug}`}
      className="group block bg-card border border-border rounded-xl overflow-hidden hover:border-navy-300 hover:shadow-md transition-all"
    >
      {/* Breed image */}
      {imageUrl && (
        <div className="relative h-40 w-full bg-muted overflow-hidden">
          <Image
            src={imageUrl}
            alt={breed.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
      )}

      <div className="p-5">
      {/* Top row: name + cost badge */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-navy-900 transition-colors leading-tight">
            {breed.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {breed.petType === "dog" ? "Hund" : "Kat"} · {sizeLabel(breed.sizeClass)}
          </p>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full shrink-0 ${costLabelColors(breed.costIndex)}`}>
          {costLabel(breed.costIndex)}
        </span>
      </div>

      {/* Monthly cost */}
      {showCost && (
        <div className="flex items-baseline gap-1 mb-3 mt-3">
          <span className="text-2xl font-bold text-navy-900">
            {formatCurrency(monthlyEstimate)}
          </span>
          <span className="text-xs text-muted-foreground">/md.</span>
        </div>
      )}

      {/* Health risk */}
      <div className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border mb-3 ${healthRiskColors(breed.healthRisk)}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${
          breed.healthRisk === "low" ? "bg-green-500" :
          breed.healthRisk === "medium" ? "bg-amber-500" : "bg-red-500"
        }`} />
        {healthRiskLabel(breed.healthRisk)}
      </div>

      {/* Traits */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {breed.traits.slice(0, 2).map((trait) => (
          <span key={trait} className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
            {trait}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/60">
        <span>{breed.lifespan.min}–{breed.lifespan.max} år levetid</span>
        <span className="flex items-center gap-1 text-navy-600 font-medium group-hover:text-mint-600 transition-colors">
          Se beregning
          <ArrowRight className="w-3 h-3" />
        </span>
      </div>
      </div>
    </Link>
  );
}
