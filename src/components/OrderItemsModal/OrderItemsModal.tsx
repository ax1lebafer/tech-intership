import * as React from 'react';
import styles from './OrderItemsModal.module.css';
import { OrderItem } from '../../../types.ts';
import { Link } from 'react-router-dom';

type OrderItemsModalProps = {
  items: OrderItem[];
  onClose: () => void;
};

const OrderItemsModal: React.FC<OrderItemsModalProps> = ({
  items,
  onClose,
}) => {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContent}>
        <h2>Товары в заказе</h2>
        <button onClick={onClose} className={styles.closeButton}>
          Закрыть
        </button>
        <div className={styles.itemsList}>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <img
                src={item.imageUrl || 'https://via.placeholder.com/100'}
                alt={item.name}
              />
              <div>
                <p>{item.name}</p>
                <p>Цена: {item.price} ₽</p>
                <p>Количество: {item.count}</p>
                <Link to={`/advertisements/${item.id}`}>Перейти к товару</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderItemsModal;
