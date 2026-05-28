import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = {
  title: "Affiliate-politik — DyreBudget.dk",
  description: "Fuld transparens om DyreBudget.dk's affiliate-samarbejder og links.",
};

export default function AffiliatePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: "Affiliate" }]} />
      <h1 className="text-3xl font-bold mb-6">Affiliate-politik</h1>
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          DyreBudget.dk bruger affiliatelinks som en del af vores finansieringsmodel.
          Det betyder at vi modtager en kommission, når du klikker på et link og foretager et køb.
        </p>
        <h2 className="text-xl font-bold text-foreground">Hvad er et affiliatelink?</h2>
        <p>
          Et affiliatelink er et tracked link der giver os en provisionsandel (typisk 2–8% af
          købesummen) hvis du køber via linket. Det koster dig intet ekstra.
        </p>
        <h2 className="text-xl font-bold text-foreground">Vores partnere</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Zooplus — hundefoder og kattefoder</li>
          <li>Agria — dyre- og kæledyrsforsikring</li>
          <li>Tryg — hundeforsikring</li>
          <li>Med24 — dyrlægemedicin og forebyggelse</li>
        </ul>
        <h2 className="text-xl font-bold text-foreground">Redaktionel uafhængighed</h2>
        <p>
          Affiliate-samarbejder påvirker <strong>ikke</strong> vores redaktionelle vurderinger.
          Vi anbefaler udelukkende produkter vi selv ville bruge eller anbefale til venner og familie.
          Produkter markeres tydeligt med <em>*Affiliatelink</em>.
        </p>
        <h2 className="text-xl font-bold text-foreground">GDPR og cookies</h2>
        <p>
          Affiliatelinks bruger cookies til at tracke køb. Se vores{" "}
          <a href="/privatliv" className="text-navy-600 hover:underline">privatlivspolitik</a> for detaljer.
        </p>
      </div>
    </div>
  );
}
