import { writable } from 'svelte/store';

export const activeMission = writable(null);
export const missionProgress = writable({});

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
            "Document temperature variations"
        ]
    },
    3: {
        id: 3,
        title: "Norwegian Sea Discovery",
        description: "Investigate the Norwegian Sea wildlife.",
        area: "Norwegian Sea",
        hints: [
            "Explore the continental shelf",
            "Look for species in varying depths"
        ],
        objectives: [
            "Map species distribution",
            "Record depth patterns"
        ]
    }
};