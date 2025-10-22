import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { usePageTitle } from "@/hooks";

type FaqCategory = "geral" | "garrafa" | "aplicativo";

type Faq = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
};

const FAQS: Faq[] = [
  // Geral
  {
    id: "g-1",
    category: "geral",
    question: "O que é o AquaLink?",
    answer:
      "É um ecossistema para apoiar sua hidratação diária, combinando app, lembretes inteligentes e integrações com dispositivos.",
  },
  {
    id: "g-2",
    category: "geral",
    question: "O AquaLink é gratuito?",
    answer:
      "Sim, o aplicativo é totalmente gratuito, sem custos ocultos ou assinaturas.",
  },
  {
    id: "g-3",
    category: "geral",
    question: "Como meus dados são tratados?",
    answer:
      "Seguimos boas práticas de privacidade e segurança. Seus dados são criptografados e usados apenas para entregar a experiência proposta.",
  },

  // Garrafa
  {
    id: "b-1",
    category: "garrafa",
    question: "A garrafa precisa de carregamento?",
    answer:
      "A AquaLink Classic tem bateria recarregável com autonomia de até 3 dias, dependendo do uso. Recomendamos carregar a garrafa a cada poucos dias para garantir funcionamento ideal.",
  },
  {
    id: "b-2",
    category: "garrafa",
    question: "Posso usar a garrafa sem o app?",
    answer:
      "Sim, mas os recursos inteligentes (sincronização, histórico e lembretes) exigem conexão com o app para melhor experiência.",
  },
  {
    id: "b-3",
    category: "garrafa",
    question: "A garrafa é à prova d’água?",
    answer:
      "Os componentes eletrônicos possuem proteção adequada para uso diário. Evite imersão prolongada e siga as instruções do manual.",
  },
  {
    id: "b-4",
    category: "garrafa",
    question: "Qual a capacidade da garrafa?",
    answer:
      "A AquaLink Classic tem capacidade de 1L, feita de aço inoxidável BPA-free, com isolamento térmico para manter bebidas frias ou quentes por horas. Especificações detalhadas estão disponíveis na página do produto.",
  },
  {
    id: "b-5",
    category: "garrafa",
    question: "Posso comprar uma garrafa?",
    answer: "Atualmente a garrafa não está disponível para vendas individuais, sugerimos que faça parte da lista de espera na página inicial para ser o primeiro a ser notificado quando estiver disponível.",
  },

  // Aplicativo
  {
    id: "a-1",
    category: "aplicativo",
    question: "O app funciona em Android e iOS?",
    answer:
      "Sim, oferecemos suporte aos sistemas Android e iOS.",
  },
  {
    id: "a-2",
    category: "aplicativo",
    question: "O app funciona sem a garrafa?",
    answer:
      "Sim, você pode usar o app para monitorar sua hidratação manualmente, mas a garrafa oferece funcionalidades adicionais.",
  },
  {
    id: "a-3",
    category: "aplicativo",
    question: "Posso integrar com wearables?",
    answer:
      "Sim, planejamos integrações com plataformas e dispositivos populares para consolidar dados e facilitar o acompanhamento.",
  },
  {
    id: "a-4",
    category: "aplicativo",
    question: "Como são calculadas minhas metas diárias de hidratação?",
    answer:
      "As metas são baseadas em fatores como peso, idade, nível de atividade e clima.",
  },
  {
    id: "a-5",
    category: "aplicativo",
    question: "O app funciona sem conexão com a internet?",
    answer:
      "Sim, o app permite que você registre sua ingestão de água offline. No entanto, algumas funcionalidades, como a sincronização com a garrafa e o histórico de dados, requerem conexão com a internet.",
  }
];

const FILTERS: { key: FaqCategory; label: string }[] = [
  { key: "geral", label: "Geral" },
  { key: "garrafa", label: "Garrafa" },
  { key: "aplicativo", label: "Aplicativo" },
];

const FrequentlyAskedQuestions = () => {
  usePageTitle("FAQs | AquaLink");

  const [active, setActive] = useState<FaqCategory>("geral");

  const filtered = useMemo(
    () =>
      active === "geral"
        ? FAQS 
        : FAQS.filter((f) => f.category === active),
    [active]
  );

  return (
    <section className="relative w-full flex-1">
      <div className="container mx-auto max-w-7xl px-6 py-14 md:py-20">
        <div className="grid gap-10 md:gap-12 lg:grid-cols-2">
          {/* Coluna esquerda */}
          <div className="min-w-0">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Perguntas frequentes
            </h1>
            <p className="mt-3 text-muted-foreground">
              Não encontrou o que procurava? Fale conosco na{" "}
              <Link
                to="/contact"
                className="text-azul-primario dark:text-azul-quaternario underline underline-offset-4 hover:no-underline"
              >
                página de contato
              </Link>
              .
            </p>

            {/* Filtros */}
            <div className="mt-6 flex flex-wrap gap-3">
              {FILTERS.map((f) => {
                const isActive = active === f.key;
                return (
                  <button
                    key={f.key}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActive(f.key)}
                    className={[
                      "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      "border backdrop-blur-md shadow-sm",
                      isActive
                        ? "bg-azul-primario text-white border-transparent"
                        : "bg-white/60 dark:bg-black/35 text-foreground border-black/10 dark:border-white/15 hover:bg-white/70 dark:hover:bg-white/10",
                    ].join(" ")}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Coluna direita: Accordion */}
          <div className="min-w-0">
            <div className="rounded-2xl border border-white/15 bg-white/60 dark:bg-black/35 backdrop-blur-md p-2 md:p-3">
              <Accordion type="single" collapsible className="w-full">
                {filtered.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="px-3 md:px-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-3 md:px-4 text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { FrequentlyAskedQuestions };