<script>
    import { discoveredSpecies } from '../stores/journalStore';
    let searchQuery = '';
  
    $: filteredSpecies = $discoveredSpecies.filter(species => 
      species.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  </script>
  
  <div class="content">
    <div class="progress-panel">
      <div class="progress-content">
        <h2>Progress</h2>
        <div class="progress-bar" style="width: {($discoveredSpecies.length / 20) * 100}%"></div>
      </div>
      <div class="catch-history">
        <h2>Catch History</h2>
        <div class="catch-overview"></div>
      </div>
    </div>
    <div class="journal-panel">
      <div class="search-and-journal">
        <div class="search-bar">
          <input 
            type="text" 
            placeholder="Search species..." 
            bind:value={searchQuery}
          >
        </div>
        <div class="journal-grid">
          {#each filteredSpecies as species}
            <div class="species-card">
              {#if species.thumbnail}
                <img src={species.thumbnail.source} alt={species.title} />
              {/if}
              <h3>{species.scientificName}</h3>
              <p class="depth">Depth: {species.depth}m</p>
              <p class="description">{species.description}</p>
              <p class="discovered">Discovered: {new Date(species.discoveredAt).toLocaleDateString()}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
  
  <style>
    .content {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 1rem;
      padding: 1rem;
    }
  
    .progress-panel, .journal-panel {
      background-color: #f0f0f0;
      padding: 1rem;
      border: 1px solid #ddd;
      cursor: pointer;
      border-radius: 16px;
    }
  
    .search-bar {
      margin-bottom: 1rem;
    }
  
    .journal-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
  
    .species-card {
      background: white;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    .species-card img {
      width: 100%;
      height: 100px;
      object-fit: cover;
      border-radius: 4px;
    }
  
    .species-card h3 {
      margin: 0.5rem 0;
      font-size: 1.2rem;
      text-align: center;
    }
  
    .depth, .description, .discovered {
      font-size: 0.9rem;
      margin: 0.2rem 0;
      text-align: center;
    }
  
    .discovered {
      color: #666;
      font-style: italic;
    }
  </style>