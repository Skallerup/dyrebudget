"use client";

import Link from "next/link";
import { PetCostResult, Breed } from "@/types";
import { formatCurrency, getCostIndexBgColor } from "@/lib/calculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, TrendingDown, Shield, ArrowRight, GitCompare, AlertTriangle } from "lucide-react";
import { BreakdownChart } from "./BreakdownChart";
import { RecommendedProducts } from "@/components/shared/RecommendedProducts";
import { getBreedRecommendedProducts } from "@/data/products";

interface CostResultCardProps {
  result: PetCostResult;
  breed: Breed;
}

const breakdownLabels: Record<string, string> = {
  food: "Foder",
  insurance: "Forsikring",
  vet: "Dyrlæge",
  grooming: "Grooming",
  treats: "Godbidder",
  toys: "Legetøj",
  fleaTick: "Loppe/Flåt",
  equipment: "Udstyr",
  miscellaneous: "Diverse",
};

export function CostResultCard({ result, breed }: CostResultCardProps) {
  const noInsurance = result.breakdown.insurance === 0;
  const insuranceAffiliate = breed.petType === "dog"
    ? "https://www.agria.dk/hund/"
    : "https://www.agria.dk/kat/";

  return (
    <div className="space-y-6">
      {/* Main cost numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Per dag" value={`${result.dailyCost} kr.`} sublabel="inkl. alle udgifter" highlight />
        <MetricCard label="Per måned" value={formatCurrency(result.monthlyCost)} sublabel="gennemsnit" />
        <MetricCard label="Første år" value={formatCurrency(result.firstYearCost)} sublabel="inkl. anskaffelse" />
        <MetricCard
          label="Livstid"
          value={formatCurrency(result.lifetimeCost)}
          sublabel={`ca. ${Math.round((breed.lifespan.min + breed.lifespan.max) / 2)} år`}
        />
      </div>

      {/* Cost index */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
        <span className="text-sm text-muted-foreground">Race omkostningsindeks:</span>
        <span className={`text-sm font-bold px-3 py-1 rounded-full ${getCostIndexBgColor(result.costIndex)}`}>
          {result.costIndex}/100 — {result.costLabel.charAt(0).toUpperCase() + result.costLabel.slice(1)}
        </span>
      </div>

      {/* Breakdown chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Månedlig udgiftsfordeling</CardTitle>
        </CardHeader>
        <CardContent>
          <BreakdownChart breakdown={result.breakdown} total={result.monthlyCost} />
        </CardContent>
      </Card>

      {/* Breakdown table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Detaljeret breakdown</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {Object.entries(result.breakdown).map(([key, value]) => {
              if (value === 0) return null;
              const pct = Math.round((value / result.monthlyCost) * 100);
              return (
                <div key={key} className="flex items-center justify-between px-6 py-3">
                  <span className="text-sm text-muted-foreground">{breakdownLabels[key] || key}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-navy-900 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-sm font-semibold w-20 text-right">{formatCurrency(value)}/md.</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* #5 — Insurance urgency CTA */}
      {noInsurance && breed.healthRisk !== "low" && (
        <div className={`rounded-xl p-5 border ${
          breed.healthRisk === "high"
            ? "bg-red-50 border-red-200"
            : "bg-amber-50 border-amber-200"
        }`}>
          <div className="flex items-start gap-3">
            <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${
              breed.healthRisk === "high" ? "text-red-500" : "text-amber-500"
            }`} />
            <div className="flex-1">
              <p className={`font-semibold text-sm mb-1 ${
                breed.healthRisk === "high" ? "text-red-800" : "text-amber-800"
              }`}>
                Du valgte ingen forsikring — {breed.name} har{" "}
                {breed.healthRisk === "high" ? "høj" : "middel"} sundhedsrisiko
              </p>
              <p className={`text-sm mb-3 ${
                breed.healthRisk === "high" ? "text-red-700" : "text-amber-700"
              }`}>
                En enkelt ortopædisk operation kan koste 20.000–50.000 kr.
                Forsikring fra Agria koster fra{" "}
                {formatCurrency(breed.monthlyInsurance.budget)}/md.
                — én operation svarer til {Math.round(25000 / breed.monthlyInsurance.budget)} måneders præmier.
              </p>
              <a
                href={insuranceAffiliate}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className={`inline-flex items-center gap-1.5 text-sm font-semibold ${
                  breed.healthRisk === "high"
                    ? "text-red-700 hover:text-red-900"
                    : "text-amber-700 hover:text-amber-900"
                }`}
              >
                <Shield className="w-4 h-4" />
                Se forsikringspriser fra Agria
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {noInsurance && breed.healthRisk === "low" && (
        <div className="rounded-xl p-4 border border-border bg-muted/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-muted-foreground shrink-0" />
            <p className="text-sm text-muted-foreground">
              {breed.name} har lav sundhedsrisiko — forsikring er stadig en god idé ved akuttilfælde.
            </p>
          </div>
          <a
            href={insuranceAffiliate}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="text-xs font-semibold text-navy-600 hover:text-navy-900 shrink-0"
          >
            Se priser →
          </a>
        </div>
      )}

      {/* With insurance + high risk = positive reinforcement */}
      {!noInsurance && breed.healthRisk === "high" && (
        <div className="rounded-xl p-4 border border-mint-200 bg-mint-50 flex items-center gap-3">
          <Shield className="w-4 h-4 text-mint-600 shrink-0" />
          <p className="text-sm text-mint-700">
            God beslutning. Din {breed.name} har høj sundhedsrisiko — forsikringen på{" "}
            {formatCurrency(result.breakdown.insurance)}/md. kan spare dig for store dyrlægeregninger.
          </p>
        </div>
      )}

      {/* Saving tips */}
      {result.savingsTips.length > 0 && (
        <Card className="border-mint-200 bg-mint-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-mint-800">
              <TrendingDown className="w-4 h-4" />
              Spareforslag
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-2">
              {result.savingsTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-mint-700">
                  <Lightbulb className="w-4 h-4 mt-0.5 shrink-0 text-mint-500" />
                  {tip}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Recommended products */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Produkter til din {breed.name}</CardTitle>
          <p className="text-xs text-muted-foreground">Udvalgt baseret på din beregning</p>
        </CardHeader>
        <CardContent>
          <RecommendedProducts
            products={getBreedRecommendedProducts(breed, result.breakdown.insurance > 0)}
            title=""
            showAllLink={true}
          />
        </CardContent>
      </Card>

      {/* #9 — Compare CTA */}
      <div className="flex items-center justify-between p-4 bg-navy-50 rounded-xl border border-navy-100">
        <div className="flex items-center gap-3">
          <GitCompare className="w-4 h-4 text-navy-600 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-navy-900">Sammenlign med en anden race</p>
            <p className="text-xs text-muted-foreground">Se hvilken race der passer bedst til dit budget</p>
          </div>
        </div>
        <Link
          href="/sammenlign"
          className="text-sm font-semibold text-navy-600 hover:text-navy-900 flex items-center gap-1 shrink-0 ml-4"
        >
          Sammenlign
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  sublabel,
  highlight = false,
}: {
  label: string;
  value: string;
  sublabel: string;
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-xl p-4 text-center ${highlight ? "bg-navy-900 text-white" : "bg-muted/50 border border-border"}`}>
      <p className={`text-xs font-medium mb-1 ${highlight ? "text-navy-300" : "text-muted-foreground"}`}>{label}</p>
      <p className={`text-2xl font-bold tabular-nums ${highlight ? "text-white" : "text-foreground"}`}>{value}</p>
      <p className={`text-xs mt-1 ${highlight ? "text-navy-400" : "text-muted-foreground"}`}>{sublabel}</p>
    </div>
  );
}
