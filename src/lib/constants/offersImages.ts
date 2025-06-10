import type { ImageMetadata } from "astro";

// Imagenes de Destinos
// @ts-ignore
export const imagesOffers: any = import.meta.glob<{
  default: ImageMetadata;
}>("/src/assets/upload/offers/**/*.{jpeg,jpg,png,gif,webp}");
