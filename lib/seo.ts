import type { Metadata } from "next";
import type {
  BreadcrumbList,
  FAQPage,
  ItemList,
  Organization,
  WebSite,
  WithContext,
} from "schema-dts";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

const absolute = (path: string) => new URL(path, site.url).toString();

// The share card drawn by lib/og-image.tsx and served at /opengraph-image and
// /twitter-image. Crasoft only.
export const ogSize = { width: 1200, height: 630 };
export const ogAlt = `${site.name} logo and the line “${site.headline}”`;
const shareImage = (path: string) => ({ url: path, ...ogSize, alt: ogAlt, type: "image/png" });

// Next merges metadata shallowly: a page's `openGraph` or `twitter` replaces the
// layout's whole object, inherited share image included. So these shared fields
// are sent again on every page.
export const openGraphBase = {
  type: "website",
  siteName: site.name,
  locale: "en_US",
  images: [shareImage("/opengraph-image")],
};
export const twitterBase = {
  card: "summary_large_image" as const,
  images: [shareImage("/twitter-image")],
};

// Per-page metadata: unique title and description, canonical URL and OG fields.
// `path` is the route, e.g. "/" or "/about". `absoluteTitle` skips the
// "%s | Crasoft" template, for titles that already start with the name.
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { ...openGraphBase, title, description, url: path },
    twitter: { ...twitterBase, title, description },
  };
}

export function organizationSchema(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    url: site.url,
    logo: absolute(site.logo),
    slogan: site.slogan,
    description: site.description,
    foundingDate: String(site.foundingYear),
    email: site.email,
    // TODO(content): add the street address, city, state and ZIP once they are set in lib/site.ts.
    address: { "@type": "PostalAddress", addressCountry: site.countryCode },
    // What the Services section says we do.
    knowsAbout: [
      "Custom software development",
      "Web application development",
      "Mobile app development",
      "Software product design",
    ],
    ...(site.sameAs.length > 0 && { sameAs: [...site.sameAs] }),
  };
}

export function websiteSchema(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    url: site.url,
    inLanguage: "en-US",
    publisher: { "@id": ORG_ID },
  };
}

// Home: the products as SoftwareApplication. No offers and no ratings.
export function productsSchema(): WithContext<ItemList> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} products`,
    itemListElement: products.map((product, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: product.name,
        description: product.line,
        applicationCategory: product.applicationCategory,
        ...(product.url && { url: product.url }),
        publisher: { "@id": ORG_ID },
      },
    })),
  };
}

// Home FAQ, from the same list the page renders.
export function faqSchema(faqs: readonly { q: string; a: string }[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

// Inner pages: Home → Page.
export function breadcrumbSchema(name: string, path: string): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name, item: absolute(path) },
    ],
  };
}
