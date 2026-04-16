
"use client"

import type { FC, PropsWithChildren} from 'react';
import React, { createContext, useState, useCallback, useEffect } from 'react';
import { DEFAULT_LANGUAGE, type Language, LANGUAGES } from '@/lib/constants';

import enMessages from '@/locales/en.json';
import esMessages from '@/locales/es.json';
import frMessages from '@/locales/fr.json';

type Messages = Record<string, string>;
const messages: Record<Language, Messages> = {
  en: enMessages,
  es: esMessages,
  fr: frMessages,
};

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'harmony-hotels-app-language';

export const LanguageProvider: FC<PropsWithChildren> = ({ children }) => {
  const [language, _setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const [currentMessages, setCurrentMessages] = useState<Messages>(messages[DEFAULT_LANGUAGE]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
    if (storedLanguage && LANGUAGES.some(lang => lang.code === storedLanguage)) {
      _setLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      setCurrentMessages(messages[language]);
      document.documentElement.lang = language;
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    }
  }, [language, isMounted]);

  const setLanguage = useCallback((newLanguage: Language) => {
    if (LANGUAGES.some(lang => lang.code === newLanguage)) {
      _setLanguage(newLanguage);
    }
  }, []);

  const t = useCallback((key: string, replacements?: Record<string, string | number>): string => {
    let message = currentMessages[key] || key;
    if (replacements) {
      Object.entries(replacements).forEach(([placeholder, value]) => {
        message = message.replace(`{${placeholder}}`, String(value));
      });
    }
    return message;
  }, [currentMessages]);
  
  // Prevent rendering children until mounted to avoid hydration mismatch based on localStorage
  // This helps ensure that the initial render matches the server.
  // The actual translation for NavLinks happens on the client AFTER mount when localStorage is read.
  if (!isMounted && typeof window !== 'undefined') { 
    // While not strictly necessary to return null here (as NavLinks would get default),
    // for more complex scenarios this pattern or a loading state might be used.
    // For NavLinks, the t() function will use default messages before mount anyway.
  }


  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

