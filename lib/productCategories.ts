import type { ProductCategory, PetType } from "@/types";

export interface ProductCategoryMeta {
  slug: ProductCategory;
  label: string;
  description: string;
  petType: PetType | "both";
  order: number;
}

export const productCategories: ProductCategoryMeta[] = [
  {
    slug: "hundefoder",
    label: "Hundefoder",
    description: "Tørfoder og vådfoder til hunde — sammenlign pris pr. kg og pr. dag.",
    petType: "dog",
    order: 1,
  },
  {
    slug: "kattefoder",
    label: "Kattefoder",
    description: "Foder til katte i alle aldre — premium og grain-free udvalg.",
    petType: "cat",
    order: 2,
  },
  {
    slug: "godbidder",
    label: "Godbidder & snacks",
    description: "Belønning til træning og hygge — naturlige godbidder og kiks.",
    petType: "both",
    order: 3,
  },
  {
    slug: "hundeforsikring",
    label: "Hundeforsikring",
    description: "Syge- og livsforsikring til hunde — sammenlign dækning og pris.",
    petType: "dog",
    order: 4,
  },
  {
    slug: "katteforsikring",
    label: "Katteforsikring",
    description: "Forsikring til katte — vælg dækning der passer til din kat.",
    petType: "cat",
    order: 5,
  },
  {
    slug: "loppe-og-flaat",
    label: "Loppe & flåt",
    description: "Behandling og forebyggelse mod lopper, flåter og utøj.",
    petType: "both",
    order: 6,
  },
  {
    slug: "hundesenge",
    label: "Senge & kurve",
    description: "Bløde og vaskbare hundesenge og kurve i flere størrelser.",
    petType: "dog",
    order: 7,
  },
  {
    slug: "legetoj",
    label: "Legetøj",
    description: "Aktivering og sjov til hund og kat — fra knitrebamser til aktivitetslegetøj.",
    petType: "both",
    order: 8,
  },
  {
    slug: "kattegrus",
    label: "Kattegrus",
    description: "Kattegrus og bakker — klumpende og lugtreducerende løsninger.",
    petType: "cat",
    order: 9,
  },
  {
    slug: "udstyr",
    label: "Udstyr & tilbehør",
    description: "Pleje, transport, kosttilskud og praktisk tilbehør til hverdagen.",
    petType: "both",
    order: 10,
  },
];

export const categoryLabel = (slug: ProductCategory): string =>
  productCategories.find((c) => c.slug === slug)?.label ?? slug;
