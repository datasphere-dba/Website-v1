import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About us",
  description: "About DataSphere Edu Solutions, a Bengaluru database and DBA training company.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="py-16">
      <SectionHeading as="h1" eyebrow="About" title="About us" />
      <p className="mt-4 font-mono text-sm">TODO: build from the &quot;About&quot; artboard.</p>
    </Container>
  );
}
