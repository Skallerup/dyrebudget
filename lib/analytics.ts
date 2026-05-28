"use client";

type EventName =
  | "calculator_started"
  | "calculator_completed"
  | "affiliate_click"
  | "product_view"
  | "email_capture"
  | "comparison_view"
  | "quiz_started"
  | "quiz_completed";

interface EventPayload {
  breedId?: string;
  breedName?: string;
  petType?: string;
  budgetLevel?: string;
  monthlyCost?: number;
  productId?: string;
  productName?: string;
  affiliatePartner?: string;
  email?: string;
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(name: EventName, payload?: EventPayload) {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", name, payload);
    return;
  }

  if (typeof window !== "undefined" && (window as unknown as { posthog?: { capture: (n: string, p?: EventPayload) => void } }).posthog) {
    const ph = (window as unknown as { posthog: { capture: (n: string, p?: EventPayload) => void } }).posthog;
    ph.capture(name, payload);
  }
}
