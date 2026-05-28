import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privatlivspolitik — DyreBudget.dk",
};

export default function PrivatlivPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: "Privatliv" }]} />
      <h1 className="text-3xl font-bold mb-2">Privatlivspolitik</h1>
      <p className="text-sm text-muted-foreground mb-8">Sidst opdateret: januar 2025</p>
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Dataansvarlig</h2>
          <p>DyreBudget.dk er dataansvarlig for behandling af dine personoplysninger på dette website.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Hvad vi indsamler</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>E-mailadresser (frivillig tilmelding)</li>
            <li>Anonymiserede brugsdata (PostHog analytics)</li>
            <li>Beregningstransaktioner (anonymt)</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Cookies</h2>
          <p>Vi bruger cookies til analytics (PostHog) og affiliate-tracking. Du kan afvise
          ikke-nødvendige cookies i cookiebanneret.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Dine rettigheder</h2>
          <p>Du har ret til indsigt, berigtigelse, sletning og dataportabilitet. Kontakt os på{" "}
          <a href="/kontakt" className="text-navy-600 hover:underline">kontaktformularen</a>.</p>
        </section>
      </div>
    </div>
  );
}
