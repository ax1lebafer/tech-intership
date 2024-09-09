import * as React from 'react';
// import OrderFilters from '../OrderFilters/OrderFilters';
// import OrdersList from '../OrdersList/OrdersList';
import styles from './OrdersPage.module.css';
import { fetchOrders } from '../../api/orders.ts';
import { Order } from '../../../types.ts';
import { useEffect, useState } from 'react';
import OrderFilters from '../../components/OrderFilters/OrderFilters.tsx';
import OrdersList from '../../components/OrdersList/OrdersList.tsx';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<number | null>(null);
  const [sortByTotal, setSortByTotal] = useState<'asc' | 'desc' | null>(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        console.error('Ошибка при загрузке заказов', error);
      }
    };

    getOrders();
  }, []);

  useEffect(() => {
    let updatedOrders = [...orders];
    if (statusFilter !== null) {
      updatedOrders = updatedOrders.filter(
        (order) => order.status === statusFilter,
      );
    }
    setFilteredOrders(updatedOrders);
  }, [statusFilter, orders]);

  useEffect(() => {
    if (sortByTotal) {
      const sortedOrders = [...filteredOrders].sort((a, b) =>
        sortByTotal === 'asc' ? a.total - b.total : b.total - a.total,
      );
      setFilteredOrders(sortedOrders);
    }
  }, [sortByTotal]);

  return (
    <div className={styles.ordersPage}>
      <h1 className={styles.title}>Страница заказов</h1>

      <OrderFilters
        onStatusChange={setStatusFilter}
        onSortChange={setSortByTotal}
      />

      <OrdersList orders={filteredOrders} />
    </div>
  );
};

export default OrdersPage;
