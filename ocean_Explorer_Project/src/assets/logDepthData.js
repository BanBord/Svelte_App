import { get } from 'svelte/store';
import { fishDataStore } from '../stores/localStore.js';

// Fetch fish data from the store
const fishData = get(fishDataStore);
console.log('Fish data:', fishData);

// Function to group fish data by sea type
function groupFishDataBySeaType(fishData) {
  const groupedData = {};

  fishData.forEach(fish => {
    const seaType = fish.seaType; // Assuming fish data has a seaType attribute
    if (!groupedData[seaType]) {
      groupedData[seaType] = [];
    }
    groupedData[seaType].push(fish.depth);
  });

  return groupedData;
}

const groupedFishData = groupFishDataBySeaType(fishData);
console.log('Grouped fish data by sea type:', groupedFishData);