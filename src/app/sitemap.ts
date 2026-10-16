import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Static routes only for now.
// TODO: add /courses/[slug] and /blog/[slug] once real content is in.
const staticRoutes = ["/", "/courses", "/blog", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
  }));
}
