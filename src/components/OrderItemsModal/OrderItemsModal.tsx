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
        <div className={styles.topContent}>
          <h2>Товары в заказе</h2>
          <img
            className={styles.closeButton}
            onClick={onClose}
            src="/close.png"
            alt="Close"
          />
        </div>
        <div className={styles.itemsList}>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <img
                className={styles.itemImage}
                src={item.imageUrl || 'https://via.placeholder.com/100'}
                alt={item.name}
              />
              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>{item.name}</h3>
                <div className={styles.itemWrapper}>
                  <div className={styles.itemLeft}>
                    <p className={styles.itemText}>Цена: {item.price} ₽</p>
                    <p className={styles.itemText}>Количество: {item.count}</p>
                  </div>
                  <Link to={`/advertisements/${item.id}`}>
                    <img
                      className={styles.linkButton}
                      src="/arrow.svg"
                      alt="Перейти к товару"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderItemsModal;
