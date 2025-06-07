import {defineConfig} from "tinacms";

// Verificar y utilizar las variables de entorno, o usar valores de respaldo para desarrollo local
const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "";
const token = process.env.TINA_TOKEN || "";

// Modo de desarrollo local si no hay credenciales
const isLocalMode = !clientId || !token;

const branch =
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "main";

console.info(`Using branch: ${branch}`);
console.info(`Running in ${isLocalMode ? "local" : "production"} mode`);

export default defineConfig({
    branch,

    // Configuration for API o modo local
    clientId,
    token,

    build: {
        publicFolder: "public",
        outputFolder: "admin",
    },

    media: {
        tina: {
            publicFolder: "src/assets",
            mediaRoot: "upload",
        },
    },

    // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
    schema: {
        collections: [
            // COLECCION DE HOTELES
            {
                name: "hotels",
                label: "Hotels",
                path: "src/data/hotels",
                format: "json",
                fields: [
                    {
                        type: "boolean",
                        name: "partner",
                        label: "Socio Estrategico",
                        required: false,
                    }, {
                        type: "string",
                        name: "name",
                        label: "Name*",
                        required: true,
                    },
                    {
                        type: "number",
                        name: "stars",
                        label: "Estrellas*",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "location",
                        label: "Ubicación (Ciudad, País)*",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "mainStreet",
                        label: "Calle Principal",
                    },
                    {
                        type: "string",
                        name: "addressNumber",
                        label: "Número",
                    },
                    {
                        type: "string",
                        name: "secondaryStreet",
                        label: "Calle Secundaria",
                    },
                    {
                        type: "object",
                        name: "contact",
                        label: "Medios de Contacto",
                        list: true,
                        ui: {
                            itemProps: (item) => {
                                const type = item?.type || "Contacto";
                                const value = item?.value || "";
                                const tag = item?.tag || "";
                                return {
                                    label: `${tag ? `${tag} > ` : ""}${value} > ${type}`,
                                };
                            },
                        },
                        fields: [
                            {
                                type: "string",
                                name: "type",
                                label: "Tipo de Contacto*",
                                required: true,
                                options: ["Email", "Cellphone", "Telephone", "Others"],
                            },
                            {
                                type: "string",
                                name: "value",
                                label: "Contacto*",
                                required: true,
                            },
                            {
                                type: "string",
                                name: "tag",
                                label: "Etiqueta (ej. Reservaciones, Información)",
                                options: [
                                    "Recepción",
                                    "Reservaciones",
                                    "Información",
                                    "Gerencia",
                                    "Emergencias",
                                    "Otro",
                                ],
                            },
                        ],
                    },
                    {
                        type: "object",
                        name: "socialMedia",
                        label: "Redes Sociales",
                        list: true,
                        ui: {
                            itemProps: (item) => {
                                const name = item?.name || "Red Social";
                                const url = item?.url || "";
                                return {
                                    label: `${name}: ${url}`,
                                };
                            },
                        },
                        fields: [
                            {
                                type: "string",
                                name: "name",
                                label: "Red Social",
                                options: [
                                    "Facebook",
                                    "Instagram",
                                    "Tiktok",
                                    "Linkedin",
                                    "X",
                                    "Whatsapp",
                                    "Telegram",
                                ],
                            },
                            {
                                type: "string",
                                name: "url",
                                label: "URL",
                            },
                        ],
                    },
                    {
                        type: "object",
                        name: "rooms",
                        label: "Habitaciones del Hotel",
                        list: true,
                        ui: {
                            itemProps: (item) => {
                                const name = item?.name || "Habitación";
                                const price = item?.price || "";
                                return {
                                    label: `${name}`,
                                };
                            },
                        },
                        fields: [
                            {
                                type: "string",
                                name: "name",
                                label: "Tipo de Habitación:",
                                options: [
                                    "Individual",
                                    "Matrimonial",
                                    "Doble Individual",
                                    "Triple",
                                    "Quadruple",
                                    "Quintuple",
                                    "Sextuple",
                                    "Deluxe",
                                    "Suite Matrimonial",
                                    "Suite Familiar",
                                ],
                            },
                            {
                                type: "object",
                                name: "description_room",
                                label: "Descripción de Habitacion",
                                list: true,
                                ui: {
                                    itemProps: (item) => {
                                        const lang = item?.lang_room || "Idioma";
                                        return {label: `${lang}`};
                                    },
                                },
                                fields: [
                                    {
                                        type: "string",
                                        name: "lang_room",
                                        label: "Language",
                                        options: ["es", "en"],
                                    },
                                    {
                                        type: "string",
                                        name: "content_destination",
                                        label: "Description",
                                    },
                                ],
                            },
                            {
                                type: "number",
                                name: "size",
                                label: "Tamaño de habitacion (m2)",
                            },
                            {
                                type: "object",
                                name: "occupancy",
                                label: "Ocupación Min/Max",

                                fields: [
                                    {
                                        type: "number",
                                        name: "min",
                                        label: "Min",
                                    },
                                    {
                                        type: "number",
                                        name: "max",
                                        label: "Max",
                                    },
                                ]
                            },
                            {
                                type: "image",
                                name: "images",
                                label: "Imagenes (La primera Imagen sera la portada)",
                                list: true,
                            },
                            // {
                            //     type: "string",
                            //     name: "price",
                            //     label: "Precio",
                            // },
                            {
                                type: "string",
                                name: "room_services",
                                label: "Servicios de la Habitacion",
                                list: true,
                                options: [
                                    "Servicio a la habitación",
                                    "Minibar",
                                    "Caja fuerte",
                                    "Secador de pelo",
                                    "Plancha y tabla de planchar",
                                    "Almohadas adicionales",
                                    "Escritorio de trabajo"
                                ]
                            },
                        ],
                    },
                    {
                        type: "number",
                        name: "roomPrice",
                        label: "Precio Promedio*",
                        required: true,
                    },
                    {
                        type: "image",
                        name: "coverImage",
                        label: "Fotografía Portada Hotel*",
                        required: true,
                    },
                    {
                        type: "image",
                        name: "gallery",
                        label: "Galería de Imágenes del Hotel",
                        list: true,
                    },
                    {
                        type: "object",
                        name: "description_hotel",
                        label: "Description Hotel",
                        list: true,
                        ui: {
                            itemProps: (item) => {
                                const lang = item?.lang_hotel || "Idioma";
                                return {label: `${lang}`};
                            },
                        },
                        fields: [
                            {
                                type: "string",
                                name: "lang_hotel",
                                label: "Language",
                                options: ["es", "en"],
                            },
                            {
                                type: "string",
                                name: "content_hotel",
                                label: "Description",
                            },
                        ],
                    },
                    {
                        type: "object",
                        name: "amenities",
                        label: "Servicios del Hotel",
                        list: true,
                        ui: {
                            itemProps: (item) => {
                                // Accedemos de forma segura, con un valor por defecto
                                return {
                                    label: `${item?.basic_services ? '> Servicio Basico' : ''} 
                                ${item?.general_services ? '> Servicio General' : ''} 
                                ${item?.extra_services ? '> Servicio Extra' : ''}
                                ${item?.premium_services ? '> Servicio Premium' : ''}
                                `
                                };
                            },
                        },
                        fields: [
                            {
                                type: "string",
                                name: "basic_services",
                                label: "Servicios Basicos",
                                list: true,
                                options: [
                                    "Recepción 24 horas",
                                    "Wifi gratuito",
                                    "Desayuno incluido",
                                    "Limpieza diaria",
                                    "Televisión por cable",
                                    "Baño privado",
                                    "Aire acondicionado o calefacción",
                                    "Artículos de tocador"
                                ]
                            }, {
                                type: "string",
                                name: "general_services",
                                label: "Servicios Generales",
                                list: true,
                                options: [
                                    "Estacionamiento",
                                    "Restaurante",
                                    "Bar o cafetería",
                                    "Gimnasio",
                                    "Piscina",
                                    "Spa o centro de bienestar",
                                    "Salas de reuniones o conferencias",
                                    "Ascensor"
                                ]
                            },
                            {
                                type: "string",
                                name: "extra_services",
                                label: "Servicios Extra",
                                list: true,
                                options: [
                                    "Transporte al aeropuerto",
                                    "Alquiler de autos",
                                    "Lavandería y tintorería",
                                    "Servicio de conserjería",
                                    "Actividades turísticas o excursiones",
                                    "Guardería o niñera",
                                    "Admisión de mascotas",
                                    "Cambio de divisas"
                                ]
                            },
                            {
                                type: "string",
                                name: "premium_services",
                                label: "Servicios Premium",
                                list: true,
                                options: [
                                    "Check-in y check-out express o VIP",
                                    "Habitaciones con jacuzzi",
                                    "Tienda de regalos",
                                    "Club lounge o área ejecutiva",
                                    "Terraza con vistas",
                                    "Servicios de spa personalizados",
                                    "Chef privado o cocina gourmet"
                                ]
                            }
                        ]
                    },
                    {
                        type: "boolean",
                        name: "highlight",
                        label: "Destacar",
                    },
                ],
            },

            // COLECCION DE DESTINOS POPULARES
            {
                name: "destinations",
                label: "Destinations",
                path: "src/data/destinations",
                format: "json",
                fields: [
                    {
                        type: "number",
                        name: "destination_id",
                        label: "ID",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "name",
                        label: "Name",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "country",
                        label: "Country",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "city",
                        label: "City",
                        required: true,
                    },
                    {
                        type: "object",
                        name: "description_destination",
                        label: "Descripción del Destino",
                        list: true,
                        ui: {
                            itemProps: (item) => {
                                const lang = item?.lang_destination || "Idioma";
                                return {label: `${lang}`};
                            },
                        },
                        fields: [
                            {
                                type: "string",
                                name: "lang_destination",
                                label: "Language",
                                options: ["es", "en"],
                            },
                            {
                                type: "string",
                                name: "content_destination",
                                label: "Description",
                            },
                        ],
                    },
                    {
                        type: "object",
                        name: "tags",
                        label: "Tags",
                        list: true,
                        ui: {
                            itemProps: (item) => {
                                const tag = item?.tag || "Etiqueta";
                                return {label: `${tag}`};
                            },
                        },
                        fields: [
                            {
                                type: "string",
                                name: "tag",
                                label: "Tag",
                            },
                        ],
                    },
                    {
                        type: "image",
                        name: "coverImage",
                        label: "Image",
                        required: true,
                    },
                    {
                        type: "boolean",
                        name: "highlight",
                        label: "Destacar",
                    },
                ],
            },
            // COLECCION DE OFERTAS
            {
                name: "offers",
                label: "Offers",
                path: "src/data/offers",
                format: "json",
                fields: [
                    {
                        type: "number",
                        name: "offer_id",
                        label: "ID*",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "title",
                        label: "Title*",
                        required: true,
                    },
                    {
                        type: "image",
                        name: "coverImage",
                        label: "Cover Image*",
                        required: true,
                    },
                    {
                        type: "object",
                        name: "description_offers",
                        label: "Description Offers",
                        list: true,
                        ui: {
                            itemProps: (item) => {
                                const lang = item?.lang_offer || "Idioma";
                                return {label: `${lang}`};
                            },
                        },
                        fields: [
                            {
                                type: "string",
                                name: "lang_offer",
                                label: "Language",
                                options: ["es", "en"],
                            },
                            {
                                type: "string",
                                name: "content_offer",
                                label: "Content",
                            },
                        ],
                    },
                    {
                        type: "datetime",
                        name: "expiration_date",
                        label: "Expiration Date",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "discount",
                        label: "Discount",
                        required: true,
                    },
                    {
                        type: "object",
                        name: "tags",
                        label: "Tags",
                        list: true,
                        ui: {
                            itemProps: (item) => {
                                const tag = item?.tag || "Etiqueta";
                                return {label: `${tag}`};
                            },
                        },
                        fields: [
                            {
                                type: "string",
                                name: "tag",
                                label: "Tag",
                            },
                        ],
                    },
                ],
            },
        ],
    },
});
