import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavigationBar.module.css';
import Search from '../Search/Search.tsx';

const NavigationBar: React.FC = () => {
  const location = useLocation();

  const isAdvertisementDetailPage =
    location.pathname.includes('/advertisements/') &&
    location.pathname.split('/').length === 3;

  return (
    <header className={styles.header}>
      <Link className={styles.logo} to={'/advertisements'}>
        BY AX1LEBAFER
      </Link>
      {!isAdvertisementDetailPage && <Search />}
      <nav className={styles.navbar}>
        <Link className={styles.link} to={'/advertisements'}>
          Объявления
        </Link>
        <Link className={styles.link} to="/">
          Заказы
        </Link>
      </nav>
    </header>
  );
};

export default NavigationBar;
