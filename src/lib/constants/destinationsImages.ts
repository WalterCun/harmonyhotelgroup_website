import type {ImageMetadata} from "astro";

// Imagenes de Destinos
// @ts-ignore
export const imagesDestinations:any = import.meta.glob<{
    default: ImageMetadata
}>('/src/assets/upload/destinations/**/*.{jpeg,jpg,png,gif,webp}')
