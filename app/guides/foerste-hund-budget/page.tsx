import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Budget til din første hund — Komplet startbudget",
  description:
    "Komplet startbudget til ny hundeejer i Danmark. Alt hvad du skal bruge det første år med specificerede priser.",
  alternates: { canonical: "/guides/foerste-hund-budget" },
};

const equipmentList = [
  { item: "Hundekurv/seng", budget: "250–500 kr.", medium: "600–1.200 kr.", premium: "1.500–3.000 kr." },
  { item: "Hundefoder (1 mdr.)", budget: "250–450 kr.", medium: "450–700 kr.", premium: "700–1.000 kr." },
  { item: "Madskål + vandskål", budget: "100–200 kr.", medium: "300–600 kr.", premium: "600–1.500 kr." },
  { item: "Hundesnor + sele/halsbånd", budget: "200–400 kr.", medium: "500–900 kr.", premium: "1.000–2.500 kr." },
  { item: "Legetøj (startsæt)", budget: "150–300 kr.", medium: "400–700 kr.", premium: "800–1.500 kr." },
  { item: "Bur / transportbox", budget: "300–600 kr.", medium: "700–1.200 kr.", premium: "1.500–3.000 kr." },
  { item: "Loppebehandling (startsæt)", budget: "100–200 kr.", medium: "200–350 kr.", premium: "350–500 kr." },
  { item: "Veterinærtjek (ny hund)", budget: "400–600 kr.", medium: "400–600 kr.", premium: "400–600 kr." },
];

export default function FoersteHundBudgetPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guider", href: "/guides" },
          { label: "Første hund budget" },
        ]}
      />
      <h1 className="text-3xl font-bold mb-4">Budget til din første hund</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Første år som hundeejer er altid dyrest. Her er en komplet liste over
        hvad du skal bruge — og hvad det koster.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Engangsudgifter ved start</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-3 px-4 font-medium">Udgift</th>
                <th className="py-3 px-4 text-center font-medium">Budget</th>
                <th className="py-3 px-4 text-center font-medium">Medium</th>
                <th className="py-3 px-4 text-center font-medium">Premium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {equipmentList.map((row) => (
                <tr key={row.item} className="hover:bg-muted/20">
                  <td className="py-3 px-4 font-medium">{row.item}</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">{row.budget}</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">{row.medium}</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">{row.premium}</td>
                </tr>
              ))}
              <tr className="bg-navy-50 font-bold">
                <td className="py-3 px-4">Samlet opstartsudstyr</td>
                <td className="py-3 px-4 text-center text-navy-900">~1.750 kr.</td>
                <td className="py-3 px-4 text-center text-navy-900">~4.250 kr.</td>
                <td className="py-3 px-4 text-center text-navy-900">~10.600 kr.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Samlet første-år budget</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { level: "Budget", total: "28.000–35.000 kr.", monthly: "1.500–2.000 kr." },
            { level: "Medium", total: "38.000–50.000 kr.", monthly: "2.500–3.500 kr." },
            { level: "Premium", total: "60.000–90.000 kr.", monthly: "4.000–6.500 kr." },
          ].map((s) => (
            <div key={s.level} className="bg-muted/50 rounded-xl p-4 text-center">
              <p className="font-bold text-lg mb-1">{s.level}</p>
              <p className="text-xl font-bold text-navy-900">{s.total}</p>
              <p className="text-xs text-muted-foreground mt-1">Herefter {s.monthly}/md.</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Inkl. anskaffelsespris på 8.000–15.000 kr. for en racehund med papirer.
        </p>
      </section>

      <div className="bg-navy-900 text-white rounded-2xl p-6">
        <p className="text-navy-300 text-sm mb-2">Næste skridt</p>
        <p className="text-xl font-bold mb-3">Beregn dit personlige budget</p>
        <p className="text-navy-300 text-sm mb-5">
          Brug vores beregner til at se præcist hvad din valgte race koster.
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
