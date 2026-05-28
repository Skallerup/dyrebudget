import Link from "next/link";
import { PawPrint } from "lucide-react";

const footerLinks = {
  Beregner: [
    { href: "/beregner", label: "Avanceret beregner" },
    { href: "/quiz", label: "Kæledyrs-quiz" },
    { href: "/sammenlign", label: "Sammenlign racer" },
  ],
  "Hvad koster": [
    { href: "/hvad-koster/labrador", label: "Labrador" },
    { href: "/hvad-koster/golden-retriever", label: "Golden Retriever" },
    { href: "/hvad-koster/fransk-bulldog", label: "Fransk Bulldog" },
    { href: "/hvad-koster/maine-coon", label: "Maine Coon" },
    { href: "/hvad-koster/huskat", label: "Huskat" },
  ],
  Guider: [
    { href: "/guides/hvad-koster-en-hund", label: "Hvad koster en hund?" },
    { href: "/guides/hvad-koster-en-kat", label: "Hvad koster en kat?" },
    { href: "/guides/billigste-hunderacer", label: "Billigste hunderacer" },
    { href: "/guides/hundeforsikring", label: "Hundeforsikring guide" },
  ],
  Om: [
    { href: "/om", label: "Om DyreBudget" },
    { href: "/metode", label: "Vores metode" },
    { href: "/affiliate", label: "Affiliate info" },
    { href: "/privatliv", label: "Privatlivspolitik" },
    { href: "/kontakt", label: "Kontakt" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center">
                <PawPrint className="w-4 h-4 text-mint-400" />
              </div>
              <span className="font-bold text-white text-lg">
                Dyre<span className="text-mint-400">Budget</span>
              </span>
            </Link>
            <p className="text-navy-300 text-sm leading-relaxed">
              Danmarks mest datadrevne platform for kæledyrsøkonomi.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white text-sm mb-3">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-navy-300 hover:text-mint-400 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-navy-800 pt-6">
          <p className="text-navy-400 text-xs leading-relaxed mb-3">
            <strong className="text-navy-300">Affiliate-oplysning:</strong> DyreBudget.dk modtager provision fra
            visse produktlinks. Det påvirker ikke vores redaktionelle vurderinger. Priser er vejledende og kan
            variere. Se vores{" "}
            <Link href="/affiliate" className="text-mint-400 hover:underline">
              affiliate-politik
            </Link>{" "}
            for detaljer.
          </p>
          <p className="text-navy-500 text-xs">
            © {new Date().getFullYear()} DyreBudget.dk — Alle beregninger er estimater baseret på markedsdata.
          </p>
        </div>
      </div>
    </footer>
  );
}
