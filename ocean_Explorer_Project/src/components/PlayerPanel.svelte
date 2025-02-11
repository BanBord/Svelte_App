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
  <p class="introduction">Welcome to the Player Panel! Create a session to start your adventure.</p>
  
  <h2>Player Sessions</h2>
  <div class="create-session">
    <input type="text" placeholder="Enter Username" bind:value={username} />
    <button on:click={handleCreate}>Create Session</button>
  </div>
  <ul>
    {#each Object.values(sessions) as session}
      <li class:active={session.id === $activeSession?.id}>
        <span>{session.username}</span>
        <button on:click={() => handleSelect(session.id)}>Select</button>
        <button on:click={() => handleDelete(session.id)}>Delete</button>
      </li>
    {/each}
  </ul>
  {#if $activeSession}
    <p class="active-session">Active Session: {$activeSession.username}</p>
    <a href="#/missions" class="missions-link">Go to Missions</a>
  {/if}
</div>

<style>
  .player-panel {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 16px;
    padding: 1rem;
    max-width: 350px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    font-family: sans-serif;
  }

  .introduction {
    margin-bottom: 1rem;
    color: #fff;
    font-style: italic;
  }

  .player-panel h2 {
    margin-top: 0;
    color: #fff;
  }

  .create-session {
    margin-bottom: 1rem;
    display: flex;
    gap: 0.5rem;
  }

  .create-session input {
    flex-grow: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.5);
  }

  .create-session button {
    padding: 0.5rem 1rem;
    border: none;
    background: #6c757d;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }

  .create-session button:hover {
    background: #5a6268;
  }

  .player-panel ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .player-panel ul li {
    margin: 0.5rem 0;
    padding: 0.5rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.25);
    transition: background-color 0.3s ease;
  }

  .player-panel ul li.active {
    background-color: rgba(226, 240, 217, 0.5);
    border-color: #a3c293;
  }

  .player-panel ul li span {
    flex-grow: 1;
    color: #fff;
  }

  .player-panel ul li button {
    padding: 0.25rem 0.75rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: #007bff;
    color: white;
    font-size: 0.875rem;
  }

  .player-panel ul li button:hover {
    background: #0069d9;
  }

  .active-session {
    margin-top: 1rem;
    font-style: italic;
    color: #fff;
  }

  .missions-link {
    display: inline-block;
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background: #28a745;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .missions-link:hover {
    background: #218838;
  }
</style>
