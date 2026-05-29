"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { breeds } from "@/data/breeds";
import { Button } from "@/components/ui/button";
import { BreedCombobox } from "@/components/ui/breed-combobox";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ArrowLeftRight } from "lucide-react";

const popularComparisons = [
  { a: "labrador", b: "golden-retriever", label: "Labrador vs. Golden Retriever" },
  { a: "fransk-bulldog", b: "mops", label: "Fransk Bulldog vs. Mops" },
  { a: "huskat", b: "maine-coon", label: "Huskat vs. Maine Coon" },
  { a: "border-collie", b: "beagle", label: "Border Collie vs. Beagle" },
  { a: "chihuahua", b: "gravhund", label: "Chihuahua vs. Gravhund" },
];

export default function SammenlignPage() {
  const router = useRouter();
  const [breedA, setBreedA] = useState("");
  const [breedB, setBreedB] = useState("");

  function handleCompare() {
    if (breedA && breedB && breedA !== breedB) {
      router.push(`/sammenlign/${breedA}-vs-${breedB}`);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: "Sammenlign" }]} />
      <h1 className="text-3xl font-bold mb-2">Sammenlign to racer</h1>
      <p className="text-muted-foreground mb-10">
        Vælg to racer og se en detaljeret side-om-side sammenligning af alle økonomiparametre.
      </p>

      <div className="bg-card border border-border rounded-2xl p-6 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium">Race 1</label>
            <BreedCombobox
              breeds={breeds.filter((b) => b.id !== breedB)}
              value={breedA}
              onChange={setBreedA}
              placeholder="Søg eller vælg race..."
            />
          </div>
          <div className="flex justify-center pb-2">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <ArrowLeftRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Race 2</label>
            <BreedCombobox
              breeds={breeds.filter((b) => b.id !== breedA)}
              value={breedB}
              onChange={setBreedB}
              placeholder="Søg eller vælg race..."
            />
          </div>
        </div>
        <div className="mt-5">
          <Button
            onClick={handleCompare}
            disabled={!breedA || !breedB || breedA === breedB}
            size="lg"
            className="w-full md:w-auto"
          >
            Sammenlign racer
          </Button>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4">Populære sammenligninger</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {popularComparisons.map((comp) => (
          <a
            key={`${comp.a}-vs-${comp.b}`}
            href={`/sammenlign/${comp.a}-vs-${comp.b}`}
            className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-navy-300 hover:shadow-sm transition-all group"
          >
            <span className="font-medium group-hover:text-navy-900 transition-colors">
              {comp.label}
            </span>
            <span className="text-muted-foreground text-sm">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}
