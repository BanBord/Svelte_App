import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

// Function to fetch fish data from the OBIS API
async function fetchFishData(areaId) {
  try {
    const response = await fetch(`https://api.obis.org/v3/occurrence?taxonid=293496,151737&areaid=${areaId}&size=50`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Fetch Error:', error);
    return [];
  }
}

// Function to spread fish data on a 16x16 grid
function spreadFishDataOnGrid(fishData, rows, columns, minDepth, maxDepth) {
  const grid = Array.from({ length: rows }, () => Array(columns).fill(null));

  fishData.forEach((fish, index) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    grid[row][col] = fish.depth;
  });

  // Spread remaining fish data evenly if there are fewer fish than grid cells
  let fishIndex = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (grid[row][col] === null && fishIndex < fishData.length) {
        grid[row][col] = fishData[fishIndex].depth;
        fishIndex++;
      }
    }
  }

  // Interpolate missing values
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (grid[row][col] === null) {
        const progress = (row * columns + col) / (rows * columns - 1);
        grid[row][col] = minDepth + progress * (maxDepth - minDepth);
      }
    }
  }

  return grid;
}

(async () => {
  const areaIds = {
    'East China Sea': 40047,
    'Norwegian Sea': 32353,
    'Gulf of Alaska': 40002
  };

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const depthDataPath = path.resolve(__dirname, '../assets/depthdata.json');
  const depthData = JSON.parse(fs.readFileSync(depthDataPath, 'utf8'));

  for (const [areaName, areaId] of Object.entries(areaIds)) {
    const fishData = await fetchFishData(areaId);
    console.log(`Fish data for ${areaName}:`, fishData);

    if (fishData.length > 0) {
      const depths = fishData.map(fish => fish.depth);
      const minDepth = Math.min(...depths);
      const maxDepth = Math.max(...depths);

      const rows = 6; // Adjusted to match the existing grid size in depthdata.json
      const columns = 16;
      const updatedDepths = spreadFishDataOnGrid(fishData, rows, columns, minDepth, maxDepth);
      console.log(`Updated depths for ${areaName}:`, updatedDepths);

      // Update the depths for the specified region
      depthData.regions.forEach(region => {
        if (region.name === areaName) {
          region.depths = updatedDepths;
        }
      });
    } else {
      console.warn(`No fish data available for ${areaName}`);
    }
  }

  // Write the updated data back to depthdata.json
  fs.writeFileSync(depthDataPath, JSON.stringify(depthData, null, 2));
  console.log('depthdata.json updated successfully');
})();