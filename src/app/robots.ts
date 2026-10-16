import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// The site must be indexable (the old WordPress site was noindex).
// /admin is kept out of search results with a noindex meta tag in its layout.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
  };
}
