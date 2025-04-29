import es from "../locales/es.json";
import en from "../locales/en.json";

interface Language {
    code: string;
    name: string;
    flag: ImageMetadata;
    status: boolean;
}

// ---------------------------------------------------------------------------------------------------

type TranslationObject = Record<string, any>;
// Mapa de idiomas soportados
export const TranslationData: Record<string, TranslationObject> = {
    en,
    es
};

// ---------------------------------------------------------------------------------------------------

import flag_en from '../assets/img/flags/en.svg';
const flag_en_usa = flag_en;

import flag_es_ecu from '../assets/img/flags/es-ecu.svg';

import flag_es from '../assets/img/flags/es.svg';
const flag_es_esp = flag_es;

/*
Codigos de paises con 3 letras
https://laendercode.net/es/3-letter-list.html

Descargar SVG desde Wikipedia "Wikipedia [Pais] Flag SVG"
*/
const languagesList: Language[] = [
    {code: 'es', name: "Español", status: true, flag: flag_es},
    {code: 'en', name: "English", status: true, flag: flag_en},
    {code: 'es-ecu', name: "Español Ecuador", status: false, flag: flag_es_ecu},
    {code: 'en-usa', name: "English USA", status: false, flag: flag_en_usa},
    {code: 'es-esp', name: "Español España", status: false, flag: flag_es_esp},
]

export const languages = languagesList.filter(lang => lang.status);
export const defaultLanguage = languages[0];

// ---------------------------------------------------------------------------------------------------

export const trans = (lang: string, key: string, defaultValue: string = key): string => {
    // Obtener el objeto de traducción para el idioma especificado
    const translations = TranslationData[lang];

    // Si el idioma no existe, devolver el valor por defecto
    if (!translations) {
        console.warn(`Idioma no soportado: ${lang}`);
        return defaultValue;
    }

    try {
        // Dividir la clave y reducir para navegar por el objeto de traducción
        const keys = key.split('.');
        const result = keys.reduce((obj, k) =>
                obj && typeof obj === 'object' && k in obj ? obj[k] : null,
            translations as any
        );

        // Devolver el resultado o el valor por defecto si no se encuentra
        return result !== null ? String(result) : defaultValue;
    } catch (error) {
        console.warn(`Error al obtener la traducción para: ${key}`, error);
        return defaultValue;
    }
};
