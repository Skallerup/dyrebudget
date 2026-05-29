// #6 — UTM attribution for all outgoing affiliate links
export function affiliateUrl(
  baseUrl: string,
  options: {
    campaign?: string;
    medium?: string;
  } = {}
): string {
  try {
    const url = new URL(baseUrl);
    url.searchParams.set("utm_source", "dyrebudget");
    url.searchParams.set("utm_medium", options.medium || "affiliate");
    if (options.campaign) {
      url.searchParams.set("utm_campaign", options.campaign);
    }
    return url.toString();
  } catch {
    return baseUrl;
  }
}
