import type {DestinationsQuery, HotelsQuery, OffersQuery} from "../../tina/__generated__/types.ts";
import client from "../../tina/__generated__/client.ts";

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

    readonly hotels_json = [
        'Hotel_Majestic2_by_HHG.md'
    ];

    async hotels(): Promise<HotelsQuery["hotels"][]> {
        try {
            const hotelPromises = this.hotels_json.map(item =>
                client.queries.hotels({relativePath: item})
                    .then(result => result.data.hotels)
                    .catch(err => {
                        console.error(`❌ Error procesando ${item}:`, err);
                        return null;
                    })
            );

            const results = await Promise.all(hotelPromises);

            // Filtrar nulos por errores de parseo
            let hotels = results.filter((hotel): hotel is HotelsQuery["hotels"] => hotel !== null);

            // Filtrar solo hoteles destacados si this.destacado es true
            if (this.destacado) {
                hotels = hotels.filter(hotel => hotel.highlight === true);
            }

            // Aplicar límite si es necesario
            if (this.limit > 0) {
                hotels = hotels.slice(0, this.limit);
            }
            return hotels;
        } catch (error) {
            console.error('❌ Error general leyendo JSONs:', error);
            return [];
        }
    }

    // ----------------------------------------------------------------------------------------------------------------

    readonly destinations_json = [
        'Chorro_Giron.json'
    ]

    async destinations(): Promise<DestinationsQuery["destinations"][]> {
        try {
            const destinationsPromises = this.destinations_json.map(item => {
                return client.queries.destinations({relativePath: item})
                    .then(result => result.data.destinations)
                    .catch(err => {
                        console.error(`❌ Error procesando ${item}:`, err);
                        return null;
                    });
            });

            const results = await Promise.all(destinationsPromises);

            // Filtrar nulos por errores de parseo
            let destinations = results.filter((destination): destination is DestinationsQuery["destinations"] => destination !== null);

            // Filtrar solo hoteles destacados si this.destacado es true
            if (this.destacado) {
                destinations = destinations.filter(destination => destination.highlight === true);
            }

            // Aplicar límite si es necesario
            if (this.limit > 0) {
                destinations = destinations.slice(0, this.limit);
            }

            return destinations;
        } catch (error) {
            console.error('❌ Error general leyendo JSONs:', error);
            return [];
        }
    }

    // ----------------------------------------------------------------------------------------------------------------

    readonly offers_json = [
        'Dia_Madre.json'
    ]

    async offers(): Promise<OffersQuery["offers"][]> {
        try {
            const offersPromises = this.offers_json.map(item => {
                return client.queries.offers({relativePath: item})
                    .then(result => result.data.offers)
                    .catch(err => {
                        console.error(`❌ Error procesando ${item}:`, err);
                        return null;
                    })
            })

            const results = await Promise.all(offersPromises);

            let offers = results.filter((offer): offer is OffersQuery["offers"] => offer !== null);

            // if (this.destacado) {
            //     offers = offers.filter(offer=>offer.expiration_date)
            // }
            offers = offers.filter((offer => offer.expiration_date !== null && new Date(offer.expiration_date) >= new Date()))

            if (this.limit > 0) {
                offers = offers.slice(0, this.limit);
            }

            return offers;
        } catch (error) {
            console.error('❌ Error general leyendo JSONs:', error);
            return [];
        }
    }

    // ----------------------------------------------------------------------------------------------------------------

    // readonly blog_json = []

    // async blogs(): Promise<BlogQuery["blogs"][]>{
    //     try{
    //         const offersPromises = this.offers_json.map(item => {
    //             return client.queries.offers({relativePath: item})
    //                 .then(result => result.data.offers)
    //                 .catch(err => {
    //                     console.error(`❌ Error procesando ${item}:`, err);
    //                     return null;
    //                 })
    //         })
    //
    //         const results = await Promise.all(offersPromises);
    //
    //         let  offers = results.filter((offer): offer is OffersQuery["offers"] => offer !== null);
    //
    //         // if (this.destacado) {
    //         //     offers = offers.filter(offer=>offer.expiration_date)
    //         // }
    //
    //         if (this.limit > 0) {
    //             offers = offers.slice(0, this.limit);
    //         }
    //
    //         return offers;
    //     }
    //     catch (error){
    //         console.error('❌ Error general leyendo JSONs:', error);
    //         return [];
    //     }
    // }

}

export function imageUrl({url, back = 0}: {url: string, back: number}) {
    // Si ya tiene el prefijo correcto, devolverla tal cual
    if (url.startsWith('src/assets')) {
        return url;
    }

    // Si comienza con ~ o / eliminarlo
    const cleanPath = url.startsWith('~') || url.startsWith('/') ? url.substring(1) : url;

    let finalPath = `src/assets/${cleanPath}`

    for (let i = 0; i < back; i++) {
        finalPath = `../${finalPath}`
    }
    // Devolver la ruta correcta
    return finalPath;
}