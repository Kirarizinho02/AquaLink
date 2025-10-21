import { cn } from "@/lib/utils";

const GradientText = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <span
      className={cn(
        "from-azul-secundario via-azul-quaternario to-verde-azul bg-gradient-to-r bg-clip-text text-transparent dark:from-azul-quaternario dark:via-azul-quintenario dark:to-verde-azul",
        className
      )}
    >
      {children}
    </span>
  );

export { GradientText };