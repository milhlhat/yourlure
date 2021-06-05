import { createSlice } from '@reduxjs/toolkit';

const customize = createSlice({
	name: 'customize-img',
	initialState: {
		mesh: '',
		sole: '',
	},
	reducers: {
		setImg: (state, action) => {
			let s = { ...state };
			s = action.payload;
			return s;
		},
		removeImg: (state, action) => {
			let s = { ...state };
			s = action.payload;
			return s;
		},
	},
});

const { reducer, actions } = customize;
export const { setImg, removeImg } = actions;
export default reducer;
