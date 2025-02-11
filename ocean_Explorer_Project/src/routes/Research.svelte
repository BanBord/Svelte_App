<script>
  import SeaPlot from "../components/Seaplot.svelte";
  import Modal from "../components/Fish.svelte";
  import { fetchFishData, fishDataStore } from "../stores/localStore";
  import { push } from 'svelte-spa-router';
  import { activeMission, missions } from "../stores/missionStore";
  import { missionProgress } from "../stores/missionProgressStore";
  import { activeSession } from "../stores/playerStore";

  const seaConfigs = {
    "East China Sea": { areaId: 40047 },
    "Norwegian Sea": { areaId: 32353 },
    "Gulf of Alaska": { areaId: 40002 },
  };

  $: currentSession = $activeSession;
  $: username = currentSession ? currentSession.username : "Guest";

  if (!$activeSession) {
    // Optionally redirect to login
    // push('/login');
  }

  $: selectedSea = $activeMission ? missions[$activeMission].area : "East China Sea";
  
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

  const seaPlots = Array.from({ length: 16 * 16 }, (_, index) => ({
    id: index,
    name: `Plot ${index + 1}`,
  }));
</script>


<div class="content">
  <div class="sea">
    <div class="sea-content">
      {#each seaPlots as plot}
        <SeaPlot id={plot.id} position={getGridPosition(plot.id)} seaVariant={selectedSea} />
      {/each}
    </div>
  </div>
  <div class="shipview-panel">
    <button type="button" class="mission" on:click={() => push('/missions')}>
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
  .session-info {
    text-align: right;
    margin: 1rem;
    font-size: 1.2rem;
    color: #fff;
  }

  .content {
    gap: 1rem;
    padding: 1rem;
    background-image: url("/img/background_static/Hub_Background.png");
    background-size: cover;
    background-position-y: 50%;
  }

  /* Desktop Layout */
  @media (min-width: 1024px) {
    .content {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: repeat(2, 1fr);
    }
    .sea {
      grid-column: 1 / span 6;
      grid-row: 1 / span 2;
      padding: 1rem;
      background-color: #171b28;
      border-radius: 16px;
      cursor: pointer;
      position: relative;
    }
    .shipview-panel {
      grid-column: 7 / span 2;
      grid-row: 1 / span 2;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      border-radius: 16px;
    }
  }

  /* Tablet Layout */
  @media (min-width: 600px) and (max-width: 1023px) {
    .content {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: auto auto;
    }
    .sea {
      grid-column: 1 / span 4;
      grid-row: 1;
      padding: 1rem;
      background-color: #171b28;
      border-radius: 16px;
      cursor: pointer;
      position: relative;
    }
    .shipview-panel {
      grid-column: 1 / span 4;
      grid-row: 2;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      border-radius: 16px;
    }
  }

  /* Mobile Layout */
  @media screen and (max-width: 425px) {
    .content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 0.5rem;
    }
    .sea {
      width: 100%;
      height: 60vh; /* Reduce sea area height to make touch targets larger */
      padding: 0.5rem;
      background-color: #171b28;
      border-radius: 16px;
      cursor: pointer;
      position: relative;
    }
    .sea-content {
      display: grid;
      grid-template-columns: repeat(8, 1fr); /* Fewer columns for larger plots */
      grid-template-rows: repeat(8, 1fr);
      gap: 0.5rem;
      width: 100%;
      height: 100%;
    }
    .shipview-panel {
      width: 100%;
      padding: 1rem;
      background-color: #171b28;
      border-radius: 16px;
      cursor: pointer;
      margin-top: 1rem;
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
      padding: 0.8rem;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s ease, transform 0.3s ease;
      font-size: 0.9rem;
    }
    .mission:hover {
      background-color: #2196f3;
      transform: translateY(-2px);
    }
  }

  .sea-content {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    grid-template-rows: repeat(16, 1fr);
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
  }
  
  .mission:hover {
    background-color: #2196f3;
    transform: translateY(-2px);
  }
</style>
