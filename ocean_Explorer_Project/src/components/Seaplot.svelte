<script>
  import { onMount } from 'svelte';
  import Fish from './Fish.svelte';
  import { createEventDispatcher } from 'svelte';
  import depthData from '../assets/depthdata.json';
  import { fishDataStore } from '../stores/localStore.js';
  import { get } from 'svelte/store';

  export let id;
  export let position;
  export let seaVariant;

  const dispatch = createEventDispatcher();
  let depth;
  let depthColor = '#B0C4DE';
  let isOpen = false;
  let selectedFishData = null;

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

  // Approximate matching for a given fish depth to the nearest cell depth.
  function findClosestDepthValue(fishDepth, region) {
    let closest = region.depths[0][0];
    let minDiff = Infinity;
    for (const row of region.depths) {
      for (const cell of row) {
        const diff = Math.abs(cell - fishDepth);
        if (diff < minDiff) {
          minDiff = diff;
          closest = cell;
        }
      }
    }
    return closest;
  }

  function calculateDepth() {
    const config = seaConfigs[seaVariant];
    if (!config) return;

    const region = depthData.regions.find(r => r.name === seaVariant);
    if (!region) return;

    const { rows, columns } = region.grid;
    const row = Math.floor(position.y / (16 / rows));
    const col = Math.floor(position.x / (16 / columns));
    depth = region.depths[row][col];

    const { shallow, middle, deep } = config.colorRange;
    depthColor = getDepthColor(depth, shallow, middle, deep, region);
  }

  function getDepthColor(depth, shallow, middle, deep, region) {
    const maxRegionDepth = Math.max(...region.depths.flat().map(Math.abs));
    const absDepth = Math.abs(depth);

    const hexToRgb = hex => {
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

  $: if (seaVariant && position) {
    calculateDepth();
  }

  function handleClick() {
    const region = depthData.regions.find(r => r.name === seaVariant);
    if (!region) return;

    const fishData = get(fishDataStore);
    // Find fish whose depth is closest to this cell's depth
    selectedFishData = fishData.find(fish => {
      const closestDepth = findClosestDepthValue(fish.depth, region);
      return closestDepth === depth;
    });
    isOpen = true;
  }

  function closeModal() {
    isOpen = false;
  }

  function handleDrop(event) {
    event.preventDefault();
    const vesselId = event.dataTransfer.getData('text/plain');
    dispatch('drop', { plotId: id, vesselId });
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  // Show fish if their approximate depth equals this cell's depth
  let filteredFishData = [];
  $: {
    const region = depthData.regions.find(r => r.name === seaVariant);
    if (region) {
      const fishData = get(fishDataStore);
      filteredFishData = fishData.filter(fish => {
        const approxDepth = findClosestDepthValue(fish.depth, region);
        return approxDepth === depth;
      });
    }
  }

  onMount(() => {
    calculateDepth();
    console.log(`SeaPlot ${id} mounted, fishDataStore:`, get(fishDataStore));
  });

</script>

<button
  type="button"
  class="random-blue-background sea-plot"
  id={id}
  depth={depth}
  data-plot-id={id}
  on:drop={handleDrop}
  on:dragover={handleDragOver}
  on:click={handleClick}
  style="background-color: {filteredFishData.length > 0 ? 'orange' : depthColor};"
>
  {#each filteredFishData as fish}
    <Fish fishData={fish} />
  {/each}
  <slot></slot>
</button>

<Fish {isOpen} fishData={selectedFishData} on:close={closeModal} />

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