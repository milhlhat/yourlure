import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import userReducer from './action/user-slice.js';
import customizeIdReducer from './action/customize-id';
import customizeInfoReducer from './action/customize-info';

const rootReducer = {
	user: userReducer,
	customizeId: customizeIdReducer,
	customizeInfo: customizeInfoReducer,
};

const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: ['persist/PERSIST'],
		},
	}),
});
export const persistor = persistStore(store);
export default store;
