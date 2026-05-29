"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { breeds, getBreedsByPetType } from "@/data/breeds";
import { getBreedImage } from "@/data/breedImages";
import { calculatePetCost } from "@/lib/calculator";
import { trackEvent } from "@/lib/analytics";
import type { CalculatorInputs, PetType, BudgetLevel, ActivityLevel } from "@/types";
import { Button } from "@/components/ui/button";
import { CostResultCard } from "./CostResultCard";
import { EmailCapture } from "@/components/shared/EmailCapture";
import { ChevronLeft, ChevronRight, Dog, Cat, CheckCircle2, Share2, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const STEPS = ["Kæledyr", "Race", "Profil", "Budget", "Resultat"];

const SIZE_LABELS: Record<string, string> = {
  alle: "Alle",
  tiny: "Mini",
  small: "Lille",
  medium: "Medium",
  large: "Stor",
  giant: "Meget stor",
};

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
  const [sizeFilter, setSizeFilter] = useState<string>("alle");
  const [shareCopied, setShareCopied] = useState(false);

  const availableBreeds = getBreedsByPetType(inputs.petType);
  const selectedBreed = breeds.find((b) => b.id === inputs.breedId);
  const progress = ((step + 1) / STEPS.length) * 100;

  // #8 — Read URL params on mount to pre-fill or auto-show result
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const breedParam = params.get("breed");
    const budgetParam = params.get("budget") as BudgetLevel | null;
    const insuranceParam = params.get("insurance");
    const groomingParam = params.get("grooming");

    if (!breedParam) return;
    const breed = breeds.find((b) => b.id === breedParam);
    if (!breed) return;

    const newInputs: CalculatorInputs = {
      ...defaultInputs,
      petType: breed.petType,
      breedId: breedParam,
      ...(budgetParam && ["budget", "medium", "premium"].includes(budgetParam) && { budgetLevel: budgetParam }),
      ...(insuranceParam !== null && { hasInsurance: insuranceParam !== "false" }),
      ...(groomingParam && ["home", "mixed", "professional"].includes(groomingParam) && {
        groomingLevel: groomingParam as CalculatorInputs["groomingLevel"],
      }),
    };

    setInputs(newInputs);

    if (budgetParam) {
      const res = calculatePetCost(breed, newInputs);
      setResult(res);
      setStep(STEPS.length - 1);
    } else {
      setStep(1);
    }
  }, []);

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
        // #8 — Update URL to reflect current calculation
        const url = new URL(window.location.href);
        url.searchParams.set("breed", inputs.breedId);
        url.searchParams.set("budget", inputs.budgetLevel);
        url.searchParams.set("insurance", String(inputs.hasInsurance));
        url.searchParams.set("grooming", inputs.groomingLevel);
        window.history.replaceState({}, "", url.toString());
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

  // #8 — Share current calculation
  function handleShare() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    });
  }

  function canProceed(): boolean {
    if (step === 0) return true;
    if (step === 1) return !!inputs.breedId;
    return true;
  }

  // #2 — Filtered breeds for visual picker
  const filteredBreeds = sizeFilter === "alle"
    ? availableBreeds
    : availableBreeds.filter((b) => b.sizeClass === sizeFilter);

  const sizeOptions = ["alle", ...Array.from(new Set(availableBreeds.map((b) => b.sizeClass)))];

  return (
    <div className="max-w-2xl mx-auto">
      {step < STEPS.length - 1 && (
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {STEPS.slice(0, -1).map((s, i) => (
              <span
                key={s}
                className={`text-xs font-medium ${
                  i === step ? "text-navy-900" : i < step ? "text-mint-600" : "text-muted-foreground"
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
                {type === "dog" ? <Dog className="w-10 h-10" /> : <Cat className="w-10 h-10" />}
                <span className="font-semibold text-lg">{type === "dog" ? "Hund" : "Kat"}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 1: Breed — #2 visual grid with size filters */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Vælg race</h2>
            <p className="text-muted-foreground text-sm">Klik på din race for at vælge den.</p>
          </div>

          {/* Size filter */}
          <div className="flex gap-2 flex-wrap">
            {sizeOptions.map((size) => (
              <button
                key={size}
                onClick={() => setSizeFilter(size)}
                className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${
                  sizeFilter === size
                    ? "bg-navy-900 text-white border-navy-900"
                    : "border-border hover:border-navy-300 text-muted-foreground"
                }`}
              >
                {SIZE_LABELS[size] ?? size}
              </button>
            ))}
          </div>

          {/* Breed grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[480px] overflow-y-auto pr-1 pb-1">
            {filteredBreeds.map((breed) => {
              const imageUrl = getBreedImage(breed.slug);
              const selected = inputs.breedId === breed.id;
              return (
                <button
                  key={breed.id}
                  onClick={() => setInputs((i) => ({ ...i, breedId: breed.id }))}
                  className={`relative flex flex-col rounded-xl border-2 overflow-hidden text-left transition-all ${
                    selected
                      ? "border-navy-900 shadow-md"
                      : "border-border hover:border-navy-300"
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-24 w-full bg-muted overflow-hidden">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={breed.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">
                        {breed.petType === "dog" ? "🐕" : "🐈"}
                      </div>
                    )}
                    {selected && (
                      <div className="absolute inset-0 bg-navy-900/40 flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="p-2.5">
                    <p className="font-semibold text-sm leading-tight">{breed.name}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                        breed.costIndex <= 35 ? "bg-green-100 text-green-700" :
                        breed.costIndex <= 60 ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {breed.costIndex <= 35 ? "Billig" : breed.costIndex <= 60 ? "Medium" : "Dyr"}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {inputs.breedId && selectedBreed && (
            <div className="flex items-center gap-2 p-3 bg-mint-50 border border-mint-200 rounded-xl text-sm">
              <CheckCircle2 className="w-4 h-4 text-mint-600 shrink-0" />
              <span className="font-medium text-mint-800">{selectedBreed.name} valgt</span>
              <span className="text-mint-600 ml-auto">Tryk Næste →</span>
            </div>
          )}
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

      {/* Step 4: Result — #1 email capture + #8 share button */}
      {step === STEPS.length - 1 && result && selectedBreed && (
        <div>
          <div className="mb-6 flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h2 className="text-2xl font-bold">{selectedBreed.name}</h2>
              <p className="text-muted-foreground text-sm">
                {inputs.budgetLevel === "budget" ? "Budget" : inputs.budgetLevel === "medium" ? "Medium" : "Premium"}
                {inputs.hasInsurance ? " · med forsikring" : " · uden forsikring"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* #8 — Share button */}
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-border hover:border-navy-300 font-medium text-muted-foreground hover:text-navy-700 transition-colors"
              >
                {shareCopied ? <Check className="w-3.5 h-3.5 text-mint-600" /> : <Share2 className="w-3.5 h-3.5" />}
                {shareCopied ? "Kopieret!" : "Del"}
              </button>
              <button
                onClick={() => { setStep(0); setResult(null); setInputs(defaultInputs); window.history.replaceState({}, "", window.location.pathname); }}
                className="text-sm text-muted-foreground hover:text-foreground underline"
              >
                Ny beregning
              </button>
            </div>
          </div>

          <CostResultCard result={result} breed={selectedBreed} />

          {/* #1 — Email capture at the highest-intent moment */}
          <div className="mt-6">
            <EmailCapture breedName={selectedBreed.name} monthlyCost={result.monthlyCost} />
          </div>
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
          <Button onClick={handleNext} disabled={!canProceed()} className="gap-2">
            {step === STEPS.length - 2 ? "Beregn nu" : "Næste"}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
