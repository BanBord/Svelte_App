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
  <div class="intro">
    <h1>Ahoi Captian!</h1>
    <p class="w-t">
      Welcome aboard! Embark on an exciting journey across the world's oceans, where you’ll explore diverse marine life as the captain of your own research vessel. Navigate through different seas,
      study fascinating fish species, and uncover the mysteries of the deep.
    </p>
  </div>
  <div class="waters"></div>
  <div class="logbook">
    <PlayerPanel />
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

  .intro {
    grid-column: 1 / span 2;
    grid-row: span 2;
    h1 {
      font-size: 5rem;
      color: #fa9c1b;
      margin-top: 5rem;
      margin-bottom: 1rem;
      margin-left: 1rem;
    }
    .w-t {
      font-size: 2rem;
      color: #fa9c1b;
      margin-bottom: 1rem;
      margin-top: 1rem;
      margin-left: 1rem;
    }
  }

  .waters {
    grid-column: 4 / span 4;
  }

  .logbook {
    grid-column: 7 / span 2;
    grid-row: span 2;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
  }
</style>
