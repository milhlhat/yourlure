import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCategory, getAllFish } from "api/product-api";

export const fetchCate = createAsyncThunk("cateFish/fetchCate", async () => {
  const response = await getAllCategory();
  return response;
});
export const fetchFish = createAsyncThunk('cateFish/fetchFish', async () => {
	const response = await getAllFish();
	return response;
});

const cateFish = createSlice({
	name: 'cateFish',
	initialState: { cate: [], fish: [] },
	extraReducers: {
		[fetchCate.fulfilled]: (state, action) => {
			let s = { ...state };
			s.cate = action.payload;
			return s;
		},
		[fetchFish.fulfilled]: (state, action) => {
			let s = { ...state };
			s.fish = action.payload;
			return s;
		},
	},
});

const { reducer } = cateFish;
export default reducer;
