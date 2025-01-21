<!-- <script>
  import { onMount } from 'svelte';

  // Variablen für die Ergebnisse
  let species = {
    balticSea: [],
    gulfOfAlaska: [],
    andamanSea: []
  };

  // AREA IDs für die Meeresgebiete
  const areaIds = {
    balticSea: 95, // Deutsche Ostsee
    gulfOfAlaska: 265, // Golf von Alaska
    andamanSea: 34274 // Andaman-See
  };

  const taxonClass = 'Teleostei'; // Klasse der Fische

  // Daten beim Mount der Komponente abrufen
  onMount(async () => {
    await fetchSpecies('balticSea');
    await fetchSpecies('gulfOfAlaska');
    await fetchSpecies('andamanSea');
  });

  // Funktion zum Abrufen der Spezies
  async function fetchSpecies(region) {
    const response = await fetch(`https://api.obis.org/v3/occurrence?areaid=${areaIds[region]}&taxon_class=${taxonClass}`);
    const data = await response.json();
    species[region] = data.results.map(item => item.scientificName);
  }
</script>

<style>
  h2 {
    margin-top: 2rem;
  }
  ul {
    margin-left: 1rem;
  }
</style>

<h1>Fischspezies in verschiedenen Meeresgebieten</h1>

<h2>Deutsche Ostsee</h2>
<h3>Alle Fischarten</h3>
<ul>
  {#each species.balticSea as fish}
    <li>{fish}</li>
  {/each}
</ul>

<h2>Golf von Alaska</h2>
<h3>Alle Fischarten</h3>
<ul>
  {#each species.gulfOfAlaska as fish}
    <li>{fish}</li>
  {/each}
</ul>

<h2>Andaman-See</h2>
<h3>Alle Fischarten</h3>
<ul>
  {#each species.andamanSea as fish}
    <li>{fish}</li>
  {/each}
</ul> -->
