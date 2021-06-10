import { createSlice } from '@reduxjs/toolkit';

const customize = createSlice({
	name: 'customize-id',
	initialState: 0,
	reducers: {
		setMaterialId: (state, action) => {
			let s = {...state};
			s = action.payload;
            
			return s;
		} 
	},
});

const { reducer, actions } = customize;
export const { setMaterialId } = actions;
export default reducer;
