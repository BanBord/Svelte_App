<script>
  import { onMount } from 'svelte';
  import depthData from '../assets/depthdata.json';
  import Fish from './Fish.svelte';

  export let id;
  export let position;
  export let seaVariant;

  let depth;
  let depthColor = '#B0C4DE';
  let isModalOpen = false;
  let currentFishData = null;

  const seaConfigs = {
    'East China Sea': {
      colorRange: { shallow: '#708090', middle: '#4A6741', deep: '#607D8B' }
    },
    'Norwegian Sea': {
      colorRange: { shallow: '#A7EAE2', middle: '#A7EAE2', deep: '#003366' }
    },
    'Gulf of Alaska': {
      colorRange: { shallow: '#4EACC4', middle: '#0077BE', deep: '#003366' }
    }
  };

  function calculateDepth() {
    const config = seaConfigs[seaVariant];
    if (!config) {
      console.error(`No config found for seaVariant: ${seaVariant}`);
      return;
    }

    const region = depthData.regions.find(r => r.name === seaVariant);
    if (!region) {
      console.error(`No region found for seaVariant: ${seaVariant}`);
      return;
    }

    const { rows, columns } = region.grid;
    const row = Math.floor(position.y / (16 / rows));
    const col = Math.floor(position.x / (16 / columns));

    if (row >= rows || col >= columns || row < 0 || col < 0) {
      console.error(`Position out of bounds: row=${row}, col=${col}`);
      return;
    }

    const cell = region.depths[row][col];
    depth = cell.depth;
    currentFishData = {
      scientificName: cell.species,
      depth: cell.depth
    };
    const { shallow, middle, deep } = config.colorRange;
    depthColor = getDepthColor(depth, shallow, middle, deep, region);
    console.log(`Calculated depthColor: ${depthColor}`);
  }

  function handleClick() {
    if (currentFishData && currentFishData.scientificName) {
      isModalOpen = true;
    }
  }

  function handleModalClose() {
    isModalOpen = false;
  }

  function getDepthColor(depth, shallow, middle, deep, region) {
    const maxRegionDepth = Math.max(...region.depths.flat().map(cell => {
      if (typeof cell.depth !== 'number') {
        console.error(`Invalid depth value in region: ${cell.depth}`);
        return 0;
      }
      return Math.abs(cell.depth);
    }));
    const absDepth = Math.abs(depth);

    console.log(`maxRegionDepth: ${maxRegionDepth}, absDepth: ${absDepth}`);

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const interpolateColors = (color1, color2, progress) => {
      const rgb1 = hexToRgb(color1);
      const rgb2 = hexToRgb(color2);
      console.log(`rgb1: ${JSON.stringify(rgb1)}, rgb2: ${JSON.stringify(rgb2)}, progress: ${progress}`);
      const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * progress);
      const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * progress);
      const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * progress);
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    };

    if (absDepth <= maxRegionDepth / 2) {
      const progress = absDepth / (maxRegionDepth / 2);
      return interpolateColors(shallow, middle, progress);
    } else {
      const progress = (absDepth - maxRegionDepth / 2) / (maxRegionDepth / 2);
      return interpolateColors(middle, deep, progress);
    }
  }

  onMount(calculateDepth);

  $: if (seaVariant && position) {
    calculateDepth();
  }
</script>

<button
  type="button"
  class="random-blue-background sea-plot"
  id={id}
  data-depth={depth}
  data-plot-id={id}
  style="background-color: {depthColor};"
  on:click={handleClick}
>
  <slot></slot>
</button>

<Fish 
  isOpen={isModalOpen} 
  fishData={currentFishData}
  on:close={handleModalClose}
/>

<style>
  .random-blue-background {
    width: 100%;
    height: 100%;
  }
  .sea-plot {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease;
  }
</style>