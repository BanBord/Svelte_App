<!-- @format -->
<script>
  export let message = "";
  export let type = "info"; // 'info', 'success', 'error'

  let isVisible = true;

  setTimeout(() => {
    isVisible = false;
  }, 3000);
</script>
{#if isVisible}
  <div class="notification {type}">
    {message}
  </div>
{/if}
<style>
  .notification {
    position: fixed;
    top: 1rem;
    right: 1rem;
    padding: 1rem;
    border-radius: 4px;
    color: white;
    z-index: 1000;
  }
  .notification.info {
    background-color: #007bff;
  }
  .notification.success {
    background-color: #28a745;
  }
  .notification.error {
    background-color: #dc3545;
  }
</style>
