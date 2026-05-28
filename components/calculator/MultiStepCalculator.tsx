"use client";

import { useState } from "react";
import { breeds, getBreedsByPetType } from "@/data/breeds";
import { calculatePetCost } from "@/lib/calculator";
import { trackEvent } from "@/lib/analytics";
import type { CalculatorInputs, PetType, BudgetLevel, ActivityLevel } from "@/types";
import { Button } from "@/components/ui/button";
import { CostResultCard } from "./CostResultCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Dog, Cat, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const STEPS = ["Kæledyr", "Race", "Profil", "Budget", "Resultat"];

const defaultInputs: CalculatorInputs = {
  petType: "dog",
  breedId: "",
  ageYears: 2,
  budgetLevel: "medium",
  activityLevel: "medium",
  hasInsurance: true,
  housingType: "house",
  groomingLevel: "mixed",
};

export function MultiStepCalculator() {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);
  const [result, setResult] = useState<ReturnType<typeof calculatePetCost> | null>(null);

  const availableBreeds = getBreedsByPetType(inputs.petType);
  const selectedBreed = breeds.find((b) => b.id === inputs.breedId);

  const progress = ((step + 1) / STEPS.length) * 100;

  function handleNext() {
    if (step === 0) trackEvent("calculator_started", { petType: inputs.petType });
    if (step < STEPS.length - 2) {
      setStep((s) => s + 1);
    } else {
      const breed = breeds.find((b) => b.id === inputs.breedId);
      if (breed) {
        const res = calculatePetCost(breed, inputs);
        setResult(res);
        setStep(STEPS.length - 1);
        trackEvent("calculator_completed", {
          breedId: breed.id,
          breedName: breed.name,
          petType: inputs.petType,
          budgetLevel: inputs.budgetLevel,
          monthlyCost: res.monthlyCost,
        });
      }
    }
  }

  function canProceed(): boolean {
    if (step === 0) return true;
    if (step === 1) return !!inputs.breedId;
    return true;
  }

  return (
    <div className="max-w-2xl mx-auto">
      {step < STEPS.length - 1 && (
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {STEPS.slice(0, -1).map((s, i) => (
              <span
                key={s}
                className={`text-xs font-medium ${
                  i === step
                    ? "text-navy-900"
                    : i < step
                    ? "text-mint-600"
                    : "text-muted-foreground"
                }`}
              >
                {i < step ? <CheckCircle2 className="inline w-3.5 h-3.5 mr-1" /> : null}
                {s}
              </span>
            ))}
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      )}

      {/* Step 0: Pet type */}
      {step === 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Hvilket kæledyr vil du beregne?</h2>
          <div className="grid grid-cols-2 gap-4">
            {(["dog", "cat"] as PetType[]).map((type) => (
              <button
                key={type}
                onClick={() => setInputs((i) => ({ ...i, petType: type, breedId: "" }))}
                className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all ${
                  inputs.petType === type
                    ? "border-navy-900 bg-navy-900 text-white"
                    : "border-border hover:border-navy-300 bg-card"
                }`}
              >
                {type === "dog" ? (
                  <Dog className="w-10 h-10" />
                ) : (
                  <Cat className="w-10 h-10" />
                )}
                <span className="font-semibold text-lg">
                  {type === "dog" ? "Hund" : "Kat"}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 1: Breed */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Vælg race</h2>
          <p className="text-muted-foreground text-sm">
            Vælg den race du er interesseret i at beregne for.
          </p>
          <div className="grid gap-3 max-h-96 overflow-y-auto pr-1">
            {availableBreeds.map((breed) => (
              <button
                key={breed.id}
                onClick={() => setInputs((i) => ({ ...i, breedId: breed.id }))}
                className={`flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all ${
                  inputs.breedId === breed.id
                    ? "border-navy-900 bg-navy-50"
                    : "border-border hover:border-navy-200 bg-card"
                }`}
              >
                <div>
                  <p className="font-semibold">{breed.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {breed.sizeClass} · {breed.activityLevel === "high" ? "Aktiv" : breed.activityLevel === "low" ? "Rolig" : "Moderat"}
                  </p>
                </div>
                <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  breed.costIndex <= 30
                    ? "bg-green-100 text-green-700"
                    : breed.costIndex <= 55
                    ? "bg-amber-100 text-amber-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {breed.costIndex <= 30 ? "Billig" : breed.costIndex <= 55 ? "Medium" : "Dyr"}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Profile */}
      {step === 2 && (
        <div className="space-y-5">
          <h2 className="text-2xl font-bold">Kæledyrets profil</h2>

          <div className="space-y-3">
            <label className="text-sm font-medium">Alder</label>
            <div className="flex gap-2 flex-wrap">
              {[0, 1, 2, 4, 7, 10].map((age) => (
                <button
                  key={age}
                  onClick={() => setInputs((i) => ({ ...i, ageYears: age }))}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    inputs.ageYears === age
                      ? "bg-navy-900 text-white border-navy-900"
                      : "border-border hover:border-navy-300"
                  }`}
                >
                  {age === 0 ? "Hvalp/killing" : `${age} år`}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Aktivitetsniveau</label>
            <div className="flex gap-2">
              {(["low", "medium", "high"] as ActivityLevel[]).map((level) => (
                <button
                  key={level}
                  onClick={() => setInputs((i) => ({ ...i, activityLevel: level }))}
                  className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                    inputs.activityLevel === level
                      ? "bg-navy-900 text-white border-navy-900"
                      : "border-border hover:border-navy-300"
                  }`}
                >
                  {level === "low" ? "Rolig" : level === "medium" ? "Moderat" : "Meget aktiv"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Boligtype</label>
            <div className="flex gap-2">
              {(["apartment", "house"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setInputs((i) => ({ ...i, housingType: type }))}
                  className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                    inputs.housingType === type
                      ? "bg-navy-900 text-white border-navy-900"
                      : "border-border hover:border-navy-300"
                  }`}
                >
                  {type === "apartment" ? "Lejlighed" : "Hus/villa"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Budget */}
      {step === 3 && (
        <div className="space-y-5">
          <h2 className="text-2xl font-bold">Budget og præferencer</h2>

          <div className="space-y-3">
            <label className="text-sm font-medium">Budgetniveau</label>
            <div className="space-y-2">
              {(
                [
                  { id: "budget", label: "Budget", desc: "Basiskvalitet, fokus på pris" },
                  { id: "medium", label: "Medium", desc: "God kvalitet til rimelig pris" },
                  { id: "premium", label: "Premium", desc: "Bedste kvalitet, ingen kompromiser" },
                ] as { id: BudgetLevel; label: string; desc: string }[]
              ).map((level) => (
                <button
                  key={level.id}
                  onClick={() => setInputs((i) => ({ ...i, budgetLevel: level.id }))}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all ${
                    inputs.budgetLevel === level.id
                      ? "border-navy-900 bg-navy-50"
                      : "border-border hover:border-navy-200"
                  }`}
                >
                  <div>
                    <p className="font-semibold">{level.label}</p>
                    <p className="text-sm text-muted-foreground">{level.desc}</p>
                  </div>
                  {inputs.budgetLevel === level.id && (
                    <CheckCircle2 className="w-5 h-5 text-navy-900" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Forsikring</label>
            <div className="flex gap-2">
              {[true, false].map((val) => (
                <button
                  key={String(val)}
                  onClick={() => setInputs((i) => ({ ...i, hasInsurance: val }))}
                  className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                    inputs.hasInsurance === val
                      ? "bg-navy-900 text-white border-navy-900"
                      : "border-border hover:border-navy-300"
                  }`}
                >
                  {val ? "Ja, med forsikring" : "Nej, uden forsikring"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Grooming</label>
            <div className="flex gap-2">
              {(["home", "mixed", "professional"] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setInputs((i) => ({ ...i, groomingLevel: level }))}
                  className={`flex-1 py-2.5 rounded-lg border text-xs font-medium transition-colors ${
                    inputs.groomingLevel === level
                      ? "bg-navy-900 text-white border-navy-900"
                      : "border-border hover:border-navy-300"
                  }`}
                >
                  {level === "home" ? "Hjemme" : level === "mixed" ? "Blandet" : "Professionel"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Result */}
      {step === STEPS.length - 1 && result && selectedBreed && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{selectedBreed.name}</h2>
              <p className="text-muted-foreground text-sm">
                Beregnet med {inputs.budgetLevel === "budget" ? "budget" : inputs.budgetLevel === "medium" ? "medium" : "premium"}-niveau
                {inputs.hasInsurance ? " · med forsikring" : " · uden forsikring"}
              </p>
            </div>
            <button
              onClick={() => { setStep(0); setResult(null); setInputs(defaultInputs); }}
              className="text-sm text-muted-foreground hover:text-foreground underline"
            >
              Ny beregning
            </button>
          </div>
          <CostResultCard result={result} breed={selectedBreed} />
        </div>
      )}

      {/* Navigation */}
      {step < STEPS.length - 1 && (
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Tilbage
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="gap-2"
          >
            {step === STEPS.length - 2 ? "Beregn nu" : "Næste"}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
