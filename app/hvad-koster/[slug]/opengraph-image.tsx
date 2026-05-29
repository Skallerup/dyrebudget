import { ImageResponse } from "next/og";
import { getBreedBySlug } from "@/data/breeds";
import { calculatePetCost, formatCurrency } from "@/lib/calculator";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function BreedOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const breed = getBreedBySlug(slug);

  if (!breed) {
    return new ImageResponse(
      <div style={{ background: "#0f172a", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#ffffff", fontSize: 48, fontWeight: 700 }}>DyreBudget.dk</div>
      </div>,
      { ...size }
    );
  }

  const result = calculatePetCost(breed, {
    petType: breed.petType,
    breedId: breed.id,
    ageYears: 2,
    budgetLevel: "medium",
    activityLevel: "medium",
    hasInsurance: true,
    housingType: "house",
    groomingLevel: "mixed",
  });

  const healthColor = breed.healthRisk === "low" ? "#22c55e" : breed.healthRisk === "medium" ? "#f59e0b" : "#ef4444";
  const healthLabel = breed.healthRisk === "low" ? "Lav sundhedsrisiko" : breed.healthRisk === "medium" ? "Middel sundhedsrisiko" : "Høj sundhedsrisiko";

  return new ImageResponse(
    <div
      style={{
        background: "#0f172a",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "72px 80px",
        justifyContent: "space-between",
      }}
    >
      {/* Top: site name */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ color: "#34d399", fontSize: 16, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>
          DYREBUDGET.DK
        </div>
        <div style={{ color: "#334155", fontSize: 16 }}>·</div>
        <div style={{ color: "#64748b", fontSize: 16 }}>{breed.petType === "dog" ? "Hund" : "Kat"}</div>
      </div>

      {/* Center: breed name + cost */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ color: "#94a3b8", fontSize: 22, fontWeight: 500 }}>Hvad koster en</div>
        <div style={{ color: "#ffffff", fontSize: 80, fontWeight: 700, lineHeight: 1.05 }}>
          {breed.name}?
        </div>
        <div style={{ display: "flex", gap: 24, marginTop: 8 }}>
          <div
            style={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: 14,
              padding: "16px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div style={{ color: "#64748b", fontSize: 14 }}>Per måned</div>
            <div style={{ color: "#ffffff", fontSize: 36, fontWeight: 700 }}>{formatCurrency(result.monthlyCost)}</div>
          </div>
          <div
            style={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: 14,
              padding: "16px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div style={{ color: "#64748b", fontSize: 14 }}>Første år</div>
            <div style={{ color: "#ffffff", fontSize: 36, fontWeight: 700 }}>{formatCurrency(result.firstYearCost)}</div>
          </div>
          <div
            style={{
              background: "#1e293b",
              border: `1px solid ${healthColor}40`,
              borderRadius: 14,
              padding: "16px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div style={{ color: "#64748b", fontSize: 14 }}>Sundhed</div>
            <div style={{ color: healthColor, fontSize: 22, fontWeight: 700 }}>{healthLabel}</div>
          </div>
        </div>
      </div>

      {/* Bottom: cta */}
      <div style={{ color: "#475569", fontSize: 18 }}>
        dyrebudget.dk/hvad-koster/{slug} · Gratis beregner · Danske priser 2026
      </div>
    </div>,
    { ...size }
  );
}
