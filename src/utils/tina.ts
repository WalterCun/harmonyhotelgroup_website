import type {HotelsQuery} from "../../tina/__generated__/types.ts";

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

    async hotels(filterLocation?: string): Promise<HotelsQuery["hotels"][]> {
        try {
            // Obtenemos la lista de archivos dinámicamente
            const hotelFiles: Record<string, any> = import.meta.glob('../data/hotels/*.json', {eager: true});

            if (Object.keys(hotelFiles).length === 0) {
                console.warn('⚠️ No se encontraron archivos en ../data/hotels');
                return [];
            }

            // Extraemos directamente los datos de los hoteles de los archivos
            let hoteles = Object.values(hotelFiles).map(fileContent => {
                // Asumiendo que cada archivo tiene el contenido del hotel
                // Si el contenido está anidado, ajusta esta lógica según sea necesario
                return fileContent.data?.hotels || fileContent.hotels || fileContent;
            }).filter(Boolean); // Eliminamos valores nulos o undefined

            // Aplicar filtro por ubicación si se proporciona
            if (filterLocation) {
                hoteles = hoteles.filter((hotel) => {
                    // biome-ignore lint/complexity/useOptionalChain: <explanation>
                    if (hotel.location && hotel.location.toLowerCase().includes(filterLocation.toLowerCase())){
                        return true;
                    }
                    }
                );
            }

            // Filtrar solo hoteles destacados si this.destacado es true
            if (this.destacado) {
                hoteles = hoteles.filter((hotel) => hotel.highlight === true);
            }

            // Aplicar límite si es necesario
            if (this.limit > 0) {
                hoteles = hoteles.slice(0, this.limit);
            }

            return hoteles;
        } catch (error) {
            console.error("❌ Error general obteniendo hoteles:", error);
            return [];
        }
    }


    // ----------------------------------------------------------------------------------------------------------------

    // async destinations(): Promise<DestinationsQuery["destinations"][]> {
    //     try {
    //         // Obtenemos la lista de archivos dinámicamente
    //         const destinationFiles = await this.getFiles(this.destinationsDirectory);
    //
    //         if (destinationFiles.length === 0) {
    //             console.warn(`⚠️ No se encontraron archivos en ${this.hotelsDirectory}`);
    //             return [];
    //         }
    //
    //         const destinationsPromises = destinationFiles.map((item) =>
    //             client.queries
    //                 .destinations({relativePath: item})
    //                 .then((result) => result.data.destinations)
    //                 .catch((err) => {
    //                     console.error(`❌ Error procesando ${item}:`, err);
    //                     return null;
    //                 }),
    //         );
    //
    //         const results = await Promise.all(destinationsPromises);
    //
    //         // Filtrar nulos por errores de parseo
    //         let destinations = results.filter(
    //             (destination): destination is DestinationsQuery["destinations"] =>
    //                 destination !== null,
    //         );
    //
    //         // Filtrar solo hoteles destacados si this.destacado es true
    //         if (this.destacado) {
    //             destinations = destinations.filter(
    //                 (destinations) => destinations.highlight === true,
    //             );
    //         }
    //
    //         // Aplicar límite si es necesario
    //         if (this.limit > 0) {
    //             destinations = destinations.slice(0, this.limit);
    //         }
    //
    //         return destinations;
    //     } catch (error) {
    //         console.error("❌ Error general obteniendo hoteles:", error);
    //         return [];
    //     }
    // }

    // ----------------------------------------------------------------------------------------------------------------

    // private readonly offersDirectory: string = "src/data/offers";

    // async offers(): Promise<OffersQuery["offers"][]> {
    //     try {
    //         const offersFiles = await this.getFiles(this.offersDirectory);
    //
    //         if (offersFiles.length === 0) {
    //             console.warn(`⚠️ No se encontraron archivos en ${this.offersDirectory}`);
    //             return [];
    //         }
    //
    //         const offersPromises = offersFiles.map((item) => {
    //             return client.queries
    //                 .offers({relativePath: item})
    //                 .then((result) => result.data.offers)
    //                 .catch((err) => {
    //                     console.error(`❌ Error procesando ${item}:`, err);
    //                     return null;
    //                 });
    //         });
    //
    //         const results = await Promise.all(offersPromises);
    //
    //         let offers = results.filter(
    //             (offer): offer is OffersQuery["offers"] => offer !== null,
    //         );
    //
    //         offers = offers.filter(
    //             (offer) =>
    //                 offer.expiration_date !== null &&
    //                 new Date(offer.expiration_date) >= new Date(),
    //         );
    //
    //         if (this.limit > 0) {
    //             offers = offers.slice(0, this.limit);
    //         }
    //
    //         return offers;
    //     } catch (error) {
    //         console.error("❌ Error general leyendo Archivo:", error);
    //         return [];
    //     }
    // }
}

// --------------------------------------------------------------------------------------------------------------------

// export function imageUrl({url, back = 0}: { url: string; back?: number }) {
//     let finalPath = ''
//     // Si ya tiene el prefijo correcto, devolverla tal cual
//     if (url.startsWith("/src/assets")) {
//         return url;
//     }
//
//     // Si comienza con ~ o / eliminarlo
//     const cleanPath =
//         url.startsWith("~") || url.startsWith("/") ? url.substring(1) : url;
//
//     if (back > 0) {
//         finalPath = cleanPath;
//         for (let i = 0; i < back; i++) {
//             finalPath = `../${finalPath}`;
//         }
//     } else {
//         finalPath = `/src/assets/${cleanPath}`;
//     }
//     // Devolver la ruta correcta
//     return finalPath;
// }
