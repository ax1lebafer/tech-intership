import * as React from 'react';
import { useEffect, useState } from 'react';
import { fetchAdvertisements } from '../../api/advertisements.ts';
import { Advertisment } from '../../../types.ts';
import styles from './Listing.module.css';
import AdvertisementCard from '../AdvertisementCard/AdvertisementCard.tsx';
import Skeleton from 'react-loading-skeleton';

const Listing: React.FC = () => {
  const [advertisements, setAdvertisements] = useState<Advertisment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAdvertisements = async () => {
      try {
        setLoading(true);
        const data = await fetchAdvertisements();
        setAdvertisements(data);
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

    void getAdvertisements();
  }, []);

  return (
    <div className={styles.listing}>
      {error && <div className={styles.error}>{error}</div>}
      {loading && (
        <Skeleton
          width={240}
          height={357}
          borderRadius={20}
          count={20}
          containerClassName={styles.skeleton}
          style={{ boxSizing: 'border-box' }}
        />
      )}
      {!loading && (
        <>
          {advertisements.map((ad) => (
            <AdvertisementCard key={ad.id} advertisement={ad} />
          ))}
        </>
      )}
    </div>
  );
};

export default Listing;
