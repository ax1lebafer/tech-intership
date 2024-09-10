import * as React from 'react';
import styles from './OrdersPage.module.css';
import { useEffect } from 'react';
import OrderFilters from '../../components/OrderFilters/OrderFilters.tsx';
import OrdersList from '../../components/OrdersList/OrdersList.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import {
  getAllOrders,
  setSortByTotal,
  setStatusFilter,
} from '../../store/features/ordersSlice.ts';
import Skeleton from 'react-loading-skeleton';

const OrdersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filteredOrders, loading, error } = useAppSelector(
    (state) => state.orders,
  );

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleStatusChange = (status: number | null) => {
    dispatch(setStatusFilter(status));
  };

  const handleSortChange = (sortBy: 'asc' | 'desc' | null) => {
    dispatch(setSortByTotal(sortBy));
  };

  return (
    <div className={styles.ordersPage}>
      <h1 className={styles.title}>
        {loading ? <Skeleton width={300} height={39} /> : 'Страница заказов'}
      </h1>

      <OrderFilters
        onStatusChange={handleStatusChange}
        onSortChange={handleSortChange}
      />

      {error && (
        <div className={styles.error}>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      )}

      {loading && (
        <div className={styles.loader}>
          <Skeleton height={64} borderRadius={20} />
          <Skeleton
            height={88}
            borderRadius={20}
            count={10}
            style={{ marginBottom: '15px' }}
          />
        </div>
      )}

      {/*{!filteredOrders && (*/}
      {/*  <div>*/}
      {/*    <p>Нет подходящих заказов</p>*/}
      {/*  </div>*/}
      {/*)}*/}

      {!loading && !error && <OrdersList orders={filteredOrders} />}
    </div>
  );
};

export default OrdersPage;
