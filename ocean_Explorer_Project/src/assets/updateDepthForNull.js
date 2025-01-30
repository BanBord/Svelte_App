import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Function to interpolate missing values in the grid
function interpolateGrid(grid) {
  const rows = grid.length;
  const columns = grid[0].length;
  let minDepth = Infinity;
  let maxDepth = -Infinity;

  // Find the minimum and maximum depth values in the grid
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const value = grid[row][col];
      if (value !== null) {
        if (value < minDepth) minDepth = value;
        if (value > maxDepth) maxDepth = value;
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
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const depthDataPath = path.resolve(__dirname, '../assets/depthdata.json');
  const depthData = JSON.parse(fs.readFileSync(depthDataPath, 'utf8'));

  // Update the depths for each region
  depthData.regions.forEach(region => {
    region.depths = interpolateGrid(region.depths);
  });

  // Write the updated data back to depthdata.json
  fs.writeFileSync(depthDataPath, JSON.stringify(depthData, null, 2));
  console.log('depthdata.json updated successfully');
})();