<script>
  import { onMount } from 'svelte';
  import Fish from './Fish.svelte';
  import { createEventDispatcher } from 'svelte';

  export let id;

  const dispatch = createEventDispatcher();
  let fishData = [];

  // async function fetchFishData() {
  //   const response = await fetch(`https://api.obis.org/v3/occurrence?geometry=${id}`);
  //   const data = await response.json();
  //   fishData = data.results.map(fish => ({
  //     species: fish.species,
  //     count: fish.individualCount
  //   }));
  // }

  function handleDrop(event) {
    event.preventDefault();
    const vesselId = event.dataTransfer.getData('text/plain');
    console.log(`SeaPlot ${id} received drop event with vesselId: ${vesselId}`);
    dispatch('drop', { plotId: id, vesselId });
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  function getRandomBlueColor() {
    const blueShades = ["#0000FF", "#0000CD", "#00008B", "#000080", "#191970", "#4169E1", "#4682B4", "#5F9EA0", "#6495ED", "#87CEEB"];
    const randomIndex = Math.floor(Math.random() * blueShades.length);
    return blueShades[randomIndex];
  }

  const randomBlueColor = getRandomBlueColor();

  onMount(() => {
    fetchFishData();
  });
</script>

<div
  class="random-blue-background sea-plot"
  id={id}
  data-plot-id={id}
  on:drop={handleDrop}
  on:dragover={handleDragOver}
  style="background-color: {randomBlueColor};"
>
  {#each fishData as fish}
    <Fish {fishData} />
  {/each}
  <slot></slot>
</div>

<style>
  .random-blue-background {
    width: 100%;
    height: 100%;
    /* background-color will be set inline */
  }
  .sea-plot {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>