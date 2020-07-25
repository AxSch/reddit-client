import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../reducers/posts/postsSlice';

export default configureStore({
  reducer: {
    posts: postsReducer,
  },
});
