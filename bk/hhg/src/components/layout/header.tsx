
import { AppLogo } from "@/components/icons/app-logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { CurrencySwitcher } from "@/components/layout/currency-switcher";
import { NavLinks } from "@/components/layout/nav-links";
import type { FC } from 'react';

export const Header: FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-20 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Column 1: Logo */}
        <div className="flex-shrink-0">
          <AppLogo />
        </div>

        {/* Column 2: Navigation Links - Centered by justify-between on parent */}
        <NavLinks />

        {/* Column 3: Action Buttons */}
        <div className="flex-shrink-0 flex items-center space-x-1 md:space-x-2">
          <LanguageSwitcher />
          <CurrencySwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
