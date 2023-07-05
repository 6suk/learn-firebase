import { configureStore } from '@reduxjs/toolkit';
import user from './user';
import logger from 'redux-logger';
import post from './post';

export default configureStore({
  reducer: {
    user: user.reducer,
    post: post.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger), // logger
});
