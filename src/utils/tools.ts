import type { ImageMetadata } from "astro";
import { createLogger } from "utils/logger.ts";
// @ts-ignore
import Default from "../assets/img/default.png";

const logger = createLogger(false, "tools.ts");

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
      throw new Error(`Error al obtener geolocalización: ${respuesta.status}`);
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
 * Resuelve una ruta de imagen y devuelve sus metadatos.
 * Si la imagen no existe, puede devolver una imagen predeterminada o lanzar un error.
 *
 * @param imagePath - Ruta relativa de la imagen a resolver
 * @param fallbackToDefault - Si se debe usar la imagen predeterminada cuando no se encuentra la solicitada
 * @returns Promesa que resuelve a los metadatos de la imagen
 */
export const resolveImage = async (
  imagePath: string,
  fallbackToDefault = true,
): Promise<{ default: ImageMetadata }> => {
  // Constantes para rutas y patrones
  const ASSETS_BASE_PATH = "/src/assets";

  // Decodificar la ruta de la imagen para manejar caracteres especiales en URLs
  const decodedPath = decodeURIComponent(imagePath);
  const fullImagePath = `${ASSETS_BASE_PATH}${decodedPath}`;

  // Cargar todas las imágenes disponibles
  const availableImages = import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/upload/**/*.{jpeg,jpg,png,gif,webp}",
  );

  // Verificar si la imagen solicitada existe
  const imageExists = fullImagePath in availableImages;

  if (imageExists) {
    // Caso 1: La imagen existe, cargarla y devolverla
    return availableImages[fullImagePath]();
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else if (fallbackToDefault) {
    // Caso 2: La imagen no existe pero se permite usar la predeterminada
    logger.warn(
      `No se encontró la imagen: ${imagePath}. Usando imagen predeterminada.`,
    );
    return Promise.resolve({ default: Default });
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    // Caso 3: La imagen no existe y no se permite usar la predeterminada
    throw new Error(
      `La imagen "${imagePath}" no existe en el patrón: "/src/assets/upload/**/*.{jpeg,jpg,png,gif,webp}"`,
    );
  }
};
