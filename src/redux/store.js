import { configureStore } from '@reduxjs/toolkit';
import fetchSneakersSlice from './fetchSneakersSlice';

export const store = configureStore({
  reducer: { fetchSneakersSlice },
});
