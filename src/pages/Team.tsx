import { usePageTitle } from "@/hooks";
import { GradientText } from "@/components/ui/gradient-text";
import { aqualink_team_wide, aqualink_team } from "@/assets";

const Team = () => {
  usePageTitle("Equipe | AquaLink");

  return (
    <main className="w-full">
      {/* Título + subtítulo */}
      <section className="container mx-auto max-w-7xl px-6 pb-8 pt-12">
        <div className="grid place-items-center text-center">
          <h1 className="text-3xl sm:text-5xl font-bold">
            Sobre o <GradientText>time</GradientText>
          </h1>
          <p className="mt-3 text-base sm:text-lg text-foreground/80">
            Descubra a história por trás da nossa jornada.
          </p>
        </div>
      </section>

      {/* Foto principal centralizada */}
      <section className="container mx-auto max-w-7xl px-6 pb-8">
        <figure className="w-full">
          <img
            src={aqualink_team_wide}
            alt="Equipe AquaLink"
            className="block w-full max-w-5xl mx-auto rounded-2xl border border-white/15 bg-white/60 dark:bg-black/35 backdrop-blur-md object-cover"
            loading="lazy"
          />
        </figure>
      </section>

      {/* Parágrafo na metade direita */}
      <section className="container mx-auto max-w-7xl px-6 pb-12 md:pb-16">
        <div className="gap-6 columns-2">
          <div className="flex" />
            <p className="text-foreground/90">
              Afinal, quem somos nós? Somos um grupo do terceiro ano de Desenvolvimento de Sistemas na
              ETEC Bento Quirino, unidos pela amizade e pela paixão por tecnologia. Nosso objetivo
              é criar soluções inovadoras que façam a diferença na vida das pessoas. A AquaLink é
              mais do que um projeto; é a materialização do nosso compromisso com a inovação e o
              impacto positivo.
            </p>
          <div className="flex items-center">
            <p className="text-foreground/90">
              Assim como o AquaLink é a tríade entre aplicativo, página e garrafa, nós somos 
              uma tríade de habilidades, criatividade e dedicação. Cada membro da equipe traz uma
              perspectiva única, contribuindo para um produto final que reflete nossa diversidade
              e talento coletivo.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-6 pb-16 md:pb-24">
        <div className="grid items-start gap-8 md:gap-10 lg:grid-cols-2">
          {/* Esquerda: foto */}
          <figure className="order-1 lg:order-none">
            <img
              src={aqualink_team}
              alt="Momentos do time AquaLink"
              className="block w-full max-w-xl rounded-2xl border border-white/15 bg-white/60 dark:bg-black/35 backdrop-blur-md object-cover"
              loading="lazy"
            />
          </figure>

          <div className="flex flex-col">
            <h3 className="text-xl md:text-2xl font-bold text-foreground">Os desenvolvedores</h3>
            <p className="text-sm text-muted-foreground mb-4"> Da esquerda pra direita, de baixo para cima :</p>
          <div className="order-2 grid gap-4">
            {/* Card 1 */}
            <article className="rounded-2xl border border-white/15 bg-white/60 dark:bg-black/35 backdrop-blur-md shadow p-5 md:p-6">
              <h3 className="text-xl md:text-2xl font-bold text-foreground">Gabriel Carniatto</h3>
              <p className="text-sm text-muted-foreground mt-1">Desenvolvedor dos Sistemas Embarcados</p>
              <p className="text-foreground/90 mt-3">
                Além de programar os sistemas embarcados do AquaLink, Gabriel é apaixonado por
                música, academia e, estranhamente, química. Apesar disso, ele <span className="italic">quase sempre</span> encontra tempo
                para contribuir com o projeto e garantir que tudo funcione perfeitamente. Seu avô também
                forneceu inspiração e apoio durante o desenvolvimento do AquaLink.
              </p>
            </article>

            {/* Card 2 */}
            <article className="rounded-2xl border border-white/15 bg-white/60 dark:bg-black/35 backdrop-blur-md shadow p-5 md:p-6">
              <h3 className="text-xl md:text-2xl font-bold text-foreground">Samuel Augusto</h3>
              <p className="text-sm text-muted-foreground mt-1">Desenvolvedor Web</p>
              <p className="text-foreground/90 mt-3">
                Samuel é o cérebro por trás do site do AquaLink. Quando não está codificando,
                ele gosta de jogar videogame, ver videos-documentário sobre assuntos aleatórios e
                ouvir música. Seu parágrafo é o menor dos três por um motivo óbvio: ele mesmo está programando
                e escrevendo sobre si mesmo.
              </p>
            </article>

            {/* Card 3 */}
            <article className="rounded-2xl border border-white/15 bg-white/60 dark:bg-black/35 backdrop-blur-md shadow p-5 md:p-6">
              <h3 className="text-xl md:text-2xl font-bold text-foreground">Vitor Eto</h3>
              <p className="text-sm text-muted-foreground mt-1">Programador Mobile</p>
              <p className="text-foreground/90 mt-3">
                Vitor, ou melhor, Hideki é o responsável pelo design do AquaLink. Quando não está criando 
                interfaces (ou jogando Clash Royale), ele gosta de ir à academia e jogar First Person Shooters.
                Seu comprometimento com o projeto é evidente, mesmo quando enfrenta desafios técnicos. Sua persistência
                foi chave para a resolução de problemas do AquaLink.
              </p>
            </article>
          </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export { Team };