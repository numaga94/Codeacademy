import { createSlice } from '@reduxjs/toolkit';

export const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState: {
    quizzes: {
      // 456: {
      //   id: '456',
      //   topicId: '123',
      //   name: 'quiz for example topic',
      //   cardIds: ['789', '101', '102']
      // }
    }
  },
  reducers: {
    addQuiz: (state, action) => {
      return {
        ...state,
        quizzes: {
          ...state.quizzes,
          [action.payload.id]: action.payload
        }
      };
    }
  }
});

export const selectQuizzes = (state) => state.quizzes.quizzes;

const { actions, reducer } = quizzesSlice;

export const { addQuiz } = actions;

export default reducer;
