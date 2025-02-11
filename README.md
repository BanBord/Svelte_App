# 🌊 Ocean Explorer Project

Welcome to the Ocean Explorer Project! This interactive web application lets you dive into the fascinating world of marine life across different seas. Built with Svelte, it combines real-time data from multiple APIs to create an engaging exploration experience.

## ✨ Features

- 🎯 Mission-based exploration system
- 📱 Responsive design for both mobile and desktop
- 🗺️ Interactive sea plots for discovering marine species
- 👤 Player session management
- 📖 Digital journal for tracking discoveries
- 🌐 Real-time data integration with OBIS and Wikimedia APIs

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

## 🔌 API Integration

### OBIS API
The Ocean Biogeographic Information System (OBIS) API is core to our application's functionality:

#### Key Features
- Real-time fish occurrence data retrieval
- Geospatial querying capabilities
- Depth and coordinate information
- Species taxonomic data

#### Integration Example
```javascript
export async function fetchOBISData(areaId, depth) {
  const baseUrl = 'https://api.obis.org/v3/occurrence';
  const params = new URLSearchParams({
    areaid: areaId,
    depth: depth,
    size: 50,
    fields: ['scientificName', 'depth', 'decimalLatitude', 'decimalLongitude']
  });

  try {
    const response = await fetch(`${baseUrl}?${params}`);
    const data = await response.json();
    return data.results.map(result => ({
      scientificName: result.scientificName,
      depth: result.depth,
      coordinates: [result.decimalLatitude, result.decimalLongitude]
    }));
  } catch (error) {
    console.error('OBIS API Error:', error);
    return [];
  }
}
```

#### Query Parameters
- `areaid`: Geographic area identifier (e.g., East China Sea = 'ECS')
- `depth`: Target depth range for species search
- `size`: Number of results to return
- `fields`: Specific data fields to retrieve

#### Data Processing
The application processes OBIS data through several steps:
1. Geographic filtering based on mission area
2. Depth validation against mission requirements
3. Species identification and verification
4. Integration with local depth data grid

### Wikimedia API
The Wikimedia API enriches our species data with:
- Detailed species descriptions
- High-quality species images
- Scientific classifications
- Additional references

Example of Wikimedia API integration:
```javascript
export async function fetchSpeciesDetails(speciesName) {
  try {
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${speciesName}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return {
      description: data.extract,
      image: data.thumbnail ? data.thumbnail.source : null,
      classification: data.description,
      references: data.content_urls ? data.content_urls.desktop.page : null
    };
  } catch (error) {
    console.error('Failed to fetch species details:', error);
    return null;
  }
}
```

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