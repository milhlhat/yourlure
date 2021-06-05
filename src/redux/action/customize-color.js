import { createSlice } from '@reduxjs/toolkit';

const customize = createSlice({
	name: 'customize-color',
	initialState: {
		laces: '#ffffff',
		mesh: '#ffffff',
		caps: '#ffffff',
		inner: '#ffffff',
		sole: '#ffffff',
		stripes: '#ffffff',
		band: '#ffffff',
		patch: '#ffffff',
	},
	reducers: {
		setColor: (state, action) => {
			let s = { ...state };
			s = action.payload;
			return s;
		},
		removeColor:(state, action) => {
			let s = { ...state };
			s = action.payload;
			return s;
		},
	},
});

const { reducer, actions } = customize;
export const { setColor, removeColor } = actions;
export default reducer;
