const { createSlice } = require('@reduxjs/toolkit');

const postToggle = createSlice({
  name: 'postToggle',
  initialState: {
    postFormToggle: true,
  },
  reducers: {
    setPostFormToggle: (state, action) => {
      if (action.payload === undefined) {
        state.postFormToggle = !state.postFormToggle;
      } else {
        state.postFormToggle = action.payload;
      }
    },
  },
});

export default postToggle;
export const { setPostFormToggle } = postToggle.actions;
