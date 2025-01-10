<script>
    import { push } from 'svelte-spa-router';
</script>

<div class="content">
    <div class="quests" on:click={() => push('/missions')}>Aufträge</div>
    <div class="waters" on:click={() => push('/research')}>
        <div class="waters-content">
            <div style="background-color: #3498db; padding: 20px; margin: auto; width: 80%; height: 200px; display: flex; align-items: center; justify-content: center;">
                Map Preview
            </div>
        </div>
        Offene Gewässer
    </div>
    <div class="logbook" on:click={() => push('/journal')}>Logbuch</div>
</div>

<style>
    .content {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 1rem;
        padding: 1rem;
    }

    .quests, .waters, .logbook {
        background-color: #f0f0f0;
        padding: 1rem;
        border: 1px solid #ddd;
        cursor: pointer;
        border-radius: 16px;
    }
    .quests {
        grid-column: 2 / span 2;
        grid-row: span 2;
    }

    .waters {
        grid-column: 4 / span 4;
    }

    .logbook {
        grid-column: 4 / span 4;
    }

    .waters-content {
        margin-bottom: 1rem;
    }
</style>
