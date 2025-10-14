import { 
  Droplet, 
  Target, 
  Cloud as CloudIcon 
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, AnimatePresence } from "motion/react";
import { Noise } from "@/components/ui/noise";
import "@/css/pagescss/_landingpage.css";

type Feature = {
  key: string;
  title: string;
  // description longa: painel da direita
  description: string;
  // descrição curta: aparece no card da esquerda
  cardDescription: string;
  Icon: React.ComponentType<{ size?: number }>;
  details: string[];
};

const features: Feature[] = [
  {
    key: "hydration",
    title: "Hidratação inteligente",
    cardDescription: "Monitore seu consumo e receba lembretes adaptáveis.",
    description:
      "Acompanhe seu consumo de água em tempo real com uma experiência intuitiva e adaptável. O sistema monitora seus hábitos e ajusta lembretes automaticamente para garantir que você atinja suas metas diárias. Além disso, relatórios claros ajudam a visualizar seu progresso e compreender melhor sua rotina de hidratação.",
    Icon: Droplet,
    details: [
      "Alertas personalizáveis ao longo do dia",
      "Metas diárias conforme seu perfil",
      "Relatórios claros de desempenho",
    ],
  },
  {
    key: "goals",
    title: "Metas e gamificação",
    cardDescription: "Desafios e badges para manter a motivação alta.",
    description:
      "Transforme o simples ato de beber água em um desafio divertido e motivador. Conquiste badges, participe de rankings e complete desafios semanais que incentivam constância e superação. Cada conquista reflete sua evolução, tornando o cuidado com a saúde algo leve, recompensador e contínuo.",
    Icon: Target,
    details: [
      "Desafios semanais e mensais",
      "Badges por consistência",
      "Rankings entre amigos",
    ],
  },
  {
    key: "cloud",
    title: "Sincronização na nuvem",
    cardDescription: "Dados seguros, sempre disponíveis em qualquer dispositivo.",
    description:
      "Tenha seus dados sempre seguros, atualizados e disponíveis em qualquer dispositivo. Com sincronização automática em nuvem, você pode acompanhar seu progresso de onde estiver, sem se preocupar com perda de informações. Tudo isso com protocolos de segurança avançados para garantir a privacidade de suas informações.",
    Icon: CloudIcon,
    details: [
      "Backup automático em tempo real",
      "Sincronização multi-dispositivo",
      "Privacidade e segurança dos dados",
    ],
  },
];

function StepCard({ feature, isActive }: { feature: Feature; isActive: boolean }) {
  const base =
    "relative rounded-xl overflow-hidden shadow-sm transition-colors duration-300 flex flex-col p-4 text-white border";
  const activeClasses = "bg-azul-terciario dark:bg-azul-quaternario dark:border-white/40 border-black/20";
  const inactiveClasses = "bg-azul-preto dark:bg-azul-primario dark:border-white/20 border-black/10";

  return (
    <div
      className={`${base} ${isActive ? activeClasses : inactiveClasses}`}
      aria-current={isActive ? "true" : "false"}
      style={{
        backgroundImage: isActive
          ? "radial-gradient(88% 100% at top, rgba(255, 255, 255, 0.19), rgba(255,255,255,0))"
          : "radial-gradient(88% 100% at top, rgba(255,255,255,0.08), rgba(255,255,255,0))",
      }}
    >
      <Noise />

      {/* Conteúdo */}
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white">
            <feature.Icon size={16} />
          </span>
        </div>
        <div className="mt-6">
          <h3 className="lg:text-2xl md:text-xl  font-semibold text-white mb-1">
            {feature.title}
          </h3>
          {/* descrição curta no card */}
          <p className="text-md md:text-xs text-white/85">
            {feature.cardDescription}
          </p>
        </div>
      </div>
    </div>
  );
}


// Empilha os cards no mobile: ativo na frente, demais atrás
function MobileCardStack({
  features,
  activeIndex,
}: {
  features: Feature[];
  activeIndex: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  // Observa a altura do card ativo e ajusta o container
  useEffect(() => {
    const el = activeRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const h = entries[0]?.contentRect.height ?? 0;
      // adiciona um pequeno offset para as camadas de trás
      setHeight(h + 24);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [activeIndex]);

  const n = features.length;
  const nextIdx = (activeIndex + 1) % n;
  const nextNextIdx = (activeIndex + 2) % n;

  const layers = [
    { idx: nextNextIdx, top: 20, scale: 0.94, opacity: 0.55, z: 1 },
    { idx: nextIdx, top: 10, scale: 0.97, opacity: 0.75, z: 2 },
  ];

  return (
    <div ref={containerRef} className="relative w-full" style={{ height }}>
      {/* Camadas de trás (inativos) */}
      {layers.map((l) => (
        <motion.div
          key={`inactive-${l.idx}`}
          className="absolute inset-x-0"
          style={{ top: l.top, zIndex: l.z }}
          animate={{ top: l.top, scale: l.scale, opacity: l.opacity }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          aria-hidden
        >
          <StepCard feature={features[l.idx]} isActive={false} />
        </motion.div>
      ))}

      {/* Card ativo na frente */}
      <motion.div
        ref={activeRef}
        className="absolute inset-x-0"
        style={{ zIndex: 3 }}
        animate={{ top: 0, scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
      >
        <StepCard feature={features[activeIndex]} isActive />
      </motion.div>
    </div>
  );
}

const FeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const pinRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const steps = features.length;
      const idx = Math.min(steps - 1, Math.max(0, Math.floor(v * steps + 0.0001)));
      setActiveIndex(idx);
    });
    return () => unsub();
  }, [scrollYProgress]);

  const activeFeature = useMemo(() => features[activeIndex], [activeIndex]);

  return (
    <section className="mx-auto rounded-2xl px-6 md:px-10 lg:px-16 relative -mt-36 ">
      <div ref={pinRef} style={{ height: `calc(${features.length} * 110vh)` }} className="relative">
        <div className="sticky top-0 h-screen flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 w-full items-start">
            <div className="flex flex-col gap-6">
              {/* Mobile: stack (mostra apenas ativo na frente; os outros atrás) */}
              <div className="md:hidden">
                <MobileCardStack features={features} activeIndex={activeIndex} />
              </div>

              {/* md+: lista contínua com ativo em destaque */}
              <div className="hidden md:flex md:flex-col md:gap-6">
                {features.map((f, i) => (
                  <StepCard key={f.key} feature={f} isActive={i === activeIndex} />
                ))}
              </div>
            </div>

            <aside className="self-start">
              <div className="rounded-2xl backdrop-blur p-6 md:p-8 md:pt-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`details-${activeFeature.key}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.22 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full text-white bg-azul-terciario px-2.5">
                        <activeFeature.Icon size={16} />
                      </span>
                      <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        {activeFeature.title}
                      </h2>
                    </div>
                    <hr className="my-4 bg-azul-terciario dark:bg-azul-quaternario" />
                    {/* descrição longa no painel */}
                    <p className="lg:text-lg md:text-base text-zinc-700 dark:text-zinc-300 mb-4">
                      {activeFeature.description}
                    </p>
                    <ul className="space-y-2">
                      {activeFeature.details.map((d) => (
                        <li key={d} className="text-md text-zinc-700 dark:text-zinc-300 flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-azul-quaternario dark:bg-azul-quintenario inline-block" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export { FeaturesSection };