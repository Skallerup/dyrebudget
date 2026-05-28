import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Guider — Alt om kæledyrsøkonomi",
  description:
    "Komplette guider til kæledyrsøkonomi i Danmark. Hvad koster en hund, kat, billigste racer og forsikring.",
  alternates: { canonical: "/guides" },
};

const guides = [
  {
    slug: "hvad-koster-en-hund",
    title: "Hvad koster en hund i Danmark?",
    desc: "Den komplette guide til hundeomkostninger: foder, forsikring, dyrlæge og meget mere.",
    readTime: "8 min",
    category: "Hund",
  },
  {
    slug: "hvad-koster-en-kat",
    title: "Hvad koster en kat i Danmark?",
    desc: "Alt du skal vide om udgifterne ved at holde kat. Fra huskat til Maine Coon.",
    readTime: "6 min",
    category: "Kat",
  },
  {
    slug: "billigste-hunderacer",
    title: "De 5 billigste hunderacer i Danmark",
    desc: "Se hvilke racer der koster mindst at eje. Rangeret efter månedlig pris og omkostningsindeks.",
    readTime: "5 min",
    category: "Hund",
  },
  {
    slug: "dyreste-hunderacer",
    title: "De 5 dyreste hunderacer at eje",
    desc: "Franske Bulldogs, Mops og andre racer med høje sundheds- og pleje-omkostninger.",
    readTime: "5 min",
    category: "Hund",
  },
  {
    slug: "billigste-hundefoder",
    title: "Bedste hundefoder til prisen",
    desc: "Sammenligning af hundefoder — pris pr. kg, næringsindhold og kvalitetsvurdering.",
    readTime: "7 min",
    category: "Foder",
  },
  {
    slug: "hundeforsikring",
    title: "Hundeforsikring guide 2024",
    desc: "Er hundeforsikring nødvendig? Hvad dækker den? Og hvilken forsikring er bedst?",
    readTime: "8 min",
    category: "Forsikring",
  },
  {
    slug: "foerste-hund-budget",
    title: "Budget til din første hund",
    desc: "Komplet startbudget til ny hundeejer. Alt hvad du skal bruge det første år.",
    readTime: "6 min",
    category: "Budget",
  },
  {
    slug: "bedste-hundeforsikring",
    title: "Bedste hundeforsikring 2026",
    desc: "Vi sammenligner Agria vs Tryg og flere — find den forsikring der passer til din race.",
    readTime: "6 min",
    category: "Forsikring",
  },
  {
    slug: "bedste-katteforsikring",
    title: "Bedste katteforsikring 2026",
    desc: "Hvornår er katteforsikring nødvendig? Vi gennemgår dækning, pris og hvornår det kan betale sig.",
    readTime: "5 min",
    category: "Forsikring",
  },
  {
    slug: "hvalpe-budget",
    title: "Budget til din første hvalp",
    desc: "Hvad koster det første år med en hvalp? Komplet budget med alle poster — anskaffelse, udstyr, dyrlæge og foder.",
    readTime: "6 min",
    category: "Budget",
  },
  {
    slug: "hvad-koster-en-fransk-bulldog",
    title: "Hvad koster en Fransk Bulldog?",
    desc: "Månedspris, forsikringsomkostninger og typiske dyrlægeregninger. En af Danmarks dyreste racer forklaret.",
    readTime: "5 min",
    category: "Hund",
  },
  {
    slug: "hvad-koster-en-golden-retriever",
    title: "Hvad koster en Golden Retriever?",
    desc: "Ca. 1.540 kr./md. — fuld oversigt over foder, forsikring og grooming til Danmarks yndlingsrace.",
    readTime: "5 min",
    category: "Hund",
  },
  {
    slug: "hvad-koster-en-labrador",
    title: "Hvad koster en Labrador?",
    desc: "Ca. 1.300 kr./md. — en af de billigste store hunderacer. Se hvad det reelt koster at eje en Labrador.",
    readTime: "5 min",
    category: "Hund",
  },
  {
    slug: "billigste-katteracer",
    title: "Billigste katteracer 2026",
    desc: "De 5 billigste katte at eje rangeret efter månedspris. Fra Huskat til Russisk Blå.",
    readTime: "5 min",
    category: "Kat",
  },
  {
    slug: "hvad-koster-en-schaeferhund",
    title: "Hvad koster en Schæferhund?",
    desc: "Ca. 1.630 kr./md. — intelligent og loyal arbejdshund. Se månedspris og risiko for hofteproblemer.",
    readTime: "5 min",
    category: "Hund",
  },
  {
    slug: "hvad-koster-en-beagle",
    title: "Hvad koster en Beagle?",
    desc: "Ca. 1.060 kr./md. — en af de billigste mellemstore hunderacer. Sund, robust og familievenlig.",
    readTime: "5 min",
    category: "Hund",
  },
  {
    slug: "hvad-koster-en-chihuahua",
    title: "Hvad koster en Chihuahua?",
    desc: "Ca. 680 kr./md. — Danmarks billigste hund. Lille appetit, lang levetid og lav forsikringspræmie.",
    readTime: "5 min",
    category: "Hund",
  },
  {
    slug: "hvad-koster-en-gravhund",
    title: "Hvad koster en Gravhund?",
    desc: "Ca. 980 kr./md. — men IVDD-risikoen er reel. Forsikring er nærmest obligatorisk til denne race.",
    readTime: "5 min",
    category: "Hund",
  },
  {
    slug: "hvad-koster-en-border-collie",
    title: "Hvad koster en Border Collie?",
    desc: "Ca. 1.370 kr./md. — verdens klogeste hund, men kræver enorm mængde aktivitet og stimulation.",
    readTime: "5 min",
    category: "Hund",
  },
  {
    slug: "hvad-koster-en-puddel",
    title: "Hvad koster en Puddel?",
    desc: "Ca. 1.250 kr./md. — hypoallergen og sund, men grooming er den store udgift (380 kr./md.).",
    readTime: "5 min",
    category: "Hund",
  },
  {
    slug: "hvad-koster-en-rottweiler",
    title: "Hvad koster en Rottweiler?",
    desc: "Ca. 2.120 kr./md. — stor hund = store udgifter til foder og forsikring. Kræver erfaren ejer.",
    readTime: "5 min",
    category: "Hund",
  },
  {
    slug: "hvad-koster-en-berner-sennenhund",
    title: "Hvad koster en Berner Sennenhund?",
    desc: "Ca. 2.360 kr./md. og lever kun 7–10 år. Høj kræftrisiko kræver god forsikring fra dag 1.",
    readTime: "5 min",
    category: "Hund",
  },
  {
    slug: "hvad-koster-en-cavapoo",
    title: "Hvad koster en Cavapoo?",
    desc: "Ca. 1.490 kr./md. + hvalp til 14.000–20.000 kr. Hypoallergen designerhund med høj grooming.",
    readTime: "5 min",
    category: "Hund",
  },
  {
    slug: "hvad-koster-en-cocker-spaniel",
    title: "Hvad koster en Cocker Spaniel?",
    desc: "Ca. 1.490 kr./md. — glad familiehund. Grooming og ørenrensning er faste udgifter.",
    readTime: "5 min",
    category: "Hund",
  },
];

export default function GuidesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: "Guider" }]} />
      <h1 className="text-3xl font-bold mb-2">Guider til kæledyrsøkonomi</h1>
      <p className="text-muted-foreground mb-10">
        Datadrevne guider der hjælper dig med at forstå de reelle udgifter ved at holde kæledyr i Danmark.
      </p>
      <div className="space-y-4">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group flex items-center justify-between p-5 bg-card border border-border rounded-xl hover:border-navy-300 hover:shadow-sm transition-all"
          >
            <div className="flex-1 mr-6">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-medium px-2 py-0.5 bg-navy-100 text-navy-700 rounded-full">
                  {guide.category}
                </span>
                <span className="text-xs text-muted-foreground">{guide.readTime} læsning</span>
              </div>
              <h2 className="font-semibold group-hover:text-navy-900 transition-colors mb-1">
                {guide.title}
              </h2>
              <p className="text-sm text-muted-foreground">{guide.desc}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-navy-900 transition-colors shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
