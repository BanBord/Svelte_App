import { writable } from 'svelte/store';

export const fishDataStore = writable([]);
export const loadingStore = writable(false);
export const errorStore = writable(null);

export async function fetchFishData(areaId) {
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
    console.log('Fish Data Store:', data.results); // Log the data being set in the store

    // Log the depth data for the areas
    const depthData = data.results.map(fish => fish.depth);
    console.log('Retrieved Depth Data:', depthData);
  } catch (error) {
    console.error('Fetch Error:', error); // Log any errors
    errorStore.set(error.message);
  } finally {
    loadingStore.set(false);
  }
}