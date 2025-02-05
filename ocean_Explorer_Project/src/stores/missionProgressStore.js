import { writable } from 'svelte/store';
import { missions } from './missionStore';

const storedProgress = JSON.parse(localStorage.getItem('missionProgress')) || {};
export const missionProgress = writable(storedProgress);

missionProgress.subscribe(value => {
    localStorage.setItem('missionProgress', JSON.stringify(value));
});

export function checkMissionCriteria(missionId, discoveredSpecies) {
    const mission = missions[missionId];
    if (!mission) return false;

    const currentMissionSpecies = discoveredSpecies.filter(s => s.currentMission);

    switch (missionId) {
        case 1:
            return validateEastChinaMission(currentMissionSpecies);
        case 2:
            return validateAlaskaMission(currentMissionSpecies);
        case 3:
            return validateNorwegianMission(currentMissionSpecies);
        case 4:
            return validateEastChinaDepthChallenge(currentMissionSpecies);
        case 5:
            return validateAlaskaSpeciesHunt(currentMissionSpecies);
        case 6:
            return validateEastChinaBiodiversity(currentMissionSpecies);
        case 7:
            return validateAlaskaDepthExplorer(currentMissionSpecies);
        case 8:
            return validateNorwegianSpeciesSurvey(currentMissionSpecies);
        case 9:
            return validateEastChinaSpeciesHunt(currentMissionSpecies);
        default:
            return false;
    }
}

function validateEastChinaMission(discoveries) {
    const hasChromisNotata = discoveries.some(d => d.scientificName === "Chromis notata");
    const uniqueDepths = new Set(discoveries.map(d => d.depth));

    // Log the contents of the uniqueDepths set
    console.log("East China Mission:", discoveries);
    console.log("Chromis Notata:", hasChromisNotata);
    console.log("Multiple Depths:", uniqueDepths.size >= 2);

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

function validateEastChinaBiodiversity(discoveries) {
    const uniqueSpecies = new Set(discoveries.map(d => d.scientificName));
    const hasSixSpecies = uniqueSpecies.size >= 6;
    const uniqueDepths = new Set(discoveries.map(d => d.depth));
    const hasMultipleDepths = uniqueDepths.size >= 2;
    return hasSixSpecies && hasMultipleDepths;
}

function validateAlaskaDepthExplorer(discoveries) {
    const deepWaterSpecies = discoveries.filter(d => d.depth < -300);
    const hasThreeDeepWaterSpecies = deepWaterSpecies.length >= 3;
    const uniqueDepths = new Set(discoveries.map(d => d.depth));
    const hasMultipleDepths = uniqueDepths.size >= 2;
    return hasThreeDeepWaterSpecies && hasMultipleDepths;
}

function validateNorwegianSpeciesSurvey(discoveries) {
    const uniqueSpecies = new Set(discoveries.map(d => d.scientificName));
    const hasFiveSpecies = uniqueSpecies.size >= 5;
    const uniqueDepths = new Set(discoveries.map(d => d.depth));
    const hasMultipleDepths = uniqueDepths.size >= 2;
    return hasFiveSpecies && hasMultipleDepths;
}

function validateEastChinaSpeciesHunt(discoveries) {
    const uniqueSpecies = new Set(discoveries.map(d => d.scientificName));
    const hasFourSpecies = uniqueSpecies.size >= 4;
    const uniqueDepths = new Set(discoveries.map(d => d.depth));
    const hasMultipleDepths = uniqueDepths.size >= 2;

    console.log("East China Species Hunt:", discoveries);
    console.log("Unique Species:", hasFourSpecies);
    console.log("Multiple Depths:", hasMultipleDepths);
    return hasFourSpecies && hasMultipleDepths;
}