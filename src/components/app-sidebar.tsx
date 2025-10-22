"use client"

import * as React from "react"
import {
  BookOpen,
  Settings2,
  Droplets,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { LogoTitle } from "./ui/logo-title"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: Droplets,
      isActive: true,
      items: [
        {
          title: "Visão Geral",
          url: "/overview",
        },
        {
          title: "Informativos",
          url: "/informatives",
        },
      ],
    },
    {
      title: "Documentação",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Configurações",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Perfil",
          url: "/profile",
        },
        {
          title: "Billing",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="py-2 px-2">
          <LogoTitle fontSize="text-xl" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
