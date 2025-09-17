import { HeroSection } from "@/components";
import { usePageTitle } from "@/hooks";

const LandingPage = () => {
  usePageTitle("AquaLink");

  return (
    <>
        <HeroSection />
        <div className=" w-full min-h-screen bg-blue-50">
          a
        </div>
    </>
  );
};

export { LandingPage };
