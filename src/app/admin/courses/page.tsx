import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Courses",
  description: "Manage courses, batches and fees.",
  path: "/admin/courses",
});

export default function AdminCoursesPage() {
  return (
    <>
      <SectionHeading as="h1" eyebrow="Admin" title="Courses" />
      <p className="mt-4 font-mono text-sm">
        TODO: build from the &quot;Admin&quot; artboard (courses, batches, fees).
      </p>
    </>
  );
}
