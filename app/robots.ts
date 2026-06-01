import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Allow crawling of the whole site except the noindex search page and API
 * routes; point crawlers at the sitemap on the apex domain.
 */
export default function robots(): MetadataRoute.Robots {
  const base = SITE.url.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/search", "/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
