import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductThunk = createAsyncThunk(
  "menu/product",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://be8ea0975549e774.mokky.dev/menu"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const producThunk = createAsyncThunk(
  "menu/product",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://be8ea0975549e774.mokky.dev/menu",
        product
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
