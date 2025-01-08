<script>
    import { wrap } from 'svelte-spa-router/wrap';
    import Router from 'svelte-spa-router';

    // Importiere die Unterseiten

    import Hub from './routes/Hub.svelte';
    import Missions from './routes/Missions.svelte';
    import Research from './routes/Research.svelte';
    import Journal from './routes/Journal.svelte';

    // Definiere die Routen
    const routes = {
        '/': wrap(() => import('./routes/Hub.svelte')),
    '/missions': wrap(() => import('./routes/Missions.svelte')),
    '/research': wrap(() => import('./routes/Research.svelte')),
    '/journal': wrap(() => import('./routes/Journal.svelte')),

    };
</script>

<main>
    <header>
        <nav>
            <a href="#/">Home</a>
            <a href="#/missions">Missionen</a>
            <a href="#/research">Forschung</a>
            <a href="#/journal">Logbuch</a>
        </nav>
    </header>

    <!-- Der Router rendert hier die entsprechenden Seiten -->
    <Router {routes} />

    <footer>
        <p>© 2025 Ocean Research Simulator</p>
    </footer>
</main>
