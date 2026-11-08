import Image from "next/image";
import type { CaseStudy, Service } from "@/data/content";
import { asset } from "@/lib/asset";
import { Reveal } from "@/components/Reveal";
import { Arrow, Section } from "@/components/ui";

// Service detail page, matching the Visuvate service-page layout in our tokens:
// a back pill + oversized hero, a two-column block (lead copy | "What's included"
// card), then recent work, a secondary CTA / next service, and related services.
// Background (black + orange light streaks) is applied by the route.
export function ServiceDetail({
  service,
  recentWork,
  related,
}: {
  service: Service;
  recentWork: CaseStudy[];
  related: Service[];
}) {
  const [lead, ...rest] = service.intro;

  return (
    <>
      {/* Hero */}
      <Section className="pt-32 md:pt-36">
        <Reveal>
          <a
            href="/services"
            className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg/50 py-2 pl-3 pr-4 text-sm font-medium backdrop-blur transition-colors hover:border-fg/40"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
              className="transition-transform duration-300 ease-brand group-hover:-translate-x-0.5"
            >
              <path
                d="M10 3L5 8l5 5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            All services
          </a>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-10 text-[clamp(3rem,12vw,10rem)] font-semibold leading-[0.9] tracking-h1 text-balance">
            {service.title}
          </h1>
        </Reveal>

        {/* Lead copy | What's included card */}
        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <Reveal>
              <p className="text-2xl font-medium leading-snug tracking-h3 text-balance sm:text-[1.75rem]">
                {lead}
              </p>
            </Reveal>
            {rest.map((para, i) => (
              <Reveal key={i} delay={80 + i * 80}>
                <p className="text-base leading-relaxed text-muted sm:text-lg">{para}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="rounded-3xl border border-line-strong bg-elevated/60 p-8 backdrop-blur-sm sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-dim">
                What&apos;s included
              </p>
              <ul className="mt-7 flex flex-col gap-4">
                {service.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base sm:text-[1.0625rem]">
                    <BlueCheck />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-9 flex w-full items-center justify-center rounded-full bg-btn px-6 py-4 text-[0.95rem] font-medium text-btn-ink transition-opacity duration-200 hover:opacity-90"
              >
                Start a project
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Recent work */}
      {recentWork.length > 0 && (
        <Section className="!pt-0">
          <div className="border-t border-line pt-16">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-h2 sm:text-4xl">Recent work</h2>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentWork.map((study, i) => (
                <Reveal key={study.slug} delay={(i % 3) * 80}>
                  <a
                    href={`/works/${study.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-elevated transition-all duration-300 ease-brand hover:-translate-y-1 hover:border-blue/40"
                  >
                    <span className="relative block aspect-[16/11] overflow-hidden bg-surface">
                      <Image
                        src={asset(study.cover)}
                        alt={study.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-brand group-hover:scale-105"
                      />
                    </span>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-semibold tracking-h3 transition-colors duration-300 group-hover:text-blue">
                        {study.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted">{study.category}</p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Related services */}
      <Section className="!pt-0">
        <div className="border-t border-line pt-16">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-h2 sm:text-4xl">Related services</h2>
          </Reveal>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={(i % 3) * 60}>
                <li>
                  <a
                    href={`/services/${r.slug}`}
                    className="group flex items-center justify-between gap-6 py-5 transition-colors"
                  >
                    <span>
                      <span className="block text-lg font-semibold tracking-h3 transition-colors duration-300 group-hover:text-blue sm:text-xl">
                        {r.title}
                      </span>
                      <span className="mt-1 block text-sm text-muted">{r.body}</span>
                    </span>
                    <Arrow className="shrink-0 text-muted transition-transform duration-300 ease-brand group-hover:translate-x-1 group-hover:text-fg" />
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}

// Brand-accent check (the site's `--color-blue` token is the brand orange — the
// same blue→orange adaptation used across the Visuvate-inspired sections).
function BlueCheck() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="mt-1 shrink-0 text-blue"
    >
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
