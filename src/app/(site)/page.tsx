import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { ProgramsSection } from "@/components/sections/home/ProgramsSection";
import { LearningModesSection } from "@/components/sections/home/LearningModesSection";
import { HomeMentorSection } from "@/components/sections/home/HomeMentorSection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { LeadEnquirySection } from "@/components/sections/home/LeadEnquirySection";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Database and DBA training",
    description:
      "Live, hands-on administration courses in PostgreSQL, MongoDB and AWS cloud databases taught by Mohan Kumar S. in Bengaluru and online.",
    path: "/",
  }),
  title: { absolute: "DataSphere | Database and DBA training" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProgramsSection />
      <LearningModesSection />
      <HomeMentorSection />
      <TestimonialsSection />
      <LeadEnquirySection />
    </>
  );
}
