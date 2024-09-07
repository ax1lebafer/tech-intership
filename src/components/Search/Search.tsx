import * as React from 'react';
import styles from './Search.module.css';

const Search: React.FC = () => {
  return (
    <div className={styles.searchBox}>
      <img className={styles.image} src="/search.png" alt="search" />
      <input className={styles.search} type="search" />
    </div>
  );
};

export default Search;
