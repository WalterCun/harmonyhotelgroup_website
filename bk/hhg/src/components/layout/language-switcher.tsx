
"use client"

import * as React from "react"
import { LanguagesIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/hooks/use-language"
import { LANGUAGES, type Language } from "@/lib/constants"

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-primary hover:text-accent hover:bg-transparent" aria-label={t('language_switcher_label')}>
          <LanguagesIcon className="h-[1.5rem] w-[1.5rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t('language_switcher_label')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as Language)}>
          {LANGUAGES.map((lang) => (
            <DropdownMenuRadioItem key={lang.code} value={lang.code}>
              {lang.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
