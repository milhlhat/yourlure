import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBestSellerCategory } from 'api/category-api';
import queryString from 'query-string';
export const getBestCate = createAsyncThunk('category-betst/getBestCate', async (params) => {
	const response = await getBestSellerCategory();
	return response;
});
const filter = createSlice({
	name: 'category-best',
	initialState: {
		data: [],
		loading: false,
		success: false,
		error: '',
	},
	reducers: {
		// setFilter: (state, action) => {
		// 	let s = { ...state };
		// 	s = action.payload;
		// 	return s;
		// },
	},
	extraReducers: {
		[getBestCate.pending]: (state, action) => {
			state.loading = true;
		},
		[getBestCate.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
			state.success = false;
		},
		[getBestCate.fulfilled]: (state, action) => {
			state.loading = false;
			state.data = action.payload;
			state.success = true;
		},
	},
});

const { reducer, actions } = filter;
export const {} = actions;
export default reducer;
