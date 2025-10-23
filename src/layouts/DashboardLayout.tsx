import { Outlet, Link, useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { ThemeSwitcher } from "@/components/ui/kibo-ui/theme-switcher";
import {
  Banner,
  BannerClose,
  BannerIcon,
  BannerTitle,
} from "@/components/ui/kibo-ui/banner";
import { CircleAlert } from "lucide-react";

const DashboardLayout = () => {
  const location = useLocation();

  const crumbs = (() => {
    const p = location.pathname;
    if (p.startsWith("/dashboard/changelog")) {
      return [
        { type: "link" as const, label: "Dashboard", href: "/dashboard/overview" },
        { type: "page" as const, label: "Changelog" },
      ];
    }
    if (p.startsWith("/dashboard/profile") || p === "/dashboard/profile") {
      return [
        { type: "link" as const, label: "Dashboard", href: "/dashboard/overview" },
        { type: "page" as const, label: "Perfil" },
      ];
    }
    return [
      { type: "link" as const, label: "Dashboard", href: "/dashboard/overview" },
      { type: "page" as const, label: "Visão Geral" },
    ];
  })();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Banner className="bg-muted text-foreground rounded-none">
          <BannerIcon icon={CircleAlert} />
          <BannerTitle>
            O Dashboard web está em beta. A visualização dos dados é recomendada na{" "}
            <Link to="/download" className="underline underline-offset-4 font-medium hover:text-azul-primario">
              plataforma mobile
            </Link>
            .
          </BannerTitle>
          <BannerClose />
        </Banner>

        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {crumbs.map((c, i) =>
                  c.type === "link" ? (
                    <BreadcrumbItem key={i} className={i === 0 ? "hidden md:block" : ""}>
                      <BreadcrumbLink asChild>
                        <Link to={c.href} className={i === 0 ? "cursor-pointer" : ""}>
                          {c.label}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  ) : (
                    <BreadcrumbItem key={i}>
                      <BreadcrumbPage>{c.label}</BreadcrumbPage>
                    </BreadcrumbItem>
                  )
                )}
                {/* Separadores entre os dois itens principais */}
                <BreadcrumbSeparator className="hidden md:block" />
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto me-4">
            <ThemeSwitcher />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export { DashboardLayout };