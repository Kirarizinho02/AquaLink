import { Link } from "react-router-dom";
import { aqualink_standing } from "@/assets";
import { cn } from "@/lib/utils";
import { GradientText } from "@/components/ui/gradient-text";

type Product = {
  title: string;
  price: string;
  image?: string;
  href?: string;
  available: boolean;
  subtitle?: string;
};

const products: Product[] = [
  {
    title: "AquaLink Classic",
    price: "R$ —",
    image: aqualink_standing,
    href: "/shop/aqualink-classic",
    available: true,
    subtitle: "Dia-a-Dia",
  },
  { title: "To be announced", price: "A definir", available: false, subtitle: "Dia-a-Dia" },
  { title: "To be announced", price: "A definir", available: false, subtitle: "Dia-a-Dia" },
  { title: "To be announced", price: "A definir", available: false, subtitle: "Dia-a-Dia" },
];

function CardVisual({ p }: { p: Product }) {
  return (
    <div
      className={cn(
        "group relative flex h-full w-full overflow-hidden rounded-2xl border p-3",
        "border-white/15 bg-white/60 dark:bg-black/35 backdrop-blur-md shadow-sm"
      )}
    >
      <div className="aspect-[4/5] w-full overflow-hidden rounded-xl grid place-items-center bg-background">
        {p.available && p.image ? (
          <img
            src={p.image}
            alt={p.title}
            className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-[1.06]"
            loading="lazy"
          />
        ) : (
          <div className="relative h-full w-full rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.06] via-foreground/[0.02] to-transparent" />
            <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.22)_25%,rgba(255,255,255,0)_55%)] bg-[length:200%_100%]" />
            <div className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-white/60 dark:bg-white/10 px-2 py-1 text-[10px] tracking-wide">
              EM BREVE
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductItem({ p }: { p: Product }) {
  const content = (
    <>
      <CardVisual p={p} />
      <div className="mt-3">
        <h3 className="text-sm md:text-base font-medium text-foreground text-left">{p.title}</h3>
        <p className="text-xs md:text-sm text-muted-foreground text-left mt-1">
          {p.subtitle ?? "Dia-a-Dia"}
        </p>
        <p className={cn("text-sm md:text-base text-left mt-1", p.available ? "text-foreground" : "text-muted-foreground")}>
          {p.price}
        </p>
      </div>
    </>
  );

  return p.available && p.href ? (
    <Link to={p.href} aria-label={`Ver ${p.title}`} className="block h-full">
      {content}
    </Link>
  ) : (
    <div className="pointer-events-none select-none opacity-90">{content}</div>
  );
}

const ProductsSection = () => {
  return (
    <section className="w-full">
      <div className="container mx-auto max-w-7xl px-6 py-6 mb-18">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
          Nossos <GradientText>produtos</GradientText>
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductItem key={i} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { ProductsSection };