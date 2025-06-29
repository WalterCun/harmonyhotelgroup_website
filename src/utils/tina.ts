import { getCollection } from "astro:content";
import { createLogger } from "utils/logger.ts";

const logger = createLogger(false, "tina.ts");

type HotelItem = {
  id: string;
  data: {
    location: string;
    destinations: string[];
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    [key: string]: any;
  };
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export class ExtendHotelCollection<T extends Record<string,any>> {
  private collection: T[] = [];

  constructor(items: T[]) {
    this.collection = [...items];
  }

  public async resolve(): Promise<T[]> {
    try {
      const locationsCollection = await getCollection("locations");
      const destinationsCollection = await getCollection("destinations");

      this.collection = this.collection.map((hotel) => {
        const locationId = hotel.data.location;
        if (!locationId) return { ...hotel };

        const locationData = locationsCollection.find(
          (loc) => loc.filePath === locationId,
        );
        const destinationData = hotel.data.destinations.map((path: string) => {
          return destinationsCollection.find((item) => item.filePath === path)
            ?.data;
        });

        return {
          ...hotel,
          data: {
            ...hotel.data,
            location: [locationData?.data.country, locationData?.data.province, locationData?.data.city]
              .filter(Boolean)
              .join(', ') ?? '',
            destinations: destinationData ?? [],
          },
        };
      });

      return this.collection;
    } catch (error) {
      logger.error("Error loading locations collection:", error);
    }

    return this.collection;
  }
}

// --------------------------------------------------------------------------------------------------------------------

export function imageUrl({
  url,
  back = 0,
  startPath = "",
}: { url: string; back?: number; startPath?: "" | "/" }) {
  let finalPath = "";
  // Si ya tiene el prefijo correcto, devolverla tal cual
  if (url.startsWith(`${startPath}src/assets`)) {
    return url;
  }

  // Si comienza con ~ o / eliminarlo
  const cleanPath =
    url.startsWith("~") || url.startsWith("/") ? url.substring(1) : url;

  if (back > 0) {
    finalPath = cleanPath;
    for (let i = 0; i < back; i++) {
      finalPath = `../${finalPath}`;
    }
  } else {
    finalPath = `${startPath}src/assets/${cleanPath}`;
  }
  // Devolver la ruta correcta
  return finalPath;
}
