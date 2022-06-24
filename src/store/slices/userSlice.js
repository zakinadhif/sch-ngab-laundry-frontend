import {createSlice} from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { api } from "./apiSlice";

const initialState = {
  status: "logged_out",
  data: null,
  token: null,
  error: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "logged_out";
      state.data = null;
      state.token = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        api.endpoints.login.matchPending,
        (state) => {
          state.status = "loading";
          state.data = null;
          state.token = null;
          state.error = null;
        }
      )
      .addMatcher(
        api.endpoints.login.matchRejected,
        (state, action) => {
          state.status = "error";
          state.data = null;
          state.token = null;
          state.error = action.payload;
        }
      )
      .addMatcher(
        api.endpoints.login.matchFulfilled,
        (state, action) => {
          state.status = "logged_in";
          state.error = null;
          state.token = action.payload.token;
          state.data = jwt_decode(action.payload.token);
        }
      )
  }
});

export const { logout } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
