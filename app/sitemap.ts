import type { MetadataRoute } from "next";
import { breeds } from "@/data/breeds";
import { products } from "@/data/products";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dyrebudget.dk";

// #4 — Programmatically generate ALL comparison pairs so none are missing from sitemap
function generateAllComparisons(): string[] {
  const dogs = breeds.filter((b) => b.petType === "dog").map((b) => b.slug);
  const cats = breeds.filter((b) => b.petType === "cat").map((b) => b.slug);
  const pairs: string[] = [];
  for (const group of [dogs, cats]) {
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        pairs.push(`${group[i]}-vs-${group[j]}`);
      }
    }
  }
  return pairs;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { url: SITE_URL, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${SITE_URL}/beregner`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/hvad-koster`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/sammenlign`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/produkter`, priority: 0.7, changeFrequency: "weekly" as const },
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

  // #4 — All programmatically generated comparison pairs (was only 14 before)
  const allComparisons = generateAllComparisons().map((comp) => ({
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
    ...allComparisons,
    ...productPages,
  ];
}
