import { configureStore } from '@reduxjs/toolkit';
import user from './user';
import logger from 'redux-logger';

export default configureStore({
  reducer: {
    user: user.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // logger
});
