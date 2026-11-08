// Single place to rebrand the site. Replace `name`, `logo`, and contact
// details once the final brand assets are ready.
export const siteConfig = {
  name: "Felinn",
  // Short mark shown when no logo image is set (e.g. initials).
  mark: "Fn",
  // Put the logo file in /public (e.g. /public/logo.svg) and set the path here.
  // Leave as null to render the animated Felinn wordmark. `logo` shows on dark
  // backgrounds (white wordmark); `logoLight` shows when the light theme is active.
  // logo.png is the white/orange wordmark — perfect on dark. No light-theme
  // variant yet, so the Logo component falls back to the CSS wordmark on light.
  logo: "/logo.png" as string | null,
  logoLight: null as string | null,
  tagline: "Engineering digital products that last",
  description:
    "We design and build high-performance websites, web apps, and software products for ambitious teams.",
  url: "https://felinnlabs.com",
  email: "info@felinnlabs.com",
  // Business contact / WhatsApp number. `display` is for humans; `number` is
  // digits only (no +, spaces, or dashes) for the https://wa.me/ deep link.
  whatsapp: {
    display: "+94 74 206 6193",
    number: "94742066193",
  },
  location: "Colombo, Sri Lanka",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Works", href: "/works" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "#contact" },
  ],
  socials: [
    { label: "Facebook", href: "https://web.facebook.com/felinnlabs/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/felinn" },
    { label: "Instagram", href: "https://www.instagram.com/felinnlabs/" },
  ],
};
