"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ClockLoader } from "react-spinners";

export function RouterComboBox() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const admin_routes = [
    {
      href: `/recipes_admin`,
      label: "Recipes",
      active: pathname.includes("/recipes_admin"),
    },
    {
      href: `/store_admin`,
      label: "Stores",
      active: pathname.includes("/store_admin"),
    },
    {
      href: `/finance`,
      label: "Finance",
      active: pathname.includes("/finance"),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-36" asChild>
        <Button className=" flex " variant="outline">
          <p>Switch Route</p>{" "}
          {loading && <ClockLoader color="orange" size={20}></ClockLoader>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuLabel>Route</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup>
          {admin_routes.map((route) => {
            return (
              <div
                key={route.href}
                className="flex p-4 hover:bg-primary-foreground hover:opacity-95 rounded-md"
                onClick={() => {
                  router.push(route.href);
                  setLoading(true);
                }}
              >
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    " text-sm font-medium transition-colors hover:text-primary",
                    route.active
                      ? "text-black dark:text-white "
                      : "text-muted-foreground"
                  )}
                >
                  {route.label}
                </Link>
                <Check
                  className={cn(
                    "ml-2 mr-2 h-4 w-4",
                    route.active ? "opacity-100" : "opacity-0"
                  )}
                />{" "}
              </div>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
