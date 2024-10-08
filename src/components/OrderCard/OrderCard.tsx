import * as React from 'react';
import { Order, OrderStatus } from '../../../types.ts';
import styles from './OrderCard.module.css';
import { formatTime } from '../../utils/formatTime.ts';
import OrderItemsModal from '../OrderItemsModal/OrderItemsModal';
import { useState } from 'react';
import { deleteExistingOrder } from '../../store/features/ordersSlice.ts';
import { useAppDispatch } from '../../store/store.ts';

type OrderCardProps = {
  order: Order;
};

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const statusText = (
    status: (typeof OrderStatus)[keyof typeof OrderStatus],
  ) => {
    switch (status) {
      case OrderStatus.Created:
        return 'Создан';
      case OrderStatus.Paid:
        return 'Оплачен';
      case OrderStatus.Transport:
        return 'Отправлен';
      case OrderStatus.DeliveredToThePoint:
        return 'Доставлен на пункт';
      case OrderStatus.Received:
        return 'Получен';
      case OrderStatus.Archived:
        return 'Архивирован';
      case OrderStatus.Refund:
        return 'Возврат';
      default:
        return 'Неизвестный статус';
    }
  };

  const handleCompleteOrder = () => {
    dispatch(deleteExistingOrder(order.id)); // Удаление заказа
  };

  return (
    <div className={styles.orderCard}>
      <p className={styles.orderText}>Заказ #{order.id}</p>
      <div className={styles.infoBox}>
        <p className={styles.orderText}>{formatTime(order.createdAt)}</p>
      </div>
      <div className={styles.infoBox}>
        <p className={styles.orderText}>{statusText(order.status)}</p>
      </div>
      <div className={styles.infoBox}>
        <p className={styles.orderText}>{order.total} ₽</p>
      </div>
      <div className={styles.infoBox}>
        <p className={styles.orderText}>{order.items.length}</p>
      </div>
      <div className={styles.buttonBox}>
        <button onClick={() => setIsModalOpen(true)}>
          Показать все товары
        </button>
        {order.status === OrderStatus.Received && (
          <button
            className={styles.completeButton}
            onClick={handleCompleteOrder}
          >
            Завершить заказ
          </button>
        )}
      </div>

      {isModalOpen && (
        <OrderItemsModal
          items={order.items}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default OrderCard;
