import type { ImageMetadata } from "astro";

export const imagesHoteles = import.meta.glob<{
	default: ImageMetadata;
}>("/src/assets/upload/hotels/**/*.{jpeg,jpg,png,gif,webp}");
