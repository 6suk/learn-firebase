import { createSlice } from '@reduxjs/toolkit';
import { authService } from 'fbase';

const user = createSlice({
  name: 'user',
  initialState: {
    isLogin: authService.currentUser,
  },
  reducers: {
    setLogin: (state, action) => {
      switch (action.type) {
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
