import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { filterConfig } from 'constant/filter-setting';
import { getProductByFilter } from 'api/product-api';
import queryString from 'query-string';
export const findByFilter = createAsyncThunk('filter/findByFilter', async (params) => {
	const response = await getProductByFilter(params);
	await console.log(response);
	return response;
});
const filter = createSlice({
	name: 'filter',
	initialState: {
		filter: {
			listCateId: [],
			listFishId: [],
			page: filterConfig.PAGE_NUMBER_DEFAULT,
			limit: filterConfig.LIMIT_DATA_PER_PAGE,
			custom: false,
			isAsc: false,
			sortBy: '',
			keyword: '',
		},
		data: [],
		loading: false,
		success: false,
		error: '',
	},
	reducers: {
		setFilter: (state, action) => {
			state.filter = { ...state.filter, ...action.payload };
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
