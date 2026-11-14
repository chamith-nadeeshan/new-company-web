import { services } from "@/data/content";
import { siteConfig } from "@/config/site";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";
import { Logo, Roll, Serif } from "./ui";
import { Year } from "./Year";

// `showContact={false}` hides the "Let's Connect" form block — used on /contact,
// which has its own form.
export function Footer({ showContact = true }: { showContact?: boolean } = {}) {
  return (
    <footer id={showContact ? "contact" : undefined} className="relative scroll-mt-24 overflow-hidden px-4 pt-24 sm:px-8">
      {/* Blue glow rising behind the CTA */}
      <div
        aria-hidden
        className="aurora pointer-events-none absolute inset-x-0 top-0 h-[620px] opacity-70 [mask-image:linear-gradient(to_top,transparent,black_40%,transparent)]"
      />

      <div className="relative mx-auto max-w-[1376px]">
        {showContact && (
        <Reveal>
          <div className="rounded-2xl border border-line-strong bg-bg/70 px-6 py-20 text-center shadow-section backdrop-blur-md sm:py-28">
            <p className="text-sm text-muted">Have a project in mind?</p>
            <h2 className="mt-5 text-[clamp(3rem,10vw,8rem)] font-semibold leading-[0.95] tracking-h1">
              Let&apos;s <Serif>Connect</Serif>
            </h2>
            <ContactForm />
          </div>
        </Reveal>
        )}

        <div className={`${showContact ? "mt-24" : ""} grid gap-12 border-t border-line pt-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]`}>
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted">{siteConfig.description}</p>
            <div className="flex flex-wrap gap-2">
              {siteConfig.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
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
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-fg"
                >
                  {siteConfig.whatsapp.display}
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
            <a href="/privacy" className="transition-colors hover:text-fg">
              Privacy Policy
            </a>
            <a href="/terms" className="transition-colors hover:text-fg">
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
