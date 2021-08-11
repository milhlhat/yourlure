import { createSlice } from "@reduxjs/toolkit";

const capture = createSlice({
  name: "capture-model",
  initialState: {
    isCapture: false,
    img: "",
  },
  reducers: {
    setCaptureModel: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

const { reducer, actions } = capture;
export const { setCaptureModel } = actions;
export default reducer;
