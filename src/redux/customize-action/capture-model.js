import { createSlice } from "@reduxjs/toolkit";

const capture = createSlice({
  name: "capture-model",
  initialState: { isCapture: false, img: "" },
  reducers: {
    setIsCapture: (state, action) => {
      
      return { ...state, ...action.payload };
    },
  },
});

const { reducer, actions } = capture;
export const { setIsCapture } = actions;
export default reducer;
