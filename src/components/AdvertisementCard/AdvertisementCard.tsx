import * as React from 'react';
import styles from './AdvertisementCard.module.css';
import { Advertisment } from '../../../types.ts';
import { Link } from 'react-router-dom';

type AdvertisementCardProps = {
  advertisement: Advertisment;
};
const AdvertisementCard: React.FC<AdvertisementCardProps> = ({
  advertisement,
}) => {
  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={advertisement.imageUrl || 'https://via.placeholder.com/250'}
        alt="product-image"
      />
      <Link className={styles.title} to="/">
        {advertisement.name}
      </Link>
      <p className={styles.price}>{advertisement.price} ₽</p>
      <div className={styles.countBox}>
        <div className={styles.viewBox}>
          <img src="/eye.png" alt="views" />
          <span className={styles.views}>{advertisement.views}</span>
        </div>
        <div className={styles.likeBox}>
          <img src="/like.png" alt="views" />
          <span className={styles.likes}>{advertisement.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementCard;
