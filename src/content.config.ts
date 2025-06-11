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
    name: z.string().min(2).max(100),
    location: z.string().min(2).max(100),
    mainStreet: z.string().min(2).max(100).optional(),
    addressNumber: z.string().min(1).max(10).optional(),
  }),
});

// const offers = defineCollection([]);

export const collections = { hotels, destinations };
