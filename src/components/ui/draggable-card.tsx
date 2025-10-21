"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useAnimationControls,
} from "motion/react";

export const DraggableCardBody = ({
  className,
  children,
  variant = "default",
  glareMax,
  autoReturnDelayMs = 1800, 
  autoReturnStiffness = 55,
  autoReturnDamping = 18,
}: {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "pill";
  glareMax?: number;
  autoReturnDelayMs?: number;
  autoReturnStiffness?: number;
  autoReturnDamping?: number;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useMotionValue(0); 
  const y = useMotionValue(0); 
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const [constraints, setConstraints] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });
  const resetTimer = useRef<number | undefined>(undefined);

  const springConfig = {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  };

  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [25, -25]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-25, 25]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.8, 1, 0.8]),
    springConfig,
  );

  const maxGlare = glareMax ?? (variant === "pill" ? 0.12 : 0.2);
  const glareOpacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [maxGlare, 0, maxGlare]),
    springConfig,
  );

  useEffect(() => {
    const updateConstraints = () => {
      if (typeof window !== "undefined") {
        setConstraints({
          top: -window.innerHeight / 2,
          left: -window.innerWidth / 2,
          right: window.innerWidth / 2,
          bottom: window.innerHeight / 2,
        });
      }
    };
    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = cardRef.current?.getBoundingClientRect() ?? {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    mouseX.set(clientX - centerX);
    mouseY.set(clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scheduleAutoReturn = () => {
    if (resetTimer.current) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => {
      animate(x, 0, {
        type: "spring",
        stiffness: autoReturnStiffness,
        damping: autoReturnDamping,
      });
      animate(y, 0, {
        type: "spring",
        stiffness: autoReturnStiffness,
        damping: autoReturnDamping,
      });
    }, autoReturnDelayMs);
  };

  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={constraints}
      dragElastic={0.1}
      style={{ x, y, rotateX, rotateY, opacity, willChange: "transform" }} 
      animate={controls}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onDragStart={() => {
        document.body.style.cursor = "grabbing";
        if (resetTimer.current) window.clearTimeout(resetTimer.current);
        animate(x, x.get(), { duration: 0 });
        animate(y, y.get(), { duration: 0 });
      }}
      onDragEnd={() => {
        document.body.style.cursor = "default";
        controls.start({
          rotateX: 0,
          rotateY: 0,
          transition: { type: "spring", ...springConfig },
        });
        scheduleAutoReturn(); 
      }}
      className={cn(
        variant === "default"
          ? "relative min-h-96 w-80 overflow-hidden rounded-md bg-neutral-100 p-6 shadow-2xl transform-3d dark:bg-neutral-900"
          : "relative overflow-hidden rounded-xl transform-3d",
        className,
      )}
    >
      {children}
      <motion.div
        style={{ opacity: glareOpacity }}
        className="pointer-events-none absolute inset-0 bg-white select-none"
      />
    </motion.div>
  );
};

export const DraggableCardContainer = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return <div className={cn("[perspective:3000px]", className)}>{children}</div>;
};
