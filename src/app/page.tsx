import { Hero } from "@/components/sections/Hero";
import { ValueStats } from "@/components/sections/ValueStats";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Passport } from "@/components/sections/Passport";
import { Features } from "@/components/sections/Features";
import { WhyNotSearch } from "@/components/sections/WhyNotSearch";
import { DualAudience } from "@/components/sections/DualAudience";
import { Privacy } from "@/components/sections/Privacy";
import { Plans } from "@/components/sections/Plans";
import { BetaPartner } from "@/components/sections/BetaPartner";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { faqLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueStats />
      <ProblemSolution />
      <HowItWorks />
      <Passport />
      <Features />
      <WhyNotSearch />
      <DualAudience />
      <Privacy />
      <Plans />
      <BetaPartner />
      <Faq />
      <FinalCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd()) }}
      />
    </>
  );
}
