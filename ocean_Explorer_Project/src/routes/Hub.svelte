<script>
    import { goto } from 'svelte-spa-router';
</script>

<h1>Willkommen im Ocean Research Hub</h1>
<button on:click={() => goto('/missions')}>Zu den Missionen</button>
<button on:click={() => goto('/research')}>Forschungsspiel starten</button>
<button on:click={() => goto('/journal')}>Logbuch öffnen</button>
