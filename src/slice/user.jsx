import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    user: null,
    /**
     * {id(key), date, post, uid, imageUrl}
     */
    myPostList: [],
  },
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      state.user = null;
    },
    setMyPostList: (state, action) => {
      state.myPostList = action.payload;
    },
  },
});

export default user;
export const { setLogin, setLogout, setMyPostList } = user.actions;
