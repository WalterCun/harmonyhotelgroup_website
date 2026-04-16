
"use client"

import { useContext } from 'react';
import { CurrencyContext, type CurrencyContextType } from '@/providers/currency-provider';

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
