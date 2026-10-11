import { ApproachBento } from "@/components/ApproachBento";
import { Footer } from "@/components/Footer";
import { LandingHero } from "@/components/LandingHero";
import { Navbar } from "@/components/Navbar";
import {
  Blog,
  Faq,
  Intro,
  Pricing,
  Stats,
  TechStack,
} from "@/components/Sections";
import { PlatformsGrid } from "@/components/PlatformsGrid";
import { ServicesGrid } from "@/components/ServicesGrid";
import { WorksOrbit } from "@/components/WorksOrbit";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <LandingHero />
        <TechStack />
        <Intro />
        <WorksOrbit />
        <Stats />
        <ServicesGrid />
        <PlatformsGrid />
        <Pricing />
        <ApproachBento />
        <Blog />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
