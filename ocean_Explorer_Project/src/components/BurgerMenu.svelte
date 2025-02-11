<!-- @format -->
<script>
  let isOpen = false;
  function toggleMenu() {
    isOpen = !isOpen;
  }
</script>

<button class="burger {isOpen ? 'open' : ''}" on:click={toggleMenu} aria-label="Toggle navigation">
  <div></div>
  <div></div>
  <div></div>
</button>

<nav class="menu {isOpen ? 'open' : ''}">
  <ul>
    <li><a href="#/" on:click={toggleMenu}>Home</a></li>
    <li><a href="#/missions" on:click={toggleMenu}>Missions</a></li>
    <li><a href="#/research" on:click={toggleMenu}>Research</a></li>
    <li><a href="#/journal" on:click={toggleMenu}>Journal</a></li>
    <!-- Uncomment if needed:
    <li><a href="/API" on:click={toggleMenu}>API</a></li>
    -->
  </ul>
</nav>

<style>
  .burger,
  nav.menu {
    display: none;
  }

@media screen and (max-width: 375px) and (max-height: 812px) {
    .burger {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 4px;
      /* Hide by default on larger devices if desired */
    }
    .burger div {
      width: 25px;
      height: 3px;
      background-color: #333;
      transition: all 0.3s ease;
    }
    /* Transformations when menu is open */
    .burger.open div:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    .burger.open div:nth-child(2) {
      opacity: 0;
    }
    .burger.open div:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
    /* Mobile menu styles */
    nav.menu {
      display: none;
      position: absolute;
      top: 60px; /* adjust based on header height */
      right: 0;
      background-color: #f8f9fa;
      padding: var(--safe-area);
      z-index: 100;
    }
    nav.menu.open {
      display: block;
    }
    nav.menu ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    nav.menu li {
      margin: 0.5rem 0;
    }
    nav.menu a {
      text-decoration: none;
      color: #333;
    }
  }
</style>
