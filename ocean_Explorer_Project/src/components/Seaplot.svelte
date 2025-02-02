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
      colorSegments: [
        { from: 0, to: 20, color: '#A7EAE2' },
        { from: 20, to: 100, color: '#4EACC4' },
        { from: 100, to: 500, color: '#003366' },
        { from: 500, to: Infinity, color: '#000033' }
      ]
    },
    'Norwegian Sea': {
      colorSegments: [
        { from: 0, to: 200, color: '#B0E2FF' },
        { from: 200, to: 500, color: '#4682B4' },
        { from: 500, to: 800, color: '#000080' },
        { from: 800, to: Infinity, color: '#000033' }
      ]
    },
    'Gulf of Alaska': {
      colorSegments: [
        { from: 0, to: 100, color: '#87CEEB' },
        { from: 100, to: 300, color: '#1E90FF' },
        { from: 300, to: 600, color: '#191970' },
        { from: 600, to: Infinity, color: '#000033' }
      ]
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

    // Choose the color based on discrete depth segments.
    depthColor = getDepthColor(depth);
  }

  function handleClick() {
    if (currentFishData && currentFishData.scientificName) {
      isModalOpen = true;
    }
  }

  function handleModalClose() {
    isModalOpen = false;
  }

  function getDepthColor(depth) {
    const config = seaConfigs[seaVariant];
    if (!config || !config.colorSegments) return '#B0C4DE';
    
    const absDepth = Math.abs(depth);
    // Find the segment in which the absolute depth falls.
    for (const seg of config.colorSegments) {
      if (absDepth >= seg.from && absDepth < seg.to) {
        return seg.color;
      }
    }
    return config.colorSegments[config.colorSegments.length - 1].color;
  }

  onMount(() => {
    calculateDepth();
  });

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