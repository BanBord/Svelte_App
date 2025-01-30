import { writable } from 'svelte/store';

// Store discovered species with their Wikipedia data
export const discoveredSpecies = writable(
  JSON.parse(localStorage.getItem('discoveredSpecies')) || []
);

// Update localStorage when store changes
discoveredSpecies.subscribe(value => {
  localStorage.setItem('discoveredSpecies', JSON.stringify(value));
});