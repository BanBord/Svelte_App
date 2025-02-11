<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { activeSession } from "../stores/playerStore"; // <-- New import

  export let isOpen = false;
  export let fishData = {
    scientificName: '',
    depth: 0
  };

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
      let data = await tryWikiSearch(scientificName);
      if (!data) {
        const genus = scientificName.split(' ')[0];
        console.log(`Falling back to genus search: ${genus}`);
        data = await tryWikiSearch(genus);
      }
      // If data is found, check for common name
      if (data && data.titles && data.titles.normalized) {
        data.commonName = data.titles.normalized;
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

  // Updated function: save discoveries to activeSession's journal
  function saveToJournal(wikiData, fishData) {
    activeSession.update(session => {
      if (session) {
        // Prevent duplicate entries in the journal
        if (!session.journal.some(s => s.scientificName === fishData.scientificName)) {
          session.journal.push({ 
            ...wikiData,
            scientificName: fishData.scientificName,
            depth: fishData.depth,
            discoveredAt: new Date().toISOString()
          });
        }
      }
      return session;
    });
  }

  $: if (isOpen && fishData?.scientificName) {
    const cachedData = localStorage.getItem(`wikiData_${fishData.scientificName}`);
    if (cachedData) {
      wikiData = JSON.parse(cachedData);
      saveToJournal(wikiData, fishData);
    } else {
      fetchWikiData(fishData.scientificName).then(data => {
        wikiData = data;
        saveToJournal(wikiData, fishData);
      });
    }
  }

  function closeModal() {
    dispatch("close");
    wikiData = null;
  }

  // Placeholder image URL
  const placeholderImage = '/public/img/placeholder_fish.png';
</script>

{#if isOpen}
  <div class="modal-overlay" on:click={closeModal}>
    <div class="modal-content" on:click|stopPropagation>
      <button class="close-button" on:click={closeModal} aria-label="Close">&times;</button>
      {#if fishData}
        <h2>{fishData.scientificName}</h2>
        <p>Depth: {fishData.depth} meters</p>
        {#if wikiData}
          <h3>{wikiData.title}</h3>
          {#if wikiData.thumbnail}
            <img src={wikiData.thumbnail.source} alt={wikiData.title} />
            {:else}
            <img src="/public/img/platzhalter_bild.png" alt="Placeholder image" />
          {/if}
          <p>{wikiData.description}</p>
          <p>{wikiData.extract}</p>
        {/if}
      {/if}
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background: #f7f7f7;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
    position: relative;
    text-align: center;
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #333;
  }

  .fish-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  h2 {
    color: #2196f3;
    margin-bottom: 1rem;
  }

  p {
    color: #333;
    margin-bottom: 1rem;
  }

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