/* eslint-disable @typescript-eslint/no-explicit-any */
import { Canvas, useFrame } from "@react-three/fiber";
import { Model } from "../model/Model";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Droplet, ShieldCheck, BarChart3 } from "lucide-react";
import { CustomIcon } from "../ui/custom-icon";
import { GradientText } from "../ui/gradient-text";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "../ui/carousel";

function RotatingModel() {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    if (!group.current) return;
    group.current.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, []);

  useFrame((_, delta) => {
    if (group.current && !hovered) {
      group.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group
      ref={group}
      rotation={[0.1, -0.5, 0]}
      scale={2.6}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Model />
    </group>
  );
}

function BottleLights() {
  const spot = useRef<THREE.SpotLight>(null);
  const target = useRef<THREE.Object3D>(null);
  useEffect(() => {
    if (spot.current && target.current) {
      spot.current.target = target.current;
    }
  }, []);
  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[-3, 2, 3]} intensity={0.6} />
      {/* Spotlight principal apontando para o centro da garrafa (0,0,0) */}
      <spotLight
        ref={spot}
        position={[2.5, 5, 6]}
        angle={Math.PI / 4}
        penumbra={0.5}
        intensity={6}     
        distance={0}      
        decay={1}
        castShadow
        shadow-bias={-0.0002}
        shadow-mapSize={[1024, 1024]}
      />
      {/* Target do spotlight no centro da cena (garrafa) */}
      <object3D ref={target} position={[0, 0, 0]} />
    </>
  );
}

const qualities = [
  {
    icon: Droplet,
    title: "Ecossistema Unificado",
    description: "Sensores monitoram seu consumo e ajustam lembretes automaticamente.",
  },
  {
    icon: ShieldCheck,
    title: "Durável e Segura",
    description: "Materiais de alta qualidade, livres de BPA e com vedação perfeita.",
  },
  {
    icon: BarChart3,
    title: "Insights Claros",
    description: "Relatórios e metas que ajudam você a manter a constância.",
  },
];

const MockSection = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setSelectedIndex(carouselApi.selectedScrollSnap());
    carouselApi.on("select", onSelect);
    onSelect();
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  return (
    <section className="relative py-14 md:py-16 lg:pb-20 container mx-auto">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Título da seção */}
        <header className="mb-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground text-left mb-1">
            Conheça a garrafa:
          </h2>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-left"><GradientText> AquaLink Classic </GradientText></h2>
          <p className="mt-2 md:mt-3 max-w-2xl text-muted-foreground">
            O Aqualink Classic é o que torna o projeto único. Combinando design elegante e praticidade, descubra um pouco mais sobre a garrafa que vai <span className="font-bold"> transformar </span>sua rotina de hidratação.
          </p>
        </header>
        <div className="relative grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 items-start z-10">
          {/* Metade esquerda */}
          <div
            className="z-20 h-full relative rounded-2xl bg-white/60 dark:bg-black/30 backdrop-blur-lg border border-white/25 dark:border-black/30 overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(80%_60%_at_20%_20%,rgba(255,255,255,0.25),transparent_70%)] dark:bg-[radial-gradient(80%_60%_at_20%_20%,rgba(255,255,255,0.12),transparent_70%)]" />
            <div className="p-5 pb-0">
              <h3 className="text-lg font-bold text-foreground"> AquaLink Classic</h3>
              <p className="text-sm text-muted-foreground">Conectada, precisa e feita para o seu dia a dia.</p>
            </div>
            <div className="relative h-[320px] md:h-[360px] lg:h-[500px] my-6">
              <Canvas
                className="!block"
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 0, 4], fov: 40 }}
              >
               <ambientLight intensity={0.15} />
               <spotLight
                 position={[2.5, 5.5, 6]}
                 angle={Math.PI / 5}
                 penumbra={0.35}
                 distance={25}
                 intensity={1}
                 decay={2}
               />
                <BottleLights />
                 <group position={[0, 0, 0]}>
                   <RotatingModel />
                 </group>
              </Canvas>
            </div>
          </div>

          <div className="w-full">
            <div className="block lg:hidden">
              <Carousel
                setApi={setCarouselApi}
                plugins={[
                  Autoplay({
                    delay: 3500,
                    stopOnInteraction: false,
                  }),
                ]}
                className="mx-auto"
              >
                <CarouselContent>
                  {qualities.map((q) => {
                    const Ico = q.icon;
                    return (
                      <CarouselItem key={q.title}>
                        <div className="relative bg-azul-terciario border border-white/20 dark:border-white/30 p-5 text-white rounded">
                          <CustomIcon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black opacity-55" />
                          <CustomIcon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black opacity-55" />
                          <CustomIcon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black opacity-55" />
                          <CustomIcon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black opacity-55" />
                          <div className="flex items-start gap-3">
                            <span className="inline-flex items-center justify-center h-10 w-15 rounded-full bg-gray-200 text-azul-primario">
                              <Ico size={18} />
                            </span>
                            <div>
                              <h4 className="text-base md:text-lg font-semibold text-white">{q.title}</h4>
                              <p className="text-sm text-white/85 mt-1">{q.description}</p>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
              </Carousel>
              <div className="flex justify-center gap-3 mt-4">
                {qualities.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Ir para qualidade ${idx + 1}`}
                    className={`w-2 h-2 rounded-full transition-all border-2 ${
                      selectedIndex === idx
                        ? "bg-azul-primario border-azul-primario"
                        : "bg-white"
                    }`}
                    onClick={() => carouselApi && carouselApi.scrollTo(idx)}
                  />
                ))}
              </div>
            </div>
            <div className="hidden lg:flex flex-col gap-6">
              {qualities.map((q) => {
                const Ico = q.icon;
                return (
                  <div
                    key={q.title}
                    className="relative bg-azul-terciario border border-white/20 dark:border-white/30 p-5 text-white rounded"
                  >
                    <CustomIcon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black opacity-55" />
                    <CustomIcon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black opacity-55" />
                    <CustomIcon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black opacity-55" />
                    <CustomIcon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black opacity-55" />
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-azul-primario">
                        <Ico size={18} />
                      </span>
                      <div>
                        <h4 className="text-base md:text-lg font-semibold text-white">{q.title}</h4>
                        <p className="text-sm text-white/85 mt-1">{q.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { MockSection };