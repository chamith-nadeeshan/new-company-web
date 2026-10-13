import { services } from "@/data/content";

// Infinite horizontal ticker of services, bullet-separated, faded at both edges
// (visuvate.com style). Uses the site's Geist sans and the shared `.marquee`
// loop utility; the list is duplicated so the -50% translate loops seamlessly.
export function ServicesMarquee() {
  const items = services.map((s) => s.title);

  return (
    <section
      aria-label="What we do"
      className="overflow-hidden bg-black py-7 text-white sm:py-9"
    >
      <div className="[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee" style={{ ["--duration" as string]: "36s" }}>
          {[...items, ...items].map((label, i) => (
            <span
              key={i}
              className="flex items-center whitespace-nowrap text-[20px] font-medium leading-[1.2] tracking-[-0.02em] text-white sm:text-[24px]"
            >
              {label}
              <span aria-hidden className="mx-[18px] text-white/40">
                •
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
