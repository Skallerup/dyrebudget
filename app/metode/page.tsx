import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = {
  title: "Vores beregningsmetode — DyreBudget.dk",
  description: "Sådan beregner DyreBudget.dk kæledyrsomkostninger. Fuld metodebeskrivelse og datakilder.",
};

export default function MetodePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: "Metode" }]} />
      <h1 className="text-3xl font-bold mb-6">Vores beregningsmetode</h1>
      <div className="space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Datakilder</h2>
          <p className="mb-4">
            Vores prisdata aggregeres fra følgende kilder og opdateres løbende:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-foreground">Foder:</strong> Månedlig prisindsamling fra Zooplus.dk, Bitiba.dk og Animail.dk. Beregnet som daglig fodermængde × pris pr. kg × 30 dage.</li>
            <li><strong className="text-foreground">Forsikring:</strong> Reelle præmiedata fra Agria, Tryg og If Forsikring (2024). Race, størrelse og alder indgår i beregningen.</li>
            <li><strong className="text-foreground">Dyrlæge:</strong> Gennemsnitlige konsultations- og behandlingsomkostninger fra Dansk Dyrlægeforening og brugerdata.</li>
            <li><strong className="text-foreground">Grooming:</strong> Prisindsamling fra grooming-salonkæder inkl. Woofland og lokale salonnet-priser.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Beregningslogik</h2>
          <p>
            Månedlig pris beregnes som summen af: foder + forsikring + dyrlæge (månedlig afskrivning) +
            grooming + godbidder + legetøj + loppe/flåt + udstyr (amortiseret) + diverse.
          </p>
          <p className="mt-3">
            Aktivitetsniveau påvirker foderanbefalingen med +15% (meget aktiv) til -10% (rolig).
            Groomingvalg påvirker udgiften med 30% (hjemme) til 100% (professionel).
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Forbehold</h2>
          <p>
            Alle estimater er vejledende og baseret på nationalt gennemsnit. Faktiske udgifter
            varierer afhængigt af geografisk placering, det individuelle dyrs behov og
            markedsprisudsving.
          </p>
          <p className="mt-3">
            Vi anbefaler altid at indhente konkrete tilbud fra lokale forsikringsselskaber
            og dyrlæger inden en endelig beslutning.
          </p>
        </section>
      </div>
    </div>
  );
}
