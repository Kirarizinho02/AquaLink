import { EasyHydrationSection, HeroShop, MarqueeSection, ProductsSection } from "@/components";
import { usePageTitle } from "@/hooks";

const Shop = () => {
    usePageTitle("Loja | AquaLink");

  return (
    <>
      <HeroShop />
      <section
        className="w-[90%] md:w-full md:max-w-[760px] lg:max-w-[1240px] mx-auto px-4 py-4 mt-4 bg-azul-preto rounded-lg"
      >
        <h2 className="text-lg font-bold text-white text-center">
          Prepare-se para revolucionar sua hidratação!
        </h2>
      </section>
      <EasyHydrationSection />
      <MarqueeSection />
      <ProductsSection />
    </>
  );
};

export { Shop };
