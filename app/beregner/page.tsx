import type { Metadata } from "next";
import { MultiStepCalculator } from "@/components/calculator/MultiStepCalculator";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { MethodologyBox } from "@/components/shared/MethodologyBox";

export const metadata: Metadata = {
  title: "Kæledyrsberegner — Beregn din månedspris",
  description:
    "Beregn de præcise månedlige og livslange udgifter til din hund eller kat i Danmark. Vælg race, budgetniveau og se fuld udgiftsfordeling.",
};

export default function BeregnerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: "Beregner" }]} />
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Kæledyrsberegner</h1>
        <p className="text-muted-foreground">
          Beregn dine reelle månedlige og livslange udgifter til hund eller kat.
          Alle priser er baseret på aktuelle danske markedsdata.
        </p>
      </div>
      <MultiStepCalculator />
      <div className="mt-12">
        <MethodologyBox />
      </div>
    </div>
  );
}
