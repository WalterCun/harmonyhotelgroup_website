import client from "../../tina/__generated__/client.ts";
import type {
    DestinationsQuery,
    HotelsQuery,
    OffersQuery,
} from "../../tina/__generated__/types.ts";

/**
 * Lee todos los archivos JSON de una carpeta y devuelve sus contenidos.
 * @returns {Promise<any[]>} - Un array con los contenidos parseados de los archivos JSON.
 * @param model
 */
export class Api {
    destacado: boolean;
    limit: number;
    VALID_FILE_EXTENSIONS: string[] = [".md", ".json", ".mdx"];

    constructor(destacado = false, limit = -1) {
        this.destacado = destacado;
        this.limit = limit;
    }

    // ----------------------------------------------------------------------------------------------------------------

    // Métod para obtener los archivos .md del directorio
    private async getFiles(directory: string): Promise<string[]> {
        try {
            // Importamos el módulo fs con promesas para operaciones asíncronas de archivos
            const fs = await import("node:fs/promises");

            // Leemos el contenido del directorio
            const files = await fs.readdir(directory);

            // Filtramos solo los archivos .md y .json
            return files.filter((file) =>
                this.VALID_FILE_EXTENSIONS.some((ext) =>
                    file.toLowerCase().endsWith(ext),
                ),
            );
        } catch (error) {
            console.error(`❌ Error leyendo el directorio ${directory}:`, error);
            return [];
        }
    }

    // ----------------------------------------------------------------------------------------------------------------

    // Añadir propiedad para el directorio de los hoteles
    private readonly hotelsDirectory: string = "src/data/hotels"; // Ruta predeterminada

    async hotels(): Promise<HotelsQuery["hotels"][]> {
        try {
            // Obtenemos la lista de archivos dinámicamente
            const hotelFiles = await this.getFiles(this.hotelsDirectory);

            if (hotelFiles.length === 0) {
                console.warn(`⚠️ No se encontraron archivos en ${this.hotelsDirectory}`);
                return [];
            }

            const hotelPromises = hotelFiles.map((item) =>
                client.queries
                    .hotels({relativePath: item})
                    .then((result) => result.data.hotels)
                    .catch((err) => {
                        console.error(`❌ Error procesando ${item}:`, err);
                        return null;
                    }),
            );

            const results = await Promise.all(hotelPromises);

            // Filtrar nulos por errores de parseo
            let hotels = results.filter(
                (hotel): hotel is HotelsQuery["hotels"] => hotel !== null,
            );

            // Filtrar solo hoteles destacados si this.destacado es true
            if (this.destacado) {
                hotels = hotels.filter((hotel) => hotel.highlight === true);
            }

            // Aplicar límite si es necesario
            if (this.limit > 0) {
                hotels = hotels.slice(0, this.limit);
            }

            return hotels;
        } catch (error) {
            console.error("❌ Error general obteniendo hoteles:", error);
            return [];
        }
    }

    // ----------------------------------------------------------------------------------------------------------------

    private readonly destinationsDirectory: string = "src/data/destinations";

    async destinations(): Promise<DestinationsQuery["destinations"][]> {
        try {
            // Obtenemos la lista de archivos dinámicamente
            const destinationFiles = await this.getFiles(this.destinationsDirectory);

            if (destinationFiles.length === 0) {
                console.warn(`⚠️ No se encontraron archivos en ${this.hotelsDirectory}`);
                return [];
            }

            const destinationsPromises = destinationFiles.map((item) =>
                client.queries
                    .destinations({relativePath: item})
                    .then((result) => result.data.destinations)
                    .catch((err) => {
                        console.error(`❌ Error procesando ${item}:`, err);
                        return null;
                    }),
            );

            const results = await Promise.all(destinationsPromises);

            // Filtrar nulos por errores de parseo
            let destinations = results.filter(
                (destination): destination is DestinationsQuery["destinations"] =>
                    destination !== null,
            );

            // Filtrar solo hoteles destacados si this.destacado es true
            if (this.destacado) {
                destinations = destinations.filter(
                    (destinations) => destinations.highlight === true,
                );
            }

            // Aplicar límite si es necesario
            if (this.limit > 0) {
                destinations = destinations.slice(0, this.limit);
            }

            return destinations;
        } catch (error) {
            console.error("❌ Error general obteniendo hoteles:", error);
            return [];
        }
    }

    // ----------------------------------------------------------------------------------------------------------------

    private readonly offersDirectory: string = "src/data/offers";

    async offers(): Promise<OffersQuery["offers"][]> {
        try {
            const offersFiles = await this.getFiles(this.offersDirectory);

            if (offersFiles.length === 0) {
                console.warn(`⚠️ No se encontraron archivos en ${this.offersDirectory}`);
                return [];
            }

            const offersPromises = offersFiles.map((item) => {
                return client.queries
                    .offers({relativePath: item})
                    .then((result) => result.data.offers)
                    .catch((err) => {
                        console.error(`❌ Error procesando ${item}:`, err);
                        return null;
                    });
            });

            const results = await Promise.all(offersPromises);

            let offers = results.filter(
                (offer): offer is OffersQuery["offers"] => offer !== null,
            );

            offers = offers.filter(
                (offer) =>
                    offer.expiration_date !== null &&
                    new Date(offer.expiration_date) >= new Date(),
            );

            if (this.limit > 0) {
                offers = offers.slice(0, this.limit);
            }

            return offers;
        } catch (error) {
            console.error("❌ Error general leyendo Archivo:", error);
            return [];
        }
    }
}

// --------------------------------------------------------------------------------------------------------------------

export function imageUrl({url, back = 0}: { url: string; back?: number }) {
    let finalPath = ''
    // Si ya tiene el prefijo correcto, devolverla tal cual
    if (url.startsWith("/src/assets")) {
        return url;
    }

    // Si comienza con ~ o / eliminarlo
    const cleanPath =
        url.startsWith("~") || url.startsWith("/") ? url.substring(1) : url;

    if (back > 0) {
        for (let i = 0; i < back; i++) {
            finalPath = `../${finalPath}`;
        }
    } else {
        finalPath = `src/assets/${cleanPath}`;
    }
    // Devolver la ruta correcta
    return finalPath;
}
