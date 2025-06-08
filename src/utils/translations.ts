import en from "~/i18n/en.json";
import es from "~/i18n/es.json";

// ---------------------------------------------------------------------------------------------------

interface Language {
	name: string;
	flag: Promise<typeof import("*.svg")>;
}

// ---------------------------------------------------------------------------------------------------
/*
Codigos de paises con 3 letras
https://laendercode.net/es/3-letter-list.html

Descargar SVG desde Wikipedia "Wikipedia [Pais] Flag SVG"
*/

// TODO: Subsequently create an Image component to optimize image loading.
export const LANGUAGES: Record<string, Language> = {
	es: { name: "Español", flag: import("../assets/img/flags/es.svg") },
	en: { name: "English", flag: import("../assets/img/flags/en.svg") },
	// 'fr': {name: "Frances", flag: import('../assets/img/flags/fr.svg')},
};

type TranslationObject = Record<string, any>;
// Mapa de idiomas soportados
export const TranslationData: Record<string, TranslationObject> = {
	es,
	en
};

export const defaultLanguage = "es";

// ---------------------------------------------------------------------------------------------------

/**
 * Construye una URL con el idioma especificado manteniendo la misma ruta
 * @param url URL actual
 * @param langCode Código del idioma al que se desea cambiar
 * @returns Nueva URL con el idioma especificado
 */
export const structUrl = (
	url: URL,
	langCode?: keyof typeof LANGUAGES,
): string => {
	// Si no se proporciona un código de idioma, solo devolvemos información de la URL
	if (!langCode) {
		return url.href;
	}

	// Obtenemos el pathname actual
	let pathname = url.pathname;

	// Aseguramos que el pathname commence con '/'
	if (!pathname.startsWith("/")) {
		pathname = `/${pathname}`;
	}

	// Regex para busca /en/, /es/, /fr/ al inicio del pathname
	const mainLanguageCodes = Object.keys(LANGUAGES);
	// console.log('mainLanguageCodes',mainLanguageCodes)
	const langPattern = mainLanguageCodes.join("|");
	// console.log('langPattern',langPattern)
	const langPrefixRegex = new RegExp(`^\\/(${langPattern})\\/`);
	// console.log('langPrefixRegex',langPrefixRegex)

	let newPathname: string;

	// Si es el idioma por defecto (español)
	if (langCode === defaultLanguage) {
		// Si ya tiene un prefijo de idioma, lo eliminamos
		newPathname = langPrefixRegex.test(pathname)
			? pathname.replace(langPrefixRegex, "/")
			: pathname;
	} else {
		// Para otros idiomas, queremos añadir el prefijo
		newPathname = langPrefixRegex.test(pathname)
			? pathname.replace(langPrefixRegex, `/${langCode}/`)
			: `/${langCode}${pathname}`;
	}

	// Aseguramos que no haya doble slash
	newPathname = newPathname.replace(/\/\//g, "/");

	// Si el pathname quedó vacío, aseguramos que sea al menos "/"
	if (!newPathname) {
		newPathname = "/";
	}

	// Retornamos la URL completa con el nuevo pathname
	return `${url.origin}${newPathname}`;
};

// Caché global de traducciones que persiste entre llamadas
const translationCache: Record<string, Record<string, string>> = {};


export const trans = (
	lang:string,
	key: string,
	params?: Record<string, string | number>,
): string => {
	// Cachear las traducciones para evitar búsquedas repetidas
	if (!translationCache[lang]) {
		translationCache[lang] = {};
	}

    // Crear clave de caché
    const cacheKey = `${key}${params ? JSON.stringify(params) : ""}`;

    // Verificar si la traducción ya está en caché
    if (translationCache[lang][cacheKey]) {
		return translationCache[lang][cacheKey];
	}

	// Obtener el objeto de traducción para el idioma especificado
	const translations = TranslationData[lang] || TranslationData.es;

    // Acceder a traducciones anidadas usando notación de corchetes
    const keys = key.split(".");
	let result: TranslationObject | undefined = translations;

    for (const k of keys) {
        if (result && typeof result === 'object') {
            result = result[k]; // Usar notación de corchetes en lugar de .get()
        } else {
            result = undefined;
            break;
        }
    }

    if (result === null || result === undefined) {
		// En producción, usar directamente el idioma predeterminado sin recursión
		return key;
	}

	let translation = String(result);

	// Reemplazar parámetros de manera más eficiente
	if (params) {
		for (const [paramName, paramValue] of Object.entries(params)) {
			translation = translation.replace(
				new RegExp(`\\{\\{\\s*${paramName}\\s*\\}\\}`, "g"),
				String(paramValue),
			);
		}
	}

	// Guardar en caché
	translationCache[lang][cacheKey] = translation;
	return translation;
};

// ---------------------------------------------------------------------------------------------------

export function currentLang(): string {
	return localStorage.getItem("language") || "es";
}

// Función para cambiar el idioma
export function setLanguage(langCode: string): void {
	// Verificar si el idioma es válido
	Object.entries(LANGUAGES).map((lang) => {
		const [code, _] = lang;
		if (code === langCode) {
			// Guardar en localStorage para persistencia
			if (typeof window !== "undefined" && window.localStorage) {
				try {
					localStorage.setItem("language", langCode);
				} catch (error) {
					console.error("Error guardando idioma en localStorage:", error);
				}
			}
		}
	});
}
