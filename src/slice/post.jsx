const { createSlice } = require('@reduxjs/toolkit');

const postList = createSlice({
  name: 'postList',
  initialState: {
    /**
     * {id(key), date, post, uid}
     */
    data: [],
  },
  reducers: {
    setPostList: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default postList;
export const { setPostList } = postList.actions;
