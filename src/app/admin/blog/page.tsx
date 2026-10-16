import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog posts",
  description: "Manage blog posts.",
  path: "/admin/blog",
});

export default function AdminBlogPage() {
  return (
    <>
      <SectionHeading as="h1" eyebrow="Admin" title="Blog posts" />
      <p className="mt-4 font-mono text-sm">TODO: build from the &quot;AdminBlog&quot; artboard.</p>
      <Button href="/admin/blog/new" className="mt-6">
        New post
      </Button>
    </>
  );
}
