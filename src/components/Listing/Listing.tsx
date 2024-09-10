import * as React from 'react';
import styles from './Listing.module.css';
import AdvertisementCard from '../AdvertisementCard/AdvertisementCard.tsx';
import Skeleton from 'react-loading-skeleton';
import { useAppSelector } from '../../store/store.ts';
import { useFilteredAdvertisements } from '../../hooks/useFilteredAdvertisements.ts';

const Listing: React.FC = () => {
  const { error, loading, advertisements } = useAppSelector(
    (state) => state.advertisement,
  );

  const filteredAdvertisements = useFilteredAdvertisements(advertisements);

  return (
    <div className={styles.listing}>
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}

      {loading && (
        <Skeleton
          width={240}
          height={357}
          borderRadius={20}
          count={10}
          containerClassName={styles.skeleton}
          style={{ boxSizing: 'border-box' }}
        />
      )}

      {!loading && filteredAdvertisements.length > 0
        ? filteredAdvertisements.map((ad) => (
            <AdvertisementCard key={ad.id} advertisement={ad} />
          ))
        : !loading && (
            <div className={styles.emptyBox}>
              <p className={styles.emptyMessage}>
                Нет объявлений, соответствующих вашему запросу.
              </p>
            </div>
          )}
    </div>
  );
};

export default Listing;
