import es from "../i18n/es.json";
import en from "../i18n/en.json";
import fr from "../i18n/fr.json";
// ---------------------------------------------------------------------------------------------------
import flag_en from '../assets/img/flags/en.svg';

const flag_en_usa = flag_en;

import flag_es_ecu from '../assets/img/flags/es-ecu.svg';
import flag_fr from '../assets/img/flags/fr.svg';

import flag_es from '../assets/img/flags/es.svg';

const flag_es_esp = flag_es;

// ---------------------------------------------------------------------------------------------------

interface Language {
    code: string;
    name: string;
    flag: ImageMetadata;
    status: boolean;
}

// ---------------------------------------------------------------------------------------------------



/*
Codigos de paises con 3 letras
https://laendercode.net/es/3-letter-list.html

Descargar SVG desde Wikipedia "Wikipedia [Pais] Flag SVG"
*/

const languagesList: Language[] = [
    {code: 'es', name: "Español", status: true, flag: flag_es},
    {code: 'en', name: "English", status: true, flag: flag_en},
    {code: 'fr', name: "Français", status: true, flag: flag_fr},
    {code: 'es-ecu', name: "Español Ecuador", status: false, flag: flag_es_ecu},
    {code: 'en-usa', name: "English USA", status: false, flag: flag_en_usa},
    {code: 'es-esp', name: "Español España", status: false, flag: flag_es_esp},
]
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type TranslationObject = Record<string, any>;
// Mapa de idiomas soportados
export const TranslationData: Record<string, TranslationObject> = {
    en,
    es,
    fr
};

export const languages = languagesList.filter(lang => lang.status);
export const defaultLanguage = {code: 'es', name: "Español", status: true, flag: flag_es};

// ---------------------------------------------------------------------------------------------------

/**
 * Construye una URL con el idioma especificado manteniendo la misma ruta
 * @param url URL actual
 * @param langCode Código del idioma al que se desea cambiar
 * @returns Nueva URL con el idioma especificado
 */
