import { NavRouteItem } from "./interface";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  CalendarDays,
  PanelLeft,
  Search,
  Settings,
  BellRing,
  SquareCheck,
  FolderDot,
  LayoutDashboard,
  TimerReset,
} from "lucide-react";

export const NavigationRoutes: NavRouteItem[] = [
  {
    title: "Dashboard",
    link: "/",
    startIcon: LayoutDashboard,
    endIcon: null,
  },
  {
    title: "Pomodoro Timer",
    link: "/pomodoro",
    startIcon: TimerReset,
    endIcon: null,
  },
  {
    title: "Projects",
    link: "/projects",
    startIcon: FolderDot,
    endIcon: null,
  },
  {
    title: "Tasks",
    link: "/tasks",
    startIcon: SquareCheck,
    endIcon: null,
  },
  {
    title: "Notifications",
    link: "/notifications",
    startIcon: BellRing,
    endIcon: null,
  },
  {
    title: "Calendar",
    link: "/calendar",
    startIcon: CalendarDays,
    endIcon: null,
  },
];