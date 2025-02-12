<script>
  import { activeSession } from "../stores/playerStore";
  import { activeMission, missions } from "../stores/missionStore";
  import { push } from "svelte-spa-router";

  function setActiveMission(missionId) {
    if (!$activeSession) {
      alert("Please select a session first.");
      return;
    }
    activeMission.set(missionId);
    push("/research");
  }

  let activeMissionsList = [];
  let completedMissionsList = [];

  $: if ($activeSession) {
    const allMissions = Object.values(missions);
    activeMissionsList = allMissions.filter(
      (mission) => !$activeSession.missions[mission.id]?.completed
    );
    completedMissionsList = allMissions.filter(
      (mission) => $activeSession.missions[mission.id]?.completed
    );
  }
</script>

<div class="content">
  <h1 class="title">Missions</h1>
  {#if $activeSession}
    <div class="missions-section">
      {#if activeMissionsList.length > 0}
        <h2>Active Missions</h2>
        <div class="scroll-container">
          {#each activeMissionsList as mission}
            <div class="mission-card">
              <h2>{mission.title}</h2>
              <p>{mission.description}</p>
              <div class="mission-details">
                <h3>Objectives:</h3>
                <ul>
                  {#each mission.objectives as objective}
                    <li>{objective}</li>
                  {/each}
                </ul>
              </div>
              <button
                class="mission-button"
                on:click={() => setActiveMission(mission.id)}
              >
                Start Mission
              </button>
            </div>
          {/each}
        </div>
      {/if}

      {#if completedMissionsList.length > 0}
        <h2>Completed Missions</h2>
        <div class="scroll-container">
          {#each completedMissionsList as mission}
            <div class="mission-card completed">
              <h2>{mission.title}</h2>
              <p>{mission.description}</p>
              <div class="mission-details">
                <h3>Objectives:</h3>
                <ul>
                  {#each mission.objectives as objective}
                    <li>{objective}</li>
                  {/each}
                </ul>
              </div>
              <p class="status">✅ Completed</p>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {:else}
    <div class="no-session">
      <img src="/public/img/no-session.png" alt="No Session" class="no-session-image" />
      <p class="no-session-text">
        Please select or create a player session to view missions.
      </p>
    </div>
  {/if}
</div>

<style>
  :root {
    --safe-area: 8px;
  }

  .content {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    background-image: url("/public/img/background_static/Mission_Hintergrund.png");
    background-size: cover;
    background-position-y: 50%;
  }

  .title {
    color: #fa9c1b;
    font-size: 4rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  .missions-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .missions-section h2 {
    color: #fa9c1b;
    margin: 1rem 0;
    font-size: 2rem;
    text-align: center;
  }

  .scroll-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    max-height: 80vh;
    overflow-y: auto;
    justify-content: center;
  }

  .scroll-container::-webkit-scrollbar {
    width: 8px;
  }

  .scroll-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .scroll-container::-webkit-scrollbar-thumb {
    background-color: #fa9c1b;
    border-radius: 4px;
    border: 2px solid transparent;
    background-clip: content-box;
  }

  .scroll-container:hover::-webkit-scrollbar-thumb {
    background-color: #fa9c1b;
  }

  .mission-card {
    border-radius: 8px;
    padding: 1rem;
    background: rgba(23, 27, 40, 0.8);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    width: 300px;
  }

  .mission-card.completed {
    background: #e0f7fa;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .mission-details {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 4px;
  }

  .mission-button {
    margin-top: 0.5rem;
    padding: 0.5rem;
    border: none;
    border-radius: 8px;
    background: #1976d2;
    color: white;
    cursor: pointer;
    transition: background 0.3s ease;
    width: 100%;
  }

  .mission-button:hover {
    background: #fa9c1b;
  }

  .status {
    margin-top: 0.5rem;
    color: green;
    font-weight: bold;
  }

  h2 {
    color: #f7f7f7;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  h3 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0.5rem 0;
    color: #f7f7f7;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  li {
    margin-bottom: 0.3rem;
  }

  .no-session {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  @media screen and (max-width: 375px) and (max-height: 812px) {
    .content {
      padding: var(--safe-area);
      background-position: center;
    }

    .title {
      font-size: 2.5rem;
      margin: 1rem 0;
    }

    .scroll-container {
      flex-direction: column;
      gap: 0.5rem;
      max-height: none;
      overflow-y: visible;
    }

    .mission-card {
      width: 100%;
      margin-bottom: 1rem;
    }

    .mission-button {
      width: 100%;
    }
  }
</style>
