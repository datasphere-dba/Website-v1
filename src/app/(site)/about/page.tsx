import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { MentorSection } from "@/components/sections/about/MentorSection";
import { TeachingRules } from "@/components/sections/about/TeachingRules";
import { CompanySection } from "@/components/sections/about/CompanySection";
import { AboutCTA } from "@/components/sections/about/AboutCTA";

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
      <AboutHero />
      <MentorSection />
      <TeachingRules />
      <CompanySection />
      <AboutCTA />
    </>
  );
}
