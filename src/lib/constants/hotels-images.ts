export const getImage = (
    listImages: Record<string, () => Promise<{ default: ImageMetadata }>>,
    key: string
): Promise<{ default: ImageMetadata }> => {
    // Buscar la clave que coincide con el nombre de imagen proporcionado
    const result = Object.keys(listImages).find(imgKey =>
        imgKey.toLowerCase().includes(key.toLowerCase())
    );

    // Si no se encuentra ninguna coincidencia, usar una imagen por defecto
    if (!result) {
        // Podemos devolver la primera imagen disponible como alternativa
        const firstKey = Object.keys(listImages)[0];
        if (firstKey) {
            return listImages[firstKey]();
        }

        // Si no hay imágenes disponibles, lanzar error o usar una imagen de respaldo
        throw new Error(`No se encontró ninguna imagen para la clave: ${key}`);
    }

    // Devolver la imagen encontrada
    return listImages[result]();
};

// --------------------------------------------------------------------------------------------------------------------

// Images Hotel Majestic 2
export const imagesHM2 = import.meta.glob<{
    default: ImageMetadata
}>('/src/assets/upload/hotels/HotelMajestic2/*.{jpeg,jpg,png,gif}')

// Images Hotel Ensueños
export const imagesHE = import.meta.glob<{
    default: ImageMetadata
}>('/src/assets/upload/hotels/HotelEnsuenos/*.{jpeg,jpg,png,gif}')