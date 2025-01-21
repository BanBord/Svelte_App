<script>
    const fetchBathymetryData = async () => {
      const response = await fetch('https://www.ncei.noaa.gov/access/services/data/v1?dataset=global-bathymetry&bbox=55.0,10.0,54.0,14.0&dataTypes=depth&format=json&includeAttributes=true&units=metric');
      if (!response.ok) {
        throw new Error('Fehler beim Abrufen der Daten');
      }
      return await response.json();
    };
  
    let bathymetryPromise = fetchBathymetryData();

  </script>
  
  {#await bathymetryPromise}
    <p>Lade bathymetrische Daten...</p>
  {:then data}
    <pre>{JSON.stringify(data, null, 2)}</pre>
{:catch error}
  <p>Fehler: {error.message}</p>
{/await} 