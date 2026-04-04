import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ACM23 — Hanoi, Vietnam | October 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0D7377, #1A2332)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            color: "#C8A951",
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          The 23rd Annual Meeting
        </div>
        <div style={{ color: "white", fontSize: 72, fontWeight: 900, marginTop: 16 }}>
          ACM23
        </div>
        <div
          style={{ color: "rgba(255,255,255,0.8)", fontSize: 28, marginTop: 12 }}
        >
          Asian Consortium for Microbial Resources
        </div>
        <div
          style={{ color: "rgba(255,255,255,0.6)", fontSize: 22, marginTop: 24 }}
        >
          Hanoi, Vietnam · October 2026
        </div>
      </div>
    ),
    { ...size }
  );
}
