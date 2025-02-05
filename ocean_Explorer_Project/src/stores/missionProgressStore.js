import { writable } from 'svelte/store';
import { missions } from './missionStore';

// Initialize from localStorage
const storedProgress = JSON.parse(localStorage.getItem('missionProgress')) || {};
export const missionProgress = writable(storedProgress);

// Save progress to localStorage
missionProgress.subscribe(value => {
  localStorage.setItem('missionProgress', JSON.stringify(value));
});

// Mission validation functions
export function checkMissionCriteria(missionId, discoveredSpecies) {
  const mission = missions[missionId];
  if (!mission) return false;

  switch(missionId) {
    case 1: // East China Sea Mission
      return validateEastChinaMission(discoveredSpecies);
    case 2: // Gulf of Alaska Mission
      return validateAlaskaMission(discoveredSpecies);
    case 3: // Norwegian Sea Mission
      return validateNorwegianMission(discoveredSpecies);
    case 4: // East China Sea Depth Challenge
      return validateEastChinaDepthChallenge(discoveredSpecies);
    case 5: // Gulf of Alaska Species Hunt
      return validateAlaskaSpeciesHunt(discoveredSpecies);
    default:
      return false;
  }
}

function validateEastChinaMission(discoveries) {
  const hasChromisNotata = discoveries.some(d => d.scientificName === "Chromis notata");
  const uniqueDepths = new Set(discoveries.map(d => d.depth));
  const hasMultipleDepths = uniqueDepths.size >= 2;
  return hasChromisNotata && hasMultipleDepths;
}

function validateAlaskaMission(discoveries) {
  const hasDeepWaterSpecies = discoveries.some(d => d.depth < -200);
  const uniqueDepths = new Set(discoveries.map(d => d.depth));
  const hasMultipleDepths = uniqueDepths.size >= 2;
  return hasDeepWaterSpecies && hasMultipleDepths;
}

function validateNorwegianMission(discoveries) {
  const uniqueDepths = new Set(discoveries.map(d => d.depth));
  const hasMultipleDepths = uniqueDepths.size >= 2;
  return hasMultipleDepths;
}

function validateEastChinaDepthChallenge(discoveries) {
  const uniqueDepthRanges = new Set(discoveries.map(d => {
    if (d.depth < -50) return 'shallow';
    if (d.depth < -200) return 'mid';
    return 'deep';
  }));
  const hasThreeDepthRanges = uniqueDepthRanges.size >= 3;
  const uniqueSpecies = new Set(discoveries.map(d => d.scientificName));
  const hasFiveSpecies = uniqueSpecies.size >= 5;
  return hasThreeDepthRanges && hasFiveSpecies;
}

function validateAlaskaSpeciesHunt(discoveries) {
  const uniqueSpecies = new Set(discoveries.map(d => d.scientificName));
  const hasFourSpecies = uniqueSpecies.size >= 4;
  const uniqueDepths = new Set(discoveries.map(d => d.depth));
  const hasMultipleDepths = uniqueDepths.size >= 2;
  return hasFourSpecies && hasMultipleDepths;
}