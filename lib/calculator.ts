import type {
  Breed,
  CalculatorInputs,
  PetCostResult,
  CostLabel,
} from "@/types";

export function calculatePetCost(
  breed: Breed,
  inputs: CalculatorInputs
): PetCostResult {
  const { budgetLevel, activityLevel, hasInsurance, groomingLevel } = inputs;

  const food = breed.monthlyFoodCost[budgetLevel];

  const activityMultiplier =
    activityLevel === "high" ? 1.15 : activityLevel === "low" ? 0.9 : 1.0;
  const adjustedFood = Math.round(food * activityMultiplier);

  const insurance = hasInsurance ? breed.monthlyInsurance[budgetLevel] : 0;

  const vet = breed.monthlyVetAvg;

  const grooming =
    groomingLevel === "home"
      ? Math.round(breed.monthlyGrooming * 0.3)
      : groomingLevel === "mixed"
      ? Math.round(breed.monthlyGrooming * 0.65)
      : breed.monthlyGrooming;

  const treats = Math.round(adjustedFood * 0.12);
  const toys = budgetLevel === "budget" ? 50 : budgetLevel === "medium" ? 80 : 130;
  const fleaTick = Math.round(260 / 12);
  const miscellaneous = budgetLevel === "budget" ? 80 : budgetLevel === "medium" ? 140 : 220;

  const equipmentBase =
    budgetLevel === "budget" ? 2500 : budgetLevel === "medium" ? 4500 : 8000;
  const equipment = Math.round(equipmentBase / 12);

  const breakdown = {
    food: adjustedFood,
    insurance,
    vet,
    grooming,
    treats,
    toys,
    fleaTick,
    equipment,
    miscellaneous,
  };

  const monthlyCost = Object.values(breakdown).reduce((a, b) => a + b, 0);
  const dailyCost = Math.round((monthlyCost / 30) * 10) / 10;
  const yearlyCost = monthlyCost * 12;

  const avgLifespan = (breed.lifespan.min + breed.lifespan.max) / 2;

  const firstYearExtra =
    breed.oneTimeCosts +
    (budgetLevel === "budget" ? 1500 : budgetLevel === "medium" ? 2500 : 4000);
  const firstYearCost = yearlyCost + firstYearExtra;

  const lifetimeCost = Math.round(yearlyCost * avgLifespan + firstYearExtra);

  const costIndex = breed.costIndex;
  const costLabel = getCostLabel(costIndex);

  const savingsTips = generateSavingsTips(breed, inputs, breakdown);

  return {
    dailyCost,
    monthlyCost,
    yearlyCost,
    firstYearCost,
    lifetimeCost,
    breakdown,
    costIndex,
    costLabel,
    savingsTips,
  };
}

function getCostLabel(costIndex: number): CostLabel {
  if (costIndex <= 30) return "billig";
  if (costIndex <= 55) return "medium";
  if (costIndex <= 75) return "dyr";
  return "meget dyr";
}

function generateSavingsTips(
  breed: Breed,
  inputs: CalculatorInputs,
  breakdown: PetCostResult["breakdown"]
): string[] {
  const tips: string[] = [];

  if (breakdown.food > 400) {
    tips.push("Køb hundefoder i større mængder (15+ kg) — spar op til 25% pr. kg.");
  }

  if (!inputs.hasInsurance) {
    tips.push("Overvej hundeforsikring — én dyrlægeregning kan koste mere end et års forsikring.");
  }

  if (inputs.groomingLevel === "professional" && breed.monthlyGrooming > 200) {
    tips.push("Lær grundlæggende pelsplejefærdigheder selv — kan halvere groomingomkostningerne.");
  }

  if (breed.healthRisk === "high") {
    tips.push("Køb forsikring mens hunden er ung og sund — sparer du tusindvis af kroner later.");
  }

  if (inputs.budgetLevel === "premium") {
    tips.push("Medium-kvalitetsfoder giver samme næringsværdi som premium til halvdelen af prisen.");
  }

  if (breed.petType === "dog") {
    tips.push("Sammenlign forsikringspriser hvert år — markedet er konkurrencepræget.");
  }

  tips.push("Tøjdyrets legetøj og hjemmelavede godbidder kan erstatte dyre mærker.");

  return tips.slice(0, 4);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getCostIndexColor(index: number): string {
  if (index <= 30) return "text-green-600";
  if (index <= 55) return "text-amber-600";
  if (index <= 75) return "text-orange-600";
  return "text-red-600";
}

export function getCostIndexBgColor(index: number): string {
  if (index <= 30) return "bg-green-100 text-green-800";
  if (index <= 55) return "bg-amber-100 text-amber-800";
  if (index <= 75) return "bg-orange-100 text-orange-800";
  return "bg-red-100 text-red-800";
}
