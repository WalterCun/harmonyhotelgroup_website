import { defineCollection } from "astro:content";
import { z } from "astro:content";
import { glob } from "astro/loaders";

const hotels = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/data/hotels",
    generateId: ({ entry }) => entry.replace(/\.json$/, ""),
  }),
  schema: z.object({
    name: z.string().min(2).max(100),
    stars: z.number().min(1).max(5),
    location: z.string().min(2).max(100),
    mainStreet: z.string().min(2).max(100),
    addressNumber: z.string().min(1).max(10).optional(),
    secondaryStreet: z.string().min(2).max(100),
    contact: z
      .array(
        z.object({
          type: z.enum(["Cellphone", "Email"]),
          value: z.string().min(2).max(100),
          tag: z.string().min(2).max(100),
        }),
      )
      .optional(),
    socialMedia: z
      .array(
        z.object({
          name: z.string().min(2).max(100),
          url: z.string().min(2).max(100),
        }),
      )
      .optional(),
    rooms: z
      .array(
        z.object({
          name: z.string().min(2).max(100),
          size: z.number().min(1).max(1000),
          occupancy: z.object({
            min: z.number().min(1).max(10),
            max: z.number().min(1).max(10),
          }),
        }),
      )
      .optional(),
    roomPrice: z.number().min(1).max(1000),
    coverImage: z.string().min(2).max(100),
    gallery: z.array(z.string().min(2).max(100)),
    description_hotel: z
      .array(
        z.object({
          lang_hotel: z.string().min(2).max(100),
          content_hotel: z.string().min(2).max(100),
        }),
      )
      .optional(),
    amenities: z.array(
      z.object({
        basic_services: z.array(z.string().min(2).max(100)),
        general_services: z.array(z.string().min(2).max(100)),
        extra_services: z.array(z.string().min(2).max(100)),
        premium_services: z.array(z.string().min(2).max(100)),
      }),
    ),
    highlight: z.boolean(),
    partner: z.boolean().optional(),
  }),
});

const destinations = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/data/destinations",
    generateId: ({ entry }) => entry.replace(/\.json$/, ""),
  }),
  schema: z.object({
    partner: z.boolean().optional(),
    name: z.string().min(2).max(100),
    location: z.string().min(2).max(100),
    description_destination: z
      .array(
        z.object({
          lang_destination: z.string().min(2).max(100),
          content_destination: z.string().min(2),
        }),
      )
      .optional(),
    tags: z
      .array(
        z.object({
          experience: z.array(z.string().min(2).max(100)).optional(),
          activities: z.array(z.string().min(2).max(100)).optional(),
          geographics: z.array(z.string().min(2).max(100)).optional(),
          culture: z.array(z.string().min(2).max(100)).optional(),
          accessibility: z.array(z.string().min(2).max(100)).optional(),
          temporality: z.array(z.string().min(2).max(100)).optional(),
          popular: z.array(z.string().min(2).max(100)).optional(),
        }),
      )
      .optional(),
    coverImage: z.string().min(2).max(200),
    highlight: z.boolean().optional(),
  }),
});

const offers = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/data/offers",
    generateId: ({ entry }) => entry.replace(/\.json$/, ""),
  }),
  schema: z.object({
    title: z.string().min(2).max(100),
    coverImage: z.string().min(2).max(100),
    description_offers: z
      .array(
        z.object({
          lang_offer: z.string().min(2).max(100),
          content_offer: z.string().min(2),
        }),
      )
      .optional(),
    expiration_date: z.string(),
    discount: z.string().min(1).max(100),
    discount_label: z.array(
      z.object({
        lang_discount: z.string().min(2).max(100),
        content_discount: z.string().min(2).max(100),
      }),
    ),
    price_adult: z.number().min(1),
    price_child: z.number().min(1),
  }),
});

export const collections = { hotels, destinations, offers };
