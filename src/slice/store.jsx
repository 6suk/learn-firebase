import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import user from 'slice/user';
import postList from 'slice/post';
import postToggle from './postToggle';

const store = configureStore({
  reducer: {
    user: user.reducer,
    postList: postList.reducer,
    postToggle: postToggle.reducer,
  },
  middleware:
    process.env.NODE_ENV === 'development'
      ? (getDefaultMiddleware) =>
          getDefaultMiddleware({
            serializableCheck: false,
          }).concat(logger)
      : (getDefaultMiddleware) =>
          getDefaultMiddleware({
            serializableCheck: false,
          }).concat(),
  devTools: process.env.NODE_ENV === 'development',
});
export default store;
