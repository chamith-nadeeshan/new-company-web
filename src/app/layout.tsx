import type { Metadata, Viewport } from "next";
import {
  Fraunces,
  Geist,
  Montserrat,
  Rubik_Bubbles,
  Rubik_Moonrocks,
} from "next/font/google";
import { siteConfig } from "@/config/site";
import { SmoothScroll } from "@/components/SmoothScroll";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

// Playful display faces the hero accent word flips through, like escolhadigital.
const rubikBubbles = Rubik_Bubbles({
  variable: "--font-rubik-bubbles",
  subsets: ["latin"],
  weight: "400",
});
const rubikMoonrocks = Rubik_Moonrocks({
  variable: "--font-rubik-moonrocks",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  alternates: { canonical: "/" },
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

// Organization + WebSite structured data, emitted on every page.
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    image: `${siteConfig.url}/opengraph-image.jpg`,
    description: siteConfig.description,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Colombo",
      addressCountry: "LK",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: siteConfig.email,
      telephone: `+${siteConfig.whatsapp.number}`,
    },
    sameAs: siteConfig.socials.map((s) => s.href),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "en",
  },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geist.variable} ${fraunces.variable} ${montserrat.variable} ${rubikBubbles.variable} ${rubikMoonrocks.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        {children}
        <WhatsAppButton />
        <JsonLd data={structuredData} />
      </body>
    </html>
  );
}
