<script>
  import { activeMission, missions } from "../stores/missionStore";
  import { missionProgress } from "../stores/missionProgressStore";
  import { push } from "svelte-spa-router";

  function setActiveMission(missionId) {
    activeMission.set(missionId);
    push("/research");
  }
</script>

<div class="content">
  <h1 class="title">Missions</h1>
  <div class="scroll-container">
    {#each Object.values(missions) as mission}
      <div class="mission-card {missionProgress[mission.id]?.completed ? 'completed' : ''}">
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
        {#if missionProgress[mission.id]?.completed}
          <p class="status">✅ Completed</p>
        {:else}
          <button class="mission-button" on:click={() => setActiveMission(mission.id)}>Start Mission</button>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
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
</style>