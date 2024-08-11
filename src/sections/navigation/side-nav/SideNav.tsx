"use client";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Link from "next/link";
import SideNavItem from "./SideNavItem";
import { LayoutDashboard, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavProps } from "../interface";
import { cn } from "@/lib/utils";

export default function SideNav({ links, isCollapsed, toggleMenu }: NavProps) {
  const sideNavContent = links.map((item, index) => {
    return (
      <SideNavItem
        data={item}
        isCollapsed={isCollapsed}
        key={`${index}-sidenav-item`}
      />
    );
  });
  return (
    <>
      <div
        data-collapsed={isCollapsed}
        className={cn(
          "hidden inset-y-0 left-0 w-14 flex-col border-r bg-background sm:flex",
          !isCollapsed && "w-52"
        )}
      >
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {sideNavContent}
        </nav>
      </div>
    </>
  );
}
