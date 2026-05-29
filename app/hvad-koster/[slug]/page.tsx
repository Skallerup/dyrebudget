import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { breeds, getBreedBySlug } from "@/data/breeds";
import { calculatePetCost } from "@/lib/calculator";
import { formatCurrency, getCostIndexBgColor } from "@/lib/calculator";
import { getBreedRecommendedProducts } from "@/data/products";
import { CostResultCard } from "@/components/calculator/CostResultCard";
import { RecommendedProducts } from "@/components/shared/RecommendedProducts";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import { EmailCapture } from "@/components/shared/EmailCapture";
import { MethodologyBox } from "@/components/shared/MethodologyBox";
import { RaceCard } from "@/components/shared/RaceCard";
import { generateBreedJsonLd, generateFAQJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import { getBreedImage } from "@/data/breedImages";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
  const monthly = breed.monthlyFoodCost.medium + breed.monthlyInsurance.medium + breed.monthlyVetAvg + breed.monthlyGrooming;
  return {
    title: `Hvad koster en ${breed.name}? Pris ${new Date().getFullYear()}`,
    description: `${breed.name} koster ca. ${formatCurrency(monthly)} om måneden. Se fuld beregning med foder, forsikring, dyrlæge og livstidspris.`,
    alternates: { canonical: `/hvad-koster/${slug}` },
  };
}

