import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllCourses } from "@/lib/courses";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/courses", "/blog", "/about", "/contact"];
  const courseRoutes = getAllCourses().map((course) => `/courses/${course.slug}`);

  return [...staticRoutes, ...courseRoutes].map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
  }));
}
