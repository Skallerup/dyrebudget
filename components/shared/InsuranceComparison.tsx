import Link from "next/link";
import type { Product } from "@/types";
import { BestInTestBox } from "@/components/shared/BestInTestBox";
import { ProductComparisonTable } from "@/components/shared/ProductComparisonTable";
import { ArrowRight, ShieldCheck, TrendingUp, Coins, MapPin } from "lucide-react";

interface InsuranceComparisonProps {
  petType: "dog" | "cat";
  products: Product[];
  bestPick: Product;
  bestReasons: string[];
}

const factors = [
  {
    icon: ShieldCheck,
    title: "Dækningsgrad",
    text: "Jo højere maksimal årlig udbetaling og jo flere behandlinger der dækkes, desto højere præmie. Tjek loftet pr. år og pr. skade.",
  },
  {
    icon: TrendingUp,
    title: "Race & alder",
    text: "Racer med kendte sundhedsproblemer og ældre dyr koster mere at forsikre. Tegn forsikringen mens dyret er ungt og rask.",
  },
  {
    icon: Coins,
    title: "Selvrisiko",
    text: "En højere selvrisiko (fast beløb + procentdel) sænker den månedlige præmie — men koster mere ved hvert dyrlægebesøg.",
  },
  {
    icon: MapPin,
    title: "Tilvalg",
    text: "Udvidet dækning til medicin, tandbehandling eller livsforsikring koster ekstra. Vælg kun det du reelt har brug for.",
  },
];

export function InsuranceComparison({
  petType,
  products,
  bestPick,
  bestReasons,
}: InsuranceComparisonProps) {
  const animal = petType === "dog" ? "hund" : "kat";

  return (
    <div className="space-y-12">
      {/* First-year shock hook */}
      <div className="bg-navy-900 text-white rounded-2xl p-6">
        <p className="text-mint-400 text-sm font-medium mb-2">Derfor er forsikring vigtig</p>
        <p className="text-lg font-semibold mb-2">
          En enkelt operation kan koste 20.000–40.000 kr.
        </p>
        <p className="text-navy-300 text-sm">
          De fleste {animal}eejere undervurderer dyrlægeregningerne. En forsikring fra dag ét
          er den billigste måde at undgå et økonomisk chok — især for racer med høj sundhedsrisiko.
        </p>
      </div>

      {/* Best pick */}
      <section>
        <h2 className="text-xl font-bold mb-4">Vores anbefaling</h2>
        <BestInTestBox
          product={bestPick}
          label="Bedst i test"
          reasons={bestReasons}
          campaign={`forsikring-${animal}`}
        />
      </section>

      {/* Comparison table */}
      <section>
        <h2 className="text-xl font-bold mb-4">Sammenlign {animal}eforsikringer</h2>
        <ProductComparisonTable
          products={products}
          priceLabel="Pris/md."
          campaign={`forsikring-${animal}-tabel`}
          placement="insurance_comparison"
        />
      </section>

      {/* Price factors */}
      <section>
        <h2 className="text-xl font-bold mb-4">Hvad påvirker prisen?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {factors.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="flex gap-3 p-4 rounded-xl border border-border bg-card">
                <div className="w-9 h-9 rounded-lg bg-navy-100 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-navy-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA to calculator */}
      <div className="bg-mint-50 border border-mint-200 rounded-2xl p-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="font-semibold text-navy-900 mb-1">Hvad koster din {animal} i alt?</p>
          <p className="text-sm text-muted-foreground">
            Se hvad forsikring fylder i det samlede budget for netop din race.
          </p>
        </div>
        <Link
          href="/beregner"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-lg transition-colors text-sm shrink-0"
        >
          Åbn beregner
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
