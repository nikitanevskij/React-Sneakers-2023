import { configureStore } from '@reduxjs/toolkit';
import fetchSneakersSlice from './fetchSneakersSlice';
import fetchCartSlice from './fetchCartSlice';
import fetchFavoriteSlice from './fetchFavoriteSlice';

export const store = configureStore({
  reducer: { fetchSneakersSlice, fetchCartSlice, fetchFavoriteSlice },
});
