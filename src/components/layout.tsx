"use client";

import { ReactNode, useState } from "react";
import { TooltipProvider } from "./ui/tooltip";
import SideNav from "@/sections/navigation/side-nav/SideNav";
import { NavigationRoutes } from "@/sections/navigation/navigationsRoute";
import Header from "@/sections/header/header";
import { Separator } from "./ui/separator";

export default function Layout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <main className="size-full">
      <TooltipProvider delayDuration={0}>
        <div className="size-full flex flex-row bg-muted/40">
          <SideNav
            links={NavigationRoutes}
            isCollapsed={isCollapsed}
            toggleMenu={toggleMenu}
          />
          <div className="flex flex-col sm:gap-4 sm:py-4 size-full overflow-auto">
            <Header />
            <div className="flex-grow overflow-auto">{children}</div>
          </div>
        </div>
      </TooltipProvider>
    </main>
  );
}
