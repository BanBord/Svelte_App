<script>
  export let isOpen = false;
  export let fishData = null;

  function closeModal() {
    isOpen = false;
  }
</script>

{#if isOpen}
  <div class="modal-overlay" on:click={closeModal}>
    <div class="modal-content" on:click|stopPropagation>
      <button class="close-button" on:click={closeModal}>X</button>
      <h2>Fish Data</h2>
      {#if fishData}
        <ul>
          <li><strong>Name:</strong> {fishData.name}</li>
          <li><strong>Depth:</strong> {fishData.depth}</li>
          <li><strong>Species:</strong> {fishData.species}</li>
          <!-- Add more fish data fields as needed -->
        </ul>
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
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    position: relative;
  }
  .close-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
</style>