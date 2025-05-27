export const lang_es = "es";
export const lang_en = "en";

export type Language = "en" | "es";
export const LANGUAGES: { code: Language; name: string }[] = [
	{ code: "en", name: "English" },
	{ code: "es", name: "Español" },
	// { code: 'fr', name: 'Français' },
];
export const DEFAULT_LANGUAGE: Language = "es";

export type Currency = "USD" | "EUR";
export const CURRENCIES: { code: Currency; name: string; symbol: string }[] = [
	{ code: "USD", name: "US Dollar", symbol: "$" },
	{ code: "EUR", name: "Euro", symbol: "€" },
];
export const DEFAULT_CURRENCY: Currency = "USD";

// Mock exchange rates relative to USD
export const exchangeRates: Record<Currency, number> = {
	USD: 1,
	EUR: 0.92,
};

// -------------------------------------------------------------------------------------------------------------------

// Agrega esto a tu archivo constants.ts existente
export const whatsappNumber = import.meta.env.PUBLIC_WHATSAPP_NUMBER;

// Función útil para generar enlaces de WhatsApp con mensajes predefinidos
export const formatWhatsAppText = (message: string) => {
	const encodedMessage = encodeURIComponent(message);
	return `https://wa.me/${whatsappNumber}${message ? `?text=${encodedMessage}` : ""}`;
};

// -------------------------------------------------------------------------------------------------------------------

// Limite de generadores
export const maxAdults: number = 10;
export const maxChildren: number = 9;

// -------------------------------------------------------------------------------------------------------------------

// URL de Redes Sociales
export const facebookUrl: string | null =
	"https://www.facebook.com/hotelmajestic2cuenca/";
export const twitterUrl: string | null = null;
export const instagramUrl: string | null =
	"https://www.instagram.com/harmonyhotel/";
export const tiktokUrl: string | null = "https://www.tiktok.com/@harmonyhotel";
export const linkedinUrl: string | null = null;
export const youtubeUrl: string | null = null;
export const whatsappUrl: string | null = "https://wa.me/593996146471";

// -------------------------------------------------------------------------------------------------------------------

// URL de contacto
export const emailUrl: string = "mailto:<gerencia@harmonyhotelgroup.com>";
export const phoneUrl: string = "tel:+593996146471";
export const websiteUrl: string = "https://harmonyhotelgroup.com";
export const addressUrl: string = "https://goo.gl/maps/1234567890";
export const directionsUrl: string = "https://goo.gl/maps/1234567890";
