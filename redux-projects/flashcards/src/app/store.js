import { configureStore } from '@reduxjs/toolkit';
import topicsReducer from '../features/topics/topicsSlice';
import quizzesReducer from '../features/quizzes/quizzesSlice';
import cardsRedcuer from '../features/cards/cardsSlice';

export default configureStore({
  reducer: {
    topics: topicsReducer,
    quizzes: quizzesReducer,
    cards: cardsRedcuer
  }
});
