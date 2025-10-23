import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CircleAlert, Hammer, Wrench, Clock } from "lucide-react";

const UnderConstruction = () => {
  return (
    <section className="container mx-auto max-w-4xl px-6 py-14 md:py-20">
      <div className="rounded-2xl border border-white/15 bg-white/60 dark:bg-black/35 backdrop-blur-md p-8 md:p-10 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center justify-center size-10 rounded-full bg-amber-200/60 dark:bg-amber-500/20 border border-amber-400/40">
            <CircleAlert className="text-amber-700 dark:text-amber-300" size={22} />
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-200/50 dark:bg-amber-500/20 border border-amber-400/40 text-amber-800 dark:text-amber-200">
            Em produção
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Página em construção
        </h1>
        <p className="mt-2 text-muted-foreground">
          Esta página ainda não foi finalizada e está em desenvolvimento. Obrigado pela paciência.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/15 bg-white/50 dark:bg-black/30 p-4">
            <div className="flex items-center gap-2 text-foreground">
              <Hammer size={18} />
              <span className="font-semibold">Trabalhando no layout</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Estrutura e componentes em ajuste fino.
            </p>
          </div>

          <div className="rounded-xl border border-white/15 bg-white/50 dark:bg-black/30 p-4">
            <div className="flex items-center gap-2 text-foreground">
              <Wrench size={18} />
              <span className="font-semibold">Integrações</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Conexões com serviços e dados reais.
            </p>
          </div>

          <div className="rounded-xl border border-white/15 bg-white/50 dark:bg-black/30 p-4">
            <div className="flex items-center gap-2 text-foreground">
              <Clock size={18} />
              <span className="font-semibold">Disponível em breve</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Retorne mais tarde para novidades.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="secondary" className="cursor-pointer">
            <Link to="/">Voltar para a Home</Link>
          </Button>
          <Button asChild className="bg-azul-primario hover:bg-azul-primario/90 text-white cursor-pointer">
            <Link to="/dashboard/overview">Ir para o Dashboard</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export { UnderConstruction };