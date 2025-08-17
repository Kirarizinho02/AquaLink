import { useRef, useEffect } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";

import { ArrowRight, Sparkles } from "lucide-react";

import {
  aqualink_garrafa_app,
  background_squares,
  group_square,
} from "@/assets";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <>
      <div
        ref={heroRef}
        className="relative min-h-screen w-full overflow-hidden py-8"
      >
        <motion.div
          className="relative z-10 container mx-auto max-w-7xl mt-6 md:mt-0"
          style={{ y: contentY }}
        >
          <div className="grid items-center lg:gap-6 xl:gap-28 md:grid-cols-2 xs:grid-cols-1">
              <motion.img
                src={background_squares}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ duration: 1.2 }}
                className="absolute top-[80px] left-[-40px] -z-10 mix-blend-multiply pointer-events-none select-none ps-14 xl:ps-0 hidden lg:block"
                aria-hidden="true"
              />
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.7,
                    staggerChildren: 0.2,
                  },
                },
              }}
              initial="hidden"
              animate={controls}
              className="flex flex-col items-center content-center text-center lg:text-left max-w-screen xs:max-w-none h-full justify-center"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 0 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <h2 className="text-foreground mb-6 text-3xl sm:text-4xl leading-tight font-bold tracking-tight md:text-4xl lg:text-5xl px-6">
                  Experimente o <GradientText>AquaLink</GradientText>, sua nova
                  plataforma de{" "}
                  <GradientText>hidratação inteligente</GradientText>
                </h2>
              </motion.div>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 0 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-muted-foreground mb-8 text-lg leading-relaxed px-6 text-wrap"
              >
                AquaLink une tecnologia e saúde em uma só garrafa, conectando
                você ao seu consumo diário de água.
                <span className="text-foreground font-semibold">
                  {" "}
                  Mais controle. Mais saúde. Mais você.
                </span>
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex flex-wrap justify-center gap-4 lg:justify-start w-full px-6 items-center"
              >
                <motion.div
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Button className="backdrop-blur-2xl cursor-pointer relative rounded-full border-azul-quaternario border-1 hover:bg-gradient-to-r bg-gradient-to-r from-verde-accent/25 to-verde-azul/90 hover:from-verde-accent/30 hover:to-verde-azul/90 text-black w-60 h-12">
                    Garanta o Seu!
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <div className="bg-background/50 absolute inset-0 -z-10 rounded-full backdrop-blur-sm"></div>
                  <Button
                    variant="outline"
                    className="border-primary/20 hover:border-primary/30 hover:bg-primary/5 rounded-full backdrop-blur-sm transition-all duration-300 cursor-pointer w-40 text-black/90 hover:text-black"
                  >
                    Descubra Mais <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start w-full px-6"
              >
                {["Moderno e inteligente", "Bluetooth", "Personalizável"].map(
                  (feature) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="text-foreground relative rounded-full px-4 py-1.5 text-sm font-medium shadow-sm"
                    >
                      <div className="border-azul-quaternario/40 absolute inset-0 rounded-full border-1 bg-background/50 dark:border-white/5"></div>
                      <div className="via-azul-primario/30 dark:via-primary/30 absolute bottom-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r"></div>

                      <span className="relative z-10 text-foreground/95">{feature}</span>
                    </motion.div>
                  )
                )}
              </motion.div>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 1.2,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              className="w-full items-center"
            >
              <img 
                src={group_square} 
                className="absolute left-3/5 -z-10 opacity-26 pointer-events-none select-none"
                />
              <img
                src={aqualink_garrafa_app}
                className="relative z-10 lg:max-w-[500px] max-w-[400px] w-full mx-auto drop-shadow-xl drop-shadow-black"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
export { HeroSection };
