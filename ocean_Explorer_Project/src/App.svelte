<script>
  import { push } from "svelte-spa-router";
  import Router from "svelte-spa-router";
  import { activeMission } from './stores/store_mission.js';
  import { onMount } from 'svelte';

  // Import the subpages
  import Hub from "./routes/Hub.svelte";
  import Missions from "./routes/Missions.svelte";
  import Research from "./routes/Research.svelte";
  import Journal from "./routes/Journal.svelte";
  import API_Output from "./routes/API_Output.svelte";

  // Define the routes
  const routes = {
    "/": Hub,
    "/missions": Missions,
    "/research": Research,
    "/journal": Journal,
    "/API": API_Output,
  };

  let currentMission = null;

  onMount(() => {
    const unsubscribe = activeMission.subscribe(value => {
      currentMission = value;
    });

    return () => {
      unsubscribe();
    };
  });
</script>

<main>
  <header>
    <div class="logo">
      <a on:click={() => push("/")}>
        <img src="/path-to-your-logo.png" alt="Ocean Explorer Logo" />
      </a>
    </div>
    <nav>
      {#if currentMission}
      <span class="active-mission">Aktive Mission: {currentMission}</span>
    {/if}
      <button class="nav-button" on:click={() => push("/missions")}>Missionen</button>
      <button class="nav-button" on:click={() => push("/research")}>Forschung</button>
      <button class="nav-button" on:click={() => push("/journal")}>Logbuch</button>
      <button class="nav-button" on:click={() => push("/API")}>API</button>
    </nav>
  </header>

  <!-- The Router renders the corresponding pages here -->
  <div class="content">
    <Router {routes} />
  </div>

  <footer>
    <p>© 2025 Ocean Research Simulator</p>
  </footer>
</main>

<style>
  .active-mission {
    margin-left: 1rem;
    font-weight: bold;
    color: #007BFF;
  }
</style>