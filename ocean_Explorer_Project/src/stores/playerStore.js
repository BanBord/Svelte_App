import { writable } from "svelte/store";

const storedSessions = JSON.parse(localStorage.getItem("playerSessions")) || {};
export const playerSessions = writable(storedSessions);
export const activeSession = writable(null);

playerSessions.subscribe((sessions) => {
    localStorage.setItem("playerSessions", JSON.stringify(sessions));
});

export function createSession(username) {
    const sessionId = Date.now();
    const newSession = {
        id: sessionId,
        username,
        missions: {},
        journal: []
    };
    playerSessions.update((sessions) => ({ ...sessions, [sessionId]: newSession }));
    activeSession.set(newSession);
    return sessionId;
}

export function deleteSession(sessionId) {
    playerSessions.update((sessions) => {
        delete sessions[sessionId];
        return sessions;
    });
    activeSession.set(null);
}

export function selectSession(sessionId) {
    playerSessions.update((sessions) => {
        activeSession.set(sessions[sessionId]);
        return sessions;
    });
}

export function completeMission(missionId) {
    activeSession.update(session => {
        if (session) {
            session.missions[missionId] = { completed: true };
            // Also update the session in the global playerSessions store
            playerSessions.update(sessions => {
                sessions[session.id].missions[missionId] = { completed: true };
                return sessions;
            });
        }
        return session;
    });
}