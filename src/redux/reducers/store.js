import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: { movies: moviesReducer, user: userReducer },
});