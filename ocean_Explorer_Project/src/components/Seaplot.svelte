<script>
  import { onMount } from 'svelte';
  import depthData from '../assets/depthdata.json';
  import Fish from './Fish.svelte';
  import { discoveredSpecies, addDiscoveredSpecies } from '../stores/journalStore';
  import { missionProgress, checkMissionCriteria } from '../stores/missionProgressStore';
  import { activeMission } from '../stores/missionStore';
  import Notification from './Notification.svelte';

  export let id;
  export let position;
  export let seaVariant;
  let notificationMessage = '';
  let notificationType = 'info';

  let depth;
  let depthColor = '#B0C4DE';
  let isModalOpen = false;
  let currentFishData = null;

  const seaConfigs = {
    'East China Sea': {
      colorSegments: [
        { from: 0, to: 20, color: '#A7EAE2' },
        { from: 20, to: 50, color: '#76D7C4' },
        { from: 50, to: 100, color: '#4EACC4' },
        { from: 100, to: 200, color: '#2E8B57' },
        { from: 200, to: 500, color: '#003366' },
        { from: 500, to: 1000, color: '#001F3F' },
        { from: 1000, to: Infinity, color: '#000033' }
      ]
    },
    'Norwegian Sea': {
      colorSegments: [
        { from: 0, to: 50, color: '#B0E2FF' },
        { from: 50, to: 200, color: '#87CEFA' },
        { from: 200, to: 400, color: '#4682B4' },
        { from: 400, to: 600, color: '#4169E1' },
        { from: 600, to: 800, color: '#000080' },
        { from: 800, to: 1200, color: '#00004B' },
        { from: 1200, to: Infinity, color: '#000033' }
      ]
    },
    'Gulf of Alaska': {
      colorSegments: [
        { from: 0, to: 50, color: '#87CEEB' },
        { from: 50, to: 100, color: '#00BFFF' },
        { from: 100, to: 200, color: '#1E90FF' },
        { from: 200, to: 400, color: '#0000CD' },
        { from: 400, to: 600, color: '#191970' },
        { from: 600, to: 1000, color: '#00008B' },
        { from: 1000, to: Infinity, color: '#000033' }
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

    depthColor = getDepthColor(depth);
  }

  function handleClick() {
    if (currentFishData && currentFishData.scientificName) {
      addDiscoveredSpecies(currentFishData);

      if ($activeMission) {
        const isComplete = checkMissionCriteria($activeMission, $discoveredSpecies);
        if (isComplete) {
          missionProgress.update(progress => ({
            ...progress,
            [$activeMission]: { completed: true, completedAt: new Date().toISOString() }
          }));
          notificationMessage = 'Mission Completed!';
          notificationType = 'success';
        }
      }

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

{#if notificationMessage}
  <Notification message={notificationMessage} type={notificationType} />
{/if}

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