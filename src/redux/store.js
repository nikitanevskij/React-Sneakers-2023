import { configureStore } from '@reduxjs/toolkit';
import fetchSneakersSlice from './fetchSneakersSlice';
import fetchCartSlice from './fetchCartSlice';

export const store = configureStore({
  reducer: { fetchSneakersSlice, fetchCartSlice },
});
