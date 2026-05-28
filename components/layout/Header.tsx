"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Calculator, PawPrint } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/hvad-koster", label: "Racer" },
  { href: "/sammenlign", label: "Sammenlign" },
  { href: "/guides", label: "Guider" },
  { href: "/statistik", label: "Statistik" },
  { href: "/produkter", label: "Produkter" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center group-hover:bg-navy-800 transition-colors">
              <PawPrint className="w-4 h-4 text-mint-400" />
            </div>
            <span className="font-bold text-navy-900 text-lg">
              Dyre<span className="text-mint-600">Budget</span>
              <span className="text-navy-400 font-normal text-sm">.dk</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/beregner"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-navy-900 hover:bg-navy-800 rounded-lg transition-colors"
            >
              <Calculator className="w-4 h-4" />
              Start beregning
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 pb-1">
              <Link
                href="/beregner"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 text-sm font-semibold",
                  "text-white bg-navy-900 rounded-lg transition-colors hover:bg-navy-800"
                )}
              >
                <Calculator className="w-4 h-4" />
                Start beregning
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
