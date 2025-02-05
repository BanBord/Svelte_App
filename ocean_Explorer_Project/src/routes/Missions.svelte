<script>
  import { activeMission, missions } from '../stores/missionStore';
  import { missionProgress } from '../stores/missionProgressStore';
  import { push } from 'svelte-spa-router';

  function setActiveMission(missionId) {
    activeMission.set(missionId);
    push('/research');
  }
</script>

<div class="content">
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
        <h3>Hints:</h3>
        <ul>
          {#each mission.hints as hint}
            <li>{hint}</li>
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

<style>
  .content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    padding: 2rem;
  }

  .mission-card {
    background: #f5f5f5;
    border-radius: 12px;
    padding: 1.5rem;
    transition: all 0.3s ease;
  }

  .mission-card.completed {
    background: #e0f7fa;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .mission-details {
    margin-top: 1rem;
    padding: 1rem;
    background: rgba(255,255,255,0.5);
    border-radius: 8px;
  }

  .mission-button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background: #2196f3;
    color: white;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .mission-button:hover {
    background: #1976d2;
  }

  .status {
    margin-top: 1rem;
    color: green;
    font-weight: bold;
  }
</style>