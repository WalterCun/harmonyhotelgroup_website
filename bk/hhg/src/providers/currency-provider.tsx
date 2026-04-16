
"use client"

import type { FC, PropsWithChildren} from 'react';
import React, { createContext, useState, useCallback, useEffect } from 'react';
import { DEFAULT_CURRENCY, CURRENCIES, exchangeRates, type Currency } from '@/lib/constants';

export interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (amount: number, baseCurrency?: Currency) => string;
}

export const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CURRENCY_STORAGE_KEY = 'harmony-hotels-app-currency';

export const CurrencyProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currency, _setCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY) as Currency | null;
    if (storedCurrency && CURRENCIES.some(curr => curr.code === storedCurrency)) {
      _setCurrency(storedCurrency);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
    }
  }, [currency, isMounted]);

  const setCurrency = useCallback((newCurrency: Currency) => {
    if (CURRENCIES.some(curr => curr.code === newCurrency)) {
      _setCurrency(newCurrency);
    }
  }, []);

  const formatPrice = useCallback((amount: number, baseCurrency: Currency = 'USD'): string => {
    const rate = exchangeRates[currency] / exchangeRates[baseCurrency];
    const convertedAmount = amount * rate;
    
    return new Intl.NumberFormat(undefined, { 
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(convertedAmount);
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

