import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserApi from "api/user-api";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const login = createAsyncThunk("user/login", async (params) => {
  try {
    const response = await UserApi.login(params);
    return response;
  } catch (status) {
    throw status.response.status;
  }
});

const user = createSlice({
  name: "user-login",
  initialState: {
    accessToken: null,
    loading: false,
    success: false,
    status: 0,
    loginAt: null,
  },
  reducers: {
    setUserLogin: (state, action) => {
      state = { ...action.payload };
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.status = action.error.message;
      state.success = false;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.accessToken = action.payload;
      state.success = true;
      state.loginAt = new Date().toLocaleString();
      state.status = 200;
    },
  },
});
const persistConfig = {
  keyPrefix: "YL-",
  key: "user",
  storage: storage,
  whitelist: ["accessToken"],
};

const { reducer, actions } = user;
export const { setUserLogin } = actions;
export default persistReducer(persistConfig, reducer);
// export default reducer;
