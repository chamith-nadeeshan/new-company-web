import type { Metadata } from "next";
import {
  Fraunces,
  Geist,
  Montserrat,
  Rubik_Bubbles,
  Rubik_Glitch,
  Rubik_Iso,
  Rubik_Maze,
  Rubik_Moonrocks,
  Rubik_Puddles,
} from "next/font/google";
import { siteConfig } from "@/config/site";
import { SmoothScroll } from "@/components/SmoothScroll";
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
  weight: ["400", "500", "600", "700"],
});

// Playful display faces the hero accent word flips through, like escolhadigital.
const rubikBubbles = Rubik_Bubbles({
  variable: "--font-rubik-bubbles",
  subsets: ["latin"],
  weight: "400",
});
const rubikGlitch = Rubik_Glitch({
  variable: "--font-rubik-glitch",
  subsets: ["latin"],
  weight: "400",
});
const rubikIso = Rubik_Iso({
  variable: "--font-rubik-iso",
  subsets: ["latin"],
  weight: "400",
});
const rubikMaze = Rubik_Maze({
  variable: "--font-rubik-maze",
  subsets: ["latin"],
  weight: "400",
});
const rubikMoonrocks = Rubik_Moonrocks({
  variable: "--font-rubik-moonrocks",
  subsets: ["latin"],
  weight: "400",
});
const rubikPuddles = Rubik_Puddles({
  variable: "--font-rubik-puddles",
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
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
};

// Applies the saved theme before paint to avoid a flash of the wrong theme.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geist.variable} ${fraunces.variable} ${montserrat.variable} ${rubikBubbles.variable} ${rubikGlitch.variable} ${rubikIso.variable} ${rubikMaze.variable} ${rubikMoonrocks.variable} ${rubikPuddles.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
