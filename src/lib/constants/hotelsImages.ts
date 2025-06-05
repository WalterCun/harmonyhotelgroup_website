import type {ImageMetadata} from "astro";
// Images Hotel Majestic 2
// @ts-ignore
// const imagesHM2 = import.meta.glob<{
//     default: ImageMetadata
// }>('/src/assets/upload/hotels/HotelMajestic2/*.{jpeg,jpg,png,gif}') //, { eager: true })
//
// // Images Hotel Ensueños
// // @ts-ignore
// const imagesHE = import.meta.glob<{
//     default: ImageMetadata
// }>('/src/assets/upload/hotels/HotelEnsuenos*.{jpeg,jpg,png,gif}') //, { eager: true })


// Imágenes Hotel Majestic 2
export const imagesHoteles = import.meta.glob<{
    default: ImageMetadata
}>('/src/assets/upload/hotels/**/*.{jpeg,jpg,png,gif,webp}');

// // Imágenes Hotel Ensueños
// const imagesHE = import.meta.glob<{
//     default: ImageMetadata
// }>('/src/assets/upload/hotels/HotelEnsuenos/*.{jpeg,jpg,png,gif}');
//
// // Combina los dos objetos de imágenes en uno solo
// export const imagesHoteles = {
//     ...imagesHM2,
//     // ...imagesHE
// };