export default async function BreedPage({ params }: Props) {
  const { slug } = await params;
  const breed = getBreedBySlug(slug);
  if (!breed) notFound();

  const defaultInputs = {
    petType: breed.petType,
    breedId: breed.id,
    ageYears: 2,
    budgetLevel: "medium" as const,
    activityLevel: "medium" as const,
    hasInsurance: true,
    housingType: "house" as const,
    groomingLevel: "mixed" as const,
  };

  const result = calculatePetCost(breed, defaultInputs);

  const relatedBreeds = breeds
    .filter((b) => b.petType === breed.petType && b.id !== breed.id)
    .sort((a, b) => Math.abs(a.costIndex - breed.costIndex) - Math.abs(b.costIndex - breed.costIndex))
    .slice(0, 4);

  const faqs = [
    {
      question: `Hvad koster en ${breed.name} om måneden?`,
      answer: `En ${breed.name} koster typisk ${formatCurrency(result.monthlyCost)} om måneden på medium-niveau. Det inkluderer foder (${formatCurrency(result.breakdown.food)}), forsikring (${formatCurrency(result.breakdown.insurance)}) og dyrlæge (${formatCurrency(result.breakdown.vet)}).`,
    },
    {
      question: `Hvad koster en ${breed.name} det første år?`,
      answer: `Første år med en ${breed.name} koster ca. ${formatCurrency(result.firstYearCost)}. Det inkluderer anskaffelsespris, grundudstyr og alle løbende udgifter for 12 måneder.`,
    },
    {
      question: `Hvad er den samlede livstidspris for en ${breed.name}?`,
      answer: `Samlet livstidspris for en ${breed.name} er ca. ${formatCurrency(result.lifetimeCost)} baseret på en gennemsnitlig levetid på ${Math.round((breed.lifespan.min + breed.lifespan.max) / 2)} år.`,
    },
    {
      question: `Har ${breed.name} høje dyrlægeomkostninger?`,
      answer: `${breed.name} har en ${breed.healthRisk === "low" ? "lav" : breed.healthRisk === "medium" ? "middel" : "høj"} sundhedsrisiko. Vi estimerer ${formatCurrency(breed.monthlyVetAvg)} pr. måned til dyrlæge inkl. forebyggende behandling.`,
    },
  ];

  const breedGuideMap: Record<string, string> = {
    "labrador": "/guides/hvad-koster-en-labrador",
    "golden-retriever": "/guides/hvad-koster-en-golden-retriever",
    "fransk-bulldog": "/guides/hvad-koster-en-fransk-bulldog",
    "schaeferhund": "/guides/hvad-koster-en-schaeferhund",
    "beagle": "/guides/hvad-koster-en-beagle",
    "chihuahua": "/guides/hvad-koster-en-chihuahua",
    "gravhund": "/guides/hvad-koster-en-gravhund",
    "border-collie": "/guides/hvad-koster-en-border-collie",
    "puddel": "/guides/hvad-koster-en-puddel",
    "rottweiler": "/guides/hvad-koster-en-rottweiler",
    "berner-sennenhund": "/guides/hvad-koster-en-berner-sennenhund",
    "cavapoo": "/guides/hvad-koster-en-cavapoo",
    "cocker-spaniel": "/guides/hvad-koster-en-cocker-spaniel",
  };
  const breedGuideUrl = breedGuideMap[breed.slug] ?? null;
  const breedImageUrl = getBreedImage(breed.slug);

  const breedJsonLd = generateBreedJsonLd(breed);
  const faqJsonLd = generateFAQJsonLd(faqs);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Hvad koster", path: "/hvad-koster" },
    { name: breed.name, path: `/hvad-koster/${breed.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breedJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs
          items={[
            { label: "Hvad koster", href: "/hvad-koster" },
            { label: breed.name },
          ]}
        />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start gap-6 flex-wrap sm:flex-nowrap">
            {breedImageUrl && (
              <div className="relative w-full sm:w-48 sm:shrink-0 h-48 rounded-2xl overflow-hidden bg-muted">
                <Image
                  src={breedImageUrl}
                  alt={breed.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 192px"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h1 className="text-3xl font-bold">
                  Hvad koster en {breed.name}?
                </h1>
                <span className={`text-sm font-semibold px-3 py-1.5 rounded-full shrink-0 ${getCostIndexBgColor(breed.costIndex)}`}>
                  Indeks {breed.costIndex}/100
                </span>
              </div>
              <p className="text-muted-foreground">{breed.description}</p>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Størrelse", value: breed.sizeClass === "tiny" ? "Mini" : breed.sizeClass === "small" ? "Lille" : breed.sizeClass === "medium" ? "Medium" : breed.sizeClass === "large" ? "Stor" : "Meget stor" },
            { label: "Levetid", value: `${breed.lifespan.min}–${breed.lifespan.max} år` },
            { label: "Sundhedsrisiko", value: breed.healthRisk === "low" ? "Lav" : breed.healthRisk === "medium" ? "Middel" : "Høj" },
            { label: "Aktivitet", value: breed.activityLevel === "low" ? "Rolig" : breed.activityLevel === "medium" ? "Moderat" : "Aktiv" },
          ].map((stat) => (
            <div key={stat.label} className="bg-muted/50 rounded-xl p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className="font-semibold text-sm">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Traits */}
        <div className="flex flex-wrap gap-2 mb-8">
          {breed.traits.map((trait) => (
            <span
              key={trait}
              className="text-sm px-3 py-1 bg-navy-900 text-white rounded-full font-medium"
            >
              {trait}
            </span>
          ))}
        </div>

        {/* Main result */}
        <CostResultCard result={result} breed={breed} />

        {/* Anbefalede produkter — placeret direkte efter resultatet */}
        {(() => {
          const recommendedProducts = getBreedRecommendedProducts(breed);
          return recommendedProducts.length > 0 ? (
            <div className="mt-8 p-5 bg-card border border-border rounded-2xl">
              <RecommendedProducts
                products={recommendedProducts}
                title={`Populære produkter til ${breed.name}-ejere`}
              />
            </div>
          ) : null;
        })()}

        {/* #9 — Enhanced compare section with multiple pairs */}
        <div className="mt-8 p-5 bg-navy-50 border border-navy-100 rounded-2xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-navy-900 flex items-center justify-center shrink-0">
              <ArrowRight className="w-3.5 h-3.5 text-mint-400" />
            </div>
            <p className="font-semibold text-navy-900">Sammenlign {breed.name} med en anden race</p>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Hurtige sammenligninger — klik for at se siden-om-siden analyse:
          </p>
          <div className="flex flex-wrap gap-2">
            {relatedBreeds.slice(0, 3).map((b) => (
              <Link
                key={b.id}
                href={`/sammenlign/${breed.slug}-vs-${b.slug}`}
                className="text-xs px-3 py-2 bg-white border border-navy-200 rounded-full font-medium text-navy-700 hover:border-navy-400 hover:text-navy-900 transition-colors"
              >
                {breed.name} vs. {b.name}
              </Link>
            ))}
            <Link
              href="/sammenlign"
              className="text-xs px-3 py-2 bg-navy-900 text-white rounded-full font-medium hover:bg-navy-800 transition-colors flex items-center gap-1"
            >
              Alle kombinationer
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Guide link — only for breeds with dedicated guide */}
        {breedGuideUrl && (
          <Link
            href={breedGuideUrl}
            className="mt-4 flex items-center justify-between p-4 bg-navy-50 border border-navy-200 rounded-xl hover:border-navy-400 hover:shadow-sm transition-all group"
          >
            <div>
              <p className="text-sm font-semibold text-navy-900">Læs vores komplette {breed.name}-guide</p>
              <p className="text-xs text-muted-foreground mt-0.5">Sundhedsrisici, forsikringstips og hvad du skal vide inden køb</p>
            </div>
            <ArrowRight className="w-4 h-4 text-navy-600 group-hover:text-navy-900 shrink-0 transition-colors" />
          </Link>
        )}

        {/* Email capture */}
        <div className="mt-8">
          <EmailCapture breedName={breed.name} monthlyCost={result.monthlyCost} />
        </div>

        {/* FAQ */}
        <FAQSection faqs={faqs} title={`Spørgsmål om ${breed.name}`} />

        {/* Methodology */}
        <MethodologyBox />

        {/* Related breeds */}
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
