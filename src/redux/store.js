import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import userReducer from './user-action/user-slice.js';
import customizeIdReducer from './customize-action/customize-id';
import customizeInfoReducer from './customize-action/customize-info';
import customizeInitReducer from './customize-action/customize-init-data'
import productFilterReducer from './product-action/filter'
const rootReducer = {
	user: userReducer,
	customizeId: customizeIdReducer,
	customizeInfo: customizeInfoReducer,
	customizeInit : customizeInitReducer,
	productFilter: productFilterReducer
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
