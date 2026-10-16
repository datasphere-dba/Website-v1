import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageSeo = {
  /** Page title. The root layout's template appends " | DataSphere". */
  title: string;
  description: string;
  /** Path from the site root, e.g. "/courses". Used for the canonical URL. */
  path: string;
};

/** Builds per-page metadata: title, description, canonical and Open Graph. */
export function buildMetadata({ title, description, path }: PageSeo): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website",
    },
  };
}
