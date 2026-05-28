import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import Link from "next/link";
import { AlertTriangle, CheckCircle, TrendingDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Budget til hvalp 2026 — Hvad koster det første år?",
  description:
    "Komplet budgetguide til ny hundeejer. Se hvad en hvalp koster det første år — anskaffelse, udstyr, dyrlæge, foder og forsikring. Med konkrete tal.",
  alternates: { canonical: "/guides/hvalpe-budget" },
};

const faqs = [
  {
    question: "Hvad koster en hvalp det første år i alt?",
    answer:
      "Det første år med en hvalp koster typisk 25.000–60.000 kr. alt inkluderet. Det inkluderer anskaffelse (8.000–25.000 kr.), grundudstyr, valpebesøg hos dyrlæge, vaccination, kastration og løbende udgifter. Store racer koster generelt mere end små.",
  },
  {
    question: "Hvad skal jeg have af udstyr til min hvalp?",
    answer:
      "Grundudstyr til hvalp inkluderer: kurv/hundekasse (400–1.500 kr.), halsbånd og snor (200–600 kr.), skåle (150–400 kr.), hundebil-sikkerhed (300–900 kr.), legetøj og godbidder (300–600 kr.). Samlede udstyrspris: 1.500–4.500 kr.",
  },
  {
    question: "Hvornår skal jeg tegne forsikring til min hvalp?",
    answer:
      "Tegn forsikring før eller senest ved afhentning. Mange forsikringer har 30–90 dages karenstid, og pre-eksisterende sygdomme dækkes aldrig. Jo tidligere du tegner, jo bedre dækning.",
  },
  {
    question: "Hvad koster vaccination og dyrlæge det første år?",
    answer:
      "Det første dyrlægeår inkluderer: grundvaccination 2×(500–800 kr.), årlig booster, ormekur, loppe/flåt-behandling og evt. kastration (1.500–4.000 kr.). Samlet ca. 4.000–8.000 kr. det første år.",
  },
  {
    question: "Er det billigere med en voksen hund end en hvalp?",
    answer:
      "Ja, som regel. En voksen hund fra et internat koster 2.000–4.000 kr. og har typisk allerede fået vaccination og kastration. Det første år er markant billigere. Til gengæld ved du mindre om helbred og adfærd.",
  },
];

const budgetItems = [
  {
    category: "Anskaffelse",
    budget: "8.000–12.000 kr.",
    medium: "12.000–20.000 kr.",
    premium: "20.000–30.000+ kr.",
    note: "Blandingsrace/internat → opdræt med stamtavle → populær designer-race",
  },
  {
    category: "Grundudstyr",
    budget: "1.500 kr.",
    medium: "2.500 kr.",
    premium: "4.500 kr.",
    note: "Kurv, halsbånd, snor, skåle, hundebil",
  },
  {
    category: "Veterinær (år 1)",
    budget: "3.000 kr.",
    medium: "5.000 kr.",
    premium: "7.000 kr.",
    note: "Vaccination, ormekur, loppe/flåt, evt. kastration",
  },
  {
    category: "Foder (12 mdr.)",
    budget: "3.600 kr.",
    medium: "6.000 kr.",
    premium: "10.800 kr.",
    note: "300–900 kr./md. afhænger af race og kvalitet",
  },
  {
    category: "Forsikring (12 mdr.)",
    budget: "3.000 kr.",
    medium: "4.800 kr.",
    premium: "7.200 kr.",
    note: "250–600 kr./md. afhænger af race og dækning",
  },
  {
    category: "Godbidder, legetøj, misc.",
    budget: "1.200 kr.",
    medium: "2.400 kr.",
    premium: "4.200 kr.",
    note: "100–350 kr./md.",
  },
];

