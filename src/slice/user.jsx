import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    /**
     * {uid(key), displayName, photoURL, email, updateProfile(args)}
     */
    user: null,
    /**
     * {id(key), date, post, uid, imageUrl}
     */
    myPostList: [],
  },
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    setLogout: (state) => {
      state.user = null;
      state.isLogin = false;
    },
    setMyPostList: (state, action) => {
      state.myPostList = action.payload;
    },
  },
});

export default user;
export const { setLogin, setLogout, setMyPostList } = user.actions;
