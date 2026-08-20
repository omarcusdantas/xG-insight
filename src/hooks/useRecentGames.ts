import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "xg-insight:recent-games";
const MAX_GAMES = 10;

export interface RecentGame {
  eventId: string;
  homeTeamName: string;
  awayTeamName: string;
  tournamentName: string;
  date: string;
}

function readStorage(): RecentGame[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as RecentGame[];
  } catch {
    return [];
  }
}

function writeStorage(games: RecentGame[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
}

let listeners: Array<() => void> = [];
let snapshot: RecentGame[] = [];

function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function emitChange() {
  snapshot = readStorage();
  for (const listener of listeners) {
    listener();
  }
}

function getSnapshot(): RecentGame[] {
  return snapshot;
}

if (typeof window !== "undefined") {
  snapshot = readStorage();
}

const emptySnapshot: RecentGame[] = [];

export function addRecentGame(game: RecentGame) {
  const current = readStorage();
  const filtered = current.filter((g) => g.eventId !== game.eventId);
  const next = [game, ...filtered].slice(0, MAX_GAMES);
  writeStorage(next);
  emitChange();
}

export function clearRecentGames() {
  writeStorage([]);
  emitChange();
}

export function useRecentGames() {
  const games = useSyncExternalStore(subscribe, getSnapshot, () => emptySnapshot);

  const add = useCallback((game: RecentGame) => {
    addRecentGame(game);
  }, []);

  const clear = useCallback(() => {
    clearRecentGames();
  }, []);

  return { games, add, clear } as const;
}
