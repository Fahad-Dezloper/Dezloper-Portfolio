import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Fahad Khan - Design Engineer";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#100f0f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, sans-serif",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            border: "1px solid rgba(206, 205, 195, 0.2)",
            borderRadius: "40px",
            padding: "80px 120px",
            background: "rgba(255, 255, 255, 0.02)",
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: "#fffcf0",
              letterSpacing: "-0.05em",
              margin: 0,
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            Fahad Khan
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: "#cecdc3",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Design Engineer & Builder
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
