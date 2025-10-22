/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  aqualink_standing,
  aqualink_standing_green,
  aqualink_laying_png,
  aqualink_standing_open,
} from "@/assets";
import {
  useLocation,
  useNavigate,
  useSearchParams,
  Link,
} from "react-router-dom";
import { usePageTitle } from "@/hooks";
import { auth, firestore } from "@/config/firebase";
import { addDoc, collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "sonner";

// Adicione a máscara de telefone
function formatPhone(value: string) {
  // Remove tudo que não é número
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3")
      .replace(/-$/, "");
  }
  return digits
    .replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3")
    .replace(/-$/, "");
}

type ColorOption = "azul-primario" | "garrafa-verde";

const AqualinkClassicPage = () => {
  usePageTitle("AquaLink Classic | AquaLink");

  const [searchParams] = useSearchParams();
  const [glow, setGlow] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [color, setColor] = useState<ColorOption>("azul-primario");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const waitlistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIdx(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const slides = useMemo(() => {
    const standing =
      color === "garrafa-verde" ? aqualink_standing_green : aqualink_standing;
    return [
      { src: standing, alt: "AquaLink em pé" },
      { src: aqualink_laying_png, alt: "AquaLink deitado" },
      { src: aqualink_standing_open, alt: "AquaLink aberto" },
    ];
  }, [color]);

  useEffect(() => {
    const shouldGlow = searchParams.get("highlight") === "waitlist";
    if (!shouldGlow) return;
    const t0 = setTimeout(() => {
      waitlistRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setGlow(true);
    }, 100);
    const t1 = setTimeout(() => {
      setGlow(false);
      navigate(location.pathname, { replace: true });
    }, 2400);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
    };
  }, [searchParams, navigate, location.pathname]);

  const submitInterest = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    const emailOk = /\S+@\S+\.\S+/.test(email);
    const phoneOk = phone.replace(/\D/g, "").length >= 10;
    if (!emailOk || !phoneOk) {
      toast.error("Preencha e-mail e telefone válidos.");
      return;
    }
    try {
      if (user) {
        await setDoc(doc(firestore, "users", user.uid), { interessado: true }, { merge: true });
        toast.success("Interesse registrado na sua conta.");
      } else {
        await addDoc(collection(firestore, "interessados"), {
          email,
          telefone: phone,
          timestamp: serverTimestamp(),
        });
        toast.success("Inscrição na lista de espera enviada!");
      }
      setEmail(user?.email ?? "");
      setName("");
      setPhone("");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Não foi possível enviar seus dados.");
    }
  };

  // Autocompleta o e-mail se o usuário estiver logado
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u?.email) setEmail(u.email);
    });
    return unsub;
  }, []);

  const colorLabel = color === "garrafa-verde" ? "Verde" : "Azul";

  return (
    <section className="container mx-auto max-w-7xl px-6 py-14 md:py-20">
      <div className="grid gap-10 md:gap-12 lg:grid-cols-2 items-start">
        {/* Coluna esquerda: thumbnails + carrossel */}
        <div className="min-w-0 flex gap-3">
          {/* Thumbnails (método de navegação) */}
          <div className="hidden sm:flex flex-col gap-3 w-16 shrink-0">
            {slides.map((s, i) => {
              const active = selectedIdx === i;
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`Ver imagem ${i + 1}`}
                  onClick={() => api?.scrollTo(i)}
                  className={[
                    "size-16 rounded-lg overflow-hidden bg-background border transition-all",
                    active
                      ? "border-azul-primario ring-2 ring-azul-primario/60"
                      : "border-white/20 hover:border-white/40",
                  ].join(" ")}
                >
                  <img
                    src={s.src}
                    alt={s.alt}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </button>
              );
            })}
          </div>

          {/* Carrossel */}
          <div className="flex-1 min-w-0">
            <div className="rounded-2xl border border-white/15 bg-white/60 dark:bg-black/35 backdrop-blur-md p-2 md:p-3">
              <Carousel
                setApi={setApi}
                className="w-full overflow-hidden"
                opts={{ align: "start", containScroll: "trimSnaps" }}
              >
                <CarouselContent>
                  {slides.map((s, idx) => (
                    <CarouselItem key={idx}>
                      <div className="aspect-[4/5] w-full overflow-hidden rounded-xl grid place-items-center bg-background">
                        <img
                          src={s.src}
                          alt={s.alt}
                          className={[
                            "max-h-full w-auto transition-all duration-300",
                            selectedIdx === idx
                              ? "-translate-x-2 sm:-translate-x-3 md:-translate-x-4"
                              : "opacity-70 scale-[0.96]",
                          ].join(" ")}
                          loading="lazy"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:inline-flex md:left-2 md:-translate-y-1/2" />
                <CarouselNext className="hidden md:inline-flex md:right-2 md:-translate-y-1/2" />
              </Carousel>

              {/* Dots no mobile */}
              <div className="mt-3 flex justify-center gap-2 sm:hidden">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Ir para imagem ${i + 1}`}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      selectedIdx === i
                        ? "bg-azul-primario"
                        : "bg-foreground/30"
                    }`}
                    onClick={() => api?.scrollTo(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Coluna direita: infos do produto */}
        <div className="min-w-0">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            AquaLink Classic
          </h1>
          <div className="mt-4 text-muted-foreground text-sm">
            A AquaLink Classic é pensada para acompanhar sua rotina de
            hidratação com conforto e estilo. Integrações com o app, lembretes
            inteligentes e design funcional completam a experiência.
          </div>

          {/* Filtros de cor */}
          <div className="mt-5">
            <p className="text-md text-muted-foreground">
              Cores disponíveis:{" "}
              <span className="font-medium text-foreground">
                ( {colorLabel} )
              </span>
            </p>
            <div className="mt-2 flex items-center gap-4">
              {/* Azul */}
              <button
                type="button"
                aria-label="Selecionar cor azul"
                aria-pressed={color === "azul-primario"}
                onClick={() => setColor("azul-primario")}
                className={[
                  "size-6 rounded-full border transition-all",
                  "border-black/10 dark:border-white/15",
                  "bg-azul-primario",
                  color === "azul-primario"
                    ? "ring-2 ring-azul-primario/60"
                    : "",
                ].join(" ")}
                title="Azul"
              />
              {/* Verde */}
              <button
                type="button"
                aria-label="Selecionar cor verde"
                aria-pressed={color === "garrafa-verde"}
                onClick={() => setColor("garrafa-verde")}
                className={[
                  "size-6 rounded-full border transition-all",
                  "border-black/10 dark:border-white/15",
                  "bg-[var(--color-garrafa-verde)]",
                  color === "garrafa-verde"
                    ? "ring-2 ring-[var(--color-garrafa-verde)]/60"
                    : "",
                ].join(" ")}
                title="Verde"
              />
            </div>
          </div>

          {/* Accordions (Descrição sempre aberta; abrir Detalhes fecha Descrição) */}
          <div className="mt-6 rounded-2xl border border-white/15 bg-white/60 dark:bg-black/35 backdrop-blur-md">
            <Accordion
              type="single"
              collapsible
              defaultValue="descricao"
              className="w-full px-2 md:px-3"
            >
              <AccordionItem value="descricao">
                <AccordionTrigger className="px-1 md:px-2">
                  Descrição
                </AccordionTrigger>
                <AccordionContent className="px-1 md:px-2 text-muted-foreground">
                  Garrafa térmica com infusor de bebidas, feita em inox 304.
                  Contém base antiderrapante e alça de silicone acoplada na
                  tampa. Quando usada em conjunto com o{" "}
                  <Link to="/download" className="underline">
                    app AquaLink
                  </Link>
                  , oferece uma experiência de hidratação personalizada. Ideal
                  para quem busca praticidade, saúde e tecnologia em um só
                  produto.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="medidas">
                <AccordionTrigger className="px-1 md:px-2">
                  Medidas
                </AccordionTrigger>
                <AccordionContent className="px-1 md:px-2 text-muted-foreground">
                  • Capacidade: 1L
                  <br />
                  • Altura: 30,5 cm
                  <br />
                  • Largura: 8,2 cm
                  <br />
                  • Circunferência: 25,7 cm
                  <br />• Peso: 488 g
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Interesse (sem compra) */}
          <div
            ref={waitlistRef}
            className={[
              "mt-6 rounded-2xl border border-white/15 bg-white/60 dark:bg-black/35 backdrop-blur-md p-4 transition-shadow",
              glow
                ? "ring-2 ring-azul-secundario shadow-[0_0_40px_rgba(56,132,255,0.45)] transition-all duration-300"
                : "",
            ].join(" ")}
          >
            <p className="text-sm text-muted-foreground mb-3">
              A garrafa ainda não está disponível para compra. Deixe seu nome e
              telefone para entrar na lista de espera e ser avisado quando
              lançarmos em larga escala.
            </p>
            <form
              onSubmit={submitInterest}
              className="flex flex-col gap-2 sm:flex-row sm:items-center"
            >
              <Input
                type="email"
                required
                placeholder="Seu E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                autoComplete="email"
                className="h-10"
              />
              <Input
                type="text"
                required
                placeholder="Seu Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10"
              />
              <Input
                type="tel"
                required
                placeholder="(99) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                maxLength={15}
                className="h-10"
              />
              <Button
                type="submit"
                className="h-10 bg-verde-accent hover:bg-verde-accent/50 text-white transition-all duration-300 cursor-pointer"
              >
                Quero ser avisado
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2">
              Nunca compartilharemos suas informações. Leia nossos{" "}
              <Link to="/privacy-policy" className="underline">
                termos de privacidade
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { AqualinkClassicPage };
