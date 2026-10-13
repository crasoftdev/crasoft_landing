import type { Metadata } from "next";
import type { ItemList, Organization, WebSite, WithContext } from "schema-dts";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

const absolute = (path: string) => new URL(path, site.url).toString();

// Per-page metadata: unique title and description, canonical URL and OG fields.
// `path` is the route, e.g. "/" or "/about".
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
    twitter: { title, description },
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
    // TODO(content): add `address` (PostalAddress) once the US address is set in lib/site.ts.
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
