import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserApi from 'api/user-api';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const getUser = createAsyncThunk('user/getUser', async (params) => {
	const user = await UserApi.login(params);
	return user;
});

const user = createSlice({
	name: 'user',
	initialState: {
		data: {},
		loading: false,
		success: false,
		error: '',
	},
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
	extraReducers: {
		[getUser.pending]: (state, action) => {
			state.loading = true;
		},
		[getUser.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
			state.success = false;
		},
		[getUser.fulfilled]: (state, action) => {
			state.loading = false;
			state.data = action.payload;
			state.success = true;
		},
	},
});
const persistConfig = {
	keyPrefix: 'YL-',
	key: 'user',
	storage: storage,
};

const { reducer, actions } = user;
export const { setUser, removeUser } = actions;
export default persistReducer(persistConfig, reducer);
// export default reducer;
