<script>
  import { activeMission } from '../stores/missionStore';
  import { missions } from '../stores/missionStore';
  import { get } from 'svelte/store';

  function setActiveMission(missionId) {
    activeMission.set(missionId);
  }
</script>

<div class="content">
  {#each Object.values(missions) as mission}
    <div class="mission-card {get(activeMission) === mission.id ? 'active' : ''}">
      <div class="mission-content">
        <h2>{mission.title}</h2>
        <div class="mission-description">
          <p>{mission.description}</p>
          {#if get(activeMission) === mission.id}
            <div class="mission-details">
              <h3>Hints:</h3>
              <ul>
                {#each mission.hints as hint}
                  <li>{hint}</li>
                {/each}
              </ul>
              <h3>Objectives:</h3>
              <ul>
                {#each mission.objectives as objective}
                  <li>{objective}</li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
        <button 
          class="mission-button"
          on:click={() => setActiveMission(mission.id)}
        >
          {get(activeMission) === mission.id ? 'Active' : 'Start Mission'}
        </button>
      </div>
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

  .mission-card.active {
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
</style>