export const structUrl = (url: URL, langCode?: string): string => {
    // Si no se proporciona un código de idioma, solo devolvemos información de la URL
    if (!langCode) {
        return url.href;
    }

    // Obtenemos el pathname actual
    const pathname = url.pathname;

    // Regex para busca /en/, /es/, /fr/ al inicio del pathname
    const mainLanguageCodes = Object.keys(languages);
    const langPattern = mainLanguageCodes.join('|');
    const langPrefixRegex = new RegExp(`^\\/(${langPattern})\\/`);

    // const langPrefixRegex = /^\/(en|es|fr)\//;

    let newPathname = '';

    // Si es el idioma por defecto (español) y no queremos prefijo
    if (langCode === defaultLanguage.code) {
        // Si ya tiene un prefijo de idioma, lo eliminamos
        if (langPrefixRegex.test(pathname)) {
            newPathname = pathname.replace(langPrefixRegex, '/');
        } else {
            // Mantener la ruta actual si ya no tiene prefijo
            newPathname = pathname;
        }
    } else {
        // Para otros idiomas, queremos añadir el prefijo
        if (langPrefixRegex.test(pathname)) {
            // Ya tiene un prefijo de idioma, lo reemplazamos
            newPathname = pathname.replace(langPrefixRegex, `/${langCode}/`);
        } else {
            // No tiene prefijo, añadimos el nuevo
            newPathname = `/${langCode}${pathname}`;
        }
    }

    // Aseguramos que no haya doble slash
    newPathname = newPathname.replace(/\/\//g, '/');

    // Retornamos la URL completa con el nuevo pathname
    return `${url.origin}${newPathname}`;
};


// biome-ignore lint/style/useDefaultParameterLast: <explanation>
export const trans = (lang: string = defaultLanguage.code, key: string, params?: Record<string, object>): string => {
    // Obtener el objeto de traducción para el idioma especificado
    const translations = TranslationData[lang];

    // Si el idioma no existe, devolver el valor por defecto
    if (!translations) {
        console.warn(`Idioma no soportado: ${lang}`);
        return trans(defaultLanguage.code, key, params);
    }

    try {
        // Dividir la clave y reducir para navegar por el objeto de traducción
        const keys = key.split('.');
        const result = keys.reduce((obj, k) =>
                obj && typeof obj === 'object' && k in obj ? obj[k] : null,
            translations as TranslationObject
        );

        // Si no se encuentra la traducción, intentar con el idioma por defecto
        if (result === null) {
            return `No translation found for: ${key}`;
            // return trans(defaultLanguage.code, key, params);
        }

        // Convertir a string
        let translation = String(result);

        // Reemplazar parámetros si se proporcionaron
        if (params && typeof params === 'object') {
            // Reemplazar cada parámetro en el formato {{nombreParametro}}
            // biome-ignore lint/complexity/noForEach: <explanation>
            Object.entries(params).forEach(([paramName, paramValue]) => {
                const regex = new RegExp(`\\{\\{\\s*${paramName}\\s*\\}\\}`, 'g');
                translation = translation.replace(regex, String(paramValue));
            });
        }

        return translation;
    } catch (error) {
        console.warn(`Error al obtener la traducción para: ${key}`, error);
        return trans(defaultLanguage.code, key, params);
    }
};

// ---------------------------------------------------------------------------------------------------

// Variables y tipos
let currentLanguage: string = getInitialLanguage();

// Función para obtener el idioma inicial
function getInitialLanguage(): string {
    // Verificar si estamos en el navegador
    if (typeof window !== 'undefined' && window.localStorage) {
        try {
            // Intentar obtener el idioma guardado en localStorage
            const savedLanguage = localStorage.getItem('language');

            // Verificar si el idioma guardado es válido
            if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
                return savedLanguage;
            }

            // Intentar detectar el idioma del navegador
            const browserLang = navigator.language.split('-')[0];
            if (languages.some(lang => lang.code === browserLang)) {
                // Guardar el idioma detectado en localStorage para futuras visitas
                localStorage.setItem('language', browserLang);
                return browserLang;
            }
        } catch (error) {
            console.error('Error accediendo a localStorage:', error);
        }
    }

    // Si no hay idioma guardado o no estamos en navegador, usar el idioma por defecto
    return defaultLanguage.code;
}

// Función para cambiar el idioma
export function setLanguage(langCode: string): void {
    // Verificar si el idioma es válido
    if (languages.some(lang => lang.code === langCode)) {
        // Actualizar la variable global
        currentLanguage = langCode;

        // Guardar en localStorage para persistencia
        if (typeof window !== 'undefined' && window.localStorage) {
            try {
                localStorage.setItem('language', langCode);
            } catch (error) {
                console.error('Error guardando idioma en localStorage:', error);
            }
        }
    }
}

// Función para obtener el idioma actual
// export function getCurrentLanguage(): string {
//     // Si estamos en el navegador y la variable global no tiene un valor válido, intentar obtener de localStorage
//     if (typeof window !== 'undefined' && window.localStorage &&
//         (!currentLanguage || !languages.some(lang => lang.code === currentLanguage))) {
//         try {
//             const savedLanguage = localStorage.getItem('language');
//
//             // Si hay un idioma válido en localStorage, actualizar la variable global
//             if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
//                 currentLanguage = savedLanguage;
//                 return savedLanguage;
//             }
//         } catch (error) {
//             console.error('Error leyendo idioma de localStorage:', error);
//         }
//     }
//
//     return currentLanguage || defaultLanguage.code;
// }

// Función para sincronizar el idioma actual con localStorage
// export function syncLanguageWithStorage(): void {
//     if (typeof window !== 'undefined' && window.localStorage) {
//         try {
//             // Obtener el idioma actual de localStorage
//             const savedLanguage = localStorage.getItem('language');
//
//             // Si hay un idioma válido en localStorage, actualizar la variable global
//             if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
//                 currentLanguage = savedLanguage;
//             } else {
//                 // Si no hay un idioma válido en localStorage, guardar el idioma actual
//                 localStorage.setItem('language', getCurrentLanguage());
//             }
//         } catch (error) {
//             console.error('Error sincronizando idioma con localStorage:', error);
//         }
//     }
// }
