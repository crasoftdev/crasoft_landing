import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ogAlt, ogSize } from "@/lib/seo";
import { site } from "@/lib/site";

// The social share card (Open Graph and X), rendered to a PNG at build time by
// app/opengraph-image.tsx and app/twitter-image.tsx. Crasoft only: the logo, the
// hero headline and the company facts. It names no product.

export { ogAlt, ogSize };

// Satori can't read the site's .woff2 files, so static TTF copies live in app/fonts/og.
// Hex values match the @theme tokens in app/globals.css (the renderer can't read CSS).
const color = {
  surface: "#f7f3ee",
  card: "#ffffff",
  ink: "#2a2a22",
  muted: "#5e5a4f",
  brand: "#97785c",
  brandStrong: "#7c5f45",
  ring: "#e1d7ca",
  sand: "#e8d3bd",
};

// Fixed paths, so the build traces only these files and not the whole project.
const dataUrl = async (data: Promise<Buffer>, type: string) =>
  `data:${type};base64,${(await data).toString("base64")}`;

const assets = Promise.all([
  readFile(join(process.cwd(), "app/fonts/og/outfit-600.ttf")),
  readFile(join(process.cwd(), "app/fonts/og/figtree-500.ttf")),
  dataUrl(readFile(join(process.cwd(), "public/crasoft-logo.png")), "image/png"),
  dataUrl(readFile(join(process.cwd(), "public/logo_icon.svg")), "image/svg+xml"),
]);

export async function renderOgImage() {
  const [outfit, figtree, logo, gear] = await assets;
  const facts = [site.type, `Founded in ${site.foundingYear}`, site.country];

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          background: color.surface,
          fontFamily: "Figtree",
        }}
      >
        {/* Warm glow and orbit rings on the right, echoing the hero. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: ogSize.width,
            height: ogSize.height,
            backgroundImage: `radial-gradient(circle at 86% 50%, ${color.sand} 0%, rgba(232,211,189,0) 42%)`,
          }}
        />
        {[560, 380].map((d) => (
          <div
            key={d}
            style={{
              position: "absolute",
              top: 315 - d / 2,
              left: 1030 - d / 2,
              width: d,
              height: d,
              borderRadius: 9999,
              border: `2px solid ${color.ring}`,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            top: 315 - 100,
            left: 1030 - 100,
            width: 200,
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 9999,
            background: color.card,
            border: `2px solid ${color.ring}`,
            boxShadow: "0 30px 60px -24px rgba(151,120,92,0.55)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> */}
          <img src={gear} width={128} height={128} alt="" />
        </div>

        {/* Text column. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 760,
            padding: "64px 0 60px 72px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> */}
          <img src={logo} width={330} height={110} alt="" style={{ marginLeft: -8 }} />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "Outfit",
                width: 560,
                fontSize: 68,
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                color: color.ink,
              }}
            >
              {site.headline}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginTop: 28,
                fontSize: 26,
                color: color.muted,
              }}
            >
              {facts.map((fact, i) => (
                <div key={fact} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  {i > 0 && (
                    <div style={{ width: 6, height: 6, borderRadius: 9999, background: color.brand }} />
                  )}
                  {fact}
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: 24, color: color.brandStrong }}>
            {new URL(site.url).host}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Outfit", data: outfit, weight: 600, style: "normal" },
        { name: "Figtree", data: figtree, weight: 500, style: "normal" },
      ],
    },
  );
}
