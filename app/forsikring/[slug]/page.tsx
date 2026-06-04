import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, AlertTriangle } from "lucide-react";
import { breeds, getBreedBySlug } from "@/data/breeds";
import { getProductsByCategory } from "@/data/products";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import { RelatedLinks } from "@/components/shared/RelatedLinks";
import { RecommendedProducts } from "@/components/shared/RecommendedProducts";
import { formatCurrency } from "@/lib/calculator";
import { generateFAQJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return breeds.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const breed = getBreedBySlug(slug);
  if (!breed) return {};
  const animal = breed.petType === "dog" ? "Hundeforsikring" : "Katteforsikring";
  return {
    title: `${animal} til ${breed.name} — pris ${new Date().getFullYear()}`,
    description: `Hvad koster forsikring til en ${breed.name}? Typisk ${formatCurrency(
      breed.monthlyInsurance.budget
    )}–${formatCurrency(
      breed.monthlyInsurance.premium
    )} om måneden. Se hvorfor prisen er som den er, og find den billigste forsikring.`,
    alternates: { canonical: `/forsikring/${slug}` },
  };
}

export default async function BreedInsurancePage({ params }: Props) {
  const { slug } = await params;
  const breed = getBreedBySlug(slug);
  if (!breed) notFound();

  const isDog = breed.petType === "dog";
  const animal = isDog ? "hund" : "kat";
  const insuranceLabel = isDog ? "Hundeforsikring" : "Katteforsikring";
  const comparisonHref = isDog ? "/find-billigste-hundeforsikring" : "/find-billigste-katteforsikring";
  const insuranceProducts = getProductsByCategory(isDog ? "hundeforsikring" : "katteforsikring");

  const riskText =
    breed.healthRisk === "high"
      ? `${breed.name} hører til de racer med højest sundhedsrisiko. Det betyder både højere forsikringspræmie og en større sandsynlighed for, at du får brug for forsikringen. For denne race er forsikring stærkt anbefalet fra hvalpe-/killingestadiet.`
      : breed.healthRisk === "medium"
      ? `${breed.name} har en middel sundhedsrisiko. Præmien ligger i mellemlejet, men en enkelt operation kan stadig løbe op i 15.000-30.000 kr. — langt mere end et års forsikring.`
      : `${breed.name} er en forholdsvis robust race med lav sundhedsrisiko, hvilket holder præmien nede. Forsikring er stadig værd at overveje, da uheld kan ramme alle racer.`;

  const faqs = [
    {
      question: `Hvad koster forsikring til en ${breed.name}?`,
      answer: `Forsikring til en ${breed.name} koster typisk ${formatCurrency(
        breed.monthlyInsurance.budget
      )}–${formatCurrency(
        breed.monthlyInsurance.premium
      )} om måneden afhængigt af dækningsgrad, alder og selskab. Medium-dækning ligger omkring ${formatCurrency(
        breed.monthlyInsurance.medium
      )}.`,
    },
    {
      question: `Er ${insuranceLabel.toLowerCase()} nødvendig til en ${breed.name}?`,
      answer:
        breed.healthRisk === "high"
          ? `Ja — ${breed.name} har høj sundhedsrisiko, og dyre behandlinger er almindelige. Forsikring anbefales kraftigt og bør tegnes mens dyret er ungt og raskt.`
          : `Det er ikke lovpligtigt, men anbefalet. En enkelt dyrlægeregning kan let overstige flere års præmie, og forsikringen giver ro i økonomien.`,
    },
    {
      question: `Hvornår skal jeg tegne forsikringen?`,
      answer: `Så tidligt som muligt — gerne mens ${animal}en er ung og rask. Medfødte lidelser og sygdomme der opstår inden forsikringen tegnes, undtages typisk fra dækningen.`,
    },
  ];

  const faqJsonLd = generateFAQJsonLd(faqs);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: insuranceLabel, path: comparisonHref },
    { name: breed.name, path: `/forsikring/${breed.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs
          items={[
            { label: insuranceLabel, href: comparisonHref },
            { label: breed.name },
          ]}
        />

        <h1 className="text-3xl font-bold mb-4">
          {insuranceLabel} til {breed.name}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Hvad koster det at forsikre en {breed.name}, og hvad skal du være opmærksom på?
          Her får du prisspænd, racens risikoprofil og vejen til den billigste forsikring.
        </p>

        {/* Pris-hero */}
        <div className="bg-navy-900 text-white rounded-2xl p-6 mb-8">
          <p className="text-navy-300 text-sm mb-1">Typisk månedlig præmie for {breed.name}</p>
          <p className="text-3xl font-bold">
            {formatCurrency(breed.monthlyInsurance.budget)} – {formatCurrency(breed.monthlyInsurance.premium)}
          </p>
          <p className="text-navy-300 text-sm mt-2">
            Medium-dækning ca. {formatCurrency(breed.monthlyInsurance.medium)}/md. · varierer med alder, selvrisiko og selskab.
          </p>
        </div>

        {/* Risikoprofil */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            {breed.healthRisk === "high" && <AlertTriangle className="w-5 h-5 text-amber-600" />}
            Hvorfor koster forsikring til {breed.name} som den gør?
          </h2>
          <p className="text-muted-foreground leading-relaxed">{riskText}</p>
        </section>

        {/* CTA til sammenligning */}
        <Link
          href={comparisonHref}
          className="mb-10 flex items-center justify-between p-5 bg-mint-50 border border-mint-200 rounded-2xl hover:border-mint-400 hover:shadow-sm transition-all group"
        >
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-mint-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-navy-900">
                Find billigste {animal}eforsikring til din {breed.name}
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                Sammenlign pris og dækning på tværs af selskaber.
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-mint-600 group-hover:text-mint-700 shrink-0 transition-colors" />
        </Link>

        {insuranceProducts.length > 0 && (
          <RecommendedProducts products={insuranceProducts.slice(0, 2)} title="Populære forsikringer" />
        )}

        <div className="mt-10">
          <FAQSection faqs={faqs} title={`Spørgsmål om forsikring til ${breed.name}`} />
        </div>

        <RelatedLinks
          links={[
            { href: `/hvad-koster/${breed.slug}`, title: `Hvad koster en ${breed.name}?`, desc: "Alle udgifter samlet" },
            { href: `/foder/${breed.slug}`, title: `Foder til ${breed.name}`, desc: "Pris og anbefalinger" },
            { href: comparisonHref, title: `Find billigste ${animal}eforsikring`, desc: "Sammenlign selskaber" },
            { href: "/beregner", title: "Beregn din pris", desc: "Personligt budget på 1 minut" },
          ]}
        />
      </div>
    </>
  );
}
