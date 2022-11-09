import { configureStore } from '@reduxjs/toolkit';
import fetchSneakersSlice from './fetchSneakersSlice';
import fetchCartSlice from './fetchCartSlice';
import fetchFavoriteSlice from './fetchFavoriteSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: { fetchSneakersSlice, fetchCartSlice, fetchFavoriteSlice },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
