import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Rendered for unknown URLs and when a page calls notFound().
// Next.js adds <meta name="robots" content="noindex"> and a 404 status itself.
export default function NotFound() {
  return (
    <main className="flex-1">
      <Container className="py-24">
        <SectionHeading as="h1" eyebrow="404" title="Page not found" />
        <p className="mt-4">The page you were looking for doesn&apos;t exist or has moved.</p>
        <Link href="/" className="mt-6 inline-block text-green hover:text-ink">
          Go to the home page
        </Link>
      </Container>
    </main>
  );
}
