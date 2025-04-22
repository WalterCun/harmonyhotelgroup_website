import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || "", // Get this from tina.io
  token: process.env.TINA_TOKEN || "", // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "hotel",
        label: "Hotels",
        path: "content/hotels",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Hotel Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "location",
            label: "Location",
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image",
          },
          {
            type: "rich-text",
            name: "description",
            label: "Description",
            isBody: true,
          },
        ],
      },
      {
        name: "tour",
        label: "Tours",
        path: "content/tours",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Tour Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "location",
            label: "Location",
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image",
          },
          {
            type: "rich-text",
            name: "description",
            label: "Description",
            isBody: true,
          },
        ],
      },
      {
        name: "offer",
        label: "Offers",
        path: "content/offers",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Offer Title",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image",
          },
          {
            type: "rich-text",
            name: "description",
            label: "Description",
            isBody: true,
          },
        ],
      },
      {
        name: "translation",
        label: "Translations",
        path: "content/translations",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "locale",
            label: "Locale",
            required: true,
          },
          {
            type: "object",
            name: "translations",
            label: "Translations",
            fields: [
              {
                type: "object",
                name: "nav",
                label: "Navigation",
                fields: [
                  { type: "string", name: "home", label: "Home" },
                  { type: "string", name: "hotels", label: "Hotels" },
                  { type: "string", name: "tours", label: "Tours" },
                  { type: "string", name: "offers", label: "Offers" },
                  { type: "string", name: "contact", label: "Contact" },
                  { type: "string", name: "book", label: "Book Now" },
                ],
              },
              {
                type: "object",
                name: "hero",
                label: "Hero Section",
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "subtitle", label: "Subtitle" },
                ],
              },
              {
                type: "object",
                name: "benefits",
                label: "Benefits Section",
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  {
                    type: "object",
                    name: "wifi",
                    label: "WiFi",
                    fields: [
                      { type: "string", name: "title", label: "Title" },
                      { type: "string", name: "desc", label: "Description" },
                    ],
                  },
                  {
                    type: "object",
                    name: "dining",
                    label: "Dining",
                    fields: [
                      { type: "string", name: "title", label: "Title" },
                      { type: "string", name: "desc", label: "Description" },
                    ],
                  },
                  {
                    type: "object",
                    name: "location",
                    label: "Location",
                    fields: [
                      { type: "string", name: "title", label: "Title" },
                      { type: "string", name: "desc", label: "Description" },
                    ],
                  },
                  {
                    type: "object",
                    name: "spa",
                    label: "Spa",
                    fields: [
                      { type: "string", name: "title", label: "Title" },
                      { type: "string", name: "desc", label: "Description" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});