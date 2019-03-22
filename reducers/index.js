import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions';

function decks(state = {}, action) {
  let updatedDeck;
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: action.deck,
      };
    case ADD_CARD:
      updatedDeck = { ...state[action.deckTitle] };
      updatedDeck.questions.push(action.question);
      return {
        ...state,
        [action.deckTitle]: updatedDeck,
      };
    default:
      return state;
  }
}

export default decks;
