const { createSlice } = require('@reduxjs/toolkit');

const post = createSlice({
  name: 'post',
  initialState: {},
  reducers: {
    setPost: (state) => {},
  },
});

export default post;
export const { setPost } = post.actions;
