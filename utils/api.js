import { AsyncStorage } from 'react-native';
import initialData from './initial-data';

const DECKS_KEY = 'flashcards:decks';

// AsyncStorage.clear();

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_KEY)
    .then((result) => {
      if (result === null) {
        AsyncStorage.setItem(DECKS_KEY, JSON.stringify(initialData));
        return initialData;
      }
      return JSON.parse(result);
    });
}

export function fetchDeck(id) {
  return AsyncStorage.getItem(DECKS_KEY)
    .then((result) => {
      const decks = JSON.parse(result);
      return decks[id];
    });
}

export function addCardToDeck(id, card) {
  return AsyncStorage.getItem(DECKS_KEY)
    .then((result) => {
      const decks = JSON.parse(result);
      const updatedDeck = { ...decks[id] };
      updatedDeck.questions.push(card);
      return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
        [id]: updatedDeck,
      }));
    });
}

export function createDeck(deck) {
  return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
    [deck.title]: deck,
  }));
}
