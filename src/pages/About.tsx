/* eslint-disable no-empty */

import { useRef, useEffect, useState } from "react";
import { GradientText } from "@/components/ui/gradient-text";
import {
  aqualink_mock_splash,
  bottle_png_tilted,
  logo_outline_aqualink,
} from "@/assets";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

function GlassInfoPill({
  title,
  className = "z-20",
}: {
  title: string;
  className?: string;
}) {
  return (
    <DraggableCardContainer className={className}>
      <DraggableCardBody
        variant="pill"
        className="cursor-pointer rounded-xl border border-black/10 dark:border-white/15 bg-white/60 dark:bg-black/35 backdrop-blur-md shadow-lg px-4 py-3 text-foreground/95 max-w-[220px]"
      >
        <p className="text-sm font-semibold text-center select-none">{title}</p>
      </DraggableCardBody>
    </DraggableCardContainer>
  );
}

function SectionBadge({ text }: { text: string }) {
  return (
    <div className="text-foreground relative inline-flex rounded-full px-4 py-1.5 text-sm font-medium shadow-sm">
      <div className="border-azul-quaternario/40 absolute inset-0 rounded-full border bg-background/50"></div>
      <div className="via-azul-primario/30 dark:via-white/30 absolute bottom-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r"></div>
      <span className="relative z-10 text-foreground/95 font-semibold">
        {text}
      </span>
    </div>
  );
}

function TitleSection() {
  return (
    <section className="container mx-auto max-w-7xl px-6 pt-14 md:pt-20 pb-10">
      <div className="grid place-items-center text-center">
        <h1 className="text-3xl sm:text-5xl font-bold dark:text-absolute-white">
          Sobre o <GradientText>AquaLink</GradientText>
        </h1>
        <p className="mt-3 text-base sm:text-lg dark:text-absolute-white/90 text-absolute-black/90">
          Tecnologia a favor da sua saúde: conectando você aos seus hábitos de
          hidratação.
        </p>
      </div>
    </section>
  );
}

function MissionSection() {
  const [showTip, setShowTip] = useState(false);
  const TIP_KEY = "aqualink:tip:lembretes-inteligentes:seen";

  useEffect(() => {
    try {
      const seen = localStorage.getItem(TIP_KEY);
      if (!seen) setShowTip(true);
    } catch {}
  }, []);

  const dismissTip = () => {
    if (!showTip) return;
    setShowTip(false);
    try {
      localStorage.setItem(TIP_KEY, "1");
    } catch {}
  };

  return (
    <section className="container mx-auto max-w-7xl px-6 py-14">
      <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-2">
        <div className="relative w-full flex justify-center">
          <img
            src={bottle_png_tilted}
            alt="AquaLink splash"
            className="relative z-0 w-full max-w-[440px] drop-shadow-xl rounded-xl"
            loading="lazy"
          />
          <Tooltip open={showTip}>
            <TooltipTrigger asChild>
              <div
                onPointerDown={dismissTip}
                onTouchStart={dismissTip}
                onClick={dismissTip}
              >
                <GlassInfoPill
                  title="Lembretes inteligentes"
                  className="absolute -top-4 left-2 sm:left-90"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-azul-primario text-white">
              mova-me!
            </TooltipContent>
          </Tooltip>

          <GlassInfoPill
            title="Metas personalizadas"
            className="absolute top-1/3 -left-2 sm:-left-6"
          />
          <GlassInfoPill
            title="Sincronização"
            className="absolute bottom-10 right-0 sm:right-50"
          />
        </div>

        <div>
          <SectionBadge text="Missão" />
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-foreground">
            Cuidar da sua saúde com simplicidade
          </h2>
          <p className="mt-4 text-muted-foreground">
            Nossa missão é unir inovação e saúde por meio de um sistema que
            simplifica o acompanhamento da hidratação e incentiva o bem-estar
            contínuo. O AquaLink foi criado para compreender as necessidades de
            cada usuário, fornecendo informações em tempo real e estímulos
            personalizados que tornam o cuidado diário com o corpo algo natural
            e prazeroso.
          </p>
          <p className="mt-3 text-muted-foreground">
            Trabalhamos para tornar a tecnologia acessível, intuitiva e centrada
            nas pessoas. Mais do que medir o consumo de água, o AquaLink promove
            uma mudança de mentalidade — ajudando cada indivíduo a equilibrar
            seu ritmo de vida com os sinais do próprio corpo, sempre com base em
            dados confiáveis e design inteligente.
          </p>
        </div>
      </div>
    </section>
  );
}

