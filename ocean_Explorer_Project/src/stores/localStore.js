import { writable } from 'svelte/store';

export const fishDataStore = writable([]);
export const loadingStore = writable(false);
export const errorStore = writable(null);

// Cache object to store fetched data
const fishDataCache = {};

export async function fetchFishData(areaId) {
  // Check if data is already in cache
  if (fishDataCache[areaId]) {
    fishDataStore.set(fishDataCache[areaId]);
    return;
  }

  loadingStore.set(true);
  errorStore.set(null);

  try {
    const response = await fetch(`https://api.obis.org/v3/occurrence?taxonid=293496,151737&areaid=${areaId}&size=50`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    console.log('API Response:', data); // Log the API response
    fishDataStore.set(data.results);
    fishDataCache[areaId] = data.results; // Store data in cache
    console.log('Fish Data Store:', data.results); // Log the data being set in the store

    // Log the depth data for the areas
    const depthData = data.results.map(fish => fish.depth);
    // console.log('Retrieved Depth Data:', depthData);
  } catch (error) {
    console.error('Fetch Error:', error); // Log any errors
    errorStore.set(error.message);
  } finally {
    loadingStore.set(false);
  }
}