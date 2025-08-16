import { IoWaterOutline } from "react-icons/io5";
import { AiOutlineTeam } from "react-icons/ai";
import { FaInfo } from "react-icons/fa6";

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

import {
  logo_aqualink_drop_shadow,
} from "@/assets";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// Array dos links da Nav
const navigationLinks = [
  { href: "#", label: "Home", icon: IoWaterOutline, active: true },
  { href: "#", label: "Sobre", icon: AiOutlineTeam },
  { href: "#", label: "Informativos", icon: FaInfo },
];

const Header = () => {
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
              src={logo_aqualink_drop_shadow}
              alt="AquaLink Logo"
              className="max-w-[55px]"
            />
          </a>
        </div>

        {/* Coluna direita: Ações */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button
            size="sm"
            className="text-sm sm:aspect-square rounded-xl"
            variant="azulprimario"
          >
            <FaInfo className="opacity-60" size={16} aria-hidden="true" />
            <span className="sm:sr-only">About</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export { Header };
