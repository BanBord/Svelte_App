<script>
  import { onMount } from 'svelte';
  import Fish from './Fish.svelte';
  import { createEventDispatcher } from 'svelte';

  export let id;
  export let position;
  export let seaVariant;


  const dispatch = createEventDispatcher();
  let fishData = [];
  let depth;
  let depthColor = '#B0C4DE'

  // async function fetchFishData() {
  //   const response = await fetch(`https://api.obis.org/v3/occurrence?geometry=${id}`);
  //   const data = await response.json();
  //   fishData = data.results.map(fish => ({
  //     species: fish.species,
  //     count: fish.individualCount
  //   }));
  // }

  const seaConfigs = {
    'Ostsee': {
      maxDepth: 459,
      avgDepth: 52,
      colorRange: { 
        shallow: '#708090', 
        middle: '#4A6741', 
        deep: '#607D8B' 
      }
    },
    'Indischer Ozean': {
      maxDepth: 7725,
      avgDepth: 3741,
      colorRange: { 
        shallow: '#40E0D0', 
        middle: '#20B2AA', 
        deep: '#00008B' 
      }
    },
    'Süd-Chinesisches Meer': {
      maxDepth: 5559,
      avgDepth: 1024,
      colorRange: { 
        shallow: '#40E0D0', 
        middle: '#1E90FF', 
        deep: '#c92cb9' 
      }
    }
  };

  function calculateDepth() {
    const config = seaConfigs[seaVariant];
    if (!config) return;

    // Cubic depth calculation based on position
    const normalizedX = position.x / 15; // Normalize to 0-1
    const normalizedY = position.y / 15;
    const cubicFactor = Math.pow(normalizedX - 0.5, 2) + Math.pow(normalizedY - 0.5, 2);
    
    depth = config.avgDepth + (config.maxDepth - config.avgDepth) * cubicFactor;
    const { shallow, middle, deep } = config.colorRange;
    depthColor = getDepthColor(depth, config.maxDepth, shallow, middle, deep);
  }

  function getDepthColor(depth, maxDepth, shallow, middle, deep) {
    const depthRatio = depth / maxDepth;
    if (depthRatio < 0.5) {
      return interpolateColor(shallow, middle, depthRatio * 2);
    } else {
      return interpolateColor(middle, deep, (depthRatio - 0.5) * 2);
    }
  }

  function interpolateColor(start, end, ratio) {
    const startRGB = hexToRgb(start);
    const endRGB = hexToRgb(end);
    
    const r = Math.round(startRGB.r + (endRGB.r - startRGB.r) * ratio);
    const g = Math.round(startRGB.g + (endRGB.g - startRGB.g) * ratio);
    const b = Math.round(startRGB.b + (endRGB.b - startRGB.b) * ratio);
    
    return `rgb(${r},${g},${b})`;
  }

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    };
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



  onMount(() => {
    calculateDepth();
    // fetchFishData();
  });
</script>

<div
  class="sea-plot"
  id={id}
  data-depth={depth}
  data-plot-id={id}
  on:drop={handleDrop}
  on:dragover={handleDragOver}
  style="background-color: {depthColor};"
>
  {#each fishData as fish}
    <Fish {fishData} />
  {/each}
  <slot></slot>
</div>

<style>
  .sea-plot {
    width: 100%;
    height: 100%;
    /* background-color will be set inline */
  }
  .sea-plot {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>