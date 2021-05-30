const { createSlice } = require('@reduxjs/toolkit');

const user = createSlice({
	name: 'user',
	initialState: {},
	reducers: {
		setUser: (state, action) => {
			let s = state;
			s = action.payload;
			return s;
		},
		removeUser: (state, action) => {
			state = {};
		},
	},
});

const { reducer, actions } = user;
export const { setUser, removeUser } = actions;
export default reducer;
