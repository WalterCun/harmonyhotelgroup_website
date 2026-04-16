
"use client"

import * as React from "react"
import { CircleDollarSign } from "lucide-react"

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
import { useCurrency } from "@/hooks/use-currency"
import { CURRENCIES, type Currency } from "@/lib/constants"
import { useLanguage } from "@/hooks/use-language"

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency()
  const { t } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-primary hover:text-accent hover:bg-transparent" aria-label={t('currency_switcher_label')}>
          <CircleDollarSign className="h-[1.5rem] w-[1.5rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t('currency_switcher_label')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
          {CURRENCIES.map((curr) => (
            <DropdownMenuRadioItem key={curr.code} value={curr.code}>
              {curr.name} ({curr.symbol})
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
