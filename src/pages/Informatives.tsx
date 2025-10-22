import { aqualink_buried_sand, drinking_water } from "@/assets";
import { GradientText } from "@/components/ui/gradient-text";
import { Separator } from "@/components/ui/separator";
import { usePageTitle } from "@/hooks";

const Informatives = () => {
    usePageTitle("Informativos | AquaLink");

  return (
    <main className="w-full">
      <section className="container mx-auto max-w-7xl px-6 py-10 md:py-14">
        {/* Título e intro */}
        <header className="space-y-3">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
            Menos plástico,<GradientText> mais água</GradientText>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-prose">
            O Brasil avança na reciclagem, mas ainda perde potencial por falta de coleta seletiva.
            Precisamos transformar consumo em circularidade real.
          </p>
        </header>

        <figure
          className="-mt-12 relative overflow-hidden rounded-2xl border border-white/15 bg-black/10 lg:float-right lg:ml-8 lg:mb-4 lg:w-[40%]"
          style={{
            shapeOutside: "inset(0 round 1rem)",
            minHeight: 420,
          }}
        >
          <img
            src={aqualink_buried_sand}
            alt="AquaLink em cenário de areia — descarte e impacto ambiental"
            className="block w-full h-full object-cover aspect-[4/5] md:aspect-[5/6]"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
          <figcaption className="absolute bottom-2 left-2 right-2 text-[10px] text-white/85">
            Ilustração — descarte inadequado e a urgência da circularidade.
          </figcaption>
        </figure>

        <div className="space-y-4 text-sm md:text-base leading-relaxed text-foreground/95">
          <p>
            Investimentos em capacidade e demanda por material reciclado sustentam o setor há décadas.
            Mas a ausência de uma política pública consistente de coleta seletiva impede que embalagens
            descartadas cheguem à reciclagem.
          </p>

          <p>
            Em 2024, o Brasil reciclou 410 mil toneladas de embalagens PET pós-consumo — um avanço de 14% em
            relação a 2022. O faturamento do segmento atingiu R$ 5,66 bilhões, cerca de 32% de todo o setor,
            com aproximadamente 40% dessa renda permanecendo com catadores, cooperativas e sucateiros.
          </p>

          <div className="rounded-xl border border-white/15 bg-white/60 dark:bg-black/35 backdrop-blur-md p-4 shadow-sm w-full lg:w-[56%]">
            <h3 className="text-lg font-semibold">Circularidade em alta: de uma garrafa para outra</h3>
            <ul className="mt-2 list-disc pl-5 text-muted-foreground">
              <li>37% da resina reciclada vira nova embalagem (bottle-to-bottle grau alimentício).</li>
              <li>24% segue para o setor têxtil.</li>
              <li>Indústria química: 13%; Lâminas & chapas: 13%; Fitas de arquear: 10%; Outras: 3%.</li>
            </ul>
          </div>

          <blockquote className="border-l-2 pl-4 text-muted-foreground">
            “Sabemos que a reciclabilidade da embalagem começa no seu projeto, uma vez que as características do corpo,
            rótulo e tampa influenciam diretamente no reaproveitamento pós-consumo.” — Auri Marçon (ABIPET)
          </blockquote>
          <div>
            <p>
              Apesar do crescimento, a capacidade ociosa média das recicladoras de PET atingiu 23% em 2024,
              com picos de até 40% devido à falta de matéria-prima, evidenciando a necessidade urgente de
              melhorias na coleta seletiva.
            </p>
          </div>
        </div>

        {/* Limpa o float para os próximos blocos ocuparem a largura total */}
        <div className="clear-both lg:mt-8" />

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-white/15 bg-white/60 dark:bg-black/35 backdrop-blur-md p-4 shadow-sm">
            <p className="text-foreground/90 text-sm">PET reciclado em 2024</p>
            <p className="text-3xl font-extrabold mt-1">410 mil t</p>
            <p className="text-xs text-muted-foreground mt-1">+14% vs 2022 (359 mil t)</p>
          </article>

          <article className="rounded-xl border border-white/15 bg-white/60 dark:bg-black/35 backdrop-blur-md p-4 shadow-sm">
            <p className="text-foreground/90 text-sm">Faturamento da reciclagem de PET</p>
            <p className="text-3xl font-extrabold mt-1">R$ 5,66 bi</p>
            <p className="text-xs text-muted-foreground mt-1">
              32% do setor; cerca de 40% permanece com catadores, cooperativas e sucateiros
            </p>
          </article>

          <article className="rounded-xl border border-white/15 bg-white/60 dark:bg-black/35 backdrop-blur-md p-4 shadow-sm sm:col-span-2">
            <p className="text-foreground/90 text-sm">Capacidade ociosa</p>
            <p className="text-3xl font-extrabold mt-1">23% (média)</p>
            <p className="text-xs text-muted-foreground mt-1">
              picos de até 40% por falta de matéria-prima (coleta)
            </p>
          </article>
        </div>

        {/* Mais contexto e políticas públicas */}
        <div className="mt-6 space-y-4 text-sm md:text-base leading-relaxed text-foreground/95">
          <div className="rounded-xl border border-white/15 bg-white/60 dark:bg-black/35 backdrop-blur-md p-4 shadow-sm">
            <h3 className="text-lg font-semibold">Design para o meio ambiente</h3>
            <p className="text-muted-foreground mt-1">
              Memorando entre ABIPET, ABIR, ABIOVE e ANCAT incentiva embalagens com alto valor de reciclagem
              (design for environment) e atualiza as Diretrizes de Reciclabilidade da Embalagem PET. A ANCAT
              trabalhará com cooperativas para apontar embalagens com baixa atratividade e endereçar soluções.
            </p>
          </div>

          {/* Créditos */}
          <footer className="text-xs text-muted-foreground">
            Fonte: ABIPET — Censo da Reciclagem do PET no Brasil (13ª edição).
            Crédito:{" "}
            <a
              href="https://embalagemmarca.com.br/setores/brasil-recicla-410-mil-toneladas-de-garrafas-pet-em-2024"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-foreground"
              title="EmbalagemMarca — Brasil recicla 410 mil toneladas de garrafas PET em 2024 (março 25, 2025)"
            >
              EmbalagemMarca (março 25, 2025)
            </a>
            .
          </footer>
        </div>
      </section>
    <Separator className="max-w-[680px] mx-auto mb-8"/>
      {/* Seção 2: Por que beber água faz bem — e quando o excesso faz mal */}
      <section className="container mx-auto max-w-7xl px-6 pb-12 md:pb-16">
        <header className="space-y-3">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-foreground">
            Hidratação: o <GradientText>equilíbrio</GradientText> importa
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-prose">
            Manter-se hidratado sustenta funções vitais. Em excesso, pode causar desequilíbrios perigosos.
          </p>
        </header>

        {/* Imagem “flutuante” à esquerda no desktop (wrap do texto) */}
        <figure
          className="relative my-6 overflow-hidden rounded-2xl border border-white/15 bg-black/10 lg:float-left lg:mr-8 lg:mb-4 lg:w-[40%]"
          style={{
            shapeOutside: "inset(0 round 1rem)",
            minHeight: 420,
          }}
        >
          <img
            src={drinking_water}
            alt="AquaLink e a importância do equilíbrio da hidratação"
            className="block w-full h-full object-cover aspect-[4/5] md:aspect-[5/6]"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
          <figcaption className="absolute bottom-2 left-2 right-2 text-[10px] text-white/85">
            Hidratação consciente: nem de menos, nem de mais.
          </figcaption>
        </figure>

        {/* Texto que circula a imagem e continua abaixo se necessário */}
        <div className="space-y-4 text-sm md:text-base leading-relaxed text-foreground/95">
          <p>
            A hidratação é fundamental: o corpo adulto é aproximadamente 70% água e, sem ela, a sobrevivência cai quatro vezes em comparação à falta de comida.
            Atividades cerebrais, intestinais e musculares performam melhor quando estamos hidratados.
          </p>
          <div className="rounded-xl border border-white/15 bg-white/60 dark:bg-black/35 backdrop-blur-md p-4 shadow-sm content-end">
            <h3 className="text-lg font-semibold">Por que beber água é tão importante?</h3>
            <ul className="mt-2 list-disc pl-5 text-muted-foreground">
              <li><strong>Transporte de nutrientes:</strong> água leva minerais, vitaminas, glicose e oxigênio às células.</li>
              <li><strong>Digestão:</strong> com fibras, evita ressecamento das fezes e ajuda a prevenir constipação.</li>
              <li><strong>Função renal:</strong> auxilia rins a eliminar toxinas e reduzir risco de cálculos.</li>
              <li><strong>Circulação:</strong> melhora a fluidez sanguínea, frequência cardíaca e pressão arterial.</li>
              <li><strong>Cérebro:</strong> aproximadamente 75% água; hidratação adequada sustenta funções cognitivas.</li>
            </ul>
          </div>

          <div className="content-end">
            <h3 className="text-lg font-semibold">Preocupações:</h3>
            <p className="text-foreground mt-2">A <strong>desidratação</strong> favorece retenção de líquidos/sódio e liberação de vasopressina,
              cujos sintomas comuns incluem: cansaço, fome/boca seca, constipação, dificuldade de concentração, mau hálito e queda no desempenho atlético.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-xl border border-white/15 bg-white/60 dark:bg-black/35 backdrop-blur-md p-4 shadow-sm">
              <h3 className="text-lg font-semibold">Como se hidratar?</h3>
              <ul className="mt-2 list-disc pl-5 text-muted-foreground">
                <li>Água com eletrólitos/minerais (Ca, Mg, K, Na, etc.).</li>
                <li>Frutas e vegetais ricos em água e fibras.</li>
                <li>Água de coco natural (K, Ca, Mg).</li>
              </ul>
            </article>
            <article className="rounded-xl border border-white/15 bg-white/60 dark:bg-black/35 backdrop-blur-md p-4 shadow-sm">
              <h3 className="text-lg font-semibold">Quanto beber?</h3>
              <ul className="mt-2 list-disc pl-5 text-muted-foreground">
                <li>Cálculo simples: peso(kg) × 35 ml/dia. Ex.: 60 kg → ~2,1 L/dia.</li>
                <li>Genérico: ~2 L/dia, ajustando por clima, atividade e saúde.</li>
              </ul>
            </article>
          </div>

          <div className="rounded-xl border border-rose-300/30 bg-rose-200/40 dark:bg-rose-900/20 backdrop-blur-md p-4 shadow-sm">
            <h3 className="text-lg font-semibold">Quando o excesso faz mal?</h3>
            <p className="text-muted-foreground mt-1">
              Beber água demais pode causar hiponatremia (queda do sódio sérico). Sintomas: dor de cabeça, fadiga, náusea, vômito,
              desorientação e, em casos graves, parada cardíaca. Em maratonas, hidratar-se só com água aumenta o risco pela perda de sais no suor.
            </p>
            <ul className="mt-2 list-disc pl-5 text-muted-foreground">
              <li>OMS (referência): ~2,5 L/dia (homem 70 kg) e ~2,2 L/dia (mulher 58 kg) — ajuste individual.</li>
              <li>Rim saudável filtra ~0,8–1 L/h; ingerir 3–4 L/h eleva risco de hiponatremia.</li>
            </ul>
          </div>
        </div>

        {/* Limpa o float para os próximos blocos ocuparem a largura total */}
        <div className="clear-both lg:mt-8" />

        {/* Créditos da seção 2 */}
        <footer className="mt-4 text-xs text-muted-foreground space-y-1">
          <p>Referências:</p>
          <ul className="list-disc pl-5">
            <li>
              FIOCRUZ — Canal Saúde:{" "}
              <a className="underline hover:text-foreground" href="https://www.canalsaude.fiocruz.br/noticias/noticiaAberta/beber-mais-agua-e-uma-otima-meta-para-ser-cumprida-em-2017-2017-01-02" target="_blank" rel="noreferrer">
                Beber mais água é uma ótima meta
              </a>
            </li>
            <li>
              Ministério da Saúde — Guia Alimentar:{" "}
              <a className="underline hover:text-foreground" href="https://bvsms.saude.gov.br/bvs/publicacoes/guia_alimentar_populacao_brasileira_2ed.pdf" target="_blank" rel="noreferrer">
                2ª edição (PDF)
              </a>
            </li>
            <li>
              Marin-Morales et al. (2016):{" "}
              <a className="underline hover:text-foreground" href="https://conexaoagua.mpf.mp.br/arquivos/artigos-cientificos/2016/10-importancia-da-agua-para-a-vida-e-garantia-de-manutencao-da-sua-qualidade.pdf" target="_blank" rel="noreferrer">
                Importância da água para a vida
              </a>
            </li>
            <li>
              Saúde Brasil — Ministério da Saúde:{" "}
              <a className="underline hover:text-foreground" href="https://saudebrasil.saude.gov.br/eu-quero-me-alimentar-melhor/como-tomar-mais-agua-durante-o-dia" target="_blank" rel="noreferrer">
                Como tomar mais água durante o dia?
              </a>
            </li>
            <li>
              Einstein — Dr. Virgílio G. Pereira Jr. (nefrologista): riscos do excesso de água (hiponatremia) e ingestão adequada.
              Vídeo:{" "}
              <a className="underline hover:text-foreground" href="https://youtu.be/NKpBiWhjqRE?si=ZiFONnXivndXJAUX" target="_blank" rel="noreferrer">
                YouTube
              </a>
            </li>
          </ul>
        </footer>
      </section>
     </main>
   );
 };
 
 export { Informatives };