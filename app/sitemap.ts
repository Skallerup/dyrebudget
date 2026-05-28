import type { MetadataRoute } from "next";
import { breeds } from "@/data/breeds";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dyrebudget.dk";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: SITE_URL, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${SITE_URL}/beregner`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/hvad-koster`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/sammenlign`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/produkter`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${SITE_URL}/quiz`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/hvad-koster-en-hund`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/hvad-koster-en-kat`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/billigste-hunderacer`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/guides/dyreste-hunderacer`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/om`, priority: 0.4, changeFrequency: "yearly" as const },
    { url: `${SITE_URL}/metode`, priority: 0.5, changeFrequency: "yearly" as const },
    { url: `${SITE_URL}/affiliate`, priority: 0.4, changeFrequency: "yearly" as const },
    { url: `${SITE_URL}/privatliv`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${SITE_URL}/kontakt`, priority: 0.4, changeFrequency: "yearly" as const },
  ];

  const breedPages = breeds.map((breed) => ({
    url: `${SITE_URL}/hvad-koster/${breed.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  const popularComparisons = [
    "labrador-vs-golden-retriever",
    "labrador-vs-beagle",
    "fransk-bulldog-vs-mops",
    "huskat-vs-maine-coon",
    "border-collie-vs-beagle",
    "chihuahua-vs-gravhund",
  ].map((comp) => ({
    url: `${SITE_URL}/sammenlign/${comp}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  return [
    ...staticPages.map((p) => ({
      url: p.url,
      lastModified: new Date(),
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...breedPages.map((p) => ({
      url: p.url,
      lastModified: new Date(),
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...popularComparisons.map((p) => ({
      url: p.url,
      lastModified: new Date(),
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
  ];
}
