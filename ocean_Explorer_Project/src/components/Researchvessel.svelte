<script>
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.effectAllowed = 'move';
    dispatch('dragstart', { id: event.target.id });
}
</script>

<div
    id="researchvessel"
    draggable="true"
    on:dragstart={handleDragStart}
    class="draggable"
    role="button"
    aria-label="Research Vessel"
    tabindex="0"
>
</div>

<style>
#researchvessel {
    cursor: grab;
    width: 20px;
    height: 20px;
    background-color: #626262;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
}

#researchvessel:active {
    cursor: grabbing;
}
</style>