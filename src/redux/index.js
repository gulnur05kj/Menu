import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlices";
import productSlice from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [productSlice.name]: productSlice.reducer,
  },
});
