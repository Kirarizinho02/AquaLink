import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  aqualink_169_man,
  aqualink_169_marble,
  aqualink_169_table,
} from "@/assets";

const slides = [
  { img: aqualink_169_man,    title: "AquaLink Classic",          subtitle: "Hidratação inteligente, simples e conectada ao seu dia." },
  { img: aqualink_169_marble, title: "Sua hidratação facilitada", subtitle: "Lembretes, metas e insights no app AquaLink." },
  { img: aqualink_169_table,  title: "Entre na lista de espera",  subtitle: "Seja avisado quando as vendas iniciarem." },
];

const AUTO_DELAY = 5000; 

const HeroShop = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selected, setSelected] = useState(0);
  const [progress, setProgress] = useState(0); 
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const pausedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setSelected(api.selectedScrollSnap());
      startRef.current = performance.now();
      setProgress(0);
    };
    api.on("select", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    const tick = (t: number) => {
      if (!pausedRef.current) {
        const elapsed = t - startRef.current;
        const p = Math.min(1, elapsed / AUTO_DELAY);
        setProgress(p);
        if (p >= 1) {
          api?.scrollNext();
          startRef.current = t;
          setProgress(0);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    startRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [api]);

  const handleGoTo = (idx: number) => {
    api?.scrollTo(idx);
    startRef.current = performance.now();
    setProgress(0);
  };

  const onMouseEnter = () => {
    pausedRef.current = true;
  };
  const onMouseLeave = () => {
    pausedRef.current = false;
    startRef.current = performance.now() - progress * AUTO_DELAY;
  };
  const onPointerDown = () => {
    pausedRef.current = true;
  };
  const onPointerUp = () => {
    pausedRef.current = false;
    startRef.current = performance.now() - progress * AUTO_DELAY;
  };

  return (
    <section className="container mx-auto max-w-7xl px-6 pt-4">
      <Carousel
        className="w-full"
        opts={{ loop: true, align: "start", containScroll: "trimSnaps" }}
        setApi={setApi}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <CarouselContent>
          {slides.map((s, i) => (
            <CarouselItem key={i}>
              <div className="relative w-full overflow-hidden rounded-2xl border border-white/15 bg-black/10">
                <div className="aspect-[16/9] md:aspect-[16/9] w-full">
                  <div
                    className="h-full w-full bg-center bg-cover"
                    style={{ backgroundImage: `url(${s.img})` }}
                    role="img"
                    aria-label={s.title}
                  />
                </div>

                {/* Gradiente inferior para legibilidade */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Foreground: texto + botão (levantado para abrir espaço às barras) */}
                <div className="absolute left-4 right-4 bottom-11 md:left-6">
                  <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold drop-shadow">
                    {s.title}
                  </h2>
                  <p className="mt-1 text-white/90 text-sm sm:text-base max-w-xl drop-shadow">
                    {s.subtitle}
                  </p>
                  <div className="mt-3">
                    <Button
                      asChild
                      className="rounded-full bg-gradient-to-r from-verde-accent to-verde-azul text-black"
                    >
                      <Link to="/shop/aqualink-classic?highlight=waitlist">
                        Saiba mais
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute left-4 bottom-4 md:left-6 md:bottom-6 z-10 flex gap-2">
          {slides.map((_, idx) => {
            const isCurrent = idx === selected;
            return (
              <span
                key={idx}
                role="button"
                tabIndex={0}
                aria-label={`Ir para slide ${idx + 1}`}
                onClick={() => handleGoTo(idx)}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && handleGoTo(idx)
                }
                className="relative block h-1 w-16 md:w-24 cursor-pointer rounded bg-white/50 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <span
                  className="pointer-events-none absolute left-0 top-0 h-full w-full bg-white transition-[transform] duration-120 ease-linear"
                  style={{
                    transformOrigin: "left center",
                    transform: `scaleX(${isCurrent ? progress : 0})`,
                    willChange: "transform",
                  }}
                />
              </span>
            );
          })}
        </div>
      </Carousel>
    </section>
  );
};

export { HeroShop };
