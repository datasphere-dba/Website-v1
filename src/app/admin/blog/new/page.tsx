import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "New blog post",
  description: "Write a new blog post or paste one as Markdown.",
  path: "/admin/blog/new",
});

export default function AdminNewBlogPostPage() {
  return (
    <>
      <SectionHeading as="h1" eyebrow="Admin" title="New blog post" />
      <p className="mt-4 font-mono text-sm">
        TODO: build from the &quot;AdminBlog&quot; and &quot;AdminBlogMd&quot; artboards.
      </p>
      <ul className="mt-4 list-disc pl-5 text-sm">
        <li>Mode 1: form editor (title, slug, excerpt, related course, body).</li>
        <li>Mode 2: paste the whole post as Markdown (with frontmatter).</li>
      </ul>
    </>
  );
}
