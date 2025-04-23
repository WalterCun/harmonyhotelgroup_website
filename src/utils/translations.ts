// translations.ts - Simple translation system for the site

interface NavTranslations {
  hotels: string;
  tours: string;
  touristSites: string;
  contact: string;
}

interface FooterTranslations {
  companyInfo: string;
  contact: string;
  quickLinks: string;
  copyright: string;
}

interface CommonTranslations {
  readMore: string;
  showMore: string;
  bookNow: string;
  contactUs: string;
}

interface LanguageTranslations {
  nav: NavTranslations;
  footer: FooterTranslations;
  common: CommonTranslations;
}

interface Translations {
  [key: string]: LanguageTranslations;
}

// Define translations for different languages
const translations: Translations = {
  es: {
    // Navigation
    nav: {
      hotels: "Hoteles",
      tours: "Tours",
      touristSites: "Lugares Turísticos",
      contact: "Contacto"
    },
    // Footer
    footer: {
      companyInfo: "Ofreciendo experiencias de hospedaje excepcionales en Cuenca, Ecuador.",
      contact: "Contacto",
      quickLinks: "Enlaces Rápidos",
      copyright: "Todos los derechos reservados."
    },
    // Common
    common: {
      readMore: "Leer más",
      showMore: "Mostrar más",
      bookNow: "Reservar Ahora",
      contactUs: "Contáctenos"
    }
  },
  en: {
    // Navigation
    nav: {
      hotels: "Hotels",
      tours: "Tours",
      touristSites: "Tourist Sites",
      contact: "Contact"
    },
    // Footer
    footer: {
      companyInfo: "Offering exceptional accommodation experiences in Cuenca, Ecuador.",
      contact: "Contact",
      quickLinks: "Quick Links",
      copyright: "All rights reserved."
    },
    // Common
    common: {
      readMore: "Read more",
      showMore: "Show more",
      bookNow: "Book Now",
      contactUs: "Contact Us"
    }
  }
};

/**
 * Get a translation for a given key and language
 * @param {string} key - The translation key in dot notation (e.g., "nav.hotels")
 * @param {string} lang - The language code (e.g., "es", "en")
 * @returns {string} - The translated text or the key if no translation is found
 */
export function getTranslation(key: string, lang: string = "es"): string {
  // Default to Spanish if the language is not supported
  if (!translations[lang]) {
    lang = "es";
  }

  // Split the key into parts (e.g., "nav.hotels" -> ["nav", "hotels"])
  const parts = key.split(".");

  // Navigate through the translations object to find the requested translation
  let result: any = translations[lang];
  for (const part of parts) {
    if (result && result[part] !== undefined) {
      result = result[part];
    } else {
      // Return the key if the translation is not found
      return key;
    }
  }

  return result as string;
}

/**
 * Get the current language from localStorage or default to Spanish
 * @returns {string} - The current language code
 */
export function getCurrentLanguage(): string {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem("language") || "es";
  }
  return "es";
}