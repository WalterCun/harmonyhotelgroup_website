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
            label: "Ubicaci\xF3n (Ciudad, Pa\xEDs)*",
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
                  label: `${name} - ${price}`
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
                type: "string",
                name: "description",
                label: "Descripcion de habitacion"
              },
              {
                type: "number",
                name: "size",
                label: "Tama\xF1o de habitacion (m2)"
              },
              {
                type: "string",
                name: "occupancy",
                label: "Ocupaci\xF3n min, max (Eje: Min: 1, Max: 2)"
              },
              {
                type: "image",
                name: "images",
                label: "Imagenes (La primera Imagen sera la portada)",
                list: true
              },
              {
                type: "string",
                name: "price",
                label: "Precio"
              },
              {
                type: "object",
                name: "amenities",
                label: "Servicios de la Habitacion",
                list: true,
                ui: {
                  itemProps: (item) => {
                    const amenityName = item?.amenities || "Servicio";
                    return { label: `${amenityName}` };
                  }
                },
                fields: [
                  {
                    type: "reference",
                    name: "amenities",
                    label: "Servicios del Hotel",
                    collections: ["icons"]
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
                options: ["es", "en", "fr"]
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
                const amenityName = item?.amenities || "Servicio";
                return { label: `${amenityName}` };
              }
            },
            fields: [
              {
                type: "reference",
                name: "amenities",
                label: "Servicios del Hotel",
                collections: ["icons"]
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
      // COLLECTION AMENITIES
      {
        name: "icons",
        label: "Icons",
        path: "src/data/icons",
        fields: [
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
          }
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
            label: "Descripci\xF3n del Destino",
            list: true,
            ui: {
              itemProps: (item) => {
                const lang = item?.lang_destination || "Idioma";
                return { label: `${lang}` };
              }
            },
            fields: [
              {
                type: "string",
                name: "lang_destination",
                label: "Language",
                options: ["es", "en", "fr"]
              },
              {
                type: "string",
                name: "content_destination",
                label: "Description"
              }
            ]
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
                options: ["es", "en", "fr"]
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
