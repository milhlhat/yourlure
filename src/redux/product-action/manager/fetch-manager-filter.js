import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { filterConfig } from 'constant/filter-setting';
import { getProductByFilter } from 'api/manager-product-api';
export const findByManagerFilter = createAsyncThunk('filter/findByManagerFilter', async (params) => {
	const response = await getProductByFilter(params);
	return response;
});
const managerFilter = createSlice({
	name: 'managerFilter',
	initialState: {
		filter: {
			listCateId: [],
			listFishId: [],
			page: filterConfig.PAGE_NUMBER_DEFAULT,
			limit: filterConfig.LIMIT_DATA_PER_PAGE,
			isAsc: false,
			sortBy: 'productId',
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
		[findByManagerFilter.pending]: (state, action) => {
			state.loading = true;
		},
		[findByManagerFilter.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
			state.success = false;
		},
		[findByManagerFilter.fulfilled]: (state, action) => {
			state.loading = false;
			state.data = action.payload;
			state.success = true;
		},
	},
});

const { reducer, actions } = managerFilter;
export const { setFilter } = actions;
export default reducer;
