import type { MetadataRoute } from "next";
import { legalEffectiveDate, legalLinks, site } from "@/lib/site";

// Every public route. Add inner pages here as they ship.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...legalLinks.map((link) => ({
      url: `${site.url}${link.href}`,
      lastModified: new Date(legalEffectiveDate),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
