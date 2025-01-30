<script>
  import { createEventDispatcher, onMount } from "svelte";

  export let isOpen = false;
  export let fishData = null;
  export let depthData = null; // Accept depthData as a prop

  const dispatch = createEventDispatcher();
  let wikiData = null;

  async function tryWikiSearch(searchTerm) {
    const query = encodeURIComponent(searchTerm.replace(/\s+/g, "_"));
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`;
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    }
    return null;
  }

  async function fetchWikiData(scientificName) {
    try {
      // Try full scientific name first
      let data = await tryWikiSearch(scientificName);
      
      // If not found, try just the genus (first word)
      if (!data) {
        const genus = scientificName.split(' ')[0];
        console.log(`Falling back to genus search: ${genus}`);
        data = await tryWikiSearch(genus);
      }

      if (data) {
        localStorage.setItem(`wikiData_${scientificName}`, JSON.stringify(data));
      }
      return data;
    } catch (e) {
      console.error("Wiki fetch error:", e);
      return null;
    }
  }

  $: if (isOpen && fishData?.scientificName) {
    const cachedData = localStorage.getItem(`wikiData_${fishData.scientificName}`);
    if (cachedData) {
      wikiData = JSON.parse(cachedData);
    } else {
      fetchWikiData(fishData.scientificName).then(data => {
        wikiData = data;
      });
    }
  }

  function closeModal() {
    dispatch("close");
    wikiData = null;
  }
</script>

{#if isOpen}
  <div class="backdrop" on:click|self={closeModal}>
    <div class="modal">
      <button on:click={closeModal}>X</button>
      {#if fishData}
        <h2>{fishData.scientificName}</h2>
        <p>Depth: {fishData.depth}</p>
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
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
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
  .modal button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
</style>
