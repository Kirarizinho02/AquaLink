import { motion, useScroll, useTransform } from "framer-motion";

const AnimatedLineSVG = ({ targetRef }: { targetRef: React.RefObject<HTMLElement | null> | undefined }) => {
  // Controla o progresso do scroll relativo à FeaturesSection
  const { scrollYProgress } = useScroll({
    target: targetRef ?? undefined,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="absolute w-full left-0 top-0 pointer-events-none z-0 opacity-0 lg:opacity-100">
      <svg
        width="1440"
        height="2200"
        viewBox="0 0 1440 2200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <motion.path
          d="M0.5 191C0.5 191 1311 -237 1449 191C1587 619 295.5 493.5 160.5 1003.5C25.5 1513.5 1131.5 2082 1256 1693C1380.5 1304 265.5 1567.5 160.5 1906C55.5 2244.5 788.5 2534 788.5 2534"
          stroke="var(--color-azul-primario)"
          strokeWidth={6}
          style={{ pathLength }}
          initial={{ pathLength: 0 }}
        />
      </svg>
    </div>
  );
};




export { AnimatedLineSVG };