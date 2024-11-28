import { GenerateImage } from "@/lib/og-generator";

export const runtime = "edge";

export const alt = "Book";
export const contentType = "image/png";

export const size = {
  width: 1200,
  height: 630,
};

// Image generation
export default async function Image() {
  return await GenerateImage({
    title: "Geist Book",
    description: "Book PNG Generator",
  });
}
