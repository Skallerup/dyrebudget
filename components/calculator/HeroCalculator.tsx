"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { breeds } from "@/data/breeds";
import { calculatePetCost } from "@/lib/calculator";
import { formatCurrency } from "@/lib/calculator";
import type { PetType, BudgetLevel } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, ChevronRight } from "lucide-react";

export function HeroCalculator() {
  const router = useRouter();
  const [petType, setPetType] = useState<PetType>("dog");
  const [breedId, setBreedId] = useState("");
  const [budgetLevel, setBudgetLevel] = useState<BudgetLevel>("medium");
  const [result, setResult] = useState<{ monthly: number; daily: number } | null>(null);

  const availableBreeds = breeds.filter((b) => b.petType === petType);

  function handleCalculate() {
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
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-border p-6 w-full max-w-lg">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center">
          <Calculator className="w-4 h-4 text-mint-400" />
        </div>
        <p className="font-semibold text-navy-900">Hurtig beregning</p>
      </div>

      <div className="space-y-3">
        {/* Pet type */}
        <div className="flex gap-2">
          {(["dog", "cat"] as PetType[]).map((type) => (
            <button
              key={type}
              onClick={() => { setPetType(type); setBreedId(""); setResult(null); }}
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
        <Select value={breedId} onValueChange={(v) => { setBreedId(v); setResult(null); }}>
          <SelectTrigger>
            <SelectValue placeholder="Vælg race..." />
          </SelectTrigger>
          <SelectContent>
            {availableBreeds.map((b) => (
              <SelectItem key={b.id} value={b.id}>
                {b.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Budget level */}
        <Select value={budgetLevel} onValueChange={(v) => { setBudgetLevel(v as BudgetLevel); setResult(null); }}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="budget">Budget</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={handleCalculate}
          disabled={!breedId}
          className="w-full gap-2"
          size="lg"
        >
          Beregn pris
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {result && (
        <div className="mt-5 pt-5 border-t border-border">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Per dag</p>
              <p className="text-2xl font-bold text-navy-900">{result.daily} kr.</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Per måned</p>
              <p className="text-2xl font-bold text-navy-900">
                {formatCurrency(result.monthly)}
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push("/beregner")}
            className="mt-4 w-full text-sm text-mint-600 hover:text-mint-700 font-medium flex items-center justify-center gap-1"
          >
            Se fuld beregning med breakdown
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
