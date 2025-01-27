<script>
  import { onMount } from 'svelte';
  import Fish from './Fish.svelte';
  import { createEventDispatcher } from 'svelte';
  import depthData from '../assets/depthdata.json';
  import { fishDataStore } from '../stores/localStore';
  import { get } from 'svelte/store';

  export let id;
  export let position;
  export let seaVariant;

  const dispatch = createEventDispatcher();
  let depth;
  let depthColor = '#B0C4DE';

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

  $: if (seaVariant && position) {
    calculateDepth();
  }
  
  function handleClick() {
    const fishData = get(fishDataStore).find(fish => fish.depth === depth);
    console.log(`SeaPlot ${id} clicked, depth: ${depth}, fishData:`, fishData);

    dispatch('showFishData', { fishData });
  }

  function calculateDepth() {
    const config = seaConfigs[seaVariant];
    if (!config) return;

    const region = depthData.regions.find(region => region.name === seaVariant);
    if (!region) return;

    const { rows, columns } = region.grid;
    const row = Math.floor(position.y / (16 / rows));
    const col = Math.floor(position.x / (16 / columns));
    depth = region.depths[row][col];

    const { shallow, middle, deep } = config.colorRange;
    depthColor = getDepthColor(depth, config.maxDepth, shallow, middle, deep);
  }

  function getDepthColor(depth, maxDepth, shallow, middle, deep) {
    const region = depthData.regions.find(region => region.name === seaVariant);
    if (!region) return deep;

    const maxRegionDepth = Math.max(...region.depths.flat().map(Math.abs));
    const absDepth = Math.abs(depth);
    
    // Convert hex colors to RGB for interpolation
    const hexToRgb = hex => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    // Interpolate between two colors based on progress (0-1)
    const interpolateColors = (color1, color2, progress) => {
      const rgb1 = hexToRgb(color1);
      const rgb2 = hexToRgb(color2);
      
      const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * progress);
      const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * progress);
      const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * progress);
      
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    };

    // Calculate color based on depth position
    if (absDepth <= maxRegionDepth / 2) {
      const progress = (absDepth / (maxRegionDepth / 2));
      return interpolateColors(shallow, middle, progress);
    } else {
      const progress = ((absDepth - maxRegionDepth / 2) / (maxRegionDepth / 2));
      return interpolateColors(middle, deep, progress);
    }
  }

  $: if (seaVariant && position) {
    calculateDepth();
  }

  function handleDrop(event) {
    event.preventDefault();
    const vesselId = event.dataTransfer.getData('text/plain');
    console.log(`SeaPlot ${id} received drop event with vesselId: ${vesselId}`);
    dispatch('drop', { plotId: id, vesselId });
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  // Filter fish data based on depth
  let filteredFishData = [];
  $: filteredFishData = get(fishDataStore).filter(fish => fish.depth === depth);

  onMount(() => {
    calculateDepth();
    // console.log(`SeaPlot ${id} mounted, fishDataStore:`, get(fishDataStore));
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
  style="background-color: {depthColor};"
>
  {#each filteredFishData as fish}
    <Fish fishData={fish} />
  {/each}
  <slot></slot>
</button>

<style>
  .random-blue-background {
    width: 100%;
    height: 100%;
    /* background-color will be set inline */
  }
  .sea-plot {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease;
  }
</style>