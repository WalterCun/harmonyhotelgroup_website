import type { ImageMetadata } from "astro";
// @ts-ignore
import Default from "../assets/img/default.png";
import { createLogger } from "utils/logger.ts";

const logger = createLogger(false, "tools.ts");

type ImageLoader = () => Promise<{ default: ImageMetadata }>;
type ImageCollection = Record<string, ImageLoader>;

// Funcion para crear un array de numeros
export function range(start: number, end: number) {
    const result = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}

// --------------------------------------------------------------------------------------------------------------------

/**
 * Obtiene información de geolocalización basada en la IP del usuario
 * @returns Promesa con datos de país, código de país, región y ciudad
 */
export async function getGeolocation() {
    try {
        const respuesta = await fetch("http://ip-api.com/json");

        if (!respuesta.ok) {
            throw new Error(
                `Error al obtener geolocalización: ${respuesta.status}`,
            );
        }

        const datos = await respuesta.json();

        // Extraer solo los campos necesarios
        const { country, countryCode, regionName, city } = datos;

        return {
            country,
            countryCode,
            regionName,
            city,
        };
    } catch (error) {
        logger.error("Error al obtener datos de geolocalización:", error);
        // Puedes devolver valores por defecto o null en caso de error
        return {
            country: null,
            countryCode: null,
            regionName: null,
            city: null,
        };
    }
}

// --------------------------------------------------------------------------------------------------------------------

/**
 * Busca una clave en la colección de imágenes que coincida con la clave proporcionada
 */
function findMatchingImageKey(
    listImages: ImageCollection,
    key: string,
): string | undefined {
    return Object.keys(listImages).find((imgKey) =>
        imgKey.toLowerCase().includes(key.toLowerCase()),
    );
}

/**
 * Carga una imagen de forma segura, manejando errores y validaciones
 */
async function loadImageSafely(
    listImages: ImageCollection,
    key: string,
): Promise<{ default: ImageMetadata }> {
    const imageLoader = listImages[key];

    // Validar que sea una función
    if (typeof imageLoader !== "function") {
        logger.error(
            `El valor de listImages["${key}"] no es una función`,
            imageLoader,
        );
        return Promise.resolve({ default: Default });
    }

    try {
        return await imageLoader();
    } catch (error) {
        logger.error(`Error al cargar la imagen "${key}"`, error);
        return Promise.resolve({ default: Default });
    }
}

/**
 * Busca y carga una imagen por clave en una colección de imágenes.
 * Si no encuentra la imagen, puede devolver una imagen predeterminada o la primera disponible.
 */
export const getImage = async (
    listImages: ImageCollection,
    key: string,
    useDefaultOnFailure = true,
    enableDebugLogs = false,
): Promise<{ default: ImageMetadata }> => {
    logger.log("listImages", listImages);
    logger.log("key", key);

    // Buscar la imagen por clave
    const matchingKey = findMatchingImageKey(listImages, key);
    logger.log("matchingKey", matchingKey);

    // Si encontramos una coincidencia, cargar esa imagen
    if (matchingKey) {
        return loadImageSafely(listImages, matchingKey);
    }

    // Manejar el caso cuando no hay coincidencia
    if (!useDefaultOnFailure && Object.keys(listImages).length > 0) {
        // Usar la primera imagen disponible
        const firstKey = Object.keys(listImages)[0];
        logger.log("fallback to firstKey", firstKey);
        return loadImageSafely(listImages, firstKey);
    }

    // Usar la imagen predeterminada en caso de error o si se solicitó explícitamente
    logger.warn("No hay ninguna imagen disponible que coincida con la clave");
    return Promise.resolve({ default: Default });
};
