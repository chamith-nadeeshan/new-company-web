// All page copy lives here so sections stay purely presentational.
// Gradient pairs stand in for project imagery until real screenshots exist.

export const team = ["AK", "SR", "MN", "JD"];

export const projects = [
  { title: "Northwind Logistics", category: "Web Platform", year: "2026", from: "#1f3a5f", to: "#5b8def" },
  { title: "Lumen Health", category: "Healthcare App", year: "2026", from: "#134e4a", to: "#2dd4bf" },
  { title: "Atlas Finance", category: "Fintech Dashboard", year: "2025", from: "#3b0764", to: "#a855f7" },
  { title: "Kite Commerce", category: "eCommerce", year: "2025", from: "#7c2d12", to: "#fb923c" },
  { title: "Orbit Studio", category: "Brand & Website", year: "2025", from: "#1e1b4b", to: "#818cf8" },
  { title: "Verde Foods", category: "Mobile App", year: "2024", from: "#14532d", to: "#84cc16" },
];

export const techStack = [
  "Next.js", "React", "TypeScript", "Node.js", "Figma", "AWS", "PostgreSQL", "Flutter", "Docker", "Tailwind CSS",
];

export const stats = [
  { value: "120+", label: "Projects shipped" },
  { value: "8 yrs", label: "Building software" },
  { value: "98%", label: "Client retention" },
  { value: "24/7", label: "Support coverage" },
];

export const services = [
  { title: "Custom Websites", label: "Custom\nWebsites", body: "Fast, accessible marketing sites built to rank and convert." },
  { title: "Web Applications", label: "Web\nApplications", body: "Scalable SaaS and internal tools with clean, maintainable code." },
  { title: "Mobile Apps", label: "Mobile\nApps", body: "Cross-platform iOS and Android apps from a single codebase." },
  { title: "eCommerce", label: "eCommerce\nPlatforms", body: "Storefronts with secure checkout, inventory, and analytics." },
  { title: "UI / UX Design", label: "UI / UX\nDesign", body: "Research-led interfaces that feel effortless to use." },
  { title: "Cloud & DevOps", label: "Cloud &\nDevOps", body: "CI/CD pipelines, infrastructure as code, and cost-aware hosting." },
  { title: "API & Integrations", label: "API &\nIntegrations", body: "Payment, CRM, and ERP integrations that just work." },
  { title: "AI Solutions", label: "AI\nSolutions", body: "LLM-powered features, automation, and data pipelines." },
  { title: "Performance & SEO", label: "Performance\n& SEO", body: "Core Web Vitals tuning and technical SEO audits." },
  { title: "Maintenance & Support", label: "Maintenance &\nSupport", body: "Monitoring, updates, and a team on call when you need it." },
];

export const platforms = [
  "Vercel", "Google Cloud", "Shopify", "WordPress", "Webflow", "Stripe", "Firebase", "Supabase",
];

export const pricing = [
  {
    name: "Starter Website",
    price: "$900",
    note: "Ideal for small businesses",
    features: ["Up to 6 pages", "Responsive design", "Basic SEO setup", "CMS integration", "2 revision rounds", "30 days support"],
    featured: false,
  },
  {
    name: "Business Platform",
    price: "$2,500",
    note: "Most popular",
    features: ["Up to 15 pages or app screens", "Custom UI / UX design", "eCommerce or booking", "Analytics & tracking", "Performance optimisation", "90 days support"],
    featured: true,
  },
  {
    name: "Custom Product",
    price: "$6,000+",
    note: "For complex software",
    features: ["Discovery workshop", "Web or mobile app", "Custom backend & APIs", "Cloud infrastructure", "Automated testing", "Dedicated project lead"],
    featured: false,
  },
];

// `highlight` is a phrase inside `body` rendered in the primary text colour.
export const approach = [
  { step: "01", title: "Discovery & Strategy", body: "We map your goals, users and constraints before a single line of code, so every decision has a reason behind it.", highlight: "goals, users and constraints" },
  { step: "02", title: "Design & Prototyping", body: "Wireframes and prototypes you can click through on any device, so you see it working before we build it.", highlight: "click through on any device" },
  { step: "03", title: "Agile Development", body: "Short sprints with weekly demos and a staging link that always shows the latest working build.", highlight: "weekly demos" },
  { step: "04", title: "Quality Assurance", body: "Automated tests, accessibility checks and review on real devices catch problems before your users ever see them.", highlight: "Automated tests" },
  { step: "05", title: "Zero-Downtime Launch", body: "Releases ship without interruption, with monitoring in place from the first minute and a hand-over your team can own.", highlight: "without interruption" },
  { step: "06", title: "Continuous Growth", body: "Ongoing improvements driven by real usage data, so the product keeps getting better long after launch.", highlight: "real usage data" },
];

