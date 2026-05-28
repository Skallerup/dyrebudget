import { Info } from "lucide-react";

export function AffiliateDisclosure() {
  return (
    <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
      <Info className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" />
      <p>
        <strong>Affiliate-oplysning:</strong> Nogle links på denne side er affiliatelinks. DyreBudget.dk
        modtager en mindre kommission hvis du køber via disse links — det koster dig intet ekstra og
        påvirker ikke vores vurderinger.{" "}
        <a href="/affiliate" className="underline hover:text-amber-900">
          Læs mere
        </a>
      </p>
    </div>
  );
}
