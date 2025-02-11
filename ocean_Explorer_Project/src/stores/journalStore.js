import { writable } from 'svelte/store';
import { activeSession, playerSessions } from './playerStore.js';

export const discoveredSpecies = writable(
  JSON.parse(localStorage.getItem('discoveredSpecies')) || []
);

// Save discovered species when updated
discoveredSpecies.subscribe(value => {
  localStorage.setItem('discoveredSpecies', JSON.stringify(value));
});

export function addDiscoveredSpecies(species) {
  discoveredSpecies.update(currentSpecies => {
    const updatedSpecies = [...currentSpecies, { ...species, currentMission: true }];
    
    // Update the active session's journal
    activeSession.update(session => {
      if (session) {
        session.journal = [...session.journal, species];
        // Update playerSessions with the new journal entry
        playerSessions.update(sessions => {
          sessions[session.id] = session;
          return sessions;
        });
      }
      return session;
    });

    return updatedSpecies;
  });
}