import * as React from 'react';
import styles from './ListingPage.module.css';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { useEffect, useState } from 'react';
import {
  getAllAdvertisements,
  getAllAdvertisementsWithoutPagination,
} from '../../store/features/advSlice.ts';
import Controls from '../../components/Controls/Controls.tsx';
import AddNewAdv from '../../components/AddNewAdv/AddNewAdv.tsx';
import CreateAdvModal from '../../components/CreateAdvModal/CreateAdvModal.tsx';
import Listing from '../../components/Listing/Listing.tsx';
import Pagination from '../../components/Pagination/Pagination.tsx';
import Skeleton from 'react-loading-skeleton';

const ListingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pagination, loading } = useAppSelector(
    (state) => state.advertisement,
  );

  const [adsPerPage, setAdsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllAdvertisementsWithoutPagination());
    dispatch(getAllAdvertisements({ page: currentPage, limit: adsPerPage }));
  }, [dispatch, currentPage, adsPerPage]);

  return (
    <div className={styles.listingPage}>
      <h1 className={styles.title}>
        {loading ? <Skeleton width={200} height={38} /> : 'Объявления'}
      </h1>

      <Controls adsPerPage={adsPerPage} setAdsPerPage={setAdsPerPage} />

      <AddNewAdv openModal={() => setModalIsOpen(true)} />
      {modalIsOpen && (
        <CreateAdvModal closeModal={() => setModalIsOpen(false)} />
      )}

      <Listing />

      <Pagination
        currentPage={currentPage}
        totalPages={pagination.pages}
        setCurrentPage={setCurrentPage}
        hasPrev={pagination.prev !== null}
        hasNext={pagination.next !== null}
      />
    </div>
  );
};

export default ListingPage;
