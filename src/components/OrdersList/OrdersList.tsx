import * as React from 'react';
import { Order } from '../../../types.ts';
import OrderCard from '../OrderCard/OrderCard';
import styles from './OrdersList.module.css';

type OrdersListProps = {
  orders: Order[];
};

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  return (
    <div className={styles.orderList}>
      <div className={styles.topTitle}>
        <p>№ заказа</p>
        <p>Дата создания</p>
        <p>Статус</p>
        <p>Сумма</p>
        <p>Количество товаров</p>
      </div>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}

      {!orders.length && (
        <div className={styles.emptyBox}>
          <p className={styles.emptyMessage}>Нет подходящих заказов</p>
        </div>
      )}
    </div>
  );
};

export default OrdersList;
