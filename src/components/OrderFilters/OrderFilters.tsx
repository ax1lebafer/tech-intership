import * as React from 'react';
import { OrderStatus } from '../../../types.ts';
import styles from './OrderFilters.module.css';
import { useAppSelector } from '../../store/store.ts';
import Skeleton from 'react-loading-skeleton';

type OrderFiltersProps = {
  onStatusChange: (status: number | null) => void;
  onSortChange: (sortBy: 'asc' | 'desc' | null) => void;
};

const OrderFilters: React.FC<OrderFiltersProps> = ({
  onStatusChange,
  onSortChange,
}) => {
  const { loading } = useAppSelector((state) => state.orders);

  return (
    <div className={styles.filters}>
      {loading ? (
        <Skeleton width={164} height={30} borderRadius={20} />
      ) : (
        <select
          onChange={(e) =>
            onStatusChange(
              e.target.value === '' ? null : Number(e.target.value),
            )
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
      )}

      {loading ? (
        <Skeleton width={188} height={29} borderRadius={20} />
      ) : (
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
      )}
    </div>
  );
};

export default OrderFilters;
