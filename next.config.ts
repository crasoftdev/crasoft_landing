import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Keep preview URLs (*.vercel.app) out of search results. Only the real
        // domain is indexable, so this switches off by itself once it is attached.
        source: "/:path*",
        missing: [{ type: "host", value: "crasoftinc.com" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
