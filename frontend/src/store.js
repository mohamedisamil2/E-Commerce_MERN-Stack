import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./assets/slices/authSlice";
import cartReducer from "./assets/slices/cartSlice";
import { apiSlice } from "./assets/slices/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
