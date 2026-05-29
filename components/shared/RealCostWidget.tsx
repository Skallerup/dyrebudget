"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/calculator";
import { trackEvent } from "@/lib/analytics";
import { Users, CheckCircle2, TrendingUp, TrendingDown } from "lucide-react";

const REGIONS = ["Hovedstaden", "Sjælland", "Syddanmark", "Midtjylland", "Nordjylland"] as const;

interface Stats {
  count: number;
  avg?: number;
  median?: number;
  min?: number;
  max?: number;
  insuredShare?: number;
}

interface RealCostWidgetProps {
  breedSlug: string;
  breedName: string;
  petType: "dog" | "cat";
  /** Our calculator estimate, for comparison */
  estimatedMonthly: number;
}

export function RealCostWidget({ breedSlug, breedName, petType, estimatedMonthly }: RealCostWidgetProps) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [cost, setCost] = useState("");
  const [hasInsurance, setHasInsurance] = useState<boolean | null>(null);
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const loadStats = useCallback(async () => {
    try {
      const res = await fetch(`/api/cost-submissions?breed=${encodeURIComponent(breedSlug)}`);
      if (res.ok) setStats(await res.json());
    } catch {
      /* silent — empty state */
    }
  }, [breedSlug]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const monthlyCost = Math.round(Number(cost));
    if (!monthlyCost || monthlyCost < 100 || monthlyCost > 100000) {
      setError("Indtast et realistisk månedligt beløb (100–100.000 kr).");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/cost-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          breedSlug,
          petType,
          monthlyCost,
          hasInsurance: hasInsurance ?? undefined,
          region: region || undefined,
        }),
      });
      if (!res.ok) throw new Error();
      trackEvent("cost_submission", { breedSlug, monthlyCost });
      setSubmitted(true);
      await loadStats();
    } catch {
      setError("Noget gik galt. Prøv igen.");
    } finally {
      setLoading(false);
    }
  }

  const hasData = stats && stats.count >= 3 && stats.avg;
  const diffPct = hasData ? Math.round(((stats!.avg! - estimatedMonthly) / estimatedMonthly) * 100) : 0;

  return (
    <div className="mt-8 border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-6 py-4 bg-navy-900 text-white">
        <Users className="w-5 h-5 text-mint-400" />
        <h3 className="font-semibold">Hvad betaler rigtige {breedName}-ejere?</h3>
      </div>

      <div className="p-6">
        {/* Community stats */}
        {hasData ? (
          <div className="mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
              <div className="bg-mint-50 border border-mint-200 rounded-xl p-3 text-center">
                <p className="text-xs text-mint-700 mb-1">Gennemsnit</p>
                <p className="font-bold text-navy-900">{formatCurrency(stats!.avg!)}<span className="text-xs font-normal text-muted-foreground">/md.</span></p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Median</p>
                <p className="font-bold text-navy-900">{formatCurrency(stats!.median!)}</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Spænd</p>
                <p className="font-semibold text-sm text-navy-900">{formatCurrency(stats!.min!)}–{formatCurrency(stats!.max!)}</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Har forsikring</p>
                <p className="font-bold text-navy-900">{stats!.insuredShare ?? 0}%</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              {diffPct >= 0 ? <TrendingUp className="w-4 h-4 text-amber-600" /> : <TrendingDown className="w-4 h-4 text-mint-600" />}
              Baseret på <strong className="text-navy-900">{stats!.count}</strong> ejer-indberetninger — {diffPct === 0
                ? "præcis på linje med vores estimat"
                : `${Math.abs(diffPct)}% ${diffPct > 0 ? "højere" : "lavere"} end vores estimat på ${formatCurrency(estimatedMonthly)}`}.
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground mb-6">
            {stats && stats.count > 0
              ? `${stats.count} ${stats.count === 1 ? "ejer har" : "ejere har"} indberettet indtil videre — vi viser gennemsnit ved 3+ indberetninger. Hjælp os videre:`
              : `Vær den første til at dele, hvad du faktisk betaler for din ${breedName}. Anonymt og tager 10 sekunder.`}
          </p>
        )}

        {/* Submission form */}
        {submitted ? (
          <div className="flex items-center gap-3 p-4 bg-mint-50 border border-mint-200 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-mint-600 shrink-0" />
            <div>
              <p className="font-semibold text-mint-800">Tak for din indberetning!</p>
              <p className="text-sm text-mint-600">Du hjælper andre kommende {breedName}-ejere med realistiske tal.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Hvad betaler du om måneden? (kr.)</label>
                <Input
                  type="number"
                  inputMode="numeric"
                  min={100}
                  max={100000}
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="fx 1800"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Region <span className="text-muted-foreground font-normal">(valgfrit)</span></label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Vælg region…</option>
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Har du forsikring? <span className="text-muted-foreground font-normal">(valgfrit)</span></label>
              <div className="flex gap-2">
                {[
                  { label: "Ja", val: true },
                  { label: "Nej", val: false },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setHasInsurance(hasInsurance === opt.val ? null : opt.val)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      hasInsurance === opt.val
                        ? "bg-navy-900 text-white border-navy-900"
                        : "border-border hover:border-navy-300 text-muted-foreground"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-red-600 text-xs">{error}</p>}

            <div className="flex items-center justify-between gap-4 flex-wrap">
              <Button type="submit" disabled={loading} variant="mint">
                {loading ? "Sender…" : "Del mit beløb"}
              </Button>
              <p className="text-xs text-muted-foreground">Anonymt. Vi gemmer ingen personlige oplysninger.</p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
