import { createSlice } from '@reduxjs/toolkit';

const customize = createSlice({
	name: 'customize-init',
	initialState: { id: 0, materials: [] },
	reducers: {
		setMaterialInit: (state, action) => {
			let s = { ...state };
			if (s.id > 1) return s;
			else s = { id: s.id + 1, materials: action.payload };
			return s;
		},
	},
});

const { reducer, actions } = customize;
export const { setMaterialInit } = actions;
export default reducer;
