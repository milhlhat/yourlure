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
      // let temp = { ...state };
      //update cart
      let ex = false;
      for (let i in state.carts) {
        if (
          state.carts[i].productId === action.payload.productId &&
          state.carts[i].variantId === action.payload.variantId &&
          state.carts[i].customModelId === action.payload.customModelId
        ) {
          state.carts[i].quantity += action.payload.quantity;
          ex = true;
          break;
        }
      }

      //check for add cart
      !ex && state.carts.push(action.payload);
      // console.log(current(state.carts));
      // return { ...state, carts: temp.carts };
    },
    updateQuantityCarts: (state, action) => {
      // let temp = { ...state };
      //
      // console.log(action.payload);
      for (let i in state.carts) {
        if (
          state.carts[i].productId === action.payload.productId &&
          state.carts[i].variantId === action.payload.variantId &&
          state.carts[i].customModelId === action.payload.customModelId
        ) {
          state.carts[i].quantity = action.payload.quantity;
          break;
        }
      }
      // return { ...state, carts: temp.carts };
    },
    deleteCartGuest: (state, action) => {
      //
      // console.log(current(state.carts[0]));
      // let temp = { ...state };

      for (let i in state.carts) {
        if (
          state.carts[i].productId === action.payload.productId &&
          state.carts[i].variantId === action.payload.variantId &&
          state.carts[i].customModelId === action.payload.customModelId
        ) {
          state.carts.splice(i, 1);
          break;
        }
      }
      // return { ...state, carts: temp.carts };
    },
    updateAfterBuy: (state, action) => {
      for (let i in state.carts) {
        for (let index in action.payload) {
          if (
            state.carts[i].productId === action.payload[index].productId &&
            state.carts[i].variantId === action.payload[index].variantId &&
            state.carts[i].customModelId === action.payload[index].customModelId
          ) {
            state.carts.splice(i, 1);
          }
        }
      }
      // console.log("------------------------");
      // console.log(action.payload);
      // console.log(current(state.carts));
      // console.log("-------------------------");
      // state.carts = state.carts.filter((el) => {
      //   return action.payload.indexOf(el) < 0;
      // });
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
export const {
  setCartGuest,
  deleteCartGuest,
  updateQuantityCarts,
  updateAfterBuy,
} = actions;
export default persistReducer(persistConfig, reducer);
// export default reducer;
