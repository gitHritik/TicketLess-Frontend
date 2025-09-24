// src/features/payment/paymentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const defaultDate = new Date().toISOString().split("T")[0]; // e.g., "2023-09-28"
const defaultTime = "09:00-10:00 AM";

const initialState = {
  cart: {
    date: defaultDate,
    time: defaultTime,
    price: "",
    image: "",
    location: "",
    museumName: "",
    tickets: {
      adult: 0,
      reduced: 0,
    },
  },
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.cart.date = action.payload;
    },
    setTime: (state, action) => {
      state.cart.time = action.payload;
    },
    setPrice: (state, action) => {
      state.cart.price = action.payload;
    },
    setTickets: (state, action) => {
      state.cart.tickets = action.payload;
    },
    setImage: (state, action) => {
      state.cart.image = action.payload;
    },

    setLocation: (state, action) => {
      state.cart.location = action.payload;
    },
    setmuseumName: (state, action) => {
      state.cart.museumName = action.payload;
    },

    resetPayment: (state) => {
      state.cart = {
        date: defaultDate,
        time: defaultTime,
        price: "",
        image: "",
        location: "",
        museumName: "",
        tickets: { adult: 0, reduced: 0 },
      };
    },
  },
});

export const {
  setDate,
  setTime,
  setPrice,
  setTickets,
  setImage,
  setLocation,
  setmuseumName,
  resetPayment,
} = paymentSlice.actions;

export default paymentSlice.reducer;
