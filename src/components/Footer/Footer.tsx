import * as React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>Сайт сделан по тестовому заданию Avito Frontend-разработчик</p>
    </footer>
  );
};

export default Footer;
