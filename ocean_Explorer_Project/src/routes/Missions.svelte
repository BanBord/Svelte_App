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
</script>

<div class="content">
  <h1 class="title">Missions</h1>
  {#if $activeSession}
    <div class="scroll-container">
      {#each Object.values(missions) as mission}
        <div
          class="mission-card {$activeSession.missions[mission.id]?.completed ? 'completed' : ''}"
        >
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
          {#if $activeSession.missions[mission.id]?.completed}
            <p class="status">✅ Completed</p>
          {:else}
            <button
              class="mission-button"
              on:click={() => setActiveMission(mission.id)}
            >
              Start Mission
            </button>
          {/if}
        </div>
      {/each}
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

  /* Desktop layout */
  .content {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 1rem;
    padding: 2rem;
    background-image: url("/public/img/background_static/Mission_Hintergrund.png");
    background-size: cover;
    background-position-y: 50%;
  }

  .title {
    grid-column: 2 / span 6;
    color: #fa9c1b;
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .scroll-container {
    grid-column: 2 / span 6;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    max-height: 80vh;
    overflow-y: auto;
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
    grid-column: 2 / span 6;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  /* Mobile responsive design */
  @media screen and (max-width: 375px) and (max-height: 812px) {
    .content {
      display: flex;
      flex-direction: column;
      min-height: calc(100vh - (2 * var(--safe-area)));
      padding: var(--safe-area);
      background-image: url("/public/img/background_static/Mission_Hintergrund.png");
      background-size: cover;
      background-position: center;
    }

    .title {
      font-size: 2.5rem;
      text-align: center;
      margin: 1rem 0;
      grid-column: auto;
    }

    .scroll-container {
      grid-column: auto;
      display: flex;
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

    .no-session {
      grid-column: auto;
    }
  }
</style>