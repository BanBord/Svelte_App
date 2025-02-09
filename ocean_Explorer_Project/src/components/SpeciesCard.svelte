<!-- @format -->
<script>
  export let species;
</script>
<div class="species-card">
  {#if species.thumbnail}
  <img src={species.thumbnail.source} alt={species.title || species.scientificName} class="species-image"/>
  {:else}
    <img src="/public/img/platzhalter_bild.png" alt="Placeholder image" />
  {/if}
  <div class="species-info">
    <h3>{species.scientificName}</h3>
    <p class="depth">Depth: {species.depth}m</p>
    <p class="description">{species.description}</p>
    <p class="discovered">Discovered: {new Date(species.discoveredAt).toLocaleDateString()}</p>
  </div>
</div>
<style>
  .species-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .species-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100%;
    object-fit: cover;
  }

  .species-info {
    padding: 1rem;
    text-align: center;
  }

  .species-info h3 {
    margin: 0.5rem 0;
    color: #007bff;
  }

  .species-info p {
    margin: 0;
    color: #333;
  }
</style>
