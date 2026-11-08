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

// A service follows a Visuvate-style detail page (/services/[slug]):
// hero title + tagline, a value-proposition intro, a "What's included" list,
// recent work, and related services.
//   title    — card + detail heading
//   label    — two-line label for the home grid (keep the \n)
//   body     — one-line summary on the cards
//   slug     — /services/[slug] route segment
//   tagline  — hero subheading on the detail page
//   intro    — value-proposition paragraphs (one string per paragraph)
//   included — "What's included" bullet list
export type Service = {
  title: string;
  label: string;
  body: string;
  slug: string;
  tagline: string;
  intro: string[];
  included: string[];
};

export const services: Service[] = [
  {
    title: "Custom Websites",
    label: "Custom\nWebsites",
    body: "Fast, accessible marketing sites built to rank and convert.",
    slug: "custom-websites",
    tagline: "Marketing sites that load fast, rank well, and turn visitors into customers.",
    intro: [
      "A website is often the first thing a customer judges you on. We design and build custom marketing sites that are fast, accessible, and easy for your team to update — not another slow template that looks like everyone else's.",
      "We start from your goals and your audience, then design around the actions that matter: enquiries, sign-ups, sales. Every page is built to perform on real devices and real connections.",
    ],
    included: [
      "Discovery and content strategy",
      "Custom responsive design in your brand",
      "Accessible, semantic, SEO-ready markup",
      "CMS setup so your team can edit content",
      "Core Web Vitals performance tuning",
      "Analytics and launch support",
    ],
  },
  {
    title: "Web Applications",
    label: "Web\nApplications",
    body: "Scalable SaaS and internal tools with clean, maintainable code.",
    slug: "web-applications",
    tagline: "SaaS products and internal tools, engineered to scale and built to last.",
    intro: [
      "When an off-the-shelf tool no longer fits, a custom web application gives you exactly the workflow your business needs. We build SaaS products and internal tools with clean, tested, maintainable code.",
      "From the data model up, we design for growth — so the app stays fast and reliable as your users and your feature set multiply.",
    ],
    included: [
      "Architecture and data-model design",
      "Secure authentication and roles",
      "Custom business logic and workflows",
      "APIs and third-party integrations",
      "Automated testing and CI/CD",
      "Monitoring, logging, and handover docs",
    ],
  },
  {
    title: "Mobile Apps",
    label: "Mobile\nApps",
    body: "Cross-platform iOS and Android apps from a single codebase.",
    slug: "mobile-apps",
    tagline: "Native-quality iOS and Android apps from a single, maintainable codebase.",
    intro: [
      "Reach your users on the devices they carry everywhere. We build cross-platform mobile apps that feel native on both iOS and Android, from one shared codebase that keeps cost and maintenance down.",
      "We handle the full lifecycle — design, build, store submission, and the updates that keep your app healthy after launch.",
    ],
    included: [
      "Cross-platform build (iOS + Android)",
      "Native-feeling UI and interactions",
      "Offline support and push notifications",
      "Backend and API integration",
      "App Store and Play Store submission",
      "Post-launch updates and monitoring",
    ],
  },
  {
    title: "eCommerce",
    label: "eCommerce\nPlatforms",
    body: "Storefronts with secure checkout, inventory, and analytics.",
    slug: "ecommerce",
    tagline: "Storefronts built to sell — fast, secure, and easy to run.",
    intro: [
      "An online store lives or dies on speed and trust. We build eCommerce experiences with frictionless checkout, reliable inventory, and the analytics you need to grow revenue.",
      "Whether you're on a platform like Shopify or need something fully custom, we tailor the stack to your catalogue, your margins, and your operations.",
    ],
    included: [
      "Storefront design and product pages",
      "Secure, optimised checkout",
      "Inventory and order management",
      "Payment and shipping integrations",
      "Analytics and conversion tracking",
      "Performance and SEO for product pages",
    ],
  },
  {
    title: "UI / UX Design",
    label: "UI / UX\nDesign",
    body: "Research-led interfaces that feel effortless to use.",
    slug: "ui-ux-design",
    tagline: "Research-led product design that makes complex things feel simple.",
    intro: [
      "Good design is invisible — users just get things done. We research, prototype, and refine interfaces until the next step is always obvious and the product feels effortless.",
      "We work in clickable prototypes you can test before a line of code is written, so decisions are grounded in real feedback, not guesswork.",
    ],
    included: [
      "User research and journey mapping",
      "Information architecture",
      "Wireframes and clickable prototypes",
      "High-fidelity UI design",
      "Design system and component library",
      "Usability testing and iteration",
    ],
  },
  {
    title: "Cloud & DevOps",
    label: "Cloud &\nDevOps",
    body: "CI/CD pipelines, infrastructure as code, and cost-aware hosting.",
    slug: "cloud-devops",
    tagline: "Reliable infrastructure, automated delivery, and hosting that scales with you.",
    intro: [
      "Shipping should be boring — in the best way. We set up cloud infrastructure and CI/CD pipelines so your team can deploy safely and often, with rollbacks when you need them.",
      "We treat infrastructure as code, keep costs in check, and put monitoring in place so problems surface before your users notice them.",
    ],
    included: [
      "Infrastructure as code",
      "CI/CD pipeline setup",
      "Containerisation and orchestration",
      "Monitoring, logging, and alerting",
      "Cost optimisation",
      "Security and backup strategy",
    ],
  },
  {
    title: "API & Integrations",
    label: "API &\nIntegrations",
    body: "Payment, CRM, and ERP integrations that just work.",
    slug: "api-integrations",
    tagline: "Connect your tools and data so systems talk to each other reliably.",
    intro: [
      "Your business runs on more than one system. We design and build APIs and integrations that connect payments, CRMs, ERPs, and whatever else you depend on — so data flows without manual copy-paste.",
      "We build with resilience in mind: retries, error handling, and clear logging, so integrations keep working when the network doesn't.",
    ],
    included: [
      "REST and GraphQL API design",
      "Payment gateway integration",
      "CRM and ERP connectivity",
      "Webhooks and event pipelines",
      "Data sync and migration",
      "Error handling and observability",
    ],
  },
  {
    title: "AI Solutions",
    label: "AI\nSolutions",
    body: "LLM-powered features, automation, and data pipelines.",
    slug: "ai-solutions",
    tagline: "Practical AI features that save time and create real value.",
    intro: [
      "AI is only useful when it solves a real problem. We build LLM-powered features, automations, and data pipelines that fit into your product and your workflow — not demos that never ship.",
      "We focus on accuracy, cost, and safety, so the features you launch are ones you can actually rely on in production.",
    ],
    included: [
      "Use-case discovery and feasibility",
      "LLM feature design and prompting",
      "Retrieval and data pipelines",
      "Workflow automation",
      "Evaluation and guardrails",
      "Production deployment and monitoring",
    ],
  },
  {
    title: "Performance & SEO",
    label: "Performance\n& SEO",
    body: "Core Web Vitals tuning and technical SEO audits.",
    slug: "performance-seo",
    tagline: "Faster pages and cleaner technical SEO, measured by real results.",
    intro: [
      "Speed is a feature and search visibility is a channel. We audit your site, fix what's slowing it down, and tidy the technical SEO that search engines care about.",
      "Every change is measured against Core Web Vitals and real-world metrics, so you can see the impact rather than take it on faith.",
    ],
    included: [
      "Performance and Core Web Vitals audit",
      "Image, asset, and bundle optimisation",
      "Technical SEO fixes",
      "Structured data and metadata",
      "Accessibility improvements",
      "Before/after reporting",
    ],
  },
  {
    title: "Maintenance & Support",
    label: "Maintenance &\nSupport",
    body: "Monitoring, updates, and a team on call when you need it.",
    slug: "maintenance-support",
    tagline: "Keep your product healthy with monitoring, updates, and a team on call.",
    intro: [
      "Launch day is the start, not the finish. We keep your product secure, up to date, and fast with ongoing maintenance and a team you can reach when something needs attention.",
      "Flexible retainers mean you get the right level of support — from routine updates to rapid response — without hiring a full in-house team.",
    ],
    included: [
      "Uptime and performance monitoring",
      "Security patches and dependency updates",
      "Bug fixes and small enhancements",
      "Backups and disaster recovery",
      "Priority support response",
      "Monthly health reporting",
    ],
  },
  {
    title: "Microsoft 365 Development",
    label: "Microsoft 365\nDevelopment",
    body: "Power Platform, SharePoint, Dataverse, and custom Microsoft 365 solutions.",
    slug: "microsoft-365-development",
    tagline: "Custom solutions across Power Platform, SharePoint, Dataverse, and the wider Microsoft 365 stack.",
    intro: [
      "Microsoft 365 is already in your business — we help you get far more out of it. We build custom apps, automations, and portals across Power Platform, SharePoint, and Dataverse that fit the way your teams actually work.",
      "From Power Apps and Power Automate flows to SharePoint intranets and Dataverse-backed data models, we turn manual, spreadsheet-driven processes into secure, governed solutions on infrastructure you already own.",
    ],
    included: [
      "Power Apps (canvas & model-driven) development",
      "Power Automate workflow automation",
      "SharePoint sites, intranets, and document management",
      "Dataverse data modelling and integration",
      "Power BI dashboards and reporting",
      "Microsoft 365 integration, security, and governance",
    ],
  },
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

// PLACEHOLDER testimonials — the names and companies below are FICTIONAL and
// invented for layout only. Replace every entry with real client names, roles,
// companies, and quotes (with their permission) before this site goes live.
// Publishing invented testimonials as genuine is deceptive advertising.
export const testimonials = [
  { quote: "They took our rough idea and shipped a polished platform in eight weeks. Communication was excellent throughout.", name: "Daniel Fernando", role: "Founder, Ceylon Freight Co." },
  { quote: "Our new site loads in under a second and inbound leads doubled within the first quarter.", name: "Amara Jayawardena", role: "Marketing Lead, Lotus Interiors" },
  { quote: "A rare team that cares about both design detail and engineering quality. We keep coming back.", name: "Rohan Mendis", role: "CTO, Zephyr Labs" },
  { quote: "The rebuild cut our checkout drop-off by a third and the handover was clean and well documented.", name: "Sophie Albrecht", role: "Head of Product, Nordfell Retail" },
  { quote: "Reliable, responsive, and genuinely invested in our outcomes — they feel like part of our own team.", name: "Imran Haq", role: "Operations Director, Harborline Logistics" },
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

// ---------------------------------------------------------------------------
// Case studies — the /works index grid and /works/[slug] detail pages.
//
// Each project's images live in /public/works/<slug>/ as PLACEHOLDERS:
//   cover.jpg  — index grid card + "More projects" cards
//   01.jpg, 02.jpg, …  — the stacked gallery, in order
// To use real images, just overwrite those files (keep the same names) — no code
// change needed. `ratio` is the frame aspect ratio (width / height); set it close
// to each screenshot so nothing is cropped oddly ("16/10", "16/9", "4/3", "3/4").
// ---------------------------------------------------------------------------

// A case study follows the Visuvate detail-page structure: title + overview,
// a metadata row, a stacked screenshot gallery, Brief/Approach/Outcome notes,
// an About paragraph, and Pages/Features lists.
export type CaseStudy = {
  slug: string;
  title: string;
  // Subtitle shown under the title on the index card.
  category: string;
  // Filter chips on the /works index. The index builds its filter row from
  // every tag used across all studies, plus "All".
  tags: string[];
  // Cover image: index grid card + "More projects" cards.
  cover: string;

  // --- Title section ---
  overview: string; // "Project Overview" paragraph

  // --- Metadata row (Industry / Created / Pages / Platform) ---
  industry: string;
  created: string; // year
  pagesCount: string; // e.g. "7"
  platform: string; // e.g. "Next.js"
  liveUrl?: string;

  // --- Gallery: stacked full-width screenshots. `ratio` = width / height. ---
  gallery: { image: string; ratio?: string }[];

  // --- Narrative ---
  brief: string;
  approach: string;
  outcome: string;
  about: string;

  // --- Lists ---
  pages: string[]; // e.g. ["Home", "About", "Services", ...]
  features: string[]; // e.g. ["Forms", "Blog", "CMS", "Booking", ...]
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "calma",
    title: "Calma",
    category: "Dental Studio · Healthcare",
    tags: ["Healthcare", "Creative"],
    cover: "/projects/calma/main.png",
    overview:
      "Calma Dental Studio is a modern Brooklyn practice built around comfort, clarity and zero pressure. We shaped a calm, trust-first website that makes dentistry feel approachable — gentle art direction up front, transparent treatment and pricing details, and booking that takes seconds. Modern dentistry with a gentle touch.",
    industry: "Healthcare / Dentistry",
    created: "2026",
    pagesCount: "6",
    platform: "Next.js",
    liveUrl: "https://calma-olive.vercel.app/",
    gallery: [
      { image: "/projects/calma/main.png", ratio: "1820/985" },
      { image: "/projects/calma/01.png", ratio: "1816/977" },
      { image: "/projects/calma/02.png", ratio: "1818/981" },
      { image: "/projects/calma/03.png", ratio: "1816/977" },
    ],
    brief:
      "Take the anxiety out of going to the dentist. Calma needed a site as calm as the care — warm and reassuring, honest about treatments and cost, and quick to turn a nervous first-timer into a booked appointment.",
    approach:
      "We led with soft, human imagery and a muted teal palette, then let the content do the reassuring: clear treatment pages, written plans with no upselling, 0% payment options, and specialist profiles that put a face to the care. A live booking flow with the next free slot keeps the first step effortless.",
    outcome:
      "The site reads the way the practice wants to feel — unhurried, transparent and expert. Treatments, pricing and the team are all easy to understand before a visit, so patients arrive informed and booking happens without friction.",
    about:
      "Calma spans the homepage, Treatments, Specialists, a Studio/About section, a patient Journal and Contact, with live appointment booking throughout. The art direction stays gentle and minimal — calming teal tones, generous space and candid clinical photography — so the care, not the clinic, is the hero.",
    pages: ["Home", "Treatments", "Specialists", "Studio", "Journal", "Contact"],
    features: ["Online Booking", "Treatment Pages", "Payment Plans", "Specialist Profiles", "Journal / CMS", "Animation"],
  },
  {
    slug: "nexora",
    title: "Nexora",
    category: "Streetwear · 3D Customizer",
    tags: ["eCommerce", "Creative"],
    cover: "/projects/nexora/main.png",
    overview:
      "Nexora is a premium streetwear label built on form, function and anti-conformity. We shaped an online store for their oversized 240 GSM cotton tees — raw, Japanese-inspired graphics up front, a live 3D customizer at the core, and a checkout that gets out of the way. Wear what matters.",
    industry: "Fashion / Streetwear",
    created: "2026",
    pagesCount: "6",
    platform: "Next.js",
    liveUrl: "https://nexorapremier.com/",
    gallery: [
      { image: "/projects/nexora/main.png", ratio: "1852/992" },
      { image: "/projects/nexora/01.png", ratio: "1838/983" },
      { image: "/projects/nexora/02.png", ratio: "1827/985" },
      { image: "/projects/nexora/03.png", ratio: "1851/986" },
    ],
    brief:
      "Sell more than t-shirts — sell a mindset. Nexora needed a store that felt as bold as the apparel: oversized black-and-white art direction, limited drops that feel exclusive, and a way for customers to make a piece truly their own.",
    approach:
      "We led with a real-time 3D customizer so buyers can watch a tee come to life before they order, then wrapped it in a minimal, high-contrast storefront. Collections, Lookbook and product pages let the graphics breathe, while WhatsApp support and drop sign-ups keep the community close.",
    outcome:
      "Designing a piece became the hook, not an afterthought. The 3D preview lifted buyer confidence, the streetwear-native look reinforced the brand, and the whole flow — browse, customize, checkout — now reads as one considered experience.",
    about:
      "Nexora spans the storefront, Collections, a live 3D customizer, product detail, Lookbook and a frictionless cart-to-checkout flow, with accounts and email drops for returning fans. The art direction stays deliberately raw and minimal — black, white and bold back-print graphics — so the product and the customization carry the page.",
    pages: ["Home", "Collections", "Customize", "Lookbook", "About", "Contact"],
    features: ["3D Customizer", "Cart & Checkout", "Accounts", "WhatsApp Support", "Drop Sign-ups", "Animation"],
  },
  {
    slug: "lumora",
    title: "Lumora",
    category: "Lighting · eCommerce",
    tags: ["eCommerce", "Creative"],
    cover: "/projects/Lumora/main.png",
    overview:
      "Lumora makes hand-crafted table lamps — each shade turned, dyed and assembled by hand, no two quite alike. We built a quiet, warm storefront that sells the feeling of the light as much as the lamp: slow living, considered materials, and a pause at the end of the day.",
    industry: "Home & Lighting",
    created: "2026",
    pagesCount: "6",
    platform: "Next.js",
    liveUrl: "https://chamith-nadeeshan.github.io/lumora/",
    gallery: [
      { image: "/projects/Lumora/main.png", ratio: "1837/990" },
      { image: "/projects/Lumora/01.png", ratio: "1837/992" },
      { image: "/projects/Lumora/02.png", ratio: "1837/993" },
      { image: "/projects/Lumora/03.png", ratio: "1837/987" },
    ],
    brief:
      "Sell a mood, not a spec sheet. Lumora's lamps are made by hand in small batches, so the store had to feel as warm and deliberate as the product — understated, tactile, and free of clutter.",
    approach:
      "We led with intimate imagery and generous space, letting each of the six collections breathe. Warm tones, soft motion and a calm type system carry the slow-living story, while a straightforward shop-to-checkout flow keeps buying effortless.",
    outcome:
      "The site reads like the brand feels: quiet, premium and considered. The craft narrative — hand-finishing, natural materials, a five-year warranty — now does the selling, turning browsers into buyers who connect with the story.",
    about:
      "Lumora spans the storefront, collections, product detail, an Our Story page and a Journal, with shipping, returns and contact close at hand. The art direction stays warm and minimal — timber, linen and mouth-blown glass photographed in quiet, lived-in moments — so the light itself is the hero.",
    pages: ["Home", "Shop", "Our Story", "Journal", "Materials", "Contact"],
    features: ["Cart & Checkout", "Collections", "Journal / CMS", "Shipping & Returns", "Newsletter", "Animation"],
  },
  {
    slug: "appalo",
    title: "Appalo",
    category: "Brand & Website",
    tags: ["Agency", "Creative"],
    cover: "/works/appalo/cover.jpg",
    overview:
      "A bold brand landing page built to make a first impression land. Oversized type, confident motion, and a layout that gets out of the content's way — a site that carries a new brand on its own.",
    industry: "Agency",
    created: "2026",
    pagesCount: "6",
    platform: "Next.js",
    liveUrl: "#",
    gallery: [
      { image: "/works/appalo/01.jpg", ratio: "16/10" },
      { image: "/works/appalo/02.jpg", ratio: "16/10" },
      { image: "/works/appalo/03.jpg", ratio: "16/10" },
      { image: "/works/appalo/04.jpg", ratio: "16/10" },
    ],
    brief:
      "Launch a brand with nothing but a name and an attitude. The site had to set the tone instantly and feel premium without relying on a product to show.",
    approach:
      "Editorial, high-contrast, and quiet where it counts. The design leans on scale and rhythm instead of decoration, with motion reserved for the moments that matter.",
    outcome:
      "A launch page that reads as a statement. It gave the brand a confident first impression and a system flexible enough to grow into.",
    about:
      "Appalo covers the brand story, services, work and contact across a tight set of pages. The art direction is deliberately restrained so typography and spacing carry the weight.",
    pages: ["Home", "About", "Services", "Work", "Journal", "Contact"],
    features: ["Blog", "Forms", "CMS", "Custom Code", "Animation", "SEO"],
  },
  {
    slug: "bmw-electric",
    title: "BMW Electric",
    category: "Automotive · Web",
    tags: ["Corporate", "Creative"],
    cover: "/works/bmw-electric/cover.jpg",
    overview:
      "An electric-car showcase built around scroll-driven cinematics. A product page that feels like a trailer — full-bleed imagery, deliberate pacing, and motion that reveals the car the way you'd want to see it.",
    industry: "Automotive",
    created: "2025",
    pagesCount: "5",
    platform: "Next.js",
    liveUrl: "#",
    gallery: [
      { image: "/works/bmw-electric/01.jpg", ratio: "16/9" },
      { image: "/works/bmw-electric/02.jpg", ratio: "16/10" },
      { image: "/works/bmw-electric/03.jpg", ratio: "16/10" },
    ],
    brief:
      "Launch an electric model online the way it deserves — cinematic, premium, and fast. The page had to sell a feeling, not just a spec sheet.",
    approach:
      "Every section is a beat. We used generous whitespace and slow, scroll-driven reveals so each frame has room to breathe, building the car up piece by piece.",
    outcome:
      "It doesn't look like a website — it looks like a product film you can scroll. Time-on-page climbed and the configurator saw more completed builds.",
    about:
      "The experience spans hero, range, performance, configurator and booking. Motion is the medium: the whole page is choreographed to the scroll.",
    pages: ["Home", "Range", "Performance", "Configure", "Book a drive"],
    features: ["Scroll Animation", "Configurator", "Forms", "CMS", "Custom Code", "Performance"],
  },
  {
    slug: "fitly",
    title: "Fitly",
    category: "Fitness · Web App",
    tags: ["Fitness", "SaaS"],
    cover: "/works/fitly/cover.jpg",
    overview:
      "A fitness platform with weekly streaks that keep people coming back. A clean, motivating interface for tracking training that makes progress feel visible and the next session feel inevitable.",
    industry: "Fitness",
    created: "2025",
    pagesCount: "7",
    platform: "Next.js",
    liveUrl: "#",
    gallery: [
      { image: "/works/fitly/01.jpg", ratio: "16/10" },
      { image: "/works/fitly/02.jpg", ratio: "16/10" },
      { image: "/works/fitly/03.jpg", ratio: "16/10" },
      { image: "/works/fitly/04.jpg", ratio: "16/10" },
    ],
    brief:
      "Help people build a training habit that sticks. The product had to motivate without nagging, and make a week of effort feel like real momentum.",
    approach:
      "Streaks, sessions, and gentle nudges — structured so momentum builds on its own. A calm design system keeps the focus on progress, not clutter.",
    outcome:
      "Weekly retention improved as streaks gave members a reason to return. The interface turned tracking from a task into a small daily win.",
    about:
      "Fitly spans dashboard, programs, session tracking and a coaching layer. The design system is built for density without noise, so data stays legible everywhere.",
    pages: ["Dashboard", "Programs", "Sessions", "Progress", "Coaching", "Settings"],
    features: ["Auth", "Dashboard", "Charts", "CMS", "Notifications", "Design System"],
  },
];
