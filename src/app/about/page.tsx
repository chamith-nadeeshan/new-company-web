import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Badge, Button, Section, Serif } from "@/components/ui";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The people, principles and process behind the products we build.",
};

const values = [
  {
    name: "Clarity",
    body: "Every screen earns its place. We strip away the noise until the next step is obvious and the interface disappears behind the task.",
  },
  {
    name: "Craft",
    body: "Pixels, motion and milliseconds all matter. We sweat the detail others skip, because quality is felt long before it is explained.",
  },
  {
    name: "Purpose",
    body: "Design is a means, not a trophy. We start from the outcome you need and work backwards to the smallest thing that delivers it.",
  },
  {
    name: "Momentum",
    body: "We ship in short, honest cycles. You see real progress every week instead of a reveal at the finish line.",
  },
  {
    name: "Performance",
    body: "Fast is a feature. We build for speed and stability from the first commit, so the product holds up when it finally meets the real world.",
  },
];

const stats = [
  { value: "60+", label: "Products shipped" },
  { value: "8 yrs", label: "Building for the web" },
  { value: "40+", label: "Teams partnered with" },
  { value: "98%", label: "Would work with us again" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <Section className="pt-36 md:pt-44">
          <Reveal>
            <Badge>About {siteConfig.name}</Badge>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-h1 text-balance sm:text-7xl md:text-[5.25rem]">
              A studio for teams who want it{" "}
              <Serif>done right</Serif>.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {siteConfig.name} is a small, senior team that designs and
              engineers digital products end to end. No handoffs between
              strangers, no filler — just the people doing the work, close to
              the decisions that shape it.
            </p>
          </Reveal>
        </Section>

        {/* Studio statement */}
        <Section className="!pt-0">
          <div className="grid gap-10 border-t border-line pt-16 md:grid-cols-[0.5fr_1fr] md:gap-16">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-dim">
                The studio
              </p>
            </Reveal>
            <div className="space-y-6">
              <Reveal>
                <p className="text-2xl font-medium leading-snug tracking-h3 text-balance sm:text-3xl">
                  We build the kind of software we would want to use —{" "}
                  <Serif>considered</Serif>, quick, and built to last past
                  launch day.
                </p>
              </Reveal>
              <Reveal delay={80}>
                <p className="text-base leading-relaxed text-muted sm:text-lg">
                  Most of our work starts where a previous build stalled: a
                  prototype that never scaled, a redesign that lost the plot, a
                  product that shipped but never found its footing. We come in,
                  map the real problem, and rebuild on foundations that can grow
                  with you.
                </p>
              </Reveal>
              <Reveal delay={140}>
                <p className="text-base leading-relaxed text-muted sm:text-lg">
                  The result is work you can measure — faster load times, higher
                  conversion, fewer support tickets — not just something that
                  photographs well in a case study.
                </p>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* Stats */}
        <Section className="!py-0">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="flex h-full flex-col gap-2 bg-elevated p-8 sm:p-10">
                  <span className="text-4xl font-semibold tracking-h2 sm:text-5xl">
                    {s.value}
                  </span>
                  <span className="text-sm text-muted">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Philosophy + founder */}
        <Section>
          <div className="grid gap-12 md:grid-cols-[1fr_0.8fr] md:gap-20">
            <div>
              <Reveal>
                <h2 className="text-4xl font-semibold leading-[1.05] tracking-h2 text-balance sm:text-5xl">
                  How we <Serif>think</Serif>
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                  Good products are not designed and then built — the two happen
                  together. A design decision that cannot be engineered well
                  isn&apos;t finished, and code that fights the user experience
                  isn&apos;t either. We keep both in the same room from day one.
                </p>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                  That closeness is only possible because we stay small on
                  purpose. Fewer people, more ownership, and a direct line to
                  whoever is actually making the thing.
                </p>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <figure className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-line bg-elevated p-8 sm:p-10">
                <blockquote className="text-xl font-medium leading-snug tracking-h3 text-balance sm:text-2xl">
                  &ldquo;We would rather ship one thing that genuinely moves the
                  needle than ten that just fill a roadmap.&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-4">
                  <span className="size-12 shrink-0 rounded-full bg-gradient-to-br from-blue-300 to-blue-700" />
                  <span>
                    <span className="block font-semibold">
                      The {siteConfig.name} team
                    </span>
                    <span className="block text-sm text-muted">
                      Design &amp; Engineering
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Section>

        {/* Values */}
        <Section className="!pt-0">
          <div className="border-t border-line pt-16">
            <Reveal>
              <h2 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-h2 text-balance sm:text-5xl">
                What we hold to
              </h2>
            </Reveal>
            <ul className="mt-12 flex flex-col">
              {values.map((v, i) => (
                <li key={v.name} className="border-t border-line last:border-b">
                  <Reveal>
                    <div className="group grid gap-4 py-8 transition-colors duration-300 md:grid-cols-[auto_0.5fr_1fr] md:items-baseline md:gap-10">
                      <span className="text-sm font-medium text-dim">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-2xl font-semibold tracking-h3 transition-colors group-hover:text-blue sm:text-[1.75rem]">
                        {v.name}
                      </h3>
                      <p className="max-w-xl text-base leading-relaxed text-muted">
                        {v.body}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* CTA */}
        <Section>
          <div className="flex flex-col items-center gap-10 rounded-3xl border border-line bg-[image:var(--wash)] px-6 py-20 text-center sm:py-28">
            <Reveal>
              <h2 className="text-5xl font-semibold leading-[0.98] tracking-h1 text-balance sm:text-7xl md:text-[5rem]">
                Build bold.
                <br />
                Ship <Serif>better</Serif>.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="max-w-xl text-lg leading-relaxed text-muted">
                Tell us what you&apos;re trying to build. We&apos;ll tell you how
                we&apos;d approach it — honestly, and for free.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button href="/#works">See our work</Button>
                <Button href="#contact" variant="ghost">
                  Get in touch
                </Button>
              </div>
            </Reveal>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
