import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuroraStreaks } from "@/components/AuroraStreaks";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/config/site";
import { caseStudies, services } from "@/data/content";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.tagline,
    alternates: { canonical: `/services/${service.slug}/` },
    openGraph: {
      title: `${service.title} | ${siteConfig.name}`,
      description: service.tagline,
      url: `${siteConfig.url}/services/${service.slug}/`,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = services.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();

  const service = services[index];
  // Up to three other services, starting after the current one, wrapping around.
  const related = Array.from({ length: services.length - 1 }, (_, i) =>
    services[(index + 1 + i) % services.length],
  ).slice(0, 3);
  const recentWork = caseStudies.slice(0, 3);

  const canonical = `${siteConfig.url}/services/${service.slug}/`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.tagline,
      url: canonical,
      serviceType: service.title,
      provider: { "@id": `${siteConfig.url}/#organization` },
      areaServed: "Worldwide",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services/` },
        { "@type": "ListItem", position: 3, name: service.title, item: canonical },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <Navbar />
      <main className="relative isolate flex-1 bg-black">
        {/* Neutral grey light-streak background, matching the Visuvate service
            detail page (the /services index keeps the brand-orange streaks). */}
        <AuroraStreaks
          color1="#8b8b8b"
          color2="#c4c4c4"
          className="pointer-events-none fixed inset-0 -z-10 blur-[7px]"
        />
        <ServiceDetail
          service={service}
          recentWork={recentWork}
          related={related}
        />
      </main>
      <Footer />
    </>
  );
}
