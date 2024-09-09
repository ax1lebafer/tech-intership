import * as React from 'react';
import { OrderStatus } from '../../../types.ts';
import styles from './OrderFilters.module.css';

type OrderFiltersProps = {
  onStatusChange: (status: number | null) => void;
  onSortChange: (sortBy: 'asc' | 'desc' | null) => void;
};

const OrderFilters: React.FC<OrderFiltersProps> = ({
  onStatusChange,
  onSortChange,
}) => {
  return (
    <div className={styles.filters}>
      <select
        onChange={(e) =>
          onStatusChange(e.target.value === '' ? null : Number(e.target.value))
        }
        defaultValue=""
      >
        <option value="">Все статусы</option>
        <option value={OrderStatus.Created}>Создан</option>
        <option value={OrderStatus.Paid}>Оплачен</option>
        <option value={OrderStatus.Transport}>Отправлен</option>
        <option value={OrderStatus.DeliveredToThePoint}>
          Доставлен на пункт
        </option>
        <option value={OrderStatus.Received}>Получен</option>
        <option value={OrderStatus.Archived}>Архивирован</option>
        <option value={OrderStatus.Refund}>Возврат</option>
      </select>

      <select
        onChange={(e) =>
          onSortChange(
            e.target.value === '' ? null : (e.target.value as 'asc' | 'desc'),
          )
        }
        defaultValue=""
      >
        <option value="asc">По возрастанию суммы</option>
        <option value="desc">По убыванию суммы</option>
      </select>
    </div>
  );
};

export default OrderFilters;
