import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './reducers/movies';
import userReducer from "./reducers/user";

export const store = configureStore({
  reducer: { books: moviesReducer, user: userReducer }
  });