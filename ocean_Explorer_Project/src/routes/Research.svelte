<script>
  import SeaPlot from "../components/Seaplot.svelte";
  import Modal from "../components/Fish.svelte";
  import { fetchFishData, fishDataStore } from "../stores/localStore";
  import { push } from 'svelte-spa-router';
  import { activeMission, missions } from "../stores/missionStore";
  import { missionProgress } from "../stores/missionProgressStore";
  import { activeSession } from "../stores/playerStore"; // new import

  const seaConfigs = {
    "East China Sea": { areaId: 40047 },
    "Norwegian Sea": { areaId: 32353 },
    "Gulf of Alaska": { areaId: 40002 },
  };

  // Expose activeSession data
  $: currentSession = $activeSession;
  $: username = currentSession ? currentSession.username : "Guest";

  // You might want to protect the page so that if there's no active session, 
  // you redirect or ask the user to start one.
  if (!$activeSession) {
    // For example, redirect to a session creation/login page
    // push('/login');
  }

  // Continue with existing mission logic
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

  // Create a 16x16 grid of sea plots
  const seaPlots = Array.from({ length: 16 * 16 }, (_, index) => ({
    id: index,
    name: `Plot ${index + 1}`,
  }));
</script>

<!-- Optional: Show active session info -->
{#if currentSession}
  <div class="session-info">
    Logged in as: {username}
  </div>
{:else}
  <div class="session-info">
    No active session. <button on:click={() => push('/login')}>Start Session</button>
  </div>
{/if}

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
  }
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
  .sea,
  .shipview-panel {
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
