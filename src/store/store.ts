import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { advertisementsReducer } from './features/advSlice.ts';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from 'react-redux';
import { ordersReducer } from './features/ordersSlice.ts';

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      advertisement: advertisementsReducer,
      orders: ordersReducer,
    }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
