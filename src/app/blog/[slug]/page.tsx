import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostView } from "@/components/blog/BlogPostView";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { siteConfig } from "@/config/site";
import { blogPosts } from "@/data/content";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      title: `${post.title} | ${siteConfig.name}`,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${post.slug}/`,
      type: "article",
      publishedTime: post.dateISO,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = blogPosts.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const post = blogPosts[index];
  // Up to three other posts, starting after the current one, wrapping around.
  const related = Array.from({ length: blogPosts.length - 1 }, (_, i) =>
    blogPosts[(index + 1 + i) % blogPosts.length],
  ).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <BlogPostView post={post} related={related} />
      </main>
      <Footer />
    </>
  );
}
