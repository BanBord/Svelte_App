<script>
  import { push } from "svelte-spa-router";
  import Router from "svelte-spa-router";
  import { activeMission } from './stores/missionStore.js';
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
      <button type="button" on:click={() => push("/")} aria-label="Home" class="home-button">
        <img src="/public/logo/oe_logo_at_1x.svg" alt="Ocean Explorer Logo" class="logo-image" />
      </button>
    </div>
    <nav>
      <button class="nav-button" on:click={() => push("/missions")}>missions</button>
      <button class="nav-button" on:click={() => push("/research")}>research</button>
      <button class="nav-button" on:click={() => push("/journal")}>log</button>
      <!-- <button class="nav-button" on:click={() => push("/API")}>API</button> -->
    </nav>
  </header>

  <!-- The Router renders the corresponding pages here -->
  <div class="content">
    <Router {routes} />
  </div>

  <footer>
    {#if currentMission}
    <span class="active-mission">Aktive Mission: {currentMission}</span>
  {/if}
    <p>© 2025 Made by Bruno Gross at HfG Schweabisch Gmuend</p>
  </footer>
</main>
