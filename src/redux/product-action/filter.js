import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import queryString from 'query-string';
export const findByFilter = createAsyncThunk('filter/findByFilter', async (params) => {
	// const user = await UserApi.login(params);
	console.log(queryString.stringify(params));
	return [
		{
			brand: 'string',
			customizable: true,
			defaultPrice: 0,
			description: 'string',
			imageCollection: [
				{
					id: 0,
					linkImage: 'string',
				},
			],
			productID: 0,
			productName: 'string',
		},
	];
});
const filter = createSlice({
	name: 'filter',
	initialState: {
		keywords: '',
		data: [],
		loading: false,
		success: false,
		error: '',
	},
	reducers: {
		setFilter: (state, action) => {
			let s = { ...state };
			s = action.payload;
			return s;
		},
	},
	extraReducers: {
		[findByFilter.pending]: (state, action) => {
			state.loading = true;
		},
		[findByFilter.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
			state.success = false;
		},
		[findByFilter.fulfilled]: (state, action) => {
			state.loading = false;
			state.data = action.payload;
			state.success = true;
		},
	},
});

const { reducer, actions } = filter;
export const { setFilter } = actions;
export default reducer;
