// Stabil "Adoption Pets"-farveramme pr. race — samme race får altid samme farve.
const cardTints = ["bg-coral-200", "bg-sky-200", "bg-mint-200", "bg-amber-200"];

export function tintForSlug(slug: string): string {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return cardTints[h % cardTints.length];
}
