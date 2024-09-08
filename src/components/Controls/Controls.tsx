import * as React from 'react';
import styles from './Controls.module.css';

type ControlsProps = {
  adsPerPage: number;
  setAdsPerPage: (value: number) => void;
};

const Controls: React.FC<ControlsProps> = ({ adsPerPage, setAdsPerPage }) => {
  return (
    <div className={styles.controls}>
      <label htmlFor="adsPerPage">Объявлений на странице: </label>
      <select
        id="adsPerPage"
        value={adsPerPage}
        onChange={(e) => setAdsPerPage(Number(e.target.value))}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
};

export default Controls;
