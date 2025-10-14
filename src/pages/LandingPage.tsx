import { FeaturesSection, HeroSection } from "@/components";
import { usePageTitle } from "@/hooks";
import { Droplets } from "lucide-react";

const LandingPage = () => {
  usePageTitle("AquaLink");

  return (
    <>
      <HeroSection />

      <div id="features" className="mx-auto px-6 md:px-10 lg:px-16 z-10 relative">
        <div className="text-center pt-8 md:pt-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-absolute-white dark:bg-black/40 backdrop-blur px-3 py-1 text-xs font-medium">
            <Droplets size={14} className="text-azul-primario dark:text-azul-quintenario" />
            Features
          </span>
          <h2 className="mt-4 text-2xl md:text-4xl font-bold text-foreground">
            Explore as features do AquaLink
          </h2>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Hidratação inteligente, gamificação envolvente e sincronização na nuvem
            — tudo em um só lugar.
          </p>
        </div>
      </div>

      <FeaturesSection />
    </>
  );
};

export { LandingPage };
