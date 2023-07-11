import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import user from 'slice/user';
import postList from 'slice/post';
import postToggle from './postToggle';

export default configureStore({
  reducer: {
    user: user.reducer,
    postList: postList.reducer,
    postToggle: postToggle.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger), // logger
});
