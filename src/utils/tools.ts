import type {ImageMetadata} from "astro";
// @ts-ignore
import Default from '../assets/img/default.png';
import {createLogger, type Logger} from '../utils'

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
        const respuesta = await fetch('http://ip-api.com/json');

        if (!respuesta.ok) {
            throw new Error(`Error al obtener geolocalización: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        // Extraer solo los campos necesarios
        const {country, countryCode, regionName, city} = datos;

        return {
            country,
            countryCode,
            regionName,
            city
        };
    } catch (error) {
        console.error('Error al obtener datos de geolocalización:', error);
        // Puedes devolver valores por defecto o null en caso de error
        return {
            country: null,
            countryCode: null,
            regionName: null,
            city: null
        };
    }
}

// --------------------------------------------------------------------------------------------------------------------

/**
 * Busca una clave en la colección de imágenes que coincida con la clave proporcionada
 */
function findMatchingImageKey(listImages: ImageCollection, key: string): string | undefined {
    return Object.keys(listImages).find(imgKey =>
        imgKey.toLowerCase().includes(key.toLowerCase())
    );
}

/**
 * Carga una imagen de forma segura, manejando errores y validaciones
 */
async function loadImageSafely(
    listImages: ImageCollection,
    key: string,
    logger: Logger
): Promise<{ default:ImageMetadata }> {
    const imageLoader = listImages[key];

    // Validar que sea una función
    if (typeof imageLoader !== 'function') {
        logger.error(`El valor de listImages["${key}"] no es una función`, imageLoader);
        return Default;
    }

    try {
        return await imageLoader();
    } catch (error) {
        logger.error(`Error al cargar la imagen "${key}"`, error);
        return Default;
    }
}


// export const getImage = (
//     listImages: ImageCollection,
//     key: string,
//     defaultImage = true,
//     debugConsole = false
// ): Promise<{ default: ImageMetadata }> => {
//
//     debugConsole && console.log('listImages', listImages)
//     debugConsole && console.log('key', key)
//
//
//     // Buscar la clave que coincide con el nombre de imagen proporcionado
//     const result = Object.keys(listImages).find(imgKey => {
//             // console.log("imgKey",imgKey)
//             return imgKey.toLowerCase().includes(key.toLowerCase())
//         }
//     );
//
//     debugConsole && console.log('result', result)
//     // Si no se encuentra ninguna coincidencia, usar una imagen por defecto
//
//     if (!result) {
//         debugConsole && console.log('!result', !result)
//
//         if (!defaultImage) {
//             const firstKey = Object.keys(listImages)[0];
//             debugConsole && console.log('firstKey', !firstKey)
//
//             const fallbackFn = listImages[firstKey];
//             debugConsole && console.log('fallbackFn', fallbackFn)
//
//             // Verificar que la entrada sea realmente una función
//             if (typeof fallbackFn !== 'function') {
//                 console.error(`El valor de listImages["${firstKey}"] no es una función`, fallbackFn);
//                 return Promise.resolve(Default);
//             }
//
//             // Si todo está bien, ejecutar la función fallback
//             return fallbackFn()
//         }
//
//         // Si no hay imágenes disponibles
//         if (Object.keys(listImages).length === 0 || defaultImage) {
//             console.warn("No hay ninguna imagen disponible en listImages");
//             return Promise.resolve(Default);
//         }
//
//     }
//
//     const selectedFn = listImages[result];
//
//     // Validar que también sea una función (por si acaso)
//     if (typeof selectedFn !== 'function') {
//         console.error(`El valor de listImages["${result}"] no es una función`, selectedFn);
//         return Promise.resolve(Default);
//     }
//
//     // @ts-ignore
//     return selectedFn().then(img => img.default);
// };

/**
 * Busca y carga una imagen por clave en una colección de imágenes.
 * Si no encuentra la imagen, puede devolver una imagen predeterminada o la primera disponible.
 */
export const getImage = async (
    listImages: ImageCollection,
    key: string,
    useDefaultOnFailure = true,
    enableDebugLogs = false
): Promise<{ default:ImageMetadata }> => {
    const logger = createLogger(enableDebugLogs);

    logger.log('listImages', listImages);
    logger.log('key', key);

    // Buscar la imagen por clave
    const matchingKey = findMatchingImageKey(listImages, key);
    logger.log('matchingKey', matchingKey);

    // Si encontramos una coincidencia, cargar esa imagen
    if (matchingKey) {
        return loadImageSafely(listImages, matchingKey, logger);
    }

    // Manejar el caso cuando no hay coincidencia
    if (!useDefaultOnFailure && Object.keys(listImages).length > 0) {
        // Usar la primera imagen disponible
        const firstKey = Object.keys(listImages)[0];
        logger.log('fallback to firstKey', firstKey);
        return loadImageSafely(listImages, firstKey, logger);
    }

    // Usar la imagen predeterminada en caso de error o si se solicitó explícitamente
    logger.warn("No hay ninguna imagen disponible que coincida con la clave");
    return Default;
};

