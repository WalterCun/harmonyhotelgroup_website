import {apiConnect} from "../constans/enviroments.ts";

function handleFetchError(error: unknown): { data: null; error: string } {
    console.error('Error al hacer el llamado a la API:', error);
    return {data: null, error: error instanceof Error ? error.message : 'Error desconocido'};
}

export async function fetchHomeData(): Promise<{ data: any | null; error: string | null }> {
    try {
        const response = await fetch(`${apiConnect}'api/v1/global'`);
        if (!response.ok) {
            throw new Error('Error al obtener los datos de la API');
        }
        const data = await response.json();
        return {data, error: null};
    } catch (error) {
        return handleFetchError(error);
    }

}