import { FlaskConical } from "lucide-react";

export function MethodologyBox() {
  return (
    <div className="border border-border rounded-xl p-6 bg-muted/30">
      <div className="flex items-center gap-2 mb-3">
        <FlaskConical className="w-4 h-4 text-navy-600" />
        <h3 className="font-semibold text-sm">Vores beregningsmetode</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
        DyreBudget.dk-estimater er baseret på aggregerede data fra:
      </p>
      <ul className="text-sm text-muted-foreground space-y-1.5">
        <li className="flex items-start gap-2">
          <span className="text-mint-600 font-bold mt-0.5">·</span>
          Prisdata fra Zooplus, Bitiba og Animail (foder)
        </li>
        <li className="flex items-start gap-2">
          <span className="text-mint-600 font-bold mt-0.5">·</span>
          Forsikringspræmier fra Agria, Tryg og If (2024)
        </li>
        <li className="flex items-start gap-2">
          <span className="text-mint-600 font-bold mt-0.5">·</span>
          Gennemsnitlige dyrlægeomkostninger fra Dansk Dyrlægeforening
        </li>
        <li className="flex items-start gap-2">
          <span className="text-mint-600 font-bold mt-0.5">·</span>
          Brugerdata og community-indberetninger fra dyreholdsplatforme
        </li>
      </ul>
      <p className="text-xs text-muted-foreground mt-3">
        Alle tal er vejledende. Faktiske omkostninger varierer afhængigt af geografi, dyrets individuelle behov og markedspriser.{" "}
        <a href="/metode" className="text-navy-600 hover:underline">
          Læs fuld metodebeskrivelse →
        </a>
      </p>
    </div>
  );
}
