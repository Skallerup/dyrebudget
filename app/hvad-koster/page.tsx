import type { Metadata } from "next";
import Link from "next/link";
import { breeds } from "@/data/breeds";
import { RaceCard } from "@/components/shared/RaceCard";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = {
  title: "Hvad koster — Alle racer med priser",
  description:
    "Se hvad det koster at eje 19 populære hunde- og katteracer i Danmark. Komplet oversigt med månedspris, livstidspris og omkostningsindeks.",
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
    </div>
  );
}
