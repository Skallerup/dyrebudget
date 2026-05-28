import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = {
  title: "Om DyreBudget.dk",
  description: "DyreBudget.dk er Danmarks mest datadrevne platform for kæledyrsøkonomi.",
};

export default function OmPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: "Om" }]} />
      <h1 className="text-3xl font-bold mb-6">Om DyreBudget.dk</h1>
      <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground leading-relaxed">
        <p>
          DyreBudget.dk er en uafhængig dansk platform der hjælper dig med at forstå de reelle
          økonomiforhold ved at holde kæledyr. Vi er ikke en kæledyrsblog — vi er et
          <strong className="text-foreground"> dataværktøj og beregningsplatform</strong>.
        </p>
        <p>
          Platformen er bygget af folk der elsker kæledyr og økonomi — og er frustrerede over,
          at det er svært at finde ærlige, opdaterede tal for hvad det faktisk koster.
        </p>
        <h2 className="text-xl font-bold text-foreground mt-8 mb-3">Vores mission</h2>
        <p>
          At give fremtidige og nuværende kæledyrsejere den information de har brug for til at
          træffe informerede beslutninger — baseret på realistiske tal, ikke markedsføring.
        </p>
        <h2 className="text-xl font-bold text-foreground mt-8 mb-3">Vores data</h2>
        <p>
          Vores prisdata opdateres løbende og baseres på aktuelle markedspriser fra danske
          detailhandlere, forsikringsselskaber og veterinærklinikker. Se vores{" "}
          <a href="/metode" className="text-navy-600 hover:underline">metodebeskrivelse</a> for detaljer.
        </p>
        <h2 className="text-xl font-bold text-foreground mt-8 mb-3">Affiliate-links</h2>
        <p>
          DyreBudget.dk finansieres delvist via affiliateprovisioner fra partnerlinks. Se vores{" "}
          <a href="/affiliate" className="text-navy-600 hover:underline">affiliate-politik</a> for fuld transparens.
        </p>
      </div>
    </div>
  );
}
