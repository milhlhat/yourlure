import { createSlice } from "@reduxjs/toolkit";

const customizeName = createSlice({
  name: "customize-info",
  initialState: [],
  reducers: {
    setCustomizeInfo: (state, action) => {
      let s = { ...state };
      s = action.payload;
      return s;
    },
  },
});

const { reducer, actions } = customizeName;
export const { setCustomizeInfo } = actions;
export default reducer;
