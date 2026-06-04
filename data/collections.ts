import type { PetType } from "@/types";

// Kuraterede race-samlinger ("listicles"). Slug-lister er håndplukkede for
// at undgå forkerte påstande — hver liste matcher en konkret søgeintention
// med høj volumen og lav konkurrence.
export interface BreedCollection {
  slug: string;
  title: string;
  h1: string;
  petType: PetType;
  /** Meta description */
  description: string;
  /** Intro-afsnit på siden */
  intro: string;
  /** Kort metodebeskrivelse — hvorfor netop disse racer */
  criteria: string;
  /** Håndplukkede race-slugs, i prioriteret rækkefølge */
  breedSlugs: string[];
}

export const collections: BreedCollection[] = [
  {
    slug: "allergivenlige-hunde",
    title: "Allergivenlige hunde 2026 — 10 racer der fælder mindst",
    h1: "Allergivenlige hunderacer",
    petType: "dog",
    description:
      "Søger du en hypoallergen hund der fælder minimalt? Her er de bedste allergivenlige hunderacer i Danmark — med pris, pelstype og hvad du skal vide.",
    intro:
      "Ingen hund er 100% allergivenlig, men nogle racer fælder markant mindre og afgiver færre allergener. Det gælder især racer med krøllet eller hårlignende pels (puddel-typer), der ikke fælder på samme måde som dobbeltpelsede racer. Til gengæld kræver de fleste af dem regelmæssig trimning.",
    criteria:
      "Udvalgt på pelstype (krøllet/hårlignende, lav fældning), erfaring fra allergikere og racens generelle egnethed til hjemmet. Bemærk: grooming er en fast udgift for de fleste af disse racer.",
    breedSlugs: [
      "puddel",
      "bichon-frise",
      "cavapoo",
      "cockapoo",
      "labradoodle",
      "goldendoodle",
      "maltipoo",
      "maltese",
      "miniature-schnauzer",
      "shih-tzu",
    ],
  },
  {
    slug: "familievenlige-hunde",
    title: "Bedste familiehunde 2026 — 10 racer der passer til børn",
    h1: "Bedste familiehunde",
    petType: "dog",
    description:
      "Hvilken hund passer bedst til en familie med børn? Her er de mest familievenlige hunderacer i Danmark — tålmodige, robuste og kærlige, med pris og pasningsbehov.",
    intro:
      "En god familiehund er tålmodig, robust og social — og trives med liv og larm omkring sig. Disse racer er kendt for at være gode med børn, men husk at størrelse, motionsbehov og budget også skal passe til jeres hverdag.",
    criteria:
      "Udvalgt på temperament (tålmodig, social), robusthed omkring børn og generel popularitet i danske familier. Alle racer kræver dog tidlig socialisering og træning.",
    breedSlugs: [
      "labrador",
      "golden-retriever",
      "beagle",
      "cavalier-king-charles-spaniel",
      "labradoodle",
      "goldendoodle",
      "cocker-spaniel",
      "boxer",
      "bichon-frise",
      "dansk-svensk-gaardhund",
    ],
  },
  {
    slug: "hunde-til-lejlighed",
    title: "Bedste hunde til lejlighed 2026 — 10 racer til mindre bolig",
    h1: "Bedste hunde til lejlighed",
    petType: "dog",
    description:
      "Bor du i lejlighed? Disse hunderacer trives på mindre plads — rolige, mindre størrelse og moderat motionsbehov. Se pris og hvad du skal vide.",
    intro:
      "Du kan sagtens have hund i lejlighed — det handler mere om temperament og motionsbehov end om kvadratmeter. De bedste lejlighedshunde er typisk rolige indendørs, gør ikke for meget af sig, og er tilfredse med daglige gåture frem for timevis af løb.",
    criteria:
      "Udvalgt på størrelse, indendørs-ro og moderat motionsbehov. Husk at alle hunde skal luftes flere gange dagligt — også i lejlighed.",
    breedSlugs: [
      "chihuahua",
      "cavalier-king-charles-spaniel",
      "maltese",
      "shih-tzu",
      "bichon-frise",
      "pomeranian",
      "fransk-bulldog",
      "mops",
      "whippet",
      "maltipoo",
    ],
  },
  {
    slug: "boernevenlige-katte",
    title: "Bedste katte til børnefamilier 2026 — 7 rolige racer",
    h1: "Bedste katte til børnefamilier",
    petType: "cat",
    description:
      "Hvilken katterace passer bedst til en familie med børn? Her er de mest rolige og tålmodige katteracer i Danmark — med pris og temperament.",
    intro:
      "En god familiekat er tålmodig, social og tolerant over for håndtering og leg. Disse racer er kendt for et roligt gemyt og for at knytte sig til hele familien — også de mindste.",
    criteria:
      "Udvalgt på temperament (roligt, tålmodigt, socialt) og tolerance over for børns leg og håndtering. Lær altid børn at respektere kattens grænser.",
    breedSlugs: [
      "ragdoll",
      "maine-coon",
      "british-shorthair",
      "birmaner",
      "burmese",
      "huskat",
      "europaeisk-korthaar",
    ],
  },
];

export const getCollectionBySlug = (slug: string): BreedCollection | undefined =>
  collections.find((c) => c.slug === slug);
