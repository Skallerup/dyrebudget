// Breed photos are hosted locally in /public/breeds/{slug}.jpg
//
// To add or fix a breed image: drop a file named after the breed slug into
// /public/breeds/ (e.g. "labrador.jpg", "border-collie.jpg"). No code change
// needed. Missing files fall back to an emoji placeholder (see BreedImage).
//
// Recommended: ~800x600px, JPG, optimized. The slug is the same value used in
// the breed's URL (/hvad-koster/{slug}).

export function getBreedImage(slug: string): string {
  return `/breeds/${slug}.jpg`;
}
