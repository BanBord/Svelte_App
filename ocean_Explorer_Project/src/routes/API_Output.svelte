<!--
    API_Output.svelte

    This component fetches and displays fish occurrence data from the OBIS API based on the selected sea area.
    Users can select an area from a dropdown menu, which triggers a data fetch for that specific area.
    The component handles loading states and error messages, and displays the scientific name, depth,
    and geographic coordinates of each fish species retrieved.
-->
<script>
    import { onMount } from "svelte";
    
    let fishData = [];
    let loading = false;
    let error = null;
  
    // Verfügbare Seegebiete
    const areas = [
      { id: 40047, name: "East China Sea" },
      { id: 32353, name: "Norwegian Sea" },
      { id: 40002, name: "Gulf of Alaska" }
    ];
  
    let selectedArea = areas[0].id; // Standard: East China Sea
  
    async function fetchFishData(areaId) {
      try {
        loading = true;
        error = null;
  
        const response = await fetch(`https://api.obis.org/v3/occurrence?taxonid=293496,151737&areaid=${areaId}&size=50`);
  
        if (!response.ok) {
          throw new Error(`Fehler: ${response.status}`);
        }
  
        const data = await response.json();
  
        fishData = data.results.filter(fish => 
          fish.scientificName && 
          fish.depth && 
          fish.decimalLatitude && 
          fish.decimalLongitude 
        );
  
      } catch (err) {
        error = `Fehler beim Abrufen der Daten: ${err.message}`;
      } finally {
        loading = false;
      }
    }
  
    // Abrufen der Daten beim Mounten der Komponente
    onMount(() => {
      fetchFishData(selectedArea);
    });
  
    // Wechsel des Gebiets
    function handleAreaChange(event) {
      selectedArea = +event.target.value; // Gebiet ändern
      fetchFishData(selectedArea);
    }
  </script>
  
  <style>
    .loading { 
      font-size: 1.2em; 
      color: #0070f3; 
      background-color: #e0f7ff; 
      padding: 1em; 
      border-radius: 4px; 
      text-align: center; 
    }
    .error { 
      color: red; 
      font-weight: bold; 
      background-color: #ffe0e0; 
      padding: 1em; 
      border-radius: 4px; 
      text-align: center; 
    }
    .fish-card {
      border: 1px solid #ddd;
      padding: 1em;
      margin: 0.5em 0;
      border-radius: 4px;
      background-color: #f9f9f9;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    select {
      margin-bottom: 1em;
      padding: 0.5em;
      font-size: 1em;
    }
  </style>
  
  <!-- Template -->
  <div>
    <h1>Fischdaten nach Gebiet</h1>
    <label for="area-select">Wähle ein Gebiet:</label>
    <select id="area-select" on:change={handleAreaChange}>
      {#each areas as area}
        <option value={area.id} selected={area.id === selectedArea}>{area.name}</option>
      {/each}
    </select>
  </div>
  
  {#if loading}
    <div class="loading">Daten werden geladen...</div>
  {:else if error}
    <div class="error">{error}</div>
  {:else}
    <div>
      <h2>Fischdaten für Gebiet: {areas.find(a => a.id === selectedArea).name}</h2>
      {#if fishData.length > 0}
        {#each fishData as fish}
          <div class="fish-card">
            <h3>{fish.scientificName}</h3>
            <p>Tiefe: {fish.depth} m</p>
            <p>Position: {fish.decimalLatitude}, {fish.decimalLongitude}</p>
          </div>
        {/each}
      {:else}
        <div class="error">Keine Daten gefunden.</div>
      {/if}
    </div>
  {/if}
  