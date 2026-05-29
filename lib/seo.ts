import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dyrebudget.dk";
const SITE_NAME = "DyreBudget.dk";

export function generateMetadata({
  title,
  description,
  path = "",
  ogImage,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  // #3 — Use dynamic OG image route instead of non-existent /og-default.jpg
  const image = ogImage || `${SITE_URL}/opengraph-image`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: "website",
      locale: "da_DK",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export function generateBreedJsonLd(breed: {
  name: string;
  description: string;
  slug: string;
}) {
  // #8 — Add datePublished/dateModified for E-E-A-T and Google freshness
  const published = "2025-01-01T00:00:00Z";
  const modified = new Date().toISOString();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Hvad koster en ${breed.name}? Pris ${new Date().getFullYear()}`,
    description: breed.description,
    url: `${SITE_URL}/hvad-koster/${breed.slug}`,
    datePublished: published,
    dateModified: modified,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/opengraph-image` },
    },
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    inLanguage: "da",
  };
}

export function generateFAQJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbJsonLd(
  crumbs: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}
