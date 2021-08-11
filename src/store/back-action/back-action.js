import { createSlice } from "@reduxjs/toolkit";

const backAction = createSlice({
  name: "backAction",
  initialState: {
    canBack: false,
    path: null,
    label: null,
  },
  reducers: {
    setIsBack: (state, action) => {
      return action.payload;
    },
    setPath: (state, action) => {
      return action.payload;
    },
    setLabel: (state, action) => {
      return action.payload;
    },
  },
});

const { reducer, actions } = backAction;
export const { setIsBack,setPath,setLabel } = actions;
export default reducer;