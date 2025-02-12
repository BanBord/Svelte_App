import { writable } from 'svelte/store';
import { missions } from './missionStore';
import { completeMission } from './playerStore'; // Import the completeMission function

const storedProgress = JSON.parse(localStorage.getItem('missionProgress')) || {};
export const missionProgress = writable(storedProgress);

missionProgress.subscribe(value => {
    localStorage.setItem('missionProgress', JSON.stringify(value));
});

export function checkMissionCriteria(missionId, discoveredSpecies) {
    const mission = missions[missionId];
    if (!mission) return false;

    const currentMissionSpecies = discoveredSpecies.filter(s => s.currentMission);

    let criteriaMet = false;
    switch (missionId) {
        case 1:
            criteriaMet = validateEastChinaMission(currentMissionSpecies);
            break;
        case 2:
            criteriaMet = validateAlaskaMission(currentMissionSpecies);
            break;
        case 3:
            criteriaMet = validateNorwegianMission(currentMissionSpecies);
            break;
        case 4:
            criteriaMet = validateEastChinaDepthChallenge(currentMissionSpecies);
            break;
        case 5:
            criteriaMet = validateAlaskaSpeciesHunt(currentMissionSpecies);
            break;
        case 6:
            criteriaMet = validateEastChinaBiodiversity(currentMissionSpecies);
            break;
        case 7:
            criteriaMet = validateAlaskaDepthExplorer(currentMissionSpecies);
            break;
        case 8:
            criteriaMet = validateNorwegianSpeciesSurvey(currentMissionSpecies);
            break;
        case 9:
            criteriaMet = validateEastChinaSpeciesHunt(currentMissionSpecies);
            break;
        default:
            criteriaMet = false;
    }

    if (criteriaMet) {
        completeMission(missionId); // Call completeMission if criteria are met
    }

    return criteriaMet;
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