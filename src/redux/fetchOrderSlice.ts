import axios from 'axios';
import { RootState } from './store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export type TSneakers = {
  id: string;
  parentId: string;
  title: string;
  price: number;
  imgURL: string;
};

interface ICartSliceState {
  cartSneakers: TSneakers[];
  totalPrice: number;
  orderId: number;
  closedDrawer: boolean;
}

const initialState: ICartSliceState = {
  cartSneakers: [],
  totalPrice: 0,
  orderId: 0,
  closedDrawer: false,
};

export const fetchGETCartSneakers = createAsyncThunk<TSneakers[]>(
  'sneakers/fetchGETCartSneakers',
  async () => {
    const response = await axios.get('https://6161517ee46acd001777c003.mockapi.io/cart');
    return response.data;
  },
);

export const fetchADDCartSneakers = createAsyncThunk<TSneakers, TSneakers>(
  'sneakers/fetchADDCartSneakers',
  async (obj) => {
    const resp = await axios.post('https://6161517ee46acd001777c003.mockapi.io/cart', obj);
    return resp.data;
  },
);
export const fetchDELCartSneakers = createAsyncThunk<string, string>(
  'sneakers/fetchDELCartSneakers',
  async (id) => {
    const resp = await axios.delete(`https://6161517ee46acd001777c003.mockapi.io/cart/${id}`);
    return resp.data.parentId;
  },
);

export const fetchPOSTCartSneakers = createAsyncThunk<number, undefined, { state: RootState }>(
  'sneakers/fetchPOSTCartSneakers',
  async (_, { getState }) => {
    const { fetchCartSlice } = getState();
    const resp = await axios.post('https://6161517ee46acd001777c003.mockapi.io/orders', {
      items: fetchCartSlice.cartSneakers,
    });
    return resp.data.id;
  },
);

const setTotalPrice = (items: TSneakers[]) => {
  if (items.length) {
    const result = items.reduce((sum, item) => item.price + sum, 0);
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
      state.totalPrice = setTotalPrice(state.cartSneakers);
    });
    builder.addCase(fetchGETCartSneakers.rejected, () => {
      alert('Запрос не выполнен');
    });

    builder.addCase(fetchDELCartSneakers.fulfilled, (state, action) => {
      state.cartSneakers = state.cartSneakers.filter(
        (item) => Number(item.parentId) !== Number(action.payload),
      );
      state.totalPrice = setTotalPrice(state.cartSneakers);
    });
    builder.addCase(fetchDELCartSneakers.rejected, () => {
      alert('Запрос на удаление не выполнен, повторите попытку');
    });

    builder.addCase(fetchADDCartSneakers.fulfilled, (state, action) => {
      state.cartSneakers.push(action.payload);
      state.totalPrice = setTotalPrice(state.cartSneakers);
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
