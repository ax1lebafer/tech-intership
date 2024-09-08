import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Advertisment, PaginatedResponse } from '../../../types.ts';
import { fetchAdvertisements } from '../../api/advertisements.ts';

export const getAllAdvertisements = createAsyncThunk<
  PaginatedResponse<Advertisment>,
  { page: number; limit: number },
  { rejectValue: string }
>('advertisements/getAllAdvertisements', async ({ page, limit }, thunkAPI) => {
  try {
    const response = await fetchAdvertisements(page, limit);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка при загрузке объявлений');
  }
});

type AdvertisementsStateType = {
  advertisements: Advertisment[];
  loading: boolean;
  error: null | string;
  pagination: {
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    pages: number;
    items: number;
  };
  keyword: string;
};

const initialState: AdvertisementsStateType = {
  advertisements: [],
  loading: false,
  error: null,
  keyword: '',
  pagination: {
    first: 1,
    prev: null,
    next: null,
    last: 1,
    pages: 1,
    items: 0,
  },
};

const advertisementsSlice = createSlice({
  name: 'advertisements',
  initialState,
  reducers: {
    setKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
    resetKeyword: (state) => {
      state.keyword = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAdvertisements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAdvertisements.fulfilled, (state, action) => {
        state.loading = false;
        state.advertisements = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllAdvertisements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      });
  },
});

export const { setKeyword, resetKeyword } = advertisementsSlice.actions;

export const advertisementsReducer = advertisementsSlice.reducer;
