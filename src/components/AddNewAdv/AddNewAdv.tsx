import styles from './AddNewAdv.module.css';
import * as React from 'react';
import { useAppSelector } from '../../store/store.ts';
import Skeleton from 'react-loading-skeleton';

type AddNewAdvProps = {
  openModal: () => void;
};

const AddNewAdv: React.FC<AddNewAdvProps> = ({ openModal }) => {
  const { loading } = useAppSelector((state) => state.advertisement);

  return (
    <div className={styles.addNew}>
      {loading ? (
        <Skeleton width={196} height={39} borderRadius={20} />
      ) : (
        <button className={styles.addNewAdv} onClick={openModal}>
          Создать объявление
        </button>
      )}
    </div>
  );
};

export default AddNewAdv;
