import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { collections, getCollectionBySlug } from "@/data/collections";
import { getBreedBySlug } from "@/data/breeds";
import { RaceCard } from "@/components/shared/RaceCard";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { RelatedLinks } from "@/components/shared/RelatedLinks";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import { Info } from "lucide-react";
import type { Breed } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dyrebudget.dk";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollectionBySlug(slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: `/lister/${slug}` },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const breeds = collection.breedSlugs
    .map((s) => getBreedBySlug(s))
    .filter((b): b is Breed => Boolean(b));

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Lister", path: "/guides" },
    { name: collection.h1, path: `/lister/${collection.slug}` },
  ]);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: collection.h1,
    itemListElement: breeds.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      url: `${SITE_URL}/hvad-koster/${b.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={[{ label: "Guider", href: "/guides" }, { label: collection.h1 }]} />

        <h1 className="text-3xl font-bold mb-4">{collection.h1}</h1>
        <p className="text-lg text-muted-foreground mb-6">{collection.intro}</p>

        <div className="flex items-start gap-2.5 p-4 bg-navy-50 border border-navy-200 rounded-xl mb-10">
          <Info className="w-4 h-4 text-navy-600 shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-navy-900">Sådan har vi udvalgt: </span>
            {collection.criteria}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {breeds.map((breed, i) => (
            <div key={breed.id} className="relative">
              <span className="absolute -top-2 -left-2 z-10 w-7 h-7 rounded-full bg-navy-900 text-white text-sm font-bold flex items-center justify-center shadow">
                {i + 1}
              </span>
              <RaceCard breed={breed} />
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground border-t border-border pt-6 mb-10">
          Listen er vejledende og baseret på racens typiske temperament og egenskaber. Individuelle
          dyr varierer — mød altid dyret og opdrætteren inden du beslutter dig.
        </p>

        <RelatedLinks
          links={[
            { href: "/beregner", title: "Beregn din kæledyrsøkonomi", desc: "Personligt budget på 1 minut" },
            { href: "/sammenlign", title: "Sammenlign racer", desc: "Se omkostninger side om side" },
            { href: "/huskeliste", title: "Huskeliste til ny hund", desc: "Alt du skal købe" },
            { href: "/guides", title: "Alle guides", desc: "Mere om kæledyrsøkonomi" },
          ]}
        />
      </div>
    </>
  );
}
