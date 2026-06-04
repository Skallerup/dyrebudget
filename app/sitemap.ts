import type { MetadataRoute } from "next";
import { breeds } from "@/data/breeds";
import { products } from "@/data/products";
import { getIndexableComparisons } from "@/lib/comparisons";
import { treatments } from "@/data/treatments";
import { collections } from "@/data/collections";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dyrebudget.dk";

// Stabil indholdsdato i stedet for `new Date()` ved hver build.
// Bumpes manuelt når indholdet reelt opdateres — så Google ikke ser
// "alt ændret hver dag" (et støj-signal der svækker freshness-troværdighed).
const CONTENT_UPDATED = new Date("2026-06-01T00:00:00Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = CONTENT_UPDATED;

  const staticPages = [
    { url: SITE_URL, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${SITE_URL}/beregner`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/hvad-koster`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/sammenlign`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/dyrlaege-priser`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/produkter`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${SITE_URL}/huskeliste`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/huskeliste/kat`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/find-billigste-hundeforsikring`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/find-billigste-katteforsikring`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/statistik`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/quiz`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/hvad-koster-en-hund`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/hvad-koster-en-kat`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/billigste-hunderacer`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/dyreste-hunderacer`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/billigste-hundefoder`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/hundeforsikring`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/foerste-hund-budget`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/bedste-hundeforsikring`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/bedste-katteforsikring`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/hvalpe-budget`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/hvad-koster-en-fransk-bulldog`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/hvad-koster-en-golden-retriever`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/hvad-koster-en-labrador`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/billigste-katteracer`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/hvad-koster-en-schaeferhund`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/hvad-koster-en-beagle`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/hvad-koster-en-chihuahua`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/hvad-koster-en-gravhund`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/hvad-koster-en-border-collie`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/hvad-koster-en-puddel`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/hvad-koster-en-rottweiler`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/hvad-koster-en-berner-sennenhund`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/hvad-koster-en-cavapoo`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/hvad-koster-en-cocker-spaniel`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/julegaver-til-hund`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/julegaver-til-kat`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/om`, priority: 0.4, changeFrequency: "yearly" as const },
    { url: `${SITE_URL}/metode`, priority: 0.5, changeFrequency: "yearly" as const },
    { url: `${SITE_URL}/affiliate`, priority: 0.4, changeFrequency: "yearly" as const },
    { url: `${SITE_URL}/privatliv`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${SITE_URL}/kontakt`, priority: 0.4, changeFrequency: "yearly" as const },
  ];

  const breedPages = breeds.map((breed) => ({
    url: `${SITE_URL}/hvad-koster/${breed.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // #3 — Programmatic buyer's guides ("Er en X noget for dig?") for every breed
  const breedGuidePages = breeds.map((breed) => ({
    url: `${SITE_URL}/guides/${breed.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Intent-sider pr. race: forsikring + foder
  const insurancePages = breeds.map((breed) => ({
    url: `${SITE_URL}/forsikring/${breed.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const foodPages = breeds.map((breed) => ({
    url: `${SITE_URL}/foder/${breed.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dyrlæge-prissider
  const treatmentPages = treatments.map((t) => ({
    url: `${SITE_URL}/dyrlaege-priser/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Listicles
  const collectionPages = collections.map((c) => ({
    url: `${SITE_URL}/lister/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Kun kuraterede, indekserbare par i sitemap (den lange hale er noindex
  // og hører ikke hjemme her — beskytter crawl-budget på nyt domæne).
  const allComparisons = getIndexableComparisons().map((comp) => ({
    url: `${SITE_URL}/sammenlign/${comp}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const productPages = products.map((product) => ({
    url: `${SITE_URL}/produkter/${product.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages.map((p) => ({
      url: p.url,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...breedPages,
    ...breedGuidePages,
    ...insurancePages,
    ...foodPages,
    ...treatmentPages,
    ...collectionPages,
    ...allComparisons,
    ...productPages,
  ];
}
