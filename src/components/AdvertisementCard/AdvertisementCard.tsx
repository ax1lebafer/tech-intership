import * as React from 'react';
import styles from './AdvertisementCard.module.css';
import { Advertisment } from '../../../types.ts';

type AdvertisementCardProps = {
  advertisement: Advertisment;
};
const AdvertisementCard: React.FC<AdvertisementCardProps> = ({
  advertisement,
}) => {
  return (
    <div className={styles.card}>
      <h1>{advertisement.name}</h1>
    </div>
  );
};

export default AdvertisementCard;
