<script>
    import SeaPlot from "../components/Seaplot.svelte";
    import Researchvessel from "../components/Researchvessel.svelte";
    import { onMount } from "svelte";

    // Create a 16x16 grid of sea plots with unique IDs and names
    const seaPlots = Array.from({ length: 16 * 16 }, (_, index) => ({
        id: index,
        name: `Plot ${index + 1}`,
    }));

    // Variable to store the current position of the research vessel
    let vesselPosition = null;

    // Function to handle the drop event when a draggable element is dropped onto a sea plot
    function handleDrop(event) {
        event.preventDefault();
        const id = event.dataTransfer.getData('text/plain');
        const draggableElement = document.getElementById(id);
        const dropzone = event.target.closest(".sea-plot");
        if (dropzone && draggableElement) {
            dropzone.appendChild(draggableElement);
            vesselPosition = dropzone.dataset.plotId;
            console.log(`Vessel dropped in plot ID: ${vesselPosition}`);
        } else {
            console.log('Drop failed');
        }
    }

    // Function to handle the drag over event to allow dropping
    function handleDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        console.log('Drag over event');
    }

    // Add event listeners for drag and drop functionality when the component is mounted
    onMount(() => {
        const seaPlots = document.querySelectorAll(".sea-plot");
        seaPlots.forEach(plot => {
            plot.addEventListener("dragover", handleDragOver);
            plot.addEventListener("drop", handleDrop);
        });
        console.log('Event listeners added to sea plots');
    });
</script>

<div class="content">
    <div class="sea">
        <div class="sea-content">
            {#each seaPlots as plot}
                <SeaPlot id={plot.id} class="sea-plot" data-plot-id={plot.id} style="background-color: {vesselPosition == plot.id ? '#ffcccb' : '#f0f0f0'};">
                    {#if vesselPosition == plot.id}
                        <Researchvessel />
                    {/if}
                </SeaPlot>
            {/each}
        </div>
    </div>
    <div class="shipview-panel">
        <div class="ship-content">
            <div class="mission">
                <h2>Mission</h2>
            </div>
            <div class="marine-area">
                <h2>Marine Area</h2>
            </div>
            {#if vesselPosition === null}
                <div class="vessel-container">
                    <Researchvessel />
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .content {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 1rem;
        padding: 1rem;
    }

    .shipview-panel, .sea {
        background-color: #f0f0f0;
        padding: 1rem;
        border: 1px solid #ddd;
        cursor: pointer;
        border-radius: 16px;
    }

    .sea {
        grid-column: 1 / span 6;
        grid-row: 1 / span 2;
        position: relative;
    }

    .sea-content {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(16, 1fr);
        grid-template-rows: repeat(16, 1fr);
        gap: 4px;
    }

    .shipview-panel {
        grid-column: 7 / span 2;
        grid-row: span 2;
        display: flex;
        flex-direction: column;
    }

    .ship-content {
        flex-direction: column;
        gap: 1rem;
        flex-grow: 1;
    }

    .mission, .marine-area, .vessel-container {
        background-color: #fefefe;
        padding: 20px;
        margin: 0;
        display: flex;
        justify-content: center;
        flex-grow: 1;
        border-radius: 12px;
    }

    .vessel-container {
        margin-top: 1rem;
        position: relative;
    }

    .marine-area {
        margin-top: 1rem;
    }

    .mission {
        margin-bottom: 1rem;
    }
</style>