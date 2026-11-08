import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/ui";

// Shared shell for the legal pages (/privacy, /terms). Matches the About page
// layout: Navbar → Section hero → Footer. Content is passed as LegalSection
// children.
export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Section className="pt-36 md:pt-44">
          <Reveal>
            <h1 className="text-4xl font-semibold leading-[1.02] tracking-h1 sm:text-5xl md:text-6xl">
              {title}
            </h1>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-5 text-sm text-dim">Last updated: {updated}</p>
          </Reveal>
          {intro && (
            <Reveal delay={120}>
              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted">{intro}</p>
            </Reveal>
          )}
          <Reveal delay={160}>
            <div className="mt-12 max-w-3xl space-y-10 border-t border-line pt-12">
              {children}
            </div>
          </Reveal>
        </Section>
      </main>
      <Footer />
    </>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold tracking-h3 sm:text-2xl">{heading}</h2>
      <div className="space-y-3 text-base leading-relaxed text-muted">{children}</div>
    </section>
  );
}
