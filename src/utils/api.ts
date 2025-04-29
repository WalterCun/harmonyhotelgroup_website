// api.ts - API integration utility for fetching data from external APIs

/**
 * Base URL for the API from environment variables
 */
const API_BASE_URL: string = import.meta.env.PUBLIC_API_BASE_URL || 'https://api.harmonyhotelgroup.com';

/**
 * API Key for authentication from environment variables
 */
const API_KEY: string = import.meta.env.API_KEY || 'default_api_key';

/**
 * Fetch data from the API with error handling and retries
 * @param {string} endpoint - API endpoint to fetch data from
 * @param {RequestInit} options - Fetch options
 * @param {number} retries - Number of retries if the request fails
 * @returns {Promise<any>} - Promise that resolves to the API response
 */
async function fetchWithRetries(endpoint: string, options: RequestInit = {}, retries: number = 3): Promise<any> {
  try {
    // Add API key to headers for authentication
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
      ...options.headers
    };

    const requestOptions: RequestInit = {
      ...options,
      headers
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (retries > 0) {
      console.warn(`API request failed, retrying... (${retries} retries left)`);
      return fetchWithRetries(endpoint, options, retries - 1);
    }

    console.error('API request failed after multiple retries:', error);

    // Return fallback data from local JSON files
    return getFallbackData(endpoint);
  }
}

/**
 * Get fallback data from local JSON files if API request fails
 * @param {string} endpoint - API endpoint that failed
 * @returns {Promise<any>} - Promise that resolves to the fallback data
 */
async function getFallbackData(endpoint: string): Promise<any> {
  let fallbackData: any;

  try {
    if (endpoint.includes('/hotels')) {
      // fallbackData = await import('../data/hotels.json');
    } else if (endpoint.includes('/tours')) {
      // fallbackData = await import('../data/tours.json');
    } else if (endpoint.includes('/tourist-sites')) {
      // fallbackData = await import('../data/tourist-sites.json');
    } else {
      fallbackData = [];
    }

    console.warn('Using fallback data from local JSON files');
    return fallbackData.default || fallbackData;
  } catch (error) {
    console.error('Failed to load fallback data:', error);
    return [];
  }
}

/**
 * Fetch hotels data from the API
 * @returns {Promise<Array<any>>} - Promise that resolves to an array of hotels
 */
export async function getHotels(): Promise<Array<any>> {
  return fetchWithRetries('/hotels');
}

/**
 * Fetch tours data from the API
 * @returns {Promise<Array<any>>} - Promise that resolves to an array of tours
 */
export async function getTours(): Promise<Array<any>> {
  return fetchWithRetries('/tours');
}

/**
 * Fetch tourist sites data from the API
 * @returns {Promise<Array<any>>} - Promise that resolves to an array of tourist sites
 */
export async function getTouristSites(): Promise<Array<any>> {
  return fetchWithRetries('/tourist-sites');
}

/**
 * Fetch featured hotels data from the API
 * @param {number} limit - Number of featured hotels to fetch
 * @returns {Promise<Array<any>>} - Promise that resolves to an array of featured hotels
 */
export async function getFeaturedHotels(limit: number = 3): Promise<Array<any>> {
  const hotels = await getHotels();
  return hotels.slice(0, limit);
}

/**
 * Fetch featured tours data from the API
 * @param {number} limit - Number of featured tours to fetch
 * @returns {Promise<Array<any>>} - Promise that resolves to an array of featured tours
 */
export async function getFeaturedTours(limit: number = 3): Promise<Array<any>> {
  const tours = await getTours();
  return tours.slice(0, limit);
}

/**
 * Fetch featured tourist sites data from the API
 * @param {number} limit - Number of featured tourist sites to fetch
 * @returns {Promise<Array<any>>} - Promise that resolves to an array of featured tourist sites
 */
export async function getFeaturedTouristSites(limit: number = 4): Promise<Array<any>> {
  const touristSites = await getTouristSites();
  return touristSites.slice(0, limit);
}