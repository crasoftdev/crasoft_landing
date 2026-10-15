import { ogAlt, ogSize, renderOgImage } from "@/lib/og-image";

// The share image for every page (Facebook, LinkedIn, Slack, iMessage, ...).
export const alt = ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage();
}
