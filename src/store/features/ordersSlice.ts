import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../../types.ts';
import { fetchOrders } from '../../api/orders.ts';

export const getAllOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string }
>('orders/getAllOrders', async (_, thunkAPI) => {
  try {
    return await fetchOrders();
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка при загрузке заказов');
  }
});

type OrdersStateType = {
  orders: Order[];
  filteredOrders: Order[];
  loading: boolean;
  error: null | string;
  statusFilter: number | null;
  sortByTotal: 'asc' | 'desc' | null;
};

const initialState: OrdersStateType = {
  orders: [],
  filteredOrders: [],
  loading: false,
  error: null,
  statusFilter: null,
  sortByTotal: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<number | null>) => {
      state.statusFilter = action.payload;
      state.filteredOrders = state.orders.filter((order) =>
        action.payload === null ? true : order.status === action.payload,
      );
    },
    setSortByTotal: (state, action: PayloadAction<'asc' | 'desc' | null>) => {
      state.sortByTotal = action.payload;
      if (action.payload) {
        state.filteredOrders = [...state.filteredOrders].sort((a, b) =>
          action.payload === 'asc' ? a.total - b.total : b.total - a.total,
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(
        getAllOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.orders = action.payload;
          state.filteredOrders = action.payload;
          state.loading = false;
        },
      )
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : 'Неизвестная ошибка';
      });
  },
});

export const { setStatusFilter, setSortByTotal } = ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;