export default function HvalpeBudgetPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Guider", href: "/guides" },
          { label: "Budget til hvalp" },
        ]}
      />

      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-mint-600 mb-2 block">
          Guide · Opdateret 2026
        </span>
        <h1 className="text-3xl font-bold mb-3">Hvad koster en hvalp det første år?</h1>
        <p className="text-muted-foreground text-lg">
          Det første år med en hvalp er det dyreste. Vi har samlet alle udgifter i ét komplet
          budget — så du ved præcis hvad du går ind til.
        </p>
      </div>

      {/* Hurtig oversigt */}
      <div className="mt-8 p-5 bg-navy-900 text-white rounded-2xl">
        <p className="text-sm font-semibold text-navy-300 mb-1">Hvad koster det første år?</p>
        <p className="font-bold text-lg mb-1">Typisk 25.000–60.000 kr. alt inkluderet</p>
        <p className="text-sm text-navy-300">
          Anskaffelse + udstyr + dyrlæge + foder + forsikring. Store racer og designer-racer
          ligger i den høje ende. Blandingsrace fra internat kan komme under 20.000 kr.
        </p>
      </div>

      {/* Budget tabel */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-5">Komplet budget — år 1</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left px-4 py-3 font-semibold">Post</th>
                <th className="text-center px-4 py-3 font-semibold text-mint-600">Budget</th>
                <th className="text-center px-4 py-3 font-semibold">Middel</th>
                <th className="text-center px-4 py-3 font-semibold text-amber-600">Premium</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {budgetItems.map((item) => (
                <tr key={item.category} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{item.category}</td>
                  <td className="px-4 py-3 text-center text-mint-700 font-semibold">{item.budget}</td>
                  <td className="px-4 py-3 text-center font-semibold">{item.medium}</td>
                  <td className="px-4 py-3 text-center text-amber-700 font-semibold">{item.premium}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs hidden sm:table-cell">{item.note}</td>
                </tr>
              ))}
              <tr className="bg-muted/50 font-bold border-t-2 border-border">
                <td className="px-4 py-3">Total år 1</td>
                <td className="px-4 py-3 text-center text-mint-700">ca. 20.000 kr.</td>
                <td className="px-4 py-3 text-center">ca. 40.000 kr.</td>
                <td className="px-4 py-3 text-center text-amber-700">ca. 64.000 kr.</td>
                <td className="hidden sm:table-cell" />
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">* Priser er estimater baseret på danske markedspriser 2026. Dyrlægeomkostninger kan variere markant.</p>
      </section>

      {/* Spareråd */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Sådan sparer du på det første år</h2>
        <div className="space-y-3">
          {[
            {
              icon: TrendingDown,
              color: "text-mint-600",
              bg: "bg-mint-50",
              title: "Vælg internat eller privat formidling frem for opdræt",
              text: "En hund fra et internat koster 2.000–5.000 kr. mod 15.000–25.000 kr. fra opdræt. Mange internathunde er allerede vaccineret, chippet og kastreret — en besparelse på 4.000–8.000 kr. i dyrlægeudgifter.",
            },
            {
              icon: TrendingDown,
              color: "text-mint-600",
              bg: "bg-mint-50",
              title: "Tegn forsikring med det samme",
              text: "Valpeforsikring er billig at starte tidligt — og dyrlægeregninger det første år kan chokere. Tegn forsikring ved afhentning, ikke bagefter.",
            },
            {
              icon: TrendingDown,
              color: "text-mint-600",
              bg: "bg-mint-50",
              title: "Køb udstyr brugt eller i pakketilbud",
              text: "Kurv, hundebur, snore og skåle kan købes brugt på Facebook Marketplace for 30–50% af nypris. Sæt max 1.500 kr. af til grundudstyr og opgrader løbende.",
            },
          ].map(({ icon: Icon, color, bg, title, text }) => (
            <div key={title} className={`flex gap-3 p-4 rounded-xl ${bg}`}>
              <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${color}`} />
              <div>
                <p className="font-semibold text-sm mb-1">{title}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Advarsel */}
      <div className="mt-8 flex gap-3 p-4 rounded-xl bg-amber-50">
        <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0 text-amber-500" />
        <div>
          <p className="font-semibold text-sm mb-1">Husk: Budgettet gælder for en gennemsnitshund</p>
          <p className="text-sm text-muted-foreground">
            Racer med høj sundhedsrisiko som Fransk Bulldog, Mops, Cavalier King Charles Spaniel og
            Berner Sennenhund kan have dyrlægeomkostninger på 10.000–40.000 kr. i et enkelt år.
            Forsikring er nærmest obligatorisk for disse racer.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 p-6 bg-navy-900 text-white rounded-2xl text-center">
        <p className="font-bold text-lg mb-2">Se det præcise budget for din race</p>
        <p className="text-navy-300 text-sm mb-4">
          Vores beregner giver dig månedspris, første-år-pris og livstidspris for alle 51 racer.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/beregner"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-mint-600 hover:bg-mint-500 text-white font-semibold rounded-xl transition-colors"
          >
            Beregn for din race →
          </Link>
          <Link
            href="/hvad-koster"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy-700 hover:bg-navy-600 text-white font-semibold rounded-xl transition-colors"
          >
            Alle racer og priser
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <FAQSection faqs={faqs} title="Spørgsmål om hvalpe-budget" />
      </div>
    </div>
  );
}
