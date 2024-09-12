import * as React from 'react';
import styles from './Controls.module.css';
import { useAppSelector } from '../../store/store.ts';
import Skeleton from 'react-loading-skeleton';

type ControlsProps = {
  adsPerPage: number;
  setAdsPerPage: (value: number) => void;
};

const Controls: React.FC<ControlsProps> = ({ adsPerPage, setAdsPerPage }) => {
  const { loading } = useAppSelector((state) => state.advertisement);

  return (
    <div className={styles.controls}>
      {loading ? (
        <Skeleton width={250} height={24} borderRadius={20} />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Controls;
