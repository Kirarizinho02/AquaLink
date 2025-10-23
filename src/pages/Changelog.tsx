import { usePageTitle } from "@/hooks";

const Changelog = () => {
  usePageTitle("Changelog | AquaLink");
  return (
    <div className="bg-absolute-white dark:bg-black dark:border-white/40 border-black/20 border rounded-xl p-6">
      <h2 className="text-xl md:text-2xl font-semibold">Changelog</h2>
      <p className="text-muted-foreground mt-2">
        Aqui você acompanhará as novidades do Dashboard. Em breve.
      </p>
    </div>
  );
};

export { Changelog };