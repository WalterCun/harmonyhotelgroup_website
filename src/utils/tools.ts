// Funcion para crear un array de numeros
export function range(start: number, end: number) {
	const result = [];
	for (let i = start; i <= end; i++) {
		result.push(i);
	}
	return result;
}

// --------------------------------------------------------------------------------------------------------------------

/**
 * Obtiene información de geolocalización basada en la IP del usuario
 * @returns Promesa con datos de país, código de país, región y ciudad
 */
export async function getGeolocation() {
	try {
		const respuesta = await fetch('http://ip-api.com/json');

		if (!respuesta.ok) {
			throw new Error(`Error al obtener geolocalización: ${respuesta.status}`);
		}

		const datos = await respuesta.json();

		// Extraer solo los campos necesarios
		const { country, countryCode, regionName, city } = datos;

		return {
			country,
			countryCode,
			regionName,
			city
		};
	} catch (error) {
		console.error('Error al obtener datos de geolocalización:', error);
		// Puedes devolver valores por defecto o null en caso de error
		return {
			country: null,
			countryCode: null,
			regionName: null,
			city: null
		};
	}
}