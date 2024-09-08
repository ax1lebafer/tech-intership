import styles from './AddNewAdv.module.css';
import * as React from 'react';

type AddNewAdvProps = {
  openModal: () => void;
};

const AddNewAdv: React.FC<AddNewAdvProps> = ({ openModal }) => {
  return (
    <div className={styles.addNew}>
      <button className={styles.addNewAdv} onClick={openModal}>
        Создать объявление
      </button>
    </div>
  );
};

export default AddNewAdv;
