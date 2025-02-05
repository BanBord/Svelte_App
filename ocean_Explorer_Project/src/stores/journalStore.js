import { writable } from 'svelte/store';

export const discoveredSpecies = writable(
  JSON.parse(localStorage.getItem('discoveredSpecies')) || []
);

// Save discovered species when updated
discoveredSpecies.subscribe(value => {
  localStorage.setItem('discoveredSpecies', JSON.stringify(value));
});

export function addDiscoveredSpecies(species) {
  discoveredSpecies.update(currentSpecies => {
    // Preserve previous state and add new species with currentMission flag
    return [...currentSpecies, { ...species, currentMission: true }];
  });
}