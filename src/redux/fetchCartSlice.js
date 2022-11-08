import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cartSneakers: [],
  totalPrice: 0,
  orderId: 0,
  closedDrawer: false,
};

export const fetchGETCartSneakers = createAsyncThunk('sneakers/fetchGETCartSneakers', async () => {
  const response = await axios.get('https://6161517ee46acd001777c003.mockapi.io/cart');
  return response.data;
});

export const fetchADDCartSneakers = createAsyncThunk(
  'sneakers/fetchADDCartSneakers',
  async (obj) => {
    const resp = await axios.post('https://6161517ee46acd001777c003.mockapi.io/cart', obj);
    return resp.data;
  },
);
export const fetchDELCartSneakers = createAsyncThunk(
  'sneakers/fetchDELCartSneakers',
  async (id) => {
    const resp = await axios.delete(`https://6161517ee46acd001777c003.mockapi.io/cart/${id}`);
    return resp.data.parentId;
  },
);

export const fetchPOSTCartSneakers = createAsyncThunk(
  'sneakers/fetchPOSTCartSneakers',
  async (_, { getState }) => {
    const { fetchCartSlice } = getState();
    const resp = await axios.post('https://6161517ee46acd001777c003.mockapi.io/orders', {
      items: fetchCartSlice.cartSneakers,
    });
    return resp.data.id;
  },
);

const setTotalPrice = (state) => {
  if (state.cartSneakers.length) {
    const result = state.cartSneakers.reduce((sum, item) => item.price + sum, 0);
    return result;
  } else return 0;
};

export const fetchCartSlice = createSlice({
  name: 'sneakers',
  initialState,
  reducers: {
    setClosedDrawer: (state) => {
      state.closedDrawer = !state.closedDrawer;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGETCartSneakers.pending, () => {});
    builder.addCase(fetchGETCartSneakers.fulfilled, (state, action) => {
      state.cartSneakers = action.payload;
      state.totalPrice = setTotalPrice(state);
    });
    builder.addCase(fetchGETCartSneakers.rejected, () => {
      alert('Запрос не выполнен');
    });

    builder.addCase(fetchDELCartSneakers.fulfilled, (state, action) => {
      state.cartSneakers = state.cartSneakers.filter(
        (item) => Number(item.parentId) !== Number(action.payload),
      );
      state.totalPrice = setTotalPrice(state);
    });
    builder.addCase(fetchDELCartSneakers.rejected, () => {
      alert('Запрос на удаление не выполнен, повторите попытку');
    });

    builder.addCase(fetchADDCartSneakers.fulfilled, (state, action) => {
      state.cartSneakers.push(action.payload);
      state.totalPrice = setTotalPrice(state);
    });
    builder.addCase(fetchADDCartSneakers.rejected, () => {
      alert('Запрос на добавление не выполнен, повторите попытку');
    });

    builder.addCase(fetchPOSTCartSneakers.fulfilled, (state, action) => {
      state.orderId = action.payload;
      state.totalPrice = 0;
    });
    builder.addCase(fetchPOSTCartSneakers.rejected, () => {
      alert('Запрос на оформление заказа не выполнен, повторите попытку');
    });
  },
});

export const { setClosedDrawer } = fetchCartSlice.actions;

export default fetchCartSlice.reducer;
