<script>
    import SeaPlot from "../components/Seaplot.svelte";

    // Create a 16x16 grid of sea plots
    const seaPlots = Array.from({ length: 16 * 16 }).map((_, index) => ({
        // name: `Sea Plot ${index + 1}`,
        // fishes: Math.floor(Math.random() * 10),
        // depth: Math.floor(Math.random() * 1000),
        // temperature: Math.floor(Math.random() * 30),
    }));
</script>

<div class="content">
    <div class="sea">
        <div class="sea-content">
            {#each seaPlots as plot}
                <SeaPlot {plot} />
            {/each}
        </div>
    </div>
    <div class="shipview">
        <div class="ship-content">
            <div class="mission">
                <h2>Mission</h2>
            </div>
            <div class="marine-area">
                <h2>Marine Area</h2>
            </div>
            <div class="vessel">
                <h2>Vessel</h2>
            </div>
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

    .shipview, .sea {
        background-color: #f0f0f0;
        padding: 1rem;
        border: 1px solid #ddd;
        cursor: pointer;
        border-radius: 16px;
    }

    .sea {
        grid-column: 1 / span 6;
        grid-row: 1 / span 2;
    }

    .sea-content {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(16, 1fr);
        grid-template-rows: repeat(16, 1fr);
        gap: 4px;
    }

    .shipview {
        grid-column: 7 / span 2;
        grid-row: span 2;
    }

    .ship-content {
        display: flex;
        margin: auto;
        flex-direction: column;
    }

.mission, .marine-area, .vessel {
    background-color: #fefefe;
    padding: 20px;
    margin: 0;
    display: flex;
    justify-content: first; 
}

.vessel {
    margin-top: 1rem;
}

.marine-area {
    margin-top: 1rem;
}

.mission {
    margin-bottom: 1rem;
}

</style>