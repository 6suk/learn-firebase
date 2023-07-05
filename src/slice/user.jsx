import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    user: null,
  },
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
    },
    setLogout: (state) => {
      state.isLogin = false;
      state.user = null;
    },
  },
});

export default user;
export const { setLogin, setLogout } = user.actions;
