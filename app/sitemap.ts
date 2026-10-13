import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Every public route. Add inner pages here as they ship.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