export const posts = [
  { title: "Choosing between a website builder and a custom build", date: "Sep 28, 2026", tag: "Strategy", from: "#0f172a", to: "#3b82f6" },
  { title: "Five Core Web Vitals fixes that move the needle", date: "Sep 12, 2026", tag: "Performance", from: "#1c1917", to: "#f59e0b" },
  { title: "Shipping AI features responsibly in production apps", date: "Aug 30, 2026", tag: "Engineering", from: "#042f2e", to: "#14b8a6" },
];

export const testimonials = [
  { quote: "They took our rough idea and shipped a polished platform in eight weeks. Communication was excellent throughout.", name: "Client Name", role: "Founder, Company A" },
  { quote: "Our new site loads in under a second and inbound leads doubled within the first quarter.", name: "Client Name", role: "Marketing Lead, Company B" },
  { quote: "A rare team that cares about both design detail and engineering quality. We keep coming back.", name: "Client Name", role: "CTO, Company C" },
];

export const faqs = [
  { q: "How long does a typical project take?", a: "Websites usually take 3–6 weeks. Web and mobile apps range from 8–16 weeks depending on scope." },
  { q: "Do you work with clients outside your country?", a: "Yes. We work remotely with clients across time zones and schedule overlap hours for calls." },
  { q: "Who owns the code and design files?", a: "You do. Full ownership of source code, designs, and accounts transfers on final payment." },
  { q: "Can you take over an existing project?", a: "Yes. We start with a code and infrastructure audit, then propose a stabilisation plan." },
  { q: "What happens after launch?", a: "Every plan includes a support window, and we offer monthly retainers for ongoing work." },
  { q: "How do payments work?", a: "Typically 40% upfront, 40% at design or beta sign-off, and 20% on launch." },
];

// Cards orbiting in the "Our Works" section. Images in /public/projects are
// placeholder photos (Unsplash, via picsum.photos) — replace them with real
// project screenshots, keeping the same file names or updating `image`.
export const showcase = [
  { brand: "Northwind", headline: "Freight, tracked in real time", theme: "light", image: "/projects/northwind.jpg" },
  { brand: "Lumen", headline: "Care that comes to you", theme: "dark", image: "/projects/lumen.jpg" },
  { brand: "Atlas", headline: "Money, made simple", theme: "light", image: "/projects/atlas.jpg" },
  { brand: "Kite", headline: "Shop the new season", theme: "dark", image: "/projects/kite.jpg" },
  { brand: "Orbit", headline: "Brands with gravity", theme: "light", image: "/projects/orbit.jpg" },
  { brand: "Verde", headline: "Fresh food, delivered", theme: "dark", image: "/projects/verde.jpg" },
  { brand: "Harbor", headline: "Stays by the sea", theme: "light", image: "/projects/harbor.jpg" },
  { brand: "Pulse", headline: "Train smarter every day", theme: "dark", image: "/projects/pulse.jpg" },
  { brand: "Summit", headline: "Find your next adventure", theme: "light", image: "/projects/summit.jpg" },
  { brand: "Nova", headline: "Learning without limits", theme: "dark", image: "/projects/nova.jpg" },
  { brand: "Drive", headline: "Rentals without the paperwork", theme: "light", image: "/projects/drive.jpg" },
  { brand: "Bloom", headline: "Flowers for every moment", theme: "dark", image: "/projects/bloom.jpg" },
  { brand: "Arc", headline: "Architecture that lasts", theme: "light", image: "/projects/arc.jpg" },
  { brand: "Calm", headline: "Sleep better tonight", theme: "dark", image: "/projects/calm.jpg" },
] as const;

// Real project screenshots shown in the editor-mockup marquee (EditorMockup).
// Files live in /public/projects-reel. `mobileImage` is a 390px-wide phone
// capture; only shots that have one appear in the mockup's mobile view.
export type ReelShot = {
  brand: string;
  headline: string;
  theme: "light" | "dark";
  image: string;
  mobileImage?: string;
};

