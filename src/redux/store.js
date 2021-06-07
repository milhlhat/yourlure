import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import userReducer from './action/user-slice.js';
import customizeImgReducer from './action/customize-img';
import customizeColorReducer from './action/customize-color';
import customizeIdReducer from './action/customize-id';
import customizeNameReducer from './action/customize-name';

const rootReducer = {
	user: userReducer,
	customizeImg: customizeImgReducer,
	customizeColor: customizeColorReducer,
	customizeId: customizeIdReducer,
	customizeName: customizeNameReducer,
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
