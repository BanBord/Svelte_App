<script>
    import { push } from 'svelte-spa-router';
</script>

<div class="content">
    <div class="quests" on:click={() => push('/missions')}>Aufträge</div>
    <div class="waters">
        <h1>Ahoi Captian!</h1>
        <p class="w-t">Welcome to Ocean Explorer!</p>
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
        background-image: url('/public/img/background_static/Research_Hintergrund.png');
        background-size: cover;
        background-position-y: 50%; 
        
    }

    h1 {
        font-size: 5rem;
        color: #f7f7f7;

    }

    .quests, .waters, .logbook {
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

    .w-t {
        font-size: 2rem;
        color: #f7f7f7;
    }

    .logbook {
        grid-column: 4 / span 4;
    }

</style>
