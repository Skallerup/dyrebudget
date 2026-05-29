// Curated Unsplash photo IDs per breed slug.
// Format: https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=600&q=75
// All photos are free under the Unsplash License (unsplash.com/license).

const BASE = "?auto=format&fit=crop&w=600&q=75";
const img = (id: string) => `https://images.unsplash.com/photo-${id}${BASE}`;

export const breedImageMap: Record<string, string> = {
  // ── HUNDE ──────────────────────────────────────────────────────────

  // Labrador Retriever — yellow lab
  "labrador": img("1587300003388-59208cc962cb"),

  // Golden Retriever — golden in field
  "golden-retriever": img("1552053831-71594a27632d"),

  // Fransk Bulldog — brown/black frenchie on rug
  "fransk-bulldog": img("5mR3z8PcCOQ"),

  // Mops (Pug) — fawn pug puppy, selective focus portrait
  "mops": img("hnYMacpvKZY"),

  // Beagle — white/brown/black beagle
  "beagle": img("Qia9cxFiFAs"),

  // Schæferhund (German Shepherd) — black and tan GSD
  "schaeferhund": img("e2CUN5csvIA"),

  // Border Collie — black and white border collie close-up
  "border-collie": img("NuLvFW7ZSng"),

  // Gravhund (Dachshund) — black and tan dachshund
  "gravhund": img("GBxzryYk_HQ"),

  // Chihuahua — black and brown chihuahua on wooden floor
  "chihuahua": img("2XB84zftR1o"),

  // Puddel (Poodle) — curly poodle
  "puddel": img("1575425186775-b8de9a427e67"),

  // Dansk-Svensk Gårdhund — lithe white/brown dog
  "dansk-svensk-gaardhund": img("XaJozZyfTa0"),

  // Cavapoo — curly cavalier-poodle mix
  "cavapoo": img("29qTRiP-ToY"),

  // Cockapoo — fluffy cocker-poodle mix
  "cockapoo": img("7FHTRGCnc_Q"),

  // Goldendoodle — golden doodle
  "goldendoodle": img("MvjdM7ZhNrk"),

  // Labradoodle — labrador-poodle mix
  "labradoodle": img("wLa7acX2qJw"),

  // Maltipoo — white small mix
  "maltipoo": img("wFlrIeyBDBk"),

  // Bernedoodle — berner-poodle mix
  "bernedoodle": img("1574943320219-cff0ced94db2"),

  // Yorkshire Terrier — brown/white yorkie puppy
  "yorkshireterrier": img("hVgY8gNzJQ0"),

  // Shih Tzu — fluffy shih tzu
  "shih-tzu": img("1625794084867-8ddd239946b1"),

  // Cavalier King Charles Spaniel
  "cavalier-king-charles-spaniel": img("1591946614720-90a587da4a36"),

  // Cocker Spaniel
  "cocker-spaniel": img("1588943211346-0908a1fb0b01"),

  // Springer Spaniel — springer in field
  "springer-spaniel": img("6agZWsgAPIQ"),

  // Bichon Frisé — fluffy white bichon
  "bichon-frise": img("Ia7s6XYhiGs"),

  // Boxer — boxer dog
  "boxer": img("1534361672-b558285a33f0"),

  // Rottweiler — rottweiler portrait
  "rottweiler": img("1561037404-61cd46aa615b"),

  // Dobermann — black and tan doberman
  "dobermann": img("GNFIl0l_cpM"),

  // Sibirisk Husky (Siberian Husky) — blue-eyed husky
  "sibirisk-husky": img("1605568818018-f33e57d4fbd9"),

  // Australian Shepherd — merle aussie
  "australian-shepherd": img("1583783342308-d8bb90d45af2"),

  // Berner Sennenhund — tricolor berner
  "berner-sennenhund": img("1574943320219-cff0ced94db2"),

  // Jack Russell Terrier — white/brown JRT puppy
  "jack-russell-terrier": img("XaJozZyfTa0"),

  // Miniature Schnauzer — salt-and-pepper schnauzer
  "miniature-schnauzer": img("bYvKM33KaWo"),

  // Maltese — fluffy white maltese
  "maltese": img("wFlrIeyBDBk"),

  // Pomeranian — white pomeranian puppy on autumn leaves
  "pomeranian": img("NR2eMg9zXxA"),

  // Whippet — elegant whippet
  "whippet": img("IfqcWgnPFbE"),

  // Dalmatiner (Dalmatian) — black and white dalmatian
  "dalmatiner": img("FDuF2ywToNQ"),

  // Irsk Setter (Irish Setter) — red setter
  "irsk-setter": img("sDOBBFC1wW8"),

  // Flatcoated Retriever — black retriever
  "flatcoated-retriever": img("J7t7VkYCu1g"),

  // Blandet race — friendly mixed breed (beagle-type)
  "hund-blandet-race": img("Gf4kzZ9Xdc8"),

  // ── KATTE ──────────────────────────────────────────────────────────

  // Maine Coon — large fluffy maine coon
  "maine-coon": img("1533743983669-94fa5c4338ec"),

  // Ragdoll — blue-eyed ragdoll
  "ragdoll": img("1513360371489-6c4e3bce8b47"),

  // Norsk Skovkat (Norwegian Forest Cat) — fluffy forest cat
  "norsk-skovkat": img("T0JDIRtZubw"),

  // Huskat (Domestic Cat) — tabby domestic cat
  "huskat": img("1514888286974-6c03e2ca1dba"),

  // British Shorthair — round-faced gray BSH
  "british-shorthair": img("1592194996308-7b43878e84a6"),

  // Bengal — spotted bengal cat
  "bengal": img("qQgOMo4vpnU"),

  // Siameser (Siamese) — cream/dark-point siamese
  "siameser": img("gT0ylc4bIEw"),

  // Perser (Persian) — flat-faced fluffy persian
  "perser": img("B0gInm55010"),

  // Europæisk Korthår — short-haired tabby
  "europaeisk-korthaar": img("1574158622682-e719686a4e3a"),

  // Russisk Blå (Russian Blue) — gray blue cat
  "russisk-blaa": img("1592194996308-7b43878e84a6"),

  // Abyssiner (Abyssinian) — ticked tabby abyssinian
  "abyssiner": img("1574158622682-e719686a4e3a"),

  // Burmese — dark sable burmese
  "burmese": img("1533743983669-94fa5c4338ec"),

  // Birmaner (Birman) — colorpoint birman
  "birmaner": img("1513360371489-6c4e3bce8b47"),

  // Sphynx — hairless sphynx cat
  "sphynx": img("1525348281969-2b17a8f63de6"),

  // Scottish Fold — round-eared fold
  "scottish-fold": img("IFxjDdqK_0U"),
};

export function getBreedImage(slug: string): string | undefined {
  return breedImageMap[slug];
}
