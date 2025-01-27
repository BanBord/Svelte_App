import { get } from 'svelte/store';
import { fishDataStore } from '../stores/localStore.js';

const fishData = get(fishDataStore);
console.log('Fish data from store:', fishData);