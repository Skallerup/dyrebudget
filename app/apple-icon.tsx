import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Paw mark (mint) — same shape as app/icon.svg, rendered onto a navy rounded tile.
const paw = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 64 64"><g fill="#14b8a6"><ellipse cx="19" cy="25" rx="5" ry="6.5"/><ellipse cx="29.5" cy="19" rx="5" ry="7"/><ellipse cx="40.5" cy="19" rx="5" ry="7"/><ellipse cx="51" cy="25" rx="5" ry="6.5"/><path d="M35 30c8.5 0 15 6.2 15 13.6 0 6.6-6.1 9.4-15 9.4s-15-2.8-15-9.4C20 36.2 26.5 30 35 30z"/></g></svg>`;

export default function AppleIcon() {
  const src = `data:image/svg+xml;base64,${Buffer.from(paw).toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={120} height={120} alt="" />
      </div>
    ),
    { ...size }
  );
}
