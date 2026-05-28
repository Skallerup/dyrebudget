import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DyreBudget.dk — Hvad koster dit kæledyr egentlig?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f172a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "#34d399",
            marginBottom: 24,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          DYREBUDGET.DK
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: 32,
            maxWidth: 800,
          }}
        >
          Hvad koster dit kæledyr egentlig?
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#94a3b8",
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          Beregn månedspris, livstidspris og sammenlign 51 racer i Danmark
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
            display: "flex",
            gap: 24,
          }}
        >
          {["🐕 Hund", "🐈 Kat", "📊 Beregner"].map((label) => (
            <div
              key={label}
              style={{
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: 12,
                padding: "12px 20px",
                color: "#e2e8f0",
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
