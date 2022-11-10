import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type TSneakers = {
  title: string;
  price: number;
  imgURL: string;
  id: string;
};

interface ISneakersSliceState {
  sneakers: TSneakers[];
  isLoading: boolean;
}

const initialState: ISneakersSliceState = {
  sneakers: [],
  isLoading: true,
};

export const fetchGETSneakers = createAsyncThunk<TSneakers[], string | undefined>(
  'sneakers/fetchGETSneakers',
  async (searchValue = '') => {
    const response = await axios.get(
      `https://6161517ee46acd001777c003.mockapi.io/items?search=${searchValue}`,
    );
    return response.data;
  },
);

export const fetchSneakersSlice = createSlice({
  name: 'sneakers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGETSneakers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchGETSneakers.fulfilled, (state, action) => {
      state.sneakers = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchGETSneakers.rejected, () => {
      alert('Запрос не выполнен');
    });
  },
});

export default fetchSneakersSlice.reducer;
