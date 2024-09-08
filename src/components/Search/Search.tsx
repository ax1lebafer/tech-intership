import * as React from 'react';
import styles from './Search.module.css';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { setKeyword } from '../../store/features/advSlice.ts';

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const { keyword } = useAppSelector((state) => state.advertisement);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setKeyword(event.target.value));
  }

  return (
    <div className={styles.searchBox}>
      <img className={styles.image} src="/search.png" alt="search" />
      <input
        className={styles.search}
        type="search"
        placeholder="Поиск"
        value={keyword}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
