import { HeaderShop } from "@/components";
import { Footer } from "@/components/Footer";
import { Outlet, Link } from "react-router-dom";
import {
  Banner,
  BannerClose,
  BannerIcon,
  BannerTitle,
} from "@/components/ui/kibo-ui/banner";
import { CircleAlert } from "lucide-react";

const ShopLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex w-full justify-center grid-cols-1">
        <HeaderShop />
      </div>

      {/* Banner cinza sob o header */}
      <Banner className="bg-muted text-foreground rounded-none">
        <BannerIcon icon={CircleAlert} />
        <BannerTitle>
          Os produtos ainda não estão à venda, mas você demonstrar interesse entrando na{" "}
          <Link
            to="/shop/aqualink-classic?highlight=waitlist"
            className="underline underline-offset-4 font-medium hover:text-azul-primario"
          >
            lista de espera
          </Link>
          .
        </BannerTitle>
        <BannerClose />
      </Banner>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export { ShopLayout };
