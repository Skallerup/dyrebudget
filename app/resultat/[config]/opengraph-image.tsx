import { ImageResponse } from "next/og";
import { decodeShareConfig } from "@/lib/shareConfig";
import { breeds } from "@/data/breeds";
import { calculatePetCost, formatCurrency } from "@/lib/calculator";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ResultOgImage({
  params,
}: {
  params: Promise<{ config: string }>;
}) {
  const { config } = await params;
  const inputs = decodeShareConfig(config);
  const breed = inputs ? breeds.find((b) => b.id === inputs.breedId) : undefined;

  if (!inputs || !breed) {
    return new ImageResponse(
      (
        <div style={{ background: "#0f172a", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ color: "#ffffff", fontSize: 48, fontWeight: 700 }}>DyreBudget.dk</div>
        </div>
      ),
      { ...size }
    );
  }

  const result = calculatePetCost(breed, inputs);

  return new ImageResponse(
    (
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
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ color: "#34d399", fontSize: 16, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>
            DYREBUDGET.DK
          </div>
          <div style={{ color: "#334155", fontSize: 16 }}>·</div>
          <div style={{ color: "#64748b", fontSize: 16 }}>Mit beregningsresultat</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ color: "#94a3b8", fontSize: 22, fontWeight: 500 }}>En {breed.name} koster mig</div>
          <div style={{ color: "#ffffff", fontSize: 96, fontWeight: 700, lineHeight: 1.0 }}>
            {formatCurrency(result.monthlyCost)}
            <span style={{ color: "#64748b", fontSize: 40, fontWeight: 500 }}> /md.</span>
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 16 }}>
            <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 14, padding: "16px 28px", display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ color: "#64748b", fontSize: 14 }}>Første år</div>
              <div style={{ color: "#ffffff", fontSize: 36, fontWeight: 700 }}>{formatCurrency(result.firstYearCost)}</div>
            </div>
            <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 14, padding: "16px 28px", display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ color: "#64748b", fontSize: 14 }}>Over et helt liv</div>
              <div style={{ color: "#34d399", fontSize: 36, fontWeight: 700 }}>{formatCurrency(result.lifetimeCost)}</div>
            </div>
          </div>
        </div>

        <div style={{ color: "#475569", fontSize: 18 }}>
          Beregn din egen kæledyrsøkonomi gratis · dyrebudget.dk
        </div>
      </div>
    ),
    { ...size }
  );
}
