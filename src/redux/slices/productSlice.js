import { createSlice } from "@reduxjs/toolkit";
import { getProductThunk } from "../thunks/productThunk";

const productSlice = createSlice({
  name: "tours",
  initialState: {
    tours: [],
  },
  reducers: {
    addTour(state, action) {
      state.tours.push(action.payload);
    },
  },
  extraReducers: (build) => {
    build.addCase(getProductThunk.fulfilled, (state, action) => {
      state.tours = action.payload;
    });
  },
});
export default productSlice;
