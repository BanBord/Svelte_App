<!-- @format -->
<script>
  import SeaPlot from "../components/Seaplot.svelte";
  import Modal from "../components/Fish.svelte";
  import { fetchFishData, fishDataStore } from "../stores/localStore";
  import { push } from 'svelte-spa-router';
  import { activeMission, missions } from "../stores/missionStore";
  import { missionProgress } from "../stores/missionProgressStore";

  const seaConfigs = {
    "East China Sea": { areaId: 40047 },
    "Norwegian Sea": { areaId: 32353 },
    "Gulf of Alaska": { areaId: 40002 },
  };

  $: selectedSea = $activeMission ? missions[$activeMission].area : "East China Sea"; // Default selected sea
  
  let isModalOpen = false;
  let FishData = null;

  $: fetchFishData(seaConfigs[selectedSea].areaId);

  function getGridPosition(index) {
    return {
      x: index % 16,
      y: Math.floor(index / 16),
    };
  }

  $: currentMission = $activeMission ? missions[$activeMission] : null;
  $: missionStatus = $activeMission ? $missionProgress[$activeMission] : null;

  // Auto-select correct sea for mission
  // $: if (currentMission && currentMission.area !== selectedSea) {
  //   handleSeaSelection(currentMission.area);
  // }

  // Create a 16x16 grid of sea plots with unique IDs and names
  const seaPlots = Array.from({ length: 16 * 16 }, (_, index) => ({
    id: index,
    name: `Plot ${index + 1}`,
  }));
</script>
<div class="content">
  <div class="sea">
    <div class="sea-content">
      {#each seaPlots as plot}
    <SeaPlot id={plot.id} position={getGridPosition(plot.id)} seaVariant={selectedSea}></SeaPlot>
    {/each}
    </div>
  </div>
  <div class="shipview-panel">
      <button type="button" class="mission" on:click={() => push('/missions')} role="button">
        {#if currentMission}
          <h2>{currentMission.title}</h2>
          <div class="objectives">
            <h3>Objectives:</h3>
            <ul>
              {#each currentMission.objectives as objective}
                <li>{objective}</li>
              {/each}
            </ul>
          </div>
          <div class="hints">
            <h3>Hints:</h3>
            <ul>
              {#each currentMission.hints as hint}
                <li>{hint}</li>
              {/each}
            </ul>
          </div>
          <div class="status">
            <h3>Status:</h3>
            <p>{missionStatus?.completed ? "✅ Mission Completed" : "🔄 In Progress"}</p>
          </div>
        {:else}
          <p>No active mission. Select one from Missions page.</p>
        {/if}
      </button>
    </div>
  </div>


<Modal isOpen={isModalOpen} fishData={FishData} />
<style>
  .content {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
    background-image: url("/public/img/background_static/Hub_Background.png");
    background-size: cover;
    background-position-y: 50%;
  }

  .shipview-panel,
  .sea {
    padding: 1rem;
    cursor: pointer;
    border-radius: 16px;
  }

  .sea {
    grid-column: 1 / span 6;
    grid-row: 1 / span 2;
    position: relative;
    background-color: #171b28;

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
  .marine-area {
    background-color: #fefefe;
    padding: 20px;
    margin: 0;
    display: flex;
    justify-content: center;
    flex-grow: 1;
    border-radius: 12px;
  }

  .mission {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #171b28;
    opacity: 0.9;
    backdrop-filter: blur(10px);
    color: #f7f7f7;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.3s ease;
    h2 {
      margin: 0;
      font-size: 2rem;
    }
    h3 {
      margin: 1rem 0 0.5rem 0;
      font-size: 1.5rem;
    }
    ul{
      list-style-type: none;
      padding: 0;
      font-size: 1.2rem;
    }
    p {
      margin: 0.5rem 0;
      font-size: 1.2rem;
    }
  }

  .mission:hover {
    background-color: #2196f3;
    transform: translateY(-2px);
  }

  .marine-area {
    margin-top: 1rem;
    flex-direction: column;
  }

  .e-sea,
  .i-oeaz,
  .sou-chin-sea {
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
    background-color: #4caf50;
    color: white;
  }

  .mission {
    margin-bottom: 1rem;
  }
</style>
