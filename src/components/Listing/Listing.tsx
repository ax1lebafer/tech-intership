import * as React from 'react';
import { useEffect, useState } from 'react';
import { fetchAdvertisements } from '../../api/advertisements.ts';
import { Advertisment, PaginationInfo } from '../../../types.ts';
import styles from './Listing.module.css';
import AdvertisementCard from '../AdvertisementCard/AdvertisementCard.tsx';
import Skeleton from 'react-loading-skeleton';
import Controls from '../Controls/Controls.tsx';
import Pagination from '../Pagination/Pagination.tsx';

const Listing: React.FC = () => {
  const [advertisements, setAdvertisements] = useState<Advertisment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [adsPerPage, setAdsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo>({
    first: 1,
    prev: null,
    next: null,
    last: 1,
    pages: 1,
    items: 0,
  });

  useEffect(() => {
    const getAdvertisements = async () => {
      try {
        setLoading(true);
        const { data, pagination } = await fetchAdvertisements(
          currentPage,
          adsPerPage,
        );
        setAdvertisements(data);
        setPagination(pagination);
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
  }, [currentPage, adsPerPage]);

  return (
    <>
      <Controls adsPerPage={adsPerPage} setAdsPerPage={setAdsPerPage} />
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
      <Pagination
        currentPage={currentPage}
        totalPages={pagination.pages}
        setCurrentPage={setCurrentPage}
        hasPrev={pagination.prev !== null}
        hasNext={pagination.next !== null}
      />
    </>
  );
};

export default Listing;
