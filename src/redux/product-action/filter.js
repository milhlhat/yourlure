import { createSlice } from '@reduxjs/toolkit';

const filter = createSlice({
	name: 'filter',
	initialState: 0,
	reducers: {
		setFilter: (state, action) => {
			let s = { ...state };
			s = action.payload;
			return s;
		},
	},
});

const { reducer, actions } = filter;
export const { setFilter } = actions;
export default reducer;
