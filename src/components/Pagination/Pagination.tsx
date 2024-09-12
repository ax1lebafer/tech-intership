import * as React from 'react';
import styles from './Pagination.module.css';
import { useAppSelector } from '../../store/store.ts';
import Skeleton from 'react-loading-skeleton';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  hasPrev: boolean;
  hasNext: boolean;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
  hasNext,
  hasPrev,
}) => {
  const { loading } = useAppSelector((state) => state.advertisement);

  return (
    <div className={styles.pagination}>
      {loading ? (
        <Skeleton width={400} height={39} />
      ) : (
        <>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={!hasPrev}
          >
            Предыдущая
          </button>
          <span>
            Страница {currentPage} из {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={!hasNext}
          >
            Следующая
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
