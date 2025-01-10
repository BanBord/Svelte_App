<!-- @format -->
<script>
  import { push } from "svelte-spa-router";
  import Router from "svelte-spa-router";

  // Import the subpages
  import Hub from "./routes/Hub.svelte";
  import Missions from "./routes/Missions.svelte";
  import Research from "./routes/Research.svelte";
  import Journal from "./routes/Journal.svelte";

  // Define the routes
  const routes = {
    "/": Hub,
    "/missions": Missions,
    "/research": Research,
    "/journal": Journal,
  };
</script>

<main>
  <header>
    <div class="logo">
      <a on:click={() => push("/")}>
        <img src="/path-to-your-logo.png" alt="Ocean Explorer Logo" />
      </a>
    </div>
    <nav>
      <button class="nav-button" on:click={() => push("/missions")}>Missionen</button>
      <button class="nav-button" on:click={() => push("/research")}>Forschung</button>
      <button class="nav-button" on:click={() => push("/journal")}>Logbuch</button>
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
</style>
