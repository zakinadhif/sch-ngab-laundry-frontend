import { configureStore } from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/dist/query";
import { api } from "./slices/apiSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath] : api.reducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
});

setupListeners(store.dispatch);
