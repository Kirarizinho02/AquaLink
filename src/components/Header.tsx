import { IoWaterOutline } from "react-icons/io5";
import { AiOutlineTeam } from "react-icons/ai";
import { FaInfo, FaUser } from "react-icons/fa6";

// Importação dos componentes do shadcn/ui

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { logo_no_writing_aqualink_primary } from "@/assets";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ThemeSwitcher } from "./ui/kibo-ui/theme-switcher";

import { useAuthContext } from "@/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LucideLayoutDashboard, LucideLogOut, LucideUser } from "lucide-react";

// Array dos links da Nav
const navigationLinks = [
  { href: "/", label: "Home", icon: IoWaterOutline, active: true },
  { href: "#", label: "Sobre", icon: AiOutlineTeam },
  { href: "#", label: "Informativos", icon: FaInfo },
];

const Header = () => {
  const { user, logout } = useAuthContext();

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleDashboard = () => {
    setOpen(false);
    navigate("/dashboard");
  };

  const handleProfile = () => {
    setOpen(false);
    navigate("/profile");
  };

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    navigate("/");
  };

  return (
    <header className="px-4 md:px-6 py-5 margin mx-6 border-b max-w-[1880px] w-full">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Coluna esquerda */}
        <div className="flex flex-1 items-center gap-2">
          {/* Trigger menu hambúrger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full ">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink
                          href={link.href}
                          className="flex-row items-center gap-2 py-1.5"
                          active={link.active}
                        >
                          <Icon
                            size={16}
                            className="text-muted-foreground/80"
                            aria-hidden="true"
                          />
                          <span>{link.label}</span>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  })}
                  <NavigationMenuItem>
                    <hr className="w-34 h-px my-1 bg-gray-200 border-0 dark:bg-gray-800" />
                  </NavigationMenuItem>
                  <NavigationMenuItem className="mx-auto w-full">
                    <NavigationMenuLink>
                      <ThemeSwitcher
                        defaultValue="system"
                        onChange={console.log}
                        className="flex justify-evenly content-evenly"
                      />
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList className="gap-2">
              {navigationLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      active={link.active}
                      href={link.href}
                      className="text-foreground hover:text-primary flex-row items-center gap-2 py-1.5 font-medium"
                    >
                      <Icon
                        size={16}
                        className="text-muted-foreground/80"
                        aria-hidden="true"
                      />
                      <span>{link.label}</span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Coluna central: Logo */}
        <div className="flex items-center">
          <a href="#" className="">
            <img
              src={logo_no_writing_aqualink_primary}
              alt="AquaLink Logo"
              className="max-w-[44px] drop-shadow-gray-500 drop-shadow-sm"
            />
          </a>
        </div>

        {/* Coluna direita: Ações */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <ThemeSwitcher
            defaultValue="system"
            onChange={console.log}
            className="hidden md:flex"
          />
          {!user ? (
            <a
              href="/login"
              className="flex items-center gap-2 text-gray-800 hover:text-gray-600 transition-all duration-200 font-semibold hover:underline dark:text-gray-200 dark:hover:text-gray-400"
            >
              Login
            </a>
          ) : (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="p-0">
                  {user.photoURL ? (
                    <Avatar>
                      <AvatarImage src={user.photoURL} />
                      <AvatarFallback>
                        {user.displayName?.[0] ?? <FaUser />}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <FaUser size={32} className="text-muted-foreground" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-40 p-2">
                <div className="border-b mb-2 pb-2 space-y-2">
                  <button
                    className="w-full text-left gap-2 ps-2 py-1 hover:bg-muted rounded inline-flex items-center transition-all duration-200"
                    onClick={handleDashboard}
                  >
                  <LucideLayoutDashboard className="flex text-gray-300" size={18} />
                    Dashboard
                  </button>
                  <button
                    className="w-full text-left gap-2 ps-2 py-1 hover:bg-muted rounded inline-flex items-center transition-all duration-200"
                    onClick={handleProfile}
                  >
                  <LucideUser className="flex text-gray-300" size={18} />
                    Perfil
                  </button>
                </div>
                  <button
                    className="w-full text-left gap-2 ps-2 py-1 hover:bg-muted rounded inline-flex items-center transition-all duration-200 text-red-500"
                    onClick={handleLogout}
                  >
                  <LucideLogOut className="flex" size={18} />
                    Sair
                  </button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </header>
  );
};

export { Header };
