import type { Metadata } from "next";
import { Figtree, JetBrains_Mono, Outfit } from "next/font/google";
import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

// Brand fonts from the Claude Design: Outfit for headings, Figtree for body text,
// JetBrains Mono for small uppercase labels.
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
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
