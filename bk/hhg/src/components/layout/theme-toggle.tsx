
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language" 

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const { t } = useLanguage(); 
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // This block MUST match what the server renders, based on the error log.
    // Error log indicates server rendered: aria-label="Light Mode", Sun visible, Moon hidden (but present).
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("light")} // If label is "Light Mode", action is to switch TO Light
        aria-label="Light Mode"           // Server-rendered aria-label
        className="text-primary hover:text-accent hover:bg-transparent"
      >
        {/* Server renders Sun visible, Moon hidden. Moon must be present in DOM. */}
        <Sun className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all" /> {/* Static: Sun visible */}
        <Moon className="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all" /> {/* Static: Moon hidden but present */}
        <span className="sr-only">Light Mode</span> {/* Server-rendered sr-only text */}
      </Button>
    );
  }

  // This block is for client-side render AFTER component is mounted and theme/language are resolved.
  const currentAriaLabel = theme === "light" ? t('theme_toggle_dark') : t('theme_toggle_light');
  const currentSrText = theme === "light" ? t('theme_toggle_dark') : t('theme_toggle_light');

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label={currentAriaLabel}
      className="text-primary hover:text-accent hover:bg-transparent"
    >
      <Sun className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">{currentSrText}</span>
    </Button>
  );
}