function VisionSection() {
  return (
    <section className="container mx-auto max-w-7xl px-6 pb-16 md:pb-24">
      <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <SectionBadge text="Visão" />
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-foreground">
            Um ecossistema de bem‑estar conectado
          </h2>
          <p className="mt-4 text-muted-foreground">
            O AquaLink busca se tornar referência global em soluções
            inteligentes para o bem-estar humano, integrando tecnologia, design
            e sustentabilidade. Nossa visão é criar um ecossistema conectado em
            que cada pessoa possa compreender e aprimorar sua relação com a água
            — elemento essencial à vida — por meio de dados, interatividade e
            autoconhecimento.
          </p>
          <p className="mt-3 text-muted-foreground">
            Acreditamos em um futuro em que a tecnologia atua como ponte entre o
            corpo e o meio ambiente, promovendo hábitos mais conscientes e
            saudáveis. Queremos inspirar uma nova geração a enxergar a
            hidratação não como rotina, mas como experiência, transformando o
            simples ato de beber água em um gesto de cuidado inteligente e
            sustentável.
          </p>
        </div>

        <div className="order-1 lg:order-2 relative w-full flex justify-center">
          <img
            src={aqualink_mock_splash}
            alt="AquaLink visão"
            className="relative z-0 w-full max-w-[440px] drop-shadow-xl rounded-xl"
            loading="lazy"
          />
          <GlassInfoPill
            title="Conexões abertas"
            className="absolute top-30 right-20"
          />
          <GlassInfoPill
            title="Sustentabilidade"
            className="absolute bottom-8 right-10"
          />
          <GlassInfoPill
            title="Personalização"
            className="absolute top-8 left-2"
          />
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const [api, setApi] = useState<CarouselApi | undefined>(undefined);
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIdx(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const slides = [
    {
      key: "A1",
      title: "A — Autenticidade",
      paras: [
        "Ser autêntico é agir com transparência e coerência, assim como a água: clara, verdadeira e essencial. No AquaLink, valorizamos a honestade nas relações, nas experiências e nas soluções que entregamos. Cada escolha — do design à tecnologia — reflete nossa essência e o compromisso de fazer o certo, mesmo quando é o caminho mais desafiador.",
        "A autenticidade também está em respeitar o ritmo de cada pessoa. Queremos que o usuário se sinta livre para ser quem é, sem pressa nem pressão, vivendo uma experiência real e significativa, guiada pela confiança e pelo bem‑estar.",
      ],
    },
    {
      key: "Q",
      title: "Q — Qualidade",
      paras: [
        "A qualidade é o fio condutor de tudo o que fazemos. Assim como a pureza da água define sua força, buscamos excelência em cada detalhe — desde a precisão tecnológica até a experiência de uso. Nosso padrão é alto porque acreditamos que o cuidado começa na base: com responsabilidade, atenção e consistência.",
        "No AquaLink, qualidade também significa durabilidade emocional. Queremos que nossos produtos e serviços criem vínculos duradouros, gerando confiança e satisfação ao longo do tempo, como um ciclo de renovação constante.",
      ],
    },
    {
      key: "U",
      title: "U — União",
      paras: [
        "A união é a essência que conecta pessoas, ideias e propósitos. Acreditamos no poder da colaboração e da empatia para criar soluções verdadeiramente transformadoras. No AquaLink, cada gota conta — e cada pessoa tem um papel essencial no fluxo coletivo.",
        "Mais do que uma equipe, somos uma comunidade que cresce junto. Valorizamos o diálogo, a escuta e a co‑criação, pois sabemos que a inovação só é completa quando nasce da diversidade de perspectivas e experiências.",
      ],
    },
    {
      key: "A2",
      title: "A — Acessibilidade",
      paras: [
        "Acreditamos que o acesso à tecnologia, à informação e ao bem‑estar deve ser universal. Por isso, o AquaLink é projetado para ser inclusivo, intuitivo e adaptável, atendendo às necessidades de todos os usuários de forma justa e humana.",
        "A acessibilidade também é um compromisso com a equidade: queremos democratizar o cuidado com o corpo e com o planeta. Tornar o essencial acessível é o primeiro passo para construir um futuro mais sustentável e conectado para todos.",
      ],
    },
  ];

  const aquaLetters = ["A", "q", "u", "a"];
  const activeBySlide = [0, 1, 2, 3];

  return (
    <section className="container mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-10 md:gap-12 lg:grid-cols-2 items-start">
        {/* ESQUERDA: logo + AquaLink */}
        <div className="flex flex-col items-center lg:items-start min-w-0">
          <img
            src={logo_outline_aqualink}
            alt="Logo AquaLink outline"
            className="h-24 sm:h-28 md:h-48 w-auto mx-auto"
            loading="lazy"
          />
          <div className="mt-6 text-5xl sm:text-6xl leading-none font-[Poppins] select-none mx-auto">
            {/* Aqua (letras individuais em bold) */}
            {aquaLetters.map((ch, idx) => {
              const isActive = activeBySlide[selectedIdx] === idx;
              return (
                <span
                  key={idx}
                  className={`font-bold transition-colors ${
                    isActive ? "text-azul-secundario" : "text-foreground"
                  }`}
                >
                  {ch}
                </span>
              );
            })}
            <span className="font-extralight text-foreground">Link</span>
          </div>
          <div className="mt-3"></div>
        </div>

        {/* DIREITA: carrossel */}
        <div className="w-full min-w-0">
          <SectionBadge text="Valores" />
          <Carousel
            setApi={setApi}
            className="w-full mt-4"            // evita vazar conteúdo
            opts={{ containScroll: "trimSnaps", align: "start" }} // mantém dentro do viewport
          >
            <CarouselContent>
              {slides.map((s) => (
                <CarouselItem key={s.key}>
                  <div className="rounded-2xl border border-white/15 bg-white/60 dark:bg-black/35 backdrop-blur-md shadow-xl p-6 md:p-7 text-foreground min-h-[360px]">
                    <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                      {s.title}
                    </h3>
                    {s.paras.map((p, i) => (
                      <p key={i} className="mt-4 text-muted-foreground">
                        {p}
                      </p>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Setas ficam dentro do container em lg+ */}
            <CarouselPrevious className="hidden lg:inline-flex" />
            <CarouselNext className="hidden lg:inline-flex" />
          </Carousel>

          {/* Dots em md ou menores */}
          <div className="block lg:hidden">
            <div className="flex justify-center gap-3 mt-4">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Ir para valor ${idx + 1}`}
                  className={`w-2 h-2 rounded-full transition-all border-2 ${
                    selectedIdx === idx
                      ? "bg-azul-primario border-azul-primario"
                      : "bg-white"
                  }`}
                  onClick={() => api && api.scrollTo(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={aboutRef} className="relative w-full">
      <TitleSection />
      <MissionSection />
      <VisionSection />
      <ValuesSection />
    </div>
  );
};

export { About };
