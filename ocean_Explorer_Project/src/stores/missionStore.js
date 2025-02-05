import { writable } from 'svelte/store';

export const activeMission = writable(null);
export const missionProgress = writable(
  JSON.parse(localStorage.getItem('missionProgress')) || {}
);

// Save progress when updated
missionProgress.subscribe(value => {
  localStorage.setItem('missionProgress', JSON.stringify(value));
});

export const missions = {
  1: {
    id: 1,
    title: "East China Sea Explorer",
    description: "Explore the East China Sea and discover its unique species.",
    area: "East China Sea",
    hints: [
      "Look in shallow waters near the coast",
      "Check depths between -50m and -200m"
    ],
    objectives: [
      "Find Chromis notata",
      "Discover species at different depths"
    ]
  },
  2: {
    id: 2,
    title: "Gulf of Alaska Survey",
    description: "Study climate change effects on fish population.",
    area: "Gulf of Alaska",
    hints: [
      "Search in deep water regions",
      "Focus on cold water species"
    ],
    objectives: [
      "Find deep-water species",
      "Discover species at different depths"
    ]
  },
  3: {
    id: 3,
    title: "Norwegian Sea Discovery",
    description: "Investigate the Norwegian Sea and its marine life.",
    area: "Norwegian Sea",
    hints: [
      "Explore fjords and coastal areas",
      "Look for species adapted to cold waters"
    ],
    objectives: [
      "Find species in fjords",
      "Discover species at different depths"
    ]
  },
  4: {
    id: 4,
    title: "East China Sea Depth Challenge",
    description: "Discover species at various depths in the East China Sea.",
    area: "East China Sea",
    hints: [
      "Check depths from shallow to deep",
      "Look for species in different regions"
    ],
    objectives: [
      "Discover species at 3 different depth ranges",
      "Find at least 5 unique species"
    ]
  },
  5: {
    id: 5,
    title: "Gulf of Alaska Species Hunt",
    description: "Identify a variety of species in the Gulf of Alaska.",
    area: "Gulf of Alaska",
    hints: [
      "Search in both shallow and deep waters",
      "Look for species in colder regions"
    ],
    objectives: [
      "Find at least 4 unique species",
      "Discover species at different depths"
    ]
  },
  6: {
    id: 6,
    title: "East China Sea Biodiversity",
    description: "Explore the biodiversity of the East China Sea.",
    area: "East China Sea",
    hints: [
      "Look in various regions",
      "Check depths between -50m and -300m"
    ],
    objectives: [
      "Find at least 6 unique species",
      "Discover species at different depths"
    ]
  },
  7: {
    id: 7,
    title: "Gulf of Alaska Depth Explorer",
    description: "Explore the depths of the Gulf of Alaska.",
    area: "Gulf of Alaska",
    hints: [
      "Search in deep water regions",
      "Check depths below -300m"
    ],
    objectives: [
      "Find at least 3 deep-water species",
      "Discover species at different depths"
    ]
  },
  8: {
    id: 8,
    title: "Norwegian Sea Species Survey",
    description: "Conduct a species survey in the Norwegian Sea.",
    area: "Norwegian Sea",
    hints: [
      "Explore various regions",
      "Check depths between -100m and -500m"
    ],
    objectives: [
      "Find at least 5 unique species",
      "Discover species at different depths"
    ]
  },
  9: {
    id: 9,
    title: "East China Sea Species Hunt",
    description: "Identify a variety of species in the East China Sea.",
    area: "East China Sea",
    hints: [
      "Search in both shallow and deep waters",
      "Look for species in different regions"
    ],
    objectives: [
      "Find at least 4 unique species",
      "Discover species at different depths"
    ]
  }
};