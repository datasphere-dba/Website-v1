import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Articles on Oracle, MySQL, PostgreSQL, MongoDB and database administration careers.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Container className="py-16">
      <SectionHeading as="h1" eyebrow="Blog" title="Blog" />
      <p className="mt-4 font-mono text-sm">TODO: build from the &quot;Blog&quot; artboard.</p>

      <ul className="mt-8 divide-y divide-ink/20 border-t-hairline border-b-hairline border-ink/20">
        {posts.map((post) => (
          <li key={post.slug} className="py-3">
            <Link href={`/blog/${post.slug}`} className="hover:text-green">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
