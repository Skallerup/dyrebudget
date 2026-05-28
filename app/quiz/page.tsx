"use client";

import { useState } from "react";
import { breeds } from "@/data/breeds";
import { calculatePetCost } from "@/lib/calculator";
import { formatCurrency } from "@/lib/calculator";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { RaceCard } from "@/components/shared/RaceCard";
import { ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import Link from "next/link";
import type { Breed } from "@/types";

interface QuizAnswers {
  monthlyBudget: number;
  housingType: string;
  experience: string;
  activityLevel: string;
  allergy: boolean;
  petType: string;
}

const defaultAnswers: QuizAnswers = {
  monthlyBudget: 2500,
  housingType: "house",
  experience: "beginner",
  activityLevel: "medium",
  allergy: false,
  petType: "any",
};

const budgetOptions = [
  { value: 1500, label: "Under 1.500 kr./md.", desc: "Stramt budget" },
  { value: 2500, label: "1.500–3.000 kr./md.", desc: "Moderat budget" },
  { value: 4000, label: "3.000–5.000 kr./md.", desc: "Fleksibelt budget" },
  { value: 6000, label: "5.000+ kr./md.", desc: "Intet budget-fokus" },
];

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(defaultAnswers);
  const [results, setResults] = useState<Breed[]>([]);
  const [done, setDone] = useState(false);

  const TOTAL_STEPS = 5;

  function computeResults() {
    trackEvent("quiz_completed", { petType: answers.petType });

    const filtered = breeds.filter((b) => {
      if (answers.petType !== "any" && b.petType !== answers.petType) return false;

      const result = calculatePetCost(b, {
        petType: b.petType,
        breedId: b.id,
        ageYears: 2,
        budgetLevel: "medium",
        activityLevel: answers.activityLevel as "low" | "medium" | "high",
        hasInsurance: true,
        housingType: answers.housingType as "apartment" | "house",
        groomingLevel: "mixed",
      });

      if (result.monthlyCost > answers.monthlyBudget * 1.15) return false;

      if (answers.housingType === "apartment" && b.activityLevel === "high" && b.sizeClass === "large") return false;

      if (answers.experience === "beginner" && b.activityLevel === "high" && b.healthRisk === "high") return false;

      if (answers.allergy && b.coatType !== "short") return false;

      return true;
    });

    filtered.sort((a, b) => a.costIndex - b.costIndex);
    setResults(filtered.slice(0, 4));
    setDone(true);
  }

  if (done) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={[{ label: "Quiz" }]} />
        <h1 className="text-3xl font-bold mb-2">Dine bedste matches</h1>
        <p className="text-muted-foreground mb-8">
          Baseret på dine svar anbefaler vi disse kæledyr inden for dit budget.
        </p>
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {results.map((breed) => <RaceCard key={breed.id} breed={breed} />)}
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
            <p className="font-semibold text-amber-800 mb-2">Ingen perfekte matches</p>
            <p className="text-amber-700 text-sm">
              Vi fandt ingen racer der matcher alle dine kriterier præcist. Prøv at øge dit budget
              eller justere andre svar.
            </p>
          </div>
        )}
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => { setDone(false); setStep(0); setAnswers(defaultAnswers); }}>
            Tag quiz igen
          </Button>
          <Button asChild>
            <Link href="/beregner">Fuld beregner</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: "Quiz" }]} />
      <div className="mb-8">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Spørgsmål {step + 1} af {TOTAL_STEPS}</span>
          <span>{Math.round(((step + 1) / TOTAL_STEPS) * 100)}%</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-mint-600 transition-all"
            style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 0: Pet type */}
      {step === 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Hund eller kat?</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "dog", label: "🐕 Hund" },
              { value: "cat", label: "🐈 Kat" },
              { value: "any", label: "🤔 Begge" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setAnswers((a) => ({ ...a, petType: opt.value }))}
                className={`p-4 rounded-xl border-2 font-medium text-center transition-all ${
                  answers.petType === opt.value
                    ? "border-navy-900 bg-navy-50"
                    : "border-border hover:border-navy-200"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 1: Budget */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Hvad er dit månedlige budget?</h2>
          <p className="text-muted-foreground text-sm">Inkl. foder, forsikring og dyrlæge.</p>
          <div className="space-y-3">
            {budgetOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setAnswers((a) => ({ ...a, monthlyBudget: opt.value }))}
                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all ${
                  answers.monthlyBudget === opt.value
                    ? "border-navy-900 bg-navy-50"
                    : "border-border hover:border-navy-200"
                }`}
              >
                <div>
                  <p className="font-medium">{opt.label}</p>
                  <p className="text-sm text-muted-foreground">{opt.desc}</p>
                </div>
                {answers.monthlyBudget === opt.value && (
                  <CheckCircle2 className="w-5 h-5 text-navy-900 shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Housing */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Hvilken boligtype har du?</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "apartment", label: "🏢 Lejlighed", desc: "Lejlighed eller etagebolg" },
              { value: "house", label: "🏡 Hus", desc: "Hus, villa eller rækkehus" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setAnswers((a) => ({ ...a, housingType: opt.value }))}
                className={`p-5 rounded-xl border-2 text-center transition-all ${
                  answers.housingType === opt.value
                    ? "border-navy-900 bg-navy-50"
                    : "border-border hover:border-navy-200"
                }`}
              >
                <p className="text-2xl mb-2">{opt.label.split(" ")[0]}</p>
                <p className="font-medium text-sm">{opt.label.split(" ").slice(1).join(" ")}</p>
                <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Experience */}
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Hvad er din erfaring med kæledyr?</h2>
          <div className="space-y-3">
            {[
              { value: "beginner", label: "Første kæledyr", desc: "Jeg har aldrig haft kæledyr før" },
              { value: "intermediate", label: "Erfaren", desc: "Jeg har haft kæledyr tidligere" },
              { value: "expert", label: "Meget erfaren", desc: "Jeg er fortrolig med krævende racer" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setAnswers((a) => ({ ...a, experience: opt.value }))}
                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all ${
                  answers.experience === opt.value
                    ? "border-navy-900 bg-navy-50"
                    : "border-border hover:border-navy-200"
                }`}
              >
                <div>
                  <p className="font-medium">{opt.label}</p>
                  <p className="text-sm text-muted-foreground">{opt.desc}</p>
                </div>
                {answers.experience === opt.value && <CheckCircle2 className="w-5 h-5 text-navy-900" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Activity + allergy */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Aktivitetsniveau og allergi</h2>
            <div className="space-y-3">
              <label className="text-sm font-medium">Hvor aktiv er du?</label>
              <div className="flex gap-2">
                {[
                  { value: "low", label: "Rolig" },
                  { value: "medium", label: "Moderat" },
                  { value: "high", label: "Meget aktiv" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setAnswers((a) => ({ ...a, activityLevel: opt.value }))}
                    className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                      answers.activityLevel === opt.value
                        ? "bg-navy-900 text-white border-navy-900"
                        : "border-border hover:border-navy-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium">Har du hår-allergi?</label>
              <div className="flex gap-2">
                {[
                  { value: false, label: "Nej" },
                  { value: true, label: "Ja — kortpels foretrækkes" },
                ].map((opt) => (
                  <button
                    key={String(opt.value)}
                    onClick={() => setAnswers((a) => ({ ...a, allergy: opt.value }))}
                    className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                      answers.allergy === opt.value
                        ? "bg-navy-900 text-white border-navy-900"
                        : "border-border hover:border-navy-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
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
          onClick={step < TOTAL_STEPS - 1 ? () => setStep((s) => s + 1) : computeResults}
          className="gap-2"
        >
          {step < TOTAL_STEPS - 1 ? "Næste" : "Se mine matches"}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
