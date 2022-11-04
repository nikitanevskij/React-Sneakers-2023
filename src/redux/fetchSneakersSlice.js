import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pizzas: [],
};

export const fetchSneakersSlice = createSlice({
  name: 'fetchSneakersSlice',
  initialState,
  reducers: {},
});

export const {} = fetchSneakersSlice.actions;

export default fetchSneakersSlice.reducer;
