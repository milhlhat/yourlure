import { createSlice, current } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const cart = createSlice({
  name: "cart",
  initialState: {
    // customModelId: null,
    // thumnailUrl:null,
    // customerName:null,
    // productId: null,
    // productName: null,
    // quantity: 0,
    // variantId: null,
    // weight: null,
    // price:null,
    // variantName:null,
    carts: [],
  },
  reducers: {
    setCartGuest: (state, action) => {
      //update cart
      let ex = false;
      for (let i in state.carts) {
        if (
          state.carts[i].productId === action.payload.productId &&
          state.carts[i].variantId === action.payload.variantId
        ) {
          state.carts[i].quantity += action.payload.quantity;
          ex = true;
          break;
        }
      }

      //check for add cart
      !ex && state.carts.push(action.payload);
      // console.log(current(state.carts));

      // s.data.push(action.payload);
      // return { ...state, data: s};
    },
    updateQuantityCarts: (state, action) => {
      //
      for (let i in state.carts) {
        if (
          state.carts[i].productId === action.payload.productId &&
          state.carts[i].variantId === action.payload.variantId
        ) {
          state.carts[i].quantity = action.payload.quantity;
          break;
        }
      }
    },
    deleteCartGuest: (state, action) => {
      //
      // console.log(current(state.carts[0]));
      

      for (let i in current(state.carts)) {
        if (
          state.carts[i].productId === action.payload.productId&&
          state.carts[i].variantId === action.payload.variantId
        ) {
          state.carts.splice(i, 1);
          break;
        }
      }
      
    },
  },
});
const persistConfig = {
  keyPrefix: "YL-",
  key: "cart",
  storage: storage,
  //   whitelist: [""],
};

const { reducer, actions } = cart;
export const { setCartGuest, deleteCartGuest,updateQuantityCarts } = actions;
export default persistReducer(persistConfig, reducer);
// export default reducer;
