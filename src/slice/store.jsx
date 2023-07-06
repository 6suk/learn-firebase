import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import user from 'slice/user';
import postList from 'slice/post';

export default configureStore({
  reducer: {
    user: user.reducer,
    postList: postList.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger), // logger
});
