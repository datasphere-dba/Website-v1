import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

// Prerender one page per known post at build time.
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <Container className="py-16">
      <SectionHeading as="h1" eyebrow="Blog" title={post.title} />
      <p className="mt-2 font-mono text-xs">{post.date}</p>
      <p className="mt-4 max-w-prose">{post.excerpt}</p>
      <p className="mt-4 font-mono text-sm">
        TODO: build from the &quot;BlogPost&quot; artboard (Markdown body, related course,
        enquiry form).
      </p>
      {post.relatedCourse && (
        <Link href={`/courses/${post.relatedCourse}`} className="mt-6 inline-block text-green">
          Related course
        </Link>
      )}
    </Container>
  );
}
