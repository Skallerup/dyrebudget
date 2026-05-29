import Link from "next/link";
import { Database, CheckCircle, RefreshCw } from "lucide-react";

export function MethodologyBox() {
  return (
    <div className="border border-border rounded-2xl p-6 bg-muted/30">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-navy-900 flex items-center justify-center">
          <Database className="w-3.5 h-3.5 text-mint-400" />
        </div>
        <div>
          <h3 className="font-semibold text-sm text-navy-900">Datakilde og metode</h3>
          <p className="text-xs text-muted-foreground">
            Opdateret {new Date().toLocaleDateString("da-DK", { month: "long", year: "numeric" })}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1 text-xs text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
          <RefreshCw className="w-3 h-3" />
          Aktuel
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        Alle estimater er baseret på aggregerede, verificerede data fra følgende kilder:
      </p>

      <ul className="space-y-2 mb-4">
        {[
          { text: "Forsikringspræmier fra Agria og Tryg", href: "https://www.agria.dk/", source: "agria.dk" },
          { text: "Dyrlægeomkostninger fra Den Danske Dyrlægeforening", href: "https://www.ddd.dk/", source: "ddd.dk" },
          { text: "Foderpriser fra danske forhandlere (Zooplus m.fl.)", href: "https://www.zooplus.dk/", source: "zooplus.dk" },
          { text: "Racesundhedsdata fra Dansk Kennel Klub", href: "https://www.dkk.dk/", source: "dkk.dk" },
          { text: "Ejer-indberettede priser fra vores egen brugerdatabase", href: undefined, source: "DyreBudget" },
        ].map((item) => (
          <li key={item.text} className="flex items-start gap-2 text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-mint-600 shrink-0 mt-0.5" />
            <span>
              {item.text}{" "}
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-navy-600 hover:text-navy-900 hover:underline whitespace-nowrap"
                >
                  ({item.source} ↗)
                </a>
              ) : (
                <span className="text-mint-700 whitespace-nowrap">({item.source})</span>
              )}
            </span>
          </li>
        ))}
      </ul>

      <p className="text-xs text-muted-foreground leading-relaxed border-t border-border pt-4">
        Alle tal er vejledende estimater. Faktiske omkostninger varierer med geografi, dyrets individuelle behov og aktuelle markedspriser.{" "}
        <Link href="/metode" className="text-navy-600 hover:text-navy-900 font-medium hover:underline">
          Læs fuld metodebeskrivelse →
        </Link>
      </p>
    </div>
  );
}
