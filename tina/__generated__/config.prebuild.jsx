// tina/config.ts
import { defineConfig } from "tinacms";
var clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "";
var token = process.env.TINA_TOKEN || "";
var isLocalMode = !clientId || !token;
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
console.info(`Using branch: ${branch}`);
console.info(`Running in ${isLocalMode ? "local" : "production"} mode`);
var config_default = defineConfig({
  branch,
  // Configuration for API o modo local
  clientId,
  token,
  build: {
    publicFolder: "public",
    outputFolder: "admin"
  },
  media: {
    tina: {
      publicFolder: "src/assets",
      mediaRoot: "upload"
    }
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
            required: false
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
            label: "Ubicaci\xF3n (Ciudad,Provincia, Pa\xEDs)*",
            required: true
          },
          {
            type: "string",
            name: "mainStreet",
            label: "Calle Principal"
          },
          {
            type: "string",
            name: "addressNumber",
            label: "N\xFAmero"
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
                const type = item?.type || "Contacto";
                const value = item?.value || "";
                const tag = item?.tag || "";
                return {
                  label: `${tag ? `${tag} > ` : ""}${value} > ${type}`
                };
              }
            },
            fields: [
              {
                type: "string",
                name: "type",
                label: "Tipo de Contacto*",
                required: true,
                options: ["Email", "Cellphone", "Telephone", "Others"]
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
                label: "Etiqueta (ej. Reservaciones, Informaci\xF3n)",
                options: [
                  "Recepci\xF3n",
                  "Reservaciones",
                  "Informaci\xF3n",
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
            ui: {
              itemProps: (item) => {
                const name = item?.name || "Red Social";
                const url = item?.url || "";
                return {
                  label: `${name}: ${url}`
                };
              }
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
                  "Telegram"
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
                const name = item?.name || "Habitaci\xF3n";
                const price = item?.price || "";
                return {
                  label: `${name}`
                };
              }
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "Tipo de Habitaci\xF3n:",
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
                  "Suite Familiar"
                ]
              },
              {
                type: "object",
                name: "description_room",
                label: "Descripci\xF3n de Habitacion",
                list: true,
                ui: {
                  itemProps: (item) => {
                    const lang = item?.lang_room || "Idioma";
                    return { label: `${lang}` };
                  }
                },
                fields: [
                  {
                    type: "string",
                    name: "lang_room",
                    label: "Language",
                    options: ["es", "en"]
                  },
                  {
                    type: "string",
                    name: "content_destination",
                    label: "Description"
                  }
                ]
              },
              {
                type: "number",
                name: "size",
                label: "Tama\xF1o de habitacion (m2)"
              },
              {
                type: "object",
                name: "occupancy",
                label: "Ocupaci\xF3n Min/Max",
                fields: [
                  {
                    type: "number",
                    name: "min",
                    label: "Min"
                  },
                  {
                    type: "number",
                    name: "max",
                    label: "Max"
                  }
                ]
              },
              {
                type: "image",
                name: "images",
                label: "Imagenes (La primera Imagen sera la portada)",
                list: true
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
                  "Servicio a la habitaci\xF3n",
                  "Minibar",
                  "Caja fuerte",
                  "Secador de pelo",
                  "Plancha y tabla de planchar",
                  "Almohadas adicionales",
                  "Escritorio de trabajo"
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
            label: "Fotograf\xEDa Portada Hotel*",
            required: true
          },
          {
            type: "image",
            name: "gallery",
            label: "Galer\xEDa de Im\xE1genes del Hotel",
            list: true
          },
          {
            type: "object",
            name: "description_hotel",
            label: "Description Hotel",
            list: true,
            ui: {
              itemProps: (item) => {
                const lang = item?.lang_hotel || "Idioma";
                return { label: `${lang}` };
              }
            },
            fields: [
              {
                type: "string",
                name: "lang_hotel",
                label: "Language",
                options: ["es", "en"]
              },
              {
                type: "string",
                name: "content_hotel",
                label: "Description"
              }
            ]
          },
          {
            type: "object",
            name: "amenities",
            label: "Servicios del Hotel",
            list: true,
            ui: {
              itemProps: (item) => {
                return {
                  label: `${item?.basic_services ? "> Servicio Basico" : "."}
                                ${item?.general_services ? "> Servicio General" : "."}
                                ${item?.extra_services ? "> Servicio Extra" : "."}
                                ${item?.premium_services ? "> Servicio Premium" : ".    "}
                                `
                };
              }
            },
            fields: [
              {
                type: "string",
                name: "basic_services",
                label: "Servicios Basicos",
                list: true,
                options: [
                  { label: "Recepci\xF3n 24 horas", value: "24h_reception" },
                  { label: "Wifi gratuito", value: "free_wifi" },
                  { label: "Desayuno incluido", value: "breakfast_included" },
                  { label: "Limpieza diaria", value: "daily_cleaning" },
                  { label: "Televisi\xF3n por cable", value: "cable_tv" },
                  { label: "Televisi\xF3n Streaming", value: "streaming_tv" },
                  { label: "Ba\xF1o privado", value: "bathroom" },
                  { label: "Aire acondicionado", value: "air_conditioning" },
                  { label: "Calefacci\xF3n", value: "heating" },
                  { label: "Tocador / Coqueta", value: "dressing_table" }
                ]
              },
              {
                type: "string",
                name: "general_services",
                label: "Servicios Generales",
                list: true,
                options: [
                  { label: "Estacionamiento", value: "parking" },
                  { label: "Restaurante", value: "restaurant" },
                  { label: "Bar o cafeter\xEDa", value: "cafe_bar" },
                  { label: "Gimnasio", value: "gym" },
                  { label: "Piscina", value: "pool" },
                  { label: "Spa o centro de bienestar", value: "spa_wellness" },
                  { label: "Salas de reuniones o conferencias", value: "meeting_rooms" },
                  { label: "Ascensor", value: "elevator" }
                ]
              },
              {
                type: "string",
                name: "extra_services",
                label: "Servicios Extra",
                list: true,
                options: [
                  { label: "Transporte al aeropuerto", value: "airport_shuttle" },
                  { label: "Alquiler de autos", value: "car_rental" },
                  { label: "Lavander\xEDa y tintorer\xEDa", value: "laundry_service" },
                  { label: "Servicio de conserjer\xEDa", value: "concierge_service" },
                  { label: "Actividades tur\xEDsticas o excursiones", value: "tourist_activities" },
                  { label: "Guarder\xEDa o ni\xF1era", value: "childcare" },
                  { label: "Admisi\xF3n de mascotas", value: "pet_friendly" },
                  { label: "Cambio de divisas", value: "currency_exchange" }
                ]
              },
              {
                type: "string",
                name: "premium_services",
                label: "Servicios Premium",
                list: true,
                options: [
                  {
                    label: "Check-in y check-out express o VIP / Express or VIP check-in and check-out",
                    value: "express_checkin"
                  },
                  { label: "Habitaciones con jacuzzi / Rooms with jacuzzi", value: "jacuzzi_rooms" },
                  { label: "Tienda de regalos / Gift shop", value: "gift_shop" },
                  {
                    label: "Club lounge o \xE1rea ejecutiva / Club lounge or executive area",
                    value: "executive_lounge"
                  },
                  { label: "Terraza con vistas / Terrace with views", value: "rooftop_terrace" },
                  {
                    label: "Servicios de spa personalizados / Custom spa services",
                    value: "custom_spa_services"
                  },
                  {
                    label: "Chef privado o cocina gourmet / Private chef or gourmet cuisine",
                    value: "private_chef"
                  }
                ]
              }
            ]
          },
          {
            type: "boolean",
            name: "highlight",
            label: "Destacar"
          }
        ]
      },
      // COLECCION DE DESTINOS POPULARES
      {
        name: "destinations",
        label: "Destinations",
        path: "src/data/destinations",
        format: "json",
        fields: [
          {
            type: "boolean",
            name: "partner",
            label: "Patrocinador"
          },
          {
            type: "string",
            name: "name",
            label: "Name*",
            required: true
          },
          {
            type: "string",
            name: "location",
            label: "Localizacion (Ejem: Ciudad, Provincia, Pais)*",
            required: true
          },
          {
            type: "object",
            name: "description_destination",
            label: "Descripci\xF3n del Destino",
            list: true,
            ui: {
              itemProps: (item) => {
                const lang = item?.lang_destination || "Idioma";
                return { label: `${lang} - ${item.content_destination}` };
              }
            },
            fields: [
              {
                type: "string",
                name: "lang_destination",
                label: "Language",
                options: ["es", "en"]
              },
              {
                type: "string",
                name: "content_destination",
                label: "Description"
              }
            ]
          },
          // {
          //     type: "string",
          //     name: "tags",
          //     label: "Key Translation Tag",
          //     list: true,
          //     // ui: {
          //     //     itemProps: (item) => {
          //     //         const tag = item?.tag || "Etiqueta";
          //     //         return {label: `${tag}`};
          //     //     },
          //     // },
          //     // fields: [
          //     //     {
          //     //         type: "string",
          //     //         name: "tag",
          //     //         label: "Key Translation Tag",
          //     //         list:true,
          //     //         options:[
          //     //             {label:"Dentro del Azuay", value:"in_azuay"}
          //     //         ]
          //     //     },
          //     // ],
          //     options: [
          //         // Opciones existentes
          //         {label: "Ubicado dentro del Azuay", value: "in_azuay"},
          //         {label: "Centro Histórico", value: "historic_center"},
          //
          //
          //
          //         // Opciones por características geográficas
          //         {label: "Zona montañosa", value: "mountains"},
          //         {label: "Ríos y cascadas", value: "rivers_waterfalls"},
          //         {label: "Parque nacional", value: "national_park"},
          //         {label: "Mirador panorámico", value: "scenic_viewpoint"},
          //
          //
          //
          //
          //
          //
          //
          //
          //     ]
          // },
          {
            type: "object",
            name: "tags",
            label: "Etiquetas (Key Translation)",
            list: true,
            // ui: {
            //     itemProps: (item) => {
            //         // Accedemos de forma segura, con un valor por defecto
            //         return {
            //             label: `${item?.basic_services ? '> Servicio Basico' : '.'}
            //         ${item?.general_services ? '> Servicio General' : '.'}
            //         ${item?.extra_services ? '> Servicio Extra' : '.'}
            //         ${item?.premium_services ? '> Servicio Premium' : '.    '}
            //         `
            //         };
            //     },
            // },
            fields: [
              {
                type: "string",
                name: "experience",
                label: "Servicios Basicos",
                list: true,
                options: [
                  // Opciones por tipo de experiencia
                  { label: "Aventura al aire libre", value: "outdoor_adventure" },
                  { label: "Patrimonio Cultural", value: "cultural_heritage" },
                  { label: "Experiencia gastron\xF3mica", value: "culinary_experience" },
                  { label: "Artesan\xEDa local", value: "local_crafts" }
                ]
              },
              {
                type: "string",
                name: "activities",
                label: "Opciones por actividades",
                list: true,
                options: [
                  { label: "Senderismo", value: "hiking" },
                  { label: "Ciclismo", value: "cycling" },
                  { label: "Observaci\xF3n de aves", value: "birdwatching" },
                  { label: "Aguas termales", value: "hot_springs" },
                  { label: "Compras de artesan\xEDas", value: "craft_shopping" }
                ]
              },
              {
                type: "string",
                name: "culture",
                label: "Aspectos culturales",
                list: true,
                options: [
                  { label: "Museo o galer\xEDa", value: "museum_gallery" },
                  { label: "Arquitectura colonial", value: "colonial_architecture" },
                  { label: "Festivales tradicionales", value: "traditional_festivals" },
                  { label: "Sitio arqueol\xF3gico", value: "archaeological_site" }
                ]
              },
              {
                type: "string",
                name: "accessibility",
                label: "Accesibilidad y comodidades",
                list: true,
                options: [
                  { label: "Accesible para discapacitados", value: "wheelchair_accessible" },
                  { label: "Apto para familias", value: "family_friendly" },
                  { label: "Transporte p\xFAblico cercano", value: "public_transport" }
                ]
              },
              {
                type: "string",
                name: "temporality",
                label: "Temporalidad",
                list: true,
                options: [
                  { label: "Mejor en verano", value: "best_summer" },
                  { label: "Atractivo todo el a\xF1o", value: "year_round" }
                ]
              },
              {
                type: "string",
                name: "popular",
                label: "Popularidad",
                list: true,
                options: [
                  { label: "Destino poco conocido", value: "hidden_gem" },
                  { label: "Atracci\xF3n principal", value: "main_attraction" }
                ]
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
            required: true
          },
          {
            type: "string",
            name: "title",
            label: "Title*",
            required: true
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image*",
            required: true
          },
          {
            type: "object",
            name: "description_offers",
            label: "Description Offers",
            list: true,
            ui: {
              itemProps: (item) => {
                const lang = item?.lang_offer || "Idioma";
                return { label: `${lang}` };
              }
            },
            fields: [
              {
                type: "string",
                name: "lang_offer",
                label: "Language",
                options: ["es", "en"]
              },
              {
                type: "string",
                name: "content_offer",
                label: "Content"
              }
            ]
          },
          {
            type: "datetime",
            name: "expiration_date",
            label: "Expiration Date",
            required: true
          },
          {
            type: "string",
            name: "discount",
            label: "Discount",
            required: true
          },
          {
            type: "object",
            name: "tags",
            label: "Tags",
            list: true,
            ui: {
              itemProps: (item) => {
                const tag = item?.tag || "Etiqueta";
                return { label: `${tag}` };
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
      }
    ]
  }
});
export {
  config_default as default
};
