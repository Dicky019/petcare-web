import * as React from "react";
import Link from "next/link";

import { type NavItem } from "~/types/nav";
import { siteConfig } from "~/config/site";
import { cn } from "~/utils/utils";
import { Icons } from "~/components/icons";
import { useRouter } from "next/router";

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const routes = useRouter();

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm",
                    item.disabled && "cursor-not-allowed opacity-80",
                    (routes.pathname !== item.href ?? "/") ?
                      "text-muted-foreground font-medium" : "font-semibold"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  );
}
