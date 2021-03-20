import { createSlice } from '@reduxjs/toolkit';

export const topicsSlice = createSlice({
  name: 'topics',
  initialState: {
    topics: {
      // 123: {
      //   id: '123',
      //   name: 'example topic',
      //   icon: 'https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/calendar.svg',
      //   quizIds: ['456']
      // }
    }
  },
  reducers: {
    addTopic: (state, action) => {
      return {
        ...state,
        topics: {
          ...state.topics,
          [action.payload.id]: action.payload
        }
      };
    },
    addQuizId: (state, action) => {
      const keys = Object.keys(state.topics);
      // console.log(action.payload);
      // console.log(keys);
      if (keys.find((key) => key === action.payload.topicId)) {
        state.topics[action.payload.topicId].quizIds.push(action.payload.id);
      }
      return state;
    }
  }
});

export const selectTopics = (state) => state.topics.topics;

const { actions, reducer } = topicsSlice;

export const { addTopic, addQuizId } = actions;

export default reducer;
