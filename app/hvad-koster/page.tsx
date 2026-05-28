import type { Metadata } from "next";
import { breeds } from "@/data/breeds";
import { RaceCard } from "@/components/shared/RaceCard";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Hvad koster — Alle racer med priser",
  description:
    "Se hvad det koster at eje 51 populære hunde- og katteracer i Danmark. Komplet oversigt med månedspris, livstidspris og omkostningsindeks.",
  alternates: { canonical: "/hvad-koster" },
};

export default function HvadKosterPage() {
  const dogs = breeds.filter((b) => b.petType === "dog");
  const cats = breeds.filter((b) => b.petType === "cat");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: "Hvad koster" }]} />
      <h1 className="text-3xl font-bold mb-2">Hvad koster et kæledyr?</h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        Komplet prisdatabase over 19 populære racer i Danmark. Klik på en race for fuld beregning med breakdown.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-5">🐕 Hunderacer ({dogs.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {dogs.map((breed) => (
            <RaceCard key={breed.id} breed={breed} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-5">🐈 Katteracer ({cats.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cats.map((breed) => (
            <RaceCard key={breed.id} breed={breed} />
          ))}
        </div>
      </section>

      {/* Guide links */}
      <section className="mt-14">
        <h2 className="text-xl font-bold mb-5">Relaterede guider</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: "/guides/billigste-hunderacer", label: "De 5 billigste hunderacer" },
            { href: "/guides/billigste-katteracer", label: "De 5 billigste katteracer" },
            { href: "/guides/hvad-koster-en-labrador", label: "Hvad koster en Labrador?" },
            { href: "/guides/hvad-koster-en-golden-retriever", label: "Hvad koster en Golden Retriever?" },
            { href: "/guides/hvad-koster-en-fransk-bulldog", label: "Hvad koster en Fransk Bulldog?" },
            { href: "/guides/hvalpe-budget", label: "Budget til din første hvalp" },
          ].map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-navy-300 hover:shadow-sm transition-all"
            >
              <span className="text-sm font-medium group-hover:text-navy-900 transition-colors">{guide.label}</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-navy-900 transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
