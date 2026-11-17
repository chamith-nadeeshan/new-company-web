import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { blogPosts } from "@/data/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on design, performance and building the web — straight from the studio.",
  alternates: { canonical: "/blog/" },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <BlogIndex posts={blogPosts} />
      </main>
      <Footer />
    </>
  );
}
