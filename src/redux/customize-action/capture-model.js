import { createSlice } from "@reduxjs/toolkit";

const capture = createSlice({
  name: "capture-model",
  initialState: {
    isCapture: false,
    img: "",
    isEdit: false,
    exportData: {
      customizeId: 0,
      materials: [
        {
          color: "",
          img: "",
          materialId: 0,
          text: "",
          textColor: "",
          textFont: "",
          textSize: 0,
        },
      ],
      model3dId: 0,
      name: "",
      thumbnail: {
        content: "",
        name: "",
      },
    },
  },
  reducers: {
    setIsCapture: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

const { reducer, actions } = capture;
export const { setIsCapture } = actions;
export default reducer;
