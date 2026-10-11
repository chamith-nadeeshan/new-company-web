import { services } from "@/data/content";
import { siteConfig } from "@/config/site";
import { Reveal } from "./Reveal";
import { Arrow, Logo, Roll, Serif } from "./ui";
import { Year } from "./Year";

export function Footer() {
  return (
    <footer id="contact" className="relative scroll-mt-24 overflow-hidden px-4 pt-24 sm:px-8">
      {/* Blue glow rising behind the CTA */}
      <div
        aria-hidden
        className="aurora pointer-events-none absolute inset-x-0 top-0 h-[620px] opacity-70 [mask-image:linear-gradient(to_top,transparent,black_40%,transparent)]"
      />

      <div className="relative mx-auto max-w-[1376px]">
        <Reveal>
          <a
            href={`mailto:${siteConfig.email}`}
            className="group block rounded-2xl border border-line-strong bg-bg/70 px-6 py-20 text-center shadow-section backdrop-blur-md sm:py-28"
          >
            <p className="text-sm text-muted">Have a project in mind?</p>
            <h2 className="mt-5 text-[clamp(3rem,10vw,8rem)] font-semibold leading-[0.95] tracking-h1">
              Let&apos;s <Serif>Connect</Serif>
            </h2>
            <span className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-btn px-6 py-3 text-[0.9375rem] font-medium text-btn-ink">
              <Roll>{siteConfig.email}</Roll>
              <Arrow className="transition-transform duration-300 ease-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </a>
        </Reveal>

        <div className="mt-24 grid gap-12 border-t border-line pt-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted">{siteConfig.description}</p>
            <div className="flex flex-wrap gap-2">
              {siteConfig.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="rounded-full border border-line-strong px-3.5 py-1.5 text-xs text-muted transition-colors duration-200 hover:text-fg"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Company" links={siteConfig.nav.slice(1).map((n) => ({ label: n.label, href: n.href }))} />
          <FooterCol title="Services" links={services.slice(0, 6).map((s) => ({ label: s.title, href: "#services" }))} />

          <div>
            <h3 className="text-sm font-semibold">Contact</h3>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-muted">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-fg">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-fg">
                  {siteConfig.phone}
                </a>
              </li>
              <li>{siteConfig.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-line py-8 text-xs text-muted sm:flex-row">
          <p>
            © <Year /> {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-fg">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-fg">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-5 flex flex-col gap-3 text-sm text-muted">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="group transition-colors hover:text-fg">
              <Roll>{l.label}</Roll>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
