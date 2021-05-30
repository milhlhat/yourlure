import { configureStore } from '@reduxjs/toolkit';
import userReducer from './action/user-slice.js';

const rootReducer = {
    user: userReducer
}

const store = configureStore({
    reducer: rootReducer
});

export default store;