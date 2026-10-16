import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Dashboard",
    description: "DataSphere admin dashboard.",
    path: "/admin",
  }),
  // The admin layout's title template only applies to child segments, not this page.
  title: { absolute: "Dashboard | Admin | DataSphere" },
};

export default function AdminDashboardPage() {
  return (
    <>
      <SectionHeading as="h1" eyebrow="Admin" title="Dashboard" />
      <p className="mt-4 font-mono text-sm">TODO: build from the &quot;Admin&quot; artboard.</p>
    </>
  );
}
