<script>
  import { activeSession } from "../stores/playerStore.js";
  import SpeciesCard from "../components/SpeciesCard.svelte";
  let searchQuery = "";
  let sortKey = "scientificName";
  let filteredSpecies = [];

  // Update the reactive value for the current session's journal entries.
  $: sessionJournal = $activeSession ? $activeSession.journal : [];

  // When either the journal entries or searchQuery changes, update the filtered list.
  $: filteredSpecies = sessionJournal.filter((species) =>
    species.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function sortSpecies(key) {
    sortKey = key;
    filteredSpecies = [...sessionJournal].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return -1;
      if (a[sortKey] > b[sortKey]) return 1;
      return 0;
    });
  }
  
  function filterArea(area) {
    filteredSpecies = sessionJournal.filter(species => species.area === area);
  }
</script>

{#if $activeSession}
  <div class="content">
    <div class="progress-panel">
      <div class="progress-content">
        <h2>Progress</h2>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: {(sessionJournal.length / 100) * 100}%"></div>
          <span>{sessionJournal.length} / 100</span>
        </div>
      </div>
      <div class="catch-history">
        <h2>Catch History</h2>
        {#if sessionJournal.length > 0}
          <div class="species-card">
            {#if sessionJournal[sessionJournal.length - 1].thumbnail}
              <img src={sessionJournal[sessionJournal.length - 1].thumbnail.source} 
                alt={sessionJournal[sessionJournal.length - 1].title} />
            {/if}
            <h3>{sessionJournal[sessionJournal.length - 1].scientificName}</h3>
            <p class="depth">Depth: {sessionJournal[sessionJournal.length - 1].depth}m</p>
            <p class="description">{sessionJournal[sessionJournal.length - 1].description}</p>
            <p class="discovered">
              Discovered: {new Date(sessionJournal[sessionJournal.length - 1].discoveredAt).toLocaleDateString()}
            </p>
          </div>
        {/if}
      </div>
    </div>
    <div class="journal-panel">
      <div class="search-and-journal">
        <div class="search-bar">
          <input type="text" placeholder="Search species..." bind:value={searchQuery} />
        </div>
        <div class="sorting-chips">
          <button on:click={() => sortSpecies("scientificName")}>Scientific Name</button>
          <button on:click={() => sortSpecies("depth")}>Depth</button>
          <button on:click={() => sortSpecies("discoveredAt")}>Discovered Date</button>
          <button on:click={() => filterArea('East China Sea')}>East China Sea</button>
          <button on:click={() => filterArea('Norwegian Sea')}>Norwegian Sea</button>
          <button on:click={() => filterArea('Gulf of Alaska')}>Gulf of Alaska</button>
        </div>
        <div class="journal-grid">
          {#each filteredSpecies as species}
            <SpeciesCard {species} />
          {/each}
        </div>
      </div>
    </div>
  </div>
{:else}
  <p>Please create or select a session to view your journal.</p>
{/if}

  <style>
    .sorting-chips {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    padding-bottom: 4px;
    height: auto;
    }

    .sorting-chips button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 20px;
    background: linear-gradient(135deg, #76c7c0, #007bff);
    color: #fff;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    }

    .sorting-chips button:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    }

    .sorting-chips button:active {
    background: linear-gradient(135deg, #007bff, #76c7c0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  
  .content {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
    background-image: url("/public/img/background_static/Journal_Hintergrund.png");
    background-size: cover;
    background-position-y: 50%;
  }

  .progress-panel,
  .journal-panel {   
    padding: 1rem;
    cursor: pointer;
    border-radius: 16px;
    h2 {
      margin: 0;
      color: #e0e0e0;
        }
      }

      .search-bar {
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
      }

      .search-bar input {
        width: 100%;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 30px;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
        outline: none;
      }

      .search-bar input:focus {
        border-color: #76c7c0;
        box-shadow: 0 0 5px rgba(118, 199, 192, 0.5);
      }

  .progress-panel {
    grid-column: 1 / span 3;
    grid-row: span 2;
  }

  .journal-panel {
    grid-column: 4 / span 8;
    grid-row: span 2;
    height: 80vh;
  }

  .journal-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    padding-bottom: 2rem;
    overflow-y: auto;
  }

  .species-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .species-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .species-card img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 4px 4px 0 0;
  }

  .species-card h3 {
    margin: 0.5rem 0;
    font-size: 1.2rem;
    text-align: left;
  }

  .depth,
  .description,
  .discovered {
    font-size: 0.9rem;
    margin: 0.2rem 0;
    text-align: left;
  }

  .discovered {
    color: #666;
    font-style: italic;
  }

  .progress-bar-container {
    position: relative;
    background-color: #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    height: 20px;
    margin-top: 1rem;
  }

  .progress-bar {
    height: 100%;
    background-color: #76c7c0;
    transition: width 0.3s ease;
  }

  .progress-bar-container span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.9rem;
    color: #333;
  }
  .catch-overview {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }

  .catch-history {
    margin-top: 1rem;
  }
</style>
