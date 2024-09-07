import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavigationBar.module.css';

const NavigationBar: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to="/advertisements">
        BY AX1LEBAFER
      </Link>
      <nav className={styles.navbar}>
        <Link className={styles.link} to="/advertisements">
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
