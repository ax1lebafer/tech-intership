import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavigationBar.module.css';
import Search from '../Search/Search.tsx';
import { useAppDispatch } from '../../store/store.ts';
import { resetKeyword } from '../../store/features/advSlice.ts';

const NavigationBar: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const isAdvertisementDetailPage =
    location.pathname.includes('/advertisements/') &&
    location.pathname.split('/').length === 3;

  const isOrdersPage = location.pathname.startsWith('/orders');

  return (
    <header className={styles.header}>
      <Link
        className={styles.logo}
        to={'/advertisements'}
        onClick={() => dispatch(resetKeyword())}
      >
        BY AX1LEBAFER
      </Link>
      {!isAdvertisementDetailPage && !isOrdersPage && <Search />}
      <nav className={styles.navbar}>
        <Link
          className={styles.link}
          to={'/advertisements'}
          onClick={() => dispatch(resetKeyword())}
        >
          Объявления
        </Link>
        <Link
          className={styles.link}
          to={'/orders'}
          onClick={() => dispatch(resetKeyword())}
        >
          Заказы
        </Link>
      </nav>
    </header>
  );
};

export default NavigationBar;
