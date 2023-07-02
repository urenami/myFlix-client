import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './reducers/movies';

export const store = configureStore({
  reducer: { books: moviesReducer }
  });