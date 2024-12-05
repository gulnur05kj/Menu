import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const signUpThunk = createAsyncThunk(
  "menu/signUp",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://be8ea0975549e774.mokky.dev/register",
        userData
      );
      Cookies.set("userData", JSON.stringify(response.data), { expires: 1 });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const signInThunk = createAsyncThunk(
  "menu/signIn",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://be8ea0975549e774.mokky.dev/auth",
        userData
      );
      Cookies.set("userData", JSON.stringify(response.data), { expires: 1 });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const getInitialStateCookies = () => {
  let userInfo = null;
  try {
    userInfo = JSON.parse(Cookies.get("userData") || "null");
  } catch (error) {
    console.error("Failed to parse userData cookie:", error);
    userInfo = null;
  }

  return {
    token: userInfo?.token || null,
    userData: userInfo?.data || {
      name: null,
      email: null,
      role: "GUEST",
    },
    errorMessage: null,
    isLoading: false,
  };
};

export const authSlice = createSlice({
  name: "menu",
  initialState: getInitialStateCookies(),
  reducers: {
    logout(state) {
      state.token = null;
      state.userData = { name: null, email: null, role: "GUEST" };
      Cookies.remove("userData");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.userData = action.payload.data;
        state.errorMessage = null;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload || "Ошибка регистрации";
      })
      .addCase(signInThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.userData = action.payload.data;
        state.errorMessage = null;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload || "Ошибка входа";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
