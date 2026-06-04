import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Bone } from "lucide-react";
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
  return {
    title: `Foder til ${breed.name} — pris og bedste valg ${new Date().getFullYear()}`,
    description: `Hvad koster foder til en ${breed.name}, og hvilket foder er bedst? Typisk ${formatCurrency(
      breed.monthlyFoodCost.budget
    )}–${formatCurrency(breed.monthlyFoodCost.premium)} om måneden. Se anbefalinger og spar penge.`,
    alternates: { canonical: `/foder/${slug}` },
  };
}

export default async function BreedFoodPage({ params }: Props) {
  const { slug } = await params;
  const breed = getBreedBySlug(slug);
  if (!breed) notFound();

  const isDog = breed.petType === "dog";
  const foodProducts = getProductsByCategory(isDog ? "hundefoder" : "kattefoder");

  // Groft estimat på daglig fodermængde ud fra vægt (tørfoder).
  const avgWeight = (breed.weightKg.min + breed.weightKg.max) / 2;
  const gramsPerDay = isDog
    ? Math.round((avgWeight * 15) / 10) * 10 // ~1,5% af kropsvægt
    : Math.round(avgWeight * 12);
  const kgPerMonth = Math.round(((gramsPerDay * 30) / 1000) * 10) / 10;

  const sizeText = isDog
    ? breed.sizeClass === "large" || breed.sizeClass === "giant"
      ? `${breed.name} er en stor race, og foder er derfor en af de største løbende udgifter. Det betaler sig at købe i store sække (15+ kg) for at få prisen pr. kilo ned.`
      : breed.sizeClass === "tiny" || breed.sizeClass === "small"
      ? `${breed.name} er en lille race med et beskedent foderbehov, så selv premium-foder holder sig på et overkommeligt månedligt niveau.`
      : `${breed.name} er en mellemstor race med et moderat foderbehov.`
    : `Katte som ${breed.name} har et relativt lille, men stabilt foderbehov. Kvalitet betyder mere end mængde — godt kattefoder forebygger urinvejs- og vægtproblemer.`;

  const activityText =
    breed.activityLevel === "high"
      ? `Da racen er meget aktiv, ligger energibehovet — og dermed fodermængden — i den høje ende.`
      : breed.activityLevel === "low"
      ? `Da racen har et lavt aktivitetsniveau, er det vigtigt ikke at overfodre — overvægt er en hyppig årsag til dyre helbredsproblemer.`
      : "";

  const faqs = [
    {
      question: `Hvad koster foder til en ${breed.name}?`,
      answer: `Foder til en ${breed.name} koster typisk ${formatCurrency(
        breed.monthlyFoodCost.budget
      )}–${formatCurrency(
        breed.monthlyFoodCost.premium
      )} om måneden afhængigt af kvalitet. Medium-kvalitet ligger omkring ${formatCurrency(
        breed.monthlyFoodCost.medium
      )}.`,
    },
    {
      question: `Hvor meget skal en ${breed.name} have at spise?`,
      answer: `En voksen ${breed.name} spiser typisk omkring ${gramsPerDay} g tørfoder om dagen — ca. ${kgPerMonth} kg om måneden. Den præcise mængde afhænger af alder, aktivitet og foderets energiindhold. Følg altid posens anvisning.`,
    },
    {
      question: `Hvordan sparer jeg på foder til min ${breed.name}?`,
      answer: `Køb i større sække (pris pr. kg falder markant), vælg medium-kvalitet frem for premium (ofte samme næringsværdi), og undgå overfodring. Sammenlign altid pris pr. kg frem for pris pr. pose.`,
    },
  ];

  const faqJsonLd = generateFAQJsonLd(faqs);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Foder", path: "/produkter" },
    { name: breed.name, path: `/foder/${breed.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={[{ label: "Foder", href: "/produkter" }, { label: breed.name }]} />

        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center shrink-0">
            <Bone className="w-5 h-5 text-mint-400" />
          </div>
          <h1 className="text-3xl font-bold">Foder til {breed.name}</h1>
        </div>
        <p className="text-lg text-muted-foreground mb-8">
          Hvad koster foder til en {breed.name}, hvor meget skal den have, og hvilket foder er bedst?
          Her er prisspænd, fodermængde og konkrete anbefalinger.
        </p>

        {/* Pris-hero */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-navy-900 text-white rounded-2xl p-5 sm:col-span-1">
            <p className="text-navy-300 text-xs mb-1">Foder pr. måned</p>
            <p className="text-2xl font-bold">{formatCurrency(breed.monthlyFoodCost.medium)}</p>
            <p className="text-navy-300 text-xs mt-1">
              {formatCurrency(breed.monthlyFoodCost.budget)}–{formatCurrency(breed.monthlyFoodCost.premium)} efter kvalitet
            </p>
          </div>
          <div className="bg-muted/50 rounded-2xl p-5 text-center flex flex-col justify-center">
            <p className="text-xs text-muted-foreground mb-1">Pr. dag</p>
            <p className="text-2xl font-bold text-navy-900">~{gramsPerDay} g</p>
          </div>
          <div className="bg-muted/50 rounded-2xl p-5 text-center flex flex-col justify-center">
            <p className="text-xs text-muted-foreground mb-1">Pr. måned</p>
            <p className="text-2xl font-bold text-navy-900">~{kgPerMonth} kg</p>
          </div>
        </div>

        {/* Forklaring */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Foderbehov for {breed.name}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {sizeText} {activityText}
          </p>
        </section>

        {foodProducts.length > 0 && (
          <RecommendedProducts
            products={foodProducts.slice(0, 4)}
            title={`Anbefalet foder til ${breed.name}`}
          />
        )}

        <div className="mt-10">
          <FAQSection faqs={faqs} title={`Spørgsmål om foder til ${breed.name}`} />
        </div>

        <RelatedLinks
          links={[
            { href: `/hvad-koster/${breed.slug}`, title: `Hvad koster en ${breed.name}?`, desc: "Alle udgifter samlet" },
            { href: `/forsikring/${breed.slug}`, title: `Forsikring til ${breed.name}`, desc: "Pris og dækning" },
            { href: "/guides/billigste-hundefoder", title: "Bedste hundefoder til prisen", desc: "Sammenligning pr. kg" },
            { href: "/beregner", title: "Beregn din pris", desc: "Personligt budget" },
          ]}
        />
      </div>
    </>
  );
}
