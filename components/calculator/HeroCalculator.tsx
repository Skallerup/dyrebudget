"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { breeds } from "@/data/breeds";
import { calculatePetCost, formatCurrency } from "@/lib/calculator";
import type { PetType, BudgetLevel } from "@/types";
import { Button } from "@/components/ui/button";
import { BreedCombobox } from "@/components/ui/breed-combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, ChevronRight, Zap } from "lucide-react";

export function HeroCalculator() {
  const router = useRouter();
  const [petType, setPetType] = useState<PetType>("dog");
  const [breedId, setBreedId] = useState("");
  const [budgetLevel, setBudgetLevel] = useState<BudgetLevel>("medium");
  const [result, setResult] = useState<{ monthly: number; daily: number } | null>(null);

  const availableBreeds = breeds.filter((b) => b.petType === petType);

  // #6 — Auto-calculate live preview whenever breed or budget changes
  useEffect(() => {
    if (!breedId) { setResult(null); return; }
    const breed = breeds.find((b) => b.id === breedId);
    if (!breed) return;
    const res = calculatePetCost(breed, {
      petType,
      breedId,
      ageYears: 2,
      budgetLevel,
      activityLevel: "medium",
      hasInsurance: true,
      housingType: "house",
      groomingLevel: "mixed",
    });
    setResult({ monthly: res.monthlyCost, daily: res.dailyCost });
  }, [breedId, budgetLevel, petType]);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-border p-6 w-full max-w-lg">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center">
          <Calculator className="w-4 h-4 text-mint-400" />
        </div>
        <p className="font-semibold text-navy-900">Hurtig beregning</p>
        {breedId && (
          <span className="ml-auto flex items-center gap-1 text-xs text-mint-600 font-medium">
            <Zap className="w-3 h-3" />
            Live
          </span>
        )}
      </div>

      <div className="space-y-3">
        {/* Pet type */}
        <div className="flex gap-2">
          {(["dog", "cat"] as PetType[]).map((type) => (
            <button
              key={type}
              onClick={() => { setPetType(type); setBreedId(""); }}
              className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                petType === type
                  ? "bg-navy-900 text-white border-navy-900"
                  : "border-border hover:border-navy-200 text-muted-foreground"
              }`}
            >
              {type === "dog" ? "🐕 Hund" : "🐈 Kat"}
            </button>
          ))}
        </div>

        {/* Breed */}
        <BreedCombobox
          breeds={availableBreeds}
          value={breedId}
          onChange={(v) => setBreedId(v)}
          placeholder="Vælg race for at se pris..."
        />

        {/* Budget level */}
        <Select value={budgetLevel} onValueChange={(v) => setBudgetLevel(v as BudgetLevel)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="budget">Budget</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Live result */}
      {result ? (
        <div className="mt-5 pt-5 border-t border-border">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center bg-navy-900 rounded-xl p-3">
              <p className="text-xs text-navy-400 mb-1">Per dag</p>
              <p className="text-2xl font-bold text-white">{result.daily} kr.</p>
            </div>
            <div className="text-center bg-muted/50 rounded-xl p-3">
              <p className="text-xs text-muted-foreground mb-1">Per måned</p>
              <p className="text-2xl font-bold text-navy-900">{formatCurrency(result.monthly)}</p>
            </div>
          </div>
          <Button
            onClick={() => router.push(`/beregner?breed=${breedId}&budget=${budgetLevel}`)}
            className="w-full gap-2"
            size="lg"
          >
            Se fuld beregning med breakdown
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground text-center mt-4">
          Vælg en race for at se prisen med det samme
        </p>
      )}
    </div>
  );
}
