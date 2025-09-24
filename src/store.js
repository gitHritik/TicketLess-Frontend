import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import paymentReducer from "./slices/paymentSlices";
import { apiSlice } from "./slices/apiSlice";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
    payment: paymentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, thunk),
  devTools: true, // Add thunk middleware
});

export default store;
