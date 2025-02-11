<!-- @format -->
<script>
  import { playerSessions, activeSession, createSession, deleteSession, selectSession } from "../stores/playerStore";

  let username = "";
  let sessions = {};
  $: sessions = $playerSessions;

  function handleCreate() {
    if (username.trim()) {
      createSession(username.trim());
      username = "";
    }
  }

  function handleSelect(id) {
    selectSession(id);
  }

  function handleDelete(id) {
    deleteSession(id);
  }
</script>
<div class="player-panel">
  <h2>Player Sessions</h2>
  <div class="create-session">
    <input type="text" placeholder="Enter Username" bind:value={username} />
    <button on:click={handleCreate}>Create Session</button>
  </div>
  <ul>
    {#each Object.values(sessions) as session}
      <li class:active={session.id === $activeSession?.id}>
        <span>{session.username} (ID: {session.id})</span>
        <button on:click={() => handleSelect(session.id)}>Select</button>
        <button on:click={() => handleDelete(session.id)}>Delete</button>
      </li>
    {/each}
  </ul>
  {#if $activeSession}
    <p>Active Session: {$activeSession.username} (ID: {$activeSession.id})</p>
  {/if}
</div>
<style>
  .player-panel ul {
    list-style: none;
    padding: 0;
  }

  .player-panel ul li {
    margin: 0.5rem 0;
    padding: 0.5rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  .player-panel ul li.active {
    background-color: #d3f9d8;
    border-color: #28a745;
  }
</style>
