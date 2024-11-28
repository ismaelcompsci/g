import { getURL } from "next/dist/shared/lib/utils";
import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

// Image generation
export async function GenerateImage() {
  const url = getURL();
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          fontWeight: 600,
          color: "white",
          gap: 24,
        }}
      >
        <img src={url + "/og.png"} width={254} />

        <span
          style={{
            fontSize: 24,
          }}
        >
          Gesit Book PNG Generator
        </span>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
