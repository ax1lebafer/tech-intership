import * as React from 'react';
import styles from './AdvertisementDetail.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Advertisment } from '../../../types.ts';
import { fetchAdvertisementById } from '../../api/advertisements.ts';
import { formatTime } from '../../utils/formatTime.ts';

const AdvertisementDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Извлекаем id из URL
  const [advertisement, setAdvertisement] = useState<Advertisment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAdvertisement = async () => {
      try {
        setLoading(true);
        const data = await fetchAdvertisementById(id!);
        setAdvertisement(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Неизвестная ошибка');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getAdvertisement();
    }
  }, [id]);

  return (
    <div className={styles.detail}>
      <img
        className={styles.image}
        src={advertisement?.imageUrl}
        alt="Product Image"
      />
      <div className={styles.infoBox}>
        <h1 className={styles.title}>{advertisement?.name}</h1>
        <p className={styles.price}>{advertisement?.price} ₽</p>
      </div>

      <p>Создан: {formatTime(advertisement?.createdAt!)}</p>
    </div>
  );
};

export default AdvertisementDetail;
