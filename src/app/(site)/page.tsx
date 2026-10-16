import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Database and DBA training",
    description:
      "Oracle, MySQL, PostgreSQL and MongoDB DBA training in Bengaluru and online, with live batches and mentor support.",
    path: "/",
  }),
  // The home page uses the plain default title, without the " | DataSphere" template.
  title: { absolute: "DataSphere | Database and DBA training" },
};

export default function HomePage() {
  return (
    <Container className="py-16">
      <SectionHeading as="h1" eyebrow="Home" title="Home" />
      <p className="mt-4 font-mono text-sm">
        TODO: build from the &quot;Main&quot; and &quot;HomeMobile&quot; artboards.
      </p>
    </Container>
  );
}
