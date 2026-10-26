import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuroraStreaks } from "@/components/AuroraStreaks";
import { Reveal } from "@/components/Reveal";
import { ServiceScene } from "@/components/ServiceScenes";
import { Badge, Section, Serif } from "@/components/ui";
import { services } from "@/data/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Design and engineering disciplines we bring to every product — applied only where the work actually needs them.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="relative isolate flex-1 bg-black">
        {/* Flowing orange light-streak background (brand take on Visuvate).
            Fixed + viewport-sized for performance; blurred for the glow. */}
        <AuroraStreaks className="pointer-events-none fixed inset-0 -z-10 blur-[7px]" />
        {/* Hero */}
        <Section className="pt-36 md:pt-44">
          <Reveal>
            <Badge>What we do</Badge>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-h1 text-balance sm:text-7xl md:text-[5.25rem]">
              Ten disciplines, <Serif>one</Serif> studio.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              Every engagement draws on whichever of these the work actually
              needs — nothing bolted on to pad an invoice. Pick a single service
              or hand us the whole product; either way the same senior team ships
              it.
            </p>
          </Reveal>
        </Section>

        {/* Services grid */}
        <Section className="!pt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 80}>
                <a
                  href="#contact"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-elevated transition-all duration-300 ease-brand hover:-translate-y-1 hover:border-blue/40 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]"
                >
                  {/* Animated faux-UI scene on a dotted brand-yellow stage
                      (brand take on visuvate.com/services). One scene per service,
                      mapped by index in ServiceScenes. */}
                  <div
                    className="relative shrink-0 overflow-hidden"
                    style={{ height: 232 }}
                  >
                    <ServiceScene i={i} />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-xl font-semibold tracking-h3 transition-colors duration-300 group-hover:text-blue sm:text-[1.375rem]">
                      {s.title}
                    </h2>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                      {s.body}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-blue">
                      Explore
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path
                          d="M3 11L11 3M11 3H4.5M11 3V9.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </Section>

      </main>
      <Footer />
    </>
  );
}
