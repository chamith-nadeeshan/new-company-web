import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CaseStudyView } from "@/components/works/CaseStudyView";
import { caseStudies } from "@/data/content";

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.overview,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = caseStudies.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();

  const study = caseStudies[index];
  // Up to three other projects, starting after the current one, wrapping around.
  const related = Array.from({ length: caseStudies.length - 1 }, (_, i) =>
    caseStudies[(index + 1 + i) % caseStudies.length],
  ).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <CaseStudyView study={study} related={related} />
      </main>
      <Footer />
    </>
  );
}
