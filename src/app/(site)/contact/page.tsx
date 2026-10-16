import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Call, email or visit DataSphere in Bengaluru, or send us an enquiry about a course.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="py-16">
      <SectionHeading as="h1" eyebrow="Contact" title="Contact us" />
      <p className="mt-4">
        <a href={siteConfig.phoneHref} className="hover:text-green">
          {siteConfig.phone}
        </a>
        {" · "}
        <a href={`mailto:${siteConfig.email}`} className="hover:text-green">
          {siteConfig.email}
        </a>
      </p>
      <p className="mt-4 font-mono text-sm">
        TODO: build from the &quot;Contact&quot; artboard (enquiry form → /api/leads).
      </p>
    </Container>
  );
}
