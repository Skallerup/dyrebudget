import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { breeds, getBreedBySlug } from "@/data/breeds";
import { calculatePetCost, formatCurrency } from "@/lib/calculator";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import { RelatedLinks } from "@/components/shared/RelatedLinks";
import { RaceCard } from "@/components/shared/RaceCard";
import { BreedImage } from "@/components/shared/BreedImage";
import { tintForSlug } from "@/lib/tint";
import {
  generateFAQJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/seo";
import type { Breed } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dyrebudget.dk";

interface Props {
  params: Promise<{ slug: string }>;
}

const sizeLabel = (b: Breed) =>
  b.sizeClass === "tiny"
    ? "mini"
    : b.sizeClass === "small"
    ? "lille"
    : b.sizeClass === "medium"
    ? "mellemstor"
    : b.sizeClass === "large"
    ? "stor"
    : "meget stor";

const activityLabel = (b: Breed) =>
  b.activityLevel === "low" ? "lavt" : b.activityLevel === "medium" ? "moderat" : "højt";

const healthLabel = (b: Breed) =>
  b.healthRisk === "low" ? "lav" : b.healthRisk === "medium" ? "middel" : "høj";

function buildPros(b: Breed): string[] {
  const pros: string[] = [];
  if (b.healthRisk === "low") pros.push("Robust race med få kendte arvelige sygdomme");
  if (b.activityLevel === "high")
    pros.push("Energisk og udholdende — perfekt til aktive ejere og friluftsliv");
  if (b.activityLevel === "low")
    pros.push("Lavt motionsbehov — passer godt til en rolig hverdag og mindre bolig");
  if (b.costIndex < 45) pros.push("Hører til de billigere racer at eje på månedsbasis");
  if (b.coatType === "short")
    pros.push("Minimal pelspleje — sjældent behov for professionel trimning");
  if (b.sizeClass === "tiny" || b.sizeClass === "small")
    pros.push("Fylder lidt og er velegnet til lejlighed");
  if (b.lifespan.max >= 14) pros.push(`Lang forventet levetid (op til ${b.lifespan.max} år)`);
  // Sørg for at temperament-traits også fremhæves
  for (const t of b.traits.slice(0, 2)) pros.push(t);
  return pros.slice(0, 6);
}

function buildCons(b: Breed): string[] {
  const cons: string[] = [];
  if (b.healthRisk === "high")
    cons.push("Høj risiko for arvelige lidelser — forsikring er stærkt anbefalet");
  if (b.healthRisk === "medium")
    cons.push("Middel sundhedsrisiko — budgettér til løbende dyrlægeudgifter");
  if (b.activityLevel === "high")
    cons.push("Kræver meget daglig motion og mental stimulation");
  if (b.costIndex > 65) cons.push("Hører til de dyrere racer at eje");
  if (b.coatType === "long" || b.coatType === "wire")
    cons.push("Kræver regelmæssig pelspleje og evt. professionel trimning");
  if (b.sizeClass === "large" || b.sizeClass === "giant")
    cons.push("Stort foderbehov og pladskrav i hjemmet");
  if (b.lifespan.max <= 10) cons.push("Relativt kort forventet levetid");
  if (cons.length === 0)
    cons.push("Som alle racer kræver den tid, opmærksomhed og et fast budget");
  return cons.slice(0, 5);
}

export async function generateStaticParams() {
  return breeds.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const breed = getBreedBySlug(slug);
  if (!breed) return {};
  return {
    title: `Er en ${breed.name} noget for dig? Køberguide ${new Date().getFullYear()}`,
    description: `Komplet køberguide til ${breed.name}: fordele, ulemper, sundhedsprofil, pasningsbehov og hvem racen passer til — så du ved hvad du går ind til inden du køber.`,
    alternates: { canonical: `/guides/${slug}` },
  };
}

export default async function BreedBuyerGuidePage({ params }: Props) {
  const { slug } = await params;
  const breed = getBreedBySlug(slug);
  if (!breed) notFound();

  const result = calculatePetCost(breed, {
    petType: breed.petType,
    breedId: breed.id,
    ageYears: 2,
    budgetLevel: "medium",
    activityLevel: "medium",
    hasInsurance: true,
    housingType: "house",
    groomingLevel: "mixed",
  });

  const pros = buildPros(breed);
  const cons = buildCons(breed);
  const animal = breed.petType === "dog" ? "hund" : "kat";

  const relatedBreeds = breeds
    .filter((b) => b.petType === breed.petType && b.id !== breed.id)
    .sort(
      (a, b) =>
        Math.abs(a.costIndex - breed.costIndex) - Math.abs(b.costIndex - breed.costIndex)
    )
    .slice(0, 4);

  const faqs = [
    {
      question: `Er en ${breed.name} god for førstegangsejere?`,
      answer: `${breed.name} har et ${activityLabel(breed)} aktivitetsniveau og ${healthLabel(
        breed
      )} sundhedsrisiko. ${
        breed.activityLevel === "high"
          ? "Den passer bedst til ejere der kan tilbyde meget motion og aktivering."
          : breed.healthRisk === "high"
          ? "Vær opmærksom på de sundhedsmæssige udfordringer inden du vælger racen."
          : "Det gør den til et overkommeligt valg for de fleste, også nye ejere."
      }`,
    },
    {
      question: `Hvem passer en ${breed.name} bedst til?`,
      answer: `${breed.name} trives typisk hos: ${breed.popularIn.join(", ")}. Racen er ${sizeLabel(
        breed
      )} af størrelse og har et ${activityLabel(breed)} motionsbehov.`,
    },
    {
      question: `Hvad koster en ${breed.name}?`,
      answer: `En ${breed.name} koster ca. ${formatCurrency(
        result.monthlyCost
      )} om måneden og ${formatCurrency(
        result.firstYearCost
      )} det første år. Se den fulde beregning på vores hvad-koster-side.`,
    },
    {
      question: `Hvor længe lever en ${breed.name}?`,
      answer: `En ${breed.name} lever typisk ${breed.lifespan.min}–${breed.lifespan.max} år. Det giver en samlet livstidsomkostning på ca. ${formatCurrency(
        result.lifetimeCost
      )}.`,
    },
  ];

  const faqJsonLd = generateFAQJsonLd(faqs);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Guides", path: "/guides" },
    { name: breed.name, path: `/guides/${breed.slug}` },
  ]);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Er en ${breed.name} noget for dig? Køberguide`,
    about: breed.name,
    description: `Køberguide til ${breed.name} med fordele, ulemper, sundhed og pasningsbehov.`,
    mainEntityOfPage: `${SITE_URL}/guides/${breed.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs
          items={[{ label: "Guides", href: "/guides" }, { label: breed.name }]}
        />

        <div className="mb-8 flex items-start gap-6 flex-wrap sm:flex-nowrap">
          <div className={`relative w-full sm:w-48 sm:shrink-0 h-48 rounded-2xl p-2.5 ${tintForSlug(breed.slug)}`}>
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <BreedImage
                slug={breed.slug}
                alt={breed.name}
                petType={breed.petType}
                priority
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 192px"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold mb-2">Er en {breed.name} noget for dig?</h1>
            <p className="text-muted-foreground">{breed.description}</p>
          </div>
        </div>

        {/* Hurtig profil */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Størrelse", value: sizeLabel(breed) },
            { label: "Levetid", value: `${breed.lifespan.min}–${breed.lifespan.max} år` },
            { label: "Sundhedsrisiko", value: healthLabel(breed) },
            { label: "Motionsbehov", value: activityLabel(breed) },
          ].map((s) => (
            <div key={s.label} className="bg-muted/50 rounded-xl p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
              <p className="font-semibold text-sm capitalize">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Fordele / ulemper */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          <div className="bg-mint-50 border border-mint-200 rounded-2xl p-5">
            <h2 className="font-bold text-navy-900 mb-3">Fordele</h2>
            <ul className="space-y-2">
              {pros.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-mint-600 mt-0.5 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <h2 className="font-bold text-navy-900 mb-3">Ulemper / vær opmærksom på</h2>
            <ul className="space-y-2">
              {cons.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm">
                  <X className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Hvem passer racen til */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">Hvem passer en {breed.name} til?</h2>
          <p className="text-muted-foreground mb-4">
            En {breed.name} er en {sizeLabel(breed)} {animal} med et {activityLabel(breed)}{" "}
            motionsbehov og {healthLabel(breed)} sundhedsrisiko. Den trives bedst hos:
          </p>
          <div className="flex flex-wrap gap-2">
            {breed.popularIn.map((p) => (
              <span
                key={p}
                className="text-sm px-3 py-1 bg-navy-900 text-white rounded-full font-medium"
              >
                {p}
              </span>
            ))}
          </div>
        </section>

        {/* Økonomi-resumé → link til cost-side */}
        <Link
          href={`/hvad-koster/${breed.slug}`}
          className="mb-10 flex items-center justify-between p-5 bg-navy-50 border border-navy-200 rounded-2xl hover:border-navy-400 hover:shadow-sm transition-all group"
        >
          <div>
            <p className="font-semibold text-navy-900">
              Hvad koster en {breed.name}? Ca. {formatCurrency(result.monthlyCost)}/md.
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Se den fulde beregning med foder, forsikring, dyrlæge og livstidspris.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-navy-600 group-hover:text-navy-900 shrink-0 transition-colors" />
        </Link>

        {/* Forsikrings-funnel */}
        <Link
          href={
            breed.petType === "dog"
              ? "/find-billigste-hundeforsikring"
              : "/find-billigste-katteforsikring"
          }
          className="mb-10 flex items-center justify-between p-4 bg-mint-50 border border-mint-200 rounded-xl hover:border-mint-400 hover:shadow-sm transition-all group"
        >
          <div>
            <p className="text-sm font-semibold text-navy-900">
              Find billigste {animal}eforsikring til din {breed.name}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {breed.healthRisk === "high"
                ? "Denne race har høj sundhedsrisiko — forsikring anbefales kraftigt."
                : "Sammenlign pris og dækning på tværs af selskaber."}
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-mint-600 group-hover:text-mint-700 shrink-0 transition-colors" />
        </Link>

        <FAQSection faqs={faqs} title={`Spørgsmål om ${breed.name}`} />

        <RelatedLinks
          links={[
            { href: `/hvad-koster/${breed.slug}`, title: `Hvad koster en ${breed.name}?`, desc: "Fuld omkostningsberegning" },
            { href: "/beregner", title: "Beregn din egen pris", desc: "Personligt budget på 1 minut" },
            {
              href: breed.petType === "dog" ? "/huskeliste" : "/huskeliste/kat",
              title: `Huskeliste til ny ${animal}`,
              desc: "Alt du skal købe inden hjemkomst",
            },
            { href: "/guides", title: "Alle guides", desc: "Mere om kæledyrsøkonomi" },
          ]}
        />

        {relatedBreeds.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-5">Lignende racer</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedBreeds.map((b) => (
                <RaceCard key={b.id} breed={b} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
