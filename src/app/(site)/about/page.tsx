import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { AboutHeroSection } from "@/components/sections/about/AboutHeroSection";
import { AboutMentorSection } from "@/components/sections/about/AboutMentorSection";
import { TeachingRulesSection } from "@/components/sections/about/TeachingRulesSection";
import { CompanySection } from "@/components/sections/about/CompanySection";
import { AboutCtaSection } from "@/components/sections/about/AboutCtaSection";

export const metadata: Metadata = buildMetadata({
  title: "About us",
  description:
    "DataSphere trains working DBAs to handle hybrid, NoSQL and cloud databases. One mentor per batch, live practicals, and a curriculum built for the DBA role.",
  path: "/about",
});

// All sections are server components — no "use client" needed here.
export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <AboutMentorSection />
      <TeachingRulesSection />
      <CompanySection />
      <AboutCtaSection />
    </>
  );
}
