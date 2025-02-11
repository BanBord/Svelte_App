# Ocean Explorer Project

Welcome to the Ocean Explorer Project! This project is a Svelte-based application designed to explore and study marine life across different seas. The application allows users to embark on missions, discover various fish species, and maintain a journal of their findings.

## Project Evolution

The project started as a simple Svelte application with basic routing and has evolved into a comprehensive ocean exploration tool. Key features include:
- Responsive design for mobile and desktop
- Interactive sea plots for discovering marine species
- Player sessions to track progress and missions
- Integration with the OBIS API for real-time fish data

## Project Structure



### Routes

1. **Hub.svelte**
    - The main entry point of the application where users can start their journey.
    - Displays a welcome message and provides access to the Player Panel.

2. **Missions.svelte**
    - Lists all available missions for the user.
    - Allows users to start missions and view mission details.

3. **Research.svelte**
    - The core exploration interface where users can interact with sea plots.
    - Displays the current mission and its objectives.

4. **Journal.svelte**
    - Shows the user's journal with discovered species.
    - Provides search and sorting functionalities for the journal entries.

5. **API_Output.svelte**
    - Fetches and displays fish occurrence data from the OBIS API based on the selected sea area.

### Components

1. **SpeciesCard.svelte**
    - Displays information about a specific species, including its image, scientific name, depth, and description.

2. **BurgerMenu.svelte**
    - A responsive burger menu for navigation on mobile devices.

3. **PlayerPanel.svelte**
    - Manages player sessions, allowing users to create, select, and delete sessions.

4. **Seaplot.svelte**
    - Represents a clickable plot in the sea grid.
    - Displays fish data and triggers modal pop-ups for discovered species.

5. **Fish.svelte**
    - A modal component that shows detailed information about a discovered fish species, including data fetched from Wikipedia.

6. **Notification.svelte**
    - Displays notifications for events like mission completion.

### Stores

1. **journalStore.js**
    - Manages the state of discovered species and persists data in local storage.

2. **localStore.js**
    - Handles fetching and storing fish data from the OBIS API.

3. **missionStore.js**
    - Manages the state of active missions and mission progress.

4. **missionProgressStore.js**
    - Validates mission criteria and updates mission progress.

5. **playerStore.js**
    - Manages player sessions and persists session data in local storage.

### Assets

1. **updateDepthForNull.js**
    - Interpolates missing depth values in the depth data grid.

2. **updateDepthData.js**
    - Fetches fish data from the OBIS API and updates the depth data grid.

3. **logDepthData.js**
    - Logs depth data for debugging purposes.

4. **depthdata.json**
    - Contains depth and species data for different sea regions.

## APIs Used

### OBIS API

The Ocean Biogeographic Information System (OBIS) API is used to fetch real-time fish occurrence data based on specific sea areas. The API provides detailed information about various fish species, including their scientific names, depths, and geographic coordinates.

#### How It's Used

1. **Fetching Fish Data:**
   - The `fetchFishData` function in `localStore.js` is used to fetch fish data from the OBIS API. It constructs the API URL using the area ID and taxon IDs and makes a GET request to retrieve the data.
   - The fetched data is then stored in the `fishDataStore` writable store for use in the application.

   ```javascript
   export async function fetchFishData(areaId) {
     // Check if data is already in cache
     if (fishDataCache[areaId]) {
       fishDataStore.set(fishDataCache[areaId]);
       return;
     }

     loadingStore.set(true);
     errorStore.set(null);

     try {
       const response = await fetch(`https://api.obis.org/v3/occurrence?taxonid=293496,151737&areaid=${areaId}&size=50`);
       if (!response.ok) {
         throw new Error(`Error: ${response.status}`);
       }
       const data = await response.json();
       fishDataStore.set(data.results);
       fishDataCache[areaId] = data.results; // Store data in cache
     } catch (error) {
       errorStore.set(error.message);
     } finally {
       loadingStore.set(false);
     }
   }

## Getting Started

### Prerequisites

- Node.js and npm installed
- A modern web browser

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/ocean-explorer-project.git
    ```
2. Navigate to the project directory:
    ```sh
    cd ocean-explorer-project
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

### Running the Application

1. Start the development server:
    ```sh
    npm run dev
    ```
2. Open your browser and navigate to `http://localhost:3000`.

### Building for Production

1. Build the application:
    ```sh
    npm run build
    ```
2. Preview the production build:
    ```sh
    npm run preview
    ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Svelte](https://svelte.dev/)
- [Vite](https://vitejs.dev/)
- [OBIS API](https://obis.org/)

Feel free to contribute to the project by submitting issues or pull requests. Happy exploring!