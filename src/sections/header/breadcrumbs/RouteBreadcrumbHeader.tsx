"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RouteBreadcrumbHeader() {
  const path = usePathname();
  const BreadCrumbLinks = path.split("/").slice(1);
  let linkString = "";
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {BreadCrumbLinks[0] == "" ? (
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={""} className="text-foreground">
                Dashboard
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        ) : (
          BreadCrumbLinks.map((item, index) => {
            return (
              <BreadcrumbItem key={`${index}-breadcrumb-item`}>
                <BreadcrumbLink asChild>
                  <Link
                    href={`${linkString}/${item}`}
                    className="text-foreground"
                  >
                    {item}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          })
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
