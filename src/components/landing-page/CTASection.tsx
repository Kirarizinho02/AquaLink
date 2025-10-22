/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { motion, useInView } from "motion/react";
import { mock_horizontal } from "@/assets";
import aqualinkLogo from "@/assets/logo-no-writing-aqualink-primary.svg";
import { CardContainer, CardBody, CardItem } from "../ui/3d-card";
import { auth, firestore } from "@/config/firebase";
import { addDoc, collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "sonner";

// Máscara simples para telefone brasileiro
function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 10) {
    return digits.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3").replace(/-$/, "");
  }
  return digits.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3").replace(/-$/, "");
}

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.35, once: true }); 

  // Autocompleta o e-mail se o usuário estiver logado
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u?.email) setEmail(u.email);
    });
    return unsub;
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
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
      setPhone("");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Não foi possível enviar seus dados.");
    }
  };

  return (
    <section
      ref={sectionRef}
      className="mx-2 lg:mx-12 rounded-4xl bg-azul-primario py-12 px-6 sm:py-16 sm:px-8 lg:py-20 lg:px-12 z-20"
    >
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
        {/* Coluna esquerda */}
        <div>
          <h2 className="text-3xl sm:text-5xl font-bold text-absolute-white text-left">
            Pronto para transformar sua hidratação?
          </h2>
          <p className="mt-4 text-lg text-absolute-white/90">
            Junte-se à revolução da hidratação inteligente com o AquaLink.
            Sua saúde e bem-estar merecem o melhor.
          </p>

          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3">
            <label htmlFor="cta-email" className="sr-only">E-mail</label>
            <Input
              id="cta-email"
              type="email"
              required
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              autoComplete="email"
              className="w-full sm:max-w-sm"
            />
            <label htmlFor="cta-phone" className="sr-only">Telefone</label>
            <Input
              id="cta-phone"
              type="tel"
              required
              placeholder="(99) 99999-9999"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              maxLength={15}
              className="w-full sm:max-w-sm"
            />
            <Button type="submit" className="shrink-0 bg-verde-accent/100 hover:bg-verde-accent/90 text-white transition-all duration-300 cursor-pointer">
              Inscrever-se
            </Button>
          </form>

          <p className="mt-2 text-xs text-absolute-white/80">
            Ao se inscrever, você concorda em receber atualizações do AquaLink, assim como os <span className="underline"> termos de uso</span>.
          </p>
        </div>

        {/* Coluna direita */}
        <div className="relative h-[320px] sm:h-[360px] md:h-[420px] lg:h-[460px]">
          <img
            src={mock_horizontal}
            alt="AquaLink app mockup"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] max-w-[640px] h-auto select-none pointer-events-none"
            loading="lazy"
          />

          {/* Notificação 1 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.3, delay: 0.08 }}
          >
            <CardContainer
              containerClassName="absolute top-4 left-1/2 -translate-x-[46%] w-[230px] sm:w-[260px] py-0 items-start justify-start pointer-events-auto"
              className="w-full"
            >
              <CardBody className="w-full h-auto">
                <CardItem translateZ={30} className="w-full">
                  <div className="rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-black/40 backdrop-blur-md shadow-lg px-3.5 py-3 w-full">
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-absolute-white border border-black/10 dark:border-white/15">
                        <img src={aqualinkLogo} alt="AquaLink" className="w-5 h-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Meta batida! 🎯</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Você atingiu 100% da sua meta diária.</p>
                      </div>
                    </div>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>

          {/* Notificação 2 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
            transition={{ duration: 0.3, delay: 0.18 }}
          >
            <CardContainer
              containerClassName="absolute top-[26.5%] left-[16%] sm:left-[18%] md:left-[22%] w-[220px] sm:w-[250px] py-0 items-start justify-start pointer-events-auto"
              className="w-full"
            >
              <CardBody className="w-full h-auto">
                <CardItem translateZ={30} className="w-full">
                  <div className="rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-black/40 backdrop-blur-md shadow-lg px-3.5 py-3 w-full">
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-absolute-white border border-black/10 dark:border-white/15">
                        <img src={aqualinkLogo} alt="AquaLink" className="w-5 h-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Lembre-se de tomar água! </p>
                        <p className="text-xs text-muted-foreground mt-0.5">Hora do próximo gole.</p>
                      </div>
                    </div>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>

          {/* Notificação 3 */}
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
            transition={{ duration: 0.3, delay: 0.28 }}
          >
            <CardContainer
              containerClassName="absolute top-[46%] right-[14%] sm:right-[16%] md:right-[20%] w-[220px] sm:w-[250px] py-0 items-start justify-start pointer-events-auto"
              className="w-full"
            >
              <CardBody className="w-full h-auto">
                <CardItem translateZ={30} className="w-full">
                  <div className="rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-black/40 backdrop-blur-md shadow-lg px-3.5 py-3 w-full">
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-absolute-white border border-black/10 dark:border-white/15">
                        <img src={aqualinkLogo} alt="AquaLink" className="w-5 h-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Apenas 200 ml!</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Você está a 200 ml de bater sua meta.</p>
                      </div>
                    </div>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { CTASection };