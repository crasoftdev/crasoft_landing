import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Everything is open, AI crawlers included: we want to be found and cited.
const AI_CRAWLERS = ["GPTBot", "OAI-SearchBot", "ClaudeBot", "PerplexityBot", "Google-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
