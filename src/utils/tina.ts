import { createLogger } from "utils/logger.ts";
import { getCollection } from "astro:content";

const logger = createLogger(false, "tina.ts");

class PowerCollection<T extends Record<string, any>> {
  private collection: T[] = [];
  private history: T[][] = [];

  constructor(items: T[]) {
    this.collection = [...items];
    this.saveState();
  }

  private saveState(): void {
    this.history.push([...this.collection]);
  }

  public sortAlphabetically(key: keyof T): T[] {
    this.collection.sort((a, b) => {
      if (typeof a[key] === "string" && typeof b[key] === "string") {
        return (a[key] as string).localeCompare(b[key] as string);
      }
      return 0;
    });
    this.saveState();
    return this.collection;
  }

  public filterByBoolean(key: keyof T): T[] {
    this.collection = this.collection.filter((item) => Boolean(item[key]));
    this.saveState();
    return this.collection;
  }

  public undo(): T[] {
    if (this.history.length > 1) {
      this.history.pop(); // Remove current state
      this.collection = [...this.history[this.history.length - 1]];
    }
    return this.collection;
  }

  public getCurrentState(): T[] {
    return [...this.collection];
  }

  public getHistoryStates(): T[][] {
    return [...this.history];
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
