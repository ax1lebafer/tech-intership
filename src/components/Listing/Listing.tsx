import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './Listing.module.css';
import AdvertisementCard from '../AdvertisementCard/AdvertisementCard.tsx';
import Skeleton from 'react-loading-skeleton';
import Controls from '../Controls/Controls.tsx';
import Pagination from '../Pagination/Pagination.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { getAllAdvertisements } from '../../store/features/advSlice.ts';
import { useFilteredAdvertisements } from '../../hooks/useFilteredAdvertisements.ts';
import AddNewAdv from '../AddNewAdv/AddNewAdv.tsx';
import CreateAdvModal from '../CreateAdvModal/CreateAdvModal.tsx';

const Listing: React.FC = () => {
  const dispatch = useAppDispatch();
  const { advertisements, error, pagination, loading } = useAppSelector(
    (state) => state.advertisement,
  );

  const filteredAdvertisements = useFilteredAdvertisements(advertisements);

  const [adsPerPage, setAdsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllAdvertisements({ page: currentPage, limit: adsPerPage }));
  }, [dispatch, currentPage, adsPerPage]);

  return (
    <>
      <Controls adsPerPage={adsPerPage} setAdsPerPage={setAdsPerPage} />
      <AddNewAdv openModal={() => setModalIsOpen(true)} />
      {modalIsOpen && (
        <CreateAdvModal closeModal={() => setModalIsOpen(false)} />
      )}
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
        {!loading && filteredAdvertisements.length > 0 ? (
          filteredAdvertisements.map((ad) => (
            <AdvertisementCard key={ad.id} advertisement={ad} />
          ))
        ) : (
          <div>Нет объявлений, соответствующих вашему запросу.</div>
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
