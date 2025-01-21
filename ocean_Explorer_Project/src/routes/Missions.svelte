<script>
  import { activeMission } from '../stores/store_mission.js';
  import { get } from 'svelte/store';

  function activateMission(mission) {
    activeMission.set(mission);
  }
</script>

<div class="content">
  <div class="mission-1 {get(activeMission) === 1 ? 'active' : ''}">
        <div class="mission-content">
            <h2>Mission 1</h2>
            <div class="mission-description">
                <p>Die Mission 1 führt uns in die Deutsche Ostsee. Hier untersuchen wir die Fischpopulation.</p>
            </div>
            <div id="fish-outline-1"></div>
            <button on:click={() => activateMission(1)}>Activate Mission 1</button>
        </div>
    </div>
    <div class="mission-2 {get(activeMission) === 2 ? 'active' : ''}">
        <div class="mission-content">
            <h2>Mission 2</h2>
            <div class="mission-description">
                <p>Die Mission 2 führt uns in den Golf von Alaska. Hier untersuchen wir die Auswirkungen des Klimawandels auf die Fischpopulation und die Meeresumwelt.</p>
            </div>
            <div id="fish-outline-2"></div>
            <button on:click={() => activateMission(2)}>Activate Mission 2</button>
        </div>
    </div>
    <div class="mission-3 {get(activeMission) === 3 ? 'active' : ''}">
        <div class="mission-content">
            <h2>Mission 3</h2>
            <div class="mission-description">
                <p>Die Mission 3 führt uns in die Andaman-See. Hier untersuchen wir die heimische Tierwelt.</p>
            </div>
            <div id="fish-outline-3"></div>
            <button on:click={() => activateMission(3)}>Activate Mission 3</button>
        </div>
    </div>
</div>

<style>
.content{
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
  }

  .mission-1, .mission-2, .mission-3 {
  background-color: #f0f0f0;
  padding: 1.5rem;
  border: 1px solid #ddd;
  cursor: pointer;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  }

  .mission-content {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  }

  h2 {
  margin: 0;
  padding-bottom: 0.5rem;
  }

  .mission-description p {
  margin: 0;
  line-height: 1.4;
  }

  .mission-1{
  grid-column: 2 / span 2;
  grid-row: 1 / span 2;
  }

  .mission-2{
  grid-column: 4 / span 2;
  grid-row: 1 / span 2;
  }

  .mission-3{
  grid-column: 6 / span 2;
  grid-row: 1 / span 2;
  }

  #fish-outline-1, #fish-outline-2, #fish-outline-3 {
  width: 100%;
  height: 200px;
  background-color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: center;
  }

  #fish-outline-1 {
  background-image: url('/fish-silluettes/Flunder.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  }

  #fish-outline-2 {
  background-image: url('/fish-silluettes/Kabeljau.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  }

  #fish-outline-3 {
  background-image: url('/fish-silluettes/Baracuda.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  }

  .mission-1.active, .mission-2.active, .mission-3.active {
  border: 2px solid #007BFF;
  animation: pulse 1s infinite;
  }

  @keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(0, 123, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0);
  }
  }

  button {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  }

  button:hover {
  background-color: #0056b3;
  }

  .mission-1.active button, .mission-2.active button, .mission-3.active button {
  background-color: #28a745;
  }


</style>
