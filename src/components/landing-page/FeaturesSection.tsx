import {
  Droplet,
  Target,
  Cloud,
  Bell,
  ShieldCheck,
  BarChart3,
  type LucideIcon,
  Droplets,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from "motion/react";
import { forwardRef } from "react";
import { GradientText } from '../ui/gradient-text';
import { CustomIcon } from '../ui/custom-icon';

type FeatureItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  position?: 'left' | 'right';
  cornerStyle?: string;
};



const leftFeatures: FeatureItem[] = [
  {
    icon: Droplet,
    title: 'Qualidade de Vida',
    description: 'Melhore seus hábitos de hidratação para uma vida mais saudável e produtiva.',
    position: 'left',
    cornerStyle: 'sm:translate-x-4 sm:rounded-br-[2px]',
  },
  {
    icon: Bell,
    title: 'Alertas Personalizados',
    description: 'Receba lembretes adaptados à sua rotina para manter a hidratação ideal.',
    position: 'left',
    cornerStyle: '',
  },
  {
    icon: Target,
    title: 'Metas e Gamificação',
    description: 'Desafios, conquistas e rankings para motivar sua rotina saudável.',
    position: 'left',
    cornerStyle: 'sm:translate-x-4 sm:rounded-tr-[2px]',
  },
];

const rightFeatures: FeatureItem[] = [
  {
    icon: Cloud,
    title: 'Sincronização na Nuvem',
    description: 'Acesse seus dados de qualquer dispositivo com segurança e praticidade.',
    position: 'right',
    cornerStyle: 'sm:-translate-x-4 sm:rounded-bl-[2px]',
  },
  {
    icon: ShieldCheck,
    title: 'Privacidade e Segurança',
    description: 'Seus dados protegidos com criptografia e controle total de acesso.',
    position: 'right',
    cornerStyle: '',
  },
  {
    icon: BarChart3,
    title: 'Relatórios Detalhados',
    description: 'Acompanhe seu progresso com gráficos e estatísticas intuitivas.',
    position: 'right',
    cornerStyle: 'sm:-translate-x-4 sm:rounded-tl-[2px]',
  },
];

const FeatureCard = ({ feature }: { feature: FeatureItem }) => {
  const Icon = feature.icon;
  return (
    <motion.div
      whileHover={{
        scale: 1.04,
      }}
      className="transition-all duration-500"
    >
      <div
        className={cn(
          'relative px-4 pt-4 pb-4 text-sm ring-border ring z-20',
          'border border-black/10 dark:border-white/15 bg-white/60 dark:bg-black/35 backdrop-blur-md shadow-sm',
          feature.cornerStyle
        )}
      >
        <CustomIcon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black opacity-55" />
        <CustomIcon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black opacity-55" />
        <CustomIcon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black opacity-55" />
        <CustomIcon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black opacity-55" />

        <div className="text-azul-primario dark:text-azul-quintenario mb-3 text-[2rem] flex justify-center">
          <Icon />
        </div>
        <h2 className="text-foreground mb-2.5 text-2xl text-center font-medium">{feature.title}</h2>
        <p className="text-muted-foreground text-base text-pretty text-center">
          {feature.description}
        </p>
        <span className="from-verde-azul/10 via-azul-quaternario to-verde-azul/10 absolute -bottom-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r opacity-60"></span>
        <span className="absolute inset-0 bg-[radial-gradient(30%_5%_at_50%_100%,hsl(var(--primary)/0.15)_0%,transparent_100%)] opacity-60"></span>
      </div>
    </motion.div>
  );
};

const FeaturesSection = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <section ref={ref} className="pb-8 z-10" id="features">
      <div className="mx-6 max-w-[1280px] pt-2 max-[300px]:mx-4 min-[1150px]:mx-auto">
        <div className="flex flex-col-reverse gap-6 md:grid md:grid-cols-3">
          {/* Coluna esquerda */}
          <div className="flex flex-col gap-6">
            {leftFeatures.map((feature, index) => (
              <FeatureCard key={`left-feature-${index}`} feature={feature} />
            ))}
          </div>
          {/* Coluna central */}
          <div className="order-[1] mb-6 self-center sm:order-[0] md:mb-0">
        <div className="text-center pt-8 md:pt-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-absolute-white dark:bg-black/40 backdrop-blur px-4 py-1 my-4 text-xs font-medium">
            <Droplets size={14} className="text-azul-primario dark:text-azul-quintenario" />
            Features
          </span>
              <span className="from-primary/0 via-primary to-primary/0 absolute -bottom-px left-1/2 h-px w-2/5 -translate-x-1/2 bg-gradient-to-r"></span>
            </div>
            <h2 className="text-foreground mb-2 text-center text-2xl sm:mb-2.5 md:text-[2rem] font-semibold">
              Principais características do  
              <GradientText className='font-bold'> AquaLink</GradientText>
            </h2>
            <p className="text-muted-foreground mx-auto max-w-[22rem] text-center text-pretty">
              Descubra como o AquaLink transforma sua rotina de hidratação com tecnologia, segurança e motivação.
            </p>
          </div>
          {/* Coluna direita */}
          <div className="flex flex-col gap-6">
            {rightFeatures.map((feature, index) => (
              <FeatureCard key={`right-feature-${index}`} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export { FeaturesSection };