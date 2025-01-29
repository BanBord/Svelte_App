<script>
  import { createEventDispatcher, onMount } from 'svelte';

  export let isOpen = false;
  export let fishData = null;

  const dispatch = createEventDispatcher();
  let wikiData = null;

  // Fetch from Wikimedia using page summary endpoint
  async function fetchWikiData(scientificName) {
    try {
      // Example: "Chromis_notata"
      const query = encodeURIComponent(scientificName.replace(/\s+/g, '_'));
      const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`;
      const response = await fetch(url);
      if (!response.ok) return null;
      const data = await response.json();
      localStorage.setItem(`wikiData_${scientificName}`, JSON.stringify(data));
      return data;
    } catch (e) {
      console.error("Wiki fetch error:", e);
      return null;
    }
  }

  // On component mount/load, if we have a scientific name, fetch wiki data
  onMount(async () => {
    if (fishData && fishData.scientificName) {
      wikiData = await fetchWikiData(fishData.scientificName);
    }
  });

  function closeModal() {
    dispatch('close');
  }
</script>

{#if isOpen}
  <div class="backdrop" on:click|self={closeModal}>
    <div class="modal">
      <button on:click={closeModal}>X</button>
      {#if fishData}
        <h2>{fishData.scientificName}</h2>
        <!-- Display any OBIS data -->
        <p>Depth: {fishData.depth}</p>
        <!-- Show fetched Wikimedia data if available -->
        {#if wikiData}
          <h3>{wikiData.title}</h3>
          {#if wikiData.thumbnail}
            <img src={wikiData.thumbnail.source} alt={wikiData.title} />
          {/if}
          <p>{wikiData.description}</p>
          <p>{wikiData.extract}</p>
        {/if}
      {/if}
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal {
    background: #fff;
    padding: 1rem;
    border-radius: 8px;
    width: 400px;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
  }
</style>