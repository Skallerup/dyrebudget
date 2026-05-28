export type PetType = "dog" | "cat";

export type BudgetLevel = "budget" | "medium" | "premium";

export type ActivityLevel = "low" | "medium" | "high";

export type CoatType = "short" | "medium" | "long" | "wire";

export type SizeClass = "tiny" | "small" | "medium" | "large" | "giant";

export type HealthRisk = "low" | "medium" | "high";

export type CostLabel = "billig" | "medium" | "dyr" | "meget dyr";

export interface BreedCostProfile {
  food: number;
  insurance: number;
  vet: number;
  grooming: number;
  treats: number;
  toys: number;
  fleaTick: number;
  equipment: number;
  miscellaneous: number;
}

export interface PetCostResult {
  dailyCost: number;
  monthlyCost: number;
  yearlyCost: number;
  firstYearCost: number;
  lifetimeCost: number;
  breakdown: BreedCostProfile;
  costIndex: number;
  costLabel: CostLabel;
  savingsTips: string[];
}

export interface Breed {
  id: string;
  slug: string;
  name: string;
  petType: PetType;
  sizeClass: SizeClass;
  weightKg: { min: number; max: number };
  lifespan: { min: number; max: number };
  coatType: CoatType;
  activityLevel: ActivityLevel;
  healthRisk: HealthRisk;
  monthlyFoodCost: { budget: number; medium: number; premium: number };
  monthlyInsurance: { budget: number; medium: number; premium: number };
  monthlyVetAvg: number;
  monthlyGrooming: number;
  oneTimeCosts: number;
  costIndex: number;
  description: string;
  traits: string[];
  popularIn: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  pricePerKg?: number;
  pricePerDay?: number;
  affiliateUrl: string;
  affiliatePartner: string;
  imageUrl?: string;
  rating: number;
  badges: string[];
  petType: PetType | "both";
  description: string;
  featured: boolean;
}

export type ProductCategory =
  | "hundefoder"
  | "kattefoder"
  | "hundeforsikring"
  | "katteforsikring"
  | "loppe-og-flaat"
  | "hundesenge"
  | "kattegrus"
  | "godbidder"
  | "legetoj"
  | "udstyr";

export interface CalculatorInputs {
  petType: PetType;
  breedId: string;
  ageYears: number;
  budgetLevel: BudgetLevel;
  activityLevel: ActivityLevel;
  hasInsurance: boolean;
  housingType: "apartment" | "house";
  groomingLevel: "home" | "professional" | "mixed";
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ComparisonData {
  breedA: Breed;
  breedB: Breed;
  costsA: PetCostResult;
  costsB: PetCostResult;
}