export const reelShots: ReelShot[] = [
  { brand: "Fitly", headline: "Fitness website UI", theme: "light", image: "/projects-reel/fitness-layout.jpg" },
  { brand: "Fitly", headline: "Weekly streaks & sessions", theme: "dark", image: "/projects-reel/fitness-streak.jpg" },
  { brand: "Studio", headline: "Product interface", theme: "light", image: "/projects-reel/project-01.png" },
  { brand: "Studio", headline: "Dashboard concept", theme: "dark", image: "/projects-reel/project-02.png" },
  { brand: "Proton", headline: "Sri Lanka–China gateway", theme: "dark", image: "/projects-reel/proton.png", mobileImage: "/projects-reel/proton-mobile.jpg" },
  { brand: "Nexora", headline: "Premium streetwear store", theme: "dark", image: "/projects-reel/nexora.png", mobileImage: "/projects-reel/nexora-mobile.jpg" },
  { brand: "Nexora", headline: "3D apparel customizer", theme: "dark", image: "/projects-reel/nexora-customize.png", mobileImage: "/projects-reel/nexora-customize-mobile.jpg" },
];

// Screenshots for the drifting marquee in the Intro section only. Files live in
// /public/projects-slider/{row-1,row-2}. Kept separate from `reelShots` so
// EditorMockup and WorksOrbit are unaffected. Top row uses row-1, bottom uses row-2.
// `w`/`h` are the natural pixel dimensions so cards keep a uniform height while
// their width follows each image's aspect ratio (no cropping, no letterbox).
export type SliderShot = { image: string; w: number; h: number };

export const sliderRow1: SliderShot[] = [
  { image: "/projects-slider/row-1/appalo-brand.jpg", w: 1376, h: 768 },
  { image: "/projects-slider/row-1/bmw-electric.jpg", w: 1376, h: 768 },
  { image: "/projects-slider/row-1/coaching.jpg", w: 1376, h: 768 },
  { image: "/projects-slider/row-1/hand-app.jpg", w: 896, h: 1200 },
  { image: "/projects-slider/row-1/petal-power.jpg", w: 1376, h: 768 },
];

// Screenshots shown on the rotating sphere in the "Our Works" section
// (WorksOrbit). Files live in /public/our-works. All are landscape so they fill
// the uniform orbit cards without cropping.
export const worksShots: ReelShot[] = [
  { brand: "Appalo", headline: "Brand landing page", theme: "dark", image: "/our-works/appalo-brand.jpg" },
  { brand: "BMW", headline: "Electric car website", theme: "dark", image: "/our-works/bmw-electric.jpg" },
  { brand: "Coaching", headline: "Coaching landing page", theme: "light", image: "/our-works/coaching.jpg" },
  { brand: "Fitly", headline: "Fitness website UI", theme: "light", image: "/our-works/fitness-layout.jpg" },
  { brand: "Fitly", headline: "Weekly streaks & sessions", theme: "dark", image: "/our-works/fitness-streak.jpg" },
  { brand: "Nexora", headline: "Premium streetwear store", theme: "dark", image: "/our-works/nexora.png" },
  { brand: "Petal", headline: "Floral brand site", theme: "light", image: "/our-works/petal-power.jpg" },
  { brand: "Productivity", headline: "Productivity app site", theme: "light", image: "/our-works/productivity-app.jpg" },
  { brand: "Studio", headline: "Product interface", theme: "light", image: "/our-works/project-01.png" },
  { brand: "Smart Home", headline: "Smart home landing page", theme: "light", image: "/our-works/smart-home.jpg" },
  { brand: "Sneaker", headline: "Sneaker store landing", theme: "dark", image: "/our-works/sneaker.jpg" },
];

export const sliderRow2: SliderShot[] = [
  { image: "/projects-slider/row-2/portfolio.jpg", w: 896, h: 1200 },
  { image: "/projects-slider/row-2/productivity-app.jpg", w: 1376, h: 768 },
  { image: "/projects-slider/row-2/smart-home.jpg", w: 1376, h: 768 },
  { image: "/projects-slider/row-2/sneaker.jpg", w: 1376, h: 768 },
];
