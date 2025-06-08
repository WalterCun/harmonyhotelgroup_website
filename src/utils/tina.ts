import type {DestinationsQuery, HotelsQuery, OffersQuery} from "../../tina/__generated__/types.ts";
import {createLogger} from "utils/logger.ts";
import {DEBUG} from "lib/constants/global.ts";

const logger = createLogger(false, "tina.ts")

/**
 * Lee todos los archivos JSON de una carpeta y devuelve sus contenidos.
 * @returns {Promise<any[]>} - Un array con los contenidos parseados de los archivos JSON.
 * @param model
 */
export class Api {
    destacado: boolean;
    limit: number;

    constructor(destacado = false, limit = -1) {
        this.destacado = destacado;
        this.limit = limit;
    }

    // ----------------------------------------------------------------------------------------------------------------

    async hotels(filterLocation?: string): Promise<any[]> {
        try {
            // Obtenemos la lista de archivos dinámicamente
            // @ts-ignore
            const hotelFiles: Record<string, HotelsQuery['hotels']> = import.meta.glob('../data/hotels/*.json', {eager: true});

            // logger.info('hotelFiles', hotelFiles)

            if (Object.keys(hotelFiles).length === 0) {
                logger.warn('⚠️ No se encontraron archivos en ../data/hotels');
                return [];
            }

            let hoteles = Object.entries(hotelFiles).map(([filePath, fileContent]) => {
                // Extraer el nombre del archivo (sin extensión) del path
                const fileName = filePath.split('/').pop()?.replace('.json', '');
                // Obtener los datos del hotel
                // Si no hay datos, retornar null (se filtrará después)
                if (!fileContent) return null;

                // Crear una copia para no mutar el objeto original
                const hotelData = {...fileContent};

                // Retornar objeto con metadatos añadidos
                return {
                    _filename: fileName,
                    _path: filePath,
                    ...hotelData
                };

            }).filter(Boolean); // Eliminamos valores nulos o undefined


            // Aplicar filtro por ubicación si se proporciona
            if (filterLocation) {
                hoteles = hoteles.filter((hotel) => {
                        // biome-ignore lint/complexity/useOptionalChain: <explanation>
                        if (hotel?.location && hotel?.location.toLowerCase().includes(filterLocation.toLowerCase())) {
                            return true;
                        }
                    }
                );
            }

            // Filtrar solo hoteles destacados si this.destacado es true
            if (this.destacado) {
                hoteles = hoteles.filter((hotel) => hotel?.highlight === true);
            }

            // Aplicar límite si es necesario
            if (this.limit > 0) {
                hoteles = hoteles.slice(0, this.limit);
            }

            // logger.info('hoteles', hoteles)
            return hoteles;
        } catch (error) {
            logger.error("❌ Error general obteniendo hoteles:", error);
            return [];
        }
    }

    // ----------------------------------------------------------------------------------------------------------------

    async destinations(filterLocation?: string): Promise<any[]> {
        try {
            // Obtenemos la lista de archivos dinámicamente
            // @ts-ignore
            const destinationsFiles: Record<string, DestinationsQuery['destinations']> = import.meta.glob('../data/destinations/*.json', {eager: true});

            if (Object.keys(destinationsFiles).length === 0) {
                logger.warn('⚠️ No se encontraron archivos en ../data/destinations');
                return [];
            }

            let destinations = Object.entries(destinationsFiles).map(([filePath, fileContent]) => {
                // Extraer el nombre del archivo (sin extensión) del path
                const fileName = filePath.split('/').pop()?.replace('.json', '');
                // Obtener los datos del hotel
                // Si no hay datos, retornar null (se filtrará después)
                if (!fileContent) return null;

                // Crear una copia para no mutar el objeto original
                const hotelData = {...fileContent};

                // Retornar objeto con metadatos añadidos
                return {
                    _filename: fileName,
                    _path: filePath,
                    ...hotelData
                };

            }).filter(Boolean); // Eliminamos valores nulos o undefined

            // Aplicar filtro por ubicación si se proporciona
            if (filterLocation) {
                destinations = destinations.filter((destination) => {
                        // biome-ignore lint/complexity/useOptionalChain: <explanation>
                        if (destination?.location && destination?.location.toLowerCase().includes(filterLocation.toLowerCase())) {
                            return true;
                        }
                    }
                );
            }

            // Filtrar solo hoteles destacados si this.destacado es true
            if (this.destacado) {
                destinations = destinations.filter((destinacion) => destinacion?.highlight === true);
            }

            // Aplicar límite si es necesario
            if (this.limit > 0) {
                destinations = destinations.slice(0, this.limit);
            }

            return destinations;
        } catch (error: any) {
            logger.error("❌ Error general obteniendo hoteles:", error);
            return [];
        }
    }

    // ----------------------------------------------------------------------------------------------------------------

    // private readonly offersDirectory: string = "src/data/offers";

    async offers(filterLocation?: string): Promise<any[]> {
        try {
            // Obtenemos la lista de archivos dinámicamente
            // @ts-ignore
            const offersFiles: Record<string, OffersQuery['offers']> = import.meta.glob('../data/offers/*.json', {eager: true});

            if (Object.keys(offersFiles).length === 0) {
                logger.warn('⚠️ No se encontraron archivos en ../data/offers');
                return [];
            }

            let offers: any = Object.entries(offersFiles).map(([filePath, fileContent]) => {
                // Extraer el nombre del archivo (sin extensión) del path
                const fileName = filePath.split('/').pop()?.replace('.json', '');
                // Obtener los datos del hotel
                // Si no hay datos, retornar null (se filtrará después)
                if (!fileContent) return null;

                // Crear una copia para no mutar el objeto original
                const offersData = {...fileContent};

                // Retornar objeto con metadatos añadidos
                return {
                    _filename: fileName,
                    _path: filePath,
                    ...offersData
                };

            }).filter(Boolean); // Eliminamos valores nulos o undefined

            // Aplicar filtro por ubicación si se proporciona
            if (filterLocation) {
                offers = offers.filter((offer: any) => {
                        // biome-ignore lint/complexity/useOptionalChain: <explanation>
                        if (offer.location && offer.location.toLowerCase().includes(filterLocation.toLowerCase())) {
                            return true;
                        }
                    }
                );
            }

            offers = offers.filter(
                (offer: any) =>
                    offer.expiration_date !== null &&
                    new Date(offer.expiration_date) >= new Date(),
            );

            // Aplicar límite si es necesario
            if (this.limit > 0) {
                offers = offers.slice(0, this.limit);
            }

            return offers
        } catch (error) {
            logger.error("❌ Error general leyendo Archivo:", error);
            return [];
        }
    }
}

// --------------------------------------------------------------------------------------------------------------------

export function imageUrl({url, back = 0, startPath = ""}: { url: string; back?: number, startPath?: "" | "/" }) {
    let finalPath = ''
    // Si ya tiene el prefijo correcto, devolverla tal cual
    if (url.startsWith(`${startPath}src/assets`)) {
        return url;
    }

    // Si comienza con ~ o / eliminarlo
    const cleanPath =
        url.startsWith("~") || url.startsWith("/") ? url.substring(1) : url;

    if (back > 0) {
        finalPath = cleanPath;
        for (let i = 0; i < back; i++) {
            finalPath = `../${finalPath}`;
        }
    } else {
        finalPath = `${startPath}src/assets/${cleanPath}`;
    }
    // Devolver la ruta correcta
    return finalPath;
}
