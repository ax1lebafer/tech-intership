import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Advertisment, PaginatedResponse } from '../../../types.ts';
import {
  createAdvertisement,
  deleteAdvertisement,
  fetchAdvertisementById,
  fetchAdvertisements,
  updateAdvertisement,
} from '../../api/advertisements.ts';

export const getAllAdvertisements = createAsyncThunk<
  PaginatedResponse<Advertisment>,
  { page: number; limit: number },
  { rejectValue: string }
>('advertisements/getAllAdvertisements', async ({ page, limit }, thunkAPI) => {
  try {
    return await fetchAdvertisements(page, limit);
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка при загрузке объявлений');
  }
});

export const getAdvertisementById = createAsyncThunk<
  Advertisment,
  string,
  { rejectValue: string }
>('advertisements/getAdvertisementById', async (id, thunkAPI) => {
  try {
    return await fetchAdvertisementById(id);
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка при загрузке объявления');
  }
});

export const addNewAdvertisement = createAsyncThunk<
  Advertisment,
  Advertisment,
  { rejectValue: string }
>('advertisements/addNewAdvertisement', async (newAd, thunkAPI) => {
  try {
    return await createAdvertisement(newAd);
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка при создании объявления');
  }
});

export const updateExistingAdvertisement = createAsyncThunk<
  Advertisment,
  { id: string; data: Partial<Advertisment> },
  { rejectValue: string }
>(
  'advertisements/updateExistingAdvertisement',
  async ({ id, data }, thunkAPI) => {
    try {
      return await updateAdvertisement(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue('Ошибка при обновлении объявления');
    }
  },
);

export const deleteExistingAdvertisement = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>('advertisements/deleteExistingAdvertisement', async (id, thunkAPI) => {
  try {
    await deleteAdvertisement(id);
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка при удалении объявления');
  }
});

type AdvertisementsStateType = {
  advertisements: Advertisment[];
  selectedAdvertisement: Advertisment | null;
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
  selectedAdvertisement: null,
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
      })
      .addCase(addNewAdvertisement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewAdvertisement.fulfilled, (state, action) => {
        state.loading = false;
        state.advertisements.push(action.payload);
      })
      .addCase(addNewAdvertisement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка при создании объявления';
      })
      .addCase(getAdvertisementById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdvertisementById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAdvertisement = action.payload;
      })
      .addCase(getAdvertisementById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      })
      .addCase(updateExistingAdvertisement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExistingAdvertisement.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.advertisements.findIndex(
          (ad) => ad.id === action.payload.id,
        );
        if (index !== -1) {
          state.advertisements[index] = action.payload;
        }
        state.selectedAdvertisement = action.payload;
      })
      .addCase(updateExistingAdvertisement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка при обновлении объявления';
      })
      .addCase(deleteExistingAdvertisement.fulfilled, (state, action) => {
        state.loading = false;
        state.advertisements = state.advertisements.filter(
          (ad) => ad.id !== action.meta.arg,
        );
        state.selectedAdvertisement = null;
      })
      .addCase(deleteExistingAdvertisement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка при удалении объявления';
      });
  },
});

export const { setKeyword, resetKeyword } = advertisementsSlice.actions;

export const advertisementsReducer = advertisementsSlice.reducer;
