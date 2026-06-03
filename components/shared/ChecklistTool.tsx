"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, ExternalLink, RotateCcw, ArrowRight } from "lucide-react";
import type { ChecklistCategory } from "@/data/checklist";
import { products } from "@/data/products";
import { trackEvent } from "@/lib/analytics";

function formatRange(min: number, max: number): string {
  return `${min.toLocaleString("da-DK")}–${max.toLocaleString("da-DK")} kr.`;
}

interface ChecklistToolProps {
  categories: ChecklistCategory[];
  storageKey: string;
  /** e.g. "hund" or "kat" — used in copy and analytics */
  animal: string;
}

export function ChecklistTool({ categories, storageKey, animal }: ChecklistToolProps) {
  const allItems = useMemo(() => categories.flatMap((c) => c.items), [categories]);
  const totalCount = allItems.length;

  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(checked));
    } catch {
      /* ignore */
    }
  }, [checked, hydrated, storageKey]);

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function reset() {
    setChecked({});
  }

  const checkedCount = useMemo(
    () => allItems.filter((i) => checked[i.id]).length,
    [allItems, checked]
  );

  const progress = Math.round((checkedCount / totalCount) * 100);

  const { totalMin, totalMax } = useMemo(() => {
    return allItems.reduce(
      (acc, i) => {
        acc.totalMin += i.priceMin;
        acc.totalMax += i.priceMax;
        return acc;
      },
      { totalMin: 0, totalMax: 0 }
    );
  }, [allItems]);

  const { remainingMin, remainingMax } = useMemo(() => {
    return allItems
      .filter((i) => !checked[i.id])
      .reduce(
        (acc, i) => {
          acc.remainingMin += i.priceMin;
          acc.remainingMax += i.priceMax;
          return acc;
        },
        { remainingMin: 0, remainingMax: 0 }
      );
  }, [allItems, checked]);

  return (
    <div>
      {/* Status-bjælke */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border border-border rounded-2xl p-5 mb-10 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-muted-foreground">Din fremgang</p>
            <p className="text-2xl font-bold text-navy-900">
              {checkedCount} / {totalCount}{" "}
              <span className="text-base font-medium text-muted-foreground">krydset af</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Mangler at købe</p>
            <p className="text-xl font-bold text-navy-900">
              {hydrated ? formatRange(remainingMin, remainingMax) : "…"}
            </p>
          </div>
        </div>
        <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-mint-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-xs text-muted-foreground">
            Samlet startbudget: {formatRange(totalMin, totalMax)}
          </p>
          {checkedCount > 0 && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Nulstil
            </button>
          )}
        </div>
      </div>

      {/* Kategorier */}
      <div className="space-y-10">
        {categories.map((category) => {
          const catChecked = category.items.filter((i) => checked[i.id]).length;
          return (
            <section key={category.id}>
              <div className="flex items-baseline justify-between mb-1">
                <h2 className="text-xl font-bold">{category.title}</h2>
                <span className="text-sm text-muted-foreground">
                  {catChecked}/{category.items.length}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{category.description}</p>

              <ul className="space-y-3">
                {category.items.map((item) => {
                  const isChecked = !!checked[item.id];
                  const product = item.productId
                    ? products.find((p) => p.id === item.productId)
                    : undefined;

                  return (
                    <li
                      key={item.id}
                      className={`rounded-xl border p-4 transition-colors ${
                        isChecked ? "border-mint-200 bg-mint-50/50" : "border-border bg-card"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggle(item.id)}
                          aria-pressed={isChecked}
                          aria-label={`Marker ${item.name} som købt`}
                          className={`mt-0.5 w-6 h-6 shrink-0 rounded-md border-2 flex items-center justify-center transition-colors ${
                            isChecked
                              ? "bg-mint-500 border-mint-500 text-white"
                              : "border-border hover:border-navy-400"
                          }`}
                        >
                          {isChecked && <Check className="w-4 h-4" strokeWidth={3} />}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3
                              className={`font-semibold ${
                                isChecked ? "line-through text-muted-foreground" : ""
                              }`}
                            >
                              {item.name}
                            </h3>
                            {item.essential ? (
                              <span className="text-xs px-2 py-0.5 bg-navy-100 text-navy-700 rounded-full font-medium">
                                Vigtigst
                              </span>
                            ) : (
                              <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full">
                                Valgfrit
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{item.why}</p>

                          <div className="flex items-center justify-between gap-3 mt-2 flex-wrap">
                            <span className="text-sm font-medium text-navy-900">
                              {formatRange(item.priceMin, item.priceMax)}
                            </span>
                            {product && (
                              <a
                                href={product.affiliateUrl}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                onClick={() =>
                                  trackEvent("affiliate_click", {
                                    productId: product.id,
                                    productName: product.name,
                                    affiliatePartner: product.affiliatePartner,
                                    source: `huskeliste-${animal}`,
                                  })
                                }
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-mint-700 hover:text-mint-800 transition-colors"
                              >
                                Se anbefalet {product.brand}
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <div className="bg-navy-900 text-white rounded-2xl p-6 mt-12">
        <p className="text-navy-300 text-sm mb-2">Næste skridt</p>
        <p className="text-xl font-bold mb-3">Beregn de løbende udgifter</p>
        <p className="text-navy-300 text-sm mb-5">
          Huskelisten dækker opstarten. Brug beregneren til at se hvad din {animal} koster måned for måned.
        </p>
        <Link
          href="/beregner"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-mint-600 hover:bg-mint-500 text-white font-semibold rounded-lg transition-colors text-sm"
        >
          Åbn beregner
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
