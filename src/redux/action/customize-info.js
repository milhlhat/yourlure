import { createSlice } from '@reduxjs/toolkit';

const customizeName = createSlice({
	name: 'customize-name',
	initialState: [],
	reducers: {
		setListName: (state, action) => {
			let s = { ...state };
			s = action.payload;
			return s;
		},
	},
});

const { reducer, actions } = customizeName;
export const { setListName } = actions;
export default reducer;
