import {defineConfig} from "tinacms";

const branch =
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "main";


export default defineConfig({
    branch,

    // Get this from tina.io
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    // Get this from tina.io
    token: process.env.TINA_TOKEN,

    build: {
        publicFolder: "src/admin",
        outputFolder: "admin",
    },

    media: {
        tina: {
            publicFolder: "src/assets",
            mediaRoot: "upload"
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
                fields: [
                    {
                        type: "number",
                        name: "hotel_id",
                        label: "ID*",
                        required: true
                    },
                    {
                        type: "string",
                        name: "name",
                        label: "Name*",
                        required: true
                    },
                    {
                        type: "number",
                        name: "stars",
                        label: "Estrellas*",
                        required: true
                    },
                    {
                        type: "string",
                        name: "location",
                        label: "Ubicación (Ciudad, País)*",
                        required: true
                    },
                    {
                        type: "string",
                        name: "mainStreet",
                        label: "Calle Principal",
                    },
                    {
                        type: "string",
                        name: "addressNumber",
                        label: "Número"
                    },
                    {
                        type: "string",
                        name: "secondaryStreet",
                        label: "Calle Secundaria"
                    },
                    {
                        type: "object",
                        name: "contact",
                        label: "Medios de Contacto",
                        list: true,
                        ui: {
                            itemProps: (item) => {
                                return {label: `${item?.tag ? `${item.tag}" > "` : ""}${item?.value} > ${item?.type}`}
                            }
                        },
                        fields: [
                            {
                                type: "string",
                                name: "type",
                                label: "Tipo de Contacto*",
                                required: true,
                                options: [
                                    "Email",
                                    "Cellphone",
                                    "Telephone",
                                    "Others"
                                ]
                            },
                            {
                                type: "string",
                                name: "value",
                                label: "Contacto*",
                                required: true
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
                                    "Otro"
                                ]
                            }
                        ]
                    },
                    {
                        type: "object",
                        name: "socialMedia",
                        label: "Redes Sociales",
                        list: true,
                        fields: [
                            {
                                type: "string",
                                name: "name",
                                label: "Red Social",
                                options: [
                                    'Facebook',
                                    'Instagram',
                                    'Tiktok',
                                    'Linkedin',
                                    'X',
                                    'Whatsapp',
                                    'Telegram',
                                ]
                            },
                            {
                                type: "string",
                                name: "url",
                                label: "URL"
                            }
                        ]
                    },
                    {
                        type: "object",
                        name: "rooms",
                        label: "Habitaciones del Hotel",
                        list: true,
                        ui: {
                            itemProps: (item) => {
                                return {label: `${item?.tag ? `${item.tag}" > "` : ""}${item?.value} > ${item?.type}`}
                            }
                        },
                        fields:[
                            {
                                type:"string",
                                name: "name",
                                label: "Tipo de Habitación:",
                                options:[
                                    'Individual',
                                    'Matrimonial',
                                    'Doble Individual',
                                    'Triple',
                                    'Quadruple',
                                    'Quintuple',
                                    'Sextuple',
                                    'Deluxe',
                                    'Suite Matrimonial',
                                    'Suite Familiar'
                                ]
                            },
                            {
                                type:"string",
                                name:"description",
                                label: "Descripcion de habitacion"
                            },
                            {
                                type:"number",
                                name:"size",
                                label: "Tamaño de habitacion (m2)"
                            },
                            {
                                type:"string",
                                name:"occupancy",
                                label: "Ocupación min, max (Eje: Min: 1, Max: 2)"
                            },
                            {
                                type:"image",
                                name: "images",
                                label: "Imagenes (La primera Imagen sera la portada)",
                                list: true
                            },
                            {
                                type: "string",
                                name: 'price',
                                label: 'Precio'
                            },
                            {
                                type: "object",
                                name: "amenities",
                                label: "Servicios de la Habitacion",
                                list: true,
                                ui:{
                                    itemProps: (item) => {
                                        return { label: `${item?.amenities}` }
                                    }
                                },
                                fields:[
                                    {
                                        type: "reference",
                                        name: "amenities",
                                        label: "Servicios del Hotel",
                                        collections: ['icons']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: "number",
                        name: "roomPrice",
                        label: "Precio Promedio*",
                        required: true
                    },
                    {
                        type: "image",
                        name: "coverImage",
                        label: "Fotografía Portada Hotel*",
                        required: true
                    },
                    {
                        type: "image",
                        name: "gallery",
                        label: "Galería de Imágenes del Hotel",
                        list: true
                    },
                    {
                        type: "object",
                        name: "description_hotel",
                        label: "Description Hotel",
                        list: true,
                        ui: {
                            itemProps: (item) => {
                                return {label: `${item?.lang_hotel}`}
                            }
                        },
                        fields: [
                            {
                                type: "string",
                                name: "lang_hotel",
                                label: "Language",
                                options: [
                                    'es',
                                    'en',
                                    'fr'
                                ]
                            },
                            {
                                type: "string",
                                name: "content_hotel",
                                label: "Description",

                            },
                        ]
                    },
                    {
                        type: "object",
                        name: "amenities",
                        label: "Servicios del Hotel",
                        list: true,
                        ui:{
                            itemProps: (item) => {
                                return { label: `${item?.amenities}` }
                            }
                        },
                        fields:[
                            {
                                type: "reference",
                                name: "amenities",
                                label: "Servicios del Hotel",
                                collections: ['icons']
                            }
                        ]
                    },
                    // {
                    //     type: "reference",
                    //     name: "amenities",
                    //     label: "Servicios del Hotel",
                    //     collections: ['icons']
                    //     // options: [
                    //     //     "WiFi Gratis",
                    //     //     "Piscina",
                    //     //     "Spa",
                    //     //     "Restaurante",
                    //     //     "Gimnasio",
                    //     //     "Servicio a la Habitación",
                    //     //     "Vista a la Playa",
                    //     //     "Vista a la Montaña",
                    //     //     "Bar",
                    //     //     "Estacionamiento",
                    //     //     "Transporte al Aeropuerto",
                    //     //     "Desayuno Incluido",
                    //     //     "Acceso para Discapacitados",
                    //     //     "Centro de Negocios"
                    //     // ]
                    // },
                    {
                        type: "boolean",
                        name: "highlight",
                        label: "Destacar"
                    }
                ]
            },
            // COLLECTION AMENITIES
            {
                name: 'icons',
                label: 'Icons',
                path: 'src/data/icons',
                fields:[
                    {
                        type: "string",
                        name: "icon",
                        label: "Icon",
                        required: true
                    },
                    {
                        type: "string",
                        name: "name",
                        label: "Name",
                        required: true,
                        list: true
                    },
                ]
            },
            // COLECCION DE DESTINOS POPULARES
            {
                name: "destinations",
                label: "Destinations",
                path: "src/data/destinations",
                fields: [
                    {
                        type: "number",
                        name: "destination_id",
                        label: "ID",
                        required: true
                    },
                    {
                        type: "string",
                        name: "name",
                        label: "Name",
                        required: true
                    },
                    {
                        type: "string",
                        name: "country",
                        label: "Country",
                        required: true
                    },
                    {
                        type: "string",
                        name: "city",
                        label: "City",
                        required: true
                    },
                    {
                        type: "object",
                        name: "description_destination",
                        label: "Descripción del Hotel",
                        list: true,
                        ui: {
                            itemProps: (item) => {
                                return {label: `${item?.lang_destination}`}
                            }
                        },
                        fields: [
                            {
                                type: "string",
                                name: "lang_destination",
                                label: "Language",
                                options: [
                                    'es',
                                    'en',
                                    'fr'
                                ]
                            },
                            {
                                type: "string",
                                name: "content_destination",
                                label: "Description",
                            },
                        ]
                    },
                    {
                        type: "object",
                        name: "tags",
                        label: "Tags",
                        list: true,
                        ui: {
                            itemProps: (item) => {
                                return {label: `${item?.tag}`}
                            }
                        },
                        fields: [
                            {
                                type: "string",
                                name: "tag",
                                label: "Tag"
                            }
                        ]
                    },
                    {
                        type: "image",
                        name: "coverImage",
                        label: "Image",
                        required: true
                    },
                    {
                        type: "boolean",
                        name: "highlight",
                        label: "Destacar"
                    }
                ]
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
                        required:true
                    },
                    {
                        type: "string",
                        name: "title",
                        label: "Title*",
                        required:true
                    },
                    {
                        type:"image",
                        name:"coverImage",
                        label:"Cover Image*",
                        required:true
                    },
                    {
                        type: "object",
                        name: "description_offers",
                        label: "Description Offers",
                        list: true,
                        ui: {
                            itemProps: (item) => {
                                return {label: `${item?.lang_offer}`}
                            }
                        },
                        fields: [
                            {
                                type: "string",
                                name: "lang_offer",
                                label: "Language",
                                options: [
                                    'es',
                                    'en',
                                    'fr'
                                ]
                            },
                            {
                                type: "string",
                                name: "content_offer",
                                label: "Content",
                            },
                        ]
                    },
                    {
                        type: "datetime",
                        name: "expiration_date",
                        label: "Expiration Date",
                        required:true
                    },
                    {
                        type: "string",
                        name: "discount",
                        label: "Discount",
                        required:true
                    },
                    {
                        type: "object",
                        name: "tags",
                        label: "Tags",
                        list: true,
                        ui: {
                            itemProps: (item) => {
                                return {label: `${item?.tag}`}
                            }
                        },
                        fields: [
                            {
                                type: "string",
                                name: "tag",
                                label: "Tag"
                            }
                        ]
                    }
                ]
            },
            // COLECCION DE BLOG
            // {
            //     name: "blog",
            //     label: "Blog",
            //     path: "src/data/blog",
            //     fields: [
            //         {
            //             type: "number",
            //             name: "blog_id",
            //             label: "ID"
            //         },
            //         {
            //             type: "string",
            //             name: "categories",
            //             label: "Categories",
            //             options: [
            //                 'All Categories',
            //                 'Destination',
            //                 'Travel',
            //                 'Culture Travel'
            //             ]
            //         }
            //     ]
            // },
            // COLECCIÓN DE TIPOS DE HABITACIÓN (características básicas)
            // {
            //     name: "hotelRoomTypes",
            //     label: "Hotels Room Types",
            //     path: "api/roomTypes",
            //     format: "json",
            //     fields: [
            //         {
            //             type: "string",
            //             name: "name",
            //             label: "Nombre del Tipo de Habitación",
            //             required: true
            //         },
            //         {
            //             type: "number",
            //             name: "area",
            //             label: "Área(m²)",
            //             required: true
            //         },
            //         {
            //             type: "object",
            //             name: "beds",
            //             label: "Camas",
            //             list: true,
            //             ui: {
            //                 itemProps: (item) => {
            //                     return {label: `${item?.type || 'Cama'} - ${item?.quantity || '1'}`}
            //                 }
            //             },
            //             fields: [
            //                 {
            //                     type: "string",
            //                     name: "type",
            //                     label: "Tipo de Cama",
            //                     options: [
            //                         "Individual",
            //                         "Matrimonial",
            //                         "Queen Size",
            //                         "King Size",
            //                         "Sofá Cama",
            //                         "Litera"
            //                     ],
            //                     required: true
            //                 },
            //                 {
            //                     type: "number",
            //                     name: "quantity",
            //                     label: "Cantidad",
            //                     required: true
            //                 }
            //             ]
            //         },
            //         {
            //             type: "number",
            //             name: "minOccupancy",
            //             label: "Ocupación Mínima",
            //             required: true
            //         },
            //         {
            //             type: "number",
            //             name: "maxOccupancy",
            //             label: "Ocupación Máxima",
            //             required: true
            //         },
            //         {
            //             type: "string",
            //             name: "description",
            //             label: "Descripción General",
            //             ui: {
            //                 component: "textarea"
            //             }
            //         }
            //     ]
            // }
            // // COLECCIÓN DE CARACTERÍSTICAS DE HABITACIÓN
            // {
            //     name: "hotelRoomFeatures",
            //     label: "Hotel Room Features",
            //     path: "api/roomFeatures",
            //     format: "json",
            //     fields: [
            //         {
            //             type: "string",
            //             name: "name",
            //             label: "Nombre del Conjunto de Características",
            //             required: true
            //         },
            //         {
            //             type: "boolean",
            //             name: "hasPrivateBathroom",
            //             label: "Tiene Baño Privado"
            //         },
            //         {
            //             type: "boolean",
            //             name: "hasShower",
            //             label: "Tiene Ducha"
            //         },
            //         {
            //             type: "boolean",
            //             name: "hasBathtub",
            //             label: "Tiene Bañera"
            //         },
            //         {
            //             type: "boolean",
            //             name: "hasJacuzzi",
            //             label: "Tiene Jacuzzi"
            //         },
            //         {
            //             type: "boolean",
            //             name: "hasTV",
            //             label: "Tiene Televisor"
            //         },
            //         {
            //             type: "boolean",
            //             name: "hasBalcony",
            //             label: "Tiene Balcón"
            //         },
            //         {
            //             type: "boolean",
            //             name: "hasTerrace",
            //             label: "Tiene Terraza"
            //         },
            //         {
            //             type: "boolean",
            //             name: "hasKitchenette",
            //             label: "Tiene Cocineta"
            //         },
            //         {
            //             type: "boolean",
            //             name: "hasSafe",
            //             label: "Tiene Caja Fuerte"
            //         },
            //         {
            //             type: "boolean",
            //             name: "hasAirConditioning",
            //             label: "Tiene Aire Acondicionado"
            //         },
            //         {
            //             type: "boolean",
            //             name: "hasHeating",
            //             label: "Tiene Calefacción"
            //         },
            //         {
            //             type: "string",
            //             name: "viewType",
            //             label: "Tipo de Vista",
            //             options: [
            //                 "Vista al Mar",
            //                 "Vista a la Montaña",
            //                 "Vista a la Ciudad",
            //                 "Vista al Jardín",
            //                 "Vista a la Piscina",
            //                 "Sin Vista"
            //             ]
            //         },
            //         {
            //             type: "string",
            //             name: "additionalFeatures",
            //             label: "Características Adicionales",
            //             list: true
            //         }
            //     ]
            // },
            // // COLECCIÓN DE SERVICIOS DE HABITACIÓN
            // {
            //     name: "hotelRoomServices",
            //     label: "Hotel Room Services",
            //     path: "api/roomServices",
            //     format: "json",
            //     fields: [
            //         {
            //             type: "string",
            //             name: "name",
            //             label: "Nombre del Conjunto de Servicios",
            //             required: true
            //         },
            //         {
            //             type: "boolean",
            //             name: "hasRoomService",
            //             label: "Servicio a la Habitación"
            //         },
            //         {
            //             type: "boolean",
            //             name: "hasWifi",
            //             label: "WiFi Gratuito"
            //         },
            //         {
            //             type: "boolean",
            //             name: "hasMinibar",
            //             label: "Minibar"
            //         },
            //         {
            //             type: "boolean",
            //             name: "hasAlarmClock",
            //             label: "Despertador"
            //         },
            //         {
            //             type: "boolean",
            //             name: "hasCoffeeMaker",
            //             label: "Cafetera"
            //         },
            //         {
            //             type: "boolean",
            //             name: "hasHairDryer",
            //             label: "Secador de Pelo"
            //         },
            //         {
            //             type: "boolean",
            //             name: "hasIron",
            //             label: "Plancha y Tabla de Planchar"
            //         },
            //         {
            //             type: "boolean",
            //             name: "hasLaundry",
            //             label: "Servicio de Lavandería"
            //         },
            //         {
            //             type: "boolean",
            //             name: "hasPayTV",
            //             label: "TV de Pago"
            //         },
            //         {
            //             type: "boolean",
            //             name: "hasStreaming",
            //             label: "Servicios de Streaming"
            //         },
            //         {
            //             type: "string",
            //             name: "streamingServices",
            //             label: "Servicios de Streaming Disponibles",
            //             list: true,
            //             options: [
            //                 "Netflix",
            //                 "Amazon Prime",
            //                 "Disney+",
            //                 "HBO Max",
            //                 "YouTube Premium",
            //                 "Apple TV+"
            //             ]
            //         },
            //         {
            //             type: "boolean",
            //             name: "hasDailyHousekeeping",
            //             label: "Limpieza Diaria"
            //         },
            //         {
            //             type: "boolean",
            //             name: "hasTurndownService",
            //             label: "Servicio de Cobertura"
            //         },
            //         {
            //             type: "boolean",
            //             name: "hasToiletries",
            //             label: "Artículos de Tocador Gratuitos"
            //         },
            //         {
            //             type: "string",
            //             name: "additionalServices",
            //             label: "Servicios Adicionales",
            //             list: true
            //         }
            //     ]
            // },
            // // COLECCIÓN DE PRECIOS Y OFERTAS
            // {
            //     name: "hotelRoomPricing",
            //     label: "Hotel Room Pricing",
            //     path: "api/roomPricing",
            //     format: "json",
            //     fields: [
            //         {
            //             type: "string",
            //             name: "name",
            //             label: "Nombre del Plan de Precios",
            //             required: true
            //         },
            //         {
            //             type: "string",
            //             name: "currency",
            //             label: "Moneda",
            //             options: ["USD"],
            //             required: true
            //         },
            //         {
            //             type: "number",
            //             name: "basePriceLowSeason",
            //             label: "Precio Base Temporada Baja",
            //             required: true
            //         },
            //         {
            //             type: "number",
            //             name: "basePriceMidSeason",
            //             label: "Precio Base Temporada Media"
            //         },
            //         {
            //             type: "number",
            //             name: "basePriceHighSeason",
            //             label: "Precio Base Temporada Alta"
            //         },
            //         {
            //             type: "object",
            //             name: "seasonalDates",
            //             label: "Fechas de Temporadas",
            //             fields: [
            //                 {
            //                     type: "string",
            //                     name: "lowSeasonStart",
            //                     label: "Inicio Temporada Baja (DD/MM)"
            //                 },
            //                 {
            //                     type: "string",
            //                     name: "lowSeasonEnd",
            //                     label: "Fin Temporada Baja (DD/MM)"
            //                 },
            //                 {
            //                     type: "string",
            //                     name: "midSeasonStart",
            //                     label: "Inicio Temporada Media (DD/MM)"
            //                 },
            //                 {
            //                     type: "string",
            //                     name: "midSeasonEnd",
            //                     label: "Fin Temporada Media (DD/MM)"
            //                 },
            //                 {
            //                     type: "string",
            //                     name: "highSeasonStart",
            //                     label: "Inicio Temporada Alta (DD/MM)"
            //                 },
            //                 {
            //                     type: "string",
            //                     name: "highSeasonEnd",
            //                     label: "Fin Temporada Alta (DD/MM)"
            //                 }
            //             ]
            //         },
            //         {
            //             type: "object",
            //             name: "occupancyDiscounts",
            //             label: "Descuentos por Ocupación",
            //             fields: [
            //                 {
            //                     type: "number",
            //                     name: "singleOccupancyDiscount",
            //                     label: "Descuento Ocupación Individual (%)"
            //                 },
            //                 {
            //                     type: "number",
            //                     name: "extraPersonCharge",
            //                     label: "Cargo por Persona Adicional"
            //                 }
            //             ]
            //         },
            //         {
            //             type: "object",
            //             name: "specialOffers",
            //             label: "Ofertas Especiales",
            //             list: true,
            //             ui: {
            //                 itemProps: (item) => {
            //                     return { label: item?.name }
            //                 }
            //             },
            //             fields: [
            //                 {
            //                     type: "string",
            //                     name: "name",
            //                     label: "Nombre de la Oferta",
            //                     required: true
            //                 },
            //                 {
            //                     type: "string",
            //                     name: "description",
            //                     label: "Descripción",
            //                     ui: {
            //                         component: "textarea"
            //                     }
            //                 },
            //                 {
            //                     type: "number",
            //                     name: "discountPercentage",
            //                     label: "Porcentaje de Descuento"
            //                 },
            //                 {
            //                     type: "number",
            //                     name: "discountAmount",
            //                     label: "Monto de Descuento"
            //                 },
            //                 {
            //                     type: "string",
            //                     name: "validFrom",
            //                     label: "Válido Desde (DD/MM/YYYY)"
            //                 },
            //                 {
            //                     type: "string",
            //                     name: "validTo",
            //                     label: "Válido Hasta (DD/MM/YYYY)"
            //                 },
            //                 {
            //                     type: "number",
            //                     name: "minimumStay",
            //                     label: "Estancia Mínima (noches)"
            //                 },
            //                 {
            //                     type: "boolean",
            //                     name: "requiresAdvanceBooking",
            //                     label: "Requiere Reserva Anticipada"
            //                 },
            //                 {
            //                     type: "number",
            //                     name: "advanceBookingDays",
            //                     label: "Días de Anticipación Requeridos"
            //                 }
            //             ]
            //         },
            //         {
            //             type: "boolean",
            //             name: "taxesIncluded",
            //             label: "Impuestos Incluidos"
            //         },
            //         {
            //             type: "number",
            //             name: "taxPercentage",
            //             label: "Porcentaje de Impuestos"
            //         },
            //         {
            //             type: "boolean",
            //             name: "breakfastIncluded",
            //             label: "Desayuno Incluido"
            //         },
            //         {
            //             type: "number",
            //             name: "breakfastPrice",
            //             label: "Precio del Desayuno (si no está incluido)"
            //         }
            //     ]
            // }
        ],
    },
    // search: {
    //     tina: {
    //         stopwordLanguages: ['esp'],
    //     },
    //     indexBatchSize: 100,
    //     maxSearchIndexFieldLength: 100,
    // },
});
