/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState, type ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aqualink_daily } from "@/assets";
import { AlarmClock, Droplet, Activity, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Idea = {
  icon: ComponentType<any>;
  title: string;
  desc: string;
};

const ideas: Idea[] = [
  { icon: AlarmClock, title: "Lembretes que encaixam no seu dia", desc: "Programe alertas suaves para treinos, reuniões ou pausas rápidas." },
  { icon: Droplet,    title: "Meta de hidratação dinâmica",       desc: "Ajuste automático com base na sua rotina e temperatura do ambiente." },
  { icon: Activity,   title: "Integração com atividades",         desc: "Sincronize com apps de treino e receba recomendações em tempo real." },
  { icon: Flame,      title: "Recuperação acelerada",             desc: "Reponha líquidos após yoga, corrida ou academia com metas inteligentes." },
];

const routineChips = ["07:00", "09:30", "12:00", "16:00", "20:30"];

const EasyHydrationSection = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % ideas.length), 3600);
    return () => clearInterval(t);
  }, []);

  const IdeaIcon = ideas[idx].icon;

  const navigate = useNavigate();

  return (
    <section className="container mx-auto max-w-7xl px-6 py-2 md:py-10">
      <div className="grid items-stretch gap-8 md:gap-10 lg:gap-12 lg:grid-cols-2">
        {/* Esquerda: título + subtítulo + ideias */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
            Hidratação que acompanha sua rotina
          </h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-prose">
            Do estúdio de pilates ao escritório: a AquaLink lembra, ajusta metas e registra tudo para você se hidratar sem esforço.
          </p>

          {/* Ideias dinâmicas embaixo */}
          <div className="mt-6">
            <div className="rounded-xl border border-white/15 bg-white/60 dark:bg-black/35 backdrop-blur-md p-4 md:p-5 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                  className="flex items-start gap-3"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-azul-secundario/90 text-white dark:bg-azul-secundario/90">
                    <IdeaIcon size={18} />
                  </span>
                  <div>
                    <h3 className="text-foreground text-lg font-semibold">{ideas[idx].title}</h3>
                    <p className="text-muted-foreground mt-1 text-sm md:text-base">{ideas[idx].desc}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Lista das demais ideias (mostra todas para contexto, destaca a ativa) */}
              <ul className="mt-4 space-y-2">
                {ideas.map((it, i) => {
                  if (i === idx) return null;
                  const Icon = it.icon;
                  return (
                    <li key={it.title} className="flex items-start gap-2 text-sm">
                      <span className="mt-1 inline-flex h-6 w-12 md:h-6 md:w-6 items-center justify-center rounded-full border border-white/20 bg-white/40 dark:bg-white/10">
                        <Icon size={14} />
                      </span>
                      <div className="text-foreground/90">
                        <span className="font-medium">{it.title}</span>
                        <span className="text-muted-foreground"> — {it.desc}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Chips de rotina */}
              <div className="mt-4 flex flex-wrap gap-2">
                {routineChips.map((t, i) => {
                  const active = i === (idx % routineChips.length);
                  return (
                    <span
                      key={t}
                      className={[
                        "px-2.5 py-1 rounded-full text-xs border backdrop-blur",
                        active ? "bg-azul-secundario text-white border-white/60" : "bg-white/15 text-foreground/90 border-white/30",
                      ].join(" ")}
                    >
                      {t}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Direita: foto vertical + notificações */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/10">
            <div
              className="w-full min-h-[520px] md:min-h-[640px] lg:min-h-[760px] bg-center bg-cover cursor-pointer"
              style={{ backgroundImage: `url(${aqualink_daily})` }}
              aria-label="AquaLink no dia a dia (pilates)"
              role="img"
              onClick={() => navigate("/shop/aqualink-classic")}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
          </div>

          {/* Notificações flutuantes */}
          <motion.div
            className="absolute right-3 top-3 md:right-5 md:top-5"
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-lg border border-white/20 bg-white/70 dark:bg-black/35 backdrop-blur-md px-3 py-2 text-xs text-foreground shadow">
              Meta de hoje: 2.2L
            </div>
          </motion.div>
          <motion.div
            className="absolute right-3 top-16 md:right-8"
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="rounded-lg border border-white/20 bg-white/70 dark:bg-black/35 backdrop-blur-md px-3 py-2 text-xs text-foreground shadow">
              Próximo lembrete em 15 min
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { EasyHydrationSection };