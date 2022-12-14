import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TSneakers } from './fetchCartSlice';

interface ISneakersSliceState {
  favoriteSneakers: TSneakers[];
}

const initialState: ISneakersSliceState = {
  favoriteSneakers: [],
};

export const fetchGETFavorite = createAsyncThunk<TSneakers[]>(
  'sneakers/fetchGETFavorite',
  async () => {
    const response = await axios.get('https://6161517ee46acd001777c003.mockapi.io/favorites');
    return response.data;
  },
);
export const fetchDELFavorite = createAsyncThunk<string, string>(
  'sneakers/fetchDELFavorite',
  async (id) => {
    const response = await axios.delete(
      `https://6161517ee46acd001777c003.mockapi.io/favorites/${id}`,
    );
    return response.data.parentId;
  },
);
export const fetchADDFavorite = createAsyncThunk<TSneakers, TSneakers>(
  'sneakers/fetchADDFavorite',
  async (obj) => {
    const response = await axios.post('https://6161517ee46acd001777c003.mockapi.io/favorites', obj);
    return response.data;
  },
);

export const fetchFavoriteSlice = createSlice({
  name: 'sneakers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGETFavorite.pending, () => {});
    builder.addCase(fetchGETFavorite.fulfilled, (state, action) => {
      state.favoriteSneakers = action.payload;
    });

    builder.addCase(fetchDELFavorite.pending, () => {});
    builder.addCase(fetchDELFavorite.fulfilled, (state, action) => {
      state.favoriteSneakers = state.favoriteSneakers.filter(
        (item) => Number(item.parentId) !== Number(action.payload),
      );
    });

    builder.addCase(fetchADDFavorite.pending, () => {});
    builder.addCase(fetchADDFavorite.fulfilled, (state, action) => {
      state.favoriteSneakers.push(action.payload);
    });
  },
});

export default fetchFavoriteSlice.reducer;
