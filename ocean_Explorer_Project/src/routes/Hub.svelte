<!-- @format -->
<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { push } from "svelte-spa-router";
  import PlayerPanel from "../components/PlayerPanel.svelte";

  let username = writable("");

  onMount(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      username.set(savedUsername);
    }
  });

  function saveUsername() {
    username.update((value) => {
      localStorage.setItem("username", value);
      return value;
    });
  }
</script>

<div class="content">
  <div class="quests">
    <h1>Ahoi Captian!</h1>
    <p class="w-t">
      Welcome aboard! Embark on an exciting journey across the world's oceans, where you’ll explore diverse marine life as the captain of your own research vessel. Navigate through different seas,
      study fascinating fish species, and uncover the mysteries of the deep.
    </p>
  </div>
  <div class="waters">
    <div class="username-input">
      <label for="username"> Before we set sail, we need to know your name, Captain. <br /> Enter your name below and prepare for an adventure on the high seas! 🌊🚢🐠 </label>
      <input type="text" id="username" bind:value={$username} on:change={saveUsername} />
    </div>
  </div>
  <div class="logbook">
<PlayerPanel />
<button on:click={() => push('/missions')}>Go to Journal</button>
  </div>
</div>

<style>
  .content {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
    background-image: url("/public/img/background_static/Research_Hintergrund.png");
    background-size: cover;
    background-position-y: 50%;
  }

  .quests,
  .waters,
  .logbook {
    padding: 1rem;
    border-radius: 16px;
  }
  .quests {
    grid-column: 2 / span 2;
    grid-row: span 2;
    h1 {
      font-size: 5rem;
      color: #fa9c1b;
      margin-top: 5rem;
      margin-bottom: 1rem;
    }
    .w-t {
      font-size: 2rem;
      color: #fa9c1b;
      margin-bottom: 1rem;
      margin-top: 1rem;
    }
  }

  .waters {
    grid-column: 4 / span 4;
  }

  .username-input {
    label {
      font-size: 1.5rem;
      color: #fa9c1b;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  }

  .logbook {
    grid-column: 4 / span 4;
  }
</style>
