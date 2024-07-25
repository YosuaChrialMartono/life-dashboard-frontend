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
  console.log(path);
  console.log(path.split("/"));
  const BreadCrumbLinks = path.split("/").slice(1);
  let linkString = "";
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {BreadCrumbLinks[0] == "" ? (
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={""}>Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        ) : (
          BreadCrumbLinks.map((item, index) => {
            return (
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href={`${linkString}/${item}`}
                    key={`${index}-breadcrumb-item`}
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
