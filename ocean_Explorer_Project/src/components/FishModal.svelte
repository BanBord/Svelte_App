<!-- @format -->
<script>
  export let isOpen = false;
  export let data = null;

  const closeModal = () => {
    isOpen = false;
  };
</script>

{#if isOpen}
  <div class="modal-backdrop">
    <div class="modal">
      <button on:click={closeModal} class="close-button">×</button>
      {#if data}
        <h2>{data.title}</h2>
        <p>{data.description}</p>
      {/if}
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
</style>
