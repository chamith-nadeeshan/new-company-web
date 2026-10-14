import { ApproachBento } from "@/components/ApproachBento";
import { Footer } from "@/components/Footer";
import { DigitalHero } from "@/components/DigitalHero";
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
import { ProductReveal } from "@/components/ProductReveal";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ServicesMarquee } from "@/components/ServicesMarquee";
import { WorksOrbit } from "@/components/WorksOrbit";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <DigitalHero />
        
        <TechStack />
        <Intro />
        {/* <ProductReveal /> */}
        <WorksOrbit />
        <Stats />
       
        <ServicesGrid />
        <PlatformsGrid />
         <ServicesMarquee />
        {/* <Pricing /> */}
        <ApproachBento />
        {/* <Blog /> */}
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
