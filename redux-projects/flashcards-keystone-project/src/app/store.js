import { configureStore } from '@reduxjs/toolkit';
import topicsReducer from '../features/topics/topicsSlice';
import quizzesReducer from '../features/quizzes/quizzesSlice';
import cardsRedcuer from '../features/cards/cardsSlice';

// const myLogger = (store) => {
//   return (next) => {
//     return (action) => {
//       console.log(action);
//       next(action);
//     };
//   };
// };

const myLogger = (store) => (next) => (action) => {
  console.log(action);
  next(action);
};

export default configureStore({
  reducer: {
    topics: topicsReducer,
    quizzes: quizzesReducer,
    cards: cardsRedcuer
  },
  middleware: [myLogger]
});
