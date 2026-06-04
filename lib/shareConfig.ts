import type { CalculatorInputs, BudgetLevel, ActivityLevel } from "@/types";
import { breeds } from "@/data/breeds";

// Kompakt, URL-sikker kodning af beregner-input til delbare resultat-URL'er:
//   breedId~age~budget~activity~insurance~housing~grooming
// Eksempel: labrador~2~medium~high~1~house~mixed
// `~` er et unreserved tegn i URL-stier og kolliderer ikke med race-slugs (som bruger `-`).

const BUDGETS: BudgetLevel[] = ["budget", "medium", "premium"];
const ACTIVITIES: ActivityLevel[] = ["low", "medium", "high"];
const HOUSING = ["apartment", "house"] as const;
const GROOMING = ["home", "mixed", "professional"] as const;

export function encodeShareConfig(inputs: CalculatorInputs): string {
  return [
    inputs.breedId,
    Math.round(inputs.ageYears),
    inputs.budgetLevel,
    inputs.activityLevel,
    inputs.hasInsurance ? 1 : 0,
    inputs.housingType,
    inputs.groomingLevel,
  ].join("~");
}

export function decodeShareConfig(config: string): CalculatorInputs | null {
  const parts = decodeURIComponent(config).split("~");
  if (parts.length !== 7) return null;
  const [breedId, ageStr, budget, activity, ins, housing, grooming] = parts;

  const breed = breeds.find((b) => b.id === breedId);
  if (!breed) return null;

  const age = Number(ageStr);
  if (!Number.isFinite(age) || age < 0 || age > 30) return null;
  if (!BUDGETS.includes(budget as BudgetLevel)) return null;
  if (!ACTIVITIES.includes(activity as ActivityLevel)) return null;
  if (!HOUSING.includes(housing as (typeof HOUSING)[number])) return null;
  if (!GROOMING.includes(grooming as (typeof GROOMING)[number])) return null;

  return {
    petType: breed.petType,
    breedId: breed.id,
    ageYears: age,
    budgetLevel: budget as BudgetLevel,
    activityLevel: activity as ActivityLevel,
    hasInsurance: ins === "1",
    housingType: housing as (typeof HOUSING)[number],
    groomingLevel: grooming as (typeof GROOMING)[number],
  };
}
