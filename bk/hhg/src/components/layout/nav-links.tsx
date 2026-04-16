
"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import type { FC } from 'react';

interface NavLinkItem {
  href: string;
  labelKey: string;
}

// Updated navigation items to point to dedicated pages
const navItems: NavLinkItem[] = [
  { href: "/hotels", labelKey: "nav_hotels_link" },
  { href: "/destinations", labelKey: "nav_destinations" },
  { href: "/offers", labelKey: "nav_offers" },
  { href: "/loyalty", labelKey: "nav_loyalty_plan" },
  { href: "/blog", labelKey: "nav_blog" },
  { href: "/contact", labelKey: "nav_contact" },
];

export const NavLinks: FC = () => {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.labelKey} 
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive ? "text-primary" : "text-foreground/70"
            )}
          >
            {t(item.labelKey)}
          </Link>
        );
      })}
    </nav>
  );
};
