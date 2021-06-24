import { createSlice } from "@reduxjs/toolkit";

const capture = createSlice({
  name: "capture-model",
  initialState: false,
  reducers: {
    setIsCapture: (state, action) => {
      return action.payload;
    },
  },
});

const { reducer, actions } = capture;
export const { setIsCapture } = actions;
export default reducer;
