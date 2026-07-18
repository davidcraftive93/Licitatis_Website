import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Audiences } from "@/components/sections/Audiences";
import { Comparison } from "@/components/sections/Comparison";
import { Security } from "@/components/sections/Security";
import { Faq } from "@/components/sections/Faq";
import { DemoSection } from "@/components/sections/DemoSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { faqLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Problem />
      <Solution />
      <Features />
      <HowItWorks />
      <Audiences />
      <Comparison />
      <Security />
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
