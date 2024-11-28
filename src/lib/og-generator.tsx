import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

// Image generation
export async function GenerateImage(params: {
  title: string;
  description?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 160,
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <span style={{ fontWeight: 600 }}>{params.title}</span>
          <span style={{ fontSize: 40, fontWeight: 300 }}>
            {params.description}
          </span>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
