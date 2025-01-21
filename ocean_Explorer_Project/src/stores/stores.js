import { writable } from 'svelte/store';

export const occurrences = writable({
  balticSea: [],
  gulfOfAlaska: [],
  andamanSea: []
});

export const depthStats = writable({
  balticSea: [],
  gulfOfAlaska: [],
  andamanSea: []
});