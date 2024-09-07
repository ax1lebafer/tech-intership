import * as React from 'react';
import styles from './AdvertisementDetail.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Advertisment } from '../../../types.ts';
import { fetchAdvertisementById } from '../../api/advertisements.ts';
import { formatTime } from '../../utils/formatTime.ts';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AdvertisementDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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
      void getAdvertisement();
    }
  }, [id]);

  if (error) {
    return (
      <div className={styles.error}>
        <p className={styles.errorMessage}>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.detail}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.infoBox}>
            <h1 className={styles.title}>
              {loading ? <Skeleton width={400} /> : advertisement?.name}
            </h1>
            <p className={styles.price}>
              {loading ? <Skeleton width={200} /> : `${advertisement?.price} ₽`}
            </p>
          </div>
          <div className={styles.bottom}>
            <p className={styles.date}>
              {loading ? (
                <Skeleton width={150} />
              ) : (
                `Создан: ${formatTime(advertisement?.createdAt!)}`
              )}
            </p>
            {loading ? (
              <Skeleton width={141} height={38} borderRadius={10} />
            ) : (
              <button className={styles.editButton}>Редактировать</button>
            )}
          </div>
        </div>
        <div className={styles.section}>
          {loading ? (
            <Skeleton width={450} height={450} borderRadius={20} />
          ) : (
            <img
              className={styles.image}
              src={advertisement?.imageUrl || 'https://via.placeholder.com/450'}
              alt="Product Image"
            />
          )}
          <div className={styles.sectionBox}>
            <p className={styles.descriptionTitle}>
              {loading ? <Skeleton width={200} /> : 'Описание'}
            </p>
            <p>
              {loading ? (
                <Skeleton width={400} count={16} />
              ) : (
                advertisement?.description
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementDetail;
