import { Hero } from "@/components/sections/Hero";
import { LogosBand } from "@/components/sections/LogosBand";
import { ValueStats } from "@/components/sections/ValueStats";
import { Problem } from "@/components/sections/Problem";
import { Spotlights } from "@/components/sections/Spotlights";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Benefits } from "@/components/sections/Benefits";
import { Audiences } from "@/components/sections/Audiences";
import { Comparison } from "@/components/sections/Comparison";
import { Plans } from "@/components/sections/Plans";
import { Security } from "@/components/sections/Security";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { DemoSection } from "@/components/sections/DemoSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { faqLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogosBand />
      <ValueStats />
      <Problem />
      <Spotlights />
      <Features />
      <HowItWorks />
      <Benefits />
      <Audiences />
      <Comparison />
      <Plans />
      <Security />
      <Testimonials />
      <Faq />
      <DemoSection />
      <FinalCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd()) }}
      />
    </>
  );
}
