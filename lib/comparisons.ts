// Kuraterede sammenligningspar der er værd at indeksere.
//
// Vi genererer ~925 mulige par, men på et nyt domæne ville så mange
// næsten-identiske sider blive set som tyndt indhold og spilde crawl-budget.
// Derfor indekserer vi kun par mellem populære racer (reel søgevolumen).
// Resten serveres stadig (noindex,follow) så interne links virker — men
// holdes ude af sitemap og Googles indeks indtil domænet har autoritet.

export const POPULAR_DOG_SLUGS = [
  "labrador",
  "golden-retriever",
  "fransk-bulldog",
  "mops",
  "beagle",
  "schaeferhund",
  "border-collie",
  "gravhund",
  "chihuahua",
  "puddel",
  "cavapoo",
  "cocker-spaniel",
  "rottweiler",
  "yorkshireterrier",
  "jack-russell-terrier",
] as const;

export const POPULAR_CAT_SLUGS = [
  "huskat",
  "maine-coon",
  "ragdoll",
  "british-shorthair",
  "norsk-skovkat",
] as const;

/** Alle indekserbare par på normaliseret form `${a}-vs-${b}`. */
export function getIndexableComparisons(): string[] {
  const pairs: string[] = [];
  for (const group of [POPULAR_DOG_SLUGS, POPULAR_CAT_SLUGS]) {
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        pairs.push(`${group[i]}-vs-${group[j]}`);
      }
    }
  }
  return pairs;
}

const INDEXABLE_SET = new Set(getIndexableComparisons());

/** Er dette par værd at indeksere? Rækkefølge-uafhængig. */
export function isIndexableComparison(slugA: string, slugB: string): boolean {
  return (
    INDEXABLE_SET.has(`${slugA}-vs-${slugB}`) ||
    INDEXABLE_SET.has(`${slugB}-vs-${slugA}`)
  );
}
