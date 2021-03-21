import { createSlice } from '@reduxjs/toolkit';

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    cards: {
      // 123: { id: '123', front: 'front of card', back: 'back of card' }
    }
  },
  reducers: {
    addCard(state, action) {
      state.cards[action.payload.id] = action.payload;
    }
  }
});

export const selectCards = (state) => state.cards.cards;

const { actions, reducer } = cardsSlice;

export const { addCard } = actions;

export default reducer;
