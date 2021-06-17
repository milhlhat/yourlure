import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import userReducer from './user-action/fetch-login.js';
import customizeIdReducer from './customize-action/customize-id';
import customizeInfoReducer from './customize-action/customize-info';
import productFilterReducer from './product-action/fetch-filter';
import cateFishForFilterReducer from './product-action/fetch-cate-fish';
const rootReducer = {
	user: userReducer,
	customizeId: customizeIdReducer,
	customizeInfo: customizeInfoReducer,
	productFilter: productFilterReducer,
	cateFishForFilter: cateFishForFilterReducer,
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
