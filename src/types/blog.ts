// Blog post frontmatter. The Markdown body is not parsed yet;
// rendering comes with the blog importer.

export type BlogPost = {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  excerpt: string;
  /** Slug of the course this post links to, if any. */
  relatedCourse?: string;
};
