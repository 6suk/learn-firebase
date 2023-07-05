import { createSlice } from '@reduxjs/toolkit';
import auth from 'fbase';

const user = createSlice({
  name: 'user',
  initialState: {
    isLogin: auth.currentUser,
  },
  reducers: {
    setLogin: (state, action) => {
      switch (action.payload.type) {
        case 'LOGIN':
          state.isLogin = true;
          break;
        case 'LOGOUT':
          state.isLogin = false;
          break;
        default:
          break;
      }
    },
  },
});

export default user;
export const { setLogin } = user.actions;
