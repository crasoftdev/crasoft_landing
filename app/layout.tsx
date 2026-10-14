import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

// Brand fonts from the Claude Design: Outfit for headings, Figtree for body text,
// JetBrains Mono for small uppercase labels. The Latin variable files from Google
// Fonts live in app/fonts, so the build never fetches fonts over the network.
const outfit = localFont({
  src: "./fonts/outfit-latin.woff2",
  variable: "--font-outfit",
  weight: "500 600",
});

const figtree = localFont({
  src: "./fonts/figtree-latin.woff2",
  variable: "--font-figtree",
  weight: "300 900",
});

const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono-latin.woff2",
  variable: "--font-jetbrains-mono",
  weight: "400 500",
  fallback: ["ui-monospace", "monospace"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.slogan}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  appleWebApp: { title: site.name },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
  },
  // TODO(content): app/opengraph-image.png (1200×630, logo + slogan), then switch
  // to "summary_large_image".
  twitter: { card: "summary" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${figtree.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-ink px-5 py-3 font-semibold text-surface focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
