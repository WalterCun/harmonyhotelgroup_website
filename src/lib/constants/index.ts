import {lang_es, lang_en, type Language, LANGUAGES, DEFAULT_LANGUAGE} from "./language";
import {type Currency, CURRENCIES, DEFAULT_CURRENCY, exchangeRates} from "./currency";
import {whatsappNumber, formatWhatsAppMessage, createWhatsAppLink} from "./whatsapp";
import {
    type CityOption,
    adultOptions,
    childrenOptions,
    roomOptions,
    groupRoomTypeOptions,
    vehicleTypeOptions
} from "./reservation-form";
import {
    facebookUrl,
    twitterUrl,
    instagramUrl,
    tiktokUrl,
    linkedinUrl,
    youtubeUrl,
    whatsappUrl
} from "./social-media";
import {
    emailUrl,
    phoneUrl,
    websiteUrl,
    addressUrl,
    directionsUrl
} from "./contact";

export {
    // Language constants
    lang_es,
    lang_en,
    type Language,
    LANGUAGES,
    DEFAULT_LANGUAGE,

    // Currency constants
    type Currency,
    CURRENCIES,
    DEFAULT_CURRENCY,
    exchangeRates,

    // WhatsApp constants
    whatsappNumber,
    formatWhatsAppMessage,
    createWhatsAppLink,

    // Limit constants
    type CityOption,
    adultOptions,
    childrenOptions,
    roomOptions,
    groupRoomTypeOptions,
    vehicleTypeOptions,

    // Social media URL constants
    facebookUrl,
    twitterUrl,
    instagramUrl,
    tiktokUrl,
    linkedinUrl,
    youtubeUrl,
    whatsappUrl,

    // Contact URL constants
    emailUrl,
    phoneUrl,
    websiteUrl,
    addressUrl,
    directionsUrl
};
