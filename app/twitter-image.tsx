import { ogAlt, ogSize, renderOgImage } from "@/lib/og-image";

// The same share image for X, which reads twitter:image first.
export const alt = ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage();
}
