import { Header } from "@/components";
import { Footer } from "@/components/Footer";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div className="min-h-screen flex flex-col"> 
      <div className="flex w-full justify-center grid-cols-1">
        <Header />
      </div>

      <main className="flex-1 inset-0 w-full bg-[radial-gradient(var(--color-grid)_1px,transparent_1px)] [background-size:16px_16px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export { DefaultLayout };
