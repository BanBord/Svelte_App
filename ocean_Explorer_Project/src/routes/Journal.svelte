<script>
import Journalentry from "../components/Journalentry.svelte";
</script>

<div class="content">
    <div class="progress-panel">
        <div class="progress-content">
            <h2>Progress</h2>
            <div class="progress-bar"></div>
        </div>
        <div class="catch-history">
            <h2>Catch History</h2>
            <div class="catch-overview"></div>
        </div>
    </div>
    <div class="journal-panel">
        <div class="search-and-journal">
            <div class="search-bar">
                <input type="text" placeholder="Search...">
            </div>
            <div class="journal-grid">
                <Journalentry />
                <Journalentry />
                <Journalentry />
                <Journalentry />
                <Journalentry />
                <!-- Add more Journalentry components as needed -->
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

.progress-panel, .journal-panel {
    background-color: #f0f0f0;
    padding: 1rem;
    border: 1px solid #ddd;
    cursor: pointer;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.progress-panel{
    grid-column: 1 / span 3;
    grid-row: 1 / span 2;
    flex-direction: column;
    justify-content: space-between;
}

.journal-panel{
    grid-column: 4 / span 5;
    grid-row: 1 / span 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.progress-content{
    width: 100%;
}
.progress-bar{
    width: 100%;
    height: 20px;
    background-color: aqua;
    border-radius: 12px;
}

.catch-history{
    width: 100%;
}

.catch-overview{
    width: 100%;
    height: 400px;
    gap: 1rem;
    background-color: #a12b2b;
    border-radius: 16px;
}



.journal-panel{
    display: flex;
    flex-direction: column;
    justify-content:space-around
}

.journal-grid{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 20px;
    margin-bottom: 20px;
}



</style>