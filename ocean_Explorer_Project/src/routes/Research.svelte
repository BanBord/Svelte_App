<script>
  import SeaPlot from "../components/SeaPlot.svelte";
  import Researchvessel from "../components/Researchvessel.svelte";
  import Modal from "../components/Fish.svelte";
  import { onMount } from "svelte";
  import { fetchFishData, fishDataStore } from '../stores/localStore';
  import { get } from 'svelte/store';
  
  const seaConfigs = {
    'East China Sea': { areaId: 40047 },
    'Norwegian Sea': { areaId: 32353 },
    'Gulf of Alaska': { areaId: 40002 }
  };

  let selectedSea = "East China Sea"; // Default selected sea
  let isModalOpen = false;
  let selectedFishData = null;

  function handleSeaSelection(sea) {
    selectedSea = sea;
    fetchFishData(seaConfigs[sea].areaId);
  }

  function getGridPosition(index) {
    return {
      x: index % 16,
      y: Math.floor(index / 16)
    };
  }

  function handleShowFishData(event) {
    selectedFishData = event.detail.fishData;
    isModalOpen = true;
  }

  // Create a 16x16 grid of sea plots with unique IDs and names
  const seaPlots = Array.from({ length: 16 * 16 }, (_, index) => ({
    id: index,
    name: `Plot ${index + 1}`,
  }));

  // Variable to store the current position of the research vessel
  let vesselPosition = null;

  // Function to handle the drop event when a draggable element is dropped onto a sea plot
  function handleDrop(event) {
    const { plotId } = event.detail;
    if (plotId !== undefined) {
      vesselPosition = plotId;
      console.log(`Vessel dropped in plot ID: ${vesselPosition}`);
    } else {
      console.warn("Drop event received with undefined plotId");
    }
  }

  // Function to handle the drag over event to allow dropping
  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    console.log("Drag over event");
  }

  // Add event listeners for drag and drop functionality when the component is mounted
  onMount(() => {
    const seaPlots = document.querySelectorAll(".sea-plot");
    seaPlots.forEach((plot) => {
      plot.addEventListener("dragover", handleDragOver);
      plot.addEventListener("drop", handleDrop);
    });
    console.log("Event listeners added to sea plots");
  });

  // Fetch initial fish data for the default selected sea
  fetchFishData(seaConfigs[selectedSea].areaId);
</script>

<div class="content">
  <div class="sea">
    <div class="sea-content">
        {#each seaPlots as plot}
            <SeaPlot 
            id={plot.id} 
            position={getGridPosition(plot.id)}
            seaVariant={selectedSea}
            fishData={get(fishDataStore)}
            on:drop={handleDrop}
            on:showFishData={handleShowFishData}
            >
          {#if vesselPosition == plot.id}
            <Researchvessel />
          {/if}
        </SeaPlot>
      {/each}
    </div>
  </div>
  <div class="shipview-panel">
    <div class="ship-content">
      <div class="mission">
        <h2>Mission</h2>
      </div>
      <div class="marine-area">
        <h2>Marine Area</h2>
      <button 
        type="button"
        class="e-sea toggle-button {selectedSea === 'East China Sea' ? 'active' : ''}"
        on:click={() => handleSeaSelection('East China Sea')}
        on:keydown={(e) => e.key === 'Enter' && handleSeaSelection('East China Sea')}
      >
        East China Sea
      </button>
      <button 
        type="button"
        class="i-oeaz toggle-button {selectedSea === 'Norwegian Sea' ? 'active' : ''}"
        on:click={() => handleSeaSelection('Norwegian Sea')}
        on:keydown={(e) => e.key === 'Enter' && handleSeaSelection('Norwegian Sea')}
      >
        Norwegian Sea
      </button>
        <button 
            type="button"
            class="sou-chin-sea toggle-button {selectedSea === 'Gulf of Alaska' ? 'active' : ''}"
            on:click={() => handleSeaSelection('Gulf of Alaska')}
            on:keydown={(e) => e.key === 'Enter' && handleSeaSelection('Gulf of Alaska')}
        >
            Gulf of Alaska
        </button>
      </div>
      <div class="vessel-container">
        {#if vesselPosition === null}
          <Researchvessel />
        {/if}
      </div>
    </div>
  </div>
</div>

<Modal {isModalOpen} {selectedFishData} />

<style>
  .content {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
  }

  .shipview-panel,
  .sea {
    background-color: #f0f0f0;
    padding: 1rem;
    border: 1px solid #ddd;
    cursor: pointer;
    border-radius: 16px;
  }

  .sea {
    grid-column: 1 / span 6;
    grid-row: 1 / span 2;
    position: relative;
  }

  .sea-content {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    grid-template-rows: repeat(16, 1fr);
  }

  .shipview-panel {
    grid-column: 7 / span 2;
    grid-row: span 2;
    display: flex;
    flex-direction: column;
  }

  .ship-content {
    flex-direction: column;
    gap: 1rem;
    flex-grow: 1;
  }

  .mission,
  .marine-area,
  .vessel-container {
    background-color: #fefefe;
    padding: 20px;
    margin: 0;
    display: flex;
    justify-content: center;
    flex-grow: 1;
    border-radius: 12px;
  }

  .vessel-container {
    margin-top: 1rem;
    position: relative;
  }

  .marine-area{
    margin-top: 1rem;
    flex-direction: column;
  }

.e-sea, .i-oeaz, .sou-chin-sea {
    background-color: #ddd;
    width: auto;
    height: 40px;
    margin: 1rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
}

.toggle-button {
    cursor: pointer;
}

.toggle-button:hover {
    background-color: #bebebe;
}

.toggle-button.active {
    background-color: #4CAF50;
    color: white;
}

  .mission {
    margin-bottom: 1rem;
  }
</style>