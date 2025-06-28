import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Colección de Ubicaciones
const locations = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/data/locations",
    generateId: ({ entry }) => entry.replace(/\.json$/, ""),
  }),
  schema: z.object({
    country: z.string(),
    province: z.string(),
    city: z.string(),
  }),
});

// Colección de Destinos
const destinations = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/data/destinations",
    generateId: ({ entry }) => entry.replace(/\.json$/, ""),
  }),
  schema: z.object({
    partner: z.boolean().optional(),
    name: z.string(),
    location: z.string(), // Referencia a locations
    description_destination: z.array(z.object({
      lang_destination: z.enum(["es", "en"]),
      content_destination: z.string(),
    })),
    tags: z.array(z.object({
      experience: z.array(z.string()).optional(),
      activities: z.array(z.string()).optional(),
      geographics: z.array(z.string()).optional(),
      culture: z.array(z.string()).optional(),
      accessibility: z.array(z.string()).optional(),
      temporality: z.array(z.string()).optional(),
      popular: z.array(z.string()).optional(),
    })).optional(),
    coverImage: z.string(),
    highlight: z.boolean().optional(),
    bestTimeToVisit: z.string().optional(),
    transportInfo: z.string().optional(),
    activities: z.array(z.object({
      name: z.string(),
      description: z.string(),
      image: z.string(),
      tags: z.array(z.string()),
    })).optional(),
    gastronomy: z.array(z.object({
      name: z.string(),
      description: z.string(),
      image: z.string(),
      menu: z.array(z.object({
        name: z.string(),
        description: z.string(),
        price: z.string(),
      })),
    })).optional(),
    attractions: z.array(z.object({
      name: z.string(),
      description: z.string(),
      image: z.string(),
      tags: z.array(z.string()),
    })).optional(),
  }),
});

// Colección de Tours
const tours = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/data/tours",
    generateId: ({ entry }) => entry.replace(/\.json$/, ""),
  }),
  schema: z.object({
    name: z.string(),
    description_tour: z.array(z.object({
      lang_tour: z.enum(["es", "en"]),
      content_tour: z.string(),
    })),
    coverImage: z.string(),
    gallery: z.array(z.string()).optional(),
    itinerary: z.array(z.object({
      title: z.string(),
      description: z.string().optional(),
      hour: z.string().optional(),
    })).optional(),
    duration: z.string(),
    price_adult: z.number(),
    price_child: z.number(),
    tags: z.array(z.string()).optional(),
  }),
});

// Colección de Hoteles
const hotels = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/data/hotels",
    generateId: ({ entry }) => entry.replace(/\.json$/, ""),
  }),
  schema: z.object({
    partner: z.boolean().optional(),
    name: z.string(),
    stars: z.number(),
    rating: z.number(),
    location: z.string(), // Referencia a locations
    destinations: z.array(z.string()).optional(), // Referencia a destinos (IDs)
    mainStreet: z.string().optional(),
    addressNumber: z.string().optional(),
    secondaryStreet: z.string().optional(),
    contact: z.array(z.object({
      type: z.enum(["Email", "Cellphone", "Telephone", "Others"]),
      value: z.string(),
      tag: z.string().optional(),
    })).optional(),
    socialMedia: z.array(z.object({
      name: z.string(),
      url: z.string(),
    })).optional(),
    rooms: z.array(z.object({
      name: z.string(),
      description_room: z.array(z.object({
        lang_room: z.enum(["es", "en"]),
        content_destination: z.string(),
      })).optional(),
      size: z.number().optional(),
      occupancy: z.object({
        min: z.number().optional(),
        max: z.number().optional(),
      }).optional(),
      images: z.array(z.string()).optional(),
      room_services: z.array(z.string()).optional(),
    })).optional(),
    roomPrice: z.number(),
    count: z.number(),
    coverImage: z.string(),
    gallery: z.array(z.string()).optional(),
    description_hotel: z.array(z.object({
      lang_hotel: z.enum(["es", "en"]),
      content_hotel: z.string(),
    })),
    amenities: z.array(z.object({
      basic_services: z.array(z.string()).optional(),
      general_services: z.array(z.string()).optional(),
      extra_services: z.array(z.string()).optional(),
      premium_services: z.array(z.string()).optional(),
    })).optional(),
    tours: z.array(z.string().optional()), // Referencia a tours
    highlight: z.boolean().optional(),
  }),
});

// Colección de Ofertas
const offers = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/data/offers",
    generateId: ({ entry }) => entry.replace(/\.json$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    coverImage: z.string(),
    description_offers: z.array(z.object({
      lang_offer: z.enum(["es", "en"]),
      content_offer: z.string(),
    })).optional(),
    startDate: z.string(),
    expirationDate: z.string(),
    active: z.boolean().optional(),
    discount: z.string(),
    discount_label: z.array(z.object({
      lang_discount: z.enum(["es", "en"]),
      content_discount: z.string(),
    })).optional(),
    price_adult: z.number(),
    price_child: z.number(),
    hotel: z.array(z.string()).optional(), 
    destination: z.array(
      z.string() 
    ).optional(),
  }),
});

// Colección de Posts del Blog
const blogs = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/data/blogs",
    generateId: ({ entry }) => entry.replace(/\.json$/, ""),
  }),
  schema: z.object({
    type: z.enum(["local", "social"]),
    source: z.string().optional(),
    socialPostUrl: z.string().optional(),
    title: z.string(),
    contentSnippet: z.string(),
    fullContent: z.string(),
    imageUrl: z.string(),
    date: z.date(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    popularityMetrics: z.object({
      reactions: z.number().optional(),
      comments: z.number().optional(),
      shares: z.number().optional(),
    }).optional(),
  }),
});

export const collections = {
  locations,
  destinations,
  tours,
  hotels,
  offers,
  blogs,
};
