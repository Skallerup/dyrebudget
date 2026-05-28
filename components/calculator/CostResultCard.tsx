"use client";

import { PetCostResult, Breed } from "@/types";
import { formatCurrency, getCostIndexBgColor } from "@/lib/calculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingDown } from "lucide-react";
import { BreakdownChart } from "./BreakdownChart";

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
  return (
    <div className="space-y-6">
      {/* Main cost numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Per dag"
          value={`${result.dailyCost} kr.`}
          sublabel="inkl. alle udgifter"
          highlight
        />
        <MetricCard
          label="Per måned"
          value={formatCurrency(result.monthlyCost)}
          sublabel="gennemsnit"
        />
        <MetricCard
          label="Første år"
          value={formatCurrency(result.firstYearCost)}
          sublabel="inkl. anskaffelse"
        />
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
                  <span className="text-sm text-muted-foreground">
                    {breakdownLabels[key] || key}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-navy-900 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold w-20 text-right">
                      {formatCurrency(value)}/md.
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

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
    <div
      className={`rounded-xl p-4 text-center ${
        highlight ? "bg-navy-900 text-white" : "bg-muted/50 border border-border"
      }`}
    >
      <p className={`text-xs font-medium mb-1 ${highlight ? "text-navy-300" : "text-muted-foreground"}`}>
        {label}
      </p>
      <p className={`text-2xl font-bold tabular-nums ${highlight ? "text-white" : "text-foreground"}`}>
        {value}
      </p>
      <p className={`text-xs mt-1 ${highlight ? "text-navy-400" : "text-muted-foreground"}`}>
        {sublabel}
      </p>
    </div>
  );
}
