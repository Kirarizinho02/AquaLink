import { useRef } from "react";
import { AnimatedLineSVG, CTASection, FeaturesSection, HeroSection, MockSection } from "@/components";
import { usePageTitle } from "@/hooks";

const LandingPage = () => {
  usePageTitle("AquaLink");
  const featuresRef = useRef<HTMLDivElement>(null);

  return (
    <>
        <AnimatedLineSVG targetRef={featuresRef} />
        <HeroSection />
        <FeaturesSection ref={featuresRef} />
        <MockSection />
        <CTASection />
    </>
  );
};

export { LandingPage };
