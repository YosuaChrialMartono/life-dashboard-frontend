import UserProfile from "./profile/UserProfile";
import RouteBreadcrumbHeader from "./breadcrumbs/RouteBreadcrumbHeader";
import { PanelLeft } from "lucide-react";
import MobileSideNav from "../navigation/mobile-side-nav/MobileSideNav";
import { Button } from "@/components/ui/button";
import { NavigationRoutes } from "../navigation/navigationsRoute";

export default function Header() {
  const CurrentDate = () => {
    const date = new Date();
    return (
      <span className="hidden ml-auto sm:flex items-center">{`${date.toLocaleDateString()}`}</span>
    );
  };
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 py-2 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <MobileSideNav links={NavigationRoutes} isOpen={true}>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </MobileSideNav>

      <RouteBreadcrumbHeader />
      <CurrentDate />
      <UserProfile />
    </header>
  );
}
