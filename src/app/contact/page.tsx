import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { Badge, Section, Serif } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { services } from "@/data/content";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Tell ${siteConfig.name} about your project — websites, web apps, mobile apps and Microsoft 365 solutions. We reply within one business day.`,
  alternates: { canonical: "/contact/" },
};

const channels = [
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  {
    label: "WhatsApp",
    value: siteConfig.whatsapp.display,
    href: `https://wa.me/${siteConfig.whatsapp.number}`,
    external: true,
  },
  { label: "Studio", value: siteConfig.location },
];

const steps = [
  { n: "01", title: "We reply", body: "Within one business day, with a few questions about your goals." },
  { n: "02", title: "Discovery call", body: "A 30-minute call to understand scope, timeline and budget." },
  { n: "03", title: "Proposal", body: "A clear plan with milestones and a fixed estimate — no surprises." },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Section className="relative pt-36 md:pt-44">
          <div
            aria-hidden
            className="aurora pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]"
          />
          <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <div>
              <Reveal>
                <Badge>Contact</Badge>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-6 text-5xl font-semibold leading-[0.98] tracking-h1 sm:text-6xl md:text-7xl">
                  Let&apos;s build <Serif>something</Serif> great.
                </h1>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                  Share a few details about your project and we&apos;ll get back to you within one
                  business day.
                </p>
              </Reveal>

              <Reveal delay={160}>
                <ul className="mt-12 divide-y divide-line border-y border-line">
                  {channels.map((c) => (
                    <li key={c.label} className="flex items-baseline justify-between gap-6 py-5">
                      <span className="text-sm text-dim">{c.label}</span>
                      {c.href ? (
                        <a
                          href={c.href}
                          {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="text-right text-base font-medium transition-colors hover:text-muted"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <span className="text-right text-base font-medium">{c.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={200}>
                <ol className="mt-12 grid gap-6">
                  {steps.map((s) => (
                    <li key={s.n} className="flex gap-5">
                      <span className="font-mono text-sm text-dim">{s.n}</span>
                      <div>
                        <p className="font-medium">{s.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <div className="relative rounded-2xl border border-line-strong bg-bg/70 p-6 shadow-section backdrop-blur-md sm:p-10">
                <h2 className="text-2xl font-semibold tracking-h3">Tell us about your project</h2>
                <p className="mt-2 text-sm text-muted">Fields marked optional can be skipped.</p>
                <div className="[&>form]:mt-8 [&>form]:max-w-none">
                  <ContactForm detailed services={[...services.map((s) => s.title), "Other"]} />
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      </main>
      <Footer showContact={false} />
    </>
  );
}
