import * as React from 'react';
import styles from './Pagination.module.css';

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
  return (
    <div className={styles.pagination}>
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
    </div>
  );
};

export default Pagination;
