import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WorksIndex } from "@/components/works/WorksIndex";
import { caseStudies } from "@/data/content";

export const metadata: Metadata = {
  title: "Works",
  description: "Selected projects — websites, web apps and brands we've built.",
  alternates: { canonical: "/works/" },
};

export default function WorksPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <WorksIndex studies={caseStudies} />
      </main>
      <Footer />
    </>
  );
}